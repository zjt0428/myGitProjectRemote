var InstallManageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.installId,
		relateModule : RelationModule.installManage.relateModule,
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
					name : "installManage.userName"
				}, {
					fieldLabel : "备案编号",
					name : "installManage.recordId"
				}, {
					fieldLabel : "本次附墙数",
					name : "installManage.wallAttacheQty"
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
					name : "installManage.providedDate"
				}, {
					fieldLabel : "安装项目",
					name : "installManage.projectName"
				}, {
					fieldLabel : "臂长",
					name : "installManage.brachium"
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
					name : "installManage.startinDate"
				}, {
					fieldLabel : "退场时间",
					name : "installManage.endinDate"
				}, {
					fieldLabel : "安装高度",
					name : "installManage.installHeight"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];

	InstallManageForm.superclass.constructor.call(this, {
		title : "安装管理明细",
		animateTarget : this.animateTarget,
		width : 764,
		height : 250,
		form_config : {
			labelWidth : 90,
			object : "installManage",
			saveable : false,
			items : items,
			fieldMapping : InstallManageFieldMapping,
			hiddenField : InstallManageHiddenField
		}
	});
};
Ext.extend(InstallManageForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.installId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadInstallManage.do?installId=" + this.installId,
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