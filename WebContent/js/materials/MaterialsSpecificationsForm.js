var MaterialsSpecificationsForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.editable = this.editable;
	
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
				items : [{
					hidden : true,
					name : "materialsSpecifications.materialsCommodity.commodityId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "品名",
					name : "materialsSpecifications.materialsCommodity.commodity",
					relateModule : RelationModule.materialsCommodity.relateModule,
					importhandler : this.importMaterialsCommodity.createDelegate(this)
				}, {
					allowBlank : false,
					fieldLabel : "周材规格",
					name : "materialsSpecifications.specifications"
				}, {
					fieldLabel : "助记码",
					name : "materialsSpecifications.mnemonics"
				}, {
					xtype : "checkboxgroup",
					disabled : this.existsable,
					fieldLabel : "是否在用",
					items : [{
						id : "whetherUsing",
						name : "materialsSpecifications.whetherUsing",
						checked : true
					}]	
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "计量单位",
					name : "materialsSpecifications.firstUnitConversion"
				},{
					fieldLabel : "计量数量",
					name : "materialsSpecifications.firstConvertedQuantity"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "换算单位",
					name : "materialsSpecifications.secondUnitConversion"
				}, {
					fieldLabel : "换算数量",
					name : "materialsSpecifications.secondConvertedQuantity"
				}]
			}]
		}]
	}]
	
	MaterialsSpecificationsForm.superclass.constructor.call(this, {
		title : "周材规格设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "materialsSpecifications",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveMaterialsSpecifications.do",
			items : items,
			fieldMapping : MaterialsSpecificationsFieldMapping,
			hiddenField : MaterialsSpecificationsHiddenField
		}
	});
};

Ext.extend(MaterialsSpecificationsForm, Knight.ux.FormPanelWindow, {
	
	importMaterialsCommodity : function (data) {
		var fieldNames = [ "materialsCommodity.commodityId", "materialsCommodity.commodity"];
		var values = [ data.commodityId, data.commodity ];
		this.setMultiFieldValue(fieldNames, values);
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
		if(!Ext.isEmpty(this.specificationsId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsSpecifications.do?specificationsId=" + this.specificationsId,
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