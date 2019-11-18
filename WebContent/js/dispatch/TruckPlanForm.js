var TruckPlanForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
//	this.equipCategoryId = Ext.id();
	this.currentDate = new Date();

	/*this.contractArrangeEquipmentGrid = new ContractArrangeEquipmentGrid(null, {
		saveable : this.saveable
	});*/
	var items = [/* {
		xtype : "hidden",
		id : this.equipCategoryId,
		name : "TruckPlan.equipCategory"
	}, */{
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
					readOnly : true,
					fieldLabel : "业务编号",
					name : "TruckPlan.truckPlanSerial"
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "承租单位",
					name : "TruckPlan.customerName",
					relateModule : RelationModule.customer.relateModule,
					fields : [ "customerId", "customerName", "projectManger", "tel" ],
					importhandler : this.importCustomerArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "出租单位",
					name : "TruckPlan.pbEntName",
					relateModule : RelationModule.corp.relateModule,
					fields : [ "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan","pbEntLinkTel" ],
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "销售人员",
					name : "TruckPlan.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					fields : [ "practiId", "practiName" ],
					importhandler : this.importSalesmanArchives.createDelegate(this)
				},{
					readOnly : true,
					fieldLabel : "填报人",
					name : "TruckPlan.userName"
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "TruckPlan.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : [ "projectId", "projectName", "projectAddress" ],
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : false,
					fieldLabel : "业务主题",
					name : "TruckPlan.truckPlanTheme"
				},{
					readOnly : true,
					fieldLabel : "承租单位负责人",
					name : "TruckPlan.projectManger"
				},{
					readOnly : true,
					fieldLabel : "出租单位负责人",
					name : "TruckPlan.pbEntLinkMan"
				},{
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : true,
					editable : false,
					fieldLabel : "签订时间 ",
					name : "TruckPlan.sigingTime",
				},{
					readOnly : true,
					fieldLabel : "项目地址",
					name : "TruckPlan.projectAddress"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "申请日期 ",
					name : "TruckPlan.providedDate",
					value : this.currentDate
				},{
					readOnly : false,
					fieldLabel : "承租方电话",
					name : "TruckPlan.userName"
				},{
					readOnly : false,
					fieldLabel : "出租方电话",
					name : "TruckPlan.tel"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : true,
					editable : false,
					fieldLabel : "预计进场时间 ",
					name : "TruckPlan.startDate",
				} ]
			} ]
		} ]
	} ];
	/*this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.contractArrangeEquipmentGrid ]
	});*/
//	items.push(this.relateTabPanel);
	TruckPlanForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "泵车计划明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		form_config : {
			labelWidth : 90,
			object : "TruckPlan",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.truckPlanId,
				relateModule : RelationModule.truckPlan.relateModule
			},
			url : __ctxPath + "/dispatch/saveTruckPlan.do",
			items : items,
			fieldMapping : TruckPlanFieldMapping,
			hiddenField : TruckPlanHiddenField
		}
	});
};
Ext.extend(TruckPlanForm, Knight.ux.FormPanelWindow, {
	importCustomerArchives : function(data, fields) {
		var linker = null;
		var tel = null;
		if (data.customerLinker) {
			linker = data.customerLinker.linker;
			tel = data.customerLinker.tel;
		}
		this.setMultiFieldValue(fields, [ data.customerId, data.customerName, data.dutyman, data.dutymanTel1 ]);
	},
	importCorpInfoArchives : function(data) {
		var fieldNames = [ "pbEnt", "pbModule", "pbEntName", "pbEntLinkMan","pbEntLinkTel" ];
		var values = [ data.corpId, RelationModule.corp.relateModule, data.corpName,data.dutyman, data.dutymanTel1 ];
		this.setMultiFieldValue(fieldNames, values);
	},
//	importCorpArchives : function(data, fields) {
//		this.setMultiFieldValue(fields, [ data.corpId, data.corpName, data.dutyman ]);
//	},
	importSalesmanArchives : function(data) {
		this.setMultiFieldValue([ "practiId", "practiName" ], [ data.practiId, data.practiName]);
	},
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName, data.address ]);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitTruckPlan.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.truckPlanId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadTruckPlan.do?truckPlanId=" + this.truckPlanId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
//					this.setFieldRawValue("province", data.provinceName);

//					this.setFormSubModuleGrid(data.contractArrangeEquipmentSet, this.contractArrangeEquipmentGrid);
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