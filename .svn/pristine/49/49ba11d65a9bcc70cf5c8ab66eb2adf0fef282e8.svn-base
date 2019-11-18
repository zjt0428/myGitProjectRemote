var ProjectInstallStatics = function(a) {
	this.params = {};
	
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [ {
		lable : "项目名称:",
		name : "Q_[PROJECT_NAME]_S",
	}, {
		lable : "安装日期:",
		xtype : "datefield",
		editable : false,
		format : "Ymd",
		name : "Q_[DATE_BEG]_S",
		value : new Date()
	},  {
		lable : "至:",
		xtype : "datefield",
		editable : false,
		format : "Ymd",
		name : "Q_[DATE_END]_S",
		value : new Date()
	}];
	ProjectInstallStatics.superclass.constructor.call(this, {
		id : "ProjectInstallStatics",
		title : "项目安装明细表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_PROJECT_INSTALL_STATICS",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ProjectInstallStatics, Knight.ux.BaseReportView, {});
