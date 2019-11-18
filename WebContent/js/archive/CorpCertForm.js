var CorpCertForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	var certTypeCombo = $initComboBoxField("资质类型", "corpCert.certType", "aptitudekind", {
		allowBlank : false,
		editable : true
	});
	var tradeTypeCombo = $initComboBoxField("资质序列", "corpCert.tradeType", "tradetype", {
		allowBlank : true,
		hidden : true,
		editable : true
	});
	var tradeBoundCombo = $initComboBoxField("专业类别", "corpCert.tradeBound", "tradetypebound", {
		allowBlank : true,
		hidden : true,
		editable : true
	});
	var titleLevelCombo = $initComboBoxField("资质等级", "corpCert.titleLevel", "certLevel", {
		allowBlank : true,
		hidden : true,
		editable : true
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.certId,
		relateModule : RelationModule.corpCert.relateModule,
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
					hidden : true,
					fieldLabel : "组织机构代码",
					name : "corpCert.corpCode"
				}, titleLevelCombo, {
					hidden : true,
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "首次批准资质日期",
					name : "corpCert.noteDate"
				}, {
					hidden : true,
					maxLength : 100,
					fieldLabel : "首次批准资质文号",
					name : "corpCert.noteNumber"
				}, {
					hidden : true,
					xtype : "numberfield",
					fieldLabel : "证书副本数量",
					name : "corpCert.copyCertCount"
				}, tradeTypeCombo, tradeBoundCombo, {
					allowBlank : false,
					maxLength : 24,
					fieldLabel : "资质证书编号",
					name : "corpCert.certNum"
				}, {
					allowBlank : false,
					fieldLabel : "所属企业",
					name : "corpCert.corpName"
				}, certTypeCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					maxLength : 50,
					fieldLabel : "发证单位",
					name : "corpCert.organName"
				}, {
					allowBlank : false,
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "发证日期",
					name : "corpCert.organDate"
				}, {
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "有效截止日期",
					name : "corpCert.endDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "证书状态",
					name : "corpCert.isvalidName",
					value : "有效"
				}, {
					xtype : "radiogroup",
					fieldLabel : "企业默认证书",
					items : [ {
						boxLabel : "否",
						name : "corpCert.defaultCert",
						inputValue : 0,
						checked : true
					}, {
						boxLabel : "是",
						name : "corpCert.defaultCert",
						inputValue : 1
					} ]
				} ]
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
			name : "corpCert.mark"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			fieldLabel : "备注",
			name : "corpCert.remark"
		}, fileAttachContainer ]
	} ];
	CorpCertForm.superclass.constructor.call(this, {
		title : "企业资质基本信息",
		animateTarget : this.animateTarget,
		centerLayout : true,
		width : 800,
		height : 400,
		form_config : {
			labelWidth : 100,
			object : "corpCert",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveCorpCert.do",
			items : items,
			fieldMapping : CorpCertFieldMapping,
			hiddenField : CorpCertHiddenField
		}
	});
};
Ext.extend(CorpCertForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.certId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadCorpCert.do?certId=" + this.certId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("corpCert.certType").setRawValue(data.certTypeName);
					this.getForm().findField("corpCert.tradeType").setRawValue(data.tradeTypeName);
					this.getForm().findField("corpCert.tradeBound").setRawValue(data.tradeBoundName);
					this.getForm().findField("corpCert.titleLevel").setRawValue(data.titleLevelName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.getForm().findField("corpCert.corpName").setValue(this.corpName).disable();
			this.getForm().findField("corpCert.corpCode").setValue(this.corpCode).disable();
			this.getForm().findField("corpCert.corpId").setValue(this.corpId);
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
