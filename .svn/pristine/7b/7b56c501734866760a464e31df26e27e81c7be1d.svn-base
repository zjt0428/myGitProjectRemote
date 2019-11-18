var CompensationDamageGrid = function(a,b) {
	Ext.apply(this, a||{});
	Ext.apply(this, b||{});
	// =====================================================================//
	var tbarItems = [];
	if (this.saveable) {
		tbarItems.push({
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadCompensation.createDelegate(this)
		});
		tbarItems.push({
			iconCls : "btn-archive-eraser",
			text : "一键清0",
			handler : this.cleanQuantityIsZero.createDelegate(this)
		});
	}
	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "损坏类型",
		dataIndex : "damageType"
	}, {
		header : "损坏单价",
		dataIndex : "damageUnitPrice"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "损坏数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999999
		}),
		renderer : function (value,medata,record){
			this.calculate();
			return value;
		}.createDelegate(this)
	}, {
		header : "损坏赔偿金额",
		dataIndex : "damageAmount",
		renderer : function(value,medata,record) {
			value = (Number(record.data.damageUnitPrice)*Number(record.data.quantity)).toFixed(1);
			record.data.damageAmount = value;
			return value;
		}
	}];
	CompensationDamageGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : false,
		addForbidden : true,
		title : "损坏赔偿",
		tbarItems : tbarItems,
		height : this.height,
		fields : CompensationDamageListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDamageRecycleManage.do"
	}, this.grid_config || {}));
};
Ext.extend(CompensationDamageGrid, Knight.ux.SubModuleBaseGrid, {	
	calculate : function() {
		var total = 0;
    	for(var i=0;i<this.getStore().getCount();i++){
			total += Number(this.getStore().getAt(i).data.damageUnitPrice)*Number(this.getStore().getAt(i).data.quantity)
		}
    	Ext.getCmp("recycleManage_damage").setValue(total.toFixed(2));
	},
	loadCompensation : function() {
		this.getStore().removeAll();
		var detailData =  this.recycleManageDetailGrid.getDetailData();
		var matDamageSet = this.matDamageSet;
		var compensationScrapSet = this.compensationScrapSet;
		for(var i=0;i<detailData.length;i++){
			for(var j=0;j<matDamageSet.length;j++){
				if(detailData[i].commodityId==matDamageSet[j].commodityId){
					this.addSubModuleDate(matDamageSet[j],"matDamage");
				}
			}
			for(var k=0;k<compensationScrapSet.length;k++){
				if(detailData[i].commodityId==compensationScrapSet[k].commodityId){
					this.addSubModuleDate(compensationScrapSet[k],"compensationScrap");
				}
			}
		}
	},
	addSubModuleDate : function(data,str) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		if(str=="matDamage"){
			for ( var i = 0; i < this.getStore().getCount(); i++) {
				if (this.getStore().getAt(i).data.damageType == data.damageType && this.getStore().getAt(i).data.damageId == data.damageId) {
					return;
				}
			}
			Ext.apply(recordType.data, {
				damageId : data.damageId,
				commodityId : data.commodityId,
				commodity : data.commodity,
				measurementUnit : data.measurementUnit,
				damageType : data.damageType,
				damageUnitPrice : data.damageUnitPrice,
				quantity : 0
			});
		}
		if(str=="compensationScrap"){
			for ( var i = 0; i < this.getStore().getCount(); i++) {
				if (this.getStore().getAt(i).data.damageType == data.scrapType && this.getStore().getAt(i).data.damageId == data.scrapId) {
					return;
				}
			}
			Ext.apply(recordType.data, {
				damageId : data.scrapId,
				commodityId : data.commodityId,
				commodity : data.commodity,
				measurementUnit : data.measurementUnit,
				damageType : data.scrapType,
				damageUnitPrice : data.scrapUnitPrice,
				quantity : 0
			});
		}
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	cleanQuantityIsZero : function() {
		var ids=[];
		for(var i=0;i<this.getStore().getCount();i++) {
			if(this.getStore().getAt(i).data.quantity==0) {
				ids.push(i);
			}
		}
		this.getSelectionModel().selectRows(ids);
		this.delSubModule();
	}
});
