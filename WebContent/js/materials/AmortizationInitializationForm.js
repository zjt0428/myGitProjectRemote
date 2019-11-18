var AmortizationInitializationForm = function (a, b) {
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
				name : "amortizationInitialization.materialsAmortization.amortizationId"
			},{
				xtype : "relationCompositeField",
				disabled : !this.saveable,
				readOnly : true,
				allowBlank : false,
				fieldLabel : "品名",
				name : "amortizationInitialization.materialsAmortization.materialsCommodity.commodity",
				fields : ["amortizationId", "materialsAmortization.commodity", "totalAmortizationMonths" ],
				relateModule : RelationModule.materialsAmortization.relateModule,
				importhandler : this.importMaterialsAmortization.createDelegate(this)
			}, {
				allowBlank : false,
				fieldLabel : "数量",
				name : "amortizationInitialization.quantity"
			}, {
				allowBlank : false,
				fieldLabel : "原值",
				name : "amortizationInitialization.originalValue",
				listeners : {
					"change" : function(){
						this.calculates();
					}.createDelegate(this)
				}
			}]
		}, {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [{
				xtype : "datefield",
				format : "Y-m-d",
				width : 130,
				readOnly : false,
				editable : false,
				allowBlank : false,
				disabled : !this.saveable,
				fieldLabel : "形成时间",
				name : "amortizationInitialization.formationTime",
				value : new Date()
			}, {
				readOnly : true,
				fieldLabel : "总计摊销月数",
				name : "amortizationInitialization.materialsAmortization.totalAmortizationMonths"
				
			}, {
				xtype : "numberfield", 
				allowDecimals : false, //不允许小数
				allowNegative : false, //不允许负数
				nanText : "请输入有效正整数",
				allowBlank : false,
				fieldLabel : "已摊销月数",
				name : "amortizationInitialization.amortizedMonths",
				listeners : {
					"change" : function(){
						this.calculate();
					}.createDelegate(this)
				}
			}]
		}, {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [{
				xtype : "numberfield",
				nanText : "请输入有效数字",
				allowBlank : false,
				fieldLabel : "已摊销金额",
				name : "amortizationInitialization.amortizedAmount",
				listeners : {
					"change" : function(){
						this.calculates();
					}.createDelegate(this)
				}
			}, {
				id : "notyetAmortizedMonths",
				readOnly : true,
				editable : false,
				fieldLabel : "未摊销月数",
				name : "amortizationInitialization.notyetAmortizedMonths",
				
			}, {
				id : "notyetAmortizedAmount",
				readOnly : true,
				editable : false,
				fieldLabel : "未摊销金额",
				name : "amortizationInitialization.notyetAmortizedAmount"
			}]
		}]
	}]
	
	AmortizationInitializationForm.superclass.constructor.call(this, {
		title : "周转材料摊销初始化明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "amortizationInitialization",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveAmortizationInitialization.do",
			items : items,
			fieldMapping : AmortizationInitializationFieldMapping,
			hiddenField : AmortizationInitializationField
		}
	});
}

Ext.extend(AmortizationInitializationForm, Knight.ux.FormPanelWindow, {
	
	importMaterialsAmortization : function (data) {
		var fieldName = ["materialsAmortization.amortizationId", "materialsAmortization.materialsCommodity.commodity","materialsAmortization.totalAmortizationMonths" ];
		var value = [data.amortizationId ,data.materialsCommodity.commodity ,data.totalAmortizationMonths  ];
		this.setMultiFieldValue(fieldName, value);
	},
	calculate: function(){
		var totalAmortizationMonths=this.getFieldValue("materialsAmortization.totalAmortizationMonths");
		var amortizedMonths=this.getFieldValue("amortizedMonths");
		value=Number(totalAmortizationMonths)-Number(amortizedMonths); 
		this.setFieldValue("notyetAmortizedMonths",value);
	},
	calculates: function(){
		var originalValue=this.getFieldValue("originalValue");
		var amortizedMonths=this.getFieldValue("amortizedAmount");
		var value=Number(originalValue)-Number(amortizedMonths); 
		this.setFieldValue("notyetAmortizedAmount",value);
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
		if(!Ext.isEmpty(this.initializationId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadAmortizationInitialization.do?initializationId=" + this.initializationId,
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