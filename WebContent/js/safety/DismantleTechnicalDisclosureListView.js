var DismantleTechnicalDisclosureListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleTechnicalDisclosureListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleTechnicalDisclosureListView",
		title : TabTitle.DISMANTLE_TECHNICAL_DISCLOSURE_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(DismantleTechnicalDisclosureListView, TechnicalDisclosureListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleTechnicalDisclosureAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTechnicalDisclosure.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleTechnicalDisclosureEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTechnicalDisclosure.createDelegate(this)
			});
		}
		if (isGranted("_DismantleTechnicalDisclosureMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTechnicalDisclosure.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DismantleTechnicalDisclosurePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printTechnicalDisclosure.createDelegate(this, [ "Dismantle" ])
			});
		}
		return tbarItems;
	}
});