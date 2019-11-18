var AllocationProjectForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var assetsPropertyCombo = $initComboBoxField("资产属性", "allocationProject.assetsProperty", "assetsProperty", {
		editable : true,
		readOnly : !this.saveable,
		allowBlank : false,
		width : 300,
		defaultValueIndex : 1
	});
	var allocationTypeCombo = $initComboBoxField("调拨类型", "allocationProject.allocationType", "ALLOCATION_TYPE", {
		editable : true,
		readOnly : !this.saveable,
		allowBlank : false,
		defaultValueIndex : 0
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.allocationId,
		relateModule : RelationModule.allocationProject.relateModule,
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
					fieldLabel : "制单人",
					name : "allocationProject.userName"
				}, {
					readOnly : true,
					editable : false,
					fieldLabel : "调拨编号",
					emptyText:"系统自动生成",
					name : "allocationProject.allocationSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 147,
					editable : false,
					readOnly : true,
					fieldLabel : "制单时间",
					name : "allocationProject.makeDate",
					value : new Date()
				}, {
					maxLength : 64,
					fieldLabel : "调拨主题",
					name : "allocationProject.allocationTheme",
				} ]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "调拨日期",
					name : "allocationProject.allocationDate",
					value : new Date()
				}, allocationTypeCombo]
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
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					allowBlank : false,
					width : 300,
					fieldLabel : "调出合同编号",
					name : "allocationProject.outContractSerial",
					relations:[{
						relation : RelationModule.contractMaterials,
						params : {
							Q_applyforState_S_EQ : "3"
						}		
					}],
					importhandler : this.importOutContractArchives.createDelegate(this)
					
				}, {
					width : 300,
					fieldLabel : "调出项目名称",
					name : "allocationProject.outProjectName"
				}, {
					width : 300,
					fieldLabel : "调出项目发货人",
					name : "allocationProject.outProjectConsignor"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 300,
					fieldLabel : "运输车辆号",
					name : "allocationProject.vehicleNum",
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCarArchives.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					allowBlank : false,
					width : 300,
					fieldLabel : "调入合同编号",
					name : "allocationProject.inContractSerial",
					relations:[{
						relation : RelationModule.contractMaterials,
						params : {
							Q_applyforState_S_EQ : "3",
							allocationProject : "allocationProject"
						}		
					}],
					importhandler : this.importInContractArchives.createDelegate(this)
				}, {
					width : 300,
					fieldLabel : "调入项目名称",
					name : "allocationProject.inProjectName"
				}, {
					width : 300,
					fieldLabel : "调入项目收货人",
					name : "allocationProject.inProjectConsignee"
				}, {
					width : 300,
					fieldLabel : "运输人员",
					name : "allocationProject.vehiclePerson"
				} ]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 300,
					fieldLabel : "附属单据号",
					name : "allocationProject.attachSerial"
				}, {
					width : 300,
					fieldLabel : "审核人",
					name : "allocationProject.auditorName"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 300,
					editable : false,
					fieldLabel : "审核时间",
					name : "allocationProject.auditorDate"
				},assetsPropertyCombo ]
			} ]
		} ]
	} ];
	this.initRelationPanel(this.relationt);
	this.allocationDetailGrid = new AllocationDetailGrid(a, {
		outProjectId : this.outProjectId,
		saveable : this.saveable,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	})
	var resourceItems = [ this.allocationDetailGrid ];
	items.push({
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : resourceItems
	});
	var remarks = {
			xtype : "fieldset",
			anchor : "98%",
			labelWidth : 30,
			items : [ {
				anchor : "85%",
				maxLength : 1000,
				maxLengthText : MoreThanMaxLength,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "allocationProject.remark"
		}, fileAttachContainer ] 
		};
	items.push(remarks);
	var tbarItems = null;
	AllocationProjectForm.superclass.constructor.call(this, {
		title : "项目调拨信息明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "allocationProject",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.allocationId,
				relateModule : RelationModule.allocationProject.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.allocationId,
				relateModule : RelationModule.allocationProject.relateModule
			},
			url : __ctxPath + "/materials/saveAllocationProject.do",
			items : items,
			fieldMapping : AllocationProjectFieldMapping,
			hiddenField : AllocationProjectHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(AllocationProjectForm, Knight.ux.FormPanelWindow, {
	initRelationPanel : function() {
	},
	importOutContractArchives : function(data, relation) {
		var fieldNames=[ "outContractId","outContractSerial","outProjectId","outProjectName"];
		var values=[ data.contractmaId, data.contractSerial,data.projectId,data.projectName ];
		this.setMultiFieldValue(fieldNames, values);
		this.allocationDetailGrid.projectId = data.projectId;
	},
	importInContractArchives : function(data, fields) {
		var fieldNames=[ "inContractId","inContractSerial","inProjectId","inProjectName"];
		var values=[ data.contractmaId, data.contractSerial,data.projectId,data.projectName ];
		this.setMultiFieldValue(fieldNames, values);
		this.allocationDetailGrid.contractId = data.contractmaId;
	},
	importCarArchives : function(data) {
		this.setFieldValue("vehicleNum", data.licensePlate);
		this.setFieldValue("vehiclePerson", data.driver);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
	},
	saveFormData : function() {
		this.setFieldValue("allocationDetails", $gridstore2json(this.allocationDetailGrid));
		var inContratSerial = this.getFieldValue("inContractSerial");
		var outContractSerial = this.getFieldValue("outContractSerial");
		if(inContratSerial != undefined|| inContratSerial != ""){
			if(inContratSerial == outContractSerial){
				Ext.MessageBox.alert("提示","调入的合同和调出的合同不能重复");
				return ;
			}
		}
		var data1 = this.allocationDetailGrid.getStore().data.items;
        for(var k =0;k<data1.length;k++){
        	var allocationCounts = Number(data1[k].data.allocationCounts);//调拨数量
        	var projectTotal = Number(data1[k].data.projectTotal);//项目库存数量
        	if(allocationCounts ==""||allocationCounts==null){
        		 Ext.MessageBox.alert("提示","调拨数量为空不能保存");
        		 return ;
        	}
        	if(allocationCounts > projectTotal){
        		 Ext.MessageBox.alert("提示","调拨数量大于项目库存不能保存");
        		 return ;
        	}
        	this.setFieldValue("projectInitId",data1[k].data.projectInitId);
        }
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitAllocationProject.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.allocationId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadAllocationProject.do?allocationId=" + this.allocationId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
					this.setFieldRawValue("allocationType", data.allocationTypeName);
					this.setFormSubModuleGrid(data.allocationDetailSet, this.allocationDetailGrid);
					this.allocationDetailGrid.contractId = data.inContractId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName", ];
			var values = [ curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});