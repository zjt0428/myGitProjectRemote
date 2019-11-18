var PurchaseAcceptanceForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	this.purchaseBriefGrid = new PurchaseBriefGrid(null, {
		selectable : true,
		grid_config : {
			loadurl : __ctxPath + "/dispatch/listBriefPurchase.do",
			base_params : {
				Q_purchaseId_L_EQ : this.purchaseId
			}
		}
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
					readOnly : true,
					fieldLabel : "填报人",
					name : "purchaseAcceptance.userName"
				}, {
					readOnly : true,
					fieldLabel : "采购单号",
					value : this.purchaseSerial
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
					name : "purchaseAcceptance.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "采购主题",
					value : this.purchaseTheme
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "purchaseAcceptance.department.depName"
				}, {
					readOnly : true,
					fieldLabel : "采购类别",
					value : this.category
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "验收信息",
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
					readOnly : true,
					fieldLabel : "验收结果",
					name : "purchaseAcceptance.acceptanceStatusName",
					value : this.acceptanceStatusName
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					readOnly : true,
					hidden : true,
					fieldLabel : "处理方式",
					name : "purchaseAcceptance.handleMethodName",
					value : this.handleMethodName
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
					hidden : true,
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "预计到货时间",
					name : "purchaseAcceptance.arrivalPlanDate",
					value : this.arrivalPlanDate
				}, {
					xtype : "datefield",
					hidden : true,
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "预计退款到账时间",
					name : "purchaseAcceptance.refundPlanDate",
					value : this.refundPlanDate
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			hidden : true,
			fieldLabel : "不合格原因",
			name : "purchaseAcceptance.unqualified"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.purchaseBriefGrid ]
	} ];
	if ("multiReturned" == this.accMethod) {
		this.receivementGrid = new ReceivementGrid({
			relateId : this.purchaseId,
			relateSerial : this.purchaseSerial,
			relateModule : RelationModule.purchase.relateModule,
			relateModuleName : RelationModule.purchase.relateModuleName
		}, {
			title : "验收退款计划",
			saveable : true
		});
		items.push({
			xtype : "panel",
			bodyStyle : "margin : 5px 0px 5px 0px",
			anchor : "98%",
			layout : "fit",
			items : [ this.receivementGrid ]
		});
	}
	PurchaseAcceptanceForm.superclass.constructor.call(this, {
		title : "采购验收",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 115,
			object : "purchaseAcceptance",
			saveable : true,
			url : __ctxPath + "/dispatch/" + this.accMethod + "Purchase.do",
			items : items,
			fieldMapping : PurchaseAcceptanceFieldMapping,
			hiddenField : PurchaseAcceptanceHiddenField
		}
	});
};
Ext.extend(PurchaseAcceptanceForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "purchaseId", "acceptanceStatus", "handleMethod" ];
		var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.purchaseId, this.acceptanceStatus, this.handleMethod ];
		this.setMultiFieldValue(fieldNames, values);
		if ("multiReturned" == this.accMethod) {
			this.getForm().findField("purchaseAcceptance.acceptanceStatusName").show();
			this.getForm().findField("purchaseAcceptance.handleMethodName").show();
			this.getForm().findField("purchaseAcceptance.refundPlanDate").show();
			this.getForm().findField("purchaseAcceptance.refundPlanDate").allowBlank = false;
			this.getForm().findField("purchaseAcceptance.unqualified").show();
		} else if ("multiExchange" == this.accMethod) {
			this.getForm().findField("purchaseAcceptance.acceptanceStatusName").show();
			this.getForm().findField("purchaseAcceptance.handleMethodName").show();
			this.getForm().findField("purchaseAcceptance.arrivalPlanDate").show();
			this.getForm().findField("purchaseAcceptance.arrivalPlanDate").allowBlank = false;
			this.getForm().findField("purchaseAcceptance.unqualified").show();
		} else if ("multiUnqualified" == this.accMethod) {
			this.getForm().findField("purchaseAcceptance.acceptanceStatusName").show();
			this.getForm().findField("purchaseAcceptance.handleMethodName").show();
			this.getForm().findField("purchaseAcceptance.unqualified").show();
		}
	},
	saveFormData : function() {
		if (this.receivementGrid) {
			this.getForm().findField("purchaseAcceptance.receivements").setValue($gridstore2json(this.receivementGrid));
		}
		var ids = [];
		var data = this.purchaseBriefGrid.getSelectionModel().getSelections();
		for ( var i = 0; i < data.length; i++) {
			ids.push(data[i].data.purchaseBriefId);
		}
		this.getForm().findField("purchaseAcceptance.purchaseBriefIds").setValue(Ext.util.JSON.encode(ids));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});