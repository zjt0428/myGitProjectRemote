var ComponIntoStoreListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "EQUIP_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo,{
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "入库时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_intoDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_intoDate_DG_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadEquipWarehouse
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
			fields : ComponIntoStoreListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "入库单号",
			dataIndex : "serial",
		},{
			header : "入库时间",
			dataIndex : "intoDate"
		},{
			header : "合同编号",
			dataIndex : "contractNo"
		},{
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目所属地",
			dataIndex : "address"
		}, {
			header : "备注",
			dataIndex : "remark"
		}, {
			header : "收货人员",
			dataIndex : "receiveMan"
		},{
			width : 50,
			header : "负责人",
			dataIndex : "principal"
		},{
			width : 50,
			header : "入库仓库",
			dataIndex : "storeName"
		},  {
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	ComponIntoStoreListView.superclass.constructor.call(this, Ext.apply({
		id : "ComponIntoStoreListView",
		title : TabTitle.COMPON_INTOSTORE_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listComponIntoStore.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ComponIntoStoreListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipWarehouse
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "2":
				if (isGranted("_ComponIntoApprove")) {
					action[1].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ComponIntoAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipWarehouse.createDelegate(this)
			});
		}
		if (isGranted("_ComponIntoEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipWarehouse.createDelegate(this)
			});
		}
		if (isGranted("_ComponIntoMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipWarehouse.createDelegate(this)
			});
		}
		if (isGranted("_ComponIntoMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipWarehouse.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_LogisticsTransportPrints")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipWarehouse.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的入库申请！";
		var msg2 = "您确认要【" + op + "】所选的入库申请吗？";
		var msg3 = "成功【" + op + "】所选的入库申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveEquipWarehouse : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的入库申请必须是【待审批】的状态！");
			return;
		}
		new ComponIntoStoreForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadEquipWarehouse : function(a) {
		new ComponIntoStoreForm(a).show();
	},
	addEquipWarehouse : function() {
		new ContractLeaseSelector({
			params : {
				"Q_applyforState_S_GE" : "3",
				"Q_applyforState_S_LE" : "6"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new ComponIntoStoreForm({
					projectId : data.projectId,
					project : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();

	},
	editEquipWarehouse : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的入库申请必须是【待提交】的入库申请！");
				return false;
			}
			return true;
		}, function(a) {
			new ComponIntoStoreForm(a.data, {
				projectId : a.data.projectId,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitEquipWarehouse : function() {
		this.speciallyGridAction(this.dataGridPanel, "rowId", __ctxPath + "/equip/multiSubmitComponIntoStore.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的入库申请必须是【待提交】的入库申请！");
			return false;
		}.createDelegate(this));
	},
	delEquipWarehouse : function() {
		this.speciallyGridAction(this.dataGridPanel, "rowId", __ctxPath + "/equip/multiDelComponIntoStore.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的入库申请必须是【待提交】的入库申请！");
			return false;
		}.createDelegate(this));
	},
	printEquipWarehouse : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的信息！");
			return;
		}
		var url = __ctxPath + "/equip/printComponIntoStore.do?rowId=" + a[0].data["rowId"];
		window.open(url, "附件详细信息", "height=600,width=1000,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
});