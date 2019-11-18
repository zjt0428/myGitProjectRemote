var InstallIndisProtocolListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallIndisProtocolListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallIndisProtocolListView",
		title : TabTitle.INSTALL_INDIS_PROTOCOL_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(InstallIndisProtocolListView, IndisProtocolListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallIndisProtocolAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisProtocol.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallIndisProtocolEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisProtocol.createDelegate(this)
			});
		}
		if (isGranted("_InstallIndisProtocolMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisProtocol.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallIndisProtocolPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printIndisProtocol.createDelegate(this, [ "Install" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printIndisProtocol.createDelegate(this, [ "InstallContract" ])
			});
		}
		return tbarItems;
	}
});