var DepartmentForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var depTypeCombo = $initComboBoxField("部门类型", "department.depType", "DEP_TYPE", {
		allowBlank : false,
		defaultValueIndex : 0
	});
	var items = [ {
		xtype : "hidden",
		name : "department.parentId",
		value : this.parentId
	}, {
		xtype : "hidden",
		name : "department.path"
	}, {
		xtype : "hidden",
		name : "department.depId"
	}, {
//		xtype : "hidden",
		fieldLabel : "部门编号",
		name : "department.depSerial"
	}, {
		fieldLabel : "部门名",
		name : "department.depName",
		blankText : "部门名为必填!"
	},depTypeCombo, {
		fieldLabel : "部门描述",
		xtype : "textarea",
		name : "department.depDesc",
		blankText : "部门描述为必填!"
	}, {
		fieldLabel : "部门顺序",
		xtype : "numberfield",
		name : "department.sortField",
		emptyText : "不同层级数字可以重复"
	} ];
	this.formPanel = new Ext.form.FormPanel({
		frame : false,
		bodyStyle : "padding : 5px;",
		layout : "form",
		labelAlign : "right",
		defaultType : "textfield",
		defaults : {
			anchor : "95%,95%",
			allowBlank : false,
			selectOnFocus : true,
			msgTarget : "side"
		},
		url : __ctxPath + "/system/addDepartment.do",
		reader : new Ext.data.JsonReader({
			root : "data"
		}, DepartmentFieldMapping),
		items : items
	});

	this.buttons = [ {
		text : "保存",
		iconCls : "btn-save",
		handler : this.submitForm.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-del",
		handler : this.cancel.createDelegate(this)
	} ];
	DepartmentForm.superclass.constructor.call(this, {
		title : "部门信息",
		iconCls : "menu-set-department",
		layout : "fit",
		width : 400,
		height : 250,
		minWidth : 399,
		minHeight : 199,
		items : this.formPanel,
		border : false,
		modal : true,
		plain : true,
		buttonAlign : "center",
		buttons : this.buttons,
		listeners : {
			afterrender : this.loadPreFormData.createDelegate(this)
		}
	});
};
Ext.extend(DepartmentForm, Ext.Window, {
	loadPreFormData : function() {
		if (!Ext.isEmpty(this.depId)) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/system/detailDepartment.do?depId=" + this.depId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					this.formPanel.form.findField("department.depId").setReadOnly(true);
					this.formPanel.form.url = __ctxPath + "/system/updateDepartment.do";
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else {
			var  rep = $ajaxSyncCall(__ctxPath + "/system/detailDepartment.do",{ depId : this.parentId });
			if(rep.data!=null && rep.data[0]!=null) {
				this.formPanel.getForm().findField("department.depSerial").setValue(rep.data[0].depSerial);
			}else{
				this.formPanel.getForm().findField("department.depSerial").setValue(0);
			}
		}
	},
	submitForm : function() {
		$formsubmit(this.formPanel.getForm(), function(c, e) {
			$toast("添加部门成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	cancel : function() {
		this.close();
	}
});