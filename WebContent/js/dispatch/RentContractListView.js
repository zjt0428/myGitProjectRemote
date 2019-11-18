var RentContractListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var fundStatusCombo = $initComboBoxField("款项状态", "Q_fundStatus_S_EQ", "FUND_PLAN_STATUS", {
			width : 80,
			lable : "款项状态",
			allowBlank : true
		});
		var generalItems = [ fundStatusCombo, {
			lable : "产权人",
			name : "Q_propertyName_S_LK"
		}, {
			lable : "承包人",
			name : "Q_contractor_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK",
			value : this.projectName ? this.projectName : ""
		}, {
			lable : "承租方",
			name : "Q_paEntName_S_LK",
			value : this.paEntName ? this.paEntName : ""
		}, {
			lable : "结算周期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_endRentDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startRentDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadRentContract
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : this.delayed_load,
		store : {
			fields : RentContractListViewField
		},
		rowAction : {
			width : 75,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "款项状态",
			dataIndex : "fundStatusName"
		}, {
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial"
		}, {
			header : "施工单位",
			dataIndex : "paEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "税率",
			width : 35,
			dataIndex : "taxRate"
		}, {
			header : "结算开始时间",
			dataIndex : "startRentDate"
		}, {
			header : "截止时间",
			dataIndex : "endRentDate"
		}, {
			header : "产权人",
			dataIndex : "propertyName"
		}, {
			header : "承包人",
			dataIndex : "contractor"
		}, {
			header : "租金总计(承包总价)",
			dataIndex : "rentAmount"
		}, {
			header : "扣费金额",
			dataIndex : "deductAmount"
		}, {
			header : "应付金额",
			dataIndex : "arrearsAmount"
		}, {
			header : "已付金额",
			dataIndex : "finishedAmount"
		}, {
			width : 40,
			header : "结算单",
			dataIndex : "effectiveName",
			renderer : function(n) {
				if (n == "未生效") {
					return "<font face='宋体' color='red'>未生效</font>";
				}
				return "已生效";
			}
		} ]
	};
	RentContractListView.superclass.constructor.call(this, Ext.apply({
		id : "RentContractListView",
		title : TabTitle.RENT_CONTRACT_LIST,
		iconCls : "menu-business-settle",
		url : __ctxPath + "/dispatch/listRentContract.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(RentContractListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_RentContractAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addRentContract.createDelegate(this)
			});
		}
		if (isGranted("_RentContractEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editRentContract.createDelegate(this)
			});
		}
		if (isGranted("_RentContractMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveRentContract.createDelegate(this)
			});
		}
		if (isGranted("_RentContractMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveRentContract.createDelegate(this)
			});
		}
		if (isGranted("_RentContractMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delRentContract.createDelegate(this)
			});
		}
		tbarItems.push({
			iconCls : "btn-head-del",
			text : "合计",
			handler : this.combinedSelectedRentContract.createDelegate(this)
		});
		tbarItems.push("->");
		if (isGranted("_RentContractPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printRentContract.createDelegate(this)
			});
		}
		if (isGranted("_RentContractExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportRentContract.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的代租结算信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的代租结算信息吗？";
		var msg3 = "成功【" + op + "】所选的代租结算信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadRentContract : function(a) {
		new RentContractForm(a).show();
	},
	addRentContract : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "4",
				Q_applyforState_S_LE : "6",
				Q_effective_S_EQ : "1"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/dispatch/loadContractLease.do",
					params : {
						contractId : data.contractId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						new RentContractForm({
							contractId : data.contractId,
							contract : data
						}, {
							animateTarget : this.el,
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
	editRentContract : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.effective) {
			$toast("【已生效】的信息无法进行【修改】！");
			return;
		}
		new RentContractForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	effectiveRentContract : function() {
		this.speciallyGridAction(this.dataGridPanel, "rentId", __ctxPath + "/dispatch/multiEffectiveRentContract.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该结算信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveRentContract : function() {
		this.speciallyGridAction(this.dataGridPanel, "rentId", __ctxPath + "/dispatch/multiLoseEffectiveRentContract.do", "失效", null, "是否确认失效");
	},
	delRentContract : function() {
		this.speciallyGridAction(this.dataGridPanel, "rentId", __ctxPath + "/dispatch/multiDelRentContract.do", "删除", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("【已生效】的结算信息无法进行【删除】！");
			return false;
		}.createDelegate(this));
	},
	combinedSelectedRentContract : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("还未选择代租结算信息！");
			return;
		}
		var arrearsAmount = 0;
		for (var i = 0; i < a.length; i++) {
			arrearsAmount += Number(a[i].data.arrearsAmount);
		}
		Ext.MessageBox.alert("合计情况", "剩余金额累计" + arrearsAmount + "元，计数为" + a.length + "条。");
	},
	printRentContract : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printRentContract.do?formpage=RentContract&rentId=" + a[0].data["rentId"];
		});
	},
	exportRentContract : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportRentContract.do", this.dataGridPanel);
	}
});