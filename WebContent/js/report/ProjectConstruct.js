var ProjectConstruct = function(a) {
	this.params = {};
	if (isCorpAppUser()) {
		this.params["Q_[CORP_NAME]_S"] = curUserInfo.corpInfo.corpName;
	} else {
		this.params["Q_[CORP_NAME]_S"] = __companyName;
	}
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [ {
		lable : "统计截止时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	} ];
	ProjectConstruct.superclass.constructor.call(this, {
		id : "ProjectConstruct",
		title : "施工项目汇总表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_PROJECT_CONSTRUCT",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ProjectConstruct, Knight.ux.BaseReportView, {});
