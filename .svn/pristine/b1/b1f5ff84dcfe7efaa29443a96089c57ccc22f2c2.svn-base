var DismantleIndisProtocolListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleIndisProtocolListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleIndisProtocolListView",
		title : TabTitle.DISMANTLE_INDIS_PROTOCOL_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(DismantleIndisProtocolListView, IndisProtocolListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleIndisProtocolAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisProtocol.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleIndisProtocolEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisProtocol.createDelegate(this)
			});
		}
		if (isGranted("_DismantleIndisProtocolMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisProtocol.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DismantleIndisProtocolPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printIndisProtocol.createDelegate(this, [ "Dismantle" ])
			});
		}
		return tbarItems;
	}
});