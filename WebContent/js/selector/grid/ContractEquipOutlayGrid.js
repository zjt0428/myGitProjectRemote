var ContractEquipOutlayGrid = function(a, b) {
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
		header : "品牌",
		dataIndex : "equipVender",
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
		header : "机械使用费用(元/月/台)",
		dataIndex : "employOutlay",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "安装进场费(元/次/台)",
		dataIndex : "installOutlay",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "拆卸退场费(元/次/台)",
		dataIndex : "dismantleOutlay",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "维护保养费(元/月/台)",
		dataIndex : "mantOutlay",
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
			var summary = record.data.employOutlay + record.data.installOutlay + record.data.dismantleOutlay + record.data.mantOutlay;
			record.data.summary = summary;
			record.data.summary1 = summary;
			return summary;
		}
	} ];
	ContractEquipOutlayGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "租赁合同机械费用",
		option : "机械费用",
		topbarItems : this.topbarItems,
		height : this.height,
		fields : ContractEquipOutlayListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipOutlayContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractEquipOutlayGrid, Knight.ux.SubModuleBaseGrid, {
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
			equipVender : data.equipVender,
			quantity : 0,
			employOutlay : 0,
			installOutlay : 0,
			dismantleOutlay : 0,
			mantOutlay : 0,
			summary : 0,
			summary1 : 0
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