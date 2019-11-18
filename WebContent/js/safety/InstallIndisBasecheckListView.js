var InstallIndisBasecheckListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallIndisBasecheckListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallIndisBasecheckListView",
		title : TabTitle.INSTALL_INDIS_BASECHECK_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(InstallIndisBasecheckListView, IndisBasecheckListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallIndisBasecheckAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisBasecheck.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallIndisBasecheckEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisBasecheck.createDelegate(this)
			});
		}
		if (isGranted("_InstallIndisBasecheckMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisBasecheck.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallIndisBasecheckPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printIndisBasecheck.createDelegate(this, [ "Install" ])
			});
		}
		return tbarItems;
	}
});