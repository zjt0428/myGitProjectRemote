var ContractInoutFreeVersionGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var grid = this;
	var columns = [ {
		header : "设备名称",
		dataIndex : "equipGenericName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipGenericData,
			editable : false
		}),
		renderer : function(value, metadata, record, rowIndex, colIndex, store) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var  equipSelect=grid.getColumnModel().getCellEditor(3,rowIndex);
			var store = this.getEditor().store;
			var index = store.find("code", value);
			var  newEquipSpecificData=[];
			if(!Ext.isEmpty(this.getEditor().value) && index != -1){
				newEquipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listEquipSpecificCode.do", {
					codeId : this.getEditor().value
				});
				if(grid.saveable) {
					equipSelect.field.getStore().loadData(newEquipSpecificData);
				}
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.equipGenericName = value;
			return value;
		}
	}, {
		header : "设备型号",
		dataIndex : "equipSpecificName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipSpecificData
		}),
		renderer : function(value, metadata, record) {
			if (value == undefined) {
				return;
			}
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.equipSpecificName = value;
			return value;
		}
	}, {
		width : 80,
		header : "租金标准",
		dataIndex : "rent",
		editor : new Ext.form.NumberField({
			allowBlank : false
		})
	},{
		width : 80,
		header : "租金单位",
		dataIndex : "rentUnit",
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
	}];
	ContractInoutFreeVersionGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "进出场费用",
		option : "业务设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ContractInoutFreeVersionListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelcontractInoutContractLeaseVersion.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractInoutFreeVersionGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
//		var contractArrange_startDate = Ext.getCmp("contractArrange_startDate").getValue();
//		return {
//			quantity : 0,
//			startDate : contractArrange_startDate ? contractArrange_startDate : this.currentDate,
//			endDate : this.currentDate,
//		};
	}
//	createSubModule : function() {
//		return {
//			contractId : this.contractId
//		};
//	},
//	addSubModuleDate : function(data) {
//		console.info(data)
//		for (var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.priceId == data.priceId) {
//				return;
//			}
//		}
//		var RecordType = this.getStore().recordType;
//		var recordType = new RecordType();
//		Ext.apply(recordType.data, {
//			equipSpecificName : data.equipSpecificName,
//			rentUnit : data.rentUnit,
//			rent : data.rent,
//			equipGenericName : data.equipGenericName
//		});
//		this.stopEditing();
//		this.getStore().add(recordType);
//		this.startEditing(0, 0);
//	}
});
