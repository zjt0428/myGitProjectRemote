/**
 * <pre><code>
 * saveable : Boolean,
 * height : Number,
 * measurementData : Array
 * </code></pre>
 */
var RentItemBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		width : 100,
		header : "费用项目",
		dataIndex : "rentItemName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.reimburseTypeData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.rentItemName = value;
			return value;
		}
	}, {
		width : 100,
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 9999
		})
	}, {
		width : 100,
		header : "费用单价",
		dataIndex : "unitprice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 9999999
		})
	}, {
		width : 80,
		header : "计量单位",
		dataIndex : "measurement",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.measurementData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.measurement = value;
			return value;
		}
	}, {
		width : 80,
		header : "应扣租金",
		dataIndex : "deductRent",
		editor : new Ext.form.NumberField({
			maxValue : 9999999
		})
	}, {
		width : 80,
		header : "费用累计",
		dataIndex : "itemCumulate",
		renderer : function(value, metadata, record) {
			var unitprice = record.data.unitprice;
			var quantity = record.data.quantity;
			var itemCumulate = unitprice * quantity;
			record.data.itemCumulate = itemCumulate;
			return itemCumulate;
		}
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var itemCumulate = record.data.itemCumulate;
			var deduct = record.data.deductRent;
			var summary = itemCumulate - deduct;
			record.data.summary = summary;
			return summary;
		}
	}, {
		width : 100,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "设备编号",
		dataIndex : "recordId"
	} ];
	if (this.saveable && this.contractId) {
		this.tbarItems = [ {
			iconCls : "btn-loading",
			text : "设备",
			handler : this.loadEquipmentResource.createDelegate(this)
		} ];
	}
	RentItemBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : RentItemBriefListViewField,
		title : "其他费用结算信息",
		option : "其他费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelItemBriefRentContract.do"
	}, this.grid_config || {}));
};
Ext.extend(RentItemBriefGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		var measurement = "";
		try {
			measurement = this.measurementData[0][1];
		} catch (e) {
		}
		return {
			rentId : this.rentId,
			rentItemName : "其他费用",
			quantity : 0,
			unitprice : 0,
			measurement : measurement,
			deductRent : 0
		};
	},
	loadEquipmentResource : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要结算的信息！");
			return;
		}
		new EquipSelector({
			callback : function(d) {
				for (var i = 0; i < a.length; i++) {
					a[i].set("equipId", d[0].get("equipId"));
					a[i].set("recordId", d[0].get("recordId"));
				}
			}.createDelegate(this)
		}).show();
	}
});