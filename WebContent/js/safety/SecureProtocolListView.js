var SecureProtocolListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "协议编号",
			name : "Q_protocolSerial_S_LK"
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
		handler : this.readSecureProtocol
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : SecureProtocolListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "协议编号",
			dataIndex : "protocolSerial"
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
		} ]
	};
	SecureProtocolListView.superclass.constructor.call(this, Ext.apply({
		id : "SecureProtocolListView",
		title : TabTitle.SECURE_PROTOCOL_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listSecureProtocol.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SecureProtocolListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的安全协议！";
		var msg2 = "您确认要【" + op + "】所选的安全协议吗？";
		var msg3 = "成功【" + op + "】所选的安全协议！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readSecureProtocol : function(a) {
		new SecureProtocolForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addSecureProtocol : function(relateModule) {
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
						new SecureProtocolForm({
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
	editSecureProtocol : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new SecureProtocolForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delSecureProtocol : function() {
		this.speciallyGridAction(this.dataGridPanel, "protocolId", __ctxPath + "/safety/multiDelSecureProtocol.do", "删除");
	},
	printSecureProtocol : function(relate) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printSecureProtocol.do?formpage=SecureProtocol" + relate + "&protocolId=" + a[0].data["protocolId"];
		});
	}
});