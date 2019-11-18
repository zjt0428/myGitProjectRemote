var DismantleSecureProtocolListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleSecureProtocolListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleSecureProtocolListView",
		title : TabTitle.DISMANTLE_SECURE_PROTOCOL_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(DismantleSecureProtocolListView, SecureProtocolListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleSecureProtocolAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSecureProtocol.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleSecureProtocolEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSecureProtocol.createDelegate(this)
			});
		}
		if (isGranted("_DismantleSecureProtocolMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSecureProtocol.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DismantleSecureProtocolPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSecureProtocol.createDelegate(this, [ "Dismantle" ])
			});
		}
		return tbarItems;
	}
});