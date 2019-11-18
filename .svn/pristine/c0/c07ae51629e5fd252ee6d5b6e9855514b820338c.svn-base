var RecycleManageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var recycleTypeCombo = $initComboBoxField("回收", "recycleManage.recycleType", "recycleType", {	
		fieldLabel :"回收类型",
		allowBlank : false,
		readOnly : !this.saveable,
		defaultValueIndex : 0
	});
	var paymentTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do ", {
			codeId : "paymentType"
	});
	var baseDepotData = $ajaxSyncCall(__ctxPath + "/materials/listBaseDepotPermission.do", {
		userId : curUserInfo.userId
	});
	var contractMaterials = $ajaxSyncCall( __ctxPath + "/dispatch/loadContractMaterials.do",{
		contractmaId : this.contractMaterials.contractmaId
	});
	var materialsCommodityData = $ajaxSyncCall( __ctxPath + "/materials/arrayListMaterialsCommodity.do",{
	});
	var feesTypeData = [[2,'卸车费'],[3,'打包费']];
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.recycleId,
		relateModule : RelationModule.recycleManage.relateModule,
		saveable : this.saveable
	});
	//回收清单
	this.recycleManageDetailGrid = new RecycleManageDetailGrid({
		relateId : this.recycleId,
		projectId : contractMaterials.data[0].projectId,
		contractId : this.contractMaterials==null ? null : this.contractMaterials.contractmaId,
		parentForm : this
	}, {
		saveable : this.saveable,
		editable : this.editable
	});
	//暂存清单
	this.temporaryStorageGrid = new TemporaryStorageGrid({
		saveable : this.saveable
	});
	//费用清单
	this.recycleManageFeeGrid = new RecycleManageFeeGrid({
		feesTypeData : feesTypeData,
		materialsCommodityData : materialsCommodityData,
		costHandleSet : contractMaterials.data[0].costHandleSet,
		recycleManageDetailGrid : this.recycleManageDetailGrid,
		temporaryStorageGrid : this.temporaryStorageGrid,
		paymentTypeData : paymentTypeData
	}, {
		saveable : this.saveable
	});
	//损坏赔偿
	this.compensationDamageGrid = new CompensationDamageGrid({
		matDamageSet : contractMaterials.data[0].matDamageSet,
		compensationScrapSet : contractMaterials.data[0].compensationScrapSet,
		recycleManageDetailGrid : this.recycleManageDetailGrid
	}, {
		saveable : this.saveable
	});
	
	var items = [ {
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
					readOnly : true,
					fieldLabel : "回收单号",
					name : "recycleManage.recycleSerial"
				}, {
					readOnly : true,
					fieldLabel : "入库仓库",
					name : "recycleManage.baseDepot.depotName"
				},  recycleTypeCombo,{
					readOnly : true,
					fieldLabel : "制单人员",
					name : "recycleManage.userName"
				}, {
					fieldLabel : "收发审核人员",
					name : "recycleManage.sendReceiveMan"
				}, {
					fieldLabel : "单据审核人员",
					name : "recycleManage.invoiceCheckMan"
				}  ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 130,
					editable : false,
					fieldLabel : "制单日期",
					name : "recycleManage.applyDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "recycleManage.contractMaterials.contractSerial"
				}, {
					readOnly : true,
					fieldLabel : "工程名称",
					name : "recycleManage.contractMaterials.projectName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "收发人员",
					name : "recycleManage.receivePeople",
					fields : [ "receivePeople"],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
			}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					fieldLabel : "收发审核时间",
					name : "recycleManage.sendReceiveDate"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					fieldLabel : "单据审核时间",
					name : "recycleManage.invoiceCheckDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "回收日期",
					name : "recycleManage.recycleDate",
					value : new Date()
				}, {
					fieldLabel : "附属单据号",
					name : "recycleManage.affiliatedSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "运输车辆号",
					name : "recycleManage.transportNumber",
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCarArchives.createDelegate(this)
				}, {
					fieldLabel : "运输车辆人员",
					name : "recycleManage.transportMan"
				}, {
					id : "recycleManage_handingCharge",
					readOnly : true,
					fieldLabel : "卸车费用",
					name : "recycleManage.handingCharge",
					value : 0
				}, {
					id : "recycleManage_packageCharge",
					readOnly : true,
					fieldLabel : "包装费用",
					name : "recycleManage.packageCharge",
					value : 0
				}, {
					id : "recycleManage_damage",
					readOnly : true,
					fieldLabel : "损坏赔偿金额",
					name : "recycleManage.damage",
					value : 0
				} ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.recycleManageDetailGrid,this.temporaryStorageGrid,this.compensationDamageGrid,this.recycleManageFeeGrid ]
	});
	items.push(this.relateTabPanel);
	var remarks ={
			xtype : "fieldset",
			anchor : "98%",
			lablewidth : 30,
			items : [ {
				anchor : "95%",
				maxLength : 256,
				height : 48,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "recycleManage.remark"
			},fileAttachContainer ]
	};
	items.push(remarks);
	
	RecycleManageForm.superclass.constructor.call(this, {
		title : "回收信息明细",
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "recycleManage",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.recycleId,
				relateModule : RelationModule.recycleManage.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.recycleId,
				relateModule : RelationModule.recycleManage.relateModule
			},
			url : __ctxPath + "/materials/saveRecycleManage.do",
			items : items,
			fieldMapping : RecycleManageFieldMapping,
			hiddenField : RecycleManageHiddenField
		}
	});
};
Ext.extend(RecycleManageForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiName]);
	},
	getDepotId : function(){
		return this.getFieldValue("baseDepot.depotId");
	},
	importCarArchives : function(data) {
		this.setFieldValue("transportNumber", data.licensePlate);
		this.setFieldValue("transportMan", data.driver);
	},
	saveFormData : function() {
		this.setFieldValue("materialsRecycleCountTemps", this.recycleManageDetailGrid.getEncode());
		this.setFieldValue("recycleManageDetails", $gridstore2json(this.recycleManageDetailGrid));
		this.setFieldValue("recycleManageFees", $gridstore2json(this.recycleManageFeeGrid));
		this.setFieldValue("compensationDamages", $gridstore2json(this.compensationDamageGrid));
		this.setFieldValue("temporaryStorages", $gridstore2json(this.temporaryStorageGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitRecycleManage.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.recycleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadRecycleManage.do?recycleId=" + this.recycleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("recycleType", data.recycleTypeName);
					this.recycleManageDetailGrid.getStore().setDefaultSort('commodityId','DESC');
					this.setFormSubModuleGrid(data.recycleManageDetailSet, this.recycleManageDetailGrid);
					this.setFormSubModuleGrid(data.recycleManageFeeSet, this.recycleManageFeeGrid);
					this.setFormSubModuleGrid(data.compensationDamageSet, this.compensationDamageGrid);
					this.setFormSubModuleGrid(data.temporaryStorageSet, this.temporaryStorageGrid);
					this.recycleManageDetailGrid.contractId = data.contractMaterials.contractmaId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
			var fieldNames = [ "baseDepot.depotId", "baseDepot.depotName" ];
			var values = [this.baseDepot.depotId,this.baseDepot.depotName];
			this.setMultiFieldValue(fieldNames, values);
            fieldNames = [ "projectName", "contractSerial","contractNumber","contractmaId"];
			this.setMultiFieldValue(this.paddingFieldNames("contractMaterials", fieldNames), this.paddingValues(this.contractMaterials, fieldNames));
		}
	}
});