var EmployTechnicalDisclosureListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipEmploy.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EmployTechnicalDisclosureListView.superclass.constructor.call(this, Ext.apply({
		id : "EmployTechnicalDisclosureListView",
		title : TabTitle.EMPLOY_TECHNICAL_DISCLOSURE_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(EmployTechnicalDisclosureListView, TechnicalDisclosureListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EmployTechnicalDisclosureAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTechnicalDisclosure.createDelegate(this, [ RelationModule.equipEmploy.relateModule ])
			});
		}
		if (isGranted("_EmployTechnicalDisclosureEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTechnicalDisclosure.createDelegate(this)
			});
		}
		if (isGranted("_EmployTechnicalDisclosureMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTechnicalDisclosure.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EmployTechnicalDisclosurePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printTechnicalDisclosure.createDelegate(this, [ "Employ" ])
			});
		}
		return tbarItems;
	},
	addTechnicalDisclosure : function(relateModule) {
		new EquipFlowEmploySelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do",
					params : {
						flowId : data.equipFlow.flowId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						new TechnicalDisclosureForm({
							relateModule : relateModule,
							project:resp.data[0].contractLease,
							equipment : resp.data[0].equipDiary
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	}
});