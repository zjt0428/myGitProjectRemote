var PurchaseForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.purchaseSerial = null;
	
	var purchaseCheckboxGroup = new Ext.form.CheckboxGroup({  
		id:"purchaseCheckboxGroup",
	    xtype: 'checkboxgroup',  
	    name: 'model_type',  
	    width: 230,
	    columns: 2,
	    fieldLabel: '',  
	    items: [
	    	{boxLabel: '零配件', name: 'component'},
	        {boxLabel: '升降机主要部件', name: 'elevator'},
	        {boxLabel: '塔吊主要部件', name: 'tower'}
	    ]
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
					name : "purchase.userName"
				}, {
					readOnly : true,
					fieldLabel : "采购单号",
					name : "purchase.purchaseSerial",
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
					name : "purchase.providedDate",
					value : new Date()
				},{
					id : "purchaseTheme",
					fieldLabel : "采购主题",
					name : "purchase.purchaseTheme"
				},purchaseCheckboxGroup,{
					xtype : "button",
					bodyStyle : "padding-left:10px",
					text : "确定",
					fieldLabel : "主题按钮",
					handler : this.addTheme.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "purchase.department.depName"
				}, $initComboBoxField("采购类别", "purchase.category", "category", {
					editable : true,
					name : "purchase.category",
					allowBlank : true
				})]
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
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "供应商",
					name : "purchase.supplierName",
					relateModule : RelationModule.supplier.relateModule,
					importhandler : this.importSupplierArchives.createDelegate(this)
				}, {
					readOnly : false,
					fieldLabel : "联系人",
					name : "purchase.linker"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "采购人",
					name : "purchase.purchaserName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "关联设备",
					name : "purchase.recordSerial",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "关联业务",
					name : "purchase.relateModuleName",
					relations : [ {
						relation : RelationModule.contractLease,
						params : {
							Q_applyforState_S_GE : "3"
						}
					}, {
						relation : RelationModule.dispatch
					}, {
						relation : RelationModule.equipEmploy
					}, {
						relation : RelationModule.equipMaint
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "采购总金额",
					name : "purchase.purchaseAmount"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "预计到货时间",
					name : "purchase.arrivalDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "办公电话",
					name : "purchase.supplierTel"
				}, {
					readOnly : false,
					fieldLabel : "联系方式",
					name : "purchase.linkerTel"
				}, {
					fieldLabel : "采购人联系方式",
					name : "purchase.purchaserMobile"
				}, {
					fieldLabel : "设备名称",
					name : "purchase.equipGenericName"
				}, {
					fieldLabel : "业务编号",
					name : "purchase.relateSerial"
				}, {
					fieldLabel : "验收结束时间",
					name : "purchase.accDate"
				}, {
					fieldLabel : "采购状态",
					name : "purchase.applyforStateName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "采购时间",
					name : "purchase.purchaseDate",
					value : new Date()
				}, {
					fieldLabel : "采购单位",
					name : "purchase.purCorpName"
				}, {
					fieldLabel : "所属部门",
					name : "purchase.purchaserDepName"
				}, {
					fieldLabel : "设备类别",
					name : "purchase.equipCategoryName"
				}, {
					fieldLabel : "业务主题",
					name : "purchase.relateTheme"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "预计付款结清日期",
					name : "purchase.squareUpDate"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "申请人",
					name : "purchase.applicant",
					fields : [ "applicant" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importApplicantArchives.createDelegate(this)
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 48,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "说明",
			name : "purchase.instruction"
		} ]
	} ];
	this.purchaseBriefGrid = new PurchaseBriefGrid({
		purchaseId : this.purchaseId
	}, {
		saveable : this.saveable
	});
	this.instalmentGrid = new InstalmentGrid({
		relateId : this.purchaseId,
		relateSerial : this.purchaseSerial,
		relateModule : RelationModule.purchase.relateModule,
		relateModuleName : RelationModule.purchase.relateModuleName
	}, {
		title : "采购付款计划",
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.purchaseBriefGrid, this.instalmentGrid ]
	});
	if (!this.saveable) {
		this.purchaseAcceptanceGrid = new PurchaseAcceptanceGrid();
		this.receivementGrid = new ReceivementGrid(null, {
			title : "验收退款计划"
		});
		this.relateTabPanel.add(this.purchaseAcceptanceGrid);
		this.relateTabPanel.add(this.receivementGrid);
	}
	items.push(this.relateTabPanel);
	items.push( {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
			anchor : "95%",
			maxLength : 512,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "purchase.remark",
			value : "1.本设备及物品采购单经双方签字或盖章后生效，传真或复印件具有同等法律效应。\r\n2.因本借用产生的纠纷，任一方可向本单位工商注册地所属人民法院起诉。"
		} ] 
	} )
	PurchaseForm.superclass.constructor.call(this, {
		title : "采购信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "purchase",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.purchaseId,
				relateModule : RelationModule.purchase.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.purchaseId,
				relateModule : RelationModule.purchase.relateModule
			},
			url : __ctxPath + "/dispatch/savePurchase.do",
			items : items,
			fieldMapping : PurchaseFieldMapping,
			hiddenField : PurchaseHiddenField
		}
	});
};
Ext.extend(PurchaseForm, Knight.ux.FormPanelWindow, {
	importApplicantArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName ]);
	},
	importSupplierArchives : function(data) {
		this.setMultiFieldValue([ "supplierId", "supplierName", "supplierTel", "linker", "linkerTel" ], [ data.supplierId, data.supplierName, data.tel, data.supplierLinker.linker, data.supplierLinker.tel ]);
	},
	importPractiArchives : function(data) {
		var fields = [ "purchaserId", "purchaserName", "purchaserMobile", "purchaserDepId", "purchaserDepName", "purCorpId", "purCorpName" ];
		var values = [ data.practiId, data.practiName, data.mobile, data.department.depId, data.department.depName, data.corpInfo.corpId, data.corpInfo.corpName ];
		this.setMultiFieldValue(fields, values);
	},
	importEquipmentArchives : function(data) {
		var fields = [ "equipId", "recordSerial", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName" ];
		var values = [ data.equipId, data.recordSerial, data.equipCategory, data.equipCategoryName, data.equipGeneric, data.equipGenericName ];
		this.setMultiFieldValue(fields, values);
	},
	addTheme : function(record) {
		var ids = [];  
		var cbitems = Ext.getCmp("purchaseCheckboxGroup").items;    
		for (var i = 0; i < cbitems.length; i++) {    
		    if (cbitems.itemAt(i).checked) {    
		        ids.push(cbitems.itemAt(i).boxLabel);    
		    }    
		} 
		Ext.getCmp('purchaseTheme').setValue(ids)
	},
	saveFormData : function() {
		var amount = 0;
		for (var i = 0; i < this.purchaseBriefGrid.getStore().getCount(); i++) {
			var r = this.purchaseBriefGrid.getStore().getAt(i).data;
			amount += Number(r.summary);
		}
		this.setFieldValue("purchaseAmount", amount);
		this.setFieldValue("purchaseSerial",this.purchaseSerial);
		this.setFieldValue("instalments", $gridstore2json(this.instalmentGrid));
		this.setFieldValue("purchaseBriefs", $gridstore2json(this.purchaseBriefGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitPurchase.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.purchaseId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadPurchase.do?purchaseId=" + this.purchaseId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];

					this.setFormSubModuleGrid(data.purchaseBriefSet, this.purchaseBriefGrid);
					this.setFormSubModuleGrid(data.instalmentSet, this.instalmentGrid);
					this.setFormSubModuleGrid(data.purchaseAcceptanceSet, this.purchaseAcceptanceGrid);
					this.setFormSubModuleGrid(data.receivementSet, this.receivementGrid);
					this.purchaseSerial = data.purchaseSerial;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName" ];
		var values = [ relation.relateId, relation.relateSerial, relation.relateTheme, relation.relateModule, relation.relateModuleName ];
		this.setMultiFieldValue(fieldNames, values);
	}
});