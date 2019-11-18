var TeamSettle = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var depCombo = new Knight.ux.TreeCombo({
		width : 160,
		lable : "结算班组：",
		url : __ctxPath + "/system/listDepartment.do",
		name : "Q_[TEAM_NAME]_S"
	})
	var generaltems =[ {
			lable : "结算周期：",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DATE_BEG]_S"
		},  {
			lable : "至:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DATE_END]_S"
		}, depCombo/*,{
			width : 80,
			lable : "班组名称",
			name : "Q_[TEAM_NAME]_S"
		} , {
			width : 80,
			lable : "汽吊类型",
			name : "Q_[CRANE_TYPE]_S"
		} , {
			width : 80,
			lable : "吊运公司",
			name : "Q_[CRANE_COMPANY]_S"
		}*/];
	
	TeamSettle.superclass.constructor.call(this,{
		id : "TruckCraneCost",
		title : "班组结算明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_TEAM_SETTLE",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(TeamSettle, Knight.ux.BaseReportView, {});