var TemporaryReturnForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮


	this.temporaryReturnDetailGrid = new TemporaryReturnDetailGrid({
		contractId : this.contractMaterials.contractmaId,
		returnId : this.returnId,
		saveable : this.saveable
	});
	this.chargeHandleGrid = new ChargeHandleGrid({
		contractId : this.contractMaterials.contractmaId,
		returnId : this.returnId,
		saveable : this.saveable
	},{
		temporaryReturnDetailGrid : this.temporaryReturnDetailGrid
	});

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.returnId,
		relateModule : RelationModule.temporaryReturn.relateModule,
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
					name : "temporaryReturn.userName",
					value : curUserInfo.fullname
				}, {
					hidden : true,
					maxLength : 20,
					name : "temporaryReturn.userId",
					value : curUserInfo.userId
				}, {
					readOnly : true,
					emptyText : "系统自动生成",
					fieldLabel : "退货单号",
					name : "temporaryReturn.returnSerial"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "运输车辆号",
					name : "temporaryReturn.licensePlate",
					relateModule : RelationModule.car.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importCarArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "收发人员",
					name : "temporaryReturn.deliveryMan",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}]
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
					name : "temporaryReturn.applyDate",
					value : new Date()
				}, {
					maxLength : 128,
					allowBlank : false,
					fieldLabel : "工程名称",
					name : "temporaryReturn.projectName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "运输车辆人员",
					name : "temporaryReturn.driver"
				},  {
					allowBlank : true,
					fieldLabel : "附属单据号",
					name : "temporaryReturn.affiliatedSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					readOnly : true,
					fieldLabel : "退货仓库",
					name : "temporaryReturn.depotName",
					relateModule : RelationModule.baseDepotJoinUser.relateModule,
					importhandler : this.importBaseDepot.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "temporaryReturn.contractMaterials.contractSerial"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 147,
					readOnly : false,
					editable : false,
					fieldLabel : "装车日期",
					name : "temporaryReturn.packageDate",
					value : new Date()
				}]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.temporaryReturnDetailGrid, this.chargeHandleGrid ]
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
			name : "temporaryReturn.remark"
		}, fileAttachContainer ]
	};
	items.push(remarks);
	TemporaryReturnForm.superclass.constructor.call(this, {
		title : TabTitle.TEMPORARY_RETURN,
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "temporaryReturn",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.returnId,
				relateModule : RelationModule.temporaryReturn.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.returnId,
				relateModule : RelationModule.temporaryReturn.relateModule
			},
			url : __ctxPath + "/materials/saveTemporaryReturn.do",
			items : items,
			fieldMapping : TemporaryReturnFieldMapping,
			hiddenField : TemporaryReturnHiddenField
		}
	});
};
Ext.extend(TemporaryReturnForm, Knight.ux.FormPanelWindow, {
	importBaseDepot : function(data) {
		this.setMultiFieldValue(["depotId","depotName"],[data.depotId,data.depotName]);
		this.temporaryReturnDetailGrid.depotId = data.depotId;
	},
	importPractiArchives : function(data) {
		this.setMultiFieldValue(["deliveryMan"], [  data.practiName ]);
	},
	importCarArchives : function(data) {
		this.setMultiFieldValue([ "licensePlate", "driver" ], [ data.licensePlate, data.driver ]);
	},
	saveFormData : function() {
		this.setFieldValue("temporaryReturnDetails", $gridstore2json(this.temporaryReturnDetailGrid));
		this.setFieldValue("chargeHandles", $gridstore2json(this.chargeHandleGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitTemporaryReturn.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},

	loadFormData : function() {
		if (!Ext.isEmpty(this.returnId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadTemporaryReturn.do?returnId=" + this.returnId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.temporaryReturnDetailSet, this.temporaryReturnDetailGrid);
					this.setFormSubModuleGrid(data.chargeHandleSet, this.chargeHandleGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "contractMaterials.contractmaId", "contractMaterials.contractSerial", "projectId", "projectName" ];
			var values = [ this.contractMaterials.contractmaId, this.contractMaterials.contractSerial, this.contractMaterials.projectId, this.contractMaterials.projectName ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});