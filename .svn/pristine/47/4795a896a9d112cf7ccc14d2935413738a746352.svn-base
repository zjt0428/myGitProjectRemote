var IndisSchemaListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "方案编号",
			name : "Q_schemaSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_[equipment.exwSerial]_S_LK"
		}, {
			lable : "登记日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_EQ"
		}, {
			lable : "楼号",
			name : "Q_blockNumber_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readIndisSchema
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : IndisSchemaListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "方案编号",
			dataIndex : "schemaSerial"
		}, {
			header : "填报日期",
			dataIndex : "providedDate"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(n) {
				return n.address;
			}
		}, {
			header : "使用单位",
			dataIndex : "emEntName"
		}, {
			header : "安装单位",
			dataIndex : "inEntName"
		}, {
			header : "楼号",
			dataIndex : "blockNumber"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			width : 60,
			header : "审批状态",
			dataIndex : "applyforStateName"
		} ]
	};
	IndisSchemaListView.superclass.constructor.call(this, Ext.apply({
		id : "IndisSchemaListView",
		title : TabTitle.INDIS_SCHEMA_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listIndisSchema.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(IndisSchemaListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptIndisSchema
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveIndisSchema
		});
	},
	submitIndisSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "schemaId", __ctxPath + "/safety/multiSubmitIndisSchema.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的" + this.markModuleNa + "必须是【拟稿】的" + this.markModuleNa + "！");
			return false;
		}.createDelegate(this));
	},
	acceptIndisSchema : function(a) {
		new IndisSchemaForm(a, {
			title : this.markModuleName,
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveIndisSchema : function(a) {
		new IndisSchemaForm(a, {
			title : this.markModuleName,
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的！" + this.markModuleName;
		var msg2 = "您确认要【" + op + "】所选的" + this.markModuleName + "？";
		var msg3 = "成功【" + op + "】所选的" + this.markModuleName + "！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readIndisSchema : function(a) {
		new IndisSchemaForm(a, {
			title : this.markModuleName,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addIndisSchema : function(relateModule) {
		new ContractApplicationSelector({
			single : true,
			callback : function(d) {
				var contractArrange = d[0].data;
				new EquipSelector({
					single : true,
					callback : function(d) {
						var equipment = d[0].data;
						$request({
							url : __ctxPath + "/archive/loadCorpInfo.do",
							params : {
								corpId : contractArrange.corpId
							},
							success : function(g, h) {
								var resp = Ext.util.JSON.decode(g.responseText);
								var inEntInfo = resp.data[0];
								new IndisSchemaForm({
									relateModule : relateModule,
									inEntInfo : inEntInfo,
									contractArrange:contractArrange,
									equipment:equipment
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
			}.createDelegate(this)
		}).show();
/*		new ContractLeaseSelector({
			single : true,
			params : {
				"Q_paModule_S_EQ" : RelationModule.customer.relateModule,
				"Q_pbModule_S_EQ" : RelationModule.corp.relateModule,
				"Q_applyforState_S_GE" : "3",
				"Q_applyforState_S_LE" : "6"
			},
			callback : function(d) {
				var contract = d[0].data;
				$request({
					url : __ctxPath + "/archive/loadCorpInfo.do",
					params : {
						corpId : contract.pbEnt
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var inEntInfo = resp.data[0];
						new IndisSchemaForm({
							relateModule : relateModule,
							contract : contract,
							inEntInfo : inEntInfo
						}, {
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
	addIndisSchema2 : function(relateModule) {
		new ContractLeaseSelector({
			single : true,
			params : {
				"Q_paModule_S_EQ" : RelationModule.customer.relateModule,
				"Q_pbModule_S_EQ" : RelationModule.corp.relateModule,
				"Q_applyforState_S_GE" : "3",
				"Q_applyforState_S_LE" : "6"
			},
			callback : function(d) {
				var ContractLease = d[0].data;
				new EquipSelector({
					single : true,
					callback : function(d) {
						var equipment = d[0].data;
								new IndisSchemaForm({
									relateModule : relateModule,
									ContractLease:ContractLease,
									equipment:equipment
								}, {
									saveable : true,
									callback : function() {
										this.dataGridPanel.getStore().reload();
									}.createDelegate(this)
								}).show();	
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editIndisSchema : function(a) {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【修改】的方案信息必须是【拟稿】的方案！");
			return false;
		}.createDelegate(this), function(a) {
			new IndisSchemaForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delIndisSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "schemaId", __ctxPath + "/safety/multiDelIndisSchema.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的方案信息必须是【拟稿】的方案！");
			return false;
		}.createDelegate(this));
	},
	ContractLeaseApproval : function() {
		this.speciallyGridAction(this.dataGridPanel, "schemaId", __ctxPath + "/safety/contractLeaseApprovalIndisSchema.do", "评审", function(a) {
			if ("1" == a.applyforState) {
				return true;
			}
			$toast("【评审】的方案信息必须是【待审核】的方案！");
			return false;
		}.createDelegate(this));
	},
	printIndisSchema : function(relate, type) {
		$print(this.dataGridPanel, function(a) {
			if ("Schema" == type) {
				if (a[0].data.equipment.equipGeneric == "S") {
					type = "Lift" + type;
				} else if (a[0].data.equipment.equipGeneric == "T") {
					type = "TowerCrane" + type;
				} else {
					return null;
				}
			}
			return __ctxPath + "/safety/printIndisSchema.do?formpage=IndisSchema" + relate + type + "&schemaId=" + a[0].data["schemaId"];
		});
	}
});