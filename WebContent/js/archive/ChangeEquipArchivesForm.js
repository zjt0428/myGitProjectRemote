var ChangeEquipArchivesForm = function(a) {
	Ext.apply(this, a || {});
	var sourceCombo = $initComboBoxField("设备来源", "equipment.equipSource", "equipSource", {
		defaultValueIndex : Ext.isEmpty(this.equipId) ? 0 : null,
		editable : true,
		value : this.equipSource,
		selectOnFocus : true,
		allowBlank : true
	});
	var specificCombo = $initComboBoxField("规格型号", "equipment.equipSpecific", "equipSpecific", {
		editable : true,
		value : this.equipSpecific,
		selectOnFocus : true,
		allowBlank : true
	});
	var genericCombo = $initComboBoxField("设备名称", "equipment.equipGeneric", "equipGeneric", {
		editable : true,
		value : this.equipGeneric,
		selectOnFocus : true,
		allowBlank : true
	});

	var items = [ {
		xtype : "hidden",
		name : "equipment.equipId",
		value : this.equipId
	}, {
		fieldLabel : "备案编号",
		name : "equipment.recordId",
		value : this.recordId,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		fieldLabel : "设备自编号",
		name : "equipment.equipSerial",
		value : this.equipSerial,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		xtype : "relationCompositeField",
		readOnly : true,
		fieldLabel : "产权单位",
		name : "equipment.propertyName",
		value : this.propertyName,
		allowBlank : true,
		selectOnFocus : true,
		relateModule : RelationModule.corp.relateModule,
		importhandler : this.importPropertyEntArchives.createDelegate(this),
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		fieldLabel : "出厂编号",
		name : "equipment.exwSerial",
		value : this.exwSerial,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	},sourceCombo,
	specificCombo, 
	genericCombo,
	{
		xtype : "hidden",
		name : "equipment.propertyEnt",
	},{
		xtype : "hidden",
		name : "equipment.dutyman",
	},{
		xtype : "hidden",
		name : "equipment.dutymanTel",
	}];
	this.buttons = [ {
		text : "确认",
		iconCls : "btn-save",
		handler : this.submit.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-cancel",
		handler : this.cancel.createDelegate(this)
	} ];
	ChangeEquipArchivesForm.superclass.constructor.call(this, {
		title : "修改设备档案",
		width : 500,
		height : 300,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 100,
			items : items,
			fieldMapping : EquipmentFieldMapping,
			object : "equipment",
			url : __ctxPath + "/archive/changeEquipment.do"
		},
		listeners : {
			afterrender : function(){
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadEquipment.do?equipId=" + this.equipId,
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("propertyEnt", data.propertyEnt);
					this.setFieldRawValue("dutyman", data.dutyman);
					this.setFieldRawValue("dutymanTel", data.dutymanTel);
				}.createDelegate(this),
			});
			}
		}
	});
};
Ext.extend(ChangeEquipArchivesForm, Knight.ux.FormPanelWindow, {
	submit : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	importPropertyEntArchives : function(data) {
		this.setMultiFieldValue(["propertyEnt", "propertyName", "dutyman", "dutymanTel"], [ data.corpId, data.corpName, data.dutyman, data.dutymanTel1 ]);
	},
	cancel : function() {
		this.close();
	}
});