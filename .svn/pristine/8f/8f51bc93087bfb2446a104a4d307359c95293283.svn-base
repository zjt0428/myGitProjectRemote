var IndisProtocolListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "事故编号",
			name : "Q_accidentSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
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
		handler : this.readIndisProtocol
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : IndisProtocolListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "协议编号",
			dataIndex : "protocolSerial"
		}, {
			header : "登记日期",
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
			header : "安装资质",
			dataIndex : "inEntCertNum"
		} ]
	};
	IndisProtocolListView.superclass.constructor.call(this, Ext.apply({
		id : "IndisProtocolListView",
		title : TabTitle.INDIS_PROTOCOL_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listIndisProtocol.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(IndisProtocolListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的安拆协议！";
		var msg2 = "您确认要【" + op + "】所选的安拆协议吗？";
		var msg3 = "成功【" + op + "】所选的安拆协议！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readIndisProtocol : function(a) {
		new IndisProtocolForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addIndisProtocol : function(relateModule) {
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
						new IndisProtocolForm({
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
	editIndisProtocol : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new IndisProtocolForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delIndisProtocol : function() {
		this.speciallyGridAction(this.dataGridPanel, "protocolId", __ctxPath + "/safety/multiDelIndisProtocol.do", "删除");
	},
	printIndisProtocol : function(relate) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printIndisProtocol.do?formpage=IndisProtocol" + relate + "&protocolId=" + a[0].data["protocolId"];
		});
	}
});