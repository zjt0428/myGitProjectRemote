var RecycleManageFeeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var feeCategoryData = [];
	//Grid数据删除后重新计算装卸费总和
	this.recordcallback = function() {
		this.delAction();
	}.createDelegate(this);
	var tbarItems = [];
	if (this.saveable) {
		tbarItems.push({
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadDetail.createDelegate(this)
		});
	}
	var columns = [ {
		header : "品名",
		dataIndex : "commodity",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.materialsCommodityData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.commodity = value;
			}
			return value;
		}
	}, {
		header : "收费类型",
		dataIndex : "chargeType",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.feesTypeData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.chargeType = value;
			}
			feeCategoryData = $ajaxSyncCall(__ctxPath + "/materials/listAssembleAndDisassembleFee.do",{
				"Q_materialsCommodity.commodity_S_EQ" : record.data.commodity,
				"Q_feesType_S_EQ" : record.data.chargeType=='卸车费'? 2 : record.data.chargeType=='打包费'? 3 : 1 
			});
			return value;
		}
	}, {
		header : "收费类别",
		dataIndex : "feeCategory",
		renderer : function(value, metadata, record) {
			if(feeCategoryData.result.length>0){
				value = feeCategoryData.result[0].feeCategory;
			}
			record.data.feeCategory = value;
			return value;
		}
	}, {
		header : "收费单价",
		dataIndex : "chargePrice",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		header : "收费数量",
		dataIndex : "chargeQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		header : "收费金额",
		dataIndex : "chargeAmount",
		renderer : function(value,medata,record){
			value = (Number(record.data.chargePrice)*Number(record.data.chargeQuantity)).toFixed(2);
			record.data.chargeAmount = value;
			this.calculateCharge();
			return value;
		}.createDelegate(this)
	}, {
		id : "leaseAmount",
		header : "计租金额",
		dataIndex : "leaseAmount",
		renderer : function(value,metadata,record){
			if(record.get("chargeWay")=="1"){
				value = 0;
				record.data.leaseAmount = value;
			}else{
				var chargePrice = Number(record.get("chargePrice"));
				var chargeQuantity = Number(record.get("chargeQuantity"));
				value = chargePrice*chargeQuantity;
				record.data.leaseAmount = value.toFixed(2);
			}		
//			this.change();
			return value.toFixed(2);
		}.createDelegate(this)
	}, {
		header : "收费方式",
		dataIndex : "chargeWay",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.paymentTypeData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			return value;
		}
	}, {
		hidden : true,
		header : "操作",//用于判断点击了新增，还是加载
		dataIndex : "action"
	}];

	RecycleManageFeeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : false,
		fields : ["feeId","commodity","chargeType","chargePrice","chargeQuantity","chargeAmount","chargeWay","feeCategory"],
		title : "费用清单",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelFeeRecycleManage.do"
	}, this.grid_config || {}));
};
Ext.extend(RecycleManageFeeGrid, Knight.ux.SubModuleBaseGrid, {
	loadDetail : function() {
		this.getStore().removeAll();
		var costHandleSet = this.costHandleSet;
		var recycleManageDetailData =  this.recycleManageDetailGrid.getDetailData();
		var temporaryStorageData =  this.temporaryStorageGrid.getDetailData();
		for(var j=0;j<costHandleSet.length;j++){
			if(costHandleSet[j].feesType=='2'){		//卸车费
				var chargeQuantity = 0;
				for(var i=0;i<recycleManageDetailData.length;i++){
					if(recycleManageDetailData[i].commodityId==costHandleSet[j].commodityId ){
						chargeQuantity += Number(recycleManageDetailData[i].truckLoadingCount)*Number(recycleManageDetailData[i].conversionNum)*Number(costHandleSet[j].theoriesValueConversion);
					}
				}
				for(var i=0;i<temporaryStorageData.length;i++){
					if(temporaryStorageData[i].commodityId==costHandleSet[j].commodityId ){
						chargeQuantity += Number(temporaryStorageData[i].temporaryQuantity)*Number(temporaryStorageData[i].conversionNum)*Number(costHandleSet[j].theoriesValueConversion);
					}
				}
				if(chargeQuantity!= 0){
					costHandleSet[j].chargeQuantity = (chargeQuantity/1000).toFixed(2);
					this.addSubModuleDate(costHandleSet[j]);
				}
			}
			if(costHandleSet[j].feesType=='3'){		//打包费
				var chargeQuantity = 0;
				for(var i=0;i<recycleManageDetailData.length;i++){
					if(recycleManageDetailData[i].commodityId==costHandleSet[j].commodityId ){
						chargeQuantity += Number(recycleManageDetailData[i].packageCount)*Number(recycleManageDetailData[i].conversionNum)*Number(costHandleSet[j].theoriesValueConversion);
					}
				}
//				暂存清单只需要计算卸车费
//				for(var i=0;i<temporaryStorageData.length;i++){
//					if(temporaryStorageData[i].commodityId==costHandleSet[j].commodityId ){
//						chargeQuantity += Number(temporaryStorageData[i].temporaryQuantity)*Number(temporaryStorageData[i].conversionNum)*Number(costHandleSet[j].theoriesValueConversion);
//					}
//				}
				if(chargeQuantity!= 0){
					costHandleSet[j].chargeQuantity = (chargeQuantity/1000).toFixed(2);
					this.addSubModuleDate(costHandleSet[j]);
				}
			}
		}
		this.calculateCharge();
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			commodityId : data.commodityId,
			commodity : data.commodity,
			chargeType : data.feesTypeName,
			feeCategory : data.feeCategory,
			chargePrice : data.chargeUnitPrice,
			chargeQuantity : data.chargeQuantity,
			chargeAmount : (Number(data.chargeUnitPrice)*Number(data.chargeQuantity)).toFixed(2),
			chargeWay : data.feesType=='3'? 2 : 1,   //打包费默认 转账
			leaseAmount : 0,
			action : 'load'
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	delAction : function() {
		var m = this.getSelectionModel().getSelections();
		var handingCharge = 0;
		var packageCharge = 0;
		for(var i=0;i<this.getStore().getCount();i++){
			if(this.getStore().getAt(i).data.chargeType.indexOf('卸车费')==0){
				handingCharge += Number(this.getStore().getAt(i).data.chargeAmount);
			}
			if(this.getStore().getAt(i).data.chargeType.indexOf('打包费')==0){
				packageCharge += Number(this.getStore().getAt(i).data.chargeAmount);
			}
		}
		if(m.length>0){
			for(var j=0;j<m.length;j++){
				if(m[j].data.chargeType.indexOf('卸车费')==0){
					handingCharge -= Number(m[j].data.chargeAmount);
				}
				if(m[j].data.chargeType.indexOf('打包费')==0){
					packageCharge -= Number(m[j].data.chargeAmount);
				}
			}
		}
		Ext.getCmp('recycleManage_handingCharge').setValue(handingCharge.toFixed(2));
		Ext.getCmp('recycleManage_packageCharge').setValue(packageCharge.toFixed(2));
	},
	createSubModule : function(){
		return {
			commodity : 1,
			chargeType : 2,
			chargePrice : 0,
			chargeQuantity : 0,
			action : 'create'
		}
	},
	calculateCharge : function() {
		var handingCharge = 0;
		var packageCharge = 0;
		for(var i=0;i<this.getStore().getCount();i++){
			if(this.getStore().getAt(i).data.chargeType.indexOf('卸车费')==0){
				handingCharge += Number(this.getStore().getAt(i).data.chargeAmount);
			}
			if(this.getStore().getAt(i).data.chargeType.indexOf('打包费')==0){
				packageCharge += Number(this.getStore().getAt(i).data.chargeAmount);
			}
		}
		Ext.getCmp('recycleManage_handingCharge').setValue(handingCharge.toFixed(2));
		Ext.getCmp('recycleManage_packageCharge').setValue(packageCharge.toFixed(2));
	}
});