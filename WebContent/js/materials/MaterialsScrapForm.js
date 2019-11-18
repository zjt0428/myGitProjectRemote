var MaterialsScrapForm = function(a, b) {
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
					name : "materialsScrap.materialsCommodity.commodityId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "品名",
					name : "materialsScrap.materialsCommodity.commodity",
					relateModule : RelationModule.materialsCommodity.relateModule,
					importhandler : this.importMaterialsCommodity.createDelegate(this)
				}, {
					readOnly:true,
				
					fieldLabel : "收费类型",
					name : "materialsScrap.feesType",
					value : "报废赔偿"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "收费单位",
					name : "materialsScrap.measurementUnit"
				}, {
					allowBlank : false,
					fieldLabel : "报废赔偿单价",
					name : "materialsScrap.scrapUnitPrice"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "报废类型",
					name : "materialsScrap.scrapType"
				}, {
					xtype : "checkboxgroup",
					disabled : this.existsable,
					fieldLabel : "是否在用",
					items : [{
						id : "whetherUsing",
						name : "materialsScrap.whetherUsing",
						checked : true
					}]	
				}]
			}]
		}]
	}]
	
	MaterialsScrapForm.superclass.constructor.call(this, {
		title : "报废赔偿设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "materialsScrap",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveMaterialsScrap.do",
			items : items,
			fieldMapping : MaterialsScrapFieldMapping,
			hiddenField : MaterialsScrapHiddenField
		}
	});
}

Ext.extend(MaterialsScrapForm, Knight.ux.FormPanelWindow, {
	
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
		if(!Ext.isEmpty(this.scrapId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsScrap.do?scrapId=" + this.scrapId,
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