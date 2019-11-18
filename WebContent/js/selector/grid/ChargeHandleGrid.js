var ChargeHandleGrid = function(a,b) {
	Ext.apply(this, a||{});
	Ext.apply(this, b||{});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
//	this.recordcallback = function() {
//		this.delAction();
//	}.createDelegate(this);
	var paymentTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "paymentType"
	});
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
		dataIndex : "commodity"
	},{
		header : "收费类型",
		dataIndex : "feesTypeName"
	},{
		header : "收费类别",
		dataIndex : "feeCategory"
	}, {
		header : "收费单价",
		dataIndex : "chargeUnitPrice"
	}, {
		xtype: 'numbercolumn',
		header : "收费数量",
		dataIndex : "chargeQuantity"	
	}, {
		xtype: 'numbercolumn',
		header : "收费金额",
		dataIndex : "chargeAmount"	
	}, {
		id : "leaseAmount",
		header : "计租金额",
		dataIndex : "leaseAmount",
		renderer : function(value,metadata,record){
			if(record.get("chargeMode")=="1"){
				value = 0;
				record.data.leaseAmount = 0;
			}else{
				var chargeUnitPrice = Number(record.get("chargeUnitPrice"));
				var chargeQuantity = Number(record.get("chargeQuantity"));
				value = chargeUnitPrice*chargeQuantity;
				record.data.leaseAmount = value.toFixed(2);
			}		
			return value.toFixed(2);
		}.createDelegate(this)
	},{
		header : "收费方式",
		dataIndex : "chargeMode",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : paymentTypeData
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
	} ];
	ChargeHandleGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : false,
		addForbidden : true,
		title : "费用处理",
		option : "费用处理",
		tbarItems : tbarItems,
		height : this.height,
		fields : ChargeHandleListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelHandleTemporaryReturn.do",
	}, this.grid_config || {}));
};
Ext.extend(ChargeHandleGrid, Knight.ux.SubModuleBaseGrid, {	
	loadDetail : function() {
		this.getStore().removeAll();
		$request({
			url :  __ctxPath + "/dispatch/loadContractMaterials.do",
			params : {
				contractmaId : this.contractId
			},
			success : function(g,h){
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data;
				var costHandleSet = data[0].costHandleSet;
				var detailData =  this.temporaryReturnDetailGrid.getDetailData();
				for(var j=0;j<costHandleSet.length;j++){
					if(costHandleSet[j].feesType=='3'){//包装费
						var quantity = 0;
						for(var i=0;i<detailData.length;i++){
						    if(detailData[i].commodityId==costHandleSet[j].commodityId && detailData[i].returnQuantity != null){
								quantity += Number(detailData[i].returnQuantity)* Number(detailData[i].conversionNum)*Number(costHandleSet[j].theoriesValueConversion);//把所有的辅助数量相加起来
						    }
						}	  
						if(quantity!=0){
							costHandleSet[j].quantity = (quantity/1000).toFixed(2);
							this.addSubModuleDate(costHandleSet[j]);
						}
					}
					if(costHandleSet[j].feesType=='1'){//装车费
						var quantity = 0;
						for(var i=0;i<detailData.length;i++){
						    if(detailData[i].commodityId==costHandleSet[j].commodityId && detailData[i].returnQuantity != null){
								quantity += Number(detailData[i].returnQuantity)* Number(detailData[i].conversionNum)*Number(costHandleSet[j].theoriesValueConversion);
						    }
						}	  
						if(quantity!=0){
							costHandleSet[j].quantity = (quantity/1000).toFixed(2);
							this.addSubModuleDate(costHandleSet[j]);
						}
					}
				}
			}.createDelegate(this)
		})
		
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			commodityId : data.commodityId,
			measurementUnit : data.measurementUnit,
			commodity : data.commodity,
			feesType : data.feesType,
			feesTypeName : data.feesTypeName,
			chargeUnitPrice : data.chargeUnitPrice,
			chargeQuantity : data.quantity,
			chargeMode : 1,
			chargeAmount : (Number(data.chargeUnitPrice)*Number(data.quantity)).toFixed(2),
			feeCategory : data.feeCategory
//			theoriesValueConversion : data.theoriesValueConversion
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	delAction : function(){
		var m = this.getSelectionModel().getSelections();
		var handingCharges = 0;
		var packAmounts = 0;
		for(var i=0;i<this.getStore().getCount();i++){
			if(this.getStore().getAt(i).data.feesType=='1'){
				handingCharges += Number(this.getStore().getAt(i).data.chargeAmount);
			}
			if(this.getStore().getAt(i).data.feesType=='3'){
				packAmounts += Number(this.getStore().getAt(i).data.chargeAmount);
			}
		}
		if(m.length>0){
			for(var j=0;j<m.length;j++){
				if(m[j].data.feesType=='1'){
					handingCharges -= Number(m[j].data.chargeAmount);
				}
				if(m[j].data.feesType=='3'){
					packAmounts -= Number(m[j].data.chargeAmount);
				}
			}
		}
		Ext.getCmp('materials_handingCharge').setValue(handingCharges.toFixed(0));
		Ext.getCmp('materials_packAmount').setValue(packAmounts.toFixed(0));
	}
});
