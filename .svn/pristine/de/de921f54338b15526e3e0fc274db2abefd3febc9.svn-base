var EquipInspectEmployListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params["Q_equipInspectSchema.relateModule_S_EQ"] = "EQUIP_EMPLOY";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipInspectEmployListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInspectEmployListView",
		title : TabTitle.EQUIP_INSPECT_EMPLOY_LIST,
		iconCls : "menu-business-inspect",
		params : this.params
	}, a));
};
Ext.extend(EquipInspectEmployListView, EquipInspectListView, {
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
			case "1":
				if (isGranted("_EquipInspectApprove")) {
					action[1].hidden = false;
				}
				break;
		}
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipInspect
		});
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipInspectEmployEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "填报",
				handler : this.editEquipInspect.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectEmployReset")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "重置",
				handler : this.resetEquipInspect.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectEmployMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipInspect.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectEmployCost")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "巡检费用",
				handler : this.costEquipInspect.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipInspectEmployPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipInspect.createDelegate(this, [ "" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipInspect.createDelegate(this, [ "TowerCrane" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipInspect.createDelegate(this, [ "Lift" ])
			});
		}
		if (isGranted("_EquipInspectEmployExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipInspect.createDelegate(this)
			});
		}
		return tbarItems;
	}
});
