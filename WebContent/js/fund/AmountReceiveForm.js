var AmountReceiveForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.qrcodePanelId = Ext.id();
	this.paymentTypeCombo = $initComboBoxField("支付方式", "amountReceive.paymentType", "paymentType", {
		editable : true
	});
	var feesTypeCombo = $initComboBoxField("费用类别", "amountReceive.reimburseType", "reimburseType", {
		allowBlank : true,
		editable : true
	});
	this.receiveAccountCombo = new Ext.ux.form.DataCombo({
		width : 130,
		fieldLabel : "收款账号",
		name : "amountReceive.receiveAccount",
		store : []
	})	
	this.receiveBankCombo = new Ext.ux.form.DataCombo({
		width : 130,
		fieldLabel : "收款开户行",
		name : "amountReceive.receiveBank",
		store : []
	})	
	this.paymentAccountCombo = new Ext.ux.form.DataCombo({
		width : 130,
		fieldLabel : "付款账号",
		name : "amountReceive.receiveAccount",
		store : []
	})	
	this.paymentBankCombo = new Ext.ux.form.DataCombo({
		width : 130,
		fieldLabel : "付款开户行",
		name : "amountReceive.receiveBank",
		store : []
	})	
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
					name : "amountReceive.userName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "票据单号",
					name : "amountReceive.amountSerial"
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
					name : "amountReceive.providedDate",
					value : new Date()
				}, {
					maxLength : 100,
					allowBlank : false,
					fieldLabel : "收款主题",
					name : "amountReceive.amountTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "amountReceive.department.depName"
				}, {
					maxLength : 24,
					fieldLabel : "凭证号",
					name : "amountReceive.voucher"
				} ]
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
					fieldLabel : "收款单位",
					name : "amountReceive.receiveEntName",
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "付款方",
					name : "amountReceive.paymentName",
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
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "经办人",
					name : "amountReceive.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, this.paymentTypeCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ this.receiveBankCombo,this.paymentBankCombo, /*{
					fieldLabel : "收款开户行",
					name : "amountReceive.receiveBank"
				}, {
					fieldLabel : "付款开户行",
					name : "amountReceive.paymentBank"
				},*/ {
					id : "receiveAmount",
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "收款金额(元)",
					name : "amountReceive.receiveAmount"
				}, {
					readOnly : true,
					fieldLabel : "收款状态",
					name : "amountReceive.receiveStatusName"					
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [this.receiveAccountCombo,this.paymentAccountCombo, /*{
					fieldLabel : "收款账号",
					name : "amountReceive.receiveAccount"
				}, {
					fieldLabel : "付款账号",
					name : "amountReceive.paymentAccount"
				},*/ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "收款日期",
					name : "amountReceive.receiveDate",
					maxValue : new Date()		//收款时间限制不超过当前时间(已确认)
				},feesTypeCombo]
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
//					xtype : "relationCompositeField",
//					disabled : !this.saveable,
					readOnly : true,
//					allowBlank : true,
					fieldLabel : "关联项目",
					name : "amountReceive.projectName",
//					relateModule : RelationModule.project.relateModule,
//					importhandler : this.importProjectArchives.createDelegate(this),
//					cleanhandler : this.cleanRelationArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "关联业务",
					name : "amountReceive.relateModuleName"
				}, {
					readOnly : true,
					fieldLabel : "业务计划金额(元)",
					name : "amountReceive.relateAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目编号",
					name : "amountReceive.projectSerial"
				}, {
					readOnly : true,
					fieldLabel : "业务编号",
					name : "amountReceive.relateSerial"
				}, {
					readOnly : true,
					fieldLabel : "已收金额(元)",
					name : "amountReceive.hasReceiveAmount",
					value : 0
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目地址",
					name : "amountReceive.address"
				}, {
					readOnly : true,
					fieldLabel : "业务主题",
					name : "amountReceive.relateTheme"
				}, {
					readOnly : true,
					fieldLabel : "应收款余额(元)",
					name : "amountReceive.receivableDebit",
					value : 0
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
			name : "amountReceive.remark"
		} ]
	} ];
	if (this.relation) {
		var receiveTopbarItems = null;
		if (this.saveable) {
			receiveTopbarItems = [ {
				iconCls : "btn-share",
				text : "分摊",
				handler : this.shareReceivePlan.createDelegate(this)
			}, {
				iconCls : "btn-clean",
				text : "清空",
				handler : this.cleanReceivePlan.createDelegate(this)
			} ];
		}
		this.amountReceiveShareGrid = new AmountReceiveShareGrid({
			relateId : this.relation.relateId,
			relateSerial : this.relation.relateSerial,
			relateModule : this.relation.relateModule
		}, {
			saveable : this.saveable,
			tbarItems : receiveTopbarItems
		})
	}
	var equipTopbarItems = null;
	if (this.saveable) {
		equipTopbarItems = [ {
			iconCls : "btn-share",
			text : "分摊",
			handler : this.shareEquipReceive.createDelegate(this)
		}, {
			iconCls : "btn-clean",
			text : "清空",
			handler : this.cleanEquipReceive.createDelegate(this)
		} ];
	}
	this.amountEquipShareGrid = new AmountEquipShareGrid({
		relateId : this.amountReceiveId,
		relateModule : RelationModule.amountReceive.relateModule
	}, {
		parentForm : this,
		saveable : this.saveable,
		tbarItems : equipTopbarItems
	});
	this.relateTabPanel = new Ext.TabPanel({
		hidden : !this.saveable,
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.amountEquipShareGrid ]
	});
	/*if (this.amountReceiveShareGrid) {
		this.relateTabPanel.add(this.amountReceiveShareGrid);
	}*/
	items.push(this.relateTabPanel);
	AmountReceiveForm.superclass.constructor.call(this, {
		title : "收款信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 80,
			object : "amountReceive",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.amountReceiveId,
				relateModule : RelationModule.amountReceive.relateModule
			},
			url : __ctxPath + "/fund/saveAmountReceive.do",
			items : items,
			fieldMapping : AmountReceiveFieldMapping,
			hiddenField : AmountReceiveHiddenField
		}
	});
};
Ext.extend(AmountReceiveForm, Knight.ux.FormPanelWindow, {
	getReceiveData : function(a) {
		var data = $ajaxSyncCall(__ctxPath + "/archive/listAccountCorpInfo.do", {
			"Q_corpId_L_EQ" : a
		}).result;
		var receiveAccountData = [];
		var receiveBankData = [];
		for(var i=0; i<data.length; i++) {
			receiveAccountData.push(data[i].account);
			receiveBankData.push(data[i].bankDeposit);
		}
		this.receiveAccountCombo.getStore().loadData(receiveAccountData);
		this.receiveBankCombo.getStore().loadData(receiveBankData);
	},
	getPaymentData : function(a) {
		var result =  $ajaxSyncCall(__ctxPath + "/archive/loadCustomer.do?customerId="+a, null).data;
		if(result.length<1) {
			return;
		}
		var data = result[0].customerAccountSet;
		var paymentAccountData = [];
		var paymentBankData = [];
		for(var i=0; i<data.length; i++) {
			paymentAccountData.push(data[i].account);
			paymentBankData.push(data[i].bankDeposit);
		}
		this.paymentAccountCombo.getStore().loadData(paymentAccountData);
		this.paymentBankCombo.getStore().loadData(paymentBankData);
	},
	importCorpAccountArchives : function(data) {
		var fieldNames = [ "receiveEntId", "receiveModule", "receiveEntName", "receiveEntAccountId", "receiveBank", "receiveAccount" ];
		var values = [ data.corp.corpId, RelationModule.corp.relateModule, data.corp.corpName, data.corpAccountId, data.bankDeposit, data.account ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "practiId", "practiName" ], [ data.practiId, data.practiName ]);
	},
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "projectId", "projectSerial", "projectName", "address" ], [ data.projectId, data.projectSerial, data.projectName, data.address ]);
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "paymentId", "paymentModule", "paymentName", "paymentAccountId", "paymentAccount", "paymentBank" ];
		if (Ext.isEmpty(data)) {
			this.findFormField("paymentName").setReadOnly(false);
			this.findFormField("paymentAccount").setReadOnly(false);
			this.findFormField("paymentBank").setReadOnly(false);
			this.cleanMultiField(fieldNames);
			return;
		}
		this.findFormField("paymentName").setReadOnly(true);
		this.findFormField("paymentAccount").setReadOnly(true);
		this.findFormField("paymentBank").setReadOnly(true);
		var values = [ relation.relateId, relation.relateModule, relation.relateSerial, relation.relateAccountId, relation.relateAccount, relation.relateBankDeposit ];
		this.setMultiFieldValue(fieldNames, values);
	},
	cleanRelationArchives : function(a,fields){
		var fieldNames = ["projectId","projectName","projectSerial","address"];
		var values =[null,null,null,null];
		this.setMultiFieldValue(fieldNames,values);
	},
	shareReceivePlan : function() {
		var items = this.amountReceiveShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "无回款计划信息!");
			return;
		}
		var receiveAmountField = this.getForm().findField("amountReceive.receiveAmount");
		var receiveAmount = receiveAmountField.getValue();
		if (receiveAmount <= 0) {
			Ext.ux.Toast.msg("信息", "回款金额必须大于零!");
			return;
		}
		for (var i = 0; i < items.length; i++) {
			var r = items[i].get("receivement");
			var ar = items[i].get("alreadyReceivement");
			if ((receiveAmount - r + ar) > 0) {
				items[i].set("presentReceivement", (r - ar));
				receiveAmount = receiveAmount - r + ar;
			} else {
				items[i].set("presentReceivement", receiveAmount);
				receiveAmount = 0;
				break;
			}
		}
		if (receiveAmount > 0) {
			items[items.length - 1].set("presentReceivement", Ext.util.Format.round(items[items.length - 1].get("presentReceivement") + receiveAmount, 2));
		}
		receiveAmountField.setReadOnly(true);
	},
	cleanReceivePlan : function() {
		var items = this.amountReceiveShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加回款计划!");
			return;
		}
		for (var i = 0; i < items.length; i++) {
			items[i].set("presentReceivement", 0);
		}
		var receiveAmountField = this.getForm().findField("amountReceive.receiveAmount");
		receiveAmountField.setReadOnly(false);
	},
	shareEquipReceive : function() {
		var items = this.amountEquipShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加分摊设备!");
			return;
		}
		var receiveAmount = this.getForm().findField("amountReceive.receiveAmount").getValue();
//		if (receiveAmount <= 0) {
//			Ext.ux.Toast.msg("信息", "回款金额必须大于零!");
//			return;
//		}
		var avgAmount = Math.floor(receiveAmount / items.length);
		var remainderAmount = receiveAmount;
		for (var i = 0; i < items.length - 1; i++) {
			items[i].set("presentAmount", avgAmount);
			remainderAmount = remainderAmount - avgAmount;
		}
		items[items.length - 1].set("presentAmount", Ext.util.Format.round(remainderAmount, 2));
	},
	cleanEquipReceive : function() {
		var items = this.amountEquipShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加分摊设备!");
			return;
		}
		for (var i = 0; i < items.length; i++) {
			items[i].set("presentAmount", 0);
		}
	},
	saveFormData : function() {
		var presentAmountList = this.amountEquipShareGrid.getStore().data.items;
		var receiveAmount = Ext.getCmp("receiveAmount").getValue();
		var s = 0;
		if(presentAmountList.length > 0){
		for(i = 0 ; i < presentAmountList.length; i++){
			var presentAmountSum = Number(presentAmountList[i].data.presentAmount);
			s += presentAmountSum;
		}
		var sum = s.toFixed(2);
		if(sum > receiveAmount){
			Ext.MessageBox.show({
				title: "提示",
				msg: "分摊费用总和超出付款金额！",
				buttons: Ext.MessageBox.OK
			});
			return;
		}else if(sum < receiveAmount){
			Ext.MessageBox.show({
				title: "提示",
				msg: "分摊费用总和小于付款金额！",
				buttons: Ext.MessageBox.OK
			});
			return;
		}	
	}
		
/*	if (this.amountReceiveShareGrid) {
		var receiveAmountField = this.getForm().findField("amountReceive.receiveAmount");
		if (!receiveAmountField.readOnly) {
			this.shareReceivePlan();
		}
		this.getForm().findField("amountReceive.amountReceiveShares").setValue($gridstore2json(this.amountReceiveShareGrid));
	}*/
		this.getForm().findField("amountReceive.amountEquipShares").setValue($gridstore2json(this.amountEquipShareGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitAmountReceive.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.amountReceiveId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadAmountReceive.do?amountReceiveId=" + this.amountReceiveId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.amountReceiveShareSet, this.amountReceiveShareGrid);
					this.setFormSubModuleGrid(data.amountEquipShareSet, this.amountEquipShareGrid);
					if ((this.amountReceiveShareGrid && data.amountReceiveShareSet && data.amountReceiveShareSet.length > 0) || (data.amountEquipShareSet && data.amountEquipShareSet.length > 0)) {
						this.relateTabPanel.show();
					}
					if (!this.copyable) {
						this.findFormField("userName").show();
						var qrcodePanel = Ext.getCmp(this.qrcodePanelId);
						if (qrcodePanel) {
							qrcodePanel.body.update("<img src='" + __ctxPath + "/image-widget?method=qrcode&contents={componId:" + data.componId + "}' height=125 width=130/>");
						}
					} else {
						delete this.amountReceiveId;
						this.findFormField("amountReceiveId").setValue(null);
						this.findFormField("amountSerial").setValue(null);
						this.findFormField("department.depId").setValue(curUserInfo.depId).show();
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
			if (this.relation) {
				fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName" ];
				this.copyMultiFieldValue(fieldNames, this.relation);
			}
			if (isCorpAppUser()) {
				fieldNames = [ "receiveEntId", "receiveModule", "receiveEntName" ];
				values = [ curUserInfo.corpInfo.corpId, RelationModule.corp.relateModule, curUserInfo.corpInfo.corpName ];
				this.setMultiFieldValue(fieldNames, values);
				this.getReceiveData(curUserInfo.corpInfo.corpId);
			}
			if (this.relation && RelationModule.settleContract.relateModule == this.relation.relateModule) {
				fieldNames = [ "projectId", "projectSerial", "projectName", "address" ];
				this.copyMultiFieldValue(fieldNames, this.relationData);
				$request({
					url : __ctxPath + "/dispatch/loadSettleContract.do?settleId=" + this.relation.relateId,
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						fieldNames = [ "paymentId", "paymentModule", "paymentName" ];
						values = [ data.paEnt, data.paModule, data.paEntName ];
						this.setMultiFieldValue(fieldNames, values);
						this.getPaymentData(data.paEnt);
						for (var i = 0; i < data.settleEquipBriefSet.length; i++) {
							if (Ext.isEmpty(data.settleEquipBriefSet[i].equipId)) {
								continue;
							}
							$request({
								url : __ctxPath + "/archive/loadEquipment.do?equipId=" + data.settleEquipBriefSet[i].equipId,
								success : function(g, h) {
									var equipment = Ext.util.JSON.decode(g.responseText).data[0];
									this.amountEquipShareGrid.addSubModuleDate(equipment);
                                    if(this.auto){
                                        fieldNames = [ "practiId","practiName", "receiveAmount" ];
                                        values = [curUserInfo.userId,curUserInfo.fullname,this.relationData.settleAmount];
                                        this.setMultiFieldValue(fieldNames, values);
                                        this.paymentTypeCombo.setValue("转账");
                                    }
								}.createDelegate(this)
							});
						}
					}.createDelegate(this)
				});
			}
			if(this.relation && RelationModule.contractLease.relateModule == this.relation.relateModule) {
				fieldNames = [ "projectId", "projectSerial", "projectName", "address" ];
				this.copyMultiFieldValue(fieldNames, this.relationData);
				this.setFieldValue( "contractLease.contractId", this.relationData.contractId);
				fieldNames = [ "paymentId", "paymentModule", "paymentName" ];
				values = [ this.relationData.paEnt, this.relationData.paModule, this.relationData.paEntName ];
				this.setMultiFieldValue(fieldNames, values);
			}
		}
	}
});