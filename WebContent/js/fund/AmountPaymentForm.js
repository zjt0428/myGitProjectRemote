var AmountPaymentForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.receiveDisabled = this.receiveDisabled; // 是否禁用收款方
	this.paymentPlanDisabled = this.paymentPlanDisabled; // 是否禁用关联付款计划
	this.copyable = this.copyable ? true : false;
	Ext.apply(this, {
		feesTypeId : Ext.id()
	});
	this.paymentTypeCombo = $initComboBoxField("支付方式", "amountPayment.paymentType", "paymentType", {
		editable : true
	});
	var items = [ {
		xtype : "hidden",
		id : this.feesTypeId,
		name : "amountPayment.feesType"
	}, {
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
					name : "amountPayment.userName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "票据单号",
					name : "amountPayment.amountSerial"
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
					name : "amountPayment.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "付款主题",
					name : "amountPayment.amountTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "amountPayment.department.depName"
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
					fieldLabel : "付款单位",
					name : "amountPayment.paymentEntName",
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable || this.receiveDisabled,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "收款单位",
					name : "amountPayment.receiveName",
					relations : [ {
						relation : RelationModule.corpAccount
					}, {
						relation : RelationModule.customer
					}, {
						relation : RelationModule.supplier
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "经办人",
					name : "amountPayment.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, this.paymentTypeCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "付款开户行",
					name : "amountPayment.paymentBank"
				}, {
					fieldLabel : "收款开户行",
					name : "amountPayment.receiveBank"
				}, {
					id : "paymentAmount",
					xtype : "numberfield",
					maxLength : 9,
					allowBlank : false,
					fieldLabel : "付款金额(元)",
					name : "amountPayment.paymentAmount"
				}, {
					readOnly : true,
					fieldLabel : "付款状态",
					name : "amountPayment.paymentStatusName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "付款账号",
					name : "amountPayment.paymentAccount"
				}, {
					fieldLabel : "收款账号",
					name : "amountPayment.receiveAccount"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "付款日期",
					name : "amountPayment.paymentDate",
					value : new Date()
				}, {
					xtype : "treecombo",
					readOnly : !this.saveable,
					valId : this.feesTypeId,
					allowBlank : false,
					width : 130,
					fieldLabel : "费用类别",
					url : __ctxPath + "/system/treeCode.do?codeId=reimburseType",
					name : "amountPayment.feesTypeName"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 800,
			height : 48,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "支付内容",
			name : "amountPayment.paymentContent"
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "amountPayment.remark"
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
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "关联项目",
					name : "amountPayment.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this),
					cleanhandler : this.cleanRelationArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "关联业务",
					name : "amountPayment.relateModuleName"
				}, {
					readOnly : true,
					fieldLabel : "业务计划金额(元)",
					name : "amountPayment.relateAmount"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "amountPayment.recordId"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目编号",
					name : "amountPayment.projectSerial"
				}, {
					readOnly : true,
					fieldLabel : "业务编号",
					name : "amountPayment.relateSerial"
				}, {
					readOnly : true,
					fieldLabel : "已付金额(元)",
					name : "amountPayment.hasPaymentAmount",
					value : 0
				}, {
					readOnly : true,
					fieldLabel : "发货时间",
					name : "amountPayment.deliveryDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目地址",
					name : "amountPayment.address"
				}, {
					readOnly : true,
					fieldLabel : "业务主题",
					name : "amountPayment.relateTheme"
				}, {
					readOnly : true,
					fieldLabel : "应付款余额(元)",
					name : "amountPayment.payableDebit",
					value : 0
				} ]
			} ]
		} ]
	} ];
	if (this.relation && !this.paymentPlanDisabled) {
		var paymentTopbarItems = null;
		if (this.saveable) {
			paymentTopbarItems = [ {
				iconCls : "btn-share",
				text : "分摊",
				handler : this.sharePaymentPlan.createDelegate(this)
			}, {
				iconCls : "btn-clean",
				text : "清空",
				handler : this.cleanPaymentPlan.createDelegate(this)
			} ];
		}
		this.amountPaymentShareGrid = new AmountPaymentShareGrid({
			relateId : this.relation.relateId,
			relateModule : this.relation.relateModule
		}, {
			saveable : this.saveable,
			tbarItems : paymentTopbarItems
		});
	}
	var equipTopbarItems = null;
	if (this.saveable) {
		equipTopbarItems = [ {
			iconCls : "btn-share",
			text : "分摊",
			handler : this.shareEquipPayment.createDelegate(this)
		}, {
			iconCls : "btn-clean",
			text : "清空",
			handler : this.cleanEquipPayment.createDelegate(this)
		} ];
	}
	this.amountEquipShareGrid = new AmountEquipShareGrid({
		relateId : this.copyable ? null : this.amountPaymentId,
		relateModule : RelationModule.amountPayment.relateModule
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
	if (this.amountPaymentShareGrid) {
		this.relateTabPanel.add(this.amountPaymentShareGrid);
	}
	items.push(this.relateTabPanel);
	AmountPaymentForm.superclass.constructor.call(this, {
		title : "付款信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 80,
			object : "amountPayment",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.copyable ? null : this.amountPaymentId,
				relateModule : RelationModule.amountPayment.relateModule
			},
			url : __ctxPath + "/fund/saveAmountPayment.do",
			items : items,
			fieldMapping : AmountPaymentFieldMapping,
			hiddenField : AmountPaymentHiddenField
		}
	});
};
Ext.extend(AmountPaymentForm, Knight.ux.FormPanelWindow, {
	importCorpAccountArchives : function(data) {
		var fieldNames = [ "paymentEntId", "paymentModule", "paymentEntName", "paymentEntAccountId", "paymentBank", "paymentAccount" ];
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
		var fieldNames = [ "receiveId", "receiveModule", "receiveName", "receiveAccountId", "receiveAccount", "receiveBank" ];
		var values = values = [ relation.relateId, relation.relateModule, relation.relateSerial, relation.relateAccountId, relation.relateAccount, relation.relateBankDeposit ];
		this.setMultiFieldValue(fieldNames, values);
	},
	cleanRelationArchives : function(a,fields){
		var fieldNames = ["projectId","projectName","projectSerial","address"];
		var values =[null,null,null,null];
		this.setMultiFieldValue(fieldNames,values);
	},
	sharePaymentPlan : function() {
		var items = this.amountPaymentShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加付款计划!");
			return;
		}
		var paymentAmountField = this.getForm().findField("amountPayment.paymentAmount");
		var paymentAmount = paymentAmountField.getValue();
		if (paymentAmount <= 0) {
			Ext.ux.Toast.msg("信息", "付款金额必须大于零!");
			return;
		}
		for (var i = 0; i < items.length; i++) {
			var p = items[i].get("payment");
			var ar = items[i].get("alreadyPayment");
			if ((paymentAmount - p + ar) > 0) {
				items[i].set("presentPayment", (p - ar));
				paymentAmount = paymentAmount - p + ar;
			} else {
				items[i].set("presentPayment", paymentAmount);
				paymentAmount = 0;
				break;
			}
		}
		if (paymentAmount > 0) {
			items[items.length - 1].set("presentPayment", Ext.util.Format.round(items[items.length - 1].get("presentPayment") + paymentAmount, 2));
		}
		paymentAmountField.setReadOnly(true);
	},
	cleanPaymentPlan : function() {
		var items = this.amountPaymentShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加付款计划!");
			return;
		}
		for (var i = 0; i < items.length; i++) {
			items[i].set("presentPayment", 0);
		}
		var paymentAmountField = this.getForm().findField("amountPayment.paymentAmount");
		paymentAmountField.setReadOnly(false);
	},
	shareEquipPayment : function() {
		var items = this.amountEquipShareGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加分摊设备!");
			return;
		}
		var paymentAmount = this.getForm().findField("amountPayment.paymentAmount").getValue();
		if (paymentAmount <= 0) {
			Ext.ux.Toast.msg("信息", "付款金额必须大于零!");
			return;
		}
		var avgAmount = Math.floor(paymentAmount / items.length);
		var remainderAmount = paymentAmount;
		for (var i = 0; i < items.length - 1; i++) {
			items[i].set("presentAmount", avgAmount);
			remainderAmount = remainderAmount - avgAmount;
		}
		items[items.length - 1].set("presentAmount", Ext.util.Format.round(remainderAmount, 2));
	},
	cleanEquipPayment : function() {
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
		var paymentAmountList = this.amountEquipShareGrid.getStore().data.items;
		var paymentAmount = Ext.getCmp("paymentAmount").getValue();
		var s = 0;
		if(paymentAmountList.length > 0){
		for(i = 0 ; i < paymentAmountList.length; i++){
			var paymentAmountSum = Number(paymentAmountList[i].data.presentAmount);
			s += paymentAmountSum;
		}
		var sum = s.toFixed(2);
			if(sum > paymentAmount){
				Ext.MessageBox.show({
					title: "提示",
					msg: "分摊费用总和超出付款金额！",
					buttons: Ext.MessageBox.OK
					});
				return;
			}else if(sum < paymentAmount){
				Ext.MessageBox.show({
					title: "提示",
					msg: "分摊费用总和小于付款金额！",
					buttons: Ext.MessageBox.OK
				});
				return;
			}	
		}
		if (this.amountPaymentShareGrid && this.amountPaymentShareGrid.getStore().getCount() > 0) {
			var paymentAmountField = this.getForm().findField("amountPayment.paymentAmount");
			if (!paymentAmountField.readOnly) {
				this.sharePaymentPlan();
			}
			this.setFieldValue("amountPaymentShares", $gridstore2json(this.amountPaymentShareGrid));
		}
		this.setFieldValue("amountEquipShares", $gridstore2json(this.amountEquipShareGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitAmountPayment.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.amountPaymentId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadAmountPayment.do?amountPaymentId=" + this.amountPaymentId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("paymentType", data.paymentTypeName);
					if (this.copyable) {
						this.findFormField("amountSerial").setValue(null);
						this.findFormField("amountPaymentId").setValue(null);
						this.findFormField("address").setValue(null);
						this.findFormField("relateId").setValue(null);
						this.findFormField("relateSerial").setValue(null);
						this.findFormField("relateTheme").setValue(null);
						this.findFormField("relateModule").setValue(null);
						this.findFormField("relateModuleName").setValue(null);
						this.findFormField("relateAmount").setValue(0);
						this.findFormField("hasPaymentAmount").setValue(0);
						this.findFormField("payableDebit").setValue(0);
						var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "providedDate" ];
						var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, new Date() ];
						this.setMultiFieldValue(fieldNames, values);
						if (data.amountPaymentShareSet.length > 0) {
							for (var i = 0; i < data.amountPaymentShareSet.length; i++) {
								data.amountPaymentShareSet[i].paymentShareId = null;
								data.amountPaymentShareSet[i].amountPaymentId = null;
							}
						}
						if (data.amountEquipShareSet.length > 0) {
							for (var i = 0; i < data.amountEquipShareSet.length; i++) {
								data.amountEquipShareSet[i].amountEquipShareId = null;
								data.amountEquipShareSet[i].relateId = null;
								data.amountEquipShareSet[i].relateSerial = null;
								data.amountEquipShareSet[i].relateModule = null;
							}
						}
					}
					this.setFormSubModuleGrid(data.amountPaymentShareSet, this.amountPaymentShareGrid);
					this.setFormSubModuleGrid(data.amountEquipShareSet, this.amountEquipShareGrid);

					if ((data.amountPaymentShareSet && data.amountPaymentShareSet.length > 0) || (data.amountEquipShareSet && data.amountEquipShareSet.length > 0)) {
						this.relateTabPanel.show();
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
			if (isCorpAppUser()) {
				fieldNames = [ "paymentEntId", "paymentModule", "paymentEntName" ];
				values = [ curUserInfo.corpInfo.corpId, RelationModule.corp.relateModule, curUserInfo.corpInfo.corpName ];
				this.setMultiFieldValue(fieldNames, values);
			}

			if (this.relationData) {
				fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName" ];
				this.copyMultiFieldValue(fieldNames, this.relation);
			} else {
				return;
			}
			var relateData = this.relationData;
			if (!Ext.isEmpty(relateData.projectId)) {
				fieldNames = [ "projectId", "projectSerial", "projectName", "address" ];
				values = [ relateData.projectId, relateData.projectSerial, relateData.projectName, relateData.address ];
				this.setMultiFieldValue(fieldNames, values);
			}
			if (RelationModule.equipment.relateModule == relateData.relateModule) {
				this.amountEquipShareGrid.getTopToolbar().hide();
				relateData.presentAmount = 0;
				this.amountEquipShareGrid.getStore().loadData([ relateData ]);
			}
			// 班组结算处理
			if (RelationModule.teamsAccount.relateModule == this.relation.relateModule) {
				fieldNames = [ "receiveId", "receiveModule", "receiveName" ];
				values = [ this.receiveId, this.relateModule, this.receiveName ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 检测信息
			if (RelationModule.equipDetect.relateModule == this.relation.relateModule) {
				fieldNames = [ "receiveId", "receiveModule", "receiveName", "receiveId", "receiveModule", "receiveName", "projectId", "projectSerial", "projectName", "address", "relateAmount", "hasPaymentAmount", "payableDebit" ];
				values = [ this.receiveId, this.relateModule, this.receiveName, this.relationData.detectEnt, RelationModule.supplier.relateModule, this.relationData.detectEntName, this.relationData.equipFlow.equipDiary.projectId,
						this.relationData.equipFlow.equipDiary.projectSerial, this.relationData.equipFlow.equipDiary.projectName, this.relationData.equipFlow.equipDiary.address, this.relationData.detectAmount,
						this.relationData.paymentAmount, this.relationData.balanceAmount ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 采购结算处理
			if (RelationModule.purchase.relateModule == this.relation.relateModule) {
				fieldNames = [ "receiveId", "receiveModule", "receiveName", "relateAmount", "hasPaymentAmount", "payableDebit" ];
				values = [ this.receiveId, this.relateModule, this.receiveName, this.relationData.purchaseAmount, this.relationData.paymentAmount, this.relationData.purchaseAmount - this.relationData.paymentAmount ];
				this.setMultiFieldValue(fieldNames, values);
                if(this.auto){
                    fieldNames = [ "practiId", "practiName", "paymentAmount" ];
                    values = [curUserInfo.userId,curUserInfo.fullname,this.relationData.purchaseAmount];
                    this.setMultiFieldValue(fieldNames, values);
                    this.paymentTypeCombo.setValue("转账");
                    if(this.relationData.equipment !=null){
                        if(this.relationData.equipment.equipId) {
                            this.amountEquipShareGrid.getStore().loadData([this.relationData.equipment]);
                        }
                    }

                }
			}
			// 设备按揭处理
			if (RelationModule.equipment.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount", "recordId" ];
				values = [ relateData.mortgageAmount, relateData.recordId ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 调度(汽车吊)处理
			if (RelationModule.dispatch.relateModule == this.relation.relateModule) {
				fieldNames = [ "receiveName" ];
				values = [ relateData.autocraneDependName ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 结算管理
			if (RelationModule.settleContract.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount", "hasPaymentAmount", "payableDebit", "receiveId", "receiveModule", "receiveName" ];
				values = [ relateData.settleAmount, relateData.finishedAmount, relateData.balanceAmount, relateData.paEnt, this.relation.relateModule, relateData.paEntName ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 待租结算
			if (RelationModule.rentContract.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount", "hasPaymentAmount", "payableDebit", "receiveId", "receiveModule", "receiveName" ];
				values = [ relateData.paymentAmount, relateData.finishedAmount, relateData.paymentAmount - relateData.finishedAmount, relateData.paEnt, this.relation.relateModule, relateData.paEntName ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 施工作业
			if (RelationModule.constructOperation.relateModule == this.relation.relateModule) {
				fieldNames = [ "paymentAmount","relateAmount", "recordId" ];
				values = [ relateData.summary,relateData.summary,relateData.equipment.recordId ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 物流信息
			if (RelationModule.logisticsTransport.relateModule == this.relation.relateModule) {
				fieldNames = [ "receiveId", "receiveModule", "receiveName", "receiveName", "relateAmount", "hasPaymentAmount", "payableDebit" ];
				values = [ this.receiveId, this.relateModule, this.receiveName, this.relationData.transportEntName, this.relationData.transportAmount, this.relationData.finishedAmount, this.relationData.remainderAmount ];
				this.setMultiFieldValue(fieldNames, values);
				if(this.auto){
					fieldNames = [ "practiId", "practiName", "paymentAmount" ];
					values = [curUserInfo.userId,curUserInfo.fullname,this.relationData.transportAmount];
					this.setMultiFieldValue(fieldNames, values);
					this.paymentTypeCombo.setValue("转账");
                    if(this.relationData.equipment.equipId) {
                        this.amountEquipShareGrid.getStore().loadData([this.relationData.equipment]);
                    }
				}
			}
			// 回场物流
			if (RelationModule.logisticsBacksport.relateModule == this.relation.relateModule) {
				fieldNames = [ "receiveId", "receiveModule", "receiveName", "receiveName", "relateAmount", "hasPaymentAmount", "payableDebit" ];
				values = [ this.receiveId, this.relateModule, this.receiveName, this.relationData.backsportEntName, this.relationData.backsportAmount, this.relationData.finishedAmount, this.relationData.remainderAmount ];
				this.setMultiFieldValue(fieldNames, values);
			}
			// 汽吊管理
			if (RelationModule.autocrane.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount", "hasPaymentAmount", "payableDebit" ];
				values = [ this.relationData.autocraneAmount, this.relationData.paymentAmount, this.relationData.balanceAmount ];
				this.setMultiFieldValue(fieldNames, values);
				if(this.auto){
					fieldNames = [ "practiId", "practiName", "paymentAmount" ];
					values = [curUserInfo.userId,curUserInfo.fullname,this.relationData.autocraneAmount];
					this.setMultiFieldValue(fieldNames, values);
                    this.paymentTypeCombo.setValue("转账");
                    if(this.relationData.equipment.equipId) {
                        this.amountEquipShareGrid.getStore().loadData([this.relationData.equipment]);
                    }
				}
			}
			//维修管理
			if (RelationModule.equipRepair.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount","recordId"];
				values = [ this.relationData.repairAmount,relateData.equipment.recordId];
				this.setMultiFieldValue(fieldNames, values);
				if(this.auto){
					fieldNames = [ "practiId", "practiName", "paymentAmount" ];
					values = [curUserInfo.userId,curUserInfo.fullname,this.relationData.repairAmount];
					this.setMultiFieldValue(fieldNames, values);
					this.paymentTypeCombo.setValue("转账");
                    if(this.relationData.equipment.equipId) {
                        this.amountEquipShareGrid.getStore().loadData([this.relationData.equipment]);
                    }
				}
			}
            //领用管理
			if (RelationModule.pickup.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount","recordId","amountTheme"];
				values = [ this.relationData.pickupAmount,relateData.equipment.recordId,"材料费+"+relateData.pickupTheme];
				this.setMultiFieldValue(fieldNames, values);
				if(this.auto){
					fieldNames = [ "practiId", "practviName", "paymentAmount" ];
					values = [curUserInfo.userId,curUserInfo.fullname,this.relationData.pickupAmount];
					this.setMultiFieldValue(fieldNames, values);
					this.paymentTypeCombo.setValue("转账");
					if(this.relationData.equipment.equipId) {
						this.amountEquipShareGrid.getStore().loadData([this.relationData.equipment]);
					}
				}
			}
			//APP物流
			if (RelationModule.appLogistics.relateModule == this.relation.relateModule) {
				fieldNames = [ "relateAmount" ];
				values = [ this.relationData.summary ];
				this.setMultiFieldValue(fieldNames, values);
				if (this.auto) {
					fieldNames = [ "practiId", "practviName", "practiName", "paymentAmount", "payableDebit", "deliveryDate" ];
					values = [ curUserInfo.userId, curUserInfo.fullname, curUserInfo.fullname, this.relationData.summary, this.relationData.summary, this.relationData.deliveryDate ];
					this.setMultiFieldValue(fieldNames, values);
					this.paymentTypeCombo.setValue("转账");
					/*if(this.relationData.equipment.equipId) {
						this.amountEquipShareGrid.getStore().loadData([this.relationData.equipment]);
					}*/
				}
			}
			//app报修
			if(RelationModule.appRepair.relateModule == this.relation.relateModule){
				fieldNames = [ "paymentAmount","relateAmount" ];
				values = [ this.relationData.repFee,this.relationData.repFee ];
				this.setMultiFieldValue(fieldNames, values);
			}
		}
	}
});