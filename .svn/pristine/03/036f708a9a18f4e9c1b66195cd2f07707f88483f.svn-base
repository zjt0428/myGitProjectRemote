var EquipmentComponGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		width : 40,
		header : "状态",
		dataIndex : "statusName"
	}, {
		header : "零配件类别",
		dataIndex : "componCategoryName"
	}, {
		header : "零配件名称",
		dataIndex : "componGenericName"
	}, {
		header : "设备型号",
		dataIndex : "componSpecificName"
	}, {
		header : "数量",
		dataIndex : "consumeCounts"
	}, {
		header : "采购日期",
		dataIndex : "purchaseDate"
	} ];
	EquipmentComponGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ComponentListViewField,
		title : "所属部件信息",
		option : "部件信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelComponentEquipment.do",
	}, this.grid_config || {}));
};
Ext.extend(EquipmentComponGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var subrecord = new RecordType();
		Ext.apply(subrecord.data, {
			componId : data.componId,
			statusName : data.statusName,
			componCategoryName : data.componCategoryName,
			componGenericName : data.componGenericName,
			componSpecificName : data.componSpecificName,
			consumeCounts : data.consumeCounts,
			purchaseDate : data.purchaseDate
		});
		this.stopEditing();
		this.getStore().add(subrecord);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new ComponentSelector({
			params : {
				"Q_equipId_L_NULL" : 0
			},
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});