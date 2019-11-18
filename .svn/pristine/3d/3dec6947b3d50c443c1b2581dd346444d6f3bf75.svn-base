var LeasePaymentForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	
	this.settlementInfoGrid = new SettlementInfoGrid({
		saveable : this.saveable
	})
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.paymentId,
		relateModule : RelationModule.leasePayment.relateModule,
		saveable : this.saveable
	});
	
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					emptyText : "系统自动生成",
					fieldLabel : "付款编号",
					name : "leasePayment.paymentSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "付款主题",
					name : "leasePayment.paymentTheme"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "合同编号",
					name : "leasePayment.leaseContract.leaseIdentifier"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "合同主题",
					name : "leasePayment.leaseContract.leaseTheme"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "leasePayment.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "leasePayment.fillDate",
					value : new Date()
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					fieldLabel : "付款日期",
					name : "leasePayment.paymentDate"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "合同金额",
					name : "leasePayment.leaseMoney"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "出租单位",
					name : "leasePayment.lessor"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "承租单位",
					name : "leasePayment.tenantry"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "请款用途",
					name : "leasePayment.purpose"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "应付金额",
					name : "leasePayment.amountPayable"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					//allowBlank : false,
					fieldLabel : "记账类型",
					name : "leasePayment.accountingType"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "付款金额",
					name : "leasePayment.paymentAmount"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "已付金额",
					name : "leasePayment.alreadyPaymentAmount"
				}, {
					disabled : !this.saveable,
					xtype : "checkboxgroup",
					fieldLabel : "附带发票",
					items : [{
						id : "isInvoice",
						name : "leasePayment.isInvoice",
						checked : true
					}]	
				}]
			}]
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [fileAttachContainer]
	}, {
		xtype : "panel",
		anchor : "98%",
		layout : "fit",
		items : [this.settlementInfoGrid]
	}]
	
	LeasePaymentForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		form_config : {
			object : "leasePayment",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveLeasePayment.do",
			items : items,
			fieldMapping : LeasePaymentFieldMapping,
			hiddenField : LeasePaymentHiddenField
		}
	});
}

Ext.extend(LeasePaymentForm, Knight.ux.FormPanelWindow, {
	
	saveFormData : function() {
		this.setFieldValue("settlementInfos", $gridstore2json(this.settlementInfoGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitLeasePayment.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.paymentId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLeasePayment.do?paymentId=" + this.paymentId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.settlementListSet, this.settlementListGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = ["lessor", "tenantry"];
			var values = [];
			this.setMultiFieldValue(fieldName, values);
		}
	}
})