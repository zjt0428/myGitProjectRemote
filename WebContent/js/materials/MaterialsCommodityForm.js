var MaterialsCommodityForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.editable = this.editable;
	var assetsPropertys = $initComboBoxField("资产属性", "materialsCommodity.assetsProperty", "assetsProperty", {
		editable : true,
		valueField : "name",
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
				items : [assetsPropertys, {
					allowBlank : false,
					fieldLabel : "品名",
					name : "materialsCommodity.commodity"
				}, {
					allowBlank : false,
					fieldLabel : "丢失赔偿单位",
					name : "materialsCommodity.compensationUnit"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "checkboxgroup",
					disabled : this.existsable,
					fieldLabel : "是否在用",
					items : [{
						id : "whetherUsing",
						name : "materialsCommodity.whetherUsing",
						checked : true
					}]	
				}, {
					allowBlank : false,
					fieldLabel : "日租金",
					name : "materialsCommodity.dailyRent"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "租金核算单位",
					name : "materialsCommodity.rentUnit"
				}, {
					allowBlank : false,
					fieldLabel : "丢失赔偿单价",
					name : "materialsCommodity.compensationCosts"
				}]
			}]
		}]
	}]

	MaterialsCommodityForm.superclass.constructor.call(this, {
		title : "周材品名设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "materialsCommodity",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveMaterialsCommodity.do",
			items : items,
			fieldMapping : MaterialsCommodityFieldMapping,
			hiddenField : MaterialsCommodityHiddenField
		}
	});
}

Ext.extend(MaterialsCommodityForm, Knight.ux.FormPanelWindow, {
	
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
		if(!Ext.isEmpty(this.commodityId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsCommodity.do?commodityId=" + this.commodityId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				
				/*	this.setFieldRawValue("commodity", data.commodity);*/
					
					
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
})