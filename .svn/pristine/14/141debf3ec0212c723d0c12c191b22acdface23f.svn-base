var AccountsReceivableQuery = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	Ext.apply(this, {
		attenDepartmentId : Ext.id()
	});
	var generaltems =[ {
//			width : 90,
//			allowBlank : false,
//			lable : "年份",
//			name : "Q_year_S",
//			value : new Date().getFullYear(),
			xtype : "datefield",
			format : "Y-m",
			allowBlank : false,
			lable : "选择日期",
			name : "Q_year_S",
			value : new Date(),
			listeners:{
				change : this.changeBefore.createDelegate(this)
			} 
		}, {
			hidden : true,
			value : new Date().getFullYear()+'-01',
			name : "Q_year2_S",
		}, {
			hidden : true,
			value : Number(new Date().getFullYear())-1,
			name : "Q_before_S",
		}, {
			hidden : true,
			value : Number(new Date().getMonth())+1,
			name : "Q_month_N",
		}, {
			width : 80,
			allowBlank : true,
			lable : "项目名称",
			name : "Q_projectName_S",
		}, {
			lable : "合同编号",
			width : 80,
			name : "Q_contractNo_S"
		}, {
			xtype : "relationCompositeField",
			readOnly : true,
			lable : "承租单位",
			allowBlank : true,
			name : "Q_paEntName_S",
			relateModule : RelationModule.customer.relateModule,
			importhandler : this.importCustomerArchives.createDelegate(this)
		}, {
			id : Ext.id(),
			valId : this.attenDepartmentId,
			xtype : "treecombo",
			width : 160,
			editable : false,
			lable : "分公司",
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner"
		}, {
			hidden : true,
			id : this.attenDepartmentId,
			name : "Q_depId_L"
		}, {
			width : 80,
			xtype : "relationCompositeField",
			readOnly : true,
			lable : "项目经理",
			allowBlank : true,
			name : "Q_userName_S",
			relateModule : RelationModule.practitioner.relateModule,
			importhandler : this.importPractitioner.createDelegate(this)
		}, {
			xtype : "checkboxgroup",
			width : 110,
			items : [ {
				boxLabel : "去除司机工资",
				name : "Q_free_N",
				inputValue : 1
			} ],
		} ];
	AccountsReceivableQuery.superclass.constructor.call(this,{
		id : "AccountsReceivableQuery",
		title : "应收款明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_ACCOUNTS_RECEIVABLE_QUERY",
		search_config : {
			generalItems : generaltems,
		},
		base_params : this.params
	});
};
Ext.extend(AccountsReceivableQuery, Knight.ux.BaseReportView, {
	importPractitioner : function(data) {
		this.searchPanel.getForm().findField("Q_userName_S").setValue(data.practiName);
	},
	importCustomerArchives : function(data) {
		this.searchPanel.getForm().findField("Q_paEntName_S").setValue(data.customerName);
	},
	changeBefore : function(data){
		var y = data.getValue().getFullYear();  
	    var m = data.getValue().getMonth() + 1;  
		m = m < 10 ? '0' + m : m; 
		var years =  y + '-' + m ;
		var months = Number(m);
		var befores = Number(years.substring(0,4))-1;
		var year2 = years.substring(0,4)+"-01";
		this.searchPanel.getForm().findField("Q_before_S").setValue(befores);
		this.searchPanel.getForm().findField("Q_month_N").setValue(months);
		this.searchPanel.getForm().findField("Q_year2_S").setValue(year2);
	},
});