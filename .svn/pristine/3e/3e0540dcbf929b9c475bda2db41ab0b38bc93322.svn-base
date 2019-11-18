var ContractOperatorFreeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var grid = this;
	this.currentDate = new Date();
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
	ContractOperatorFreeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "操作人员费用",
		option : "业务设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ContractOperatorFreeListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelcontractOperatorContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractOperatorFreeGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			dispatchable : 0
		};
	},
	beforeedit : function(grid) {
		//已发货的设备规格型号和设备名称不能修改
		return grid.record.data.dispatchable == '0'
		|| (grid.record.data.dispatchable !== '0' && !(grid.field=='equipGenericName' || grid.field=='equipSpecificName'));  
	}
});
