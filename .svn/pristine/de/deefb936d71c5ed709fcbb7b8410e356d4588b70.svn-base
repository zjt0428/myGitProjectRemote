var AssembleAndDisassembleFeeForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.editable = this.editable;
	
	var feesTypeCombo = $initComboBoxField("收费类型", "assembleAndDisassembleFee.feesType", "feesType", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	
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
					name : "assembleAndDisassembleFee.materialsCommodity.commodityId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "品名",
					name : "assembleAndDisassembleFee.materialsCommodity.commodity",
					relateModule : RelationModule.materialsCommodity.relateModule,
					importhandler : this.importMaterialsCommodity.createDelegate(this)
				}, feesTypeCombo, {
					xtype : "checkboxgroup",
					disabled : this.existsable,
					fieldLabel : "是否在用",
					items : [{
						id : "whetherUsing",
						name : "assembleAndDisassembleFee.whetherUsing",
						checked : true
					}]	
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "收费单位",
					name : "assembleAndDisassembleFee.measurementUnit"
				}, {
					fieldLabel : "理论换算数值",
					name : "assembleAndDisassembleFee.theoriesValueConversion"
				},{
					fieldLabel : "收费类别",
					name : "assembleAndDisassembleFee.feeCategory"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					allowBlank : false,
					fieldLabel : "辅助单位",
					name : "assembleAndDisassembleFee.unitConversion"
				}, {
					allowBlank : false,
					fieldLabel : "收费单价",
					name : "assembleAndDisassembleFee.chargeUnitPrice"
				}]
			
			}]
		}]
	}]
	
	AssembleAndDisassembleFeeForm.superclass.constructor.call(this, {
		title : "装卸/包装费设置明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "assembleAndDisassembleFee",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveAssembleAndDisassembleFee.do",
			items : items,
			fieldMapping : AssembleAndDisassembleFeeFieldMapping,
			hiddenField : AssembleAndDisassembleFeeHiddenField
		}
	});
}

Ext.extend(AssembleAndDisassembleFeeForm, Knight.ux.FormPanelWindow, {
	
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
		if(!Ext.isEmpty(this.feeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadAssembleAndDisassembleFee.do?feeId=" + this.feeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("feesType", data.feesTypeName);
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		}
	}
})