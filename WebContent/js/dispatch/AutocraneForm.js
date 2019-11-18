var AutocraneForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.empty = this.empty ? true : false;

	this.autocraneExpenseGrid = new AutocraneExpenseGrid(null, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.autocraneId,
		relateModule : RelationModule.autocrane.relateModule,
		saveable : this.saveable
	});
	var autocraneDependCombo = $initComboBoxField("汽车吊所属单位", "autocrane.autocraneDepend", "autocraneDepend", {
		allowBlank : false,
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
					name : "autocrane.userName"
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
					name : "autocrane.providedDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "汽吊编号",
					name : "autocrane.autocraneSerial"
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
				defaults : {
					readOnly : true
				},
				items : [ {
					readOnly : false,
					fieldLabel : "项目名称",
					name : "autocrane.project.projectName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "安装单位",
					name : "autocrane.inEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "设备编号",
					allowBlank : true,
					name : "autocrane.equipment.recordId",
					fields : [ "equipment.equipId", "equipment.exwSerial", "equipment.recordId", "equipment.equipSpecificName"],
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					fieldLabel : "汽吊费用",
					name : "autocrane.autocraneAmount",
					value : 0
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					readOnly : false,
					fieldLabel : "项目地址",
					name : "autocrane.project.address"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "使用单位",
					name : "autocrane.emEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					fieldLabel : "出厂编号",
					name : "autocrane.equipment.exwSerial"
				}, {
					fieldLabel : "已付金额",
					name : "autocrane.paymentAmount",
					value : 0
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ autocraneDependCombo, {
					readOnly : true,
					fieldLabel : "状态",
					name : "autocrane.effectiveName"
				}, {
					fieldLabel : "规格型号",
					name : "autocrane.equipment.equipSpecificName"
				}, {
					readOnly : true,
					fieldLabel : "余额",
					name : "autocrane.balanceAmount",
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
			name : "autocrane.remark"
		}, fileAttachContainer ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.autocraneExpenseGrid ]
	});
	items.push(this.relateTabPanel);
	AutocraneForm.superclass.constructor.call(this, {
		title : "汽吊管理",
		width : 960,
		height : 760,
		form_config : {
			object : "autocrane",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/saveAutocrane.do",
			items : items,
			fieldMapping : AutocraneFieldMapping,
			hiddenField : AutocraneHiddenField
		}
	});
};
Ext.extend(AutocraneForm, Knight.ux.FormPanelWindow, {
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "emEntName" ], [ data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		this.setMultiFieldValue([ "inEntName" ], [ data.corpName ]);
	},
	importEquipmentArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.equipId, data.exwSerial, data.recordId, data.equipSpecificName ]);
	},
	saveFormData : function() {
		this.setFieldValue("autocraneExpenses", $gridstore2json(this.autocraneExpenseGrid));
		this.setFieldValue("autocraneAmount", this.autocraneExpenseGrid.getTotalSummary());
		this.setFieldValue("balanceAmount", this.autocraneExpenseGrid.getTotalSummary());
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.autocraneId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadAutocrane.do?autocraneId=" + this.autocraneId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.autocraneExpenseSet, this.autocraneExpenseGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			if(!this.empty){
				var fieldNames = [ "userId", "userName", "emEntName", "inEntName", "project.projectId", "project.projectName", "project.address" ];
				var values = [ curUserInfo.userId, curUserInfo.fullname, this.contract.paEntName, this.contract.pbEntName, this.contract.projectId, this.contract.projectName, this.contract.address ];
				this.setMultiFieldValue(fieldNames, values);
			}else{
				var fieldNames = [ "userId", "userName" ];
				var values = [ curUserInfo.userId, curUserInfo.fullname];
				this.setMultiFieldValue(fieldNames, values);
			}
		}
	}
});