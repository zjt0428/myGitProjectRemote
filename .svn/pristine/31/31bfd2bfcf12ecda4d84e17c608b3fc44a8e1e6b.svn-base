var PractiInsuranceClaimForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
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
						hidden : true,
						name : "practiInsuranceClaimRecord.claimId"
				}, {
					fieldLabel : "开户行",
					name : "practiInsuranceClaimRecord.bankDeposit",
				}, {
					fieldLabel : "账号",
					name : "practiInsuranceClaimRecord.depositAccount",
				}, {
					fieldLabel : "理赔电话",
					name : "practiInsuranceClaimRecord.claimPhone",
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : this.saveable,
					fieldLabel : "理赔时间",
					name : "practiInsuranceClaimRecord.claimDate",
				}, {
					fieldLabel : "损失额",
					name : "practiInsuranceClaimRecord.costAmount",
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
					name : "practiInsuranceClaimRecord.claimAmount",
					editor : new Ext.form.NumberField({
						allowBlank : false,
						maxLength : 32
					})
				}, {
					width : 150,
					fieldLabel : "理赔事由",
					name : "practiInsuranceClaimRecord.claimReason",
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "人员信息",
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
					hidden : true,
					name : "practiInsuranceClaimRecord.practiId"
				}, {
					fieldLabel : "姓名",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.practiName"
				}, {
					fieldLabel : "性别",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.sexName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "身份证号",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.idCard"
				}, {
					fieldLabel : "所属部门",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.depName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					hidden : true,
					name : "practiInsuranceClaimRecord.projectId"
				}, {
					fieldLabel : "所属项目",
					readOnly : true,
					name : "practiInsuranceClaimRecord.projectName"
				}, {
					fieldLabel : "所属企业",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.corpName"
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
				items : [ {
					hidden : true,
					name : "practiInsuranceClaimRecord.contractId"
				}, {
					hidden : true,
					name : "practiInsuranceClaimRecord.insureId"
				}, {
					fieldLabel : "保单号",
					readOnly : true,
					name : "practiInsuranceClaimRecord.insureSerial"
				}, {
					fieldLabel : "保险公司",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.insuranceCompany"
				}, {
					fieldLabel : "联系人电话",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.linkmanPhone"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "出险险种",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.insuranceTypeName"
				},{
					fieldLabel : "起保日期",
					readOnly : true,
					dataIndex : "practiInsuranceClaimRecord.startInsureDate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "保险联系人",
					readOnly : true,
					name : "practiInsuranceClaimRecord.linkMan"
				},{
					maxLength : 24,
					fieldLabel : "停保日期",
					readOnly : true,
					name : "practiInsuranceClaimRecord.endInsureDate"
				} ]
			} ]
		} ]
	} ];
	PractiInsuranceClaimForm.superclass.constructor.call(this, {
		title : "保险理赔信息",
		y : this.mortgageable ? 45 : 130,
		height : this.mortgageable ? 760 : 500,
		form_config : {
			labelWidth : 100,
			object : "practiInsuranceClaimRecord",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveClaimPractiInsurance.do",
			items : items,
			fieldMapping : PractiInsuranceClaimRecordFieldMapping,
		}
	});
};
Ext.extend(PractiInsuranceClaimForm,Knight.ux.FormPanelWindow,{
loadFormData : function() {
	if (!Ext.isEmpty(this.insureId)&&this.approveable) {
		var data = $ajaxSyncCall(__ctxPath + "/archive/addClaimDetailPractiInsurance.do?detailId="+ this.detailId);
		var result = data.result[0];
		var fields = ["insureId","insureSerial","practiId",
                      "practiName","sexName","idCard","depName","projectId","projectName","corpName","insuranceCompany","insuranceTypeName","startInsureDate","linkMan","endInsureDate","contractId","linkmanPhone"];
		var value = [result.insureId,result.insureSerial,result.practiId,result.practiName,result.sexName,result.idCard,result.depName,result.projectId,result.projectName,
		             result.corpName,result.insuranceCompany,result.insuranceTypeName,result.startInsureDate,result.linkMan,result.endInsureDate,result.contractId,result.linkmanPhone];
		this.setMultiFieldValue(fields,value);
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