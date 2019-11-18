var ContractEquipCostGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "机械名称",
		dataIndex : "equipGenericName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "规格/型号",
		dataIndex : "equipSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 50,
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 3
		})
	}, {
		header : "机械预埋件(元/套)",
		dataIndex : "embeddedCost",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "顶升加节费(元/节)",
		dataIndex : "liftingCost",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "锚固费(元/套)",
		dataIndex : "anchorCost",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "特殊按拆设备费",
		dataIndex : "extraCost",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "小计",
		dataIndex : "summary",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 8
		}),
		renderer : function(value, metadata, record) {
			if (value != record.data.summary1) {
				record.data.summary1 = value;
				return value;
			}
			var summary = (record.data.embeddedCost + record.data.liftingCost + record.data.anchorCost + record.data.extraCost) *  record.data.quantity;
			record.data.summary = summary;
			record.data.summary1 = summary;
			return summary;
		}
	} ];
	ContractEquipCostGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "租赁合同机械相关费用",
		option : "机械相关费用",
		topbarItems : this.topbarItems,
		height : this.height,
		fields : ContractEquipCostListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipCostContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractEquipCostGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipId == data.equipId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			contractId : this.contractId,
			equipId : data.equipId,
			equipCategory : data.equipCategory,
			equipCategoryName : data.equipCategoryName,
			equipGeneric : data.equipGeneric,
			equipGenericName : data.equipGenericName,
			equipSpecific : data.equipSpecific,
			equipSpecificName : data.equipSpecificName,
			quantity : 0,
			embeddedCost : 0,
			liftingCost : 0,
			anchorCost : 0,
			extraCost : 0,
			summary : 0
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new EquipSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				this.addSubModuleDate(data);
			}.createDelegate(this)
		}).show();
	}
});