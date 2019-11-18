var FlowDefineForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮	

	this.nodeGrid = new FlowDefineGrid(null, {
		saveable : this.saveable
	});
	var relateCombo = $initComboBoxField("关联模块", "flowDefine.relateModule", "RELATE_MODULE_FLOW", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "流程信息",
		anchor : "98%",
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth :0.8,
				defaultType : "textfield",
				items : [{
					fieldLabel : "流程名称",
					width : 200,
					name : "flowDefine.flowName"
				},{
					fieldLabel : "创建人",
					width : 200,
					name : "flowDefine.createByName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 200,
					readOnly : true,
					allowBlank : true,
					editable : false,
					fieldLabel : "填写日期",
					name : "flowDefine.createDt",
					value: new Date()
				},relateCombo]
			} ]
		} ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.nodeGrid ]
	}];
	FlowDefineForm.superclass.constructor.call(this, {
		title : this.title,
		width : 700,
		height: 500,
		form_config : {
			labelWidth : 120,
			object : "flowDefine",
			saveable : this.saveable,
			url : __ctxPath + "/app/saveFdefine.do",
			items : items,
			fieldMapping : FlowDefineFieldMapping,
			hiddenField : FlowDefineHiddenField
		}
	});
};
Ext.extend(FlowDefineForm, Knight.ux.FormPanelWindow, {	
	saveFormData : function() {
		this.setFieldValue("nodes", $gridstore2json(this.nodeGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.flowid)){
			this.getForm().load({
				url : __ctxPath + "/app/loadFdefine.do?flowid=" + this.flowid,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.nodeSet, this.nodeGrid);
					this.setFieldRawValue("relateModule", data.relateModuleName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.findFormField("createBy").setValue(curUserInfo.userId);
			this.findFormField("createByName").setValue(curUserInfo.fullname);			
		}
	}
});