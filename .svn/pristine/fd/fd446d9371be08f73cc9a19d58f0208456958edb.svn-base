var ConstructionWork = function(a) {
	this.params = {};
	//this.params["Q_[CORP_NAME]_S"] = __companyName;
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [  {
		lable : "统计开始时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[START_DATE]_S"
	},{
		lable : "统计截止时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	},
	{
		width : 80,
		lable : "项目名称",
		name : "Q_[PROJECT_NAME]_S"
	},
	{
		width : 80,
		lable : "出厂编号",
		name : "Q_[RECORD_ID]_S"
	}/*,
	{
		width : 80,
		lable : "工作内容",
		name : "Q_[CONTENTS]_S"
	}*/];
	ConstructionWork.superclass.constructor.call(this, {
		id : "ConstructionWork",
		title : "班组作业核算表",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_CONSTRAUCTOR_WORK",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ConstructionWork, Knight.ux.BaseReportView, {});