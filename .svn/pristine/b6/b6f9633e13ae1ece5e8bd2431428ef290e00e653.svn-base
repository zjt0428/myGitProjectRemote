var EquipHitchSuperviseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipHitchSuperviseListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipHitchSuperviseListView",
		params : this.params
	}, a));
};
Ext.extend(EquipHitchSuperviseListView, EquipHitchListView, {
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "0":
				if (isGranted("_EquipHitchSuperviseHandle")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipHitchSuperviseApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipHitchSuperviseAdd")) {
			tbarItems.push({
				hidden : true,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipHitch.createDelegate(this)
			});
		}
		if (isGranted("_EquipHitchSuperviseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipHitch.createDelegate(this)
			});
		}
		if (isGranted("_EquipHitchSuperviseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipHitch.createDelegate(this)
			});
		}
		if (isGranted("_EquipHitchSuperviseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipHitch.createDelegate(this)
			});
		}
		return tbarItems;
	}
});