var ComponetDistribution = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.categoryId = Ext.id();
	var componGenericCombo = $initComboBoxField("零配件名称", "Q_[COMPON_GE]_S", "componGeneric", {
//		width : 75,
		lable : "零配件名称",
		editable : true,
		allowBlank : true
	});
	var componSpecificCombo = $initComboBoxField("设备型号", "Q_[COMPON_SP]_S", "componSpecific", {
//		width : 75,
		lable : "设备型号",
		allowBlank : true
	});
//	var categoryTreeCombo = new TreeSelector("equipCategoryName", __ctxPath + "/system/treeCode.do?codeId=repertoryCategory", "零配件类别", this.categoryId, true, {
//		lable : "零配件类别",
//		width : 80,
//		allowBlank : true,
//		allowBlank : true
//	});
	var generalItems = [componGenericCombo,componSpecificCombo, {
		width : 80,
		lable : "配件规格",
		name : "Q_[DIMENSIONS]_S"
	},{
		lable : "归属设备",
		name : "Q_[EXW_SERIAL]_S"
	},{
		lable : "当前存放地",
		name : "Q_[PROJECT_NAME]_S"
	}];
	ComponetDistribution.superclass.constructor.call(this, {
		id : "ComponetDistribution",
		title : "零部件分布表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_COMPONET_DISTRIBUTION_RPT",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ComponetDistribution, Knight.ux.BaseReportView, {});
