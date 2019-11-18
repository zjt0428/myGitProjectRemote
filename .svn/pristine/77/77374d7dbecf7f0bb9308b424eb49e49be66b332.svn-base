var DismantleManageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.dismantleId,
		relateModule : RelationModule.dismantleManage.relateModule,
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
					name : "dismantleManage.userName"
				}, {
					fieldLabel : "备案编号",
					name : "dismantleManage.recordId"
				}, {
					fieldLabel : "拆卸高度",
					name : "dismantleManage.dismantleHeight"
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
					name : "dismantleManage.providedDate"
				}, {
					fieldLabel : "安装项目",
					name : "dismantleManage.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "进场时间",
					name : "dismantleManage.startinDate"
				}, {
					fieldLabel : "退场时间",
					name : "dismantleManage.endinDate"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];

	DismantleManageForm.superclass.constructor.call(this, {
		title : "安装管理明细",
		animateTarget : this.animateTarget,
		width : 764,
		height : 250,
		form_config : {
			labelWidth : 90,
			object : "dismantleManage",
			saveable : false,
			items : items,
			fieldMapping : DismantleManageFieldMapping,
			hiddenField : DismantleManageHiddenField
		}
	});
};
Ext.extend(DismantleManageForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.dismantleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadDismantleManage.do?dismantleId=" + this.dismantleId,
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