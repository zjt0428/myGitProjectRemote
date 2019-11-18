var ContractArrangeForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.equipCategoryId = Ext.id();
	this.currentDate = new Date();

	var provinceCombo = $initComboBoxField("所属省份", "contractArrange.province", "province", {
		editable : true,
		readOnly : !this.saveable
	});
	var equipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "equipSpecific"
	})
	this.equipSpecificData = equipSpecificData;
	var equipGenericData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "equipGeneric"
	});
	var contractTypeCombo = $initComboBoxField("合同类型", "contractArrange.contractType", "CONTRACT_TYPE", {
		defaultValueIndex : 0,
		allowBlank : true
		
	});
	var cooperationWayCombo = $initComboBoxField("合作方式", "contractArrange.cooperationWay", "COOPERATION_WAY", {
		defaultValueIndex : 0,
		allowBlank : true
	});
	this.contractArrangeEquipmentGrid = new ContractArrangeEquipmentGrid(null, {
		equipSpecificData : equipSpecificData,
		equipGenericData : equipGenericData,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "hidden",
		id : this.equipCategoryId,
		name : "contractArrange.equipCategory"
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
					name : "contractArrange.userName"
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
					name : "contractArrange.providedDate",
					value : this.currentDate
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "业务申请编号",
					name : "contractArrange.arrangeSerial"
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
					fieldLabel : "项目名称",
					name : "contractArrange.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : [ "projectId", "projectName", "projectAddress","unCustomName" ],
					importhandler : this.importProjectArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "承租单位",
					name : "contractArrange.customerName",
					relateModule : RelationModule.customer.relateModule,
					fields : [ "customerId", "customerName", "customerAddress", "linker", "linkerTel" ],
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "所属公司",
					name : "contractArrange.corpName",
					relateModule : RelationModule.corp.relateModule,
					fields : [ "corpId", "corpName", "dutyman" ],
					importhandler : this.importCorpArchives.createDelegate(this)
				}, /*{
					xtype : "treecombo",
					readOnly : !this.saveable,
					valId : this.equipCategoryId,
					allowBlank : false,
					width : 130,
					fieldLabel : "设备类别",
					url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
					name : "contractArrange.equipCategoryName"
				},*/ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "安装单位",
					name : "contractArrange.inEntName",
					relateModule : RelationModule.corp.relateModule,
					fields : [ "inEnt", "inEntModule", "inEntName", "inEntCertNum","inEntTitleLevel" ],
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				},{
					fieldLabel : "安拆资质证书号",
					name : "contractArrange.inEntCertNum"
				}, {
					fieldLabel : "资质等级",
					name : "contractArrange.inEntTitleLevel"
				}/*, {
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "建筑物高度(米)",
					name : "contractArrange.verallHeight"
				}*/ ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "客户地址",
					name : "contractArrange.customerAddress"
				}, {
					fieldLabel : "公司负责人",
					name : "contractArrange.dutyman"
				}, {
					xtype : "numberfield",
					decimalPrecision : 0,
					fieldLabel : "需求数量",
					name : "contractArrange.quantity",
					allowBlank:false
				}, {
					fieldLabel : "项目地址",
					name : "contractArrange.projectAddress"
				}, {
					fieldLabel : "工程现状",
					name : "contractArrange.projectStatus"
				},contractTypeCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "客户联系人",
					name : "contractArrange.linker"
				}, {
					fieldLabel : "联系电话",
					name : "contractArrange.linkerTel"
				}, provinceCombo, {
					fieldLabel : "项目工期",
					name : "contractArrange.projectTimeLimit"
				}, {
					id : "contractArrange_startDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "预计进场时间 ",
					name : "contractArrange.startDate",
					value : this.currentDate
				},cooperationWayCombo ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.contractArrangeEquipmentGrid ]
	});
	items.push(this.relateTabPanel);
	ContractArrangeForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "业务申请明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		form_config : {
			labelWidth : 90,
			object : "contractArrange",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.arrangeId,
				relateModule : RelationModule.contractArrange.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.arrangeId,
				relateModule : RelationModule.contractArrange.relateModule
			},
			url : __ctxPath + "/dispatch/saveContractArrange.do",
			items : items,
			fieldMapping : ContractArrangeFieldMapping,
			hiddenField : ContractArrangeHiddenField
		}
	});
};
Ext.extend(ContractArrangeForm, Knight.ux.FormPanelWindow, {
	importCustomerArchives : function(data, fields) {
		var linker = null;
		var tel = null;
		if (data.customerLinker) {
			linker = data.customerLinker.linker;
			tel = data.customerLinker.tel;
		}
		this.setMultiFieldValue(fields, [ data.customerId, data.customerName, data.address, linker, tel ]);
	},
	importCorpInfoArchives : function(data) {
		var fieldNames = [ "inEnt", "inEntModule", "inEntName", "inEntCertNum","inEntTitleLevel" ];
		var values = [ data.corpId, RelationModule.corp.relateModule, data.corpName,data.corpCert ? data.corpCert.certNum : "" ,data.certLevel ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importCorpArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.corpId, data.corpName, data.dutyman ]);
	},
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName, data.address, data.unCustomName]);
		var fieldNames = [ "customerId", "customerName", "customerAddress", "linker", "linkerTel" ];
		var values = [  data.unCustomId, data.unCustomName ,null,data.unCustomLinker,data.unCustomLinkTel ];
		this.setMultiFieldValue( fieldNames,values);
		this.setFieldValue("province",data.province);
	},
	saveFormData : function() {
		var gridCount = this.contractArrangeEquipmentGrid.getStore().getCount();
		if(gridCount<1) {
			$toast("未关联设备，无法保存！");
			return;
		}
		var gridStore = this.contractArrangeEquipmentGrid.getStore();
		for(var i=0; i<gridCount; i++) {
			var equipSpecificName = gridStore.getAt(i).data.equipSpecificName;
			if(this.equipSpecificData != null && this.equipSpecificData.length>0) {
				var bl = false;
				for(var j=0; j<this.equipSpecificData.length; j++) {
					if(equipSpecificName == this.equipSpecificData[j][1]){
						bl = true;
					}
				}
				if(!bl) {
					$toast("设备型号"+equipSpecificName+"在代码词典中不存在，请先前往添加");
					return;
				}
			}
		}
		this.setFieldValue("contractArrangeEquipments", $gridstore2json(this.contractArrangeEquipmentGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitContractArrange.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.arrangeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadContractArrange.do?arrangeId=" + this.arrangeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("province", data.provinceName);

					this.setFormSubModuleGrid(data.contractArrangeEquipmentSet, this.contractArrangeEquipmentGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName", "arrangeType" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname, "0" ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});