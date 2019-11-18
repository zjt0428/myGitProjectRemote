var RentalFee = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.params["SUBREPORT_DIR"] = __ctxPath + "/report/jasper/"
    this.endDateId = Ext.id();
	var generalItems = [ {
		lable : "结算起至时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[START_DATE]_S",
		value : new Date()
	}, {
		id : this.endDateId,
		lable : "至",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	},{
        xtype : "relationCompositeField",
        lable : "项目名称",
        name : "Q_[PROJECT_NAME]_S",
        relateModule: RelationModule.project.relateModule,
        importhandler : this.importProjectName.createDelegate(this)
    },{
        xtype : "relationCompositeField",
        lable : "承租单位",
        name : "Q_[PA_ENT_NAME]_S",
		value : "",
        relateModule: RelationModule.customer.relateModule,
        importhandler : this.importPaEntName.createDelegate(this)
    },{
		xtype : "datefield",
		hidden : true,
		editable : false,
		format : "Y-m-d",
		name : "Q_[NEXT_DATE]_S"
	},{
		hidden : true,
		editable : false,
		name : "Q_[LEASE_NAME]_S"
	}];

	RentalFee.superclass.constructor.call(this, {
		id : "RentalFee",
		title : "租赁费申请表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_RENTAL_FEE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(RentalFee, Knight.ux.BaseReportView, {
	searchSubmit : function() {
        var endDate = Ext.getCmp(this.endDateId).getValue();
        var temp = new Date(endDate.setMonth((endDate.getMonth()+1)));
		this.currentSearchPanel = this.searchPanel;
        if(!this.currentSearchPanel.getForm().findField("Q_[PROJECT_NAME]_S").getValue()&&!this.currentSearchPanel.getForm().findField("Q_[PA_ENT_NAME]_S").getValue()){
            $toast("请选择项目名称和承租单位");
            return;
        }
        this.currentSearchPanel.getForm().findField("Q_[NEXT_DATE]_S").setValue(temp);
        if(curUserInfo.corpInfo){
            this.currentSearchPanel.getForm().findField("Q_[LEASE_NAME]_S").setValue(curUserInfo.corpInfo.corpName);
        }
		this.currentSearchPanel.getForm().findField("reportType").setValue("html");
		$reportFormRequest(this.currentSearchPanel.getForm(), function(e, c) {
			this.reportPanel.body.update(e.responseText);
		}.createDelegate(this));
    },
    importProjectName :function(a){
        this.searchPanel.getForm().findField("Q_[PROJECT_NAME]_S").setValue(a.projectName)
    },
    importPaEntName : function(a){
        this.searchPanel.getForm().findField("Q_[PA_ENT_NAME]_S").setValue(a.customerName)
    }
});
