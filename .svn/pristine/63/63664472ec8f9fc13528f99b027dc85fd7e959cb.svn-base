var AttendamceRpt = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
//	var endDate = new Date().format('Ym')+'20';
//	var startDate = endDate-31;
	var generalItems = [ {
		lable : "考勤时间:",
		xtype : "datefield",
		editable : false,
		format : "Ymd",
		name : "Q_[START_DATE]_S",
		value : new Date()
	},{
        lable : "至",
        xtype : "datefield",
        editable : false,
        format : "Ymd",
        name : "Q_[END_DATE]_S",
        value : new Date()
    }, {
		xtype : "treecombo",
		allowBlank : true,
		id : Ext.id(),
		width : 130,
		lable : "所属部门",
		url : __ctxPath + "/system/listDepartment.do?opt=appUser",
		name : "Q_[DEP_NAME]_S"
	},{
		width : 80,
		lable : "员工姓名",
		name : "Q_[FULL_NAME]_S"
	},{
		width : 60,
		xtype : "combo",
		lable : "考勤状态",
		name : "Q_[ATTENDANCE]_S",
		triggerAction : "all",
		store : [ "", "迟到", "早退", "缺卡"]
	}];
	AttendamceRpt.superclass.constructor.call(this, {
		id : "AttendamceRpt",
		title : "考勤统计报表",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_ATTENDAMCE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(AttendamceRpt, Knight.ux.BaseReportView, {});