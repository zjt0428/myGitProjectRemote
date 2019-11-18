var EquipmentInsuranceDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	this.mortgageable = (this.mortgage == "1");
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	if (!this.mortgageable) {
		this.mortgage == "0";
	}
	Ext.apply(this, {
	});
	var genericCombo = $initComboBoxField("设备名称", "equipment.equipGeneric", "equipGeneric", {
		editable : true,
		readOnly : !this.saveable
	});
	this.equipInsureRecordGrid = new EquipInsureRecordGrid({
		equipId : this.params.equipIds
	});
	this.equipInsureClaimRecordGrid = new EquipInsureClaimRecordGrid({
		equipId : this.params.equipIds
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.copyable ? "" : this.params.equipIds,
		relateModule : RelationModule.equipment.relateModule,
		saveable : this.saveable
		
	})
	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "95%",
		collapsible : true,
		defaults : {
			readOnly : true
		},
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "设备名称",
					name : "equipInsurance.equipGeneric"
				}, {
					maxLength : 24,
					fieldLabel : "出厂编号",
					name : "equipInsurance.exwSerial"
				}, {
					width : 130,
					maxLength : 24,
					fieldLabel : "存放地址",
					name : "equipInsurance.address"
				},  {
					maxLength : 24,
					fieldLabel : "当前设备价值",
					name : "equipInsurance.equipWorth"
				}]
			},{
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [{
					maxLength : 24,
					fieldLabel : "归属仓库",
					name : "equipInsurance.storeName"
				},{
					maxLength : 24,
					fieldLabel : "设备自编号",
					name : "equipInsurance.equipSerial"
				},{
					maxLength : 24,
					fieldLabel : "累计理赔",
					name : "equipInsurance.claimAmount"
				},{
					maxLength : 24,
					fieldLabel : "规格型号",
					name : "equipInsurance.equipSpecific"
				}]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				defaults : {
				},
				items : [{
					maxLength : 24,
					fieldLabel : "当前项目",
					name : "equipInsurance.projectName"
				},{
					maxLength : 24,
					fieldLabel : "累计保费",
					name : "equipInsurance.totalPremium"
				}]
			}]
		} ]
	},  {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipInsureRecordGrid,this.equipInsureClaimRecordGrid   ]
	}];
	EquipmentInsuranceDetailForm.superclass.constructor.call(this, {
		title : "保险管理",
		y : this.mortgageable ? 45 : 130,
		height : this.mortgageable ? 760 : 500,
		form_config : {
			labelWidth : 100,
			object : "equipInsurance",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipInsurance.do",
			items : items,
			fieldMapping : EquipInsuranceFieldMapping
		},
//		listeners : {
//			afterrender : this.loadFormData.createDelegate(this)
//		}
	});
};
Ext.extend(EquipmentInsuranceDetailForm, Knight.ux.FormPanelWindow, {
   /* importProjectArchives : function(data, fields){
        this.setMultiFieldValue(fields, [ data.projectId, data.projectName, data.projectAddress]);
    },
	importPropertyEntArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.corpId, data.corpName, data.dutyman, data.dutymanTel1 ]);
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

	importPayeeArchives : function(data, fields) {
		this.setMultiFieldValueReadOnly(fields, [ data.supplierId, data.supplierName, data.address, data.tel ]);
	},
	importStoreHouseArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeId, data.storeName ]);
	},*/
	loadFormData: function() {
//		this.getForm().load({
//			url : __ctxPath + "/equip/loadRecordListEquipInsurance.do?equipId=" + this.params.equipIds,
//			success : function(g, h) {
//				var data = Ext.util.JSON.decode(h.response.responseText).data[0];
//			}.createDelegate(this),
//		});
		var data = $ajaxSyncCall(__ctxPath + "/equip/loadRecordDetailListEquipInsurance.do?equipId=" + this.params.equipIds, null);
		if(data.result.length>0) {
			var result = data.result[0];
			var fields = ["equipGeneric","exwSerial","address","equipWorth","storeName","equipSerial","equipSpecific","projectName","premium","totalPremium","claimAmount"];
			var value = [result.equipGeneric,result.exwSerial,result.address,result.equipWorth,result.storeName,
				result.equipSerial,result.equipSpecific,result.projectName,result.premium,result.totalPremium,result.claimAmount];
			this.setMultiFieldValue(fields,value);
		}
		
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			if (this.mortgageable) {
		}
			/*this.findFormField("components").setValue($gridstore2json(this.equipmentComponGrid));
			this.findFormField("equipmentAffiliateds").setValue($gridstore2json(this.equipmentAffiliatedGrid));*/
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