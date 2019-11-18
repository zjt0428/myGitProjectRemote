var EquipMaintSuperviseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipMaintSuperviseListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipMaintSuperviseListView"
	}, a));
};
Ext.extend(EquipMaintSuperviseListView, EquipMaintListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipMaintSuperviseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "填报",
				handler : this.editEquipMaint.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintSuperviseReset")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "重置",
				handler : this.resetEquipMaint.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintSuperviseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipMaint.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintSuperviseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipMaint.createDelegate(this)
			});
		}
		return tbarItems;
	}
});
