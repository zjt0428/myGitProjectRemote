var ReturnGoodsForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	this.returnListGrid = new ReturnListGrid({
		saveable : this.saveable
	})
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.returnId,
		relateModule : RelationModule.returnGoods.relateModule,
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
					fieldLabel : "退货单号",
					name : "returnGoods.returnSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "退货主题",
					name : "returnGoods.returnTheme"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "合同编号",
					name : "returnGoods.leaseContract.leaseIdentifier"
				}, {
					disabled : !this.saveable,
					fieldLabel : "附属单据号",
					name : "returnGoods.subsidiarySerial"
				}, {
					disabled : !this.saveable,
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					editable : false,
					allowBlank : false,
					fieldLabel : "回收日期",
					name : "returnGoods.returnDate",
					value : new Date()
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "制单人员",
					name : "returnGoods.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					disabled : !this.saveable,
					width : 150,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "制单时间",
					name : "returnGoods.fillDate",
					value : new Date()
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "仓库名称",
					name : "returnGoods.depotName",
					value : "租借仓库"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "入库库位",
					name : "returnGoods.locationName",
					value : "成品库"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "回收类型",
					name : "returnGoods.returnType",
					value : "租借退货"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "returnGoods.project.projectName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fields : ["leaseUnit"],
					fieldLabel : "租借单位",
					name : "returnGoods.leaseUnit",
					relateModule : RelationModule.corp.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importLeaseCorp.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fields : ["lesseeUnit"],
					fieldLabel : "承租单位",
					name : "returnGoods.lesseeUnit",
					relateModule : RelationModule.corp.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importLesseeCorp.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					fields : ["transportVehicle", "transportPersonnel"],
					fieldLabel : "运输车辆",
					name : "returnGoods.transportVehicle",
					relateModule : RelationModule.car.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importCar.createDelegate(this)
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "运输人员",
					name : "returnGoods.transportPersonnel"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					fieldLabel : "收发审核人",
					name : "returnGoods.auditor"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					disabled : !this.saveable,
					width : 150,
					editable : false,
					fieldLabel : "收发审核时间",
					name : "returnGoods.approveDate",
				}, {
					disabled : !this.saveable,
					fieldLabel : "单据审核人",
					name : "returnGoods.subsidiaryAuditor"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					disabled : !this.saveable,
					width : 150,
					editable : false,
					fieldLabel : "单据审核时间",
					name : "returnGoods.subsidiaryApproveDate",
				}]
			}]
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		items : [this.returnListGrid]
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
			name : "returnGoods.remarks"
		}, fileAttachContainer]
	}];
	
	ReturnGoodsForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		title : "退货明细",
		form_config : {
			object : "returnGoods",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.returnId,
				relateModule : RelationModule.returnGoods.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.returnId,
				relateModule : RelationModule.returnGoods.relateModule
			},
			url : __ctxPath + "/materials/saveReturnGoods.do",
			items : items,
			fieldMapping : ReturnGoodsFieldMapping,
			hiddenField : ReturnGoodsHiddenField
		}
	});
}
Ext.extend(ReturnGoodsForm, Knight.ux.FormPanelWindow, {
	importCar : function (data, fields) {
		this.setMultiFieldValue(fields, [data.licensePlate, data.driver]);
	},
	importLeaseCorp : function (data, fields) {
		this.setMultiFieldValue(fields, [data.corpName]);
	},
	importLesseeCorp : function (data, fields) {
		this.setMultiFieldValue(fields, [data.corpName]);
	},
	importLocation : function (data, fields) {
		this.setMultiFieldValue(fields, [data.locationName]);
	},
	saveFormData : function() {
		this.setFieldValue("returnLists", $gridstore2json(this.returnListGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitReturnGoods.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.returnId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadReturnGoods.do?returnId=" + this.returnId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.returnListSet, this.returnListGrid);
					this.returnListGrid.addLeaseId(this.leaseContract.leaseId);
					this.returnListGrid.contractId = data.leaseContract.contractId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var baseDepot = $ajaxSyncCall(__ctxPath + "/materials/listBaseDepot.do",{"Q_depotName_S_LK" : "租借仓库"}).result;
			var fieldNames = ["leaseContract.leaseId", "leaseContract.leaseIdentifier", "project.projectId",
				"project.projectName", "leaseUnit", "lesseeUnit", "depotId", "locationId"];
			var values = [this.data.leaseId, this.data.leaseIdentifier, this.data.project.projectId,
				this.data.project.projectName, this.data.leaseUnit, this.data.lesseeUnit,baseDepot[0].depotId, "99"];//客户说租借仓库不需要库位
			this.setMultiFieldValue(fieldNames, values);
			this.returnListGrid.addLeaseId(this.data.leaseId);
			this.returnListGrid.contractId = this.data.contractId;
		}
	}
})