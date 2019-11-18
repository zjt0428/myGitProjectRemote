var HandleMakeListView = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "制作单号",
			name : "Q_handleTheme_S_LK"
		}, {
			lable : "制作主题",
			name : "Q_handleTheme_S_LK"
		}, {
			lable : "制单人",
			name : "Q_producers_S_LK"
		}, {
			lable : "仓库名称",
			name : "Q_[applyMake.storeName]_S_LK"
		}]
	}
	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readHandleMake
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
				fields : HandleMakeListViewField
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
				header : "制作单号",
				dataIndex : "handleSerial"
			}, {
				header : "制作主题",
				dataIndex : "handleTheme"
			}, {
				header : "制单日期",
				dataIndex : "fillDate"
			}, {
				header : "制单人",
				dataIndex : "userName"
			}, {
				header : "仓库名称",
				dataIndex : "applyMake",
				renderer : function (a) {
					return a.storeName
				}
			}, {
				header : "计划完成时间",
				dataIndex : "planFinishDate"
			}]
	}
	
	HandleMakeListView.superclass.constructor.call(this, Ext.apply({
		id : "HandleMakeListView",
		title : "制作处理",
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/materials/listHandleMake.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}
Ext.extend(HandleMakeListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveHandleMake
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
		case "2":
			if (isGranted("_HandleMakeApprove")) {
				action[1].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_HandleMakeAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addHandleMake.createDelegate(this)
			});
		}
		if (isGranted("_HandleMakeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editHandleMake.createDelegate(this)
			});
		}
		if (isGranted("_HandleMakeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delHandleMake.createDelegate(this)
			});
		}
		if (isGranted("_HandleMakeMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitHandleMake.createDelegate(this)
			});
		}	
		return tbarItems;
	},
	readHandleMake : function (a) {
		new HandleMakeForm(a).show();
	},
	addHandleMake : function () {
		var data = $ajaxSyncCall(__ctxPath + "/materials/listPermissionBaseDepot.do",{});
		var baseDepots = data.result;
		var depotIds = new Array();
		for(var i=0;i<baseDepots.length;i++) {
			depotIds.push(baseDepots[i].depotId);
		}
		new ApplyMakeSelector({
			single : true,
			params : {
				"Q_applyforState_S_EQ" : "3",
				"QVO_storeId_L_EQ" : depotIds
			},
			callback : function(a) {
				var data = $ajaxSyncCall(__ctxPath + "/daily/loadApplyMake.do", {
					applyMakeId : a[0].data.applyMakeId
				});
				new HandleMakeForm(null, {
					saveable : true,
					data : data.data[0],
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editHandleMake : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new HandleMakeForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delHandleMake : function () {
		this.speciallyGridAction(this.dataGridPanel, "handleId", __ctxPath + "/materials/multiDelHandleMake.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的收货信息必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	submitHandleMake : function () {
		this.speciallyGridAction(this.dataGridPanel, "handleId", __ctxPath + "/materials/multiSubmitHandleMake.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	approveHandleMake : function (a) {
		if ("2" != a.status) {
			$toast("【审批】的信息必须是【待审批】的状态！");
			return;
		}
		new HandleMakeForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
})