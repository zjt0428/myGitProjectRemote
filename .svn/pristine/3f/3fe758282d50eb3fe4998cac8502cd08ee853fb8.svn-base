var EquipMaintSchemaEmployListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipMaintSchemaEmployListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipMaintSchemaEmployListView",
		title : TabTitle.EQUIP_MAINT_SCHEMA_EMPLOY_LIST,
		iconCls : "menu-business-employ",
		serialLable : "使用编号",
		params : this.params
	}, a));
};
Ext.extend(EquipMaintSchemaEmployListView, EquipMaintSchemaListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipMaintSchemaEmployAdd")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "新增",
				tooltip : {
					text : "关联业务保养方案",
					title : "保养管理"
				},
				menu : {
					items : [ {
						text : "例行保养",
						handler : this.addEquipMaintSchema.createDelegate(this, [ {
							maintType : "DM",
							maintTypeName : "例行保养"
						} ])
					}, {
						text : "初级保养",
						handler : this.addEquipMaintSchema.createDelegate(this, [ {
							maintType : "JM",
							maintTypeName : "初级保养"
						} ])
					}, {
						text : "高级保养",
						handler : this.addEquipMaintSchema.createDelegate(this, [ {
							maintType : "SM",
							maintTypeName : "高级保养"
						} ])
					} ]
				}
			});
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "批量",
				tooltip : {
					text : "关联业务保养方案",
					title : "保养管理"
				},
				menu : {
					items : [ {
						text : "例行保养",
						handler : this.addBatchEquipMaintSchema.createDelegate(this, [ {
							maintType : "DM",
							maintTypeName : "例行保养"
						} ])
					}, {
						text : "初级保养",
						handler : this.addBatchEquipMaintSchema.createDelegate(this, [ {
							maintType : "JM",
							maintTypeName : "初级保养"
						} ])
					}, {
						text : "高级保养",
						handler : this.addBatchEquipMaintSchema.createDelegate(this, [ {
							maintType : "SM",
							maintTypeName : "高级保养"
						} ])
					} ]
				}
			});
		}
		if (isGranted("_EquipMaintSchemaEmployEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipMaintSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintSchemaEmployMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipMaintSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipMaintSchemaEmployMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipMaintSchema.createDelegate(this)
			});
		}
		return tbarItems;
	},
	addEquipMaintSchema : function(maintType) {
		new EquipSelector({
			params : {},
			single : true,
			callback : function(d) {
				var data = d[0].data;
						new EquipMaintSchemaForm(Ext.apply({
							equipment : data,
							equipDiary : data
						}, maintType), {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
			
			}.createDelegate(this)
		}).show();

/*		new EquipFlowEmploySelector({
			params : {},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?flowId=" + data.equipFlow.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipMaintSchemaForm(Ext.apply({
							flowId : data.equipFlow.flowId,
							equipDiary : equipFlow.equipDiary,
						}, maintType), {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();*/
	},
	addBatchEquipMaintSchema : function(maintType) {
		new EquipMaintSchemaBatchForm(Ext.apply({
			relateEquipFlowGrid : new EquipFlowEmployGrid({
				params : {
					"Q_equipFlow.employInspectSchemaId_L_NULL" : "",
					"Q_equipFlow.employMaintSchemaId_L_NULL" : "1"
				}
			}),
			relateModule : RelationModule.equipEmploy.relateModule
		}, maintType), {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
});