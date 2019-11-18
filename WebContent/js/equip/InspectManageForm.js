var InspectManageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.inspectId,
		relateModule : RelationModule.inspectManage.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报信息",
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
					fieldLabel : "填报人",
					name : "inspectManage.userName"
				}, {
					fieldLabel : "巡检项目",
					name : "inspectManage.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "inspectManage.providedDate"
				}, {
					fieldLabel : "巡检人员",
					name : "inspectManage.inspectPepoles"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "巡检时间",
					name : "inspectManage.inspectDate"
				}, {
					fieldLabel : "巡检结果",
					name : "inspectManage.inspectResultName"
				} ]
			} ]
		}, {
			xtype : "textfield",
			allowBlank : false,
			anchor : "95%",
			fieldLabel : "巡检内容",
			name : "inspectManage.remark"
		}, fileAttachContainer ]
	} ];

	InspectManageForm.superclass.constructor.call(this, {
		title : "安全巡检明细",
		animateTarget : this.animateTarget,
		width : 764,
		height : 250,
		form_config : {
			labelWidth : 90,
			object : "inspectManage",
			saveable : false,
			items : items,
			fieldMapping : InspectManageFieldMapping,
			hiddenField : InspectManageHiddenField
		}
	});
};
Ext.extend(InspectManageForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.inspectId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadInspectManage.do?inspectId=" + this.inspectId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if (data.longitude && data.latitude) {
						this.mapPanel = new Knight.ux.BaiduMapPanel({
							anchor : "98%",
							title : "地理位置",
							longitude : data.longitude,
							latitude : data.latitude
						});
						this.formPanel.add(this.mapPanel);
						this.setHeight(this.getHeight() + 500);
						this.doLayout();
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});