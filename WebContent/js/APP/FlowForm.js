var FlowForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮
	this.title = this.title ? "" : this.title;

	this.approveGrid = new FlowApproveGrid(null, {
		saveable : false
	});

	var items = [ {
		xtype : "fieldset",
		title : "流程信息",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth :0.8,
				defaultType : "textfield",
				items : [{
					fieldLabel : "流程状态",
					width : 200,
					name : "flowInstance.stateName"
				},{
					fieldLabel : "流程名称",
					width : 200,
					name : "flowInstance.flowName"
				},{
					fieldLabel : "流程类型",
					width : 200,
					name : "flowInstance.flowType"
				},{
					fieldLabel : "出差/请假天数",
					width : 200,
					name : "flowInstance.days"
				},{
					fieldLabel : "流程描述",
					width : 200,
					name : "flowInstance.flowDesc"
				},{
					fieldLabel : "申请人",
					width : 200,
					name : "flowInstance.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 200,
					readOnly : true,
					allowBlank : true,
					editable : false,
					fieldLabel : "申请日期",
					name : "flowInstance.applyDt"
				},{
					xtype : "textarea",			
					anchor : "90%",
					maxLength : 128,
					maxLengthText : MoreThanMaxLength,
					height : 48,
					fieldLabel : "申请内容",
					name : "flowInstance.content"
				}  ]
			} ]
		} ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.approveGrid ]
	}];
	FlowForm.superclass.constructor.call(this, {
		title : this.title,
		width : 700,
		height: 500,
		form_config : {
			labelWidth : 120,
			object : "flowInstance",
			saveable : this.saveable,
			url : __ctxPath + "/app/saveFlow.do",
			items : items,
			fieldMapping : TransApproveFieldMapping,
			hiddenField : TransApproveHiddenField
		}
	});
};
Ext.extend(FlowForm, Knight.ux.FormPanelWindow, {
	
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
		if (!Ext.isEmpty(this.insid)){
			this.getForm().load({
				url : __ctxPath + "/app/loadFlow.do?insid=" + this.insid,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.instanceProcessSet, this.approveGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName"];
			var values = [ curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});