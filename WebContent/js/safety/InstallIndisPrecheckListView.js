var InstallIndisPrecheckListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallIndisPrecheckListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallIndisPrecheckListView",
		url : __ctxPath + "/dispatch/listContractLease.do",
		title : TabTitle.INSTALL_INDIS_PRECHECK_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(InstallIndisPrecheckListView, IndisPrecheckListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallIndisPrecheckAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisPrecheck.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallIndisPrecheckEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisPrecheck.createDelegate(this)
			});
		}
		if (isGranted("_InstallIndisPrecheckMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisPrecheck.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallIndisPrecheckPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printIndisPrecheck.createDelegate(this, [ "Install" ])
			});
		}
		return tbarItems;
	}
});