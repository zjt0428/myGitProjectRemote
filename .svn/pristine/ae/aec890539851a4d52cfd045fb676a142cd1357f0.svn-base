var PractiCertForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	var specialtyTypeCombo = $initComboBoxField("注册类型及等级", "practiCert.specialtyType", "specialtyType", {
		editable : true
	});
	var kindWorkCombo = $initComboBoxField("从业工种", "practiCert.practiKindwork", "kindWork", {
		editable : true
	});
	var awardDepartCombo = $initComboBoxField("发放单位", "practiCert.awardDepart", "certificateIssue", {
		editable : true,
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.certId,
		relateModule : RelationModule.practiCert.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "资质信息",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "资质证书编号",
					name : "practiCert.certNum"
				}, {
					allowBlank : false,
					fieldLabel : "所属人员",
					name : "practiCert.practitioner.practiName"
				}, specialtyTypeCombo, {
					xtype : "datefield",
					width : 130,
					format : "Y-m-d",
					editable : false,
					fieldLabel : "合同截止日",
					name : "practiCert.contractDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ awardDepartCombo, {
					readOnly:true,
					fieldLabel : "身份证号",
					name : "practiCert.practitioner.idCard"
				}, {
					xtype : "datefield",
					width : 130,
					format : "Y-m-d",
					allowBlank : false,
					editable : false,
					fieldLabel : "发证日期",
					name : "practiCert.awardDate"
				}, {
					xtype : "datefield",
					width : 130,
					format : "Y-m-d",
					allowBlank : false,
					editable : false,
					fieldLabel : "有效截止日期",
					name : "practiCert.effectDate"
				}, {
					allowBlank : true,
					fieldLabel : "注册单位",
					name : "practiCert.registrantOrganization"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ kindWorkCombo, {
					maxLength : 50,
					fieldLabel : "执业印章号",
					name : "practiCert.stampNum"
				}, {
					readOnly : true,
					fieldLabel : "证书状态",
					name : "practiCert.qstateName",
					value : "有效"
				},  {
					readOnly : true,
					fieldLabel : "联系方式",
					name : "practiCert.practitioner.mobile",
				}]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "其他信息",
		anchor : "95%",
		items : [ {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			fieldLabel : "资质内容",
			name : "practiCert.mark"
		},fileAttachContainer, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			fieldLabel : "备注",
			name : "practiCert.remark"
		} ]
	} ];
	PractiCertForm.superclass.constructor.call(this, {
		title : "人员资质基本信息",
		animateTarget : this.animateTarget,
		centerLayout : true,
		width : 830,
		height : 400,
		form_config : {
			object : "practiCert",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractiCert.do",
			items : items,
			fieldMapping : PractiCertFieldMapping,
			hiddenField : PractiCertHiddenField
		}
	});
};
Ext.extend(PractiCertForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.certId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractiCert.do?certId=" + this.certId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("practiCert.practitioner.practiName").disable();
					this.getForm().findField("practiCert.practitioner.mobile").disable();
					this.getForm().findField("practiCert.specialtyType").setRawValue(data.specialtyTypeName);
					this.getForm().findField("practiCert.practiKindwork").setRawValue(data.practiKindworkName);
					this.getForm().findField("practiCert.awardDepart").setRawValue(data.awardDepartName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.getForm().findField("practiCert.practitioner.practiId").setValue(this.practiId);
			this.getForm().findField("practiCert.practitioner.idCard").setValue(this.idCard);
			this.getForm().findField("practiCert.practitioner.practiName").setValue(this.practiName).disable();
			this.getForm().findField("practiCert.practitioner.mobile").setValue(this.mobile).disable();
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
