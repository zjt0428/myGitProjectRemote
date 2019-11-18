var PractiDispatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.approveable = this.approveable;
	//=======================================================//
	var kindWorkCombo = $initComboBoxField("当前工种", "practiDispatch.kindWork", "kindWork", {
		editable : true,
		allowBlank : false,
		width : 150,
		readOnly : !this.saveable,
		disabled : !this.saveable
	});
	this.incumbentIndex = null;
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.dispatchId,
		relateModule : RelationModule.practiDispatch.relateModule,
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
						columnWidth : 1,
						defaultType : "textfield",
						items : [{
							fieldLabel : "调度编号",
							readOnly : true,
							disabled : true,
							name : "practiDispatch.dispatchSerial"
						}]
					},{
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [{
							fieldLabel : "人员姓名",
							readOnly : true,
							disabled : true,
							name : "practiDispatch.practitioner.practiName"
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
							name : "practiDispatch.practitioner.corpInfo.corpName"
						}]
					}, {
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [{
							fieldLabel : "移动电话",
							readOnly : true,
							disabled : true,
							name : "practiDispatch.practitioner.mobile"
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
							name : "practiDispatch.practitioner.department.depName"
						}]
					}]
				} ]
			}]
		}]
	},{
		xtype : "fieldset",
		title : "调度内容",
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
						columnWidth : 0.42,
						defaultType : "textfield",
						items : [{
							fieldLabel : "历史项目",
							readOnly : true,
							disabled : !this.saveable,
							width : 224,
							name : "practiDispatch.projectNameHis"
						}]
					}, {
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [{
							fieldLabel : "历史工种",
							readOnly : true,
							disabled : !this.saveable,
							name : "practiDispatch.kindWorkNameHis"
						}]
					}, {
						layout : "form",
						columnWidth : 0.28,
						defaultType : "textfield",
						items : [{
							fieldLabel : "历史班组",
							width : 120,
							readOnly : true,
							disabled : !this.saveable,
							name : "practiDispatch.teamsHis"
						}]
					}]
				} ]
			},{
				layout : "form",
				columnWidth : 1,
				items : [ {
					layout : "column",
					items : [ {
						xtype : "container",
						layout : "column",
						columnWidth : 0.42,
						anchor : "100%",
						defaultType : "textfield",
						items : [{
							xtype : "label",
							style : "padding:3px 5px 0px 54px;",
							html : "当前项目<span style='color:red'>*</span>:"
						}, {
							xtype : "textfield",
							readOnly : true,
							disabled : !this.saveable,
							allowBlank : false,
							width : 230,
							height : 24,
							name : "practiDispatch.projectName"
						}, {
							xtype : "button",
							disabled : !this.saveable,
							style : "padding:0px 0px 0px 2px;",
							autoWidth : true,
							iconCls : "btn-anchor-point",
							handler : this.importProject.createDelegate(this)
						}, {
							xtype : "button",
							disabled : !this.saveable,
							style : "padding:0px 0px 0px 2px;",
							autoWidth : true,
							iconCls : "btn-clean",
							handler : this.cleanProject.createDelegate(this)
						} ]
					}, {
						layout : "form",
						columnWidth : 0.3,
						defaultType : "textfield",
						items : [kindWorkCombo]
					}, {
						layout : "form",
						columnWidth : 0.28,
						defaultType : "textfield",
						items : [{
							fieldLabel : "当前班组",
							disabled : !this.saveable,
							width : 120,
							allowBlank : false,
							name : "practiDispatch.teams"
						}]
					} ]
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
							fieldLabel : "备注(500字以内)",
							name : "practiDispatch.remark"
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
	PractiDispatchForm.superclass.constructor.call(this, {
		title : "派工详情",
		animateTarget : this.animateTarget,
		width : 1000,
		form_config : {
			object : "practiDispatch",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractiDispatch.do",
			items : items,
			approve : {
				action : this.approveable ? this.approveable : false,
				relateId : this.dispatchId,
				relateModule : RelationModule.practiDispatch.relateModule
			},
			fieldMapping : PractiDispatchFieldMapping,
			hiddenField : PractiDispatchHiddenField
		}
	});
};
Ext.extend(PractiDispatchForm, Knight.ux.FormPanelWindow, {
	cleanProject : function() {
		this.cleanMultiField([ "projectId", "projectName" ]);
	},
	importProject : function() {
		new ProjectSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				this.setMultiFieldValue([ "projectId", "projectName" ], [ data.projectId, data.projectName ]);
			}.createDelegate(this)
		}).show();
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.dispatchId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractiDispatch.do?dispatchId=" + this.dispatchId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("practiDispatch.kindWork").setRawValue(data.kindWorkName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.setMultiFieldValue([ "practiId" ], [ this.practiId ]);
			this.getForm().findField("practiDispatch.practitioner.practiName").setValue(this.practiName);
			this.getForm().findField("practiDispatch.practitioner.corpInfo.corpName").setValue(this.corpInfo.corpName);
			this.getForm().findField("practiDispatch.practitioner.department.depName").setValue(this.department.depName);
			this.getForm().findField("practiDispatch.practitioner.mobile").setValue(this.mobile);
			this.getForm().findField("practiDispatch.projectIdHis").setValue(this.projectId);
			this.getForm().findField("practiDispatch.projectNameHis").setValue(this.projectName);
			this.getForm().findField("practiDispatch.projectId").setValue(this.projectId);
			this.getForm().findField("practiDispatch.projectName").setValue(this.projectName);
			this.getForm().findField("practiDispatch.kindWorkHis").setValue(this.kindWork);
			this.getForm().findField("practiDispatch.kindWorkNameHis").setValue(this.kindWorkName);
//			this.getForm().findField("practiDispatch.kindWork").setValue(this.kindWork);
			this.getForm().findField("practiDispatch.teamsHis").setValue(this.teams);
			this.getForm().findField("practiDispatch.teams").setValue(this.teams);
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