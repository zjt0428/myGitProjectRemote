var SettlementListGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var arr_in= ['收货管理','租借维修入库'];
	var arr_out = ['退货管理','租借维修出库','租借丢失赔偿'];
	
	var tbarItem = [{
		hidden : this.saveable,
		iconCls : "btn-head-exporter",
		text : "导出",
		handler : this.exportGridData.createDelegate(this)
	}];
	if(Ext.isEmpty(this.tbarItems)) {
		this.tbarItems = tbarItem;
	}else {
		this.tbarItems.push(tbarItem);
	}
	
	var columns = [{
		hidden : true,
		dataIndex : "commodityId"
	}, {
		hidden : true,
		dataIndex : "specificationsId"
	}, {
		xtype : "datecolumn",
		header : "单据日期",
		dataIndex : "receiptDate",
		format : "Y-m-d"
	}, {
		header : "单据类型",
		dataIndex : "receiptType"
	}, {
		header : "单据号码",
		dataIndex : "relateSerial"
	}, {
		header : "周材品名",
		dataIndex : "commodity"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "数量",
		dataIndex : "quantity"
	}, {
		header : "辅助单位",
		dataIndex : "unitConversion"
	}, {
		header : "辅助数量",
		dataIndex : "auxiliaryNum"
	}, {
		xtype : "datecolumn",
		header : "起始日期",
		dataIndex : "beginDate",
		format : "Y-m-d"
	}, {
		xtype : "datecolumn",
		header : "截止日期",
		dataIndex : "stopDate",
		format : "Y-m-d"
	}, {
		header : "天数",
		dataIndex : "conversionDays"
	}, {
		header : "日租金",
		dataIndex : "dailyRent"
	}, {
		header : "金额",
		dataIndex : "amount"
	}, {
		header : "累计在租数量",
		dataIndex : "totalRent",
		renderer : function(value,meta,rec,row,col,store) {
			if(row>0&&rec.data.specificationsId==store.getAt(row-1).data.specificationsId) {
				if(arr_in.indexOf(rec.data.receiptType)>=0) {
					value = Number(store.getAt(row-1).data.totalRent)+Number(rec.data.quantity);
				}else {
					value = Number(store.getAt(row-1).data.totalRent)-Number(rec.data.quantity);
				}
			}else if(row>0&&rec.data.specificationsId!=store.getAt(row-1).data.specificationsId) {
				if(arr_out.indexOf(rec.data.receiptType)>=0) {
					value = -Number(rec.data.quantity);
				}else {
					value = Number(rec.data.quantity);
				}
			}else if(row==0&&arr_out.indexOf(rec.data.receiptType)>=0) {
				value = -Number(rec.data.quantity);
			}else{
				value = rec.data.quantity;
			}
			rec.data.totalRent = value;
			return value;
		}
	}]
	
	SettlementListGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		//delForbidden : true,
		title : "租借结算清单",
		option : "租借结算",
		fields : SettlementListListViewField,
		tbarItems : this.tbarItems,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelListLeaseSettlement.do"
	}, this.grid_config || {}));
}
Ext.extend(SettlementListGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		/*// 去重
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}*/
		this.addRecordHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			commodityId : data.commodityId,
			specificationsId : data.specificationsId,
			specifications : data.specifications,
			receiptDate : data.receiptDate,
			receiptType : data.receiptType,
			relateSerial : data.relateSerial,
			commodity : data.commodity,
			quantity : data.quantity,
			auxiliaryNum : (Number(data.quantity) * (Number(data.convertedQuantity) * 10e5)) / 10e5,
			dailyRent : data.dailyRent,
			measurementUnit : data.measurementUnit,
			unitConversion : data.unitConversion,
			convertedQuantity : data.convertedQuantity,
			beginDate : data.beginDate,
			stopDate : Ext.getCmp("endDate").getValue(),
			conversionDays : data.days,
			amount : this.oppositeNumber(data)
		});
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0);
	},
	accumulationAmount : function () {
		var total = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			total += (this.getStore().getAt(i).data.amount) * 10e5;
		}
		return total / 10e5;
	},
	oppositeNumber : function(data) {
		var total = 0;
		var arr = ["上期结存","收货管理","租借维修入库"];
		if (arr.indexOf(data.receiptType)>=0) {
			total = ((Number(data.quantity) * (Number(data.convertedQuantity) * 10e5) * (Number(data.dailyRent) * 10e5) * Number(data.days)) / 10e5) / 10e5;
		} else {
			total = ((Number(data.quantity) * (Number(data.convertedQuantity) * 10e5) * (Number(0 - Math.abs(data.dailyRent)) * 10e5) * Number(data.days)) / 10e5) / 10e5;
		}
		return total.toFixed(2);
	},
	exportGridData : function() {
		$exportGridData(this, __ctxPath + "/materials/exportGridStoreLeaseSettlement.do", "租赁费用清单");
	}
})