var PractiDispatchListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		practiDepartmentId : Ext.id()
	});
	// =====================================================================//
	if (!this.searchDisenable) {
		var incumbentCombo = $initSimpleComboBoxField("在职", "Q_incumbent_S_EQ", [ [ "1", "在岗" ], [ "2", "待岗" ], [ "0", "离职" ] ], {
			width : 60,
			lable : "人员状态",
			allowBlank : true
		});
		var kindWorkCombo = $initComboBoxField("当前工种", "Q_kindWork_S_EQ", "kindWork", {
			width : 130,
			lable : "当前工种",
			allowBlank : true
		});
		var insureStatusCombo = $initComboBoxField("参保状态", "Q_insureStatus_S_EQ", "INSURE_STATUS", {
			width : 75,
			lable : "参保状态",
			allowBlank : true
		});
		var discloseStateCombo = $initComboBoxField("交底状态", "Q_practitioner.clarificaStatus_S_EQ", "PRACTI_DISCLOSE_STATE", {
			width : 75,
			lable : "交底状态",
			allowBlank : true
		});
		var generalItems = [  {
			xtype : "hidden",
			id : this.practiDepartmentId,
			name : "Q_department.depId_L_EQ"
		}, {
			lable : "人员名称",
			name : "Q_practitioner.practiName_S_LK"
		}, {
			lable : "所属企业",
			name : "Q_corpName_S_LK"
		}, {
			xtype : "treecombo",
			valId : this.practiDepartmentId,
			width : 150,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do?opt=appUser",
			name : "depName"
		}, {
			width : 120,
			lable : "当前项目",
			name : "Q_projectName_S_LK"
		},kindWorkCombo,discloseStateCombo,{
			lable : "派工日期",
			width : 96,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_createTime_S_GE",
			value : KnightUtil.date.getFormatCurrentMonth().firstDay
		}, {
			lable : "至",
			width : 96,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_createTime_S_LE",
			value : KnightUtil.date.getFormatCurrentMonth().lastDay
		} ];
		var advancedItems = [ {
			fieldType : "CHAR_FIELD",
			name : "Q_practiName_S_LK",
			fieldLabel : "人员姓名"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_mobile_S_LK",
			fieldLabel : "联系电话"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "派工日期",
			leftFieldLabel : "Q_createTime_S_GE",
			rightFieldLabel : "Q_createTime_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.showPractiDispatch
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var datagrid_config = {
		store : {
			fields : PractiDispatchListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : this.initTopBarActionItems(),
		columns : [{
			header : "调度编号",
			width : 120,
			dataIndex : "dispatchSerial"
		}, {
			header : "人员姓名",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.practiName;
				}
			}	
		}, {
			header : "所属企业",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.corpInfo.corpName;
				}
			}	
		}, {
			header : "所属部门",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.department.depName;
				}
			}	
		}, {
			header : "移动电话",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.mobile;
				}
			}	
		}, {
			header : "历史项目",
			dataIndex : "projectNameHis"
		}, {
			header : "当前项目",
			dataIndex : "projectName"
		}, {
			header : "历史工种",
			dataIndex : "kindWorkNameHis"
		}, {
			header : "当前工种",
			dataIndex : "kindWorkName"
		}, {
			header : "历史班组",
			dataIndex : "teamsHis"
		}, {
			header : "当前班组",
			dataIndex : "teams"
		}, {
			header : "交底状态",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.clarificaStatusName;
				}
			}	
		}, {
			header : "操作人员",
			dataIndex : "userName"
		}, {
			header : "派工日期",
			dataIndex : "createTime"
		}, {
			header : "状态",
			dataIndex : "applyforStateName"
		}]
	};
	PractiDispatchListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiDispatchListView",
		title : "派工管理",
		iconCls : "menu-business-practi",
		url : __ctxPath + "/archive/listPractiDispatch.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
//			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiDispatchListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approvePractiDispatch
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "2":
				if (isGranted("_PractiDispatchApprove")) {
					action[1].hidden = false;
				}
				break;
			default : 
				action[1].hidden = true;
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiDispatchAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPractiDispatch.createDelegate(this)
			});
		}
		if (isGranted("_PractiDispatchEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPractiDispatch.createDelegate(this)
			});
		}
		if (isGranted("_PractiDispatchMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiDispatch.createDelegate(this)
			});
		}
		if (isGranted("_PractiDispatchMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitPractiDispatch.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_PractiDispatchExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportPractiDispatch.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的记录！";
		var msg2 = "您确认要【" + op + "】所选的记录吗？";
		var msg3 = "成功【" + op + "】所选的记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readPractiDispatch : function(a,b) {
		new PractiDispatchForm(a, b).show();
	},
	showPractiDispatch : function(a) {
		new PractiDispatchForm(a,{
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approvePractiDispatch : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的调度信息必须是【待审批】的状态！");
			return;
		}
		this.readPractiDispatch(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	addPractiDispatch : function() {
		new PractitionerSelector({
			single : true,
			params : {
				"QVO_permissionFlag_S_LK" : this.params.QVO_permissionFlag_S_LK,
				"Q_blacklist_S_EQ" : "0"
			},
			callback : function(d) {
				new PractiDispatchForm(d[0].data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editPractiDispatch : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的调度信息必须是【待提交】的状态！");
			return;
		}
		new PractiDispatchForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractiDispatch : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if ("0" != a[0].data.applyforState) {
			$toast("【删除】的调度信息必须是【待提交】的状态！");
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "dispatchId", __ctxPath + "/archive/multiDelPractiDispatch.do", "删除");
	},
	submitPractiDispatch : function() {
		
		this.speciallyGridAction(this.dataGridPanel, "dispatchId", __ctxPath + "/archive/multiSubmitPractiDispatch.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	exportPractiDispatch : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractiDispatch.do", this.dataGridPanel);
	}
});