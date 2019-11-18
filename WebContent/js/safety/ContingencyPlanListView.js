var ContingencyPlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "预案编号",
			name : "Q_contingencySerial_S_LK"
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
		handler : this.readContingencyPlan
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ContingencyPlanListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "方案编号",
			dataIndex : "contingencySerial"
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
			header : "应急办公电话",
			dataIndex : "contingencyPhone"
		} ]
	};
	ContingencyPlanListView.superclass.constructor.call(this, Ext.apply({
		id : "ContingencyPlanListView",
		title : TabTitle.CONTINGENCY_PLAN_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listContingencyPlan.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContingencyPlanListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的应急预案！";
		var msg2 = "您确认要【" + op + "】所选的应急预案吗？";
		var msg3 = "成功【" + op + "】所选的应急预案！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readContingencyPlan : function(a) {
		new ContingencyPlanForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addContingencyPlan : function(relateModule) {
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
						new ContingencyPlanForm({
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
		}).show();
	},
	editContingencyPlan : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new ContingencyPlanForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delContingencyPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "contingencyId", __ctxPath + "/safety/multiDelContingencyPlan.do", "删除");
	},
	printContingencyPlan : function(relate, type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printContingencyPlan.do?formpage=ContingencyPlan" + relate + type+ "&contingencyId=" + a[0].data["contingencyId"];
		});
	}
});