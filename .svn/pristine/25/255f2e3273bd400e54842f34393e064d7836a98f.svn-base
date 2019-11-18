var EquipHitchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.hitchId,
		relateModule : RelationModule.equipHitch.relateModule,
		saveable : this.saveable
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
					maxLength : 20,
					readOnly : true,
					hidden : !this.handleable,
					fieldLabel : "填报人",
					name : "equipHitch.userName"
				}, {
					readOnly : true,
					fieldLabel : "故障单号",
					name : "equipHitch.hitchSerial"
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
					hidden : !this.handleable,
					fieldLabel : "填报日期",
					name : "equipHitch.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					maxLength : 24,
					fieldLabel : "关联业务",
					name : "equipHitch.relateModuleName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					hidden : !this.handleable,
					fieldLabel : "填报部门",
					name : "equipHitch.department.depName"
				}, {
					readOnly : true,
					maxLength : 24,
					fieldLabel : "业务编号",
					name : "equipHitch.relateSerial"
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
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "equipHitch.project.projectName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					readOnly : this.handleable,
					allowBlank : false,
					editable : false,
					fieldLabel : "发生时间",
					name : "equipHitch.spendDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "equipHitch.equipment.recordId"
				}, {
					readOnly : this.handleable,
					fieldLabel : "故障/隐患结果",
					name : "equipHitch.hitchResult"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "equipHitch.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "故障部位",
					name : "equipHitch.location"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			height : 48,
			readOnly : this.handleable,
			fieldLabel : "故障隐患说明",
			name : "equipHitch.description"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			height : 48,
			readOnly : true,
			fieldLabel : "故障内容",
			name : "equipHitch.location"
		}, {
			xtype : "textarea",
			readOnly : this.handleable,
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			height : 48,
			fieldLabel : "备注",
			name : "equipHitch.remark"
		} ]
	}, {
		xtype : "fieldset",
		title : "处理结果",
		anchor : "98%",
		collapsible : true,
		hidden : this.altereable,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : !this.handleable,
					fieldLabel : "处理时间",
					name : "equipHitch.handleDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : !this.handleable,
					fieldLabel : "处理结果",
					name : "equipHitch.handleResult"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					allowBlank : !this.handleable,
					fieldLabel : "处理人员",
					name : "equipHitch.handleMans"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			allowBlank : !this.handleable,
			maxLengthText : MoreThanMaxLength,
			height : 48,
			fieldLabel : "处理说明",
			name : "equipHitch.handleDescription"
		} ]
	}, fileAttachContainer ];
	EquipHitchForm.superclass.constructor.call(this, {
		title : "故障信息明细",
		width : 890,
		height : 480,
		form_config : {
			labelWidth : 100,
			object : "equipHitch",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.hitchId,
				relateModule : RelationModule.equipHitch.relateModule
			},
			url : this.url ? this.url : __ctxPath + "/equip/saveEquipHitch.do",
			items : items,
			fieldMapping : EquipHitchFieldMapping,
			hiddenField : EquipHitchHiddenField
		}
	});
};
Ext.extend(EquipHitchForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (this.handleable) {
				this.submitApplication(__ctxPath + "/equip/multiSubmitEquipHitch.do", resp.applyforId);
				return;
			}
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.hitchId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipHitch.do?hitchId=" + this.hitchId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});