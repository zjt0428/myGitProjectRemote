var BorrowListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "BORROW_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "借用编号",
			name : "Q_borrowSerial_S_LK"
		}, {
			lable : "借用单位",
			name : "Q_inrelateName_S_LK"
		}, {
			lable : "借出单位",
			name : "Q_outrelateName_S_LK"
		}, {
			lable : "借用主题",
			name : "Q_borrowTheme_S_LK"
		}, {
			lable : "借用时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_borrowDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_borrowDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadBorrow
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
			fields : BorrowListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "借用类别",
			dataIndex : "borrowType",
			renderer : function(n) {
				if (n == "1") {
					return "借出";
				} else {
					return "借进";
				}
			}
		}, {
			header : "借用单号",
			dataIndex : "borrowSerial"
		}, {
			header : "借用主题",
			dataIndex : "borrowTheme"
		}, {
			header : "借出单位",
			dataIndex : "outrelateName"
		}, {
			header : "借用单位",
			dataIndex : "inrelateName"
		}, {
			header : "借用时间",
			dataIndex : "borrowDate"
		}, {
			header : "归还时间",
			dataIndex : "returnDate"
		}, {
			width : 60,
			header : "款项状态",
			dataIndex : "fundStatusName"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ]
	};
	BorrowListView.superclass.constructor.call(this, Ext.apply({
		id : "BorrowListView",
		title : TabTitle.BORROW_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listBorrow.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(BorrowListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptBorrow
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveBorrow
		});
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "续借审核",
			hidden : true,
			handler : this.acceptRenewBorrow
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "续借审批",
			hidden : true,
			handler : this.approveRenewBorrow
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_BorrowAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_BorrowApprove")) {
					action[2].hidden = false;
				}
				break;
			case "4":
				if (isGranted("_BorrowRenewAccept")) {
					action[3].hidden = false;
				}
				break;
			case "5":
				if (isGranted("_BorrowRenewApprove")) {
					action[4].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BorrowAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增(借进)",
				handler : this.addBorrow.createDelegate(this, [ {
					borrowType : "0",
					borrowTypeName : "借进"
				} ])
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增(借出)",
				handler : this.addBorrow.createDelegate(this, [ {
					borrowType : "1",
					borrowTypeName : "借出"
				} ])
			});
		}
		if (isGranted("_BorrowEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editBorrow.createDelegate(this)
			});
		}
		if (isGranted("_BorrowMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitBorrow.createDelegate(this)
			});
		}
		if (isGranted("_BorrowRenewSubmit")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-clock",
				text : "续借",
				menu : {
					items : [ {
						text : "选择续借日期",
						iconCls : "calendar",
						menu : {
							xtype : "kudatemenu",
							pickerConfig : {
								minDate : new Date()
							},
							handler : this.applyforRenewBorrow.createDelegate(this)
						}
					} ]
				}
			});
		}
		if (isGranted("_BorrowMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delBorrow.createDelegate(this)
			});
		}
		if (isGranted("_BorrowAcceptance")) {
			tbarItems.push({
				xtype : "tbsplit",
				text : "归还",
				tooltip : {
					text : "借用验收方式选择",
					title : "归还验收管理"
				},
				iconCls : "btn-business-returnback",
				menu : {
					items : [ {
						iconCls : "btn-play",
						text : "验收合格",
						handler : this.acceptanceBorrow.createDelegate(this, [ "returned" ])
					}, '-', {
						iconCls : "btn-stop",
						text : "验收不合格",
						menu : {
							items : [ {
								iconCls : "btn-stop",
								text : "报损维修",
								handler : this.acceptanceBorrow.createDelegate(this, [ "damage" ])
							}, {
								iconCls : "btn-stop",
								text : "遗失/重新购买",
								handler : this.acceptanceBorrow.createDelegate(this, [ "lose" ])
							} ]
						}
					} ]
				}
			});
		}
		if (isGranted("_BorrowAddPickup")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增配件",
				handler : this.addPickupBorrow.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_BorrowPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printBorrow.createDelegate(this)
			});
		}
		if (isGranted("_BorrowExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportBorrow.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的借用！";
		var msg2 = "您确认要【" + op + "】所选的借用吗？";
		var msg3 = "成功【" + op + "】所选的借用！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptBorrow : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的借用信息必须是【待审核】的状态！");
			return;
		}
		new BorrowForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveBorrow : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的借用信息必须是【待审批】的状态！");
			return;
		}
		new BorrowForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	acceptRenewBorrow : function(a) {
		if ("4" != a.applyforState) {
			$toast("【审核】的借用信息必须是【续借待审】的状态！");
			return;
		}
		new BorrowForm(a, {
			title : a.borrowSerial + "-续借审核",
			showRenewDate : true,
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveRenewBorrow : function(a) {
		if ("5" != a.applyforState) {
			$toast("【审核】的借用信息必须是【续借待批】的状态！");
			return;
		}
		new BorrowForm(a, {
			title : a.borrowSerial + "-续借审批",
			showRenewDate : true,
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadBorrow : function(a) {
		new BorrowForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addBorrow : function(a) {
		new BorrowForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editBorrow : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的借用信息必须是【待提交】的借用！");
			return;
		}
		new BorrowForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitBorrow : function() {
		this.speciallyGridAction(this.dataGridPanel, "borrowId", __ctxPath + "/dispatch/multiSubmitBorrow.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的借用信息必须是【待提交】的借用！");
			return false;
		}.createDelegate(this));
	},
	applyforRenewBorrow : function(dp) {
		var date = dp.value;
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【续借】的记录！");
			return;
		}
		if ("3" != a[0].data.applyforState) {
			$toast("【续借】的借用信息必须是【待归还】的借用！");
			return;
		}
		var data = a[0].data;
		this.submitRenewBorrow(data, date);
	},
	submitRenewBorrow : function(data, date) {
		var returnDate = Date.parse(data.returnDate.replace(/-/g, "/"));
		var renewDate = date.format("Y-m-d");
		if (returnDate >= date) {
			$toast("【续借】的日期【" + renewDate + "】要大于原归还日期【" + new Date(returnDate).format("Y-m-d") + "】！");
			return;
		}
		var borrowSerial = data.borrowSerial;
		Ext.Msg.confirm("信息确认", "您确认要将借用编号【" + borrowSerial + "】的归还日期由【" + data.returnDate + "】延长至【" + renewDate + "】!", function(c) {
			if (c == "yes") {
				$request({
					url : __ctxPath + "/dispatch/submitRenewBorrow.do",
					params : {
						borrowId : data.borrowId,
						renewDate : renewDate
					},
					success : function(g, h) {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	},
	delBorrow : function() {
		this.speciallyGridAction(this.dataGridPanel, "borrowId", __ctxPath + "/dispatch/multiDelBorrow.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的借用信息必须是【待提交】的借用！");
			return false;
		}.createDelegate(this));
	},
	addPickupBorrow : function() {
		new BorrowForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	fillInBorrowAcceptance : function(data, method) {
		switch (method) {
			case "lose":
				data.returnable = false;
				data.acceptanceStatus = "2";
				data.acceptanceStatusName = "不合格";
				data.handleMethod = "4";
				data.handleMethodName = "遗失/重新购买";
				data.refundPlanDate = new Date();
				break;
			case "damage":
				data.returnable = false;
				data.acceptanceStatus = "2";
				data.acceptanceStatusName = "不合格";
				data.handleMethod = "3";
				data.handleMethodName = "报损维修";
				data.arrivalPlanDate = new Date();
				break;
			case "returned":
				data.returnable = true;
				data.acceptanceStatus = "1";
				data.acceptanceStatusName = "合格";
				data.handleMethod = "5";
				data.handleMethodName = "归还";
				break;
		}
		data.accMethod = method;
		new BorrowAcceptanceForm(data, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	acceptanceBorrow : function(method) {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【验收】的记录！");
			return;
		}
		if (a[0].data.applyforState != "3") {
			$toast("【验收】的借用信息必须是审批【完成】的但未完成验收！");
			return;
		}
		var data = a[0].data;
		this.fillInBorrowAcceptance(data, method);
	},
	printBorrow : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printFormBorrow.do?borrowId=" + a[0].data["borrowId"];
		});
	},
	exportBorrow : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportBorrow.do", this.dataGridPanel);
	}
});