var MaterialsDispatchListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "SCRAP_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "调度单号",
			name : "Q_dispatchSerial_S_LK"
		}, {
			lable : "工程名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "承租单位",
			name : "Q_pbEntName_S_LK"
		}, {
			lable : "仓库名称",
			name : "Q_storeName_S_LK"
		},{
			lable : "制单时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_GE"
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
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadMaterials
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
			fields : MaterialsDispatchListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 70,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			width : 70,
			header : "调度状态",
			dataIndex : "effective",
			renderer : function(n) {
				if (n == "0") {
					return "<font face='宋体' color='red'>失效</font>";
				}
				return "生效";
			}
		},{
			header : "调度单号",
			dataIndex : "dispatchSerial"
		}, {
			header : "调度主题",
			dataIndex : "dispatchTheme"
		}, {
			header : "调度人员",
			dataIndex : "userName"
		}, {
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "工程名称",
			dataIndex : "projectName"
		}, {
			header : "项目地址",
			dataIndex : "address"
		}, {
			header : "制单时间",
			dataIndex : "applyDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}]
	};
	MaterialsDispatchListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsDispatchListView",
		title : TabTitle.MATRIAL_DISPATCH_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/materials/listMaterialsDispatch.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MaterialsDispatchListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			text : "审核",
			hidden : true,
			handler : this.acceptMaterials
		});
		actionItems.push({
			text : "审批",
			hidden : true,
			handler : this.approveMaterials
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_MaterialsDispatchtAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_MaterialsDispatchApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsDispatchAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsDispatch.createDelegate(this)		
			});
		}
		if (isGranted("_MaterialsDispatchEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsDispatch.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsDispatchSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitMaterialsDispatch.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsDispatchMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsDispatch.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsDispatchMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveMaterialsDispatch.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_MaterialsDispatchPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printMaterialsDispatch.createDelegate(this)
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
	acceptMaterials : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的申请信息必须是【待审核】的状态！");
			return;
		}
		new MaterialsDispatchForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveMaterials : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的申请信息必须是【待审批】的状态！");
			return;
		}
		new MaterialsDispatchForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadMaterials : function(a) {
		new MaterialsDispatchForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addMaterialsDispatch : function(){
		new ContractMaterialsSelector({
			single : true,
			params : {
				"Q_applyforState_S_LK" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				new MaterialsDispatchForm({
					contractMaterials : data
				},{
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editMaterialsDispatch : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的申请信息必须是【待提交】的申请！");
			return;
		}
		new MaterialsDispatchForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitMaterialsDispatch : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsId", __ctxPath + "/materials/multiSubmitMaterialsDispatch.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	delMaterialsDispatch : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsId", __ctxPath + "/materials/multiDelMaterialsDispatch.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	loseEffectiveMaterialsDispatch : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsId", __ctxPath + "/materials/multiLoseEffectiveMaterialsDispatch.do", "失效", function(a){
			if("4"==a.applyforState || "5"==a.applyforState){
				return false;
				$toast("已装车或未装车的申请不能失效");
			}
			return true;
		}, "是否确认失效");
	},
	printMaterialsDispatch : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormMaterialsDispatch.do?materialsId=" + a[0].data["materialsId"];
		});
	}
	
});