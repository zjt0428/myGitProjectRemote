var ApprovalStatus = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	var generaltems = [{}];
	var generaltems =[ {
			lable : "起始时间:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[BEGIN_DATE]_S",
			value : new Date()
		}, {
			lable : "结束时间:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[END_DATE]_S",
			value : new Date()
		}, {
			xtype : "treecombo",
			allowBlank : true,
			width : 130,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do?opt=appUser",
			name : "Q_[DEP_NAME]_S"
		}, {
			width : 80,
			lable : "申请人",
			name : "Q_[USERNAME]_S"
		}, {
			width : 80,
			lable : "流程类型",
			name : "Q_[FLOWTYPE]_S"
		} ];
	
	ApprovalStatus.superclass.constructor.call(this,{
		id : "ApprovalStatus",
		title : "审批情况表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_APPROVAL_STATUS_RPT",
		search_config : {
			generalItems : generaltems,
			preLableHidden : true
		},
		base_params : this.params
	});
};
Ext.extend(ApprovalStatus, Knight.ux.BaseReportView, {});