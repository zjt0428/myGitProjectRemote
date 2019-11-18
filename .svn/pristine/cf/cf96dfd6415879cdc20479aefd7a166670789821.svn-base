var PractiCreditForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;

	var items = [ {
		xtype : "fieldset",
		title : "从业信用信息",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "人员姓名",
					name : "practiCredit.practiName"
				}, {
					readOnly : true,
					fieldLabel : "从业工种",
					name : "practiCredit.practiKindworkName"
				}, {
					allowBlank : false,
					maxLength : 32,
					fieldLabel : "审核部门",
					name : "practiCredit.appraiseOrg"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "信用类型",
					width : 130,
					hiddenName : "practiCredit.creditType",
					xtype : "combo",
					mode : "local",
					editable : false,
					allowBlank : false,
					triggerAction : "all",
					store : [ [ "1", "荣誉" ], [ "0", "处罚" ] ]
				}, {
					xtype : "datefield",
					width : 130,
					editable : false,
					allowBlank : false,
					format : "Y-m-d",
					fieldLabel : "评定日期",
					name : "practiCredit.appraiseDate",
					value : new Date()
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
			height : 45,
			fieldLabel : "事由",
			name : "practiCredit.reason"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 2000,
			fieldLabel : "内容",
			name : "practiCredit.description"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 45,
			fieldLabel : "备注",
			name : "practiCredit.remark"
		} ]
	} ];
	PractiCreditForm.superclass.constructor.call(this, {
		title : "从业信用",
		animateTarget : this.animateTarget,
		width : 650,
		height : 400,
		form_config : {
			labelWidth : 75,
			object : "practiCredit",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractiCredit.do",
			items : items,
			fieldMapping : PractiCreditFieldMapping,
			hiddenField : PractiCreditHiddenField
		}
	});
};
Ext.extend(PractiCreditForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.creditId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractiCredit.do?creditId=" + this.creditId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("practiCredit.creditType").setRawValue(data.creditTypeName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "practiId", "practiName", "practiKindwork", "practiKindworkName" ];
			var values = [ this.practiId, this.practiName, this.kindWork, this.kindWorkName ];
			this.setMultiFieldValue(fieldNames, values);
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