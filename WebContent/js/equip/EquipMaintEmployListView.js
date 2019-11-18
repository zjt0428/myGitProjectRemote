var EquipMaintEmployListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params["Q_equipMaintSchema.relateModule_S_EQ"] = "EQUIP_EMPLOY";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipMaintEmployListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipMaintEmployListView",
		title : TabTitle.EQUIP_MAINT_EMPLOY_LIST,
		iconCls : "menu-business-maint",
		params : this.params
	}, a));
};
Ext.extend(EquipMaintEmployListView, EquipMaintListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipMaintEmployEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "填报",
				handler : this.editEquipMaint.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintEmployReset")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "重置",
				handler : this.resetEquipMaint.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintEmployMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipMaint.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintEmployMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipMaint.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipMaintEmployExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipMaint.createDelegate(this)
			});
		}
        if (isGranted("_ComEquipMaintPrint")) {
            tbarItems.push({
                iconCls : "btn-head-print",
                text : "例行保养打印",
                handler : this.comPrintEquipMaint.createDelegate(this)
            });
        }
		if (isGranted("_EquipMaintPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "高级保养打印",
				handler : this.printEquipMaint.createDelegate(this)
			});
		}
		return tbarItems;
	}
});
