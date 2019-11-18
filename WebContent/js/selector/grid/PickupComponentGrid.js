var PickupComponentGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.returnable = this.returnable ? true : false;
	this.saveable = this.saveable ? true : false;
	var parentForm = this.parentForm;
	this.currentDate = new Date();
	var columns = [ {
		header : "零配件编号",
		dataIndex : "componSerial"
	}, {
		hidden : true,
		header : "零配件类别",
		dataIndex : "componCategoryName"
	}, {
		header : "零配件名称",
		dataIndex : "componGenericName"
	}, {
		header : "配件型号",
		dataIndex : "dimensions"
	}, {
		header : "库存数量",
		dataIndex : "consumeCounts"
	}, {
		hidden : true,
		header : "资产现值",
		dataIndex : "presentValue"
	}, {
		header : "领用时间",
		dataIndex : "pickupDate",
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
			record.data.pickupDate = value;
			return value;
		}
	}, {
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 8
		})
	}, {
		header : "领用数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
//			decimalPrecision : 0,
//			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
            if (value>record.data.consumeCounts) {
                Ext.MessageBox.alert("提示","领用数量不能大于库存数量！");
//                parentForm.topbar.getComponent(2).disabled=true;
            }
//            parentForm.topbar.getComponent(2).disabled=false;
//            record.data.quantity = value;
            return value;
    }
	}, {
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999,
			decimalPrecision: 5
		})
	}, {
		header : "合计",
		dataIndex : "summary",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision: 2
		}),
		renderer : function(value, metadata, record) {
            if(value!=record.data.summary1){
                record.data.summary1 = value;
                return value;
            }
			var quantity = Number(record.data.quantity);
			var unitPrice = Number(record.data.unitPrice);
			record.data.summary = quantity * unitPrice;
			record.data.summary1 = quantity * unitPrice;
			return Ext.util.Format.number(record.data.summary, "0.00");
		}
	}, {
		header : "备注说明",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			readOnly : !this.saveable,
			maxLength : 32
		})
	}, {
		width : 80,
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "归还时间",
		dataIndex : "returnDate"
	}, {
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
	} ];
	PickupComponentGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : PickupComponentListViewField,
		title : "领用零配件信息",
		option : "零配件信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelComponentPickup.do",
		grid_view : {
			clicksToEdit : (this.saveable || this.returnable) ? 1 : 5,
		}
	}, this.grid_config || {}));
};
Ext.extend(PickupComponentGrid, Knight.ux.SubModuleBaseGrid, {
	
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
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var pickupDate = this.parentForm.findFormField("pickupDate").getValue();
		var PickupComponent = this.getStore().recordType;
		var pickupComponent = new PickupComponent();
		Ext.apply(pickupComponent.data, {
			pickupId : this.pickupId,
			pickupDate : pickupDate,
//			pickupDatecomponId : data.componId,
			componId : data.componId,
			consumeCounts : data.consumeCounts,
			componSerial : data.componSerial,
			componCategory : data.componCategory,
			componCategoryName : data.componCategoryName,
			componGeneric : data.componGeneric,
			componGenericName : data.componGenericName,
			componSpecific : data.componSpecific,
			dimensions : data.dimensions,
			presentValue : data.presentValue,
			quantity : null,
			unit : data.calculate,
			unitPrice : data.unitprice,
			summary : 0,
			summary1 : 0,
			remark : null,
			status : "0",
			statusName : "待领用"
		});
		this.stopEditing();
		this.getStore().add(pickupComponent);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new ComponentSelector({
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