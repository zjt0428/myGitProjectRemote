var ComponIntoStoreForm = function(a, b) {
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
	this.equipWarehouseComponGrid = new ComponIntoStoreDetailGrid({
		warehouseResultData : warehouseResultData,
		warehouseStatusData : warehouseStatusData,
		projectId : this.projectId
	}, {
		saveable : this.saveable
	});
	this.attachmentStorageGrid = new AttachmentStorageGrid({
		warehouseResultData : warehouseResultData,
		warehouseStatusData : warehouseStatusData,
		projectId : this.projectId
	}, {
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
					name : "componIntoStore.userName"
				}, {
					readOnly : true,
					fieldLabel : "入库单号",
					name : "componIntoStore.serial"
				}, {
					readOnly : true,
					fieldLabel : "运输人员",
					name : "componIntoStore.driver"
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
					name : "componIntoStore.providedDate",
					value : new Date()
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "入库时间",
					name : "componIntoStore.intoDate",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
					fieldLabel : "车号",
					allowBlank : true,
					name : "componIntoStore.licensePlate",
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCar.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "componIntoStore.department.depName"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "收货人员",
					single:true,
					readOnly : true,
					name : "componIntoStore.receiveMan",
					relateModule : RelationModule.practitioner.relateModule,
					fields :  [ "receiveManId","receiveMan"],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importUserArchives.createDelegate(this)
				}, {
					fieldLabel : "原单据号",
					name : "componIntoStore.originalSerial"
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
					fieldLabel : "项目编号",
					name : "componIntoStore.projectSerial"
				},{
					fieldLabel : "合同编号",
					name : "componIntoStore.contractNo"
				},{
					hidden : true,
					name : "componIntoStore.contractId",
				},{
					hidden : true,
					name : "componIntoStore.overallUnit",
					value:"0"
				},{
					hidden:true,
					name : "componIntoStore.projectId"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "项目名称",
					name : "componIntoStore.projectName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "负责人",
					name : "componIntoStore.principal",
					fields : [ "principal", "principalTel" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "入库仓库",
					fields : [ "storeId", "storeName" ],
					name : "componIntoStore.storeName",
					relateModule : RelationModule.storeHouse.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importStoreHouseArchives.createDelegate(this)
				}
//				{
//					xtype : "simplecombo",
//					width : 130,
//					readOnly : false,
//					codeData : storeHouseData,
//					fieldLabel : "入库仓库",
//					hiddenName : "componIntoStore.storeId",
//					name : "componIntoStore.storeName"
//				}
				, {
					readOnly : false,
					fieldLabel : "联系方式",
					name : "componIntoStore.principalTel"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目地址",
			name : "componIntoStore.address"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.equipWarehouseComponGrid,this.attachmentStorageGrid ]
	},{
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
		anchor : "85%",
		maxLength : 128,
		maxLengthText : MoreThanMaxLength,
		xtype : "textarea",
		fieldLabel : "备注",
		name : "componIntoStore.remark"
	  } ]
	} ];
	ComponIntoStoreForm.superclass.constructor.call(this, {
		title : "入库信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "componIntoStore",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.rowId,
				relateModule : RelationModule.componIntoStore.relateModule
			},
			url : __ctxPath + "/equip/saveComponIntoStore.do",
			items : items,
			fieldMapping : ComponIntoStoreFieldMapping,
			hiddenField : ComponIntoStoreHiddenField
		}
	});
};
Ext.extend(ComponIntoStoreForm, Knight.ux.FormPanelWindow, {
	importCar : function(data, fields) {
		this.setMultiFieldValue(["licensePlate","driver"], [ data.licensePlate,data.driver]);
	},
	importStoreHouseArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeId, data.storeName,data.address ]);
	},
	importUserArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiId,data.practiName]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName, data.mobile ]);
	},
	saveFormData : function() {
		this.setFieldValue("equipWarehouseCompons", $gridstore2json(this.equipWarehouseComponGrid));
		this.setFieldValue("attachmentStorages", $gridstore2json(this.attachmentStorageGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitComponIntoStore.do", resp.applyforId, resp.msg);
		}.createDelegate(this));
	},
	loadFormData : function(){
		if (!Ext.isEmpty(this.rowId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadComponIntoStore.do?rowId=" + this.rowId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.equipWarehouseComponSet, this.equipWarehouseComponGrid);
					this.setFormSubModuleGrid(data.attachmentStorageSet, this.attachmentStorageGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else {
			var project = this.project;
//			$toast(project.projectSerial);
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "projectId","projectSerial","projectName","address","contractNo","contractId" ];
			values = [project.projectId,project.projectSerial,project.projectName,project.address,project.contractNo,project.contractId];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});