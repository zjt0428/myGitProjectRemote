var DismantleIndisNoticeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleIndisNoticeListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleIndisNoticeListView",
		title : "拆卸告知",
		iconCls : "menu-business-customer",
		relateModule : RelationModule.equipDismantle.relateModule,
		markModuleName : "拆卸告知",
		params : this.params
		
	}, a));
};
Ext.extend(DismantleIndisNoticeListView, IndisNoticeListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleIndisNoticeAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				//handler : this.addDismantleIndisNotice.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
				handler : this.addIndisNotice.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleIndisNoticeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisNotice.createDelegate(this)
			});
		}
		if (isGranted("_DismantleIndisNoticeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisNotice.createDelegate(this)
			});
		}
		tbarItems.push("->");
		return tbarItems;
	}
});