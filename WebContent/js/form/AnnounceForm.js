var AnnounceForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	this.announcePractiGrid = new AnnounceCategoryGrid({
		category : "0"
	}, {
		title : "接收人员",
		saveable : this.saveable
	});
	this.announceDepGrid = new AnnounceCategoryGrid({
		category : "1"
	}, {
		title : "接收部门",
		saveable : this.saveable
	});
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
					readOnly : true,
					fieldLabel : "发布人",
					name : "announce.userName"
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "发布标题",
					name : "announce.announceTitle"
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
					fieldLabel : "填写日期",
					name : "announce.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "发布类型",
					name : "announce.announceType"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "发布部门",
					name : "announce.department.depName"
				} ]
			} ]
		}, {
			anchor : "95%",
			allowBlank : false,
			maxLength : 2000,
			height : 120,
			xtype : "textarea",
			fieldLabel : "发布内容",
			name : "announce.announce"
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					xtype : "panel",
					bodyStyle : "margin : 5px 0px 5px 0px",
					anchor : "98%",
					layout : "fit",
					items : [ this.announcePractiGrid ]
				} ]
			}, {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					xtype : "panel",
					bodyStyle : "margin : 5px 0px 5px 0px",
					anchor : "98%",
					layout : "fit",
					items : [ this.announceDepGrid ]
				} ]
			} ]
		} ]
	} ];
	AnnounceForm.superclass.constructor.call(this, {
		title : "公告信息",
		animateTarget : this.animateTarget,
		centerLayout : true,
		form_config : {
			labelWidth : 80,
			object : "announce",
			saveable : this.saveable,
			url : __ctxPath + "/form/saveAnnounce.do",
			items : items,
			fieldMapping : AnnounceFieldMapping,
			hiddenField : AnnounceHiddenField
		}
	});
};
Ext.extend(AnnounceForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.getForm().findField("announce.announcePractis").setValue($gridstore2json(this.announcePractiGrid));
		this.getForm().findField("announce.announceDeps").setValue($gridstore2json(this.announceDepGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/form/multiPublishAnnounce.do", resp.applyforId, null, "是否发布该公告?", "_AnnouncePublish");
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.announceId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/form/loadAnnounce.do?announceId=" + this.announceId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];

					if (data.announcePractiSet && data.announcePractiSet.length > 0) {
						this.announcePractiGrid.addRecordHeight(data.announcePractiSet.length);
						this.announcePractiGrid.getStore().loadData(data.announcePractiSet);
					}
					if (data.announceDepSet && data.announceDepSet.length > 0) {
						this.announceDepGrid.addRecordHeight(data.announceDepSet.length);
						this.announceDepGrid.getStore().loadData(data.announceDepSet);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});