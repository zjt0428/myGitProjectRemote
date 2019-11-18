var ContractLeasesForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable ? this.acceptable : false; // 审核功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮
	this.editsable = this.editsable; //合同修订
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	this.subcontract = "0";
	
	
	this.payable = (this.fundType == "0");
	var paContainer = null;
	var pbContainer = null;
	Ext.apply(this, {
		departmentTreeId : Ext.id(),
		qrcodePanelId : Ext.id()
	});
	if (this.payable) { // 甲方
		paContainer = new Knight.ux.RelationCompositeField({
			disabled : !this.saveable,
			readOnly : true,
			allowBlank : false,
			fieldLabel : "承租方",
			name : "contractLease.paEntName",
			relateModule : RelationModule.corp.relateModule,
			importhandler : this.importPaEntArchives.createDelegate(this)
		});
		pbContainer = new Knight.ux.RelationCompositeMenuButtonField({
			disabled : !this.saveable,
			readOnly : true,
			allowBlank : false,
			fieldLabel : "出租方",
			name : "contractLease.pbEntName",
			relations : [ {
				relation : RelationModule.corp
			}, {
				relation : RelationModule.customer
			}, {
				relation : RelationModule.supplier
			} ],
			importhandler : this.importPbRelationArchives.createDelegate(this)
		});
	} else { // 乙方
		this.fundType == "1";
		paContainer = new Knight.ux.RelationCompositeField({
			disabled : !this.saveable,
			readOnly : true,
			allowBlank : false,
			fieldLabel : "承租方",
			name : "contractLease.paEntName",
			relateModule : RelationModule.customer.relateModule,
			importhandler : this.importPaRelationArchives.createDelegate(this)
		});
		if(this.arrangeId){
			pbContainer = new Ext.form.TextField({
				maxLength : 20,
				readOnly : true,
				fieldLabel : "填报人",
				name : "contractLease.pbEntName"
			})
		}
		else{
		pbContainer = new Knight.ux.RelationCompositeField({
			disabled : !this.saveable,
			readOnly : true,
			allowBlank : false,
			fieldLabel : "出租方",
			name : "contractLease.pbEntName",
			relateModule : RelationModule.corp.relateModule,
			importhandler : this.importPbEntArchives.createDelegate(this)
		});
		}
	}
	var categoryCombo = $initComboBoxField("合同类别", "contractLease.contractCategory", "contractCategory", {
		defaultValueIndex : 0,
		editable : true,
		disabled : true
	});
	var applicableTaxRateCombo = $initComboBoxField("税率", "contractLease.applicableTaxRate", "taxRate", {
		valueField : "name",
		forceSelection : false,
		editable : true,
		allowBlank : true,
		readOnly : !this.editsable
	});
	var contractTypeCombo = $initComboBoxField("合同类型", "contractLease.contractType", "CONTRACT_TYPE", {
		allowBlank : true
	});
	var cooperationWayCombo = $initComboBoxField("合同性质", "contractLease.cooperationWay", "COOPERATION_WAY", {
		allowBlank : true
	});
	var measurementData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "measurement"
	});
	var kindWorkData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "kindWork"
	});
	var equipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listDicDetailCode.do", {
		codeId : "equipSpecific",
		limit : -1
	});
//	var taxRateData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
//		codeId : "taxRate"
//	});
	var taxRateData = $ajaxSyncCall(__ctxPath + "/system/listNamesCode.do", {
		codeId : "taxRate"
	});
//	var contractUnitData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
//		codeId : "contractUnit"
//	});
	var equipGenericData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "equipGeneric"
	});	
	var contractCostitemData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "contractCostitem"
	});
	var belongToAreaCombo = $initComboBoxField("区域", "contractLease.belongToArea", "belongToArea", {
		editable : true
	});
	var invoiceTypeCombo = $initComboBoxField("发票类型", "contractLease.invoiceType", "invoiceType", {
		editable : true,
		disabled : true
	});
	//----------------增加区域下拉列表-------------
//	this.truckCraneBelongToAreaCombo = $initComboBoxField("区域", "Q_belongToArea_S_EQ", "belongToArea", {
//		editable : true,
//		allowBlank : true
//	});
//	this.installBelongToAreaCombo = $initComboBoxField("区域", "Q_belongToArea_S_EQ", "belongToArea", {
//		editable : true,
//		allowBlank : true
//	});

	var truckCranePriceAreaBtnTopbarItems = null;
	
	if (this.saveable) {
		truckCranePriceAreaBtnTopbarItems = [{
			iconCls : "btn-search",
			text : "加载汽吊费用",
			handler : this.truckCranePriceAreaBtnSubmit.createDelegate(this)
		}];
	};
	var installPriceAreaBtnTopbarItems = null;
	if (this.saveable) {
		installPriceAreaBtnTopbarItems = [{
			iconCls : "btn-search",
			text : "加载安装费用",
			handler : this.installPriceAreaBtnSubmit.createDelegate(this)
		}];
	};
	//----------------------------------------------------------
	this.contractEquipBriefsGrid = new ContractEquipBriefsGrid({
		equipGenericData : equipGenericData,
		equipSpecificData : equipSpecificData,
		measurementData : measurementData,
		contractId : this.contractId
	}, {
		saveable : this.editsable
	});	
	this.contractInoutFreesGrid = new ContractInoutFreesGrid(null,{
		equipGenericData : equipGenericData,
		equipSpecificData : equipSpecificData,
		measurementData : measurementData,
		contractId : this.contractId,
		saveable : this.editsable
	});
	this.contractOperatorFreesGrid = new ContractOperatorFreesGrid({
		equipGenericData : equipGenericData,
		equipSpecificData : equipSpecificData,
		measurementData : measurementData,
		contractId : this.contractId,
		saveable : this.editsable
	});
	this.safetyMonitorSettleListsGrid = new SafetyMonitorSettleListsGrid({
		taxRateData : taxRateData,
		rentStandard : this.rentStandard,
		measurementData : measurementData,
		equipGenericData : equipGenericData,
		equipSpecificData : equipSpecificData,
		settleId : this.settleId,
		contractId : this.contractId,
		daysRent : this.daysRent
	}, {
		parentForm : this,
		saveable : this.editsable
	});
	this.installPriceGrid = new InstallPriceGrid({
		measurementData : measurementData,
		contractUnitData : null,
		contractId : this.contractId
	}, {
		saveable : this.editsable,
		tbarItems : installPriceAreaBtnTopbarItems
	});
	this.truckCranePriceGrid = new TruckCranePriceGrid({
		contractId : this.contractId
	}, {
		saveable : this.editsable,
		tbarItems : truckCranePriceAreaBtnTopbarItems
	});
	this.contractCostitemGrid = new ContractCostitemGrid({
		contractCostitemData : contractCostitemData,
		measurementData : measurementData,
		contractId : this.contractId
	}, {
		saveable : this.editsable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.contractId,
		relateModule : RelationModule.contractLease.relateModule,
		saveable : this.saveable
	});
	var leaseSerialData = $ajaxSyncCall(__ctxPath + "/dispatch/listSerialContractLeaseVersion.do", {
		contractId : this.contractId
	});
	this.leaseSerialCombo = $initSimpleComboBoxField("合同版本号", null, leaseSerialData);
	var tbarItems = [];
//	if(!this.saveable && this.applyforState>2 && this.applyforState<9){
//		tbarItems.push(this.leaseSerialCombo,{
//			iconCls : "btn-search",
//			text : "历史版本查询",
//			handler : this.searchForm.createDelegate(this)
//		});
//	}
	if(!this.saveable && this.applyforState>2 && this.applyforState<9 && this.editsable && this.editApproveState!="0"){
		tbarItems.push(this.leaseSerialCombo,{
			iconCls : "btn-save",
			text : "修订保存",
			handler : this.saveFormDatas.createDelegate(this)
		});
	}
//	if(!this.saveable && this.applyforState>2 && this.applyforState<9 && !this.approveVerable && this.applyable!="1"){
//		tbarItems.push({
//			iconCls : "btn-save",
//			text : "保存版本",
//			handler : this.saveVersionForm.createDelegate(this)
//		})
//	}
//	if(this.approveVerable){
//		tbarItems.push({
//			iconCls : "btn-approve",
//			text : "审批此版本",
//			handler : this.approveVersionForm.createDelegate(this)
//		})
//	}
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
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "contractLease.userName"
				}, {
					readOnly : ContractLeaseFormConfigure.contractSerialFieldReadOnly,
					fieldLabel : ContractLeaseFormConfigure.contractSerialHeader,
					emptyText:"系统自动生成",
					name : "contractLease.contractSerial"
				},{
					allowBlank : false,
					maxLength : 500,
					fieldLabel : "合同编号",
					name : "contractLease.contractNo"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id : "providedDate",
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : this.saveable,
					readOnly:true,
					fieldLabel : "填报日期",
					name : "contractLease.providedDate",
					value : new Date()
				}, {
					id : "signingTime",
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 130,
					allowBlank : false,
					editable : this.editsable,
					readOnly : true,
					fieldLabel : "签订时间",
					name : "contractLease.signingTime",
				},
			{
					readOnly : true,
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
				}, categoryCombo, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "签订地点",
					name : "contractLease.signedArea"
				}]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ paContainer, pbContainer,{
					readOnly : true,
					fieldLabel : "项目管理员",
					name : "contractLease.materialPractiName"
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "contractLease.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					maxLength : 10,
					readOnly : true,
					fieldLabel : "合同金额",
					name : "contractLease.contractAmount",
					value : 0
				}, {
					readOnly : true,
					fieldLabel : "应收款",
					name : "contractLease.debitReceivable",
					value : 0
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "承租单位负责人",
					name : "contractLease.paEntLinkMan"
				},{
					readOnly : true,
					fieldLabel : "项目编号",
					name : "contractLease.projectSerial"
				},{
					readOnly : true,
					hidden:true,
					fieldLabel : "需求总数",
					name : "contractLease.quantity"
				}, {
					xtype : "numberfield",
					maxValue : 100,
					readOnly : true,
					fieldLabel : "优惠比例",
					name : "contractLease.collectionRatio"
				}, applicableTaxRateCombo, {
					readOnly : true,
					fieldLabel : "设备总数",
					name : "contractLease.equipCount"
				}/*,belongToAreaCombo*/,invoiceTypeCombo]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
//					readOnly : false,
					fieldLabel : "承租方单位电话",
					name : "contractLease.paEntLinkTel"
				},{
					fieldLabel : "所属地",
					name : "contractLease.address"
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "票据单位",
					name : "contractLease.billUnitName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importBillUnitArchives.createDelegate(this)
				},{
					xtype : "treecombo",
					valId : this.departmentTreeId,
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "项目主管部门",
					name : "contractLease.competentDepartment",
					url : __ctxPath + "/system/listDepartment.do?opt=appUser"
				},{
					hidden : true,
					name : "contractLease.competentDepartmentId",
					id : this.departmentTreeId
				}, {
					readOnly : true,
					fieldLabel : "计税方式",
					name : "contractLease.taxMode"
				}]
			}, {
				layout : "form",
				hidden : true,
				columnWidth : this.baseWidth,
				items : [ {
					id : this.qrcodePanelId,
					xtype : "panel",
					height : 220,
					width : 270,
					html : "<img src='" + __ctxPath + "/images/qrcode.jpg' height=200 width=220/>"
				} ]
			} ]
		} ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.contractEquipBriefsGrid,this.safetyMonitorSettleListsGrid,this.contractInoutFreesGrid,this.contractOperatorFreesGrid  ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
				anchor : "85%",
				maxLength : 1000,
				maxLengthText : MoreThanMaxLength,
				xtype : "textarea",
				readOnly : true,
				fieldLabel : "备注",
				name : "contractLease.remark"
		}, fileAttachContainer ] 
	} ];
	ContractLeasesForm.superclass.constructor.call(this, {
		title : "租赁合同明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "contractLease",
			saveable : this.saveable,
			tbarItems : tbarItems,
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
			url : __ctxPath + "/dispatch/applyEditContractLease.do?contractId="+this.contractId,
			items : items,
			fieldMapping : ContractLeaseFieldMapping,
			hiddenField : ContractLeaseHiddenField
		}
	});
};
Ext.extend(ContractLeasesForm, Knight.ux.FormPanelWindow, {
	saveFormDatas : function() {
		var equipCount = 0;
		var practiCount = 0;
		for (var i = 0; i < this.contractEquipBriefsGrid.getStore().getCount(); i++) {
			var r = this.contractEquipBriefsGrid.getStore().getAt(i).data;
			equipCount += Number(r.quantity);
		}
		for (var i = 0; i < this.contractEquipBriefsGrid.getStore().getCount(); i++) {
			var r = this.contractEquipBriefsGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.quantity)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录租用数量未填写!");
				return;
			}
			if (Ext.isEmpty(r.rentStandard)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录租金标准未填写!");
				return;
			}
		}
//		for (var i = 0; i < this.installPriceGrid.getStore().getCount(); i++) {
//			var r = this.installPriceGrid.getStore().getAt(i).data;
//			equipCount++;
//		}
//		for (var i = 0; i < this.truckCranePriceGrid.getStore().getCount(); i++) {
//			var r = this.truckCranePriceGrid.getStore().getAt(i).data;
//			equipCount++;
//		}
		this.setFieldValue("equipCount", equipCount);
		this.setFieldValue("practiCount", practiCount);
		this.setFieldValue("contractEquipBriefs", $gridstore2json(this.contractEquipBriefsGrid));
		this.setFieldValue("contractInoutFrees", $gridstore2json(this.contractInoutFreesGrid));
		this.setFieldValue("contractOperatorFrees", $gridstore2json(this.contractOperatorFreesGrid));
		this.setFieldValue("installPriceSets", $gridstore2json(this.installPriceGrid));
		this.setFieldValue("truckCranePriceSets", $gridstore2json(this.truckCranePriceGrid));
		this.setFieldValue("contractCostitems", $gridstore2json(this.contractCostitemGrid));
		this.setFieldValue("safetyMonitorSettleLists", $gridstore2json(this.safetyMonitorSettleListsGrid));
		this.setFieldValue("paEntName", this.paEntName);
		this.setFieldValue("pbEntName", this.pbEntName);
//		this.setFieldValue("applicableTaxRate", this.applicableTaxRate);
//		this.setFieldValue("contractNo", this.contractNo);
//		$toast("信息操作成功！");
//		this.close();
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.close();
//			this.submitApplication(__ctxPath + "/dispatch/multiSubmitContractLease.do", resp.applyforId);
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
					this.setFieldRawValue("providedDate", data.providedDate);
					this.setFieldRawValue("signingTime", data.signingTime);
//					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
					this.setFieldRawValue("belongToArea", data.belongToAreaName);
					this.setFormSubModuleGrid(data.contractEquipBriefSet, this.contractEquipBriefsGrid);
					this.setFormSubModuleGrid(data.contractInoutFreeSet, this.contractInoutFreesGrid);
					this.setFormSubModuleGrid(data.contractOperatorFreeSet, this.contractOperatorFreesGrid);
					this.setFormSubModuleGrid(data.installPriceSet, this.installPriceGrid);
					this.setFormSubModuleGrid(data.truckCranePriceSet, this.truckCranePriceGrid);
					this.setFormSubModuleGrid(data.contractCostitemSet, this.contractCostitemGrid);
					this.setFormSubModuleGrid(data.safetyMonitorSettleListSet, this.safetyMonitorSettleListsGrid);
					var qrcodePanel = Ext.getCmp(this.qrcodePanelId);
					if (qrcodePanel) {
						qrcodePanel.body.update("<img src='" + __ctxPath + "/image-widget?method=qrcode&contents={contractId:" + data.contractId + "}' height=205 width=230/>");
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.setFormSubModuleGrid(this.data.contractArrangeEquipmentSet, this.contractEquipBriefsGrid);
			var fields = [ "department.depId", "department.depName", "userId", "userName", "fundType", "subcontract","taxModeName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.fundType, this.subcontract,this.taxModeName ];
			if (this.fundType == "0") { // 付款合同
				fields.push("paEnt", "paModule", "paEntName", "paEntLinkMan", "paEntLinkTel");
			} else { // 收款合同
				fields.push("pbEnt", "pbModule", "pbEntName", "pbEntLinkMan", "pbEntLinkTel");
			}
			if (curUserInfo.corpInfo) {
				values.push(curUserInfo.corpInfo.corpId, RelationModule.corp.relateModule, curUserInfo.corpInfo.corpName, curUserInfo.corpInfo.dutyman, curUserInfo.corpInfo.dutymanTel1);
			} else {
				values.push(null, null, null, null, null);
			}
			this.setMultiFieldValue(fields, values);
		}
		if(!Ext.isEmpty(this.arrangeId)){
			var data = this.data;
			this.setMultiFieldValue([ "paEnt", "paModule", "paEntName", "paEntLinkMan", "paEntLinkTel","quantity" ], [ data.customerId, RelationModule.customer.relateModule, data.customerName, data.linker, data.linkerTel, data.quantity]);
			this.setMultiFieldValue([ "projectId", "projectSerial", "projectName", "address", "competentDepartmentId", "competentDepartment","materialPractiId","materialPractiName"], 
					[ data.projectId, this.data1.projectSerial, data.projectName, data.projectAddress, this.data1.department.depId,this.data1.department.depName,this.data1.materialPractiId,this.data1.materialPractiName ]);

			fieldNames = [ "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan", "pbEntLinkTel"];
			values = [data.corpId, RelationModule.corp.relateModule, data.corpName , data.dutyman, data.dutymanTel1];
			this.setMultiFieldValue(fieldNames, values, true);
			this.setFieldValue("arrangeId",this.arrangeId);
//			this.findFormField("contractType").setValue(data.contractTypeName);
//			this.findFormField("cooperationWay").setValue(data.cooperationWayName);
		}
	},
	importPaEntArchives : function(data) {
		this.setMultiFieldValue([ "paEnt", "paModule", "paEntName", "paEntLinkMan", "paEntLinkTel"], [ data.corpId, RelationModule.corp.relateModule, data.corpName, data.dutyman, data.dutymanTel1 ]);
	},
	importBillUnitArchives : function(data, fields) {
		this.setMultiFieldValue([ "billUnitId", "billUnitName" ], [ data.customerId, data.customerName ]);
	},
	importPaRelationArchives : function(data) {
		fieldNames = [ "paEnt", "paModule", "paEntName", "paEntLinkMan", "paEntLinkTel" ];
		values = [ data.customerId, RelationModule.customer.relateModule, data.customerName, data.customerLinker, data.tel ];

		this.setMultiFieldValue(fieldNames, values);
	},
	importPbEntArchives : function(data) {
		this.setMultiFieldValue([ "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan", "pbEntLinkTel" ], [ data.corpId, RelationModule.corp.relateModule, data.corpName, data.dutyman, data.dutymanTel1 ]);
	},
	importPbRelationArchives : function(data, relation) {
		fieldNames = [ "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan", "pbEntLinkTel" ];
		values = [ relation.relateId, relation.relateModule, relation.relateSerial, relation.relateMen, relation.relateTel ];
		this.setMultiFieldValue(fieldNames, values, true);
	},
	importSalesmanArchives : function(data) {
		this.setMultiFieldValue([ "salesmanId", "salesman", "salesmanTel" ], [ data.practiId, data.practiName, data.mobile ]);
	},
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "projectId", "projectSerial", "projectName", "address", "cover","taxMode","competentDepartmentId", "competentDepartment","materialPractiId","materialPractiName" ], 
			[ data.projectId, data.projectSerial, data.projectName, data.address,data.cover,data.taxModeName,data.department.depId,data.department.depName,data.materialPractiId,data.materialPractiName ]);
	},
	
	//-------------增加页签查询功能-------------------
	installPriceAreaBtnSubmit : function(){
		$request({
			url : __ctxPath + "/equip/listInstallDismantlePrice.do",
			waitMsg : "正在载入数据...",
//			params : {
//				"Q_belongToArea_S_EQ" : this.installBelongToAreaCombo.getValue()
//			}, 
			success : function(b,c) {
				var data = Ext.util.JSON.decode(b.responseText);
				for(var i = 0 ;i< data.result.length;i++){
					this.installPriceGrid.addSubModuleDate(data.result[i]);
				}
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
		})
	},
	truckCranePriceAreaBtnSubmit : function() {
		$request({
			url : __ctxPath + "/equip/listTruckCranePrice.do",
			waitMsg : "正在载入数据...",
//			params : {
//				"Q_belongToArea_S_EQ" : this.truckCraneBelongToAreaCombo.getValue()
//			}, 
			success : function(b,c) {
				var data = Ext.util.JSON.decode(b.responseText);
				for(var i = 0 ;i< data.result.length;i++){
					this.truckCranePriceGrid.addSubModuleDate(data.result[i]);
				}
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
		})
	},
	searchForm : function(){
    	var result = $ajaxSyncCall(__ctxPath + "/dispatch/loadContractLeaseVersion.do", {
    		"leaseVersionId" : this.leaseSerialCombo.value,
    	});
    	var form = new ContractLeaseVersionForm(result.data[0], {
			baseWidth : 0.25,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
    	if ("0" == this.fundType) {
			form.getForm().findField("contractLease.deduct").setValue("0").setReadOnly(true);
			form.getForm().findField("contractLease.deductDesc").setReadOnly(true);
		}
		form.show();
	},
	saveVersionForm :function(){
		$baseRowAction("您确认要保存此版本的租赁合同吗？", __ctxPath + "/dispatch/saveContractLeaseVersion.do?contractId="+this.contractId, null, 
			function() {
				$toast("保存成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this)
		);
	},
	//-----------------------------------------------------
});