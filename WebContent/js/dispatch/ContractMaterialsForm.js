var ContractMaterialsForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? this.saveable : false; // 保存/重置功能按钮
	this.acceptable = this.acceptable ? this.acceptable : false; // 审核功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.25;
	Ext.apply(this, {
		qrcodePanelId : Ext.id()
	});
	var categoryCombo = $initComboBoxField("合同类别", "contractMaterials.contractCategory", "contractCategory", {
		defaultValueIndex : 2,
		editable : true
	});
	var tranportCaculateTypeCombo = $initComboBoxField("计费方式", "contractMaterials.tranportCaculateType", "TRANPORT_CACULATE_TYPE", {
		defaultValueIndex : 0,
		editable : true
	});
	var taxCaculateTypeCombo = $initComboBoxField("计税方式", "contractMaterials.taxCaculateType", "TAX_CACULATE_TYPE", {
		editable : true
	});
	var appRoleData = $ajaxSyncCall(__ctxPath + "/system/comboListAppRole.do", {
		"Q_roleId_L_NEQ" : -1
	});
	this.materialsDetailGrid = new MaterialsDetailGrid({
		saveable : this.saveable
	});
	var priceSettingBtnItems = null;
	var matDamageBtnItems = null;
	var costHandleBtnItems = null;
	var compensationScrapBtnItems = null;
	if (this.saveable) {
		priceSettingBtnItems = [this.materialsDetailGrid,{
			iconCls : "btn-search",
			text : "加载价格设定",
			handler : this.priceSettingBtnSubmit.createDelegate(this)
		}];
	}
	if (this.saveable) {
		matDamageBtnItems = [this.materialsDetailGrid,{
			iconCls : "btn-search",
			text : "加载损坏赔偿",
			handler : this.matDamageBtnSubmit.createDelegate(this)
		}];
	}
	if (this.saveable) {
		costHandleBtnItems = [this.materialsDetailGrid,{
			iconCls : "btn-search",
			text : "加载费用处理",
			handler : this.costHandleBtnSubmit.createDelegate(this)
		}];
	}
	if (this.saveable) {
		compensationScrapBtnItems = [this.materialsDetailGrid,{
			iconCls : "btn-search",
			text : "加载报废赔偿",
			handler : this.compensationScrapBtnSubmit.createDelegate(this)
		}];
	}
	this.priceSettingGrid = new PriceSettingGrid(null,{
		saveable : this.saveable,
		tbarItems : priceSettingBtnItems
	});
	this.matDamageGrid = new MatDamageGrid(null,{
		saveable : this.saveable,
		tbarItems : matDamageBtnItems
	});
	this.costHandleGrid = new CostHandleGrid(null,{
		saveable : this.saveable,
		tbarItems : costHandleBtnItems
	});
	this.compensationScrapGrid = new CompensationScrapGrid(null,{
		saveable : this.saveable,
		tbarItems : compensationScrapBtnItems
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.contractmaId,
		relateModule : RelationModule.contractMaterials.relateModule,
		saveable : this.saveable
	});
	var items = [ {
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
				items : [ {
					readOnly : true,
					fieldLabel : "状态",
					name : "contractMaterials.applyforStateName"
				},{
					xtype : "textarea",
					anchor : "95%",
					maxLength : 50,
					height : 24,
					allowBlank : true,
					readOnly : false,
					maxLengthText : MoreThanMaxLength,
					fieldLabel : "合同主题",
					name : "contractMaterials.contractTheme"
				},{
					allowBlank : false,
					fieldLabel : "合同编号",
					name : "contractMaterials.contractSerial",
				},{
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "contractMaterials.projectName",
				},{
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "签订日期",
					name : "contractMaterials.sigingTime",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同流水号",
					name : "contractMaterials.contractNumber"
				}, categoryCombo, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "承租方",
					name : "contractMaterials.paEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importPaRelationArchives.createDelegate(this)
				}, {
					hidden : true,
					readOnly : false,
					fieldLabel : "承租单位负责人",
					name : "contractMaterials.paEntLinkMan"
				}, {
					xtype : "textarea",
					anchor : "95%",
					maxLength : 50,
					height : 24,
					readOnly : false,
					maxLengthText : MoreThanMaxLength,
					fieldLabel : "工地地址",
					name : "contractMaterials.address"
				},tranportCaculateTypeCombo ]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [{
					readOnly : true,
					allowBlank : false,
					fieldLabel : "工程类别",
					name : "contractMaterials.projectTypeName",
				}, {
					xtype : "treecombo",
					maxLength : 32,
					readOnly : false,
					allowBlank : true,
					fieldLabel : "项目主管部门",
					name : "contractMaterials.competentDepartment",
					url : __ctxPath + "/system/listDepartment.do"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "出租方",
					name : "contractMaterials.pbEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importPbEntArchives.createDelegate(this)
				}, {
					hidden : true,
					readOnly : false,
					fieldLabel : "出租单位负责人",
					name : "contractMaterials.pbEntLinkMan"
				}, taxCaculateTypeCombo , {
					fieldLabel : "建筑面积",
					name : "contractMaterials.buildingArea"
				}]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					hidden : true,
					readOnly : false,
					fieldLabel : "运费",
					name : "contractMaterials.freight"
				},{
					readOnly : true,
					allowBlank : false,
					fieldLabel : "资产属性",
					name : "contractMaterials.assetsPropertyName",
				}, {
					readOnly : false,
					fieldLabel : "租金优惠比例",
					name : "contractMaterials.rentalRate"
				}, {
					hidden : true,
					readOnly : false,
					fieldLabel : "预收款",
					name : "contractMaterials.preReceivable"
				}, {
					hidden : true,
					readOnly : false,
					fieldLabel : "合同金额",
					name : "contractMaterials.contractAmount"
				}, {
					hidden : true,
					readOnly : false,
					fieldLabel : "审定金额",
					name : "contractMaterials.validationAmount"
				}, {
					readOnly : false,
					fieldLabel : "已收款金额",
					name : "contractMaterials.finReceivableAmount"
				}, {
					readOnly : false,
					fieldLabel : "已结算金额",
					name : "contractMaterials.finSettingAmount"
				}, {
					readOnly : false,
					fieldLabel : "适用税率",
					name : "contractMaterials.taxRate"
				}]
			}, {
				layout : "form",
				hidden : this.saveable,
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
	},{
		xtype : "fieldset",
		title : "授权账号（选填）",
		anchor : "98%",
//		hidden : !this.saveable,
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					allowBlank : true,
					fieldLabel : "账号",
					name : "appUser.username"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					width : 120,
					allowBlank :true,
					fieldLabel : "用户名",
					name : "appUser.fullname"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					allowBlank : true,
					fieldLabel : "移动电话",
					name : "appUser.mobile"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					xtype : "simplecombo",
					width : 130,
					readOnly : false,
					editable : false,
					codeData : appRoleData,
					fieldLabel : "角色选择",
					hiddenName : "appRole.roleId",
					name : "appRole.roleName"
				} ]
			} ]
		} ]
	},{
		xtype : "fieldset",
		collapsible : true,
		title : "页签",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			layout : "anchor",
			items : [{
				items : [ this.materialsDetailGrid ]
			}]
			}
        ] 
	} ];
	var remarks ={
		xtype : "fieldset",
		title : "页签",
		collapsible : true,
		anchor : "98%",
		labelWidth : 30,
		items : [ {
			anchor : "85%",
			maxLength : 1000,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "contractMaterials.remark"
		}, fileAttachContainer ] 
	};
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.priceSettingGrid,this.matDamageGrid,this.compensationScrapGrid,this.costHandleGrid ]
	});
	items.push(this.relateTabPanel);
	items.push(remarks);
	ContractMaterialsForm.superclass.constructor.call(this, {
		title : "周材合同明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "contractMaterials",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.contractmaId,
				relateModule : RelationModule.contractMaterials.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.contractmaId,
				relateModule : RelationModule.contractMaterials.relateModule
			},
			url : __ctxPath + "/dispatch/saveContractMaterials.do",
			items : items,
			fieldMapping : ContractMaterialsFieldMapping,
			hiddenField : ContractMaterialsHiddenField
		}
	});
};
Ext.extend(ContractMaterialsForm, Knight.ux.FormPanelWindow, {
	importPaRelationArchives : function(data) {
		this.setMultiFieldValue([ "paEnt", "paModule", "paEntName", "paEntLinkMan" ], [ data.customerId, RelationModule.customer.relateModule, data.customerName, data.customerLinker]);
	},
	importPbEntArchives : function(data) {
		this.setMultiFieldValue([ "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan" ], [ data.corpId, RelationModule.corp.relateModule, data.corpName, data.dutyman ]);
	},
	priceSettingBtnSubmit : function() {
		var mr = this.materialsDetailGrid.getStore();
		var mrd = mr.data.items;
		for(var j = 0; j<mrd.length;j++){
			$request({
				url : __ctxPath + "/materials/listMaterialsSpecifications.do?limit=1000",
				waitMsg : "正在载入数据...",
				params : {
					"Q_materialsCommodity.commodity_S_EQ" : mrd[j].data.commodity
				}, 
				success : function(b,c) {
					var data = Ext.util.JSON.decode(b.responseText);
					for(var i = 0 ;i< data.result.length;i++){
						this.priceSettingGrid.addSubModuleDate(data.result[i]);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		}
	},
	matDamageBtnSubmit : function() {
		var mr = this.materialsDetailGrid.getStore();
		var mrd = mr.data.items;
		for(var j = 0; j<mrd.length;j++){
			$request({
				url : __ctxPath + "/materials/listMaterialsDamage.do?limit=1000",
				waitMsg : "正在载入数据...",
				params : {
					"Q_materialsCommodity.commodity_S_EQ" :mrd[j].data.commodity
				}, 
				success : function(b,c) {
					var data = Ext.util.JSON.decode(b.responseText);
					for(var i = 0 ;i< data.result.length;i++){
						this.matDamageGrid.addSubModuleDate(data.result[i]);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		}
	},
	costHandleBtnSubmit : function() {
		var mr = this.materialsDetailGrid.getStore();
		var mrd = mr.data.items;
		for(var j = 0; j<mr.modified.length;j++){
			$request({
				url : __ctxPath + "/materials/listAssembleAndDisassembleFee.do?limit=1000",
				waitMsg : "正在载入数据...",
				params : {
					"Q_materialsCommodity.commodity_S_EQ" : mrd[j].data.commodity
				}, 
				success : function(b,c) {
					var data = Ext.util.JSON.decode(b.responseText);
					for(var i = 0 ;i< data.result.length;i++){
						this.costHandleGrid.addSubModuleDate(data.result[i]);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		}
	},
	compensationScrapBtnSubmit : function() {
		var mr = this.materialsDetailGrid.getStore();
		var mrd = mr.data.items;
		for(var j = 0; j<mr.modified.length;j++){
			$request({
				url : __ctxPath + "/materials/listMaterialsScrap.do?limit=1000",
				waitMsg : "正在载入数据...",
				params : {
					"Q_materialsCommodity.commodity_S_EQ" : mrd[j].data.commodity
				}, 
				success : function(b,c) {
					var data = Ext.util.JSON.decode(b.responseText);
					for(var i = 0 ;i< data.result.length;i++){
						this.compensationScrapGrid.addSubModuleDate(data.result[i]);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		}
	},
	saveFormData : function() {
		var usernameField = this.getForm().findField("appUser.username");
		var username = usernameField.getValue();
		if(username!="") {
			var fullname = this.getForm().findField("appUser.fullname").getValue();
			if(fullname=="") {
				$toast("如果要关联账号，用户名不能为空");
				return;
			}
			$request({
				async : true,
				url : __ctxPath + "/system/findByUserNameAppUser.do",
				params : {
					username : username
				},
				success : function(b) {
					if(b.responseText.indexOf("AppUser")!=-1){
						Ext.Msg.confirm("提示","账号已经存在，是否将合同关联至此账号？",function(e) {
							if(e=="no"){
								usernameField.reset();
								return;
							}
						});
					}
				}
			});
		}
		this.setFieldValue("materialsDetails", $gridstore2json(this.materialsDetailGrid));
		this.setFieldValue("priceSettings", $gridstore2json(this.priceSettingGrid));
		this.setFieldValue("matDamages", $gridstore2json(this.matDamageGrid));
		this.setFieldValue("costHandles", $gridstore2json(this.costHandleGrid));
		this.setFieldValue("compensationScraps", $gridstore2json(this.compensationScrapGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitContractMaterials.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.contractmaId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadContractMaterials.do?contractmaId=" + this.contractmaId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];		
					this.setFormSubModuleGrid(data.materialsDetailSet, this.materialsDetailGrid);
					this.setFormSubModuleGrid(data.priceSettingSet, this.priceSettingGrid);
					this.setFormSubModuleGrid(data.matDamageSet, this.matDamageGrid);
					this.setFormSubModuleGrid(data.costHandleSet, this.costHandleGrid);
					this.setFormSubModuleGrid(data.compensationScrapSet, this.compensationScrapGrid);
					var qrcodePanel = Ext.getCmp(this.qrcodePanelId);
					if (qrcodePanel) {
						qrcodePanel.body.update("<img src='" + __ctxPath + "/image-widget?method=qrcode&contents={contractmaId:" + data.contractmaId + "}' height=205 width=230/>");
					}
//					if(data.grantedUserId!=null) {
//						var appUserData = $ajaxSyncCall(__ctxPath + "/system/getAppUser.do",{userId : data.grantedUserId});
//						var rolesData = $ajaxSyncCall(__ctxPath + "/system/selectedRolesAppUser.do",{userId : data.grantedUserId});
//						var grantedUser = appUserData.data[0];
//						var role = rolesData[0];
//						if(grantedUser!=null) {
//							this.getForm().findField("appUser.username").setValue(grantedUser.username);
//							this.getForm().findField("appUser.fullname").setValue(grantedUser.fullname);
//							this.getForm().findField("appUser.mobile").setValue(grantedUser.mobile);
//							this.getForm().findField("appRole.roleId").setValue(role[0]);
//						}
//					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} 
		if(Ext.isEmpty(this.data1)){
			return;
		}else{
			if(!Ext.isEmpty(this.data1.materialsPlanId)){
				var data = this.data1;				
				var fileds = ["assetsProperty","assetsPropertyName","projectType","projectTypeName"];
				var values = [ data.assetsProperty, data.assetsPropertyName,data.projectType,data.projectTypeName ];
				this.setMultiFieldValue(fileds, values);
				this.setMultiFieldValue([ "projectId", "projectName", "address" ], [ data.projectId, data.projectName, data.address ]);
			}
	    }
	}	
});