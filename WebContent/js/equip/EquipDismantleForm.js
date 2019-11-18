var EquipDismantleForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	this.practiDiaryGrid = new PractiDiaryGrid(null, {
		importParams : {
			Q_dispatchId_L_EQ : this.equipFlow.dispatchId
		},
		retrieveable : this.retrieveable,
		saveable : this.saveable
	});
	this.totalPractiDiaryGrid = new PractiDiaryGrid(null, {
		title : "已调配人员清单",
		grid_config : {
			bbar : true,
			loadurl : __ctxPath + "/equip/listPractiDiary.do",
			base_params : {
				"Q_flowId_L_EQ" : this.equipFlow.flowId
			}
		}
	});
	this.componDiaryGrid = new ComponDiaryGrid(null, {
		importParams : {
			Q_dispatchId_L_EQ : this.equipFlow.dispatchId
		},
		retrieveable : this.retrieveable,
		saveable : this.saveable
	});
	this.totalComponDiaryGrid = new ComponDiaryGrid(null, {
		title : "已调配配件清单",
		dismantleEnabled : isGranted("_EquipDismantleJacking"),
		grid_config : {
			bbar : true,
			loadurl : __ctxPath + "/equip/listComponDiary.do",
			base_params : {
				"Q_flowId_L_EQ" : this.equipFlow.flowId
			}
		}
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.dismantleId,
		relateModule : RelationModule.equipDismantle.relateModule,
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
					name : "equipDismantle.userName"
				}, {
					readOnly : true,
					fieldLabel : "拆卸单号",
					name : "equipDismantle.dismantleSerial"
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
					name : "equipDismantle.providedDate",
					value : new Date()
				}, {
					allowBlank : false,
					fieldLabel : "拆卸主题",
					name : "equipDismantle.dismantleTheme",
					tooltip : "默认为新增时的项目名称+的拆卸+年月日"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipDismantle.department.depName"
				}, {
					hidden : true,
					readOnly : true,
					fieldLabel : "区域",
					name : "equipDismantle.belongToAreaName"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "合同信息",
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
				items : [{
					maxLength : 64,
					fieldLabel : "合同编号",
					name : "equipDismantle.contractSerial",
				}, {
					fieldLabel : "项目编号",
					name : "equipDismantle.equipFlow.equipDiary.projectSerial"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [{
					fieldLabel : "项目名称",
					name : "equipDismantle.equipFlow.equipDiary.projectName"
				}, {
					allowBlank : true,
					xtype : "textfield",
					anchor : "95%",
					fieldLabel : "项目地址",
					name : "equipDismantle.equipFlow.equipDiary.address"
				} ]
			} ]
		}]
	},{
		xtype : "fieldset",
		title : "设备信息",
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
					fieldLabel : "设备型号",
					name : "equipDismantle.equipFlow.equipDiary.equipSpecificName"
				},{
					fieldLabel : "设备名称",
					name : "equipDismantle.equipFlow.equipDiary.equipGenericName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "备案编号",
					name : "equipDismantle.equipFlow.equipDiary.recordId"
				}, {
					maxLength : 64,
					fieldLabel : "设备自编号",
					name : "equipDismantle.equipFlow.equipDiary.equipSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "出厂日期",
					name : "equipDismantle.equipFlow.equipDiary.exwDate"
				}, {
					fieldLabel : "生产厂家",
					name : "equipDismantle.equipFlow.equipDiary.equipVender"
				}  ]
			}]
		} ]
	},{
		xtype : "fieldset",
		title : "拆卸信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "当前安装高度(米)",
					name : "equipDismantle.currentInstallHeight"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "拆卸开始时间",
					name : "equipDismantle.startdisDate",
					value : new Date()
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "拆卸结束时间",
					name : "equipDismantle.enddisDate",
					value : new Date()
				}  ]
			},
			{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "累计拆卸的标准节数",
					name : "equipDismantle.knotDisQty"
				}, {
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "累计拆卸的附墙数",
					name : "equipDismantle.wallAttacheDisQty"
				} ,{
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "累计拆卸的附墙杆数",
					name : "equipDismantle.wallAttachePoleQty"
				},{
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "累计拆卸的附墙框数",
					name : "equipDismantle.wallAttacheFrameQty"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					single : false,
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "拆卸人员",
					name : "equipDismantle.partake",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMutilPractiArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "拆卸班组长",
					name : "equipDismantle.principal",
					fields : [ "principalId", "principal", "principalTel" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}  ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly :true,
					fieldLabel : "楼号",
					name : "equipDismantle.buildingNum"
				}, {
					fieldLabel : "拆卸人数",
					name : "equipDismantle.personNum"
				} ]
			} ]
		} ]
	}  ];
	//**************************************************************
	//安装费用
	var installFeeTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do",{
		codeId : "installFeeType"
	});
	this.installFeeGrid = new InstallFeeGrid({
//		installId : this.installId,
		belongToArea : this.store.belongToAreaName,
		contractId : this.store.contractId,
		equipSpecificName : this.store.equipSpecificName,
		installFeeTypeData : installFeeTypeData
	},{
		saveable : this.saveable
	});
	
	var loadTopbarItems = null;
	if (this.saveable) {
		loadTopbarItems = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadAutocrane.createDelegate(this)
		}];
	}
	//汽吊费用
	var truckCraneSpecificData = $ajaxSyncCall(__ctxPath + "/system/listCode.do",{
		codeId : " truckCraneSpecific"
	});
	this.autocraneFeeGrid = new AutocraneFeeGrid({
//		installId : this.installId,
		truckCraneSpecificData : truckCraneSpecificData,
		belongToArea : this.store.belongToAreaName,
		belongToAreaName : this.store.belongToAreaName,
		contractId : this.store.contractId,
		equipSpecificName : this.store.equipSpecificName,
		equipSpecific : this.store.equipSpecific
	},{
		saveable : this.saveable
	});
	var loadTopbarItems1 = null;
	if (this.saveable) {
		loadTopbarItems1 = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadInstallFee.createDelegate(this)
		}];
	}
	//安拆班组
	this.installDismantelTeamGrid = new InstallDismantelTeamGrid({
//		installId : this.installId,
		relation:this.relation,
		tbarItems : loadTopbarItems1,
		equipSpecificName : this.store.equipSpecificName,
		installFeeTypeData : installFeeTypeData,
		equipSpecific : this.store.equipSpecific,
		belongToArea : this.store.belongToArea
	},{
		saveable : this.saveable
	});
	//汽吊单位
	var autocraneUnitData = $ajaxSyncCall(__ctxPath + "/system/listCode.do",{
		codeId : "autocraneDepend"
	});
	this.autocraneUnitGrid = new AutocraneUnitGrid({
//		installId : this.installId,
		truckCraneSpecificData : truckCraneSpecificData,
		autocraneUnitData : autocraneUnitData,
		equipSpecificName : this.store.equipSpecificName,
		equipSpecific : this.store.equipSpecific,
		belongToArea : this.store.belongToArea,
		belongToAreaName : this.store.belongToAreaName,
		tbarItems : loadTopbarItems
	},{
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.totalComponDiaryGrid,this.installFeeGrid,this.autocraneFeeGrid,this.installDismantelTeamGrid,this.autocraneUnitGrid]
	});
	items.push(this.relateTabPanel);
	items.push( {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
			anchor : "85%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "equipDismantle.remark"
		}, fileAttachContainer ] 
	} );
	
	EquipDismantleForm.superclass.constructor.call(this, {
		title : "拆卸信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "equipDismantle",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.dismantleId,
				relateModule : RelationModule.equipDismantle.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.dismantleId,
				relateModule : RelationModule.equipDismantle.relateModule
			},
			url : __ctxPath + "/equip/saveEquipDismantle.do",
			items : items,
			fieldMapping : EquipDismantleFieldMapping,
			hiddenField : EquipDismantleHiddenField
		}
	});
};
Ext.extend(EquipDismantleForm, Knight.ux.FormPanelWindow, {
	loadAutocrane : function(){
		this.autocraneUnitGrid.addSubModule($gridstore2json(this.autocraneFeeGrid));
	},
	loadInstallFee : function(){
		this.installDismantelTeamGrid.addSubModule($gridstore2json(this.installFeeGrid));
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName ]);
	},
	importMutilPractiArchives : function(datas) {
		var partakeField = this.findFormField("partake");
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if (Ext.isEmpty(partakeField.getValue())) {
				partakeField.setValue(data.practiName);
			} else {
				partakeField.setValue(partakeField.getValue() + "," + data.practiName);
			}
		}
	},
	saveFormData : function() {
		var pds = this.practiDiaryGrid.getStore().data.items;
		var cds = this.componDiaryGrid.getStore().data.items;
		var startinDate = this.getFieldValue("startdisDate").dateFormat("Y-m-d H:i:s");
		var endinDate = this.getFieldValue("enddisDate").dateFormat("Y-m-d H:i:s");
		for (var i = 0; i < pds.length; i++) {
			if (Ext.isEmpty(pds[i].get("startDate"))) {
				pds[i].set("startDate", startinDate);
			}
			if (Ext.isEmpty(pds[i].get("endDate"))) {
				pds[i].set("endDate", endinDate);
			}
		}
		for (var i = 0; i < cds.length; i++) {
			if (Ext.isEmpty(cds[i].get("startDate"))) {
				cds[i].set("startDate", startinDate);
			}
			if (Ext.isEmpty(cds[i].get("endDate"))) {
				cds[i].set("endDate", endinDate);
			}
		}
		this.setFieldValue("installFees", $gridstore2json(this.installFeeGrid));
		this.setFieldValue("autocraneFees", $gridstore2json(this.autocraneFeeGrid));
		this.setFieldValue("installDismantelTeams", $gridstore2json(this.installDismantelTeamGrid));
		this.setFieldValue("autocraneUnits", $gridstore2json(this.autocraneUnitGrid));
		
		this.setFieldValue("practiDiarys", $gridstore2json(this.practiDiaryGrid));
		this.setFieldValue("componDiarys", $gridstore2json(this.componDiaryGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipDismantle.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.dismantleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipDismantle.do?dismantleId=" + this.dismantleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					var fieldNames = [ "belongToAreaName", "contractSerial" ];
					var values = [ this.store.belongToArea, this.equipFlow.contractLease.contractNo];
					this.setMultiFieldValue(fieldNames, values);
					this.setFormSubModuleGrid(data.practiDiarySet, this.practiDiaryGrid);
					this.setFormSubModuleGrid(data.componDiarySet, this.componDiaryGrid);
					this.setFormSubModuleGrid(data.autocraneUnitSet, this.autocraneUnitGrid);
					this.setFormSubModuleGrid(data.installDismantelTeamSet, this.installDismantelTeamGrid);
					this.setFormSubModuleGrid(data.autocraneFeeSet, this.autocraneFeeGrid);
					this.setFormSubModuleGrid(data.installFeeSet, this.installFeeGrid);
					if (data.longitude && data.latitude) {
						this.mapPanel = new Knight.ux.BaiduMapPanel({
							title : "地理位置",
							longitude : data.longitude,
							latitude : data.latitude
						});
						this.relateTabPanel.add(this.mapPanel);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var equipFlow = this.equipFlow;
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "equipFlow.flowId" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, equipFlow.flowId ];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "recordSerial", "equipSpecificName", "projectSerial", "activateDate", "equipCategoryName", "recordId", "projectName", "equipGenericName", "exwSerial", "address", "exwDate","equipSerial","equipVender","buildingNum"];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(equipFlow.equipDiary, fieldNames));
			this.setFieldValue("dismantleTheme", equipFlow.equipDiary.projectName + "的拆卸" + new Date().format("Ymd"));
			var fieldNames = [ "belongToAreaName", "contractSerial","installId" ];
			var values = [ this.store.belongToAreaName, this.equipFlow.equipInstall.contractSerial,this.equipFlow.installId];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});