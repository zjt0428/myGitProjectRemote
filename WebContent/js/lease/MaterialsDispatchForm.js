var MaterialsDispatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? this.saveable : false; // 保存/重置功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮
	this.acceptable = this.acceptable ? this.acceptable : false; // 审核功能按钮
	this.subcontract = "0";

	this.dispatchMaterialsGrid = new DispatchMaterialsGrid(null,{
		saveable : this.saveable,
		depotId : this.storeId==null?null:this.storeId,
		locationIds : this.locationId==null?null:this.locationId,
		contractId : this.contractMaterials==null? null : this.contractMaterials.contractmaId
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.materialsId,
		relateModule : RelationModule.materialsDispatch.relateModule,
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
					fieldLabel : "制单人",
					name : "materialsDispatch.userName",
					value:curUserInfo.fullname
				}, {
					hidden:true,
					maxLength : 20,
					name : "materialsDispatch.userId",
					value:curUserInfo.userId
				},{
					readOnly : true,
					fieldLabel : "合同编号",
					name : "materialsDispatch.contractSerial"
				},{
					hidden:true,
					readOnly : true,
					fieldLabel : "合同ID",
					name : "materialsDispatch.contractId"
				},{
					readOnly : true,
					fieldLabel : "调度单号",
					name : "materialsDispatch.dispatchSerial"
				}  ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					readOnly : true,
					editable : false,
					fieldLabel : "制单时间",
					name : "materialsDispatch.applyDate",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "仓库名称",
					name : "materialsDispatch.storeName",
					relateModule : RelationModule.baseDepotJoinUser.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importBaseDepotArchives.createDelegate(this)
				
				}, {
					maxLength : 128,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "工程名称",
					name : "materialsDispatch.projectName"
				}, {
					maxLength : 128,
					allowBlank : false,
					fieldLabel : "工程地址",
					name : "materialsDispatch.address"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					hidden:true,
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "状态",
					name : "materialsDispatch.status"
				},{
					fieldLabel : "调度主题",
					name : "materialsDispatch.dispatchTheme"
				},{
					allowBlank : false,
					readOnly : true,
					fieldLabel : "出库库位",
					name : "materialsDispatch.storageLocation"
				},{
					hidden:true,
					maxLength : 20,
					name : "materialsDispatch.pbEntId",
					value:curUserInfo.userId
				},{
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "运输车辆号",
					name : "materialsDispatch.vehicleNum",
					relateModule : RelationModule.car.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importCarArchives.createDelegate(this)
				
				},{
					readOnly : false,
					fieldLabel : "运输车辆人员",
					name : "materialsDispatch.vehiclePerson"
				} ]
			} ]
		} ]
	}];
	var remarks ={
			xtype : "fieldset",
			anchor : "98%",
			labelWidth : 30,
			items : [ {
				anchor : "85%",
				maxLength : 1000,
				maxLengthText : MoreThanMaxLength,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "materialsDispatch.remark"
			}, fileAttachContainer ] 
		};
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.dispatchMaterialsGrid]
	}); 
	items.push(this.relateTabPanel);
	items.push(remarks);

	MaterialsDispatchForm.superclass.constructor.call(this, {
		title : "发货调度明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "materialsDispatch",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.materialsId,
				relateModule : RelationModule.materialsDispatch.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.materialsId,
				relateModule : RelationModule.materialsDispatch.relateModule
			},
			url : __ctxPath + "/materials/saveMaterialsDispatch.do",
			items : items,
			fieldMapping : MaterialsDispatchFieldMapping,
			hiddenField : MaterialsDispatchHiddenField
		}
	});
};
Ext.extend(MaterialsDispatchForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(datas) {
		var repairManField = this.findFormField("repairMan");
		for (var i = 0; i < datas.length; i++) {
			if (Ext.isEmpty(repairManField.getValue())) {
				repairManField.setValue(datas[i].data.practiName);
			} else {
				repairManField.setValue(repairManField.getValue() + "," + datas[i].data.practiName);
			}
		}
	},
	importBaseDepotArchives : function(data) {
		this.setMultiFieldValue(["storeId","storeName" ], [ data.depotId,data.depotName ]);
		this.dispatchMaterialsGrid.storeId = data.depotId;
		new BaseLocationSelector({
			single : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : data.depotId
			},
			callback : function(d) {
				var data = d[0].data;
				this.setMultiFieldValue(["locationId","storageLocation" ], [ data.locationId,data.locationName ]);
				this.dispatchMaterialsGrid.locationId = data.locationId;
			}.createDelegate(this)
		}).show();
	},
	importPaRelationArchives : function(data) {
		this.setMultiFieldValue([ "pbEntName" ], [ data.customerName]);
	},
	importCarArchives : function(data) {
		this.setMultiFieldValue(["vehicleNum","vehiclePerson" ], [ data.licensePlate,data.driver]);
	},
	
	saveFormData : function() {
		this.setFieldValue("dispatchMaterialss", $gridstore2json(this.dispatchMaterialsGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitMaterialsDispatch.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	loadFormData : function() { 
		if (!Ext.isEmpty(this.materialsId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsDispatch.do?materialsId=" + this.materialsId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.dispatchMaterialsSet, this.dispatchMaterialsGrid);
					this.dispatchMaterialsGrid.contractId = data.contractId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
            var fieldNames = ["contractId","contractSerial","projectId","projectName","address","contractNumber"];
            var values = [this.contractMaterials.contractmaId,this.contractMaterials.contractSerial,this.contractMaterials.projectId,this.contractMaterials.projectName,this.contractMaterials.address,this.contractMaterials.contractNumber];
            this.setMultiFieldValue(fieldNames, values);
		}
	}

});