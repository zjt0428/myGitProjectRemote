var ContractSubcontractForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? this.saveable : false; // 保存/重置功能按钮
	this.acceptable = this.acceptable ? this.acceptable : false; // 审核功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮
	this.subcontract = "1";

	var rentStandardData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "rentStandard"
	});
	var kindWorkData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "kindWork"
	});
	var measurementData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "measurement"
	});
	this.contractEquipGrid = new ContractEquipGrid({
		subcontract : this.subcontract,
		measurementData : measurementData,
		rentStandardData : rentStandardData
	}, {
		saveable : this.saveable
	});
	this.contractEquipOutlayGrid = new ContractEquipOutlayGrid({
		contractId : this.contractId
	}, {
		saveable : this.saveable
	});
	this.contractEquipCostGrid = new ContractEquipCostGrid({
		contractId : this.contractId
	}, {
		saveable : this.saveable
	});
	this.contractPractiBriefGrid = new ContractPractiBriefGrid({
		subcontract : this.subcontract,
		kindWorkData : kindWorkData,
		measurementData : measurementData,
		contractId : this.contractId
	}, {
		kindWorkHeader : "工种类别",
		quantityHeader : "人数",
		expenseHeader : "月工资",
		measurementHidden : true,
		endDateHidden : false,
		summaryHidden : false,
		remarkHidden : false,
		saveable : this.saveable
	});
	this.contractEquipBriefGrid = new ContractEquipBriefGrid({
		measurementData : measurementData,
		contractId : this.contractId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.contractId,
		relateModule : RelationModule.contractLease.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "hidden",
		fieldLabel : "项目编号",
		name : "contractLease.projectSerial"
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
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "contractLease.userName"
				}, {
					readOnly : true,
					fieldLabel : ContractLeaseFormConfigure.contractSerialHeader,
					name : "contractLease.contractSerial"
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
					name : "contractLease.providedDate",
					value : new Date()
				}, {
					maxLength : 48,
					fieldLabel : "合同主题",
					name : "contractLease.contractTheme",
					tooltip : "默认为新增时的项目名称+的合同+年月日"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "contractLease.department.depName"
				}, {
					xtype : "combo",
					mode : "local",
					hidden : true,
					editable : false,
					readOnly : false,
					triggerAction : "all",
					fieldLabel : "是否提成",
					hiddenName : "contractLease.deduct",
					store : [ [ "1", "有提成" ], [ "0", "无提成" ] ],
					value : "1"
				}, {
					hidden : true,
					fieldLabel : "设备总数",
					name : "contractLease.equipCount",
					value : "0"
				}, {
					hidden : true,
					fieldLabel : "人员总数",
					name : "contractLease.practiCount",
					value : "0"
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
					fieldLabel : "总承包方",
					name : "contractLease.paEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "专业分包方",
					name : "contractLease.pbEntName"
				}, {
					fieldLabel : "企业名录批号",
					name : "contractLease.enterpriseSerial",
				}, {
					xtype : "numberfield",
					fieldLabel : "建筑面积",
					name : "contractLease.cover",
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "承租单位负责人",
					name : "contractLease.paEntLinkMan"
				}, {
					fieldLabel : "出租单位负责人",
					name : "contractLease.pbEntLinkMan"
				}, {
					xtype : "numberfield",
					maxLength : 10,
					readOnly : true,
					fieldLabel : "合同金额",
					name : "contractLease.contractAmount",
					value : 0
				}, {
					xtype : "numberfield",
					fieldLabel : "建筑最大高度",
					name : "contractLease.overallHeight"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : false,
					fieldLabel : "承租方单位电话",
					name : "contractLease.paEntLinkTel"
				}, {
					readOnly : false,
					fieldLabel : "出租方单位电话",
					name : "contractLease.pbEntLinkTel"
				}, {
					readOnly : true,
					fieldLabel : "应收款",
					name : "contractLease.debitReceivable",
					value : 0
				}, {
					xtype : "numberfield",
					fieldLabel : "建筑物数",
					name : "contractLease.buildingQuantity"
				} ]
			} ]
		}, {
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
					fieldLabel : "项目名称",
					name : "contractLease.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.67,
				defaultType : "textfield",
				items : [ {
					anchor : "90%",
					allowBlank : false,
					fieldLabel : "使用地点",
					name : "contractLease.address"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "contractLease.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.contractEquipBriefGrid, this.contractEquipGrid, this.contractEquipOutlayGrid, this.contractEquipCostGrid, this.contractPractiBriefGrid ]
	} ];
	ContractSubcontractForm.superclass.constructor.call(this, {
		title : "租赁合同明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 960,
		height : 760,
		form_config : {
			labelWidth : 100,
			object : "contractLease",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.contractId,
				relateModule : RelationModule.contractLease.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.contractId,
				relateModule : RelationModule.contractLease.relateModule
			},
			url : __ctxPath + "/dispatch/saveContractLease.do",
			items : items,
			fieldMapping : ContractLeaseFieldMapping,
			hiddenField : ContractLeaseHiddenField
		}
	});
};
Ext.extend(ContractSubcontractForm, Knight.ux.FormPanelWindow, {
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "paEnt", "paModule", "paEntName", "paEntLinkMan", "paEntLinkTel" ], [ data.customerId, RelationModule.customer.relateModule, data.customerName, "", data.tel ]);
	},
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "projectId", "projectSerial", "projectName", "address" ], [ data.projectId, data.projectSerial, data.projectName, data.address ]);
	},
	saveFormData : function() {
		for (var i = 0; i < this.contractEquipBriefGrid.getStore().getCount(); i++) {
			var r = this.contractEquipBriefGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.equipCategory)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录机械设备类型未选择!");
				return;
			}
		}
		this.setFieldValue("contractEquipBriefs", $gridstore2json(this.contractEquipBriefGrid));
		this.setFieldValue("contractEquips", $gridstore2json(this.contractEquipGrid));
		this.setFieldValue("contractEquipOutlays", $gridstore2json(this.contractEquipOutlayGrid));
		this.setFieldValue("contractEquipCosts", $gridstore2json(this.contractEquipCostGrid));
		this.setFieldValue("contractPractiBriefs", $gridstore2json(this.contractPractiBriefGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (this.fillContent) {
				this.submitApplication(__ctxPath + "/dispatch/multiSubmitContractLease.do", resp.applyforId);
			} else {
				Ext.Msg.confirm("信息确认", (resp.msg ? resp.msg : "") + "是否填写合同明细?", function(c) {
					if (c == "yes") {
						this.contractId = resp.applyforId;
						var url = __ctxPath + "/dispatch/editContentContractLease.do?formpage=ContractSubcontract&contractId=" + this.contractId;
						window.open(url, '合同编辑', 'height=' + (window.screen.availHeight - 30) + ',width=' + (window.screen.availWidth - 10) + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
					} else {
						$request({
							url : __ctxPath + "/dispatch/multiSubmitContractLease.do",
							params : {
								ids : resp.applyforId
							},
							success : function(g, h) {
								if (this.callback) {
									this.callback.call(this);
								}
							}.createDelegate(this)
						});
					}
				}.createDelegate(this));
			}
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.contractId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadContractLease.do?contractId=" + this.contractId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.contractEquipBriefSet, this.contractEquipBriefGrid);
					this.setFormSubModuleGrid(data.contractEquipSet, this.contractEquipGrid);
					this.setFormSubModuleGrid(data.contractEquipOutlaySet, this.contractEquipOutlayGrid);
					this.setFormSubModuleGrid(data.contractEquipCostSet, this.contractEquipCostGrid);
					this.setFormSubModuleGrid(data.contractPractiBriefSet, this.contractPractiBriefGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var user = curUserInfo;
			var corp = curUserInfo.corpInfo;
			var fields = [ "department.depId", "department.depName", "userId", "userName", "fundType", "subcontract", "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan", "pbEntLinkTel" ];
			var values = [ user.depId, user.depName, user.userId, user.fullname, "1", this.subcontract, corp.corpId, RelationModule.corp.relateModule, corp.corpName, corp.dutyman, corp.dutymanTel1 ];
			this.setMultiFieldValue(fields, values);
		}
	}
});