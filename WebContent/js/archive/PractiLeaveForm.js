var PractiLeaveForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.approveable = this.approveable;
	//=======================================================//
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.leaveId,
		relateModule : RelationModule.practiLeave.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "基础信息",
		anchor : "99%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 1,
				items : [ {
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [{
							hidden : true,
							disabled : !this.saveable,
							name : "practiLeave.practiId"
						},{
							fieldLabel : "人员姓名",
							readOnly : true,
							disabled : true,
							name : "practiLeave.practitioner.practiName"
						}]
					}, {
						layout : "form",
						columnWidth : 0.6,
						anchor : "100%",
						defaultType : "textfield",
						items : [{
							width : 400,
							fieldLabel : "所属企业",
							readOnly : true,
							disabled : true,
							name : "practiLeave.practitioner.corpInfo.corpName"
						}]
					}, {
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [{
							fieldLabel : "移动电话",
							readOnly : true,
							disabled : true,
							name : "practiLeave.practitioner.mobile"
						}]
					}, {
						layout : "form",
						columnWidth : 0.6,
						defaultType : "textfield",
						items : [{
							width : 400,
							fieldLabel : "所属部门",
							readOnly : true,
							disabled : true,
							name : "practiLeave.practitioner.department.depName"
						}]
					}, {
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [{
							fieldLabel : "从业工种",
							readOnly : true,
							disabled : true,
							name : "practiLeave.practitioner.kindWorkName"
						}]
					}, {
						layout : "form",
						columnWidth : 0.6,
						defaultType : "textfield",
						items : [{
							xtype : "datefield",
							width : 130,
							editable : false,
							allowBlank : false,
							format : "Y-m-d",
							fieldLabel : "离职时间",
							disabled : !this.saveable,
							name : "practiLeave.leaveTime"
						}]
					}]
				} ]
			}]
		}]
	},{
		xtype : "fieldset",
		title : "其他信息",
		anchor : "99%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 1,
				items : [ {
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 1,
						defaultType : "textfield",
						items : [{
							xtype : "textarea",
							anchor : "95%",
							maxLength : 128,
							height : 45,
							disabled : !this.saveable,
							fieldLabel : "离职原因(500字以内)",
							name : "practiLeave.remark"
						}]
					}]
				} ]
			},{
				layout : "form",
				columnWidth : 1,
				items : [ {
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 1,
						defaultType : "textfield",
						items : [fileAttachContainer]
					}]
				} ]
			}]
		}]
	}];
	PractiLeaveForm.superclass.constructor.call(this, {
		title : "人员离职详情",
		width : 1000,
		form_config : {
			object : "practiLeaveForm",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractiLeave.do",
			items : items,
			fieldMapping : PractiLeaveFieldMapping,
			hiddenField : PractiLeaveHiddenField
		}
	});
};
Ext.extend(PractiLeaveForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.leaveId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractiLeave.do?leaveId=" + this.leaveId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("practiLeave.practitioner.kindWork").setRawValue(data.practitioner.kindWorkName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			
			this.getForm().findField("practiLeave.practitioner.practiName").setValue(this.practiName);
			this.getForm().findField("practiLeave.practitioner.corpInfo.corpName").setValue(this.corpInfo.corpName);
			this.getForm().findField("practiLeave.practitioner.department.depName").setValue(this.department.depName);
			this.getForm().findField("practiLeave.practitioner.mobile").setValue(this.mobile);
			this.getForm().findField("practiLeave.practitioner.kindWorkName").setValue(this.kindWorkName);
			this.getForm().findField("practiLeave.practiId").setValue(this.practiId);
		}
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function(c, e) {
				$toast("成功保存信息！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}else{
			$toast("请检查数据是否完整且正确！");
		}
	}
});