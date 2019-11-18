var TruckCranePriceForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.editable = this.editable;
	var specificCombo = $initComboBoxField("汽吊型号", "truckCranePrice.truckCraneSpecific", "truckCraneSpecific", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	var belongToAreaCombo = $initComboBoxField("所属片区", "truckCranePrice.belongToArea", "belongToArea", {
		editable : true,
		allowBlank : true,
		readOnly : !this.saveable
	});
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		items: [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [belongToAreaCombo,specificCombo]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "项目单价",
					name : "truckCranePrice.projectPrice"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "班组单价",
					name : "truckCranePrice.teamPrice"
				}]
			}]
		}]
	}]

	TruckCranePriceForm.superclass.constructor.call(this, {
		title : "汽吊价格设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "truckCranePrice",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveTruckCranePrice.do",
			items : items,
			fieldMapping : TruckCranePriceFieldMapping,
			hiddenField : TruckCranePriceHiddenField
		}
	});
}

Ext.extend(TruckCranePriceForm, Knight.ux.FormPanelWindow, {
	
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			if(this.editable){
				this.close();
			}else{
				this.getForm().reset();
			}
		}.createDelegate(this));
	},
	loadFormData : function() {
		if(!Ext.isEmpty(this.priceId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadTruckCranePrice.do?priceId=" + this.priceId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("installDismantleType", data.installDismantleTypeName);
					this.setFieldRawValue("belongToArea", data.belongToAreaName);
					this.setFieldRawValue("equipSpecific", data.equipSpecificName);
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
})