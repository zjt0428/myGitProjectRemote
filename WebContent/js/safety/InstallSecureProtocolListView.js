var InstallSecureProtocolListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallSecureProtocolListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallSecureProtocolListView",
		title : TabTitle.INSTALL_SECURE_PROTOCOL_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(InstallSecureProtocolListView, SecureProtocolListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallSecureProtocolAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSecureProtocol.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallSecureProtocolEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSecureProtocol.createDelegate(this)
			});
		}
		if (isGranted("_InstallSecureProtocolMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSecureProtocol.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallSecureProtocolPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSecureProtocol.createDelegate(this, [ "Install" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSecureProtocol.createDelegate(this, [ "InstallManage" ])
			});
		}
		return tbarItems;
	}
});