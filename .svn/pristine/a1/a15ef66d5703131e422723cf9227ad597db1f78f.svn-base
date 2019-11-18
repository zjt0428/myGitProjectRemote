var AnnounceUserForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var items = [ {
		xtype : "fieldset",
		title : "公告信息",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 110,
					fieldLabel : "发布人",
					value : this.userName
				}, {
					width : 110,
					fieldLabel : "发布标题",
					value : this.announceTitle
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 110,
					fieldLabel : "填写日期",
					value : this.providedDate
				}, {
					width : 110,
					fieldLabel : "发布类型",
					value : this.announceType
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 110,
					fieldLabel : "发布部门",
					value : this.department.depName
				}, {
					width : 110,
					fieldLabel : "发布时间",
					value : this.publishTime
				} ]
			} ]
		}, {
			anchor : "95%",
			allowBlank : false,
			maxLength : 2000,
			height : 120,
			xtype : "textarea",
			fieldLabel : "发布内容",
			value : this.announce
		} ]
	} ];
	AnnounceUserForm.superclass.constructor.call(this, {
		title : "公告信息",
		animateTarget : this.animateTarget,
		width : 700,
		height : 300,
		form_config : {
			labelWidth : 60,
			items : items
		}
	});
};
Ext.extend(AnnounceUserForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if ("0" == this.readFlag) {
			$request({
				url : __ctxPath + "/form/multiSetReadAnnounceUser.do?ids=" + this.announceUserId,
				success : function(g, h) {
					if (this.parent && this.parent.dataGridPanel) {
						this.parent.dataGridPanel.getStore().reload();
					}
				}.createDelegate(this)
			});
		}
	}
});