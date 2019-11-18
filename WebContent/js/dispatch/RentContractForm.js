var RentContractForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var rentStandardData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "rentStandard"
	});
	var measurementData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "measurement"
	});
	var reimburseTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "reimburseType"
	});
	this.instalmentGrid = new InstalmentGrid({
		relateId : this.rentId,
		relateSerial : this.rentSerial,
		relateModule : RelationModule.rentContract.relateModule,
		relateModuleName : RelationModule.rentContract.relateModuleName
	}, {
		saveable : this.saveable
	});
	this.rentEquipBriefGrid = new RentEquipBriefGrid({
		rentStandardData : rentStandardData,
		measurementData : measurementData,
		rentId : this.rentId,
		contractId : this.contractId
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	this.rentComponBriefGrid = new RentComponBriefGrid({
		rentStandardData : rentStandardData,
		measurementData : measurementData,
		rentId : this.rentId,
		contractId : this.contractId
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	this.rentItemBriefGrid = new RentItemBriefGrid({
		measurementData : measurementData,
		reimburseTypeData : reimburseTypeData,
		rentId : this.rentId,
		contractId : this.contractId
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	this.rentDeductBriefGrid = new RentDeductBriefGrid({
		measurementData : measurementData,
		rentId : this.rentId,
		contractId : this.contractId
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	this.amountPaymentGrid = new AmountPaymentGrid();
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.rentId,
		relateModule : RelationModule.rentContract.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报人信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "rentContract.userName"
				}, {
					readOnly : true,
					fieldLabel : "结算编号",
					name : "rentContract.rentSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "rentContract.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "结算主题",
					name : "rentContract.rentTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "rentContract.department.depName"
				} ]
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
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "结算起始时间",
					name : "rentContract.startRentDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : ContractLeaseFormConfigure.contractSerialHeader,
					name : "rentContract.contractSerial"
				}, {
					readOnly : true,
					fieldLabel : "承租单位",
					name : "rentContract.paEntName"
				}, {
					readOnly : true,
					fieldLabel : "项目编号",
					name : "rentContract.projectSerial"
				}, {
					readOnly : true,
					fieldLabel : "已付金额",
					name : "rentContract.finishedAmount"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "承包人",
					name : "rentContract.contractor",
					fields : [ "contractor" ],
					relateModule : RelationModule.supplier.relateModule,
					importhandler : this.importSupplierArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "结算截止时间",
					name : "rentContract.endRentDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "合同主题",
					name : "rentContract.contractTheme"
				}, {
					xtype : "relationCompositeMenuButtonField",
					readOnly : true,
					fieldLabel : "出租单位",
					name : "rentContract.pbEntName",
					relations : [ {
						relation : RelationModule.corp
					}, {
						relation : RelationModule.customer
					}, {
						relation : RelationModule.supplier
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "rentContract.projectName"
				}, {
					readOnly : true,
					fieldLabel : "剩余金额",
					name : "rentContract.arrearsAmount"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "产权人",
					name : "rentContract.propertyName",
					fields : [ "propertyName" ],
					relateModule : RelationModule.supplier.relateModule,
					importhandler : this.importSupplierArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "结算金额（元）",
					name : "rentContract.rentAmount"
				}, {
					readOnly : true,
					fieldLabel : "打印标识",
					name : "rentContract.effectiveName"
				}, {
					readOnly : true,
					fieldLabel : "款项状态",
					name : "rentContract.fundStatusName"
				}, {
					readOnly : true,
					fieldLabel : "扣费金额",
					name : "rentContract.deductAmount"
				}, {
					readOnly : true,
					fieldLabel : "应付金额",
					name : "rentContract.paymentAmount"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目地址",
			name : "rentContract.address"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			maxLengthText : MoreThanMaxLength,
			fieldLabel : "备注",
			name : "rentContract.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.rentEquipBriefGrid, this.rentComponBriefGrid, this.rentItemBriefGrid, this.rentDeductBriefGrid ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.instalmentGrid ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.amountPaymentGrid ]
	}];
	RentContractForm.superclass.constructor.call(this, {
		title : "代租结算单明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 960,
		height : 760,
		form_config : {
			labelWidth : 100,
			object : "rentContract",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/saveRentContract.do",
			items : items,
			fieldMapping : RentContractFieldMapping,
			hiddenField : RentContractHiddenField
		}
	});
};
Ext.extend(RentContractForm, Knight.ux.FormPanelWindow, {
	importSupplierArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierName ]);
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "pbEntName" ];
		var values = [ relation.relateSerial];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		var rentAmount = this.rentEquipBriefGrid.getTotalSummary() + this.rentComponBriefGrid.getTotalSummary() + this.rentItemBriefGrid.getTotalSummary();
		if (rentAmount == 0) {
			Ext.MessageBox.alert("操作信息", "结算金额为【0】!");
			return;
		}
		this.setFieldValue("rentAmount", rentAmount);
		var deductAmount = this.rentDeductBriefGrid.getTotalSummary();
		this.setFieldValue("deductAmount", deductAmount);
		this.setFieldValue("paymentAmount", rentAmount - deductAmount);

		this.setFieldValue("rentEquipBriefs", $gridstore2json(this.rentEquipBriefGrid));
		this.setFieldValue("rentComponBriefs", $gridstore2json(this.rentComponBriefGrid));
		this.setFieldValue("rentItemBriefs", $gridstore2json(this.rentItemBriefGrid));
		this.setFieldValue("rentDeductBriefs", $gridstore2json(this.rentDeductBriefGrid));
		this.setFieldValue("instalments", $gridstore2json(this.instalmentGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.rentId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadRentContract.do?rentId=" + this.rentId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.rentEquipBriefSet, this.rentEquipBriefGrid);
					this.setFormSubModuleGrid(data.rentComponBriefSet, this.rentComponBriefGrid);
					this.setFormSubModuleGrid(data.rentItemBriefSet, this.rentItemBriefGrid);
					this.setFormSubModuleGrid(data.rentDeductBriefSet, this.rentDeductBriefGrid);
					this.setFormSubModuleGrid(data.amountPaymentSet, this.amountPaymentGrid);
					
					this.setFormSubModuleGrid(data.instalmentSet, this.instalmentGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fields = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fields, values);
			fields = [ "contractId", "contractSerial", "contractTheme", "paEnt", "paModule", "paEntName", "pbEnt", "pbModule", "pbEntName", "projectId", "projectSerial", "projectName", "address" ];
			this.copyMultiFieldValue(fields, this.contract);
			this.setFieldValue("rentTheme", this.contract.projectName + new Date().format("Ymd"));
			if (this.contract.contractEquipBriefSet.length > 0) {
				new Ext.util.DelayedTask(function() {
					var endRentDate = this.getForm().findField("rentContract.endRentDate").getValue();
					this.rentEquipBriefGrid.addRecordHeight(2 + this.contract.contractEquipBriefSet.length);
					for (var i = 0; i < this.contract.contractEquipBriefSet.length; i++) {
						var a = this.contract.contractEquipBriefSet[i];
						var b = {
							equipCategoryName : a.equipCategoryName,
							equipSpecificName : a.equipSpecificName,
							unit : a.unit,
							startRentDate : Date.parseDate(a.startDate, "Y-m-d"),
							endRentDate : endRentDate,
							rentDays : 0,
							rentStandard : a.rentStandard,
							measurement : a.measurement,
							quantity : a.quantity,
							daysRent : 0,
							deductRent : 0
						};
						this.contract.contractEquipBriefSet[i] = b;
					}
					this.rentEquipBriefGrid.getStore().loadData(this.contract.contractEquipBriefSet);
				}.createDelegate(this)).delay(50);
			}
		}
	}
});