var InstallContingencyPlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallContingencyPlanListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallContingencyPlanListView",
		title : TabTitle.INSTALL_CONTINGENCY_PLAN_LIST,
		iconCls : "menu-business-customer",
		params : this.params
	}, a));
};
Ext.extend(InstallContingencyPlanListView, ContingencyPlanListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallContingencyPlanAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addContingencyPlan.createDelegate(this, [ RelationModule.equipInstall.relateModule ])
			});
		}
		if (isGranted("_InstallContingencyPlanEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContingencyPlan.createDelegate(this)
			});
		}
		if (isGranted("_InstallContingencyPlanMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContingencyPlan.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallContingencyPlanPrint")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-print",
				text : "打印",
				tooltip : {
					text : "安装预案",
					title : "打印样式表"
				},
				menu : {
					items : [ {
						text : "安装预案审批表",
						handler : this.printContingencyPlan.createDelegate(this, [ "Install", "Approve" ])
					}, {
						text : "安装预案",
						handler : this.printContingencyPlan.createDelegate(this, [ "Install", "Schema" ])
					} ]
				}
			});
		}
		return tbarItems;
	}
});