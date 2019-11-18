var TruckCranePriceGrid = function(a,b){
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	
	var columns = [ {
		hidden : true,
		width : 100,
		header : "区域",
		dataIndex : "belongToAreaName",
		editor : new Ext.form.TextField({
		})
	}, {
		width : 100,
		header : "汽吊型号",
		dataIndex : "truckCraneSpecificName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=truckCraneSpecific"
		})
	}, {
		width : 100,
		header : "项目单价(元)",
		dataIndex : "projectPrice",
		editor : new Ext.form.NumberField({
			
		})
	}];
	
	TruckCranePriceGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : TruckCranePriceSetListViewField,
		title : "汽吊费用",
		option : "汽吊费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelTruckCranePriceSetContractLease.do"
	}, this.grid_config || {}));
}
Ext.extend(TruckCranePriceGrid,Knight.ux.SubModuleBaseGrid,{
	createSubModule : function() {
		return {
			contractId : this.contractId,
		};
	},
	
	addSubModuleDate : function(data) {
		
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.priceId == data.priceId) {
				return;
			}
		}
		
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();

		Ext.apply(recordType.data, {
			belongToAreaName : data.belongToAreaName,
			truckCraneSpecificName : data.truckCraneSpecificName,
			projectPrice : data.projectPrice
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
});