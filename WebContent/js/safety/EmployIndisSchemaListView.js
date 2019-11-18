var EmployIndisSchemaListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipEmploy.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EmployIndisSchemaListView.superclass.constructor.call(this, Ext.apply({
		id : "EmployIndisSchemaListView",
		title : "附墙方案",
		iconCls : "menu-business-customer",
		markModuleName : "附墙方案",
		params : this.params
	}, a));
};
Ext.extend(EmployIndisSchemaListView, IndisSchemaListView, {
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_EmployIndisSchemaAccept")) {
				var hidden = false;
				if (!Ext.isEmpty(record.data.applyforUserId)) {
					var ids = record.data.applyforUserId.split(",");
					for (var i = 0; i < ids.length; i++) {
						if (ids[i] == curUserInfo.userId) {
							hidden = true;
							break;
						}
					}
				}
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_EmployIndisSchemaApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EmployIndisSchemaAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisSchema.createDelegate(this, [ RelationModule.equipEmploy.relateModule ])
			});
		}
		if (isGranted("_EmployIndisSchemaAdd2")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "合同新增",
				handler : this.addIndisSchema2.createDelegate(this, [ RelationModule.equipEmploy.relateModule ])
			});
		}
		if (isGranted("_EmployIndisSchemaEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisSchema.createDelegate(this)
			});
		}
		if (isGranted("_EmployIndisSchemaMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitIndisSchema.createDelegate(this)
			});
		}
		if (isGranted("_EmployIndisSchemaMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisSchema.createDelegate(this)
			});
		}
		if (isGranted("_EmployInstallContractLeaseApproval")) {
			tbarItems.push({
				iconCls : "btn-head-submit",
				text : "一键评审",
				handler : this.ContractLeaseApproval.createDelegate(this)
			});
		}
		tbarItems.push("->");
		return tbarItems;
	}
});