var TranDistributionbutionGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	var columns = [ {
		header : "配件名称",
		readOnly:true,
		dataIndex : "componGenericName",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},{
		header : "配件规格",
		dataIndex : "dimensions",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},{
		header : "生产厂家",
		dataIndex : "equipVender",
		readOnly:true,
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},/*{
		header : "设备型号",
		readOnly:true,
		dataIndex : "componSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},
	{
		header : "设备型号", 
		hidden : true,
		dataIndex : "componSpecific",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},*/{
		header : "设备型号",
		readOnly:true,
		dataIndex : "commSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},{
		header : "装车数量",
		dataIndex : "fillCounts",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			selectOnFocus : true
		})
	}, {
		header : "计量单位",
		dataIndex : "calculate",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	}, {
		header : "标配数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "收费数量",
		dataIndex : "chargeNum",
		width : 60,
		editor : new Ext.form.NumberField({
			selectOnFocus : true
		})
	}, {
		header : "单价",
		dataIndex : "price",
		width : 60,
		editor : new Ext.form.NumberField({
			selectOnFocus : true
		})
	}, {
		header : "金额",
		dataIndex : "amount",
		width : 80,
		editor : new Ext.form.NumberField({
			selectOnFocus : true
		})
	}];
	TranDistributionbutionGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : LogisticsTranDestributionListViewField,
		title : "附件发货清单",
		option : "附件发货清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelTranDestributionLogisticsTransport.do"
	}, this.grid_config || {}));
};
Ext.extend(TranDistributionbutionGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.amount);
		}
		return summaryAmount;
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.disAllInitId == data.disAllInitId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			disAllInitId : data.disAllInitId,
			componGenericName : data.componGenericName,
		//	componSpecific:data.equipSpecific,
		//	componSpecificName:data.equipSpecificName,
			commSpecificName:data.equipSpecificName,
			equipVender:data.equipVenderName,
			dimensions : data.dimensions,
			calculate : data.calculate,
			quantity : data.quantity,
			fillCounts : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}

});
