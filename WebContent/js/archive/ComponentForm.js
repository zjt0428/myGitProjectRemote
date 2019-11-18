var ComponentForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;

	this.qrcodePanelId = Ext.id();
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	this.existsable = !Ext.isEmpty(this.componId) && !this.copyable;
	Ext.apply(this, {
		componCategoryId : Ext.id()
	});

	var genericCombo = $initComboBoxField("零配件名称", "component.componGeneric", "componGeneric", {
		editable : true
	});
	var specificCombo = $initComboBoxField("设备型号", "component.componSpecific", "componSpecific", {
		allowBlank : true,
		editable : true 
	});
	var venderCombo = $initComboBoxField("生产厂家", "component.equipVender", "equipVender", {
		allowBlank : true,
		editable : true 
	});
	var supplierFields = [ "supplierId", "supplierName", "supplierAdd", "supplierTel" ];
	var practiFields = [ "practiId", "practiName", "mobile" ];
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.componId,
		relateModule : RelationModule.component.relateModule,
		saveable : this.saveable
	});
	
	var fieldAllSelect = new Ext.form.CheckboxGroup({
		xtype : "checkboxgroup",
		disabled : this.existsable,
		fieldLabel : "是否整机配件",
		items : [{
			id : "isMachine",
			boxLabel : "是",
			checked : true,
			name : "component.isMachine",
			inputValue : "1",
			listeners : {
				 'check' : function() {
					 fieldAllSelect.singlecheck(fieldAllSelect,0);
				 }
			 }
		}, {
			id : "noMachine",
			boxLabel : "否",
			name : "component.noMachine",
			inputValue : "1",
			listeners : {
				 'check' : function() {
					 fieldAllSelect.singlecheck(fieldAllSelect,1);
				 }
			 }
		}],
		singlecheck : function (ChkGrp, index) {
	         if (ChkGrp.items.itemAt(index).checked) {
	             for (var i = 0; i <ChkGrp.items.length; i++) {
	                  if (i != index) {
	                     if(ChkGrp.items.itemAt(i).checked) {
	                          var id =ChkGrp.items.itemAt(i).id;
	                          ChkGrp.setValue(id, false);
	                     	}
	                  	}
	             	}
	         	}
			}
		});
	
	var items = [ {
		xtype : "hidden",
		id : this.componCategoryId,
		name : "component.componCategory"
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "产品编号",
					name : "component.componSerial"
				},venderCombo,
				{
					xtype : "treecombo",
					valId : this.componCategoryId,
					allowBlank : false,
					width : 130,
					fieldLabel : "零配件类别",
					url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
					name : "component.componCategoryName"
				},  {
					xtype : "datefield",
					width : 130,
					allowBlank : true,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "报废日期",
					name : "component.scrapDate"
				},{
					xtype : "datefield",
					width : 130,
//					readOnly : this.existsable,
					editable : false,
					allowBlank : true,
					format : "Y-m-d",
					fieldLabel : "采购日期",
					name : "component.purchaseDate"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "所属设备",
					readOnly : true,
					name : "component.exwSerial",
					fields : [ "equipId", "recordId", "exwSerial", "propertyName", "equipSerial" ],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "资产总计",
					name : "component.assetValue"
				}, {
					fieldLabel : "防坠器编号",
					name : "component.leftcageSerial"
				}, {
					fieldLabel : "产权单位",
					name : "component.propertyName"
				}, {
					hidden : true,
					fieldLabel : "右笼编号",
					name : "component.rightcageSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ genericCombo,{
				fieldLabel : "配件规格",
				name : "component.dimensions"
				}, {
					xtype : "numberfield",
					fieldLabel : "臂长(米)",
					maxValue : 99.99,
					name : "component.brachium"
				},
				{
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "折旧率(%)",
					name : "component.depreciateRate",
					value : 0
				}, {
					xtype : "datefield",
					width : 130,
					allowBlank : true,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "防坠器检测日期",
					name : "component.leftcageCheckDate",
					value : new Date()
				}, {
					xtype : "datefield",
					hidden : true,
					width : 130,
					allowBlank : true,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "右笼检测日期",
					name : "component.rightcageCheckDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,	
				defaultType : "textfield",
				items : [ specificCombo, {
					allowBlank : false,
					maxLength : 8,
					fieldLabel : "计量单位",
					name : "component.calculate"
				}, {
					xtype : "numberfield",
					fieldLabel : "标准节高度(米)",
					maxValue : 99.99,
					name : "component.knotMetric"
				},  {
					fieldLabel : "配件型号",
					name : "component.dimensions"
				}, {
					fieldLabel : "配件代码",
					name : "component.componCode"
				}, {
					xtype : "numberfield",
					fieldLabel : "单价",
					name : "component.unitprice",
					decimalPrecision : 5,
					value : 0
				}, fieldAllSelect ]
			}, {
				layout : "form",
				hidden : this.saveable,
				columnWidth : 0.16,
				items : [ {
					id : this.qrcodePanelId,
					xtype : "panel",
					height : 125,
					width : 130,
					html : "<img src='" + __ctxPath + "/images/qrcode.jpg' height=125 width=130/>"
				} ]
			} ]
		}, {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 130,
					hidden : true,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "防坠器检测日期",
					name : "component.parachuteCheckDate",
					value : new Date()
				}, {
					xtype : "checkboxgroup",
					disabled : this.existsable,
					fieldLabel : "配件属性",
					items : [ {
						boxLabel : "总数管理或易耗品",
						name : "component.consumeFlag",
						inputValue : "1",
						checked : true,
						listeners : {
							"check" : this.consumeFlagChecked.createDelegate(this)
						}
					}, {
						boxLabel : "防坠器",
						name : "component.parachuteFlag",
						inputValue : "1",
						listeners : {
							"check" : this.parachuteFlagChecked.createDelegate(this)
						}
					}, {
						boxLabel : "附墙",
						name : "component.wallAttacheFlag",
						inputValue : "1"
					}, {
						boxLabel : "标准节",
						name : "component.knotFlag",
						inputValue : "1"
					}, {
						boxLabel : "螺栓",
						name : "component.boltFlag",
						inputValue : "1"
					} ]
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth * 2,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					allowBlank : true,
					hidden : this.saveable,
					fieldLabel : "配件总量",
					name : "component.totalCounts"
				},{
				readOnly:true,
				fieldLabel : "库存数量",
				name : "component.storeCounts",
				value : 0
				}, {
					readOnly : true,
					hidden : true,
					fieldLabel : "操作人员",
					name : "component.userName"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "其他信息",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "供应商",
					readOnly : true,
					allowBlank : true,
					name : "component.supplierName",
					relateModule : RelationModule.supplier.relateModule,
					fields : supplierFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importSupplierArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "经办人员",
					readOnly : true,
					allowBlank : true,
					name : "component.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					fields : practiFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "录入批次号",
					name : "component.batchNumber"
				}, {
					readOnly : true,
					fieldLabel : "状态",
					name : "component.statusName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "联系地址",
					name : "component.supplierAdd"
				}, {
					readOnly : true,
					fieldLabel : "经办人员电话",
					name : "component.mobile"
				}, {
					readOnly : true,
					fieldLabel : "累计折旧率(%)",
					name : "component.totalRate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "联系电话",
					name : "component.supplierTel"
				}, {
					readOnly : true,
					fieldLabel : "资产现值",
					name : "component.presentValue"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];
	ComponentForm.superclass.constructor.call(this, {
		title : "零配件信息",
		animateTarget : this.animateTarget,
		height : 500,
		form_config : {
			labelWidth : 90,
			object : "component",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveComponent.do",
			items : items,
			fieldMapping : ComponentFieldMapping,
			hiddenField : ComponentHiddenField
		}
	});
};
Ext.extend(ComponentForm, Knight.ux.FormPanelWindow, {
	consumeFlagChecked : function(checkbox, checked) {
		this.findFormField("scrapDate").allowBlank = checked;
	},
	parachuteFlagChecked : function(checkbox, checked) {
		this.findFormField("parachuteCheckDate").allowBlank = !checked;
	},
//	importStoreHouseArchives : function(data, fields) {
//		var s = "";
//		var s1 = "";
//		for(var i=0;i<data.length;i++){
//			if(i+1==data.length){
//				s+= data[i].data.storeName;
//				s1+= data[i].data.storeId;
//			}else{
//				s+= data[i].data.storeName+",";
//				s1+= data[i].data.storeId+",";
//			}
//			
//			//s+= data[i].data.fullname+"  ";
//		}
//		this.setMultiFieldValue(fields, [s1,s]);
//	},
	importSupplierArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierId, data.supplierName, data.address, data.tel ]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.mobile ]);
	},
	importEquipmentArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.equipId, data.recordId, data.exwSerial, data.propertyName, data.equipSerial ]);
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.componId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadComponent.do?componId=" + this.componId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("totalCounts", data.storeCounts+data.inuseCounts+data.unuseCounts);
					this.setFieldRawValue("componGeneric", data.componGenericName);
					this.setFieldRawValue("componSpecific", data.componSpecificName);
					this.setFieldRawValue("equipVender", data.equipVenderName);
					if (!this.copyable) {
						this.findFormField("userName").show();
						var qrcodePanel = Ext.getCmp(this.qrcodePanelId);
						if (qrcodePanel) {
							qrcodePanel.body.update("<img src='" + __ctxPath + "/image-widget?method=qrcode&contents={componId:" + data.componId + "}' height=125 width=130/>");
						}
					} else {
						delete this.componId;
						this.findFormField("componId").setValue(null);
						this.findFormField("componSerial").setValue(null);
						this.findFormField("department.depId").setValue(curUserInfo.depId);
						this.findFormField("userId").setValue(curUserInfo.userId);
						this.findFormField("userName").setValue(curUserInfo.fullname);
						this.findFormField("number").show();
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.findFormField("department.depId").setValue(curUserInfo.depId);
			this.findFormField("userId").setValue(curUserInfo.userId);
			this.findFormField("userName").setValue(curUserInfo.fullname);
		
		}
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function() {
				$toast("信息操作成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	}
});