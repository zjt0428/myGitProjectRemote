var PractiEvaluationFrom = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var items = [ {
		id : this.safetyId,
		xtype : "hidden",
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					width : 180,
					fieldLabel : "评论人",
					name : "practiEvaluation.evaluaMan"
				}, {
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 250,
					editable : false,
					readOnly : true,
					fieldLabel : "评价日期",
					name : "practiEvaluation.evaluaDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "评价人员",
					width : 250,
					name : "practiEvaluation.acceptMan",
					fields : [ "acceptManId", "acceptMan"],
					params : {
						"QVO_permissionFlag_S_LK" : curUserInfo.labourPermission
					},
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMaterialPractiArchives.createDelegate(this)
				},{
					xtype : "datacombo",
					width : 250,
					fieldLabel : "星级评价",
					disabled : !this.saveable,
					name : "practiEvaluation.evaluaStar",
					store : [ [ "1", "一星级" ], [ "2", "二星级" ], [ "3", "三星级" ], [ "4", "四星级" ], [ "5", "五星级" ] ]
				} ]
			} ]
		}, {
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.99,
				items : [ {
					xtype : "textarea",
					maxLength : 128,
					maxLengthText : 600,
					anchor : "95%",
					height : "60",
					fieldLabel : "评价内容",
					name : "practiEvaluation.evaluaContent"
				} ]
			} ]
		}]
	} ];
	PractiEvaluationFrom.superclass.constructor.call(this, {
		title : "安全交底信息",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		constrain: true,//禁止窗口移出浏览器屏幕
		layout : "fit",
		form_config : {
			labelWidth : 90,
			object : "practiEvaluation",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractiEvaluation.do",
			items : items,
			fieldMapping : PractiEvaluationFieldMapping,
			hiddenField : PractiEvaluationHiddenField
		}
	});
};
Ext.extend(PractiEvaluationFrom, Knight.ux.FormPanelWindow, {
	importMaterialPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiId,data.practiName]);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.evaluaId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractiEvaluation.do?evaluaId=" + this.evaluaId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else {
			var fieldNames = ["evaluaManId", "evaluaMan"];
			var values = [ curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});