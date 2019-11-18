var LeaseSettlementListView = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "合同编号",
			name : "Q_[leaseContract.leaseIdentifier]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}]
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readLeaseSettlement
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	
	var datagrid_config = {
			store : {
				fields : LeaseSettlementListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [{
				header : "状态",
				dataIndex : "statusName"
			}, {
				header : "单据编号",
				dataIndex : "settlementSerial"
			}, {
				header : "合同编号",
				dataIndex : "leaseContract",
				renderer : function (n) {
					return n.leaseIdentifier;
				}
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function (n) {
					return n.projectName;
				}
			}, {
				header : "结算主题",
				dataIndex : "settlementTheme"
			}, {
				header : "起止时间",
				dataIndex : "startDate"
			}, {
				header : "截止时间",
				dataIndex : "endDate"
			}]
	}
	
	LeaseSettlementListView.superclass.constructor.call(this, Ext.apply({
		id : "LeaseSettlementListView",
		title : "租借结算",
		url : __ctxPath + "/materials/listLeaseSettlement.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}
Ext.extend(LeaseSettlementListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选的信息吗？";
		var msg3 = "成功【" + op + "】所选的信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveLeaseSettlement
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
		case "2":
			if (isGranted("_LeaseSettlementApprove")) {
				action[1].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LeaseSettlementAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLeaseSettlement.createDelegate(this)
			});
		}
		if (isGranted("_LeaseSettlementEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLeaseSettlement.createDelegate(this)
			});
		}
		if (isGranted("_LeaseSettlementMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLeaseSettlement.createDelegate(this)
			});
		} 
		if (isGranted("_LeaseSettlementMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitLeaseSettlement.createDelegate(this)
			});
		}
		if (isGranted("_LeaseSettlementMultiAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "批量新增",
				handler : this.multiAddLeaseSettlement.createDelegate(this)		
			});
		}
		return tbarItems;
	},
	readLeaseSettlement : function (a) {
		new LeaseSettlementForm(a).show();
	},
	addLeaseSettlement : function () {
		new LeaseContractSelector({
			single : true,
			params : {
				"Q_[status]_S_GE " : "3"
			},
			callback : function(a) {
				var data = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseContract.do", {
					leaseId : a[0].data.leaseId
				})
				new LeaseSettlementForm(null, {
					saveable : true,
					data : data.data[0],
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	multiAddLeaseSettlement : function(a) {
		new LeaseContractSelector({
			params : {
				"Q_[status]_S_GE " : "3"
			},
			saveable : true,
			collectEnable : true,
			single : false,
			callback : function(d) {
				var leaseIds =Array();
				for(var i =0;i<d.length;i++){
					leaseIds.push(d[i].data.leaseId);
				}
				new LeaseSettlementFormMultiAdd(d, {
					saveable : true,
					isMulti:true,
					leaseIds :Ext.util.JSON.encode(leaseIds),
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editLeaseSettlement : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new LeaseSettlementForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delLeaseSettlement : function () {
		this.speciallyGridAction(this.dataGridPanel, "settlementId", __ctxPath + "/materials/multiDelLeaseSettlement.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的记录必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	submitLeaseSettlement : function () {
		this.speciallyGridAction(this.dataGridPanel, "settlementId", __ctxPath + "/materials/multiSubmitLeaseSettlement.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的记录必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	approveLeaseSettlement : function (a) {
		if ("2" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new LeaseSettlementForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
})