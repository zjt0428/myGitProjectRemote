var PriceSettingGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var columns = [ {
		sortable: true, 
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "规格型号",
		dataIndex : "specifications"
	},{
		header : "日租金",
		dataIndex : "dailyRent",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			decimalPrecision: 4,
			maxValue : 999999
		})
	},{
		header : "丢失单价",
		dataIndex : "compensationCost",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999999
		})
	} ];
	PriceSettingGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "租赁单价设定",
		option : "租赁单价设定",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : PriceSettingListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelPriceSettingContractMaterials.do",
	}, this.grid_config || {}));
};
Ext.extend(PriceSettingGrid, Knight.ux.SubModuleBaseGrid, {	
	createSubModule : function() {
		return {
			quantity : 0
		};
	},
	importCarArchives : function() {
		var a = this.getSelectionModel().getSelections();
		var b = this.getStore();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new CarSelector({
			callback : function(d) {
				var data = d[0].data;
				this.licensePlate = data.licensePlate;
				this.driver = data.driver;
				this.driverPhone = data.driverPhone;
				for(j = 0;j<a.length;j++ ){
					a[j].set("licensePlate",this.licensePlate);
					a[j].set("driver",this.driver);
					a[j].set("driverPhone",this.driverPhone);
				}	
			}.createDelegate(this)
		}).show();
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			madetailId : this.madetailId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			specifications : data.specifications,//规格
			specificationsId : data.specificationsId,
			dailyRent : data.materialsCommodity.dailyRent,
			compensationCost : data.materialsCommodity.compensationCosts
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	}
});
