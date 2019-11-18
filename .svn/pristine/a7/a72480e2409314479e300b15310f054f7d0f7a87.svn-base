var DismantleContingencyPlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleContingencyPlanListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleContingencyPlanListView",
		title : TabTitle.DISMANTLE_CONTINGENCY_PLAN_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(DismantleContingencyPlanListView, ContingencyPlanListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleContingencyPlanAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addContingencyPlan.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleContingencyPlanEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContingencyPlan.createDelegate(this)
			});
		}
		if (isGranted("_DismantleContingencyPlanMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContingencyPlan.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DismantleContingencyPlanPrint")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-print",
				text : "打印",
				tooltip : {
					text : "拆卸预案",
					title : "打印样式表"
				},
				menu : {
					items : [ {
						text : "拆卸预案审批表",
						handler : this.printContingencyPlan.createDelegate(this, [ "Dismantle", "Approve" ])
					}, {
						text : "拆卸预案",
						handler : this.printContingencyPlan.createDelegate(this, [ "Dismantle", "Schema" ])
					} ]
				}
			});
		}
		return tbarItems;
	}
});