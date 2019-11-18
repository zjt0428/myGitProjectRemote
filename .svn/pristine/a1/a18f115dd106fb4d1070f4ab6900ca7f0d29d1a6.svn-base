var SettleMaterialsDetailGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
//	var smf = Ext.getCmp("SettleMaterialsForm");
//	var backOff = smf.fieldSelect.getValue()[0].inputValue;
	var backOff = this.backOff;
	var arr_in= ['初始化','正常出租','项目间调拨入库','租借出租','项目维修入库','租借维修入库'];
	var arr_out = ['正常回收','项目间调拨出库','退货管理','项目维修出库','租借维修出库','丢失赔偿出库'];
	
	var tbarItems = [{
		hidden : !this.exportable,
		iconCls : "btn-head-exporter",
		text : "导出",
		handler : this.exportGridData.createDelegate(this)
	}];
	
	var columns = [{
		hidden : true,
		header : "规格id",
		dataIndex : "specificationsId"
	}, {
		hidden : true,
		header : "方式",
		dataIndex : "operationWay"
	}, {
		hidden : true,
		header : "换算系数",
		dataIndex : "conversionNum"
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
		header : "品名",
		dataIndex : "commodity"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "unit"
	}, {
		header : "数量",
		dataIndex : "quantity"
	}, {
		header : "辅助单位",
		dataIndex : "supplementUnit"
	}, {
		header : "辅助数量",
		dataIndex : "supplementQuantity"
	}, {
		hidden : this.display?false : true,
		header : "起始时间",
		dataIndex : "beginDate"
	}, {
		hidden : this.display?false : true,
		header : "截止时间",
		dataIndex : "stopDate"
	}, {
		hidden : this.display?false : true,
		header : "天数",
		dataIndex : "days"
	}, {
		hidden : this.display?true : false,
		header : "赔偿单价",
		dataIndex : "compensationUnit"
	}, {
		hidden : this.display?false : true,
		header : "日租金",
		dataIndex : "dailyRent"
	}, {
		hidden : this.display?false : true,
		align :"right",
		header : "累计在租数量",
		dataIndex : "totalRent",
		renderer : function(value,meta,rec,row,col,store) {
			if(row>0&&rec.data.specificationsId==store.getAt(row-1).data.specificationsId) {
				if(arr_in.indexOf(rec.data.operationWay)>=0) {
					value = Number(store.getAt(row-1).data.totalRent)+Number(rec.data.supplementQuantity);
				}else {
					value = Number(store.getAt(row-1).data.totalRent)-Number(rec.data.supplementQuantity);
				}
			}else if(row>0&&arr_out.indexOf(rec.data.operationWay)>=0&&rec.data.specificationsId!=store.getAt(row-1).data.specificationsId) {
				value = -Number(rec.data.supplementQuantity);
			}else if(row==0&&arr_out.indexOf(rec.data.operationWay)>=0) {
				value = -Number(rec.data.supplementQuantity);
			}else{
				value = Number(rec.data.supplementQuantity);
			}
			rec.data.totalRent = value.toFixed(2);
			return value.toFixed(2);
		}
	}, {
		hidden : this.display?false : true,
		align :"right",
		header : "金额",
		dataIndex : "rentAmount",
		renderer : function(value,meta,rec,row,col,store) {
			if(backOff=='1'&&row>0&&rec.data.specificationsId==store.getAt(row-1).data.specificationsId) {
				if(store.getAt(row-1).data.totalRent<=0) {
					if(arr_in.indexOf(rec.data.operationWay)>=0&&rec.data.totalRent>=0) {
						value = Number(rec.data.totalRent)*Number(rec.data.days)*Number(rec.data.dailyRent);
					} else {
						value = 0;
					}
				} else if(store.getAt(row-1).data.totalRent>0&&rec.data.totalRent<0) {
					value = -Number(store.getAt(row-1).data.totalRent)*Number(rec.data.days)*Number(rec.data.dailyRent);
				}
			}
			if(backOff=='1'&&row>0&&rec.data.specificationsId!=store.getAt(row-1).data.specificationsId&&rec.data.totalRent<=0) {
				value = 0;
			}
			if(backOff=='1'&&row==0&&rec.data.totalRent<=0) {
				value = 0;
			}
			rec.data.rentAmount = Number(value).toFixed(2);
			return Number(value).toFixed(2);
		}
	},{
		hidden : this.display?true : false,
		header : "金额",
		dataIndex : "amount"
	}]
	
	SettleMaterialsDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		addForbidden : true,
		fields : SettleMaterialsDetailViewField,
		loadurl : this.loadUrl,
		base_params : this.params,
		tbarItems : tbarItems,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(SettleMaterialsDetailGrid, Knight.ux.SubModuleBaseGrid, {
	exportGridData : function() {
		$exportGridData(this, __ctxPath + "/materials/exportGridStoreLeaseSettlement.do", this.title);
	}
})