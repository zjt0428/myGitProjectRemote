var EquipmentRate = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.equipCategoryId = Ext.id();
	var genericCombo = $initComboBoxField("设备名称", "Q_[EQUIP_GENERIC]_S", "equipGeneric", {
		lable : "设备名称",
		width : 80,
		allowBlank : true,
		editable : true
	});
	var equipCategoryTreeCombo = new TreeSelector("equipCategoryName", __ctxPath + "/system/treeCode.do?codeId=repertoryCategory", "设备类别", this.equipCategoryId, true, {
		lable : "设备类别",
		width : 80
	});
	var generalItems = [ {
		xtype : "hidden",
		id : this.equipCategoryId,
		name : "Q_[EQUIP_CATEGORY]_S"
	}, {
		width : 80,
		lable : "备案编号",
		name : "Q_[RECORD_ID]_S"
	}, equipCategoryTreeCombo, genericCombo, {
		width : 80,
		lable : "规格型号",
		name : "Q_[EQUIP_SPECIFIC_NAME]_S"
	}, {
		xtype : "numberfield",
		minValue : 0,
		width : 80,
		lable : "使用年限",
		name : "Q_[DURABLE_YEARS]_S"
	} ];
	EquipmentRate.superclass.constructor.call(this, {
		id : "EquipmentRate",
		title : "设备折旧率",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_EQUIPMENT_RATE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(EquipmentRate, Knight.ux.BaseReportView, {});
