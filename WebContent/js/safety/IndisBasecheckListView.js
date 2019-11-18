var IndisBasecheckListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "基础验收编号",
			name : "Q_basecheckSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		}, {
			lable : "登记日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_EQ"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readIndisBasecheck
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : IndisBasecheckListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "检查编号",
			dataIndex : "basecheckSerial"
		}, {
			header : "填报日期",
			dataIndex : "providedDate"
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
			header : "安装单位",
			dataIndex : "inEntName"
		}, {
			header : "使用单位",
			dataIndex : "emEntName"
		} ]
	};
	IndisBasecheckListView.superclass.constructor.call(this, Ext.apply({
		id : "IndisBasecheckListView",
		title : TabTitle.INDIS_BASECHECK_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listIndisBasecheck.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(IndisBasecheckListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的基础验收！";
		var msg2 = "您确认要【" + op + "】所选的基础验收吗？";
		var msg3 = "成功【" + op + "】所选的基础验收！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readIndisBasecheck : function(a) {
		new IndisBasecheckForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addIndisBasecheck : function(relateModule) {
		new ContractLeaseSelector({
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
						new EquipSelector({
							single : true,
							callback : function(d) {
								var equipment = d[0].data;
								new IndisBasecheckForm({
									relateModule : relateModule,
									contract : contract,
									inEntInfo : inEntInfo,
									equipment : equipment
								}, {
									saveable : true,
									callback : function() {
										this.dataGridPanel.getStore().reload();
									}.createDelegate(this)
								}).show();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	editIndisBasecheck : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new IndisBasecheckForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delIndisBasecheck : function() {
		this.speciallyGridAction(this.dataGridPanel, "basecheckId", __ctxPath + "/safety/multiDelIndisBasecheck.do", "删除");
	},
	printIndisBasecheck : function(relate) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printIndisBasecheck.do?formpage=IndisBasecheck" + relate + "&basecheckId=" + a[0].data["basecheckId"];
		});
	}
});