var CollarMaterial = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var genericCombo = $initComboBoxField("设备名称", "Q_[COMPON_GENERIC]_S", "componGeneric", {
		lable : "设备名称",
		width : 80,
		allowBlank : true,
		editable : true
	});
	var generalItems = [ {
		lable : "统计时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[START_DATE]_S",
		value : new Date()
	}, {
		lable : "至",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	},genericCombo];
	CollarMaterial.superclass.constructor.call(this, {
		id : "CollarMaterial",
		title : "领用物资月统计表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_Collar_Material",
		//REPORT_EQUIP_MARGIN REPORT_Collar_Material $reportFormRequest
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(CollarMaterial, Knight.ux.BaseReportView, {});
