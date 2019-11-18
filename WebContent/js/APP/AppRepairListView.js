var AppRepairListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.equipPermission;
	}
	// =====================================================================//
	var disTypeCombo = $initComboBoxField("状态", "Q_state_S_EQ", "APP_REPAIR_STATE");
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [disTypeCombo,{
			lable : "设备自编号",
			name : "Q_equipSerial_S_LK"
		},{
			lable : "项目名称",
			name : "Q_projName_S_LK"
		},{
			lable : "处理结果",
			name : "Q_procResult_S_LK"
		},{
			lable : "报修时间",
			name : "Q_reportDt_S_LK"
		},{
			lable : "维修人员",
			name : "Q_repMan_S_LK"
		},{
			lable : "楼号",
			name : "Q_buildingNum_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAppRepair
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AppRepairListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "状态",
			dataIndex : "stateName"
		}, {
			header : "项目名称",
			dataIndex : "projName"
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		},{
			header :"设备自编号",
			dataIndex :"equipSerial"
		},/* {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "备案编号",
			dataIndex : "recordSerial"
		}, */{
			header : "规格型号",
			dataIndex : "equipSpec"
		}, {
			header : "报修日期",
			dataIndex : "reportDt",
			renderer : function(a, b, c) {
				return a.substring(0,16);
			}
		}, {
			header : "故障级别",
			dataIndex : "faultLevel"
		}, {
			header : "申报人",
			dataIndex : "createByname"
		}, {
			header : "故障原因",
			dataIndex : "repReason"
		}, {
			header : "维修方案",
			dataIndex : "repScheme"
		}, {
			header : "故障描述",
			dataIndex : "faultDesc"
		}, {
			header : "派工时间",
			dataIndex : "disDate",
			renderer : function(a, b, c) {
				return a.substring(0,16);
			}
		}, {
			header : "维修人员",
			dataIndex : "repMan"
		}, {
			header : "故障类型",
			dataIndex : "repairTypeName"
		}, {
			header : "处理结果",
			dataIndex : "procResult"
		}, {
			header : "完成时间",
			dataIndex : "repairDt",
			renderer : function(a, b, c) {
				return a.substring(0,16);
			}
		}, {
			header : "维修费用",
			dataIndex : "repFee"
		}, {
			header : "备注",
			dataIndex : "disRemark"
		}]
	};
	AppRepairListView.superclass.constructor.call(this, Ext.apply({
		id : "AppRepairListView",
		title : TabTitle.REPAIR_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/app/listRepair.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AppRepairListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];		
		if (isGranted("_AppRepairMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipRepair.createDelegate(this)
			});
		}
		if (isGranted("_AppRepairAuto")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "生成付款单",
				handler : this.autoAppRepair.createDelegate(this)
			});
		}
		if (isGranted("_AppRepairCosts")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "维修费用",
				handler : this.costsAppRepair.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AppRepairPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipRepair.createDelegate(this)
			});
		}
		if (isGranted("_AppRepairExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipHitch.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的工作备忘！";
		var msg2 = "您确认要【" + op + "】所选的工作备忘吗？";
		var msg3 = "成功【" + op + "】所选的工作备忘！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readAppRepair : function(a) {
		new AppRepairForm(a,{
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	autoAppRepair : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行生成付款单！");
			return ;
		}
		for(var c = 0;c<length;c++){
			$request({
				url : __ctxPath + "/app/loadRepair.do",
				params : {
					repid : a[c].data.repid
				},
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					var data = resp.data[0];
					var mount = {
							relateId : data.repid,
							relateSerial : data.recordSerial,
//							relateTheme : data.constructTheme,
							relateModule : RelationModule.appRepair.relateModule,
							relateModuleName : RelationModule.appRepair.relateModuleName,
//							receiveId : data.supplierId,
//							receiveModule : RelationModule.supplier.relateModule,
//							receiveName : data.supplierName,
							relationData : data
					};
					if (mount && mount.relateId && mount.relateModule) {
						mount.relation = {};
						Ext.apply(mount.relation, {
							relateId : mount.relateId,
//							relateTheme : mount.relateTheme,
							relateModule : mount.relateModule,
							relateModuleName : mount.relateModuleName
//							,
//							projectName : mount.projectName
						});
					}
					new AmountPaymentForm(mount, {
						saveable : true,
						auto:true,
						paymentPlanDisabled : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			});}
	},
	costsAppRepair : function(a){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行操作！");
			return ;
		}
		if(a[0].data.state!=4){
			$toast("请选择状态为“已完成”进行操作！");
			return ;
		}
		new AppRepairForm(a[0].data,{
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	//删除
	delEquipRepair : function(a) {
		this.speciallyGridAction(this.dataGridPanel, "repid", __ctxPath + "/app/multiDelRepair.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	},
	printEquipRepair : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/app/printRepair.do?formpage=AppRepair&repid=" + a[0].data["repid"];
		});
	},
	exportEquipHitch : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/app/exportRepair.do", this.dataGridPanel);
	}
});
