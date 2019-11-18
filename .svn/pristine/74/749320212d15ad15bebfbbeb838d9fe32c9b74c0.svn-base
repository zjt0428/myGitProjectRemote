var MaterialsPackageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮

	var faultLocationData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultLocation"
	});
	var diagnosisData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultDiagnosis"
	});
	var paymentTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "paymentType"
	});

	var rentTypeCombo = $initComboBoxField("出租类型", "materialsPackage.rentType", "rentType", {
		defaultValueIndex : 0,
		editable : true
	});
	this.packageDetailGrid = new PackageDetailGrid({
		saveable : this.saveable
	});
	this.costDetailGrid = new CostDetailGrid({
		saveable : this.saveable
	}, {
		paymentTypeData : paymentTypeData,
		packageDetailGrid : this.packageDetailGrid,
		materialsDispatch : this.materialsDispatch,
		contractId : this.materialsDispatch == null ? this.contractId : this.materialsDispatch.contractId
	});

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.packageId,
		relateModule : RelationModule.materialsPackage.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "基础数据项",
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
					fieldLabel : "制单人员",
					name : "materialsPackage.userName",
					value : curUserInfo.fullname
				}, {
					hidden : true,
					maxLength : 20,
					name : "materialsPackage.userId",
					value : curUserInfo.userId
				}, {
					readOnly : true,
					emptyText : "系统自动生成",
					fieldLabel : "装车单号",
					name : "materialsPackage.packageSerial"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "运输车辆号",
					name : "materialsPackage.vehicleNum",
					relateModule : RelationModule.car.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importCarArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "收发人员",
					name : "materialsPackage.receiveName",
					fields : [ "receiveId", "receiveName" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					id : "materials_handingCharge",
					allowBlank : true,
					fieldLabel : "装卸费金额",
					name : "materialsPackage.handingCharge",
					value : 0
				}, {
					id : "materials_packAmount",
					allowBlank : true,
					fieldLabel : "包装费金额",
					name : "materialsPackage.packAmount",
					value : 0
				}, rentTypeCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 130,
					readOnly : true,
					editable : false,
					fieldLabel : "制单时间",
					name : "materialsPackage.applyDate",
					value : new Date()
				}, {
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "仓库名称",
					name : "materialsPackage.storeName"
				}, {
					maxLength : 128,
					allowBlank : false,
					fieldLabel : "工程名称",
					name : "materialsPackage.projectName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "运输车辆人员",
					name : "materialsPackage.vehiclePerson"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "收发审核人员",
					name : "materialsPackage.dispatchAuditorName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					readOnly : true,
					editable : false,
					fieldLabel : "收发审核时间",
					name : "materialsPackage.dispatchAuditorDate",
					value : new Date()
				}, {
					allowBlank : true,
					fieldLabel : "附属单据号",
					name : "materialsPackage.orderAuditorName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "出库库位",
					name : "materialsPackage.storageLocation",
					value : curUserInfo.userId
				}, {
					maxLength : 24,
					hidden : true,
					allowBlank : true,
					fieldLabel : "状态",
					name : "materialsPackage.status"
				}, {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "materialsPackage.contractSerial"
				}, {
					hidden : true,
					readOnly : true,
					fieldLabel : "合同ID",
					name : "materialsPackage.contractId"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 147,
					readOnly : false,
					editable : false,
					fieldLabel : "装车日期",
					name : "materialsPackage.packageDate",
					value : new Date()
				}, {
					allowBlank : true,
					fieldLabel : "运费金额",
					name : "materialsPackage.tranportAmount"
				}, {
					allowBlank : true,
					fieldLabel : "单据审核人员",
					name : "materialsPackage.orderAuditorName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 130,
					readOnly : true,
					editable : false,
					fieldLabel : "单据审核时间",
					name : "materialsPackage.orderAuditorDate",
					value : new Date()
				} ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.packageDetailGrid, this.costDetailGrid ]
	});
	items.push(this.relateTabPanel);
	var remarks = {
		xtype : "fieldset",
		anchor : "98%",
		lablewidth : 30,
		items : [ {
			anchor : "95%",
			maxLength : 256,
			height : 48,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "materialsPackage.remark"
		}, fileAttachContainer ]
	};
	items.push(remarks);
	MaterialsPackageForm.superclass.constructor.call(this, {
		title : "现场装车明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "materialsPackage",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.packageId,
				relateModule : RelationModule.materialsPackage.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.packageId,
				relateModule : RelationModule.materialsPackage.relateModule
			},
			url : __ctxPath + "/materials/saveMaterialsPackage.do",
			items : items,
			fieldMapping : MaterialsPackageFieldMapping,
			hiddenField : MaterialsPackageHiddenField
		}
	});
};
Ext.extend(MaterialsPackageForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName ]);
	},
	importCarArchives : function(data) {
		this.setMultiFieldValue([ "vehicleNum", "vehiclePerson" ], [ data.licensePlate, data.driver ]);
	},
	saveFormData : function() {
		this.setFieldValue("packageDetails", $gridstore2json(this.packageDetailGrid));
		this.setFieldValue("costDetails", $gridstore2json(this.costDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitMaterialsPackage.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},

	loadFormData : function() {
		if (!Ext.isEmpty(this.packageId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsPackage.do?packageId=" + this.packageId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.packageDetailGrid.getStore().setDefaultSort('commodityId','DESC');
					this.setFormSubModuleGrid(data.packageDetailSet, this.packageDetailGrid);
					this.setFormSubModuleGrid(data.costDetailSet, this.costDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "contractId", "contractSerial", "projectId", "projectName", "locationId", "storageLocation", "storeId", "storeName", "pbEntId", "pbEntName", "vehicleNum", "vehiclePerson", "materialsId" ];
			var values = [ this.materialsDispatch.contractId, this.materialsDispatch.contractSerial, this.materialsDispatch.projectId, this.materialsDispatch.projectName
				, this.materialsDispatch.locationId, this.materialsDispatch.storageLocation, this.materialsDispatch.storeId, this.materialsDispatch.storeName, this.materialsDispatch.pbEntId,
				this.materialsDispatch.pbEntName, this.materialsDispatch.vehicleNum, this.materialsDispatch.vehiclePerson, this.materialsDispatch.materialsId ];
			this.setMultiFieldValue(fieldNames, values);
			this.setFormSubModuleGrid(this.materialsDispatch.dispatchMaterialsSet, this.packageDetailGrid);
		}
	}
});