var SettleMaterialsDetailCeaseReportGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [ {
		header : "报停主题",
		dataIndex : "ceaseTitle",
	}, {
		header : "报停单号",
		dataIndex : "ceaseSerial"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "承租单位",
		dataIndex : "paEntName"
	}, {
		header : "本次结算金额",
		dataIndex : "settledAmount"
	}, {
		header : "起始日期",
		dataIndex : "startDate"
	}, {
		header : "截止日期",
		dataIndex : "endDate"
	}
]
	
	SettleMaterialsDetailCeaseReportGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		addForbidden : true,
		fields : SettleMaterialsDetailCeaseReportViewField,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(SettleMaterialsDetailCeaseReportGrid, Knight.ux.SubModuleBaseGrid, {

})