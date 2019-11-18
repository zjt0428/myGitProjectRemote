var LeaseContractForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.relation = this.relation; //是否关联租借申请
	Ext.apply(this, {
		departmentId : Ext.id()
	});
	var projectSelectorParams = {
			"Q_applyforState_S_GE" : 1,
			"Q_applyforState_S_LE" : 3
	}
	var accountingMethodCombo = $initComboBoxField("计费方式", "leaseContract.accountingMethod", "TRANPORT_CACULATE_TYPE", {
		width : 150,
		editable : false,
		readOnly : !this.saveable,
		disabled : !this.saveable,
		allowBlank : false
	})
	
	var taxMethodCombo = $initComboBoxField("计税方式" , "leaseContract.taxMethod", "TAX_MODE", {
		width : 150,
		editable : false,
		readOnly : !this.saveable,
		disabled : !this.saveable,
		allowBlank : false
	})
	
	var allLodingItems = null;
	if (this.saveable) {
		allLodingItems = [{
			iconCls : "btn-search",
			text : "一键加载",
			handler : this.allLodingSubmit.createDelegate(this)
		}];
	}
	this.leaseMaterialsInventoryGrid = new LeaseMaterialsInventoryGrid({
		saveable : this.saveable,
		tbarItems : allLodingItems
	});
	this.leasePriceSettingGrid = new LeasePriceSettingGrid({
		saveable : this.saveable
	});
	this.leaseSpoiledIndemnityGrid = new LeaseSpoiledIndemnityGrid({
		saveable : this.saveable
	});
	this.leaseScrapCompensationGrid = new LeaseScrapCompensationGrid({
		saveable : this.saveable
	})
	this.leaseExpenseHandlingGrid = new LeaseExpenseHandlingGrid({
		saveable : this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.contractId,
		relateModule : RelationModule.leaseContract.relateModule,
		saveable : this.saveable
	});
	
	var items = [{
		xtype : "hidden",
		id : this.departmentId,
		name : "leaseContract.depId",
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "合同主题",
					name : "leaseContract.leaseTheme"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "合同流水号",
					name : "leaseContract.leaseSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "合同编号",
					name : "leaseContract.leaseIdentifier"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					readOnly : false,
					fieldLabel : "签订日期",
					name : "leaseContract.signingDate",
					value : new Date()
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "leaseContract.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					allowBlank : false,
					editable : false,
					readOnly : true,
					value : new Date(),
					fieldLabel : "填报日期",
					name : "leaseContract.fillDate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "leaseContract.project.projectName",
					fields : ["project.projectId", "project.projectName", "project.address", "taxMethod", "contractId"],
					relateModule : RelationModule.project.relateModule,
					params : projectSelectorParams,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importProjectArchives.createDelegate(this)
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "项目地址",
					name : "leaseContract.project.address"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "承租单位",
					name : "leaseContract.lesseeUnit",
					fields : ["lesseeUnit"],
					relateModule : RelationModule.corp.relateModule,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importCorp.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "使用单位",
					name : "leaseContract.useUnit",
					fields : ["useUnit"],
					relateModule : RelationModule.customer.relateModule,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importCustomer.createDelegate(this)
				}, {
					xtype : "treecombo",
					maxLength : 32,
					disabled : !this.saveable,
					allowBlank : false,
					width : 150,
					valId : this.departmentId,
					fieldLabel : "管理部门",
					name : "leaseContract.depName",
					url : __ctxPath + "/system/listDepartment.do"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "租借单位",
					name : "leaseContract.leaseUnit"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					unitText : "元",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "合同金额",
					name : "leaseContract.contractAmount",
					value : 0
				}, {
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
//					unitText : "元",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "可抵税率",
					name : "leaseContract.authorizedAmount",
					value : 0
				}, {
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					unitText : "元",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "折扣",
					name : "leaseContract.discount",
					value : 0
				}, {
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "优惠比例",
					name : "leaseContract.discountRentalRate",
					value : 0
				}, {
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "税率",
					name : "leaseContract.taxRate"
				}, {
					disabled : !this.saveable,
					fieldLabel : "单位地址",
					name : "leaseContract.leaseUnitAddress"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					unitText : "元",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "已收款金额",
					name : "leaseContract.amountReceived",
					value : 0
				}, {
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					unitText : "元",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "已结算金额",
					name : "leaseContract.settlementAmount",
					value : 0
				}, {
					xtype : "numberfield",
					allowDecimals : true,
					allowNegative : false,
					unitText : "元",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "运费",
					name : "leaseContract.freight",
					value : 0
				}, accountingMethodCombo, taxMethodCombo, {
					disabled : !this.saveable,
					fieldLabel : "联系方式",
					name : "leaseContract.leaseUnitLink"
				}]
			}]
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		items : [this.leaseMaterialsInventoryGrid]
	}, {
		xtype : "fieldset",
		items : [{
			xtype : "tabpanel",
			autoHeight : true,
			anchor : "98%",
			activeTab : 0,
			items : [ this.leasePriceSettingGrid, this.leaseSpoiledIndemnityGrid, 
				this.leaseScrapCompensationGrid,this.leaseExpenseHandlingGrid]
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [{
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			disabled : !this.saveable,
			fieldLabel : "备注",
			name : "leaseContract.remarks"
		}, fileAttachContainer]
	}]
	
	LeaseContractForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			object : "leaseContract",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.leaseId,
				relateModule : RelationModule.leaseContract.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.leaseId,
				relateModule : RelationModule.leaseContract.relateModule
			},
			url : __ctxPath + "/materials/saveLeaseContract.do",
			items : items,
			fieldMapping : LeaseContractFieldMapping,
			hiddenField : LeaseContractHiddenField
		}
	});
}
Ext.extend(LeaseContractForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function (data, fields) {
		var project = $ajaxSyncCall(__ctxPath + "/archive/loadProject.do", {
			projectId : data.projectId
		})
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName, data.address, project.data[0].taxMode, data.contractmaId ]);
	},
	importCorp : function (data, fields) {
		this.setMultiFieldValue(fields, [ data.corpName ]);
	},
	importCustomer: function (data, fields) {
		this.setMultiFieldValue(fields, [ data.customerName ]);
	},
	allLodingSubmit : function () {
		var materialsInventory = this.leaseMaterialsInventoryGrid.getStore();
		var materialsInventoryData = null;
		if (materialsInventory.reader.jsonData != undefined) {
			if (materialsInventory.reader.jsonData.length == 0) {
				$toast("请先添加要租借的设备清单！");
				return;
			}
			materialsInventoryData = materialsInventory.reader.jsonData;
			for (var i = 0; i < materialsInventoryData.length; i++) {
				var dailyRent = materialsInventoryData[i].dailyRent;
				$request({
					url : __ctxPath + "/materials/listMaterialsSpecifications.do?limit=1000",
					waitMsg : "正在载入数据...",
					async : true,
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							var resultData = data.result[i];
							resultData["dailyRent"] = dailyRent;
							this.leasePriceSettingGrid.addSubModuleDate(resultData);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
				$request({
					url : __ctxPath +  "/materials/listMaterialsDamage.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							this.leaseSpoiledIndemnityGrid.addSubModuleDate(data.result[i]);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
				$request({
					url : __ctxPath +  "/materials/listMaterialsScrap.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							this.leaseScrapCompensationGrid.addSubModuleDate(data.result[i]);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
				$request({
					url : __ctxPath +  "/materials/listAssembleAndDisassembleFee.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							this.leaseExpenseHandlingGrid.addSubModuleDate(data.result[i]);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
			}
		} else {
			if (materialsInventory.modified.length == 0) {
				$toast("请先添加要租借的设备清单！");
				return;
			}
			materialsInventoryData = materialsInventory.modified;
			var dailyRentArray = new Array();
			var loop = null;
			for (var i = 0; i < materialsInventoryData.length; i++) {
				var dailyRent = materialsInventoryData[i].data.dailyRent;
				dailyRentArray.push(dailyRent);
				$request({
					url : __ctxPath + "/materials/listMaterialsSpecifications.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].data.commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							var resultData = data.result[i];
							if (loop == null) {
								loop = 0;
							} 
							if (i == data.result.length-1) {
								loop+=1
								resultData["dailyRent"] = dailyRentArray[loop-1];
							} else {
								resultData["dailyRent"] = dailyRentArray[loop];
							}
							this.leasePriceSettingGrid.addSubModuleDate(resultData);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
				$request({
					url : __ctxPath +  "/materials/listMaterialsDamage.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].data.commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							this.leaseSpoiledIndemnityGrid.addSubModuleDate(data.result[i]);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
				$request({
					url : __ctxPath +  "/materials/listMaterialsScrap.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].data.commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							this.leaseScrapCompensationGrid.addSubModuleDate(data.result[i]);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
				$request({
					url : __ctxPath +  "/materials/listAssembleAndDisassembleFee.do?limit=1000",
					waitMsg : "正在载入数据...",
					params : {
						"Q_[materialsCommodity.commodityId]_L_EQ" : materialsInventoryData[i].data.commodityId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText);
						for (var i = 0; i< data.result.length; i++) {
							this.leaseExpenseHandlingGrid.addSubModuleDate(data.result[i]);
						}
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				})
			}
		}	
	},
	saveFormData : function() {
		this.setFieldValue("leaseMaterialsInventorys", $gridstore2json(this.leaseMaterialsInventoryGrid));
		this.setFieldValue("leasePriceSettings", $gridstore2json(this.leasePriceSettingGrid));
		this.setFieldValue("leaseSpoiledIndemnitys", $gridstore2json(this.leaseSpoiledIndemnityGrid));
		this.setFieldValue("leaseScrapCompensations", $gridstore2json(this.leaseScrapCompensationGrid));
		this.setFieldValue("leaseExpenseHandlings", $gridstore2json(this.leaseExpenseHandlingGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitLeaseContract.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.leaseId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLeaseContract.do?leaseId=" + this.leaseId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("accountingMethod", data.accountingMethodName);
					this.setFieldRawValue("taxMethod", data.taxMethodName);
					this.setFormSubModuleGrid(data.leaseMaterialsInventorySet, this.leaseMaterialsInventoryGrid);
					this.setFormSubModuleGrid(data.leasePriceSettingSet, this.leasePriceSettingGrid);
					this.setFormSubModuleGrid(data.leaseSpoiledIndemnitySet, this.leaseSpoiledIndemnityGrid);
					this.setFormSubModuleGrid(data.leaseScrapCompensationSet, this.leaseScrapCompensationGrid);
					this.setFormSubModuleGrid(data.leaseExpenseHandlingSet, this.leaseExpenseHandlingGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else if (this.relation) {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = [ "project.projectId", "project.projectName", "project.projectTypeName", "taxRate", 
				"leaseApplication.applicationId", "applyingUnit", "applyingUnitDirector", "taxMethod"];
			var values = [ this.project.projectId, this.project.projectName, this.project.projectTypeName, 
				this.data.taxRate, this.data.applicationId, this.data.applyingUnit, this.data.userName, this.project.taxMode ];
			this.setMultiFieldValue(fieldNames, values);
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
		}
	}
})