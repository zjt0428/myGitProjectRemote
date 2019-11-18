var EquipmentForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	this.mortgageable = (this.mortgage == "1");
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	if (!this.mortgageable) {
		this.mortgage == "0";
	}
	Ext.apply(this, {
		equipCategoryId : Ext.id(),
		qrcodePanelId : Ext.id()
	});
	var genericCombo = $initComboBoxField("设备名称", "equipment.equipGeneric", "equipGeneric", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable,
		listeners : {
			select: function(combo, record, index){
				var  equipSelect=this.findFormField('equipSpecific');
				var  newEquipSpecificData=[];
					newEquipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listEquipSpecificCode.do", {
						codeId : record.data.code					});
					equipSelect.getStore().loadData(newEquipSpecificData);
			}.createDelegate(this)
		}
	});
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=project", "所属部门", "equipment.department.depId",false,{
		readOnly : !this.saveable
	});
	var specificCombo = $initComboBoxField("规格型号", "equipment.equipSpecific", "equipSpecific", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable,
	});
	var sourceCombo = $initComboBoxField("设备来源", "equipment.equipSource", "equipSource", {
		defaultValueIndex : Ext.isEmpty(this.equipId) ? 0 : null,
		editable : true,
		readOnly : !this.saveable
	});
	var licenseNumberCombo = $initComboBoxField("制造许可证号", "equipment.licenseNumber", "licenseNumber", {
		forceSelection : false,
		editable : true,
		allowBlank : true,
		valueField : "name",
		readOnly : !this.saveable
	});
	var equipVenderCombo = $initComboBoxField("生产厂家", "equipment.equipVender", "equipVender", {
		editable : true,
		valueField : "name",
		readOnly : !this.saveable
	});
	
	var propertyFields = [ "propertyEnt", "propertyName", "dutyman", "dutymanTel" ];
	var supplierFields = [ "supplierId", "supplierName", "supplierAdd", "supplierTel" ];
	var practiFields = [ "practiId", "practiName", "mobile" ];
	var customerFields = [ "customerId", "customerLinkerId", "customerName", "linkman", "linkmanTel" ];
	var payeeFields = [ "payeeId", "payeeName", "payeeAdd", "payeeTel" ];
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.copyable ? "" : this.equipId,
		relateModule : RelationModule.equipment.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "hidden",
		id : this.equipCategoryId,
		name : "equipment.equipCategory"
	}, {
		xtype : "fieldset",
		title : "设备信息",
		anchor : "95%",
		collapsible : true,
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
//				defaults : {
//					allowBlank : false
//				},
				items : [ {
					maxLength : 24,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "设备编号",
					name : "equipment.recordSerial"
				},{
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "设备自编号",
					name : "equipment.equipSerial"
				}, genericCombo, specificCombo, {
					xtype : "treecombo",
					readOnly : !this.saveable,
					valId : this.equipCategoryId,
					allowBlank : false,
					width : 130,
					fieldLabel : "设备类别",
					url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
					name : "equipment.equipCategoryName",
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "产权单位",
					name : "equipment.propertyName",
					relateModule : RelationModule.corp.relateModule,
					fields : propertyFields,
					importhandler : this.importPropertyEntArchives.createDelegate(this)
				}, {
					allowBlank : true,
					maxLength : 32,
					fieldLabel : "备案编号",
					name : "equipment.recordId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "归属仓库",
					name : "equipment.storeName",
					fields : [ "storeId", "storeName" ],
					relateModule : RelationModule.storeHouse.relateModule,
					importhandler : this.importStoreHouseArchives.createDelegate(this)
				}, /*{
					allowBlank : true,
					maxLength : 32,
					fieldLabel : "监控设备编号",
					name : "equipment.monitorSerial"
				}*/]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ licenseNumberCombo, {
					id: "equipment_exwDate",
					xtype : "datefield",
					width : 130,
					allowBlank : false,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "出厂日期",
					name : "equipment.exwDate",
					listeners : {
						render : function(field) {  
		                    Ext.QuickTips.init();  
		                    Ext.QuickTips.register({  
		                        target : "equipment_exwDate",  
		                        text : '请先选择【规格型号】'  
		                    })  
		                },
						change : function(field, newValue, oldValue) {
							var scrapDate = newValue;
							if (Ext.isEmpty(this.getFieldValue("purchaseDate"))) {
								this.setFieldValue("purchaseDate", newValue)
							}
							var equipSpecific = this.getFieldValue("equipSpecific");
							if (!Ext.isEmpty(equipSpecific)) {
								$request({
									url : __ctxPath + "/system/loadCode.do",
									params : {
										codeId : "equipSpecific",
										code : equipSpecific
									},
									success : function(b, c) {
										var resp = Ext.util.JSON.decode(b.responseText);
										if (!Ext.isEmpty(resp.aliasValue)) {
											scrapDate = scrapDate.add(Date.YEAR, Number(resp.aliasValue));
											this.setFieldValue("scrapDate", scrapDate);
										}
									}.createDelegate(this)
								});
							}else{
								$toast("请先选择【规格型号】,再选【出厂日期】,以便计算【报废日期】");
							}
						}.createDelegate(this)
					}
				}, {
					xtype : "datefield",
					width : 130,
					editable : false,
					allowBlank : false,
					format : "Y-m-d",
					fieldLabel : "采购日期",
					name : "equipment.purchaseDate"
				}, {
					xtype : "datefield",
					width : 130,
					editable : false,
					allowBlank : false,
					format : "Y-m-d",
					fieldLabel : "报废日期",
					name : "equipment.scrapDate"
				}, {
					readOnly : true,
					maxLength : 32,
					fieldLabel : "单位责任人",
					name : "equipment.dutyman"
				},depSelector, {
					xtype : "hidden",
					name : "equipment.department.depId",
					id : "equipment.department.depId"
				},{
					readOnly : true,
					disabled : true,
					fieldLabel : "权限归属",
					name : "equipment.dataPermission"
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				defaults : {
					allowBlank : false
				},
				items : [ {
					maxLength : 24,
					fieldLabel : "出厂编号",
					name : "equipment.exwSerial"
				}, equipVenderCombo, {
					xtype : "numberfield",
					maxLength : 16,
					fieldLabel : "资产原值(元)",
					name : "equipment.assetValue",
					value : 0
				}, {
					xtype : "numberfield",
					maxValue : 100,
					fieldLabel : "折旧率(%)",
					name : "equipment.depreciateRate",
					value : 0
				}, {
					fieldLabel : "联系电话",
					name : "equipment.dutymanTel"
				},{
                    xtype : "relationCompositeField",
                    disabled : !this.saveable,
                    allowBlank : true,
                    readOnly : true,
                    fieldLabel : "项目地址",
                    name : "equipment.projectName",
                    fields : [ "projectId", "projectName","projectAddress" ],
                    relateModule : RelationModule.project.relateModule,
                    importhandler : this.importProjectArchives.createDelegate(this)
                }, {
                    allowBlank : true,
                    fieldLabel : "楼号",
                    name : "equipment.buildingNum"
                } ]
			}, {
				layout : "form",
				hidden : this.saveable,
				columnWidth : this.baseWidth,
				items : [ {
					id : this.qrcodePanelId,
					xtype : "panel",
					height : 220,
					width : 270,
					html : "<img src='" + __ctxPath + "/images/qrcode.jpg' height=205 width=230/>"
				} ]
			} ]
		} ]
	}, {
        xtype : "fieldset",
        title : "设备参数",
        anchor : "95%",
        collapsible : true,
        items : [{
            layout : "column",
            items : [{
                layout : "form",
                columnWidth : 0.33,
                defaultType : "textfield",
                items : [ {
                    xtype : "textfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "SS型驱动形式",
                    name : "equipment.ssDriveForm"
                }, {
                    xtype : "textfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "额定提升速度",
                    name : "equipment.ratedLiftSpeed"
                }, {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "额定乘员数",
                    name : "equipment.ratedCrewNum"
                } , {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "最大提升高度",
                    name : "equipment.maxLiftHeight"
                }, {
                    xtype : "textfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "传动形式",
                    name : "equipment.driveForm"
                }, {
                    xtype : "numberfield",
                    allowBlank : true,
                    fieldLabel : "导轨架架设高度",
                    name : "equipment.railFrameHeight"
                } ]
            },{
                layout : "form",
                columnWidth : 0.33,
                defaultType : "textfield",
                items : [ {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "最大独立高度(M)",
                    name : "equipment.independentHeight"
                }, {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "最高附着高度(M)",
                    name : "equipment.attachmentHeight"
                }, {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "附着后自由端高度(M)",
                    name : "equipment.freedomHeight"
                }, {
                    xtype : "textfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "电机功率",
                    name : "equipment.motorPower"
                }, {
                    xtype : "numberfield",
                    maxValue : 99999,
                    fieldLabel : "最大载重量(T)",
                    name : "equipment.loadingWeight"
                }, {
                    xtype : "numberfield",
                    maxValue : 99999,
                    fieldLabel : "最大工作幅度(M)",
                    name : "equipment.workingRange"
                } ]
            },{
                layout : "form",
                columnWidth : 0.33,
                defaultType : "textfield",
                items : [ {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "臂尖起重量(T)",
                    name : "equipment.armTipWeight"
                }, {
                    xtype : "numberfield",
                    allowBlank : true,
                    maxValue : 99999,
                    fieldLabel : "最大起重力矩(KN/m)",
                    name : "equipment.mostMoment"
                }, {
                    xtype : "textfield",
                    allowBlank : true,
                    fieldLabel : "变幅形式",
                    name : "equipment.amplitudeForm"
                }, {
                    xtype : "textfield",
                    allowBlank : true,
                    fieldLabel : "变幅速度(m/min)",
                    name : "equipment.amplitudeSpeed"
                }, {
                    xtype : "numberfield",
                    allowBlank : true,
                    fieldLabel : "导轨架顶端自由高度",
                    name : "equipment.railUpHeight"
                }, {
                    xtype : "numberfield",
                    maxValue : 99999,
                    fieldLabel : "臂长(M)",
                    name : "equipment.brachium"
                }]
            }]
        }]
    },{
		xtype : "fieldset",
		title : "其他信息",
		anchor : "95%",
		collapsible : true,
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "供应商",
					name : "equipment.supplierName",
					relateModule : RelationModule.supplier.relateModule,
					fields : supplierFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importSupplierArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "经办人员",
					name : "equipment.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					fields : practiFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "所属客户",
					name : "equipment.customerName",
					relateModule : RelationModule.customer.relateModule,
					fields : customerFields,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					readOnly : true,
					maxLength : 16,
					fieldLabel : "资产现值",
					name : "equipment.presentValue"
				}, {
					readOnly : true,
					maxLength : 32,
					fieldLabel : "登记人",
					name : "equipment.userName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "联系地址",
					name : "equipment.supplierAdd"
				}, {
					maxLength : 16,
					fieldLabel : "联系方式",
					name : "equipment.mobile"
				}, {
					maxLength : 32,
					fieldLabel : "联系人",
					name : "equipment.linkman"
				}, {
					maxLength : 32,
					fieldLabel : "RFID号",
					name : "equipment.rfidCode"
				}, {
					xtype : "numberfield",
					maxLength : 8,
					fieldLabel : "租赁单价",
					name : "equipment.rentalUnit"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 16,
					fieldLabel : "联系电话",
					name : "equipment.supplierTel"
				}, sourceCombo, {
					maxLength : 16,
					fieldLabel : "联系方式",
					name : "equipment.linkmanTel"
				}, {
					readOnly : true,
					maxLength : 8,
					fieldLabel : "累计折旧率(%)",
					name : "equipment.totalRate"
				}, {
					maxLength : 8,
					fieldLabel : "单价单位",
					name : "equipment.priceUnit"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 48,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "equipment.remark"
		}, fileAttachContainer ]
	} ];
	if (this.mortgageable) {
		items.push({
			xtype : "fieldset",
			title : "按揭信息",
			anchor : "95%",
			collapsible : true,
			items : [ {
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "relationCompositeField",
						disabled : !this.saveable,
						readOnly : true,
						fieldLabel : "收款方",
						name : "equipment.payeeName",
						relateModule : RelationModule.supplier.relateModule,
						fields : payeeFields,
						cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
						importhandler : this.importPayeeArchives.createDelegate(this)
					}, {
						xtype : "numberfield",
						maxLength : 16,
						allowBlank : false,
						fieldLabel : "总按揭额",
						name : "equipment.mortgageAmount",
						value : 0
					}, {
						xtype : "datefield",
						width : 130,
						editable : false,
						format : "Y-m-d",
						fieldLabel : "开始时间",
						name : "equipment.owingStartDate"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						maxLength : 128,
						fieldLabel : "联系地址",
						name : "equipment.payeeAdd"
					}, {
						xtype : "numberfield",
						readOnly : true,
						fieldLabel : "总贷款期数",
						name : "equipment.mortgagePeriods"
					}, {
						xtype : "datefield",
						width : 130,
						editable : false,
						format : "Y-m-d",
						fieldLabel : "结束时间",
						name : "equipment.owingEndDate"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						maxLength : 16,
						fieldLabel : "联系电话",
						name : "equipment.payeeTel"
					}, {
						xtype : "numberfield",
						maxLength : 16,
						fieldLabel : "月还款额",
						name : "equipment.monthlyPayment"
					} ]
				} ]
			} ]
		});
	}
	this.componSpecificCombo = $initComboBoxField("所属型号", "Q_componSpecific_S_EQ", "componSpecific", {
		editable : true,
		allowBlank : true
	});
	var tranDisBtnTopbarItems = null;
	if (this.saveable) {
		tranDisBtnTopbarItems = [this.componSpecificCombo,{
			iconCls : "btn-search",
			text : "加载配货单",
			handler : this.tranDisBtnSubmit.createDelegate(this)
		}];
	}
	this.equipmentComponGrid = new EquipmentComponGrid(null, {
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipmentComponGrid ]
	});
	if (this.mortgageable) {
		this.instalmentGrid = new InstalmentGrid({
			relateId : this.copyable ? "" : this.equipId,
			relateSerial : this.recordSerial,
			relateModule : RelationModule.equipment.relateModule,
			relateModuleName : RelationModule.equipment.relateModuleName
		}, {
			saveable : this.saveable
		});
		this.relateTabPanel.add(this.instalmentGrid);
	}
	if (!Ext.isEmpty(this.equipId) && !this.copyable) {
		this.equipmentDiaryGrid = new EquipmentDiaryGrid({
			equipId : this.equipId
		}, {
			grid_config : {
				bbar : {
					pageSize : 10
				}
			}
		});
		this.relateTabPanel.add(this.equipmentDiaryGrid);
	}
	this.equipmentAffiliatedGrid = new EquipmentAffiliatedGrid({
		saveable : this.saveable,
		tbarItems : tranDisBtnTopbarItems
	});
	this.relateTabPanel.add(this.equipmentAffiliatedGrid);

	items.push(this.relateTabPanel);
	EquipmentForm.superclass.constructor.call(this, {
		title : "设备基本信息",
		animateTarget : this.animateTarget,
		y : this.mortgageable ? 45 : 130,
		height : this.mortgageable ? 760 : 500,
		form_config : {
			labelWidth : 100,
			object : "equipment",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveEquipment.do",
			items : items,
			fieldMapping : EquipmentFieldMapping,
			hiddenField : EquipmentHiddenField
		}
	});
};
Ext.extend(EquipmentForm, Knight.ux.FormPanelWindow, {
    importProjectArchives : function(data, fields){
        this.setMultiFieldValue(fields, [ data.projectId, data.projectName, data.projectAddress]);
    },
	importPropertyEntArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.corpId, data.corpName, data.dutyman, data.dutymanTel1]);
	},
	importSupplierArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierId, data.supplierName, data.address, data.tel ]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.mobile ]);
	},
	importCustomerArchives : function(data, fields) {
		var linkerId = null, linker = null, tel = null;
		if (!Ext.isEmpty(data.customerLinker)) {
			linkerId = data.customerLinker.customerLinkerId;
			linker = data.customerLinker.linker;
			tel = data.customerLinker.linker;
		}
		this.setMultiFieldValueReadOnly(fields, [ data.customerId, linkerId, data.customerName, linker, tel ]);
	},
	tranDisBtnSubmit : function() {
		$request({
		url : __ctxPath + "/form/listsDispatchAllocateInit.do?pagesize=1000",
		waitMsg : "正在载入数据...",
		params : {
			"Q_componSpecific_S_EQ" : this.componSpecificCombo.getValue()
		}, 
		success : function(b,c) {
			var data = Ext.util.JSON.decode(b.responseText);
			for(var i = 0 ;i< data.result.length;i++){
				this.equipmentAffiliatedGrid.addSubModuleDate(data.result[i]);
			}
		}.createDelegate(this),
		failure : function(c, d) {
			Ext.Msg.alert("出错", "载入数据失败!");
		}
		})
	},
	importPayeeArchives : function(data, fields) {
		this.setMultiFieldValueReadOnly(fields, [ data.supplierId, data.supplierName, data.address, data.tel ]);
	},
	importStoreHouseArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeId, data.storeName ]);
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.equipId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadEquipment.do?equipId=" + this.equipId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if (!this.copyable) {
						this.setFormSubModuleGrid(data.instalmentSet, this.instalmentGrid);
						this.setFormSubModuleGrid(data.componentSet, this.equipmentComponGrid);
						this.setFormSubModuleGrid(data.equipmentAffiliatedSet, this.equipmentAffiliatedGrid);
						var qrcodePanel = Ext.getCmp(this.qrcodePanelId);
						if (qrcodePanel) {
							qrcodePanel.body.update("<img src='" + __ctxPath + "/image-widget?method=qrcode&contents={equipId:" + data.equipId + "}' height=205 width=230/>");
						}
						if (data.department) {
							this.getForm().findField("equipment.department.depId").setValue(data.department.depId);
							this.getForm().findField("depTreeSelector").setValue(data.department.depName);
						}
					} else {
						this.findFormField("equipId").setValue(null);
						this.findFormField("exwSerial").setValue(null);
						this.findFormField("recordId").setValue(null);
					}
					this.setFieldRawValue("equipGeneric", data.equipGenericName);
					this.setFieldRawValue("belongToArea", data.belongToAreaName);
					this.setFieldRawValue("equipSpecific", data.equipSpecificName);
					this.setFieldRawValue("equipSource", data.equipSourceName);
					this.setFieldValue("dataPermission",data.permissionFlag);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
//			this.findFormField("department.depId").setValue(curUserInfo.depId);
			this.findFormField("userId").setValue(curUserInfo.userId);
			this.findFormField("userName").setValue(curUserInfo.fullname);
			this.findFormField("mortgage").setValue(this.mortgage);
		}
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			if (this.mortgageable) {
				this.setFieldValue("mortgagePeriods", this.instalmentGrid.getStore().getCount());
				this.setFieldValue("instalments", $gridstore2json(this.instalmentGrid));
			}
			this.findFormField("components").setValue($gridstore2json(this.equipmentComponGrid));
			this.findFormField("equipmentAffiliateds").setValue($gridstore2json(this.equipmentAffiliatedGrid));
			$formsubmit(this.getForm(), function() {
				$toast("信息操作成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	},renderer : function(value, metadata, record, rowIndex, colIndex, store) {
		value = Ext.isEmpty(value) ? this.getEditor().value : value;
		var  equipSelect=grid.getColumnModel().getCellEditor(4,rowIndex);
		var store = this.getEditor().store;
		var index = store.find("code", value);
		var  newEquipSpecificData=[];
		if(!Ext.isEmpty(this.getEditor().value) && index != -1){
			newEquipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listEquipSpecificCode.do", {
				codeId : this.getEditor().value
			});
			if(grid.saveable) {
				equipSelect.field.getStore().loadData(newEquipSpecificData);
			}
		}
		if (index != -1) {
			value = store.getAt(index).data.name;
		}
		record.data.equipCategoryName = value;
		return value;
	}
});