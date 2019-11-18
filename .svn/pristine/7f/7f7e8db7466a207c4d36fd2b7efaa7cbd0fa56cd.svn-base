var ComponetStocks = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.categoryId = Ext.id();
	var componGenericCombo = $initComboBoxField("零配件名称", "Q_[COMPON_GE]_S", "componGeneric", {
		width : 75,
		lable : "零配件名称",
		editable : true,
		allowBlank : true
	});
	var componSpecificCombo = $initComboBoxField("设备型号", "Q_[COMPON_SP]_S", "componSpecific", {
		width : 75,
		lable : "设备型号",
		allowBlank : true
	});
	var categoryTreeCombo = new TreeSelector("equipCategoryName", __ctxPath + "/system/treeCode.do?codeId=repertoryCategory", "零配件类别", this.categoryId, true, {
		lable : "零配件类别",
		width : 80,
		allowBlank : true,
		allowBlank : true
	});
	var generalItems = [ {
		lable : "起始时间:",
		xtype : "datefield",
		editable : false,
		format : "Ym",
		name : "Q_[YEARMTH_BEG]_S",
		value : new Date()
	},{
		lable : "结束时间:",
		xtype : "datefield",
		editable : false,
		format : "Ym",
		name : "Q_[YEARMTH_END]_S",
		value : new Date()
	},{
		xtype : "hidden",
		id : this.categoryId,
		name : "Q_[COMPON_CAT]_S"
	},categoryTreeCombo,componGenericCombo, componSpecificCombo ,{
		width : 80,
		lable : "配件规格",
		name : "Q_[DIMENSIONS]_S"
	}];
	ComponetStocks.superclass.constructor.call(this, {
		id : "ComponetStocks",
		title : "库存统计表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_COMPONET_STOCKS_RPT",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ComponetStocks, Knight.ux.BaseReportView, {});
