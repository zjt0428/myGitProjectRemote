var ReceiveManageListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
//		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
//			width : 80,
//			lable : "状态",
//			allowBlank : true
//		});
//		var receivePurposeCombo = $initComboBoxField("领用用途", "Q_receivePurpose_S_EQ", "receivePurpose", {
//			lable : "领用用途",
//			editable : true,
//			allowBlank : true,
//		});
		var generalItems = [{
			lable : "领用主题",
			name : "Q_receiveTheme_S_LK"
		}, {
			lable : "领用人",
			name : "Q_receiveMan_S_LK"
		}, {
			lable : "公司仓库",
			name : "Q_depotName_S_LK"
		}, {
			lable : "领用日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_receiveDate_S_GE"
		},{
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_receiveDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadReceiveManage
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "receiveId",
			sortDir : "desc",
			id : "receiveId",
			fields : ReceiveManageListViewField
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
			dataIndex : "statusName"
		}, {
			header : "领用编号",
			dataIndex : "receiveSerial"
		}, {
			header : "领用主题",
			dataIndex : "receiveTheme"
		},{
			header : "仓库",
			dataIndex : "depotName"
		}, {
			header : "领用人",
			dataIndex : "receiveMan"
		}, {
			header : "领用时间",
			dataIndex : "receiveDate"
		},{
			header : "审批情况",
			dataIndex : "applyforStateName"
		}]
		
	};
	ReceiveManageListView.superclass.constructor.call(this, Ext.apply({
		id : "ReceiveManageListView",
		title : "周材领用管理",
		iconCls : "menu-business-pickup",
		url : __ctxPath + "/materials/listReceiveManage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ReceiveManageListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptReceiveManage
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveReceiveManage
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_ReceiveManageAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_ReceiveManageApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ReceiveManageAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addReceiveManage.createDelegate(this)
			});
		}
		if (isGranted("_ReceiveManageEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editReceiveManage.createDelegate(this)
			});
		}
		if (isGranted("_ReceiveManageMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitReceiveManage.createDelegate(this)
			});
		}
//		if (isGranted("_ReceiveManageAuto")) {
//			tbarItems.push({
//				iconCls : "btn-head-add",
//				text : "生成付款单",
//				handler : this.autoReceiveManage.createDelegate(this)
//			});
//		}
		if (isGranted("_ReceiveManageMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delReceiveManage.createDelegate(this)
			});
		}
		if (isGranted("_ReceiveManageReturn")) {
			tbarItems.push({
				iconCls : "btn-business-returnback",
				text : "归还",
				handler : this.returnReceiveManage.createDelegate(this)
			});
		}
//		if (isGranted("_ReceiveManageOnekeyApprove")) {
//			tbarItems.push({
//				iconCls : "btn-approve",
//				text : "一键审批",
//				handler : this.onekeyApproveReceiveManage.createDelegate(this)
//			});
//		}
		tbarItems.push("->");
		if (isGranted("_ReceiveManagePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printReceiveManage.createDelegate(this)
			});
		}
//		tbarItems.push("->");
//		if (isGranted("_ReceiveManageExporter")) {
//			tbarItems.push({
//				iconCls : "btn-head-exporter",
//				text : "导出",
//				handler : this.exportReceiveManage.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的领用！";
		var msg2 = "您确认要【" + op + "】所选的领用吗？";
		var msg3 = "成功【" + op + "】所选的领用！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptReceiveManage : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的领用信息必须是【待审核】的状态！");
			return;
		}
		new ReceiveManageForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveReceiveManage : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的领用信息必须是【待审批】的状态！");
			return;
		}
		new ReceiveManageForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadReceiveManage : function(a) {
		new ReceiveManageForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addReceiveManage : function() {
		new ReceiveManageForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editReceiveManage : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的领用信息必须是【待提交】的领用！");
			return;
		}
		new ReceiveManageForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitReceiveManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "receiveId", __ctxPath + "/materials/multiSubmitReceiveManage.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的领用信息必须是【待提交】的领用！");
			return false;
		}.createDelegate(this));
	},
	returnReceiveManage : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【归还】的记录！");
			return;
		}
		if ("3" != a[0].data.applyforState) {
			$toast("【归还】的领用信息必须是审批【完成】的领用！");
			return;
		}
		if ("3" == a[0].data.status) {
			$toast("【归还】的领用信息必须是【未归还完】的领用！");
			return;
		}
		new ReceiveManageForm(a[0].data, {
			returnable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},

	onekeyApproveReceiveManage : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		this.speciallyGridAction(this.dataGridPanel, "receiveId", __ctxPath + "/materials/onekeyApproveReceiveManage.do", "一键审批", function(a) {
			if ("3" == a.applyforState) {
				$toast("【一键审批】的领用信息必须是【未通过审批】的领用！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	delReceiveManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "receiveId", __ctxPath + "/materials/multiDelReceiveManage.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的领用信息必须是【待提交】的领用！");
			return false;
		}.createDelegate(this));
	},
	printReceiveManage : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/materials/printFormReceiveManage.do?receiveId=" + a[0].data["receiveId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	exportReceiveManage : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/materials/exportReceiveManage.do", this.dataGridPanel);
	},
	autoReceiveManage : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行生成付款单！");
			return ;
		}
		for(var c = 0;c<length;c++){
			$request({
				url : __ctxPath + "/materials/loadReceiveManage.do",
				params : {
                    receiveId : a[c].data.receiveId
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