var EquipRepairForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var repairResultCombo = $initComboBoxField("维修结果", "equipRepair.repairResult", "INSPECT_RESULT", {
		editable : true
	});
	/*var runningStateCombo = $initComboBoxField("运行状态", "equipRepair.runningState", "REPAIR_RUNNING_STATE", {
		allowBlank : true,
		editable : true
	});*/
	/*var runningStateCombo = $initComboBoxField("维修班组", "equipRepair.runningState", "REPAIR_RUNNING_STATE", {
		allowBlank : true,
		editable : true
	});*/
	var runningStateCombo = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=project", "维修班组", "equipRepair.teamId");
	
	var faultLocationData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultLocation"
	});
	var diagnosisData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultDiagnosis"
	});

	this.equipRepairNewComponGrid = new EquipRepairComponGrid(null, {
		faultLocationData : faultLocationData,
		title : "维修耗材",
		saveable : this.saveable
	});
	this.equipRepairLocationGrid = new EquipRepairLocationGrid({
		faultLocationData : faultLocationData,
		diagnosisData : diagnosisData
	}, {
		title : "维修用工",
		saveable : this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.repairId,
		relateModule : RelationModule.equipRepair.relateModule,
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
					name : "equipRepair.userName"
				}, {
					readOnly : true,
					fieldLabel : "维修单号",
					name : "equipRepair.repairSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {		
					readOnly :false,
					width : 130,
					xtype : "datetimefield",
					editable : false,
					format : "Y-m-d H:i:s",
					width : 130,
					fieldLabel : "填报日期",
					name : "equipRepair.providedDate",
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
					name : "equipRepair.department.depName"
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
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "备案编号",
					name : "equipRepair.equipment.recordId"
				}, {
					fieldLabel : "设备名称",
					name : "equipRepair.equipment.equipGenericName"
				}, {
					xtype : "hidden",
					name : "equipRepair.depId",
					id : "equipRepair.depId"
				},{
					fieldLabel : "维修仓库",
					name : "equipRepair.equipment.storeName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "设备自编号",
					name : "equipRepair.equipment.equipSerial"
				},{
					fieldLabel : "出厂编号",
					name : "equipRepair.equipment.exwSerial"
				},{
					readOnly :false,
					xtype : "datetimefield",
					width : 130,
					editable : false,
					format : "Y-m-d",		
					fieldLabel : "入库日期",
					name : "equipRepair.equipment.warehouseDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "生产厂家",
					name : "equipRepair.equipment.equipVender"
				},{
					xtype : "datetimefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "报废日期",
					name : "equipRepair.equipment.scrapDate",
					value : new Date()
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "派工信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items :[runningStateCombo, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "计划完成时间",
					name : "equipRepair.completionedDate",
					value : new Date()}]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {/*
					xtype : "relationCompositeField",
			    	disabled : !this.saveable,
					fieldLabel : "维修人员",
					name : "equipRepair.repairMan",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				
				*/
					maxValue : 999999,
					fieldLabel : "维修人员",
					name : "equipRepair.repairMan"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "维修类型",
					name : "equipRepair.preventiveMeasures"
				} ]
			}]
		}, fileAttachContainer ]
	} ];

	var url = __ctxPath + "/equip/saveEquipRepair.do";
	if (this.dealwithable && !Ext.isEmpty(this.repairId)) {
		url = __ctxPath + "/equip/dealwithEquipRepair.do";
		items.push({
			xtype : "fieldset",
			title : "处理结果",
			anchor : "98%",
			collapsible : true,
			items : [ {
				xtype : "panel",
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ repairResultCombo, {
						xtype : "datefield",
						format : "Y-m-d",
						width : 130,
						editable : false,
						fieldLabel : "完成日期",
						name : "equipRepair.repairDate"
					} ]
				},{
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "numberfield",
						fieldLabel : "维修费用",
						name : "equipRepair.repairAmount"
					} ]
				} ]
			}, {
				anchor : "95%",
				maxLength : 256,
				height : 48,
				xtype : "textarea",
				fieldLabel : "维修记录",
				
				name : "equipRepair.renewalDescription"
			}, {
				anchor : "95%",
				maxLength : 256,
				height : 48,
				xtype : "textarea",
				fieldLabel : "更换记录",
				name : "equipRepair.schemaName"
			}, {
				anchor : "95%",
				maxLength : 256,
				height : 48,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "equipRepair.remark"
			}, fileAttachContainer ]
		});
		this.relateTabPanel = new Ext.TabPanel({
			autoHeight : true,
			anchor : "98%",
			activeTab : 0,
			items : [ this.equipRepairLocationGrid,/*this.equipRepairOldComponGrid,*/ this.equipRepairNewComponGrid/*, this.equipRepairVehicleGrid, this.liftDispatchAllocateGrid, this.towerCraneDispatchAllocateGrid */]
		});
		items.push(this.relateTabPanel);
	}

	EquipRepairForm.superclass.constructor.call(this, {
		title : "维修信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "equipRepair",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.repairId,
				relateModule : RelationModule.equipRepair.relateModule
			},
			url : url,
			items : items,
			fieldMapping : EquipRepairFieldMapping,
			hiddenField : EquipRepairHiddenField
		}
	});
};
Ext.extend(EquipRepairForm, Knight.ux.FormPanelWindow, {
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
	importCarArchives : function(data) {
		this.setFieldValue("licensePlate", data.licensePlate);
	},
	
	saveFormData : function() {
		var team = this.getForm().findField("depTreeSelector").value;
		this.setFieldValue("teamName", team);
		/*this.setFieldValue("equipRepairOldCompons", $gridstore2json(this.equipRepairOldComponGrid));*/
		this.setFieldValue("equipRepairNewCompons", $gridstore2json(this.equipRepairNewComponGrid));
		this.setFieldValue("equipRepairLocations", $gridstore2json(this.equipRepairLocationGrid));
		/*this.setFieldValue("equipRepairVehicles", $gridstore2json(this.equipRepairVehicleGrid));
		this.setFieldValue("towerCraneDispatchAllocates", $gridstore2json(this.towerCraneDispatchAllocateGrid));
		this.setFieldValue("liftDispatchAllocates", $gridstore2json(this.liftDispatchAllocateGrid));*/

		var newAmount = Number(this.equipRepairNewComponGrid.getTotalSummary());
		var locationAmount = Number(this.equipRepairLocationGrid.getTotalSummary());
		/*var vehicleAmount = Number(this.equipRepairVehicleGrid.getTotalSummary());*/
		var repairAmount = newAmount + locationAmount /*+ vehicleAmount*/;
		this.setFieldValue("repairAmount", repairAmount);
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/equip/multiSubmitEquipRepair.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.repairId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipRepair.do?repairId=" + this.repairId,	
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					//this.setFieldValue("licensePlate", data.licensePlate);
					this.setFormSubModuleGrid(data.equipRepairOldComponSet, this.equipRepairOldComponGrid);
					this.setFormSubModuleGrid(data.equipRepairNewComponSet, this.equipRepairNewComponGrid);
					this.setFormSubModuleGrid(data.equipRepairLocationSet, this.equipRepairLocationGrid);
					this.setFormSubModuleGrid(data.equipRepairVehicleSet, this.equipRepairVehicleGrid);
					this.getForm().findField("depTreeSelector").setValue(data.teamName);
					this.getForm().findField("equipRepair.equipment.equipSerial").setValue(data.equipment.equipSerial);
					this.getForm().findField("equipRepair.equipment.equipVender").setValue(data.equipment.equipVender);
					if(data.towerCraneDispatchAllocateSet.length==0||data.liftDispatchAllocateSet.length==0){
						$request({
							url : __ctxPath + "/form/loadDispatchAllocateInit.do",
							async : true,
							success : function(g, h) {
								var resp = Ext.util.JSON.decode(g.responseText);
								if(data.towerCraneDispatchAllocateSet.length==0){
									data.towerCraneDispatchAllocateSet = resp.data[0];
								}
								if(data.liftDispatchAllocateSet.length==0){
									data.liftDispatchAllocateSet = resp.data[1];
								}	
							}.createDelegate(this)
					    });
					}
					this.setFormSubModuleGrid(data.towerCraneDispatchAllocateSet, this.towerCraneDispatchAllocateGrid);
					this.setFormSubModuleGrid(data.liftDispatchAllocateSet, this.liftDispatchAllocateGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "relateId", "relateSerial", "relateModule", "relateModuleName", "buildingNum"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.relateId, this.relateSerial, this.relateModule, this.relateModuleName, this.equipDiary.buildingNum];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "projectId", "projectName", "address","projectName" ];
			this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(this.equipDiary, fieldNames));
			fieldNames = [ "equipId", "recordSerial", "recordId", "exwSerial", "equipCategoryName", "equipGenericName", "equipSpecificName","scrapDate" ,"equipSerial","equipVender","storeName","warehouseDate"];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipDiary, fieldNames));
		}
	}

});