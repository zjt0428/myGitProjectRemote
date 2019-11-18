var ApplyMakeForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var assetsPropertyCombo = $initComboBoxField("资产属性", "applyMake.assetsProperty", "assetsProperty", {
		editable : true,
		width : 147,
		readOnly : !this.saveable,
		allowBlank : false,
		defaultValueIndex : 1
	});
	var storeResultData = $ajaxSyncCall(__ctxPath + "/materials/listBaseDepotPermission.do", {
		Q_userId_L_EQ : curUserInfo.userId,
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.applyMakeId,
		relateModule : RelationModule.applyMake.relateModule,
		saveable : this.saveable
	});
	this.productMakeGrid = new ProductMakeGrid(null, {
		saveable : this.saveable
	});
	var items = [{
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
					fieldLabel : "制作单号",
					emptyText:"系统自动生成",
					name : "applyMake.makeSerial"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 147,
					allowBlank : false,
					editable : false,
					fieldLabel : "申请日期 ",
					name : "applyMake.makeDate",
					value : new Date()
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 147,
					allowBlank : true,
					editable : false,
					fieldLabel : "计划开始时间 ",
					name : "applyMake.startDate",
					value : new Date()
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 147,
					allowBlank : true,
					editable : false,
					fieldLabel : "计划完成时间 ",
					name : "applyMake.completeDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "制作主题",
					name : "applyMake.makeTheme"
				}, {
					fieldLabel : "审批人",
					name : "applyMake.approveMan"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 147,
					editable : false,
					readOnly : true,
					fieldLabel : "审批时间 ",
					name : "applyMake.approveDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "申请人",
					name : "applyMake.makeMan"
				},{
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "仓库名称",
					name : "applyMake.storeName",
					relateModule : RelationModule.baseDepotJoinUser.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importBaseDepotArchives.createDelegate(this)
				
				}, assetsPropertyCombo ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.productMakeGrid ]
	});
	var remarks = {
			xtype : "fieldset",
			anchor : "98%",
			labelWidth : 30,
			items : [ {
					anchor : "85%",
					maxLength : 1000,
					maxLengthText : MoreThanMaxLength,
					xtype : "textarea",
					fieldLabel : "备注",
					name : "applyMake.remark"
			}, fileAttachContainer ] 
		};
	items.push(this.relateTabPanel);
	items.push(remarks);
	ApplyMakeForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "制作申请明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		form_config : {
			labelWidth : 90,
			object : "applyMake",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.applyMakeId,
				relateModule : RelationModule.applyMake.relateModule
			},
			url : __ctxPath + "/daily/saveApplyMake.do",
			items : items,
			fieldMapping : ApplyMakeFieldMapping,
			hiddenField : ApplyMakeHiddenField
		}
	});
};
Ext.extend(ApplyMakeForm, Knight.ux.FormPanelWindow, {
	importBaseDepotArchives : function(data) {
		this.setMultiFieldValue(["storeId","storeName" ], [ data.depotId,data.depotName ]);
	},
	saveFormData : function() {
		this.setFieldValue("productMakes", $gridstore2json(this.productMakeGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/daily/multiSubmitApplyMake.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.applyMakeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/daily/loadApplyMake.do?applyMakeId=" + this.applyMakeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);

					this.setFormSubModuleGrid(data.productMakeSet, this.productMakeGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "makeMan" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});