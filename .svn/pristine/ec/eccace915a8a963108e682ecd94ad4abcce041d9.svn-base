var EquipInspectSuperviseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipInspectSuperviseListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInspectSuperviseListView"
	}, a));
};
Ext.extend(EquipInspectSuperviseListView, EquipInspectListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipInspectSuperviseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "填报",
				handler : this.editEquipInspect.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSuperviseReset")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "重置",
				handler : this.resetEquipInspect.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSuperviseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipInspect.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSuperviseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipInspect.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipInspectSupervisePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipInspect.createDelegate(this)
			});
		}
		return tbarItems;
	}
});
