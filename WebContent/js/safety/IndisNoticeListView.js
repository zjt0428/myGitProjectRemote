var IndisNoticeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var equipSpecificCombo = $initComboBoxField("规格型号", "Q_equipSpecific_S_EQ", "equipSpecific", {
			width : 140,
			lable : "规格型号",
			editable : true,
			allowBlank : true,
		});
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_[indisSchema.project.projectName]_S_LK"
		}, equipSpecificCombo ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readIndisNotice
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : IndisNoticeListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "工地自编号",
			dataIndex : "indisSchema",
			renderer : function(n) {
				return n.blockNumber;
			}
		}, {
			header : "项目名称",
			dataIndex : "indisSchema",
			renderer : function(n) {
				return n.project.projectName;
			}
		}, {
			header : "设备名称",
			dataIndex : "indisSchema",
			renderer : function(n) {
				return n.equipment.equipGenericName;
			}
		}, {
			header : "型号",
			dataIndex : "indisSchema",
			renderer : function(n) {
				return n.equipment.equipSpecificName;
			}
		}, {
			header : "企业资质等级",
			dataIndex : "indisSchema",
			renderer : function(n) {
				return n.inEntTitleLevel;
			}
		}, {
			header : "企业资质证书号",
			dataIndex : "indisSchema",
			renderer : function(n) {
				return n.inEntCertNum;
			}
		}, {
			header : "安装（拆卸）工程合同号",
			dataIndex : "contractNumber"
		} ]
	};
	IndisNoticeListView.superclass.constructor.call(this, Ext.apply({
		id : "IndisNoticeListView",
		title : this.title,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listIndisNotice.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(IndisNoticeListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的！" + this.markModuleName;
		var msg2 = "您确认要【" + op + "】所选的" + this.markModuleName + "？";
		var msg3 = "成功【" + op + "】所选的" + this.markModuleName + "！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readIndisNotice : function(a) {
		new IndisNoticeForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addIndisNotice : function(relateModule) {
		new IndisSchemaSelector({
			single : true,
			params : {
		/*		"Q_applyforState_S_EQ" : "3",
				"Q_relateModule_S_EQ" : this.relateModule*/
			},
			callback : function(d) {
				var schema = d[0].data;
				$request({
					url : __ctxPath + "/safety/loadIndisSchema.do",
					params : {
						schemaId : schema.schemaId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						new IndisNoticeForm({
							indisSchema : data,
							relateModule : relateModule
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
	editIndisNotice : function(a) {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new IndisNoticeForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delIndisNotice : function() {
		this.speciallyGridAction(this.dataGridPanel, "noticeId", __ctxPath + "/safety/multiDelIndisNotice.do", "删除");
	}
});