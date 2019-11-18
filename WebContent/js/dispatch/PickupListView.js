var PickupListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		var pickupPurposeCombo = $initComboBoxField("领用用途", "Q_pickupPurpose_S_EQ", "pickupPurpose", {
			lable : "领用用途",
			editable : true,
			allowBlank : true,
		});
		var generalItems = [ applyforStatusCombo,pickupPurposeCombo, {
			lable : "领用编号",
			name : "Q_pickupSerial_S_LK"
		}, {
			lable : "领用人",
			name : "Q_recipients_S_LK"
		}, {
			lable : "领用日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_pickupDate_S_GE"
		},{
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_pickupDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadPickup
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "pickupId",
			sortDir : "desc",
			id : "pickupId",
			fields : PickupListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "pickupStatusName"
		}, {
			header : "领用单号",
			dataIndex : "pickupSerial",
			renderer : function(a, b, c) {
				return a.substring(0,8)+a.substring(8,14);
			}	
		}, {
			header : "领用主题",
			dataIndex : "pickupTheme"
		},{
			header : "领用用途",
			dataIndex : "pickupPurposeName"
		}, {
			header : "领用人",
			dataIndex : "recipients"
		}, {
			header : "领用时间",
			dataIndex : "pickupDate"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			header : "业务编号",
			dataIndex : "relateSerial"
		}, {
			header : "合计金额",
			dataIndex : "pickupAmount"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.exwSerial;
			}
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		}, {
			header : "关联项目",
			dataIndex : "projectName"
		} ]
		
	};
	PickupListView.superclass.constructor.call(this, Ext.apply({
		id : "PickupListView",
		title : TabTitle.PICKUP_LIST,
		iconCls : "menu-business-pickup",
		url : __ctxPath + "/dispatch/listPickup.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PickupListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptPickup
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approvePickup
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_PickupAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_PickupApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PickupAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPickup.createDelegate(this)
			});
		}
		if (isGranted("_PickupEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPickup.createDelegate(this)
			});
		}
		if (isGranted("_PickupMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitPickup.createDelegate(this)
			});
		}
		if (isGranted("_PickupAuto")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "生成付款单",
				handler : this.autoPickup.createDelegate(this)
			});
		}
		if (isGranted("_PickupMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPickup.createDelegate(this)
			});
		}
		if (isGranted("_PickupReturn")) {
			tbarItems.push({
				iconCls : "btn-business-returnback",
				text : "归还",
				handler : this.returnPickup.createDelegate(this)
			});
		}
		if (isGranted("_PickupOnekeyApprove")) {
			tbarItems.push({
				iconCls : "btn-approve",
				text : "一键审批",
				handler : this.onekeyApprovePickup.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_PickupPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printPickup.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_PickupExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportPickup.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的领用！";
		var msg2 = "您确认要【" + op + "】所选的领用吗？";
		var msg3 = "成功【" + op + "】所选的领用！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptPickup : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的领用信息必须是【待审核】的状态！");
			return;
		}
		new PickupForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approvePickup : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的领用信息必须是【待审批】的状态！");
			return;
		}
		new PickupForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadPickup : function(a) {
		new PickupForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addPickup : function() {
		new PickupForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editPickup : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的领用信息必须是【待提交】的领用！");
			return;
		}
		new PickupForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitPickup : function() {
		this.speciallyGridAction(this.dataGridPanel, "pickupId", __ctxPath + "/dispatch/multiSubmitPickup.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的领用信息必须是【待提交】的领用！");
			return false;
		}.createDelegate(this));
	},
	returnPickup : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【归还】的记录！");
			return;
		}
		if ("3" != a[0].data.applyforState) {
			$toast("【归还】的领用信息必须是审批【完成】的领用！");
			return;
		}
		if ("3" == a[0].data.pickupStatus) {
			$toast("【归还】的领用信息必须是【未归还完】的领用！");
			return;
		}
		new PickupForm(a[0].data, {
			returnable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},

	onekeyApprovePickup : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		this.speciallyGridAction(this.dataGridPanel, "pickupId", __ctxPath + "/dispatch/onekeyApprovePickup.do", "一键审批", function(a) {
			if ("3" == a.applyforState) {
				$toast("【一键审批】的领用信息必须是【未通过审批】的领用！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	delPickup : function() {
		this.speciallyGridAction(this.dataGridPanel, "pickupId", __ctxPath + "/dispatch/multiDelPickup.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的领用信息必须是【待提交】的领用！");
			return false;
		}.createDelegate(this));
	},
	printPickup : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/dispatch/printFormPickup.do?pickupId=" + a[0].data["pickupId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	exportPickup : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportPickup.do", this.dataGridPanel);
	},
	autoPickup : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行生成付款单！");
			return ;
		}
		for(var c = 0;c<length;c++){
			$request({
				url : __ctxPath + "/dispatch/loadPickup.do",
				params : {
                    pickupId : a[c].data.pickupId
				},
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					var data = resp.data[0];
					data.projectId = data.project.projectId;
					data.projectSerial = data.project.projectSerial;
					data.projectName = data.projectName;
					data.address = data.project.address;
					var mount = {
						relateId : data.pickupId,
						relateSerial : data.pickupSerial,
						relateTheme : data.pickupSerial,
						relateModule : RelationModule.pickup.relateModule,
						relateModuleName : RelationModule.pickup.relateModuleName,
                        projectName : data.projectName,
						relationData : data
					};
					if (mount && mount.relateId && mount.relateModule) {
						mount.relation = {};
						Ext.apply(mount.relation, {
							relateId : mount.relateId,
							relateTheme : mount.relateTheme,
							relateModule : mount.relateModule,
							relateModuleName : mount.relateModuleName,
							projectName : mount.projectName
						});
					}
					new AmountPaymentForm(mount, {
						saveable : true,
						auto:true,
						paymentPlanDisabled : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			});}
	}
});