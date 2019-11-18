var DispatchAllocateInitForm = function(a) {
	Ext.apply(this, a || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮 
	var equipCategoryCombo = $initComboBoxField("配件类别", "dispatchallocateInit.initStatus", "repertoryCategory", {
		lable : "配件类别",
		allowBlank : true
	});
	var componSpecificCombo = $initComboBoxField("设备型号", "dispatchallocateInit.equipSpecific", "equipSpecific", {
		editable : true,
		allowBlank : true
	});
	var equipVenderCombo = $initComboBoxField("生产厂家", "dispatchallocateInit.equipVender", "equipVender", {
		editable : true,
		allowBlank : true
	});
	var items = [ {
		xtype : "fieldset",
		title : "基本设置",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.20,
				defaultType : "textfield",
				items : [equipVenderCombo,equipCategoryCombo]
			}, {
				layout : "form",
				columnWidth : 0.20,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "配件名称",
					name : "dispatchallocateInit.componGenericName"
				} ,componSpecificCombo]
			},{
				layout : "form",
				columnWidth : 0.20,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "计量单位",
					name : "dispatchallocateInit.calculate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.20,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "标配数量",
					name : "dispatchallocateInit.quantity"
				}]
			}, {
				layout : "form",
				columnWidth : 0.20,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "配件规格",
					name : "dispatchallocateInit.dimensions"
				} ]
			} ]
		} ]
	}];
	DispatchAllocateInitForm.superclass.constructor.call(this, {
		title : "配货清单",
		width : 960,
		height : 150,
		disAllInitId :this.disAllInitId,
		form_config : {
			labelWidth : 100,
			object : "dispatchallocateInit",
			saveable : this.saveable,
			url : __ctxPath + "/form/saveDispatchAllocateInit.do?type=" + this.type,
			items : items,
			fieldMapping : DispatchAllocateInitFieldMapping,
			hiddenField : DispatchAllocateInitHiddenField
		}
	});
};
Ext.extend(DispatchAllocateInitForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		var test = this.getForm().getValues();
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.disAllInitId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/form/loadsDispatchAllocateInit.do?disAllInitId=" + this.disAllInitId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					
					this.setFieldRawValue("initStatus", data.initStatusName);
					this.setFieldRawValue("equipSpecific", data.equipSpecificName);
					this.setFieldRawValue("equipVender", data.equipVenderName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
		});
	}
}
});