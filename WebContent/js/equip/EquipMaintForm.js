var EquipMaintForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var maintResultData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "INSPECT_RESULT"
	});
	this.equipMaintDetailGrid = new EquipMaintDetailGrid({
		maintResultData : maintResultData
	}, {
		saveable : this.saveable
	});
	this.equipMaintComponGrid = new EquipMaintComponGrid({
		saveable : this.saveable
	});
	this.maintSchemaStandardGrid = new VerifyStandardGrid({
		grid_config : {
			title : "保养项目",
		},
		itemNameLable : "作业项目",
		demandDesLable : "技术要求及说明",
		remarkLable : "备注"
	}, {
		saveable : true
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.maintId,
		relateModule : RelationModule.equipMaint.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "保养单号",
					name : "equipMaint.maintSerial"
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
					allowBlank : false,
					fieldLabel : "保养日期",
					name : "equipMaint.maintDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "simplecombo",
					width : 130,
					readOnly : false,
					codeData : maintResultData,
					fieldLabel : "整机保养结果",
					hiddenName : "equipMaint.maintResult",
					name : "equipMaint.maintResultName"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "保养级别",
					name : "equipMaint.equipMaintSchema.maintTypeName"
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
					allowBlank : false,
					fieldLabel : "上次维保日期",
					name : "equipMaint.lastMaintDate",
					value : new Date()
				} ]
			},{
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "93%",
					fieldLabel : "保养人员",
					name : "equipMaint.maintPepoles"
				} ]
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
					readOnly : true,
				},
				items : [ {
					fieldLabel : "巡检设备",
					name : "equipMaint.equipMaintSchema.equipment.recordId"
				}, {
					fieldLabel : "截止时间",
					name : "equipMaint.thisEndCycleDate"
				}, {
					fieldLabel : "出厂编号",
					name : "equipMaint.equipMaintSchema.equipment.exwSerial"
				},{
					fieldLabel : "型号",
					name : "equipMaint.equipMaintSchema.equipment.equipSpecificName"
				},{
					fieldLabel : "生产厂家",
					name : "equipMaint.equipMaintSchema.equipment.equipVender"
				},{
					fieldLabel : "生产日期",
					name : "equipMaint.equipMaintSchema.equipment.exwDate"
				},   {
					fieldLabel : "频次",
					name : "equipMaint.cycleTimes"
				},{
					fieldLabel : "项目名称",
					name : "equipMaint.equipMaintSchema.equipment.projectName"
				}, {
					fieldLabel : "状态",
					name : "equipMaint.statusName"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "检验监督人员",
					single:false,
					readOnly : true,
					name : "equipMaint.practiName",
					fields : [ "practiName" ],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractitionerArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "所需车辆",
					readOnly : true,
					name : "equipMaint.licensePlate",
					fields : [ "licensePlate" ],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCarArchives.createDelegate(this)
				},{
					fieldLabel : "费用合计",
					name : "equipMaint.summary"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textarea",
				defaults : {
					readOnly : false,
					maxLength : 1000,
					anchor : "95%",
					height : 48
				},
				items : [{
					fieldLabel : "基础、钢结构",
					name : "equipMaint.basics",
					readOnly : false,
				}, {
					fieldLabel : "起升与变幅机构",
					name : "equipMaint.amplitude",
					readOnly : false
				}, {
					fieldLabel : "回转机构",
					name : "equipMaint.rotation",
					readOnly : false
				}, {
					fieldLabel : "顶升机构",
					name : "equipMaint.lift",
					readOnly : false
				} , {
					fieldLabel : "电气系统",
					name : "equipMaint.electric",
					readOnly : false
				} , {
					fieldLabel : "安全防护装置",
					name : "equipMaint.safe",
					readOnly : false
				}    ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textarea",
				defaults : {
					readOnly : false,
					maxLength : 256,
					anchor : "95%",
					height : 48,
				},
				items : [  {
					fieldLabel : "钢丝绳",
					name : "equipMaint.wire",
					readOnly : false
				}, {
					fieldLabel : "吊钩",
					name : "equipMaint.hook",
					readOnly : false
				}, {
					fieldLabel : "卷筒与滑轮",
					name : "equipMaint.drum",
					readOnly : false
				}, {
					fieldLabel : "配重",
					name : "equipMaint.counterweight",
					readOnly : false
				}, {
					fieldLabel : "驾驶室",
					name : "equipMaint.cab",
					readOnly : false
				}, {
					fieldLabel : "整机",
					name : "equipMaint.complete",
					readOnly : false
				}, {
					fieldLabel : "制动器",
					name : "equipMaint.brake",
					readOnly : false
				}/*, {hidden:true,
					fieldLabel : "企业档案",
					name : "equipMaint.corpId"
				}*/ ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.equipMaintDetailGrid,this.equipMaintComponGrid ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.maintSchemaStandardGrid ]
	}, fileAttachContainer ];
	EquipMaintForm.superclass.constructor.call(this, {
		title : "保养信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "equipMaint",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipMaint.do",
			items : items,
			fieldMapping : EquipMaintFieldMapping,
			hiddenField : EquipMaintHiddenField
		}
	});
};
Ext.extend(EquipMaintForm, Knight.ux.FormPanelWindow, {
	importPractitionerArchives : function(data, fields) {
		var s = "";
		for(var i=0;i<data.length;i++){
			 s+= data[i].data.practiName+" ";
		}
		this.setMultiFieldValue(fields, [s]);
	},
	importCarArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.licensePlate ]);
	},
	importEquipmentArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.equipId, data.recordId, data.equipSpecificName, data.exwDate,data.equipVender,data ]);
	},
	saveFormData : function() {
		for ( var i = 0; i < this.equipMaintDetailGrid.getStore().getCount(); i++) {
			var r = this.equipMaintDetailGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.substance) && Ext.isEmpty(r.component)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条保养内容未填写!");
				return;
			}
		}
		var sum = 0;
		for ( var i = 0; i < this.equipMaintComponGrid.getStore().getCount(); i++) {			
			var r = this.equipMaintComponGrid.getStore().getAt(i).data;
			sum+=r.summary;		
		}
		this.setFieldValue("summary",sum);
		this.setFieldValue("equipMaintDetails", $gridstore2json(this.equipMaintDetailGrid));
		this.setFieldValue("equipMaintCompons", $gridstore2json(this.equipMaintComponGrid));
		if(!Ext.isEmpty(curUserInfo.corpInfo)){
			this.setFieldValue("corpId",curUserInfo.corpInfo.corpId);
		}
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipMaint.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.maintId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipMaint.do?maintId=" + this.maintId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if(!Ext.isEmpty(data.equipment)){
					var fields = [ "equipment.equipId", "equipment.recordId", "equipment.equipSpecificName", "equipment.exwDate","equipment.equipVender" ];
					this.setMultiFieldValue(fields, [ data.equipment.equipId, data.equipment.recordId, data.equipment.equipSpecificName, data.equipment.exwDate,data.equipment.equipVender ]);
					}
					this.setFormSubModuleGrid(data.equipMaintDetailSet, this.equipMaintDetailGrid);
					this.setFormSubModuleGrid(data.equipMaintComponSet, this.equipMaintComponGrid);
					this.setFormSubModuleGrid(data.equipMaintSchema.maintSchemaStandardSet, this.maintSchemaStandardGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});