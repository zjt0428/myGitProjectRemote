var RecycleManageListView = function(a){
	Ext.apply(this,a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params,(a&&a.params)||{});
	
	var generalItems = null;
	if(!this.searchDisenable){
		var applyforStateCombo = $initComboBoxField("状态","Q_applyforState_S_EQ","AUDIT_APPROVAL_STATUS",{
			width : 80
		});
		var recycleTypeCombo = $initComboBoxField("回收类型","Q_recycleType_S_EQ","recycleType",{
			width : 80,
			lable : "回收类型"
		});
		generalItems = [applyforStateCombo,{
			lable : "工程名称",
			name : "Q_contractMaterials.projectName_S_LK"
		},{
			lable : "承租单位",
			name : "Q_contractMaterials.paEntName_S_LK"
		},{
			lable : "入库仓库",
			name : "Q_baseDepot.depotName_S_LK"
		},{
			lable : "附属单据号",
			name : "Q_affiliatedSerial_S_LK"
		},recycleTypeCombo,{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "制单日期",
			name : "Q_applyDate_S_GE",
			editable : false
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d H:i:s",
			name : "Q_applyDate_S_LE",
			listeners : {
				'select' : function(field,date) {
					var Y = date.getFullYear();
					var m = date.getMonth();
					var d = date.getDate();
					var newDate = new Date(Y,m,d,23,59,0)
					field.setValue(newDate);
				}.createDelegate(this)
			}
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "回收日期",
			name : "Q_recycleDate_S_GE",
			editable : false
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "至",
			name : "Q_recycleDate_S_LE",
			editable : false
		}]
	}
	var actionItems = [{
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadRecycleManage
	}];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if(!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems()
	}
	var datagrid_config = {
		store : {
			fields : RecycleManageListViewField
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
			dataIndex : "applyforStateName"
		},{
			header : "回收单号",
			dataIndex : "recycleSerial"
		},{
			header : "制单人",
			dataIndex : "userName"
		},{
			header : "制单日期",
			dataIndex : "applyDate"
		},{
			header : "合同编号",
			dataIndex : "contractMaterials",
			renderer : function(n) {
				return n.contractSerial;
			}
		},{
			header : "工程名称",
			dataIndex : "contractMaterials",
			renderer : function(n) {
				return n.projectName;
			}
		},{
			header : "收发人员",
			dataIndex : "receivePeople"
		},{
			header : "运输车牌",
			dataIndex : "transportNumber"
		},{
			header : "卸车费",
			dataIndex : "handingCharge"
		},{
			header : "打包费",
			dataIndex : "packageCharge"
		},{
			header : "损坏赔偿费",
			dataIndex : "damage"
		},{
			header : "附属单据号",
			dataIndex : "affiliatedSerial"
		},{
			header : "入库仓库",
			dataIndex : "baseDepot",
			renderer : function(n) {
				return n.depotName;
			}
		},{
			header : "回收类型",
			dataIndex : "recycleTypeName"
		}]
	};
	RecycleManageListView.superclass.constructor.call(this,Ext.apply({
		id : "RecycleManageListView",
		title : TabTitle.RECYCLE_MANAGE_LIST,
		iconCls : "menu-business-equipblockup",
		url : __ctxPath + "/materials/listRecycleManage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	},a));
};
Ext.extend(RecycleManageListView,Knight.ux.SearchGridPanel,{
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptRecycleManage
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveRecycleManage
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_RecycleManageAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_RecycleManageApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_RecycleManageAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addRecycleManage.createDelegate(this)
			});
		}
		if (isGranted("_RecycleManageEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editRecycleManage.createDelegate(this)
			});
		}
		if (isGranted("_RecycleManageMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitRecycleManage.createDelegate(this)
			});
		}
		if (isGranted("_RecycleManageMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delRecycleManage.createDelegate(this)
			});
		}
		if (isGranted("_RecycleManageChangeDate")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改日期",
				handler : this.changeRecycleDate.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_RecycleManageExport")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportRecycleManage.createDelegate(this)
			});
		}
		if (isGranted("_RecycleManagePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printRecycleManage.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的回收信息！";
		var msg2 = "您确认要【" + op + "】所选的回收信息吗？";
		var msg3 = "成功【" + op + "】所选的回收信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadRecycleManage : function(a){
		new RecycleManageForm(a).show();
	},
	acceptRecycleManage : function (a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new RecycleManageForm(a, {
			editable : true,
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveRecycleManage : function(a){
		if("2" != a.applyforState) {
			$toast("【审批】的回收信息必须是【待审批】的状态！")
			return;
		}
		new RecycleManageForm(a,{
			editable : true,
			approveable : true,
			callback : function(){
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addRecycleManage : function(){
		new ContractMaterialsSelector({
			single : true,
			params : {
				"Q_applyforState_S_LK" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				new BaseDepotJoinUserSelector({
					callback : function(d) {
						var baseDepot = d[0].data;
						$request({
							url : __ctxPath + "/dispatch/loadContractMaterials.do",
							params : {
			                    contractmaId : data.contractmaId
							},
							success : function(g,h){
								var resp = Ext.util.JSON.decode(g.responseText);
								var data1 = resp.data[0];
								new RecycleManageForm({
									contractMaterials : data1,
									baseDepot : baseDepot
								},{
									saveable : true,
									callback : function() {
										this.dataGridPanel.getStore().reload();
									}.createDelegate(this)
								}).show();
							}.createDelegate(this)
						});
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editRecycleManage : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的回收信息必须是【待提交】的回收申请！");
				return false;
			}
			return true;
		}, function(a) {
			new RecycleManageForm(a.data, {
				editable : true,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitRecycleManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "recycleId", __ctxPath + "/materials/multiSubmitRecycleManage.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的回收信息必须是【待提交】的回收申请！");
			return false;
		}.createDelegate(this));
	},
	delRecycleManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "recycleId", __ctxPath + "/materials/multiDelRecycleManage.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的回收信息必须是【待提交】的回收申请！");
			return false;
		}.createDelegate(this));
	},
	changeRecycleDate : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new RecycleChangeDateForm({
			recycleId : a[0].data.recycleId,
			recycleDate : a[0].data.recycleDate,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	printRecycleManage : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormRecycleManage.do?recycleId=" + a[0].data["recycleId"];
		});
	},
	exportRecycleManage : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/materials/exportRecycleManage.do", this.dataGridPanel);
	},
	printRecycleManage2 : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/materials/printFormRecycleManage.do?recycleId=" + a[0].data["recycleId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	}
});