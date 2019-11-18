var InstallTechnicalDisclosureListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallTechnicalDisclosureListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallTechnicalDisclosureListView",
		title : TabTitle.INSTALL_TECHNICAL_DISCLOSURE_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(InstallTechnicalDisclosureListView, TechnicalDisclosureListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallTechnicalDisclosureAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTechnicalDisclosure.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallTechnicalDisclosureEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTechnicalDisclosure.createDelegate(this)
			});
		}
		if (isGranted("_InstallTechnicalDisclosureMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTechnicalDisclosure.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallTechnicalDisclosurePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printTechnicalDisclosure.createDelegate(this, [ "Install" ])
			});
		}
		return tbarItems;
	}
});