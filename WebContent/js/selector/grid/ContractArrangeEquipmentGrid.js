var ContractArrangeEquipmentGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	this.currentDate = new Date();
	
	var grid = this;
	var columns = [ /*{
		header : "设备类别",
		dataIndex : "equipGenericName",
		editor : new Knight.ux.TreeCombo({
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		}),
		renderer : function(value, metadata, record,rowIndex,colIndex,store) {
			var  equipSelect=grid.getColumnModel().getCellEditor(4,rowIndex);
			var  newEquipSpecificData=[];
			if(!Ext.isEmpty(this.getEditor().id)){
				newEquipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listEquipSpecificCode.do", {
					codeId : this.getEditor().id
				});
				if(grid.saveable) {
					equipSelect.field.getStore().loadData(newEquipSpecificData);
				}
			}
			
			if (value == undefined) {
				return;
			}
			if (record.data.category == undefined) {
				record.data.category = value;
				if (record.data.equipCategory == undefined) {
					record.data.equipCategory = this.getEditor().id;
				}
				return value;
			}
			if (record.data.category != value) {
				record.data.equipCategory = this.getEditor().id;
				record.data.category = value;
			}
			return value;
		}
	},*/ {
		header : "设备名称",
		dataIndex : "equipGenericName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipGenericData,
			editable : false
		}),
		renderer : function(value, metadata, record, rowIndex, colIndex, store) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var  equipSelect=grid.getColumnModel().getCellEditor(4,rowIndex);
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
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 32
		})
	},{
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
	},{
		header : "生产厂家",
		dataIndex : "equipVender",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "预计进场时间",
		dataIndex : "startDate",
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
			record.data.startDate = value;
			return value;
		}
	},{
		header : "预计退场时间",
		dataIndex : "endDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endDate = value;
			return value;
		}
	}];
	ContractArrangeEquipmentGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "业务关联设备（不确定主机编号）",
		option : "业务设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ContractArrangeEquipmentListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelArrangeEquipmentContractArrange.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractArrangeEquipmentGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		var contractArrange_startDate = Ext.getCmp("contractArrange_startDate").getValue();
		return {
			quantity : 0,
			startDate : contractArrange_startDate ? contractArrange_startDate : this.currentDate,
			endDate : this.currentDate,
		};
	}
});
