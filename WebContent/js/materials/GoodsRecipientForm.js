var GoodsRecipientForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	this.recipientListGrid = new RecipientListGrid({
		saveable : this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.recipientId,
		relateModule : RelationModule.goodsRecipient.relateModule,
		saveable : this.saveable
	});
	
	var items = [{
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
					editable : false,
					readOnly : true,
					fieldLabel : "收货单号",
					name : "goodsRecipient.recipientSerial"
				}, {
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "制单人员",
					name : "goodsRecipient.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "制单日期",
					name : "goodsRecipient.fillDate",
					value : new Date()
				}, {
					disabled : !this.saveable,
					fieldLabel : "附属单据号",
					name : "goodsRecipient.subsidiarySerial"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					fieldLabel : "发货日期",
					name : "goodsRecipient.deliveryDate",
					value : new Date()
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "收货主题",
					name : "goodsRecipient.recipientTheme"
				}, {
					id : "leaseIdentifier",
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : true,
					fields : ["leaseContract.leaseId", "leaseContract.leaseIdentifier", 
						"project.projectId", "project.projectName", "leaseUnit", "lesseeUnit"],
					fieldLabel : "合同编号",
					name : "goodsRecipient.leaseContract.leaseIdentifier",
					relateModule : RelationModule.leaseContract.relateModule,
					params : {
						"Q_status_S_NEQ" : "7"
					},
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importLeaseContract.createDelegate(this)
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "出租类型",
					name :"goodsRecipient.rentType",
					value : "租借发货"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					fields : ["transportVehicle", "transportPersonnel"],
					fieldLabel : "运输车辆",
					name : "goodsRecipient.transportVehicle",
					relateModule : RelationModule.car.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importCar.createDelegate(this)
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "运输人员",
					name : "goodsRecipient.transportPersonnel"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "项目名称",
					name : "goodsRecipient.project.projectName"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "仓库名称",
					name : "goodsRecipient.depotName",
					value : "租借仓库"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "出库库位",
					name : "goodsRecipient.locationName",
					value : "成品库"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "租借单位",
					name : "goodsRecipient.leaseUnit"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "承租单位",
					name : "goodsRecipient.lesseeUnit"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					fieldLabel : "收发审核人员",
					name : "goodsRecipient.auditor"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					editable : true,
					readOnly : false,
					fieldLabel : "收发审核时间",
					name : "goodsRecipient.approveDate"
				}, {
					disabled : !this.saveable,
					fieldLabel : "单据审核人员",
					name : "goodsRecipient.subsidiaryAuditor"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					editable : true,
					readOnly : false,
					fieldLabel : "单据审核时间",
					name : "goodsRecipient.subsidiaryApproveDate"
				}]
			}]
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		items : [{
			xtype : "panel",
			layout : "fit",
			items : [this.recipientListGrid]
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
			name : "goodsRecipient.remarks"
		}, fileAttachContainer]
	}]
	
	GoodsRecipientForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		title : "收货管理明细",
		form_config : {
			object : "goodsRecipient",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.recipientId,
				relateModule : RelationModule.goodsRecipient.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.recipientId,
				relateModule : RelationModule.goodsRecipient.relateModule
			},
			url : __ctxPath + "/materials/saveGoodsRecipient.do",
			items : items,
			fieldMapping : GoodsRecipientFieldMapping,
			hiddenField : GoodsRecipientHiddenField
		}
	});
}
Ext.extend(GoodsRecipientForm, Knight.ux.FormPanelWindow, {
	importCar : function (data, fields) {
		this.setMultiFieldValue(fields, [data.licensePlate, data.driver]);
	},
	importLeaseCorp : function (data, fields) {
		this.setMultiFieldValue(fields, [data.corpName]);
	},
	importLesseeCorp : function (data, fields) {
		this.setMultiFieldValue(fields, [data.corpName]);
	},
	importLeaseContract : function (data, fields) {
		this.setMultiFieldValue(fields, [data.leaseId, data.leaseIdentifier, 
			data.project.projectId, data.project.projectName, data.leaseUnit, data.lesseeUnit]);
		this.leaseContract = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseContract.do", {
			leaseId : data.leaseId
		});
		this.recipientListGrid.addIsRelation(true);
		this.recipientListGrid.addLeaseId(data.leaseId);
		this.recipientListGrid.contractId = data.contractId;
	},
	importProject : function (data, fields) {
		this.setMultiFieldValue(fields, [data.projectId, data.projectName]);
	},
	saveFormData : function() {
		this.setFieldValue("recipientLists", $gridstore2json(this.recipientListGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitGoodsRecipient.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.recipientId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadGoodsRecipient.do?recipientId=" + this.recipientId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.recipientListSet, this.recipientListGrid);
					if (data.leaseContract == null || data.leaseContract == "" ||data.leaseContract == undefined) {
						if (data.leaseContract.leaseId == null || data.leaseContract.leaseId == "" || data.leaseContract.leaseId || undefined) {
							this.recipientListGrid.isRelation(false);
						}
					} else {
						this.recipientListGrid.addIsRelation(true);
						this.recipientListGrid.addLeaseId(data.leaseContract.leaseId);
					}
					this.recipientListGrid.contractId = data.leaseContract.contractId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var baseDepot = $ajaxSyncCall(__ctxPath + "/materials/listBaseDepot.do",{"Q_depotName_S_LK" : "租借仓库"}).result;
			var fieldName = [ "userId", "userName"/*, "depotId", "locationId"*/];
			var value = [curUserInfo.userId, curUserInfo.fullname/*, baseDepot[0].depotId, "99"*/];//仓库ID、库位ID如没变更，请勿改动！
			this.setMultiFieldValue(fieldName, value);
			this.recipientListGrid.addIsRelation(false);
		}
	}
})