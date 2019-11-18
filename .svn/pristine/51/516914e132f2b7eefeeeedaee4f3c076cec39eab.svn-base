var LogisticsTrancarfeeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	var columns = [ {
		header : "运输车辆",
		dataIndex : "licensePlate"
	}, {
		header : "车型",
		dataIndex : "sedan"
	}, {
		header : "车次台班",
		dataIndex : "motorcoach",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "产权归属",
		dataIndex : "propertyName"
	}, {
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "小计",
		dataIndex : "amount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			var motorcoach = Number(record.data.motorcoach);
			var unitPrice = Number(record.data.unitPrice);
			var summary = motorcoach * unitPrice;
			record.data.amount = summary;
			return summary;
		}
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	LogisticsTrancarfeeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : LogisticsTrancarfeeListViewField,
		title : "运输费清单",
		option : "运输费清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelTrancarfeeLogisticsTransport.do"
	}, this.grid_config || {}));
};
Ext.extend(LogisticsTrancarfeeGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.amount);
		}
		return summaryAmount;
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.carId == data.carId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			carId : data.carId,
			motorcoach : 0,
			unitPrice : 0,
			licensePlate : data.licensePlate,
			sedan : data.sedan,
			propertyName : data.propertyName
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new CarSelector({
			params : {
				"Q_delFlag_S_EQ" : "1"
			},
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});