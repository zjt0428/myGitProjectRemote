var BorrowEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.returnable = this.returnable ? true : false;
	this.saveable = this.saveable ? true : false;

	var columns = [ {
		width : 50,
		header : "状态",
		dataIndex : "statusName"
	}, {
		header : "设备编号",
		dataIndex : "recordSerial"
	}, {
		header : "设备类别",
		dataIndex : "equipCategoryName"
	}, {
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		header : "出厂编号",
		dataIndex : "exwSerial"
	}, {
		header : "设备名称",
		dataIndex : "equipGenericName"
	}, {
		header : "规格型号",
		dataIndex : "equipSpecificName"
	}, {
		header : "借用时间",
		dataIndex : "borrowDate"
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
	BorrowEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : BorrowEquipListViewField,
		title : "借用登记设备",
		option : "登记设备",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipBorrow.do",
		grid_view : {
			clicksToEdit : (this.saveable || this.returnable) ? 1 : 5,
		}
	}, this.grid_config || {}));
};
Ext.extend(BorrowEquipGrid, Knight.ux.SubModuleBaseGrid, {
	beforeedit : function(a) {
		if ("returnStoreId" == a.field|| "returnDate"== a.field) {
			return this.returnable;
		}
		return this.saveable;
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipId == data.equipId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			borrowId : this.borrowId,
			equipId : data.equipId,
			recordSerial : data.recordSerial,
			equipCategory : data.equipCategory,
			equipCategoryName : data.equipCategoryName,
			equipSpecific : data.equipSpecific,
			equipSpecificName :data.equipSpecificName,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			equipGeneric : data.equipGeneric,
			equipGenericName : data.equipGenericName,
			status : "0",
			statusName : "未还"
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new EquipSelector({
			params : {
				Q_status_S_EQ : "1"
			},
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});