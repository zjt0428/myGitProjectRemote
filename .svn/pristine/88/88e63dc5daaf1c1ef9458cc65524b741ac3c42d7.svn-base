var LeaseSettlementInsideBlockUpGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [ {
		header : "报停主题",
		dataIndex : "blockTitle",
	}, {
		header : "报停单号",
		dataIndex : "blockSerial"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "租借单位",
		dataIndex : "leaseUnit"
	}, {
		header : "内部结算金额",
		dataIndex : "insideAmount"
	}, {
		header : "起始日期",
		dataIndex : "startDate"
	}, {
		header : "截止日期",
		dataIndex : "endDate"
	}
]
	
	LeaseSettlementInsideBlockUpGrid.superclass.constructor.call(this, Ext.apply({
		title : "内部报停费用清单",
		saveable : this.saveable,
		addForbidden : true,
		fields : LeaseSettlementBlockUpViewField,
		loadurl : this.loadUrl,
		tbarItems : this.tbarItems,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(LeaseSettlementInsideBlockUpGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.blockId == data.blockId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			blockId : data.blockId,
			blockTitle : data.blockTitle,
			blockSerial : data.blockSerial,
			projectName : data.projectName,
			leaseUnit : data.leaseUnit,
			insideAmount : data.insideAmount,
			startDate : data.startDate,
			endDate : data.endDate
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	accumulationAmount : function () {
		var total = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			total += (this.getStore().getAt(i).data.insideAmount) * 10e5;
		}
		return total / 10e5;
	},
	queryDetail : function(data) {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【查看】的记录！");
			return;
		}
		if (a.length >1 ) {
			$toast("请不要选择多条数据！");
			return;
		}
		data.selection = a[0];
		
		var startDate1 = new Date(a[0].data.startDate);
		var startDate2 = new Date(data.params.startDate);
		if(startDate1.getTime()>startDate2.getTime()){
			data.params.startDate = a[0].data.startDate;
		}
		var endDate1 = new Date(a[0].data.endDate);
		var endDate2 = new Date(data.params.endDate);
		if(endDate1.getTime()<endDate2.getTime()){
			data.params.endDate = a[0].data.endDate;
		}
		new SettleMaterialsFeeDetailForm(data, {
			title : "内部报停费用清单",
			relateModule : "INSIDE_BLOCK_UP", 
			backOff : data.backOff,
			saveable : true,
			callback : function() {
			}.createDelegate(this)
		}).show();
	}
})