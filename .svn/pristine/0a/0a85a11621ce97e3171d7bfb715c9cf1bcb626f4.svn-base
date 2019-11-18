var ReceiveManageDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.returnable = this.returnable ? true : false;
	this.saveable = this.saveable ? true : false;
	var parentForm = this.parentForm;
	this.currentDate = new Date();
	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "助记码",
		dataIndex : "mnemonics"
	}, {
		header : "单位",
		dataIndex : "unit"
	}, {
		header : "库存数量",
		dataIndex : "locationCounts"
	}, /*{
		header : "领用时间",
		dataIndex : "receiveDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.receiveDate = value;
			return value;
		}
	},*/ {
		header : "领用数量",
		dataIndex : "receiveCounts",
		editor : new Ext.form.NumberField({
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
            if (value>record.data.locationCounts) {
                Ext.MessageBox.alert("提示","领用数量不能大于库存数量！");
            }
            return value;
		}
	}, {
		header : "单价",
		dataIndex : "price",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999,
			decimalPrecision: 5
		})
	}, {
		header : "金额",
		dataIndex : "amount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision: 2
		}),
		renderer : function(value, metadata, record) {
            if(value!=record.data.amount1){
                record.data.amount1 = value;
                return value;
            }
			var receiveCounts = Number(record.data.receiveCounts);
			var price = Number(record.data.price);
			record.data.amount = receiveCounts * price;
			record.data.amount1 = receiveCounts * price;
			return Ext.util.Format.number(record.data.amount, "0.00");
		}
	}, {
		width : 80,
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "归还时间",
		dataIndex : "returnDate",
		value : this.currentDate
	},  {
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "归还数量",
		dataIndex : "returnCounts",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999,
			decimalPrecision: 5
		})
	},{
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			readOnly : !this.saveable,
			maxLength : 32
		})
	}/*, {
		width : 120,
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "归还仓库",
		dataIndex : "returnStoreId",
		editor : new Ext.ux.form.SimpleCombo({
			allowBlank : true,
			codeData : this.storeHouseData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			if (!Ext.isEmpty(store.data)) {
				var index = store.find("code", value);
				if (index != -1) {
					return store.getAt(index).data.name;
				}
			} else {
				return record.data.returnStoreName;
			}
			return value;
		}
	}, {
		header : "当前状态",
		dataIndex : "statusName"
	} */];
	ReceiveManageDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ReceiveManageDetailListViewField,
		title : "领用零周材信息",
		option : "周材信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelDetail.do",
		grid_view : {
			clicksToEdit : (this.saveable || this.returnable) ? 1 : 5,
		}
	}, this.grid_config || {}));
};
Ext.extend(ReceiveManageDetailGrid, Knight.ux.SubModuleBaseGrid, {
	
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	beforeedit : function(a) {
		if ("returnStoreId" == a.field) {
			return this.returnable;
		}
		return this.saveable;
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		var receiveDate = this.parentForm.findFormField("receiveDate").getValue();
		var ReceiveManageDetail = this.getStore().recordType;
		var receiveManageDetail = new ReceiveManageDetail();
		Ext.apply(receiveManageDetail.data, {
			receiveId : this.receiveId,
			mnemonics : data.mnemonics,
			commodity : data.materialsCommodity.commodity,
			specifications : data.specifications,
			unit : data.firstUnitConversion,
			locationCounts : data.componCategory,
			price : data.dailyRent,
			remark : "",
			amount : 0
		});
		this.stopEditing();
		this.getStore().add(receiveManageDetail);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addHeight(recordHeight);
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});