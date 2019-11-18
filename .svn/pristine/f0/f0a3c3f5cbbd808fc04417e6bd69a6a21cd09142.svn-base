var PumpTruckForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.pumpId,
		relateModule : RelationModule.pumpTruck.relateModule,
		saveable : this.saveable
	});
	
	var pumpTypeCombo = $initComboBoxField("泵车类型", "pumpTruck.pumpType", "pumpType", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	
	var pumpNumberCombo = $initComboBoxField("泵车型号", "pumpTruck.pumpNumber", "pumpNumber", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	var items = [ {
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
					allowBlank : false,
					fieldLabel : "车牌号",
					name : "pumpTruck.licensePlate"
				},{
					fieldLabel : "发证机关",
					name : "pumpTruck.issuingAuthority"
				},{
					fieldLabel : "车辆通行证信息",
					name : "pumpTruck.vehiclePermit"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ pumpTypeCombo,{
					xtype : "datefield",
					format : "Y-m-d",
					editable : false,
					allowBlank : false,
					fieldLabel : "出厂日期",
					name : "pumpTruck.releaseDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [pumpNumberCombo,{
					xtype : "datefield",
					format : "Y-m-d",
					editable : false,
					fieldLabel : "到期时间",
					name : "pumpTruck.expirationDate"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
		anchor : "85%",
		maxLength : 128,
		maxLengthText : MoreThanMaxLength,
		xtype : "textarea",
		fieldLabel : "备注",
		name : "pumpTruck.remark"
	  },fileAttachContainer ]
	}];
	PumpTruckForm.superclass.constructor.call(this, {
		title : "车辆档案",
		width : 850,
		form_config : {
			object : "pumpTruck",
			saveable : this.saveable,
			url : __ctxPath + "/pump/savePumpTruck.do",
			items : items,
			fieldMapping : PumpTruckFieldMapping,
			hiddenField : PumpTruckHiddenField
		}
	});
};
Ext.extend(PumpTruckForm, Knight.ux.FormPanelWindow, {
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
		if (!Ext.isEmpty(this.pumpId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/pump/loadPumpTruck.do?pumpId=" + this.pumpId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});