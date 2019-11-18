var BorrowComponentGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.returnable = this.returnable ? true : false;
	this.saveable = this.saveable ? true : false;

	var columns = [ {
		width : 50,
		header : "状态",
		dataIndex : "statusName"
	}, {
		header : "零配件编号",
		dataIndex : "componSerial"
	}, {
		header : "零配件类别",
		dataIndex : "componCategoryName"
	}, {
		header : "零配件名称",
		dataIndex : "componGenericName"
	}, {
		header : "配件型号",
		dataIndex : "dimensions"
	}, {
		header : "归属设备",
		dataIndex : "exwSerial",
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "借用时间",
		dataIndex : "borrowDate"
	}, {
		header : "借用数量",
		dataIndex : "borrowCounts",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if (value > record.get("consumeCounts")) {
				Ext.Msg.alert("信息警告", "借用数量不能大于库存数量!");
			}
			record.data.borrowCounts = value;
			return value;
		}
	}, {
		header : "库存数量",
		dataIndex : "consumeCounts"
	}, {
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "归还数量",
		dataIndex : "returnCounts",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			if(this.returnable){
				return value="";
			}
            return value;
		}
	}, {
		width : 80,
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "归还时间",
		dataIndex : "returnDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : true,
			allowBlank : true
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.returnDate = value;
			return value;
		}
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
		hidden : !(this.returnable || (!this.saveable && !this.returnable)),
		header : "登记人",
		dataIndex : "userName"
	} ];
	BorrowComponentGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : BorrowComponentListViewField,
		title : "借用登记零配件",
		option : "登记零配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelComponentBorrow.do",
		grid_view : {
			clicksToEdit : (this.saveable || this.returnable) ? 1 : 5,
		}
	}, this.grid_config || {}));
};
Ext.extend(BorrowComponentGrid, Knight.ux.SubModuleBaseGrid, {
	beforeedit : function(a) {
		if ("returnStoreId" == a.field|| "returnDate"== a.field || "returnCounts"==a.field) {
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
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			borrowId : this.borrowId,
			componId : data.componId,
			componSerial : data.componSerial,
			componCategory : data.componCategory,
			componCategoryName : data.componCategoryName,
			componGeneric : data.componGeneric,
			dimensions : data.dimensions,
			exwSerial : data.exwSerial,
			componGenericName : data.componGenericName,
			consumeCounts : data.consumeCounts,
			borrowCounts : 1,
			status : "0",
			statusName : "未还"
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new ComponentSelector({
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});