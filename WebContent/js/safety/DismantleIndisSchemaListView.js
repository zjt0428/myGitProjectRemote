var DismantleIndisSchemaListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_relateModule_S_EQ"] = RelationModule.equipDismantle.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	DismantleIndisSchemaListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleIndisSchemaListView",
		title : TabTitle.DISMANTLE_INDIS_SCHEMA_LIST,
		iconCls : "menu-business-customer",
		markModuleName : "拆卸方案",
		params : this.params
	}, a));
};
Ext.extend(DismantleIndisSchemaListView, IndisSchemaListView, {
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_DismantleIndisSchemaAccept")) {
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
			if (isGranted("_DismantleIndisSchemaApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleIndisSchemaAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addIndisSchema.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleIndisSchemaAdd2")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "合同新增",
				handler : this.addIndisSchema2.createDelegate(this, [ RelationModule.equipDismantle.relateModule ])
			});
		}
		if (isGranted("_DismantleIndisSchemaEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editIndisSchema.createDelegate(this)
			});
		}
		if (isGranted("_DismantleIndisSchemaMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitIndisSchema.createDelegate(this)
			});
		}
		if (isGranted("_DismantleIndisSchemaMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delIndisSchema.createDelegate(this)
			});
		}
		if (isGranted("_DismantleContractLeaseApproval")) {
			tbarItems.push({
				iconCls : "btn-head-submit",
				text : "一键评审",
				handler : this.ContractLeaseApproval.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DismantleIndisSchemaPrint")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-print",
				text : "打印",
				tooltip : {
					text : "拆卸方案",
					title : "打印样式表"
				},
				menu : {
					items : [ {
						text : "拆卸方案审批表",
						handler : this.printIndisSchema.createDelegate(this, [ "Dismantle", "Approve" ])
					}, {
						text : "专项施工方案",
						handler : this.printIndisSchema.createDelegate(this, [ "Dismantle", "Special" ])
					}, {
						text : "拆卸方案",
						handler : this.printIndisSchema.createDelegate(this, [ "Dismantle", "Schema" ])
					} ]
				}
			});
		}
		return tbarItems;
	}
});