var OtherBusinessDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	var columns = [{
		header : "收费类型",
		dataIndex : "feesTypeName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.feesTypeData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.feesType = store.getAt(index).data.code;
			}
			record.data.feesTypeName = value;
			return value;
		}
	}, {
		header : "结算关系",
		dataIndex : "calculationMethodName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.calculationData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.calculationMethod = store.getAt(index).data.code;
			}
			record.data.calculationMethodName = value;
			return value;
		}
	}, {
		header : "收费金额",
		dataIndex : "fee",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999,
			minValue : 0
		}),
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				record.data.fee = 0;
				return value = 0;
			}else{
				this.change();
				return value;
			}
		}.createDelegate(this)
	} ];
	OtherBusinessDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : OtherBusinessDetailListViewField,
		title : "其他费用",
		option : "其他费用",
		tbarItems : this.tbarItems,
		width : 500,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailOtherBusiness.do"
	}, this.viewConfig || {}));
};
Ext.extend(OtherBusinessDetailGrid, Knight.ux.SubModuleBaseGrid, {
	change : function(){
		var total = 0;
		for(var i=0;i<this.getStore().getCount();i++){
			if(this.getStore().getAt(i).data.calculationMethodName == "相加"){
				total += Number(this.getStore().getAt(i).data.fee);
			}else if(this.getStore().getAt(i).data.calculationMethodName == "相减") {
				total -= Number(this.getStore().getAt(i).data.fee);
			}
		}
		Ext.getCmp('total').setValue(total.toFixed(2)); 
	},
	createSubModule : function() {
		return {
			feesType : 1,
			calculationMethod : 0
		}
	}
});