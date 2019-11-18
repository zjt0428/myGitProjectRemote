var EquipWarehouseForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var warehouseResultData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "INSPECT_RESULT"
	});
	var warehouseStatusData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "WAREHOUSE_COMPON_STATUS"
	});
	var storeHouseData = $ajaxSyncCall(__ctxPath + "/archive/arraylistStoreHouse.do", {
		Q_delFlag_S_EQ : "1"
	});
	this.equipWarehouseComponGrid = new EquipWarehouseComponGrid({
		warehouseResultData : warehouseResultData,
		warehouseStatusData : warehouseStatusData,
		flowId : this.equipFlow.flowId,
		projectId:this.equipFlow.contractLease.projectId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.warehouseId,
		relateModule : RelationModule.equipWarehouse.relateModule,
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
					name : "equipWarehouse.userName"
				}, {
					readOnly : true,
					fieldLabel : "入库单号",
					name : "equipWarehouse.warehouseSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "equipWarehouse.providedDate",
					value : new Date()
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "入库时间",
					name : "equipWarehouse.warehouseDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipWarehouse.department.depName"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "收货人员",
					single:true,
					readOnly : true,
					name : "equipWarehouse.receiveMan",
					relateModule : RelationModule.practitioner.relateModule,
					fields :  [ "receiveManId","receiveMan"],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importUserArchives.createDelegate(this)
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
				columnWidth : 0.34,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "规格型号",
					name : "equipWarehouse.equipFlow.equipDiary.equipSpecificName"
				}, {
					fieldLabel : "设备自编号",
					name : "equipWarehouse.equipFlow.equipDiary.equipSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "入库仓库",
					name : "equipWarehouse.storeName",
					fields : [ "storeName", "storeId" ],
					relateModule : RelationModule.storeHouse.relateModule,
					importhandler : this.importStoreHouse.createDelegate(this)
				}, {
					fieldLabel : "运输车牌",
					readOnly : false,
					name : "equipWarehouse.vehicleNum"
				}   ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "合同编号",
					name : "equipWarehouse.equipFlow.contractLease.contractNo"
				}, {
					fieldLabel : "备案编号",
					name : "equipWarehouse.equipFlow.equipDiary.recordId"
				}, {
					fieldLabel : "项目名称",
					name : "equipWarehouse.equipFlow.equipDiary.projectName"
				}, {
					fieldLabel : "生产厂家",
					name : "equipWarehouse.equipFlow.equipDiary.equipVender"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备名称",
					name : "equipWarehouse.equipFlow.equipDiary.equipGenericName"
				}, {
					xtype : "textfield",
					anchor : "95%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "equipWarehouse.equipFlow.equipDiary.address"
				}, {
					fieldLabel : "运输人员",
					readOnly : false,
					name : "equipWarehouse.vehiclePerson"
				}, {
					fieldLabel : "附属单据号",
					readOnly : false,
					name : "equipWarehouse.attachSerial"
				}]
			} ]
		}]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.equipWarehouseComponGrid ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ fileAttachContainer ]
	} ];
	EquipWarehouseForm.superclass.constructor.call(this, {
		title : "入库信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "equipWarehouse",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.warehouseId,
				relateModule : RelationModule.equipWarehouse.relateModule
			},
			url : __ctxPath + "/equip/saveEquipWarehouse.do",
			items : items,
			fieldMapping : EquipWarehouseFieldMapping,
			hiddenField : EquipWarehouseHiddenField
		}
	});
};
Ext.extend(EquipWarehouseForm, Knight.ux.FormPanelWindow, {
	importStoreHouse : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeName, data.storeId ]);
	},
	importUserArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiId,data.practiName]);
	},
	saveFormData : function() {
		this.setFieldValue("equipWarehouseCompons", $gridstore2json(this.equipWarehouseComponGrid));
        if(isCorpAppUser()){
            this.setFieldValue("corpId",curUserInfo.corpInfo.corpId);
        }
		var ischeck = true;
		for(var i = 0;i<this.equipWarehouseComponGrid.getStore().getCount();i++){
			var r = this.equipWarehouseComponGrid.getStore().getAt(i).data;
			if(r.status == "0"){
				ischeck = false;
				Ext.Msg.confirm("注意", "计划入库配件存在验证结果为【不可用】配件,是否确定?", function(c) {
					if (c == "yes") {
						$formsubmit(this.getForm(), function(c, e) {
							$toast("信息操作成功！");
							var resp = Ext.util.JSON.decode(e.response.responseText);
							this.submitApplication(__ctxPath + "/equip/multiSubmitEquipWarehouse.do", resp.applyforId, resp.msg);
						}.createDelegate(this));
					}else{
						return;
					}
				}, this);
			}
		}
		if(ischeck){
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipWarehouse.do", resp.applyforId, resp.msg);
		}.createDelegate(this));
		}
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.warehouseId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipWarehouse.do?warehouseId=" + this.warehouseId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.equipWarehouseComponSet, this.equipWarehouseComponGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
            var grid = this.equipWarehouseComponGrid;
			var equipFlow = this.equipFlow;
			var fieldNames = [ "principal" ];
			var values = [ curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "equipFlow.flowId" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, equipFlow.flowId ];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "recordSerial", "equipSpecificName", "projectSerial", "equipCategoryName", "recordId", "projectName", "equipGenericName", "exwSerial", "address", "exwDate","equipSerial","equipVender" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(equipFlow.equipDiary, fieldNames));
			fieldNames = [ "contractNo"];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.contractLease", fieldNames), this.paddingValues(equipFlow.contractLease, fieldNames));
            new Ext.util.DelayedTask(function(){
                grid.addSubModule();
            }).delay(50);
		}
	}
});