var EquipmentInsuranceClaimForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.approveable = this.approveable;
	this.mortgageable = (this.mortgage == "1");
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	if (!this.mortgageable) {
		this.mortgage == "0";
	}
	Ext.apply(this, {});
	var items = [ {
		xtype : "fieldset",
		title : "理赔信息",
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
					fieldLabel : "理赔ID",
					readOnly : true,
					hidden : true,
					name : "equipInsuranceClaimRecord.claimId"
				},{
					fieldLabel : "开户行",
					name : "equipInsuranceClaimRecord.bankDeposit",
				}, {
					fieldLabel : "账号",
					name : "equipInsuranceClaimRecord.depositAccount",
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id : "claimDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : this.saveable,
					fieldLabel : "理赔时间",
					name : "equipInsuranceClaimRecord.claimDate",
					value : new Date()
				}, {
					fieldLabel : "损失数",
					name : "equipInsuranceClaimRecord.costAmount",
					editor : new Ext.form.NumberField({
						allowBlank : false,
						maxLength : 32
					})
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "赔偿额",
					name : "equipInsuranceClaimRecord.claimAmount",
					editor : new Ext.form.NumberField({
						allowBlank : false,
						maxLength : 32
					})
				}, {
					width : 150,
					fieldLabel : "理赔事由",
					name : "equipInsuranceClaimRecord.claimReason",
				} ]
			} ]
		} ]
	}, {
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
				items : [ {
					fieldLabel : "设备ID",
					readOnly : true,
					hidden : true,
					name : "equipInsuranceClaimRecord.equipId"
				}, {
					fieldLabel : "设备名称",
					readOnly : true,
					name : "equipInsuranceClaimRecord.equipGeneric"
				}, {
					fieldLabel : "项目名称",
					readOnly : true,
					name : "equipInsuranceClaimRecord.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "规格型号",
					readOnly : true,
					name : "equipInsuranceClaimRecord.equipSpecific"
				}, {
					fieldLabel : "出厂编号",
					readOnly : true,
					name : "equipInsuranceClaimRecord.exwSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "设备自编号",
					readOnly : true,
					name : "equipInsuranceClaimRecord.equipSerial"
				}, {
					fieldLabel : "归属仓库",
					readOnly : true,
					name : "equipInsuranceClaimRecord.storeName"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "保险信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ 
					{
						fieldLabel : "保险ID",
						readOnly : true,
						hidden : true,
						name : "equipInsuranceClaimRecord.insureId"
					},{
					fieldLabel : "保单号",
					readOnly : true,
					name : "equipInsuranceClaimRecord.insureSerial"
				}, {
					fieldLabel : "保险公司",
					readOnly : true,
					name : "equipInsuranceClaimRecord.insuranceCompany"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "出险险种",
					readOnly : true,
					name : "equipInsuranceClaimRecord.insuranceCategory"
				},{
					fieldLabel : "理赔电话",
					readOnly : true,
					name : "equipInsuranceClaimRecord.claimPhone"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "保险联系人",
					readOnly : true,
					name : "equipInsuranceClaimRecord.linkMan"
				},{
					maxLength : 24,
					fieldLabel : "联系人电话",
					readOnly : true,
					name : "equipInsuranceClaimRecord.linkmanPhone"
				} ]
			} ]
		} ]
	} ];
	EquipmentInsuranceClaimForm.superclass.constructor.call(this, {
		title : "保险理赔信息",
		y : this.mortgageable ? 45 : 130,
		height : this.mortgageable ? 760 : 500,
		form_config : {
			labelWidth : 100,
			object : "equipInsuranceClaimRecord",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipInsuranceClaim.do",
			items : items,
			fieldMapping : EquipInsuranceClaimRecordFieldMapping
		}
	});
};
Ext.extend(EquipmentInsuranceClaimForm,Knight.ux.FormPanelWindow,{
loadFormData : function() {
	if (!Ext.isEmpty(this.insureId)&&this.approveable) {
		var data = $ajaxSyncCall(__ctxPath
				+ "/equip/findInsureListBeforeAddClaimEquipInsurance.do?detailId="
				+ this.detailId);
		var fields = [ "insureId", "equipId",
				"insureSerial", "insuranceCompany",
				"insuranceCategory", "equipGeneric",
				"equipSpecific", "exwSerial",
				"equipSerial", "storeName", "projectName",
				"linkMan","claimPhone","linkmanPhone" ];
		var value = [ data.result[0].insureId,
				data.result[0].equipId,
				data.result[0].insureSerial,
				data.result[0].insuranceCompany,
				data.result[0].insuranceCategory,
				data.result[0].equipGeneric,
				data.result[0].equipSpecific,
				data.result[0].exwSerial,
				data.result[0].equipSerial,
				data.result[0].storeName,
				data.result[0].projectName,
				data.result[0].linkMan,
				data.result[0].claimPhone,
				data.result[0].linkmanPhone];
		this.setMultiFieldValue(fields, value);

	}else{
		var fields = [ "insureId", "equipId",
			"insureSerial", "insuranceCompany",
			"insuranceCategory", "equipGeneric",
			"equipSpecific", "exwSerial",
			"equipSerial", "storeName", "projectName",
			"linkMan","costAmount","claimAmount","claimReason","bankDeposit" ,"depositAccount","claimPhone","claimId","linkmanPhone"];
		var value = [ this.insureId,
			this.equipId,
			this.insureSerial,
			this.insuranceCompany,
			this.insuranceCategory,
			this.equipGeneric,
			this.equipSpecific,
			this.exwSerial,
			this.equipSerial,
			this.storeName,
			this.projectName,
			this.linkMan,
			this.costAmount,
			this.claimAmount,
			this.claimReason,
			this.bankDeposit,
			this.depositAccount,
			this.claimPhone,
			this.claimId,
			this.linkmanPhone
			];
		this.setMultiFieldValue(fields, value);
	}
},
saveFormData : function() {
	if (this.getForm().isValid()) {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("成功保存信息！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	}
});