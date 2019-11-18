var LeaseBlockUpListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "EFFECTIVE_FLAG", {
			width : 75,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ statusCombo, {
			lable : "工程名称",
			name : "Q_contractMaterials.projectName_S_LK"
		}, {
			lable : "报停主题",
			name : "Q_blockTitle_S_LK"
		},{
			lable : "承租单位",
			name : "Q_contractMaterials.paEntName_S_LK"
		},{
			lable : "报停日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_LE"
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
			fields : LeaseBlockUpListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "statusName"
		},{
			header : "报停主题",
			dataIndex : "blockTitle"
		}, {
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "报停单号",
			dataIndex : "blockSerial"
		}, {
			header : "周材合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "租借合同编号",
			dataIndex : "leaseContract",
			renderer : function(n) {
				return n.leaseIdentifier;
			}
		}, {
			header : "项目名称",
			dataIndex : "leaseContract",
			renderer : function(n) {
				return n.project.projectName;
			}
		}, {
			header : "租借单位",
			dataIndex : "leaseContract",
			renderer : function(n) {
				return n.leaseUnit;
			}
		}, {
			header : "本次成本报停金额",
			dataIndex : "settledAmount"
		}, {
			header : "内部产值",
			dataIndex : "insideAmount"
		}, {
			header : "制单日期",
			dataIndex : "applyDate"
		}, {
			header : "起始日期",
			dataIndex : "startDate"
		}, {
			header : "截止日期",
			dataIndex : "endDate"
		}, {
			header : "停用天数",
			dataIndex : "blockupDays"
		}]
	};
	LeaseBlockUpListView.superclass.constructor.call(this, Ext.apply({
		id : "LeaseBlockUpListView",
		title : "租借报停",
		iconCls : "menu-business-storehouse",
		url : __ctxPath + "/materials/listLeaseBlockUp.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LeaseBlockUpListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptScrap
		});
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LeaseBlockUpAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLeaseBlockUp.createDelegate(this)		
			});
		}
		if (isGranted("_LeaseBlockUpEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLeaseBlockUp.createDelegate(this)
			});
		}
		if (isGranted("_LeaseBlockUpMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLeaseBlockUp.createDelegate(this)
			});
		}
		if (isGranted("_LeaseBlockUpMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveLeaseBlockUp.createDelegate(this)
			});
		}
		if (isGranted("_LeaseBlockUpMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveLeaseBlockUp.createDelegate(this)
			});
		}
		if (isGranted("_LeaseBlockUpMultiAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "批量新增",
				handler : this.multiAddLeaseBlockUp.createDelegate(this)		
			});
		}
		tbarItems.push("->");
		if (isGranted("_BorrowPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printLeaseBlockUp.createDelegate(this)
			});
		}
		if (isGranted("_BorrowExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportLeaseBlockUp.createDelegate(this)
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
		new LeaseBlockUpForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addLeaseBlockUp : function(a) {
		new LeaseContractSelector({
			params : {
				"Q_status_S_EQ": "3"
			},
			saveable : true,
			single : true,
			callback : function(d) {
				var data = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseContract.do", {
					leaseId : d[0].data.leaseId
				});
				new LeaseBlockUpForm(null, {
					leaseContract : data.data[0],
					saveable : true,
					isMulti:false,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	multiAddLeaseBlockUp : function(a) {
		new LeaseContractSelector({
			params : {
//				"applyforState": 3
			},
			collectEnable : true,
			saveable : true,
			single : false,
			callback : function(d) {
				var data = d[0].data;
				var leaseIds =Array();
				for(var i =0;i<d.length;i++){
					leaseIds.push(d[i].data.leaseId);
				}
				new LeaseBlockUpForm(data, {
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
	editLeaseBlockUp : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.status) {
			$toast("【修改】的申请信息必须是【未生效】的申请！");
			return;
		}
		new LeaseBlockUpForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delLeaseBlockUp : function() {
		this.speciallyGridAction(this.dataGridPanel, "blockId", __ctxPath + "/materials/multiDelLeaseBlockUp.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的申请信息必须是【未生效】的申请！");
			return false;
		}.createDelegate(this));
	},
	effectiveLeaseBlockUp : function() {
		this.speciallyGridAction(this.dataGridPanel, "blockId", __ctxPath + "/materials/multiEffectiveLeaseBlockUp.do", "生效", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveLeaseBlockUp : function() {
		this.speciallyGridAction(this.dataGridPanel, "blockId", __ctxPath + "/materials/multiLoseEffectiveLeaseBlockUp.do", "失效", function(a) {
			if ("1" == a.status) {
				return true;
			}
			$toast("该信息已经【失效】！");
			return false;
		}.createDelegate(this), "是否确认失效");
	},
	printLeaseBlockUp : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormLeaseBlockUp.do?blockId=" + a[0].data["blockId"];
		});
	},
	exportLeaseBlockUp : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/materials/exportLeaseBlockUp.do", this.dataGridPanel);
	}
});