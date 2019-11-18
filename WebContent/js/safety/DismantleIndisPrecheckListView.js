var DismantleIndisPrecheckListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleIndisPrecheckListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleIndisPrecheckListView",
		title : TabTitle.DISMANTLE_INDIS_PRECHECK_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(DismantleIndisPrecheckListView, IndisPrecheckListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleIndisPrecheckAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisPrecheck.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleIndisPrecheckEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisPrecheck.createDelegate(this)
			});
		}
		if (isGranted("_DismantleIndisPrecheckMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisPrecheck.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DismantleIndisPrecheckPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printIndisPrecheck.createDelegate(this, [ "Dismantle" ])
			});
		}
		return tbarItems;
	}
});