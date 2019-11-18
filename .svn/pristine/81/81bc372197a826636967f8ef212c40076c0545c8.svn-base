var PackageDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var tbarItems = [];
	if(!this.saveable) {
		tbarItems.push({
			iconCls : "btn-effective",
			text : "小计",
			handler : this.showSummary.createDelegate(this)
		});
	}
	var columns = [ {
		header : "助记码",
		dataIndex : "mnemonics",
		renderer : function(value, metadata, record) {
			if(record.json.mnemonics !=null){
				record.data.mnemonics = record.json.mnemonics;
				return record.data.mnemonics;
			}
			return value;
		}
	},{
		hidden : true,
		header : "调度清单id",
		dataIndex : "dispatchId",
		renderer : function(value, metadata, record) {
			if(record.json.dispatchId !=null){
				record.data.dispatchId = record.json.dispatchId;
				return record.data.dispatchId;
			}
			return value;
		}
	},{
		hidden : true,
		header : "品名id",
		dataIndex : "commodityId",
		renderer : function(value, metadata, record) {
			if(record.json.commodityId !=null){
				record.data.commodityId = record.json.commodityId;
				return record.data.commodityId;
			}
			return value;
		}
	},{
		sortable: true,
		header : "品名",
		dataIndex : "commodity",
		renderer : function(value, metadata, record) {
			if(record.json.commodity !=null){
				record.data.commodity = record.json.commodity;
				return record.data.commodity;
			}
			return value;
		}
	},{
		hidden : true,
		header : "规格id",
		dataIndex : "specificationsId",
		renderer : function(value, metadata, record) {
			if(record.json.specifications !=null){
				record.data.specificationsId = record.json.specificationsId;
				return record.data.specificationsId;
			}
			return value;
		}
	},{
		header : "规格",
		dataIndex : "specifications",
		renderer : function(value, metadata, record) {
			if(record.json.specifications !=null){
				record.data.specifications = record.json.specifications;
				return record.data.specifications;
			}
			return value;
		}
	},{
		header : "计量单位",
		dataIndex : "measurementUnit",
		renderer : function(value, metadata, record) {
			if(record.json.measurementUnit !=null){
				record.data.measurementUnit = record.json.measurementUnit;
				return record.data.measurementUnit;
			}
			return value;
		}
	},{
		header : "调度数量",
		dataIndex : "dispatchNumber",
		renderer : function(value, metadata, record) {
			if(record.json.dispatchCounts !=null){
				record.data.dispatchNumber = record.json.dispatchCounts;
				return record.data.dispatchNumber;
			}
			return value;
		}
	},{
		header : "出租数量",
		dataIndex : "rentQuantity",
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				if(record.json.dispatchCounts !=null){
					record.data.rentQuantity = record.json.dispatchCounts;
					return record.data.rentQuantity;
				}
			}
			if (Number(value) > Number(record.get("dispatchNumber"))) {
				record.data.rentQuantity = record.data.dispatchNumber;
				value = record.data.rentQuantity;
				Ext.Msg.alert("信息警告", "出租数量不能大于调度数量!");
			}
			return value;
		}
	},{
		header : "装车数量",
		dataIndex : "loadQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 99999
		}),
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				if(record.json.dispatchCounts !=null){
					record.data.loadQuantity = record.json.dispatchCounts;
					return record.data.loadQuantity;
				}
			}
			if (Number(value) > Number(record.get("rentQuantity"))) {
				record.data.loadQuantity = record.data.rentQuantity;
				value = record.data.loadQuantity
				Ext.Msg.alert("信息警告", "装车数量不能大于出租数量!");
			}
			return value;
			
		}
	},{
		header : "包装数量",
		dataIndex : "packageQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 99999
		}),
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				if(record.json.dispatchCounts !=null){
					record.data.packageQuantity = record.json.dispatchCounts;
					return record.data.packageQuantity;
				}
			}
			if (Number(value) > Number(record.get("rentQuantity"))) {
				record.data.packageQuantity = record.get("rentQuantity");
				value = record.data.packageQuantity;
				Ext.Msg.alert("信息警告", "包装数量不能大于出租数量!");
			}
				return value;
			}
	},{
		header : "辅助单位",
		dataIndex : "secondUnitConversion",
		renderer : function(value, metadata, record) {
			if(record.json.secondUnitConversion !=null){
				record.data.secondUnitConversion = record.json.secondUnitConversion;
				return record.data.secondUnitConversion;
			}
			return value;
		}
	},{
		header : "辅助数量",
		dataIndex : "convertedQuantity",
		renderer : function(value, metadata, record) {
			if(record.data.remark=='小计') {
				return value;
			}
			if(record.json.secondConvertedQuantity !=null || record.data.rentQuantity != null){
				var quantity = (Number(record.json.secondConvertedQuantity==null?record.data.auxiliaryQuantity:record.json.secondConvertedQuantity)
				*Number(record.data.rentQuantity)).toFixed(2);
				record.data.convertedQuantity = quantity;
				return record.data.convertedQuantity;
			}
			return value;
		}
	},{
		hidden : true,
		header : "辅助单位的换算数量",
		dataIndex : "auxiliaryQuantity",
		renderer : function(value, metadata, record) {
			if(record.json.secondConvertedQuantity !=null){
				record.data.auxiliaryQuantity = record.json.secondConvertedQuantity;
				return record.data.auxiliaryQuantity;
			}
			return value;
		}
	},{
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})	
	} ];
	PackageDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		delForbidden :true,
		title : "装车清单",
		option : "装车清单",
		tbarItems : tbarItems,
		height : this.height,
		fields : PackageDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelPackageMaterialsPackage.do"
	}, this.grid_config || {}));
};
Ext.extend(PackageDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0
		};
	},	
	getDetailData : function(){
		var detailData = [];
		this.dispacthId
		for(var i=0;i<this.getStore().getCount();i++){
			detailData[i] = this.getStore().getAt(i).data;
		}
		return detailData;
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			demandId : this.demandId,
			commodityId : data.commodityId,
			mnemonicCode : data.mnemonics,
			commodity : data.materialsCommodity.commodity,
			specifications : data.specifications,
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsPackSelector({
			collectEnable : true,
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	showSummary : function() {
		//remove前一次点击 insert 的 record  (隐藏效果)
		var records = Array();
		for(var i=0;i<this.getStore().getCount();i++) {
			if(this.getStore().getAt(i).data.detailId==null) {
				records.push(this.getStore().getAt(i));
			}
		}
		if(records.length>0) {
			this.getStore().remove(records);
			return;
		}
		
		var arr = Array();
		var store = this.getStore();
		var indexs = Array();  //记录小计插入位置index
		//汇总小计
		for(var i=0;i<store.getCount();i++) {
			if(arr.length==0) {
				arr.push({
					commodityId : store.getAt(i).data.commodityId,
					commodity : store.getAt(i).data.commodity,
					measurementUnit : store.getAt(i).data.measurementUnit,
					secondUnitConversion : store.getAt(i).data.secondUnitConversion,
					auxiliaryQuantity : store.getAt(i).data.auxiliaryQuantity,
					dispatchNumber : store.getAt(i).data.dispatchNumber,
					rentQuantity : store.getAt(i).data.rentQuantity,
					loadQuantity : store.getAt(i).data.loadQuantity,
					packageQuantity : store.getAt(i).data.packageQuantity,
					convertedQuantity : store.getAt(i).data.convertedQuantity
				});
			}else{
				var alreadyAdd = false;
				for(var j=0;j<arr.length;j++) {
					if(arr[j].commodityId==store.getAt(i).data.commodityId) {
						arr[j].dispatchNumber = Number(arr[j].dispatchNumber)+Number(store.getAt(i).data.dispatchNumber);
						arr[j].rentQuantity = Number(arr[j].rentQuantity)+Number(store.getAt(i).data.rentQuantity);
						arr[j].loadQuantity = Number(arr[j].loadQuantity)+Number(store.getAt(i).data.loadQuantity);
						arr[j].packageQuantity = Number(arr[j].packageQuantity)+Number(store.getAt(i).data.packageQuantity);
						arr[j].convertedQuantity = Number(arr[j].convertedQuantity)+Number(store.getAt(i).data.convertedQuantity);
						alreadyAdd = true;
					}
				}
				if(!alreadyAdd) {
					indexs.push(i);
					arr.push({
						commodityId : store.getAt(i).data.commodityId,
						commodity : store.getAt(i).data.commodity,
						measurementUnit : store.getAt(i).data.measurementUnit,
						secondUnitConversion : store.getAt(i).data.secondUnitConversion,
						auxiliaryQuantity : store.getAt(i).data.auxiliaryQuantity,
						dispatchNumber : store.getAt(i).data.dispatchNumber,
						rentQuantity : store.getAt(i).data.rentQuantity,
						loadQuantity : store.getAt(i).data.loadQuantity,
						packageQuantity : store.getAt(i).data.packageQuantity,
						convertedQuantity : store.getAt(i).data.convertedQuantity
					});
				}
			}
		}
		//将小计插入Grid
		if(arr.length>0) {
			indexs.push(store.getCount());
			var rowIndex = indexs;
			for(var i=0;i<arr.length;i++){
				arr[i].remark="小计";
				arr[i].supplementQuantity=Number(arr[i].supplementQuantity).toFixed(2);
				var record = new Ext.data.Record(arr[i]);
				record.json=-1;
				store.insert(rowIndex[i]+i,record);
				this.getView().addRowClass(rowIndex[i]+i, "x-grid-back-purple");
			}
		} 
	}
});