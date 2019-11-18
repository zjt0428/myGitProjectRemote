var ConstructOperationListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_project.projectName_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_equipment.recordId_S_LK"
		}, {
			lable : "使用单位",
			name : "Q_paEntName_S_LK"
		}, {
			lable : "作业人员",
			name : "Q_practiNames_S_LK"
		}, {
			lable : "施工作业日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_constructDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_constructDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadConstructOperation
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ConstructOperationListViewField
		},
		rowAction : {
			width : 75,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [	{
			width : 60,
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.recordId;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.equipGenericName;
			}
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.address;
			}
		}, {
			header : "使用单位",
			dataIndex : "paEntName"
		}, {
			header : "作业人员",
			dataIndex : "practiNames"
		}, {
			header : "施工作业主题",
			dataIndex : "constructTheme"
		}, {
			header : "施工作业时间",
			dataIndex : "constructDate"
		}, {
			header : "费用合计",
			dataIndex : "summary"
		}, {
			header : "付款状态",
			dataIndex : "fundStatusName"
		}, {
			header : "项目负责人",
			dataIndex : "projectPrincipal"
		}, {
			header : "班组长",
			dataIndex : "teams"
		}, {
			header : "已付金额",
			dataIndex : "finishedAmount"
		}, {
			header : "未付金额",
			dataIndex : "remainderAmount"
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.equipSpecificName;
			}
		}, {
			width : 50,
			header : "状态",
			dataIndex : "effectiveName",
			renderer : function(n) {
				if (n == "未生效") {
					return "<font face='宋体' color='red'>未生效</font>";
				}
				return "已生效";
			}
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ]
	};
	ConstructOperationListView.superclass.constructor.call(this, Ext.apply({
		id : "ConstructOperationListView",
		title : TabTitle.CONSTRUCT_OPERATION_LIST,
		iconCls : "menu-business-settle",
		url : __ctxPath + "/dispatch/listConstructOperation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ConstructOperationListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ConstructOperationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addConstructOperation.createDelegate(this)
			});
		}
		if (isGranted("_ConstructOperationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editConstructOperation.createDelegate(this)
			});
		}
		if (isGranted("_ConstructOperationMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveConstructOperation.createDelegate(this)
			});
		}
		if (isGranted("_ConstructOperationMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveConstructOperation.createDelegate(this)
			});
		}
		if (isGranted("_ConstructOperationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delConstructOperation.createDelegate(this)
			});
		}
		if (isGranted("_ConstructOperationAuto")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "生成付款单",
				handler : this.autoConstructOperation.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ConstructOperationPrinter")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printConstructOperation.createDelegate(this)
			});
		}
		if (isGranted("_ConstructOperationExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportConstructOperation.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的施工作业单信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的施工作业单信息吗？";
		var msg3 = "成功【" + op + "】所选的施工作业单信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadConstructOperation : function(a) {
		new ConstructOperationForm(a).show();
	},
	addConstructOperation : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
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
						new ConstructOperationForm({
							contractId : data.contractId,
							contract : data
						}, {
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
	editConstructOperation : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status == "4") {
			$toast("该施工信息已经【生效】！");
			return;
		}
		new ConstructOperationForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delConstructOperation : function() {
		this.speciallyGridAction(this.dataGridPanel, "constructId", __ctxPath + "/dispatch/multiDelConstructOperation.do", "删除");
	},	
	autoConstructOperation : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行生成付款单！");
			return ;
		}
		for(var c = 0;c<length;c++){
			$request({
				url : __ctxPath + "/dispatch/loadConstructOperation.do",
				params : {
					constructId : a[c].data.constructId
				},
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					var data = resp.data[0];
					var mount = {
							relateId : data.constructId,
							relateSerial : data.constructSerial,
							relateTheme : data.constructTheme,
							relateModule : RelationModule.constructOperation.relateModule,
							relateModuleName : RelationModule.constructOperation.relateModuleName,
//							receiveId : data.supplierId,
//							receiveModule : RelationModule.supplier.relateModule,
//							receiveName : data.supplierName,
							relationData : data
					};
					if (mount && mount.relateId && mount.relateModule) {
						mount.relation = {};
						Ext.apply(mount.relation, {
							relateId : mount.relateId,
							relateTheme : mount.relateTheme,
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
	printConstructOperation : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printConstructOperation.do?formpage=ConstructOperation&constructId=" + a[0].data["constructId"];
		});
	},
	effectiveConstructOperation : function() {
		this.speciallyGridAction(this.dataGridPanel, "constructId", __ctxPath + "/dispatch/multiEffectiveConstructOperation.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该施工信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveConstructOperation : function() {
		this.speciallyGridAction(this.dataGridPanel, "constructId", __ctxPath + "/dispatch/multiLoseEffectiveConstructOperation.do", "失效", null, "是否确认失效");
	},
	exportConstructOperation : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportConstructOperation.do", this.dataGridPanel);
	}
});