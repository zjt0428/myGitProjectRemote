var EquipDismantleListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	if(!isGranted("__ALL")) {
		this.params['QVO_equipFlow.contractLease.permissionFlag_S_LK'] = curUserInfo.dataPermission;
	}
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "EQUIP_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		}, {
			lable : "设备自编号",
			name : "Q_equipFlow.equipDiary.equipSerial_S_LK"
		},{
			lable : "填报起止日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadEquipDismantle
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
			fields : EquipDismantleListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "楼号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.buildingNum;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSerial;
			}
		}, {
			header : "合同编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.contractLease.contractNo;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "拆卸结束时间",
			dataIndex : "enddisDate"
		}, {
			header : "拆卸负责人",
			dataIndex : "principal"
		}, {
			header : "拆卸标准节数",
			dataIndex : "knotCounts"
		}, {
			header : "拆卸附墙数",
			dataIndex : "wallAttacheQty"
		}, {
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ]
	};
	EquipDismantleListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipDismantleListView",
		title : TabTitle.EQUIP_DISMANTLE_LIST,
		iconCls : "menu-business-dismantle",
		url : __ctxPath + "/equip/listEquipDismantle.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipDismantleListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptEquipDismantle
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipDismantle
		});
		actionItems.push({
			iconCls : "btn-rowaction_del",
			qtip : "回收",
			hidden : true,
			handler : this.retrieveDismantleSource
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_EquipDismantleAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipDismantleApprove")) {
					action[2].hidden = false;
				}
				break;
			case "3":
				if (isGranted("_EquipDismantleRetrieve") && record.data.equipFlow.flowState == "6" && Date.parseDate(record.data.enddisDate, "Y-m-d H:i:s") >= (new Date())) {
					action[3].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipDismantleAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler :this.addInstallEquipDismantle.createDelegate(this)
			});
		}
		if (isGranted("_EquipDismantleEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipDismantle.createDelegate(this)
			});
		}
		if (isGranted("_EquipDismantleMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipDismantle.createDelegate(this)
			});
		}
		if (isGranted("_EquipDismantleMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipDismantle.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipDismantlePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipDismantle.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的拆卸告知！";
		var msg2 = "您确认要【" + op + "】所选的拆卸告知吗？";
		var msg3 = "成功【" + op + "】所选的拆卸告知！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptEquipDismantle : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的拆卸告知必须是【待审核】的状态！");
			return;
		}
		new EquipDismantleForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveEquipDismantle : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的拆卸告知必须是【待审批】的状态！");
			return;
		}
		new EquipDismantleForm(a, {
			store : {
				belongToArea : a.equipFlow.contractLease.belongToAreaName,
				contractId : a.equipFlow.contractLease.contractId,
				equipSpecificName : a.equipFlow.equipDiary.equipSpecificName,
            	equipSpecific : a.equipFlow.equipDiary.equipSpecific
			},
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	retrieveDismantleSource : function(a) {
		new EquipDismantleForm(a, {
			retrieveable : true
		}).show();
	},
	loadEquipDismantle : function(a) {
		new EquipDismantleForm(a,{
			store : {
            	belongToArea : a.equipFlow.contractLease.belongToAreaName,
            	contractId : a.equipFlow.contractLease.contractId,
            	equipSpecificName : a.equipFlow.equipDiary.equipSpecificName,
            	equipSpecific : a.equipFlow.equipDiary.equipSpecific
			}
		}).show();
	},
	addEquipDismantle : function(data,IorE) {
		if(IorE){
			IorE = data.flowId;
		}else{
			IorE = data.equipFlow.flowId;
		}
		$request({
			url : __ctxPath + "/equip/loadEquipFlow.do",
			params : {
				flowId : IorE
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data1 = resp.data[0];
				new EquipDismantleForm({
					equipFlow : data1,
					store : {
                    	belongToAreaName : data.contractLease.belongToAreaName,
                    	belongToArea : data.contractLease.belongToArea,
                    	contractId : data.contractLease.contractId,
                    	equipSpecificName : data.equipDiary.equipSpecificName,
                    	equipSpecific : data.equipDiary.equipSpecific
                    }
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		});
	},
	addInstallEquipDismantle : function() {
		new EquipFlowInstallSelector({
			single : true,
			title1 : true,
			params : {
				"Q_flowState_S_LT" : "6",
				"Q_[equipInstall.applyforState]_S_EQ" : "3",
				"Q_[equipInstall.delFlag]_S_EQ" : "1"
			},
			callback : function(d) {
				var data = d[0].data;
				this.addEquipDismantle(data,true);
			}.createDelegate(this)
		}).show();
	},
	editEquipDismantle : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的拆卸告知必须是【待提交】的拆卸告知！");
			return;
		}
		new EquipDismantleForm(a[0].data, {
			store : {
				belongToAreaName : a[0].data.equipFlow.contractLease.belongToAreaName,
            	belongToArea : a[0].data.equipFlow.contractLease.belongToArea,
            	contractId : a[0].data.equipFlow.contractLease.contractId,
            	equipSpecificName : a[0].data.equipFlow.equipDiary.equipSpecificName,
            	equipSpecific : a[0].data.equipFlow.equipDiary.equipSpecific
            },
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	dispatchEquipDismantle : function() {
		this.speciallyGridAction(this.dataGridPanel, "dismantleId", __ctxPath + "/equip/multiDispatchEquipDismantle.do", "调度", function(a) {
			if ("3" != a.applyforState) {
				$toast("【提交】的拆卸告知必须是【审批通过】的拆卸告知！");
				return false;
			}
			if (Date.parseDate(a.enddisDate, "Y-m-d H:i:s") < (new Date())) {
				$toast("【提交】的拆卸告知已于【" + a.enddisDate + "】拆卸完成！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	submitEquipDismantle : function() {
		this.speciallyGridAction(this.dataGridPanel, "dismantleId", __ctxPath + "/equip/multiSubmitEquipDismantle.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的拆卸告知必须是【待提交】的拆卸告知！");
		}.createDelegate(this));
	},
	delEquipDismantle : function() {
		this.speciallyGridAction(this.dataGridPanel, "dismantleId", __ctxPath + "/equip/multiDelEquipDismantle.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的拆卸告知必须是【待提交】的拆卸告知！");
			return false;
		}.createDelegate(this));
	},
	printEquipDismantle : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipDismantle.do?formpage=EquipDismantle&dismantleId=" + a[0].data["dismantleId"];
		});
	}
});