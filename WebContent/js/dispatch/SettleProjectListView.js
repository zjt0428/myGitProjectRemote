var SettleProjectListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "结算单号",
			name : "Q_settleSerial_S_LK"
		}, {
			lable : "结算主题",
			name : "Q_settleTitle_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		},{
			lable : "起始日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_S_EQ"
		}, {
			lable : "截止日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_endDate_S_EQ"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadScrap
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
			fields : SettleProjectListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [  {
			width : 60,
			header : "状态",
			dataIndex : "settleProjectStateName"
		},{
			header : "结算主题",
			dataIndex : "settleTitle"
		},{
			header : "结算人员",
			dataIndex : "settleMan"
		}, {
			header : "结算单号",
			dataIndex : "settleSerial"
		}, {
			header : "合同编号",
			dataIndex : "contractSerial"
		},{
			header : "工程名称",
			dataIndex : "projectName"
		}, {
			header : "结算金额",
			dataIndex : "currentSettleAmount"
		},{
			header : "结算日期",
			dataIndex : "settleDate"
		}, {
			header : "起始日期",
			dataIndex : "startDate"
		}, {
			header : "截止日期",
			dataIndex : "endDate"
		}]
	};
	SettleProjectListView.superclass.constructor.call(this, Ext.apply({
		id : "SettleProjectListView",
		title : TabTitle.SETTLE_PROJECT_LIST,
		iconCls : "menu-business-component",
		url : __ctxPath + "/equip/listSettleProject.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SettleProjectListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SettleProjectAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSettleProject.createDelegate(this)		
			});
		}
		if (isGranted("_SettleProjectEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSettleProject.createDelegate(this)
			});
		}
		if (isGranted("_SettleProjectMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveSettleProject.createDelegate(this)
			});
		}
		if (isGranted("_SettleProjectMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveSettleProject.createDelegate(this)
			});
		}
		if (isGranted("_SettleProjectMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSettleProject.createDelegate(this)
			});
		}
		if (isGranted("_SettleProjectMultiAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "批量新增",
				handler : this.multiAddSettleProject.createDelegate(this)		
			});
		}
		tbarItems.push("->");
		if (isGranted("_BorrowPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSettleProject.createDelegate(this)
			});
		}
		if (isGranted("_BorrowExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportSettleProject.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的申请！";
		var msg2 = "您确认要【" + op + "】所选的申请吗？";
		var msg3 = "成功【" + op + "】所选的申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadScrap : function(a) {
		new SettleProjectForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addSettleProject : function(a) {
		new ContractLeaseSelector({
			params : {
				"Q_applyforState_S_LE": 6,
				"Q_applyforState_S_GE": 3,
				"Q_effective_S_lk": 1
			},
			saveable : true,
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new SettleProjectForm(data, {
					saveable : true,
					isMulti:false,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	multiAddSettleProject : function(a) {
		new ContractLeaseSelector({
			params : {
				"Q_applyforState_S_LE": 6,
				"Q_applyforState_S_GE": 3
			},
			collectEnable : true,
			saveable : true,
			single : false,
			callback : function(d) {
				var data = d[0].data;
				var contractIds =Array();
				for(var i =0;i<d.length;i++){
					contractIds.push(d[i].data.contractId);
				}
				new SettleProjectForm(d, {
					saveable : true,
					isMulti:true,
					contractIds :Ext.util.JSON.encode(contractIds),
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editSettleProject : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if (!Ext.isEmpty(a.reactivateDate)) {
				Ext.MessageBox.alert("操作信息", "该停用信息已经【恢复】不允许修改！");
				return false;
			}
			if ("1" == a.settleProjectState) {
				Ext.MessageBox.alert("操作信息", "该停用信息已经【生效】不允许修改！");
				return false;
			}
			return true;
		}.createDelegate(this), function(a) {
			new SettleProjectForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	effectiveSettleProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "settleId", __ctxPath + "/equip/multiEffectiveSettleProject.do", "生效", function(a) {
			if ("0" == a.settleProjectState) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveSettleProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "settleId", __ctxPath + "/equip/multiLoseEffectiveSettleProject.do", "失效", null, "是否确认失效");
	},
	delSettleProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "settleId", __ctxPath + "/equip/multiDelSettleProject.do", "删除", function(a) {
		if ("0" == a.settleProjectState) {
			return true;
		}
		$toast("【已生效】的启用信息无法【删除】！");
		return false;
		}.createDelegate(this));
	},
	printSettleProject : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printFormSettleProject.do?settleId=" + a[0].data["settleId"];
		});
	},
	exportSettleProject : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportSettleProject.do", this.dataGridPanel);
	}
});