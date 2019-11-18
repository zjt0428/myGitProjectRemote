var EquipmentInsuranceInfoForm = function(a, b) {
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
		equipId : this.equipId
	});
	this.equipInsureClaimRecordGrid = new EquipInsureClaimRecordGrid({
		equipId : this.equipId,
		saveable : true 
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.copyable ? "" : this.equipId,
		relateModule : RelationModule.equipment.relateModule,
		saveable : this.saveable
		
	})
	var items = [  {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "95%",
		collapsible : true,
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				// defaults : {
				// allowBlank : false
				// },
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
				}, {
					maxLength : 24,
					fieldLabel : "保险公司",
					name : "equipInsurance.insuranceCompany"
				}, {
					maxLength : 24,
					fieldLabel : "本期保费",
					name : "equipInsurance.premium"
				}, {
					maxLength : 24,
					fieldLabel : "设备价值",
					name : "equipInsurance.equipWorth"
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "归属仓库",
					name : "equipInsurance.storeName"
				}, {
					maxLength : 24,
					fieldLabel : "设备自编号",
					name : "equipInsurance.equipSerial"
				}, {
					maxLength : 24,
					fieldLabel : "理赔电话",
					name : "equipInsurance.claimPhone"
				}, {
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "起保日期",
					name : "equipInsurance.startInsureDate"
				}, {
					maxLength : 24,
					fieldLabel : "累计理赔",
					name : "equipInsurance.claimAmount"
				}, {
					maxLength : 24,
					fieldLabel : "联系人电话",
					name : "equipInsurance.linkmanPhone"
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "规格型号",
					name : "equipInsurance.equipSpecific"
				}, {
					maxLength : 24,
					fieldLabel : "当前项目",
					name : "equipInsurance.projectName"
				}, {
					maxLength : 24,
					fieldLabel : "保险单号",
					name : "equipInsurance.insureSerial"
				}, {
					maxLength : 24,
					fieldLabel : "保险联系人",
					name : "equipInsurance.linkman"
				}, {
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "停保日期",
					name : "equipInsurance.endInsureDate"
				}, {
					maxLength : 24,
					fieldLabel : "累计保费",
					name : "equipInsurance.totalPremium"
				}, {
					anchor : "95%",
					maxLength : 128,
					height : 48,
					maxLengthText : MoreThanMaxLength,
					xtype : "textarea",
					readOnly : !this.saveable,
					fieldLabel : "备注",
					name : "equipInsurance.remark"
				} ]
			} ]
		} ]
	},  {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipInsureRecordGrid,this.equipInsureClaimRecordGrid]
	}];
	EquipmentInsuranceInfoForm.superclass.constructor.call(this, {
		title : "保险管理信息",
		y : this.mortgageable ? 45 : 130,
		height : this.mortgageable ? 760 : 500,
		form_config : {
			labelWidth : 100,
			object : "equipInsurance",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipInsurance.do",
			items : items,
			fieldMapping : EquipInsuranceFieldMapping
		}
	});
};
Ext.extend(EquipmentInsuranceInfoForm, Knight.ux.FormPanelWindow, {
	calculateAmount : function(grid) {
		var acculmatedpremium = 0;
		for(var i = 0; i < grid.getStore().getCount(); i++) {
			acculmatedpremium += Number(grid.getStore().getAt(i).data.premium);
		}
		return acculmatedpremium;
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.insureId)) {
			var data = $ajaxSyncCall(__ctxPath + "/equip/loadRecordListEquipInsurance.do",{
				equipId : this.equipId,
				detailId : this.detailId
			});
			var fields = ["equipGeneric","exwSerial","address","insuranceCompany","premium","equipWorth","storeName","equipSerial","claimPhone","startInsureDate","equipSpecific","projectName",
			              "insureSerial","linkman","endInsureDate","totalPremium","linkmanPhone","claimAmount"];
			var value = [data.result.equipGeneric,data.result.exwSerial,data.result.address,data.result.insuranceCompany,data.result.premium,data.result.equipWorth,data.result.storeName,data.result.equipSerial,data.result.claimPhone,
				data.result.startInsureDate,data.result.equipSpecific,data.result.projectName,data.result.insureSerial,
				data.result.linkman,data.result.endInsureDate,data.result.totalPremium,data.result.linkmanPhone,data.result.claimAmount];
			this.setMultiFieldValue(fields,value);
		
		}
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			if (this.mortgageable) {
s			}
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