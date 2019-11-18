var LeaseApplicationListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "供应单位",
			name : "Q_suppliers_S_LK"
		}, {
			lable : "申请单位",
			name : "Q_applyingUnit_S_LK"
		}, {
			lable : "租借主题",
			name : "Q_leaseTheme_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readLeaseApplication
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
				fields : LeaseApplicationListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [{
				width : 60,
				header : "状态",
				dataIndex : "statusName"
			}, {
				header : "单据编号",
				dataIndex : "applicationSerial"
			}, {
				header : "租借主题",
				dataIndex : "leaseTheme"
			}, {
				header : "申请人",
				dataIndex : "userName"
			}, {
				header : "申请日期",
				dataIndex : "fillDate"
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function(n) {
					return n.projectName;
				}
			}, {
				header : "申请单位",
				dataIndex : "applyingUnit"
			}, {
				header : "供应单位 ",
				dataIndex : "suppliers"
			}]
	}
	
	LeaseApplicationListView.superclass.constructor.call(this, Ext.apply({
		id : "LeaseApplicationListView",
		title : "租借申请",
		url : __ctxPath + "/materials/listLeaseApplication.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(LeaseApplicationListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选的信息吗？";
		var msg3 = "成功【" + op + "】所选的信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LeaseApplicationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLeaseApplication.createDelegate(this)
			});
		}
		if (isGranted("_LeaseApplicationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLeaseApplication.createDelegate(this)
			});
		}
		if (isGranted("_LeaseApplicationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLeaseApplication.createDelegate(this)
			});
		}
		if (isGranted("_LeaseApplicationMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitLeaseApplication.createDelegate(this)
			});	
		}
		return tbarItems;
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptLeaseApplication
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveLeaseApplication
		});
	},
	rendererRowActionItems : function (action, record) {
		switch (record.data.status) {
		case "1":
			if (isGranted("_LeaseApplicationAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_LeaseApplicationApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	readLeaseApplication : function(a) {
		new LeaseApplicationForm(a).show();
	},
	
	addLeaseApplication : function(){
		new LeaseApplicationForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editLeaseApplication : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new LeaseApplicationForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delLeaseApplication : function () {
		this.speciallyGridAction(this.dataGridPanel, "applicationId", __ctxPath + "/materials/multiDelLeaseApplication.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的信息必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	
	submitLeaseApplication : function () {
		this.speciallyGridAction(this.dataGridPanel, "applicationId", __ctxPath + "/materials/multiSubmitLeaseApplication.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的租借申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	acceptLeaseApplication : function (a) {
		if ("1" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new LeaseApplicationForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show()
	},
	approveLeaseApplication : function (a) {
		if ("2" != a.status) {
			$toast("【审批】的信息必须是【待审批】的状态！");
			return;
		}
		new LeaseApplicationForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show()
	}
});