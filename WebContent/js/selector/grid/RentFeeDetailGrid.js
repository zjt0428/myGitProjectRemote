var RentFeeDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params["reportType"] = "xls";
	var width = width;
	
	var tbarItems = [];
	tbarItems.push({
//		hidden : true,
		iconCls : "btn-head-add",
		text : "统计",
		handler : this.calculate.createDelegate(this)
	});
	var columns = [ {
		width : width,
		header : "设备自编号",
		dataIndex : "equipmentNo"
	}, {
		width : width,
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		width : width,
		header : "设备型号",
		dataIndex : "equipSpecificName"
	}, {
		width : width,
		header : "启停日期",
		dataIndex : "activateDate"
	}, {
		width : width,
		header : "起止时间",
		dataIndex : "startDate"
	}, {
		width : width,
		header : "截止时间",
		dataIndex : "endDate"
	}, {
		width : width,
		header : "天数",
		dataIndex : "days",
		renderer : function (value,record,data){
			var B = data.get("startDate");
			var C = data.get("endDate");
			var A = data.get("activateDate");
			if(B <= A && A <= C){
				var d1 = new Date(A).getTime();
				var d2 = new Date(C).getTime();
				data.days = (d2-d1)/(1000*60*60*24)+1;
				return data.days.toFixed(0);
			}else if(A<=B){
				var d1 = new Date(B).getTime();
				var d2 = new Date(C).getTime();
				data.days = (d2-d1)/(1000*60*60*24)+1;
				return data.days.toFixed(0);
			}
			data.days = 0;
			return data.days;
			
		}
	}, {
		width : width,
		header : "日租金",
		dataIndex : "rentStandard"
	}, {
		width : width,
		header : "单位",
		dataIndex : "rentUnit"
	}, {
		width : width,
		header : "费用小计",
		dataIndex : "totalAmount",
		renderer : function (value,record,data){
			var days = data.days;
			var rentStandard = data.get("rentStandard");
			var feeType = data.get("feeType");
			if(days!=null && rentStandard!=null){
				if(feeType=="停用管理"){
					data.totalAmount =Number(days)*(-1)*Number(rentStandard);
					data.data.totalAmount=data.totalAmount;
					return data.totalAmount.toFixed(2);
				}else{
					data.totalAmount =Number(days)*Number(rentStandard);
					data.data.totalAmount=data.totalAmount;
					return data.totalAmount.toFixed(2);
				}
			}
			data.totalAmount = 0;
			return data.totalAmount;
			
		}
	}, 
	{
		width : width,
		header : "费用类型",
		dataIndex : "feeType"
	}];
	RentFeeDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		exportable : false,
		fields : RentFeeDetailViewField,
		height : this.height,
		loadurl : this.loadUrl,
		base_params : this.params,
		tbarItems : tbarItems,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(RentFeeDetailGrid, Knight.ux.SubModuleBaseGrid, {
	
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			item : data.item,
			amount : data.amount
			
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	calculate : function() {
		var num = 0;
		for(var i=0; i<this.getStore().getCount(); i++) {
			num += Number(this.getStore().getAt(i).data.totalAmount);
		}
		alert(num.toFixed(2));
	}
	
});