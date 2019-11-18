var PurchasePlanForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.purchaseSerial = null;
	

	var items = [ {
		xtype : "fieldset",
		title : "申请信息",
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
					name : "purchasePlan.personName",
					value : this.personName
				}, {
					id : "applicantName",
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "申请人",
					name : "purchasePlan.applicantName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importApplicantArchives.createDelegate(this),
					value : this.applicantName
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
					name : "purchasePlan.fillDate",
					value : new Date()
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id : "applicantDept",
					maxLength : 20,
					readOnly : true,
					fieldLabel : "申请部门",
					name : "purchasePlan.applicantDept",
					value : this.applicantDept
				}]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "询价信息",
		anchor : "98%",
		hidden : !this.selectable,
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id : "inquiryName",
					readOnly : false,
					fieldLabel : "询价负责人",
					name : "purchasePlan.inquiryName",
					value : this.inquiryName
				}]
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
					fieldLabel : "询价日期",
					name : "purchasePlan.inquiryDate",
					value : new Date()
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "费用合计",
					name : "purchasePlan.totalCost",
					value : this.totalCost
				}]
			} ]
		}, {
			anchor : "95%",
			maxLength : 1000,
			height : 48,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "询价说明",
			name : "purchasePlan.remark",
			value : this.remark
		} ]
	} ];
	this.purchasePlanInquiryGrid = new PurchasePlanInquiryGrid({
		purchasePlanId : this.purchasePlanId
	}, {
		selectable : this.selectable,
		saveable : this.saveable
//		grid_config : {
//			loadurl : __ctxPath + "/dispatch/listInquiryPurchasePlan.do",
//			base_params : {
//				Q_purchasePlanId_L_EQ : this.purchasePlanId
//			}
//		}
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.purchasePlanInquiryGrid]
	});
	items.push(this.relateTabPanel);
	PurchasePlanForm.superclass.constructor.call(this, {
		selectable : this.selectable,
		title : "采购信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "purchasePlan",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.purchasePlanId
			},
			approve : {
				action : this.approveable,
				relateId : this.purchasePlanId
			},
			url : __ctxPath + "/dispatch/savePurchasePlan.do",
			items : items,
			fieldMapping : PurchasePlanFieldMapping,
			hiddenField  : PurchasePlanHiddenField
		}
	});
};
Ext.extend(PurchasePlanForm, Knight.ux.FormPanelWindow, {
	importApplicantArchives : function(data) {
		this.setMultiFieldValue([ "applicantName", "applicantDept"], [ data.practiName, data.department.depName]);
	},
	saveFormData : function() {
		var amount = 0;
		for (var i = 0; i < this.purchasePlanInquiryGrid.getStore().getCount(); i++) {
			var r = this.purchasePlanInquiryGrid.getStore().getAt(i).data;
			amount += Number(r.summary);
		}
		this.setFieldValue("totalCost", amount);
		this.setFieldValue("purchasePlanId",this.purchasePlanId);
		this.setFieldValue("purchasePlanInquirys", $gridstore2json(this.purchasePlanInquiryGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.purchasePlanId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadPurchasePlan.do?purchasePlanId=" + this.purchasePlanId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					Ext.getCmp('inquiryName').setValue(curUserInfo.fullname)
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.purchasePlanInquirySet, this.purchasePlanInquiryGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "personName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});