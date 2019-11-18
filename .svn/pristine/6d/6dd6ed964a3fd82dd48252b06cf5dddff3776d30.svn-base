var InstallDetails = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "安装起始日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[INSTALL_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "安装截至日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[INSTALL_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "项目名称",
			name : "Q_[PROJECT_NAME]_S"
		}, {
			width : 80,
			lable : "出厂编号",
			name : "Q_[EXW_SERIAL]_S"
		} ];
	
	InstallDetails.superclass.constructor.call(this,{
		id : "InstallDetails",
		title : "安装明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_INSTALL_DETAILS_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(InstallDetails, Knight.ux.BaseReportView, {});