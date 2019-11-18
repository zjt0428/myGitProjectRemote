var InstallIndisNoticeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallIndisNoticeListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallIndisNoticeListView",
		title : "安装告知",
		iconCls : "menu-business-customer",
		relateModule : RelationModule.equipInstall.relateModule,
		markModuleName : "安装告知",
		params : this.params
	}, a));
};
Ext.extend(InstallIndisNoticeListView, IndisNoticeListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallIndisNoticeAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisNotice.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallIndisNoticeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisNotice.createDelegate(this)
			});
		}
		if (isGranted("_InstallIndisNoticeMultiDel")) {
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