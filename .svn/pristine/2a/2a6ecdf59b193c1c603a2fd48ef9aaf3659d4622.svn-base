var ContractInoutFreesGrid = function(a, b) {
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
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.equipGenericName);
				value = store.getAt(index).data.name;
			}
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
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.equipSpecificName);
				value = store.getAt(index).data.name;
			}
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
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				value = record.json.rent;
				record.data.rent = value;
				return value;
			}else{
				return value;
			}
		}
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
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.measurement);
				value = store.getAt(index).data.name;
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.measurement = value;
			return value;
		}
	}];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if(this.saveable && !this.delForbidden){
		this.tbarItems.push({
			iconCls : "btn-head-del",
			text : "删除2",
			handler : this.delSubModules.createDelegate(this)
		});
	}
	ContractInoutFreesGrid.superclass.constructor.call(this, Ext.apply({
		delForbidden : true,
		saveable : this.saveable,
		selectable : this.selectable,
		title : "进出场费用",
		option : "业务设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ContractInoutFreeListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelcontractInoutContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractInoutFreesGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			dispatchable : 0
		};
	},
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
	delSubModules : function(){
		if (!Ext.isEmpty(this.delurl)) {
			this.speciallyGridAction(this, this.fieldId, this.delurl, "删除", null, null, function() {
				var m = this.getSelectionModel().getSelections();
				this.subtractRecordHeight(m.length);
				for (var i = 0; i < m.length; i++) {
					if(m[i].data.dispatchable!="0"){
						Ext.Msg.alert("第[" + (i + 1) + "]条设备已发货，无法删除!");
						return; 
					}
					this.stopEditing();
					this.getStore().remove(m[i]);
				}
				this.startEditing(0, 0);
			}.createDelegate(this));
		}
	}
});
