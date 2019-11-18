var AdvanceReceiveForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.paymentTypeCombo = $initComboBoxField("支付方式", "advanceReceive.paymentType", "paymentType", {
		editable : true
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
					name : "advanceReceive.userName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "票据单号",
					name : "advanceReceive.advanceSerial"
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
					name : "advanceReceive.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "预收款主题",
					name : "advanceReceive.advanceTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "advanceReceive.department.depName"
				}]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "基本信息",
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
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					width : 270,
					fieldLabel : "收款单位",
					name : "advanceReceive.receiveEntName",
					collectEnable : false,
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					width : 270,
					allowBlank : false,
					fieldLabel : "付款方",
					name : "advanceReceive.paymentName",
					relations : [ {
						relation : RelationModule.corpAccount
					}, {
						relation : RelationModule.customer
					}, {
						relation : RelationModule.supplier
					}, {
						relation : RelationModule.others
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "经办人",
					name : "advanceReceive.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, this.paymentTypeCombo]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "预收金额(元)",
					name : "advanceReceive.advanceReceiveAmount"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "预收款日期",
					name : "advanceReceive.advanceDate",
					value : new Date()
				}]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "关联信息",
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
					xtype : "textfield",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					width : 330,
					fieldLabel : "关联项目",
					name : "advanceReceive.contractLease.projectName",
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "advanceReceive.contractLease.contractNo"
				}]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					width : 330,
					fieldLabel : "项目地址",
					name : "advanceReceive.contractLease.address"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "advanceReceive.remark"
		} ]
	} ];
	AdvanceReceiveForm.superclass.constructor.call(this, {
		title : "预收款信息明细",
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 80,
			object : "advanceReceive",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.adreceiveId,
				relateModule : RelationModule.advanceReceive.relateModule
			},
			url : __ctxPath + "/fund/saveAdvanceReceive.do",
			items : items,
			fieldMapping : AdvanceReceiveFieldMapping,
			hiddenField : AdvanceReceiveHiddenField
		}
	});
};
Ext.extend(AdvanceReceiveForm, Knight.ux.FormPanelWindow, {
	importCorpAccountArchives : function(data) {
		var fieldNames = [ "receiveEntId", "receiveModule", "receiveEntName"];
		var values = [ data.corpId, RelationModule.corp.relateModule, data.corpName];
		this.setMultiFieldValue(fieldNames, values);
	},
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "practiId", "practiName" ], [ data.practiId, data.practiName ]);
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "paymentId", "paymentModule", "paymentName"];
		if (Ext.isEmpty(data)) {
			this.findFormField("paymentName").setReadOnly(false);
			this.cleanMultiField(fieldNames);
			return;
		}
		this.findFormField("paymentName").setReadOnly(true);
		var values = [ relation.relateId, relation.relateModule, relation.relateSerial ];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.adreceiveId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadAdvanceReceive.do?adreceiveId=" + this.adreceiveId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			var fieldNameb = [ "contractLease.contractId", "contractLease.contractNo", "contractLease.projectName", "contractLease.address" ];
			var valueb = [ this.contractId, this.contractNo, this.projectName, this.address ];
			this.setMultiFieldValue(fieldNames, values);
			this.setMultiFieldValue(fieldNameb, valueb);
			fieldNamec = [ "receiveEntId", "receiveModule", "receiveEntName" ];
			var valuec = [ this.receiveEntId, this.receiveModule, this.receiveEntName];
			fieldNamed = [ "paymentId", "paymentModule", "paymentName" ];
			var valued = [ this.paymentId, this.paymentModule, this.paymentName ];
			this.setMultiFieldValue(fieldNamec, valuec);
			this.setMultiFieldValue(fieldNamed, valued);
			
//			if (isCorpAppUser()) {
//				fieldNames = [ "receiveEntId", "receiveModule", "receiveEntName" ];
//				values = [ curUserInfo.corpInfo.corpId, RelationModule.corp.relateModule, curUserInfo.corpInfo.corpName ];
//				this.setMultiFieldValue(fieldNames, values);
//			}
//			if (this.relation && RelationModule.settleContract.relateModule == this.relation.relateModule) {
//				$request({
//					url : __ctxPath + "/dispatch/loadSettleContract.do?settleId=" + this.relation.relateId,
//					success : function(g, h) {
//						var resp = Ext.util.JSON.decode(g.responseText);
//						var data = resp.data[0];
//						fieldNames = [ "paymentId", "paymentModule", "paymentName" ];
//						values = [ data.paEnt, data.paModule, data.paEntName ];
//						this.setMultiFieldValue(fieldNames, values);
//					}.createDelegate(this)
//				});
//			}
		}
	}
});