var SettleContractsForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var summaryReceivables = null;
	var summaryReceiveds = null;

	this.payable = (this.fundType == "0");
	var rentStandardData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "rentStandard"
	});
	var measurementData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "measurement"
	});
	var taxRateData = $ajaxSyncCall(__ctxPath + "/system/listNamesCode.do", {
		codeId : "taxRate"
	});
	var contractCostitemData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "contractCostitem"
	});
	var expenseItemData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "expenseItem"
	});
	this.settleEquipBriefGrid = new SettleEquipBriefGrid({
		taxRateData : taxRateData,
		rentStandardData : rentStandardData,
		measurementData : measurementData,
		settleId : this.settleId,
		contractId : this.contractId,
		taxRate : this.taxRate
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	this.settleComponBriefGrid = new SettleComponBriefGrid({
		taxRateData : taxRateData,
		rentStandardData : rentStandardData,
		measurementData : measurementData,
		settleId : this.settleId,
		contractId : this.contractId,
		taxRate : this.taxRate
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	this.settleItemBriefGrid = new SettleItemBriefGrid({
		taxRateData : taxRateData,
		contractCostitemData : contractCostitemData,
		measurementData : measurementData,
		settleId : this.settleId,
		contractId : this.contractId,
		taxRate : this.taxRate
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	//操作人员工资结算清单
	this.operatorSalaryStatementGrid = new OperatorSalaryStatementGrid({
		taxRateData : taxRateData,
		rentStandardData : rentStandardData,
		measurementData : measurementData,
		settleId : this.settleId,
		contractId : this.contractId,
		taxRate : this.taxRate
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	//安全监控系统结算清单
	this.safetyMonitorSettleStatementGrid = new SafetyMonitorSettleStatementGrid({
		taxRateData : taxRateData,
		rentStandardData : rentStandardData,
		measurementData : measurementData,
		settleId : this.settleId,
		contractId : this.contractId,
		taxRate : this.taxRate
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	//其他费用清单
	this.otherExpenseStatementGrid = new OtherExpenseStatementGrid({
		taxRateData : taxRateData,
		expenseItemData : expenseItemData,
		measurementData : measurementData,
		settleId : this.settleId,
		contractId : this.contractId,
		taxRate : this.taxRate
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.settleId,
		relateModule : RelationModule.settleContract.relateModule,
		saveable : false
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			defaults : {
				readOnly : true
			},
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "settleContract.userName"
				}, {
					readOnly : true,
					fieldLabel : "结算编号",
					name : "settleContract.settleSerial"
				}, {
					id:"summaryReceivable",
					readOnly : true,
					fieldLabel : "累计应收租金",
					name : "settleContract.summaryReceivable"
				}, {
					hidden :true,
					readOnly : true,
					fieldLabel : "结算类别",
					name : "settleContract.fundCategoryName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "settleContract.providedDate",
					value : new Date()
				}, {
					width : 330,
					maxLength : 126,
					allowBlank : false,
					fieldLabel : "结算主题",
					name : "settleContract.settleTheme"
				}, {
					id:"summaryReceived",
					readOnly : true,
					fieldLabel : "累计已收租金",
					name : "settleContract.summaryReceived"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "settleContract.department.depName"
				}, {
					readOnly : true,
					fieldLabel : "结算方式",
					name : "settleContract.fundTypeName"
				}, {
					readOnly : true,
					fieldLabel : "尚欠款",
					name : "settleContract.arrears"
				}]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 200,
					allowBlank : false,
					editable : false,
					fieldLabel : "结算起始时间",
					name : "settleContract.startSettleDate"
				}, {
					readOnly : true,
					hidden: true,
					fieldLabel : ContractLeaseFormConfigure.contractSerialHeader,
					name : "settleContract.contractSerial"
				}, {
					width : 330,
					readOnly : true,
					fieldLabel : "合同主题",
					name : "settleContract.contractTheme"
				}, {
					width : 330,
					readOnly : true,
					fieldLabel : "承租单位",
					name : "settleContract.paEntName"
				}, {
					width : 330,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "settleContract.projectName"
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "已收金额",
					name : "settleContract.finishedAmount"
				}, {
					width : 200,
					xtype : "numberfield",
					maxValue : 100,
					fieldLabel : "计划收款比例(%)",
					name : "settleContract.collectionRatio"
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "本期合计含税金额",
					name : "settleContract.currentNoTaxAmount"
				}, {
					id:"receivedAmount",
					xtype : "numberfield",
					readOnly : true,
					hidden :true,
					fieldLabel : "当前累计已收",
					name : "settleContract.receivedAmount"
				}, {
					id:"accumulatedAmount",
					xtype : "numberfield",
					readOnly : true,
					hidden :true,
					fieldLabel : "当前累计应收",
					name : "settleContract.accumulatedAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 200,
					allowBlank : false,
					editable : false,
					fieldLabel : "结算截止时间",
					name : "settleContract.endSettleDate",
					value : new Date()
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : ContractLeaseFormConfigure.contractSerialHeader,
					name : "settleContract.contractNo"
				}, {
					width : 200,
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "出租单位",
					name : "settleContract.pbEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorp.createDelegate(this),
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "项目编号",
					name : "settleContract.projectSerial"
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "剩余金额",
					name : "settleContract.arrearsAmount"
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "施工单位项目经理",
					name : "settleContract.leaseProjectHead"
				}/*, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					readOnly : false,
					fieldLabel : "工地负责人",
					name : "settleContract.sitesPrincipal",
					fields : [ "sitesPrincipal" ],
					relateModule : RelationModule.customerLinker.relateModule,
					importhandler : this.importCustomerLinker.createDelegate(this)
				}*/,{
					width : 200,
					readOnly : true,
					fieldLabel : "本期合计不含税金额",
					name : "settleContract.currentTotalAmount"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					id:"settleAmount",
					readOnly : true,
					fieldLabel : "本期结算金额（元）",
					name : "settleContract.settleAmount"
				}, {
					readOnly : true,
					fieldLabel : "打印标识",
					name : "settleContract.effectiveName"
				}, {
					readOnly : true,
					fieldLabel : "款项状态",
					name : "settleContract.fundStatusName"
				}, {
					xtype : "datacombo",
					width : 130,
					allowBlank : false,
					fieldLabel : "税率",
					name : "settleContract.taxRate",
					store : taxRateData,
//					value : taxRateData[0]
				}, {
					readOnly : true,
					fieldLabel : "税金",
					name : "settleContract.taxAmount"
				}]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目地址",
			name : "settleContract.address"
		}, fileAttachContainer, {
			xtype : "textarea",
			anchor : "95%",
			readOnly : true,
			height : 68,
			fieldLabel : "备注",
			name : "settleContract.remark"
		} ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.settleEquipBriefGrid, this.settleComponBriefGrid, this.settleItemBriefGrid,this.operatorSalaryStatementGrid,this.safetyMonitorSettleStatementGrid ,this.otherExpenseStatementGrid  ]
	} ];
	/*if (this.payable) {
		this.instalmentGrid = new InstalmentGrid({
			relateId : this.settleId,
			relateSerial : this.settleSerial,
			relateModule : RelationModule.settleContract.relateModule,
			relateModuleName : RelationModule.settleContract.relateModuleName
		}, {
			saveable : this.saveable
		});
		items.push({
			xtype : "panel",
			bodyStyle : "margin : 5px 0px 5px 0px",
			anchor : "98%",
			layout : "fit",
			items : [ this.instalmentGrid ]
		});
	} else {
		this.receivementGrid = new ReceivementGrid({
			relateId : this.settleId,
			relateSerial : this.settleSerial,
			relateModule : RelationModule.settleContract.relateModule,
			relateModuleName : RelationModule.settleContract.relateModuleName
		}, {
			saveable : this.saveable
		});
		items.push({
			xtype : "panel",
			bodyStyle : "margin : 5px 0px 5px 0px",
			anchor : "98%",
			layout : "fit",
			items : [ this.receivementGrid ]
		});
	}*/
	this.amountReceiveGrid = new AmountReceiveGrid({
		relateId : this.settleId,
		contractId : this.contractId,
		relateSerial : this.settleSerial,
		relateModule : RelationModule.settleContract.relateModule,
		relateModuleName : RelationModule.settleContract.relateModuleName
	});
	items.push({
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.amountReceiveGrid ]
	});
	SettleContractsForm.superclass.constructor.call(this, {
		title : "结算单明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 960,
		height : 760,
		// maximized : true,
		form_config : {
			labelWidth : 100,
			object : "settleContract",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/updateSettleContract.do",
			items : items,
			fieldMapping : SettleContractFieldMapping,
			hiddenField : SettleContractHiddenField
		}
	});
};
Ext.extend(SettleContractsForm, Knight.ux.FormPanelWindow, {
	settleAmountLoad : function(){
		var settleAmount = this.settleEquipBriefGrid.getTotalSummary() + this.settleComponBriefGrid.getTotalSummary() + this.settleItemBriefGrid.getTotalSummary()
		+ this.operatorSalaryStatementGrid.getTotalSummary()+this.safetyMonitorSettleStatementGrid.getTotalSummary()+this.otherExpenseStatementGrid.getTotalPreTax();
		this.setFieldValue("settleAmount", settleAmount.toFixed(2));
	},
	//获取累计金额
	getAccumulatedAmount : function(a) {
		$ajaxCall( __ctxPath + "/dispatch/getAccumulatedAmountSettleContract.do?contractId="+a, null, function(res) {
			this.setFieldValue("accumulatedAmount", res.result[0].accumulatedAmount);
			this.setFieldValue("summaryReceivable", res.result[0].accumulatedAmount);
			summaryReceivables = res.result[0].accumulatedAmount;
		}.createDelegate(this));
	},
	//累计已收金额
	getAlreadyAmount : function(a) {
		$ajaxCall( __ctxPath + "/dispatch/getAlreadyAmountSettleContract.do?contractId="+a, null, function(res) {
			this.setFieldValue("summaryReceived", res.result[0].receiveAmount==null?0.00:res.result[0].receiveAmount);
			this.setFieldValue("receivedAmount", res.result[0].receiveAmount==null?0.00:res.result[0].receiveAmount);
			summaryReceiveds = res.result[0].receiveAmount==null?0.00:res.result[0].receiveAmount;
		}.createDelegate(this));
	},
	importCorp : function(data) {
		this.setMultiFieldValue(["pbEntName" ], [ data.corpName ]);
	},
	importCustomerLinker : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.linker ]);
	},
	calculateAmount : function(grid) {
		for(var i = 0; i < grid.getStore().getCount(); i++) {
			this.taxAmountTemp += Number(grid.getStore().getAt(i).data.taxes);
			this.currentTotalAmountTemp += Number(grid.getStore().getAt(i).data.afterTaxAmount);
			this.currentNoTaxAmountTemp += Number(grid.getStore().getAt(i).data.preTaxAmount);
		}
	},
	removeSubtotal : function(grid){
		for(var i = 0;i<grid.getStore().getCount();i++){
			if(grid.getStore().getAt(i).data.buildingNum == "小计"){
				grid.getStore().removeAt(i);
			}
		}
	},
	reviewFormData : function(grid){
		for(  var i = 0;i<grid.getStore().getCount();i++){
			if ( Ext.isEmpty(grid.getStore().getAt(i).data.equipId)){
				this.exists =true;
			}
		}
	},
	saveFormData : function() {
		for (var i = 0; i < this.settleEquipBriefGrid.getStore().getCount(); i++) {
			var r = this.settleEquipBriefGrid.getStore().getAt(i).data;
			if(this.settleEquipBriefGrid.getStore().getAt(i).data.buildingNum!="小计"){
				if (Ext.isEmpty(r.equipCategoryName)) {
					Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录设备类别未填写!");
					return;
				}
				if (Ext.isEmpty(r.unit)) {
					Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录单位未填写!");
					return;
				}
			}
		}
		
		this.taxAmountTemp = 0;
		this.currentTotalAmountTemp = 0;
		this.currentNoTaxAmountTemp =0;
		this.exists = false;
		var gridArr=[this.settleEquipBriefGrid, this.settleComponBriefGrid, this.settleItemBriefGrid, this.operatorSalaryStatementGrid, this.safetyMonitorSettleStatementGrid, this.otherExpenseStatementGrid];
		for(var i=0; i<gridArr.length; i++) {
			//判断每个页签是否都关联equipId
			this.reviewFormData(gridArr[i]);
			//点击保存时删除含有小计那条记录
			this.removeSubtotal(gridArr[i]);
			//计算【本期合计含税金额】【本期合计不含税金额】【税金】
			this.calculateAmount(gridArr[i]); 
		}
		this.setFieldValue("taxAmount", this.taxAmountTemp.toFixed(2));		//税金
		this.setFieldValue("currentTotalAmount", this.currentTotalAmountTemp.toFixed(2));			//本期合计含税金额
		this.setFieldValue("currentNoTaxAmount", this.currentNoTaxAmountTemp.toFixed(2));		//本期合计不含税金额
		
		var settleAmount = this.settleEquipBriefGrid.getTotalSummary() + this.settleComponBriefGrid.getTotalSummary() + this.settleItemBriefGrid.getTotalSummary()
						+ this.operatorSalaryStatementGrid.getTotalSummary()+this.safetyMonitorSettleStatementGrid.getTotalSummary()+this.otherExpenseStatementGrid.getTotalPreTax();
//		if (settleAmount == 0) {
//			Ext.MessageBox.alert("操作信息", "结算金额为【0】!");
//			return;
//		}
		this.setFieldValue("settleAmount", settleAmount.toFixed(2));
		this.setFieldValue("summaryReceivable",(Number(Ext.getCmp("accumulatedAmount").getValue())+Number(Ext.getCmp("settleAmount").getValue())).toFixed(2));
		this.setFieldValue("arrears",(Number(Ext.getCmp("summaryReceivable").getValue())-Number(Ext.getCmp("summaryReceived").getValue())).toFixed(2));
		this.setFieldValue("settleEquipBriefs", $gridstore2json(this.settleEquipBriefGrid));
		this.setFieldValue("settleComponBriefs", $gridstore2json(this.settleComponBriefGrid));
		this.setFieldValue("settleItemBriefs", $gridstore2json(this.settleItemBriefGrid));
		this.setFieldValue("operatorSalaryStatements", $gridstore2json(this.operatorSalaryStatementGrid));
		this.setFieldValue("safetyMonitorSettleStatements", $gridstore2json(this.safetyMonitorSettleStatementGrid));
		this.setFieldValue("otherExpenseStatements", $gridstore2json(this.otherExpenseStatementGrid));
		this.setFieldValue("instalments", $gridstore2json(this.instalmentGrid));
		this.setFieldValue("receivements", $gridstore2json(this.receivementGrid));
		if(this.exists) {
			Ext.Msg.confirm("提示","页签中存在未关联设备的数据，是否继续保存？",function(n){
				if(n=="yes"){
					$formsubmit(this.getForm(), function(c, e) {
						$toast("信息操作成功！");
						if (this.callback) {
							this.callback.call(this);
						}
						this.close();
					}.createDelegate(this));
				}else{
					return;
				}
			}.createDelegate(this))
		}else{
			$formsubmit(this.getForm(), function(c, e) {
				$toast("信息操作成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.settleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadSettleContract.do?settleId=" + this.settleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldValue("taxRate",data.taxRate);
					this.setFormSubModuleGrid(data.settleEquipBriefSet, this.settleEquipBriefGrid);
					this.setFormSubModuleGrid(data.settleComponBriefSet, this.settleComponBriefGrid);
					this.setFormSubModuleGrid(data.settleItemBriefSet, this.settleItemBriefGrid);
					this.setFormSubModuleGrid(data.operatorSalaryStatementSet, this.operatorSalaryStatementGrid);
					this.setFormSubModuleGrid(data.safetyMonitorSettleStatementSet, this.safetyMonitorSettleStatementGrid);
					this.setFormSubModuleGrid(data.otherExpenseStatementSet, this.otherExpenseStatementGrid);
					this.setFormSubModuleGrid(data.amountReceiveGridSet, this.amountReceiveGrid);
					this.setFormSubModuleGrid(data.instalmentSet, this.instalmentGrid);
					this.setFormSubModuleGrid(data.receivementSet, this.receivementGrid);
					//复制
					if(this.copyable) {
						this.findFormField("settleId").setValue(null);
						this.cleanGridId(data.settleEquipBriefSet, this.settleEquipBriefGrid,"seBriefId");
						this.cleanGridId(data.settleComponBriefSet, this.settleComponBriefGrid,"scBriefId");
						this.cleanGridId(data.settleItemBriefSet, this.settleItemBriefGrid,"siBriefId");
						this.cleanGridId(data.operatorSalaryStatementSet, this.operatorSalaryStatementGrid,"statementId");
						this.cleanGridId(data.safetyMonitorSettleStatementSet, this.safetyMonitorSettleStatementGrid,"statementId");
						this.cleanGridId(data.otherExpenseStatementSet, this.otherExpenseStatementGrid,"statementId");
						this.cleanGridId(data.amountReceiveGridSet, this.amountReceiveGrid,"amountReceiveId");
						this.cleanGridId(data.instalmentSet, this.instalmentGrid,"instalmentId");
						this.cleanGridId(data.receivementSet, this.receivementGrid,"receivementId");
						this.getAccumulatedAmount(data.contractId);
						this.getAlreadyAmount(data.contractId);
						var fields = [ "department.depId", "department.depName", "userId", "userName", "providedDate" ];
						var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, new Date() ];
						this.setMultiFieldValue(fields, values);
					} 
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fields = [ "department.depId", "department.depName", "userId", "userName","providedDate" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname,new Date()];
			this.setMultiFieldValue(fields, values);
			fields = [ "contractId", "collectionRatio", "contractSerial", "contractNo", "contractTheme", "paEnt", "paModule", "paEntName",
			           "pbEnt", "pbModule", "pbEntName", "projectId", "projectSerial", "projectName", "address", "fundType", "fundTypeName" ];
			this.copyMultiFieldValue(fields, this.contract);
			fields = ["leaseProjectHead"];
			this.copyMultiFieldValue(fields, this.contract.project);
			this.setFieldValue("settleTheme", this.contract.projectName + new Date().format("Ymd"));
			this.setFieldValue("sitesPrincipal", this.contract.paEntLinkMan);
			this.setFieldValue("taxRate", this.contract.applicableTaxRate);
			this.getAccumulatedAmount(this.contract.contractId);
			this.getAlreadyAmount(this.contract.contractId);
			//合并结算多个contractId
			this.getForm().findField("contractIds").setValue(this.contractIds);
//			this.setFieldValue("arrears",(Number(summaryReceivables)-Number(summaryReceiveds)).toFixed(2));
			
			if (this.contract.contractEquipBriefSet.length > 0) {
				new Ext.util.DelayedTask(function() {
//					var endSettleDate = this.getForm().findField("settleContract.endSettleDate").getValue();
//					this.settleEquipBriefGrid.addRecordHeight(2 + this.contract.contractEquipBriefSet.length);
//					for (var i = 0; i < this.contract.contractEquipBriefSet.length; i++) {
//						var a = this.contract.contractEquipBriefSet[i];
//						var b = {
//							equipCategoryName : a.equipCategoryName,
//							equipSpecificName : a.equipSpecificName,
//							unit : a.unit,
//							startSettleDate : Date.parseDate(a.startDate, "Y-m-d"),
//							endSettleDate : endSettleDate,
//							settleDays : 0,
//							rentStandard : a.rentStandard,
//							measurement : a.measurement,
//							quantity : a.quantity,
//							daysRent : 0,
//							deductRent : 0
//						};
//						this.contract.contractEquipBriefSet[i] = b;
//					}
//					this.settleEquipBriefGrid.getStore().loadData(this.contract.contractEquipBriefSet);
					this.settleEquipBriefGrid.contractEquipBriefSet =  this.contract.contractEquipBriefSet;
				}.createDelegate(this)).delay(50);
			}
			if (this.contract.safetyMonitorSettleListSet.length > 0) {
				new Ext.util.DelayedTask(function() {
//					
					this.safetyMonitorSettleStatementGrid.safetyMonitorSettleListSet =  this.contract.safetyMonitorSettleListSet;
				}.createDelegate(this)).delay(50);
			}
		}
	}
});