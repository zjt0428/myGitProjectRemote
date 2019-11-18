var EquipEmployDispatchListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_applyforState_S_GE = "3";
	Ext.apply(this.params, (a && a.params) || {});

	EquipEmployDispatchListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipEmployDispatchListView",
		title : "加节顶升",
		iconCls : "menu-business-employ",
		params : this.params
	}, a));
};
Ext.extend(EquipEmployDispatchListView, EquipEmployListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipEmployDispatchMultiDispatch")) {
			tbarItems.push({
				iconCls : "btn-clock",
				text : "调度(顶升)",
				handler : this.dispatchEquipEmploy.createDelegate(this)
			});
		}
		return tbarItems;
	}
});