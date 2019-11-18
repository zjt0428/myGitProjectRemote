var IndisNoticeForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.noticeId,
		relateModule : this.relateModule,
		saveable : this.saveable
	});

	this.indisNoticePractiGrid = new IndisNoticePractiGrid({
		noticeId : this.noticeId
	}, {
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					fieldLabel : this.relateModule == RelationModule.equipInstall.relateModule ? "安装工程合同号" : "拆卸工程合同号",
					name : "indisNotice.contractNumber"
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "indisNotice.indisSchema.equipment.recordId",
					value : this.indisSchema.equipment.recordId
				}, {
					readOnly : true,
					fieldLabel : "企业名称",
					name : "indisNotice.indisSchema.inEntName",
					value : this.indisSchema.inEntName
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "计划安装日期",
					name : "indisNotice.plannedDate",
					value : new Date()
				}, {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : this.relateModule == RelationModule.equipInstall.relateModule ?"安装告知作业日期":"拆卸告知作业日期",
					name : "indisNotice.workDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "型号",
					name : "indisNotice.indisSchema.equipment.equipSpecificName",
					value : this.indisSchema.equipment.equipSpecificName
				}, {
					readOnly : true,
					fieldLabel : "企业资质等级",
					name : "indisNotice.indisSchema.inEntTitleLevel",
					value : this.indisSchema.inEntTitleLevel
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "方案编号",
					name : "indisNotice.indisSchema.schemaSerial",
					value : this.indisSchema.schemaSerial
				}, {
					readOnly : true,
					fieldLabel : "工地自编号",
					name : "indisNotice.indisSchema.blockNumber"
				}, {
					readOnly : true,
					fieldLabel : "企业资质证号",
					name : "indisNotice.indisSchema.inEntCertNum",
					value : this.indisSchema.inEntCertNum
				} , {
					readOnly : false,
					fieldLabel : "告知受理号",
					name : "acceptNumber"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "indisNotice.indisSchema.project.projectName",
					value : this.indisSchema.project.projectName
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "92%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "indisNotice.indisSchema.project.address",
					value : this.indisSchema.project.address
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			fieldLabel : "备注",
			name : "indisNotice.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.indisNoticePractiGrid ]
	} ];
	IndisNoticeForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			object : "indisNotice",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveIndisNotice.do",
			items : items,
			fieldMapping : IndisNoticeFieldMapping,
			hiddenField : IndisNoticeHiddenField
		}
	});
};
Ext.extend(IndisNoticeForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("indisNoticePractis", $gridstore2json(this.indisNoticePractiGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.noticeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadIndisNotice.do?noticeId=" + this.noticeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.indisNoticePractiSet, this.indisNoticePractiGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.setFormSubModuleGrid(this.indisSchema.indisSchemaPractiSet, this.indisNoticePractiGrid);
			var fieldNames = [ "schemaId", "relateModule" ];
			var values = [ this.indisSchema.schemaId, this.relateModule ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});