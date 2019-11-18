/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * contractId : Number,
 * rentStandardData : Array,
 * measurementData : Array
 * </code></pre>
 */
var ContractEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	if (this.subcontract == "0") {
		Ext.apply(this, {
			buildingNumHeader : "楼号",
			initialHeightHeader : "首次安装高度",
			finalHeightHeader : "最终安装高度",
			equipSpecificHidden : false,
			exwSerialHidden : false,
			endDateHidden : false,
			rentStandardHidden : false,
			measurementHidden : false,
			tenancyHidden : false,
			wallAttacheQtyHidden : true,
			remarkHidden : true
		});
	} else {
		Ext.apply(this, {
			buildingNumHeader : "幢号",
			initialHeightHeader : "安装高度(m)",
			finalHeightHeader : "建筑高度（m）",
			equipSpecificHidden : false,
			exwSerialHidden : true,
			endDateHidden : true,
			rentStandardHidden : true,
			measurementHidden : true,
			tenancyHidden : true,
			wallAttacheQtyHidden : false,
			remarkHidden : false
		});
	}
	var columns = [ {
		width : 40,
		header : this.buildingNumHeader,
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "设备名称",
		dataIndex : "equipGenericName"
	}, {
		hidden : this.equipSpecificHidden,
		header : "规格型号",
		dataIndex : "equipSpecificName"
	}, {
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		hidden : this.exwSerialHidden,
		header : "出厂编号",
		dataIndex : "exwSerial"
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
	}, {
		hidden : this.endDateHidden,
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
	}, {
		header : this.initialHeightHeader,
		dataIndex : "initialHeight",
		editor : new Ext.form.NumberField({
			maxLength : 16
		})
	}, {
		header : this.finalHeightHeader,
		dataIndex : "finalHeight",
		editor : new Ext.form.NumberField({
			maxLength : 16
		})
	}, {
		hidden : this.rentStandardHidden,
		width : 80,
		header : "租金标准",
		dataIndex : "rentStandard",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.rentStandardData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.rentStandard = value;
			return value;
		}
	}, {
		hidden : this.measurementHidden,
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
		hidden : this.tenancyHidden,
		header : "租期",
		dataIndex : "tenancy",
		editor : new Ext.form.NumberField({
			maxLength : 3
		})
	}, {
		hidden : this.wallAttacheQtyHidden,
		width : 50,
		header : "附墙道数",
		dataIndex : "wallAttacheQty",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 3
		})
	}, {
		hidden : this.remarkHidden,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	} ];
	ContractEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ContractEquipListViewField,
		title : "合同签订设备编号(确定具体主机编号)",
		option : "合同设备",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipContractLease.do",
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(ContractEquipGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipId == data.equipId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var ContractEquip = this.getStore().recordType;
		var contractEquip = new ContractEquip();
		Ext.apply(contractEquip.data, {
			contractId : this.contractId,
			equipId : data.equipId,
			equipCategory : data.equipCategory,
			equipCategoryName : data.equipCategoryName,
			equipGeneric : data.equipGeneric,
			equipGenericName : data.equipGenericName,
			equipSpecific : data.equipSpecific,
			equipSpecificName : data.equipSpecificName,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			recordSerial : data.recordSerial,
			propertyEnt : data.propertyEnt,
			propertyName : data.propertyName,
			buildingNum : "0",
			startDate : this.currentDate
		});
		this.stopEditing();
		this.getStore().add(contractEquip);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new EquipSelector({
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
		/*		var data = d[0].data;
				this.addSubModuleDate(data);*/
			}.createDelegate(this)
		}).show();
	}
});