var  MaterialsAmortizationForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.editable = this.editable;

	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		items : [{
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [{
				hidden : true,
				name : "materialsAmortization.materialsCommodity.commodityId"
			}, {
				xtype : "relationCompositeField",
				disabled : !this.saveable,
				readOnly : true,
				allowBlank : false,
				fieldLabel : "品名",
				name : "materialsAmortization.materialsCommodity.commodity",
				relateModule : RelationModule.materialsCommodity.relateModule,
				importhandler : this.importMaterialsCommodity.createDelegate(this)
			}]
		}, {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [{
				xtype : "numberfield",
				allowDecimals : false,
				allowNegative : false,
				nanText : "请输入有效正整数",
				allowBlank : false,
				fieldLabel : "总计摊销月数",
				name : "materialsAmortization.totalAmortizationMonths"
			}]
		}, {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [{
				allowBlank : false,
				fieldLabel : "年摊销率",
				name : "materialsAmortization.yearAmortizationRate"
			}]
		}]
	}]
	
	MaterialsAmortizationForm.superclass.constructor.call(this, {
		title : "损坏赔偿设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "materialsAmortization",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveMaterialsAmortization.do",
			items : items,
			fieldMapping : MaterialsAmortizationFieldMapping,
			hiddenField : MaterialsAmortizationField
		}
	});
}

Ext.extend(MaterialsAmortizationForm, Knight.ux.FormPanelWindow, {
	
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
		if(!Ext.isEmpty(this.amortizationId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsAmortization.do?amortizationId=" + this.amortizationId,
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