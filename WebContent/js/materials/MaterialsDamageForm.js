var MaterialsDamageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.editable = this.editable;
	
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					hidden : true,
					name : "materialsDamage.materialsCommodity.commodityId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "品名",
					name : "materialsDamage.materialsCommodity.commodity",
					relateModule : RelationModule.materialsCommodity.relateModule,
					importhandler : this.importMaterialsCommodity.createDelegate(this)
				}, {
					xtype : "checkboxgroup",
					disabled : this.existsable,
					fieldLabel : "是否在用",
					items : [{
						id : "whetherUsing",
						name : "materialsDamage.whetherUsing",
						checked : true
					}]	
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					readOnly : true,
					allowBlank : false,
					fieldLabel : "收费类型",
					name : "materialsDamage.feesType",
					value : "损坏赔偿"
				}, {
					readOnly : false,
				
					fieldLabel : "损坏类型",
					name : "materialsDamage.damageType"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "收费单位",
					name : "materialsDamage.measurementUnit"
				}, {
					fieldLabel : "损坏赔偿单价",
					name : "materialsDamage.damageUnitPrice"
				}]
			}]
		}]
	}]
	
	MaterialsDamageForm.superclass.constructor.call(this, {
		title : "损坏赔偿设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "materialsDamage",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveMaterialsDamage.do",
			items : items,
			fieldMapping : MaterialsDamageFieldMapping,
			hiddenField : MaterialsDamageHiddenField
		}
	});
}

Ext.extend(MaterialsDamageForm, Knight.ux.FormPanelWindow, {
	
	importMaterialsCommodity : function(data) {
		var fieldName = [ "materialsCommodity.commodityId", "materialsCommodity.commodity" ];
		var value = [ data.commodityId, data.commodity ];
		this.setMultiFieldValue(fieldName, value);
	},
	
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
		if(!Ext.isEmpty(this.damageId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsDamage.do?damageId=" + this.damageId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		}
	}
})