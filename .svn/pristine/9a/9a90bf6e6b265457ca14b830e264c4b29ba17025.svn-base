var InsureEquipListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	var todayDate = KnightUtil.date.getCurrentDate();

	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var overdueFiled = new Ext.form.Hidden({
			hidden : true,
			name : "Q_endInsureDate_S_LT"
		});
		var effectiveFiled = new Ext.form.Hidden({
			hidden : true,
			name : "Q_endInsureDate_S_GE"
		});
		var statusCombo = new Ext.form.ComboBox({
			lable : "状态",
			width : 60,
			mode : "local",
			editable : false,
			allowBlank : false,
			triggerAction : "all",
			store : [ [ "2", "全部" ], [ "0", "过期" ], [ "1", "有效" ] ],
			listeners : {
				"select" : function(combo, record, index) {
					if (1 == index) {
						overdueFiled.setValue(todayDate.format("Y-m-d"));
						effectiveFiled.setValue("");
					} else if (2 == index) {
						overdueFiled.setValue("");
						effectiveFiled.setValue(todayDate.format("Y-m-d"));
					} else {
						overdueFiled.setValue("");
						effectiveFiled.setValue("");
					}
				}
			}
		});
		var equipGenericCombo = $initComboBoxField("设备名称", "Q_[equipment.equipGeneric]_S_EQ", "equipGeneric", {
			lable : "设备名称",
			allowBlank : true
		});
		generalItems = [ overdueFiled, effectiveFiled, statusCombo, {
			lable : "保险编号",
			name : "Q_insureSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_[equipment.exwSerial]_S_LK"
		}, equipGenericCombo ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadInsureEquip
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : InsureEquipListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "endInsureDate",
			width : 30,
			renderer : function(value, metadata, record) {
				var temp = Date.parseDate(value, "Y-m-d");
				if (temp >= todayDate) {
					return '<img title="有效" src="' + __ctxPath + '/img/flag/round_001.png"/>';
				} else {
					return '<img title="过期" src="' + __ctxPath + '/img/flag/round_002.png"/>';
				}
			}
		}, {
			header : "保险编号",
			dataIndex : "insureSerial"
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
			header : "产权单位",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.propertyName;
			}
		}, {
			header : "起保日期",
			dataIndex : "startInsureDate"
		}, {
			header : "终止日期",
			dataIndex : "endInsureDate"
		}, {
			header : "投保单价",
			dataIndex : "coverage"
		}, {
			header : "保险公司",
			dataIndex : "insuranceCompany"
		}, {
			header : "理赔电话",
			dataIndex : "claimPhone"
		} ]
	};
	InsureEquipListView.superclass.constructor.call(this, Ext.apply({
		id : "InsureEquipListView",
		title : TabTitle.INSURE_EQUIP_LIST,
		iconCls : "menu-business-insure",
		url : __ctxPath + "/equip/listInsureEquip.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InsureEquipListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		if (isGranted("_InsureEquipClaimEdit")) {
			actionItems.push({
				iconCls : "btn-approvalTask",
				qtip : "理赔",
				handler : this.editClaimInsureEquip.createDelegate(this)
			});
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InsureEquipAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInsureEquip.createDelegate(this)
			});
		}
		if (isGranted("_InsureEquipEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInsureEquip.createDelegate(this)
			});
		}
		if (isGranted("_InsureEquipMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInsureEquip.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InsureEquipExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportInsureEquip.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的保险单号！";
		var msg2 = "您确认要【" + op + "】所选的保险单号吗？";
		var msg3 = "成功【" + op + "】所选的保险单号！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadInsureEquip : function(a) {
		new InsureEquipForm(a).show();
	},
	addInsureEquip : function() {
		new EquipSelector({
			single : true,
			callback : function(d) {
				new InsureEquipForm({
					equipment : d[0].data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editInsureEquip : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new InsureEquipForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delInsureEquip : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/equip/multiDelInsureEquip.do", "删除");
	},
	editClaimInsureEquip : function(data) {
		new InsureEquipForm(data, {
			claimable : true
		}).show();
	},
	exportInsureEquip : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportInsureEquip.do", this.dataGridPanel);
	}
});