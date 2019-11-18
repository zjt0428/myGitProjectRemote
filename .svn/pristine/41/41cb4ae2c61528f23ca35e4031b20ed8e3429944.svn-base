var EquipRepairVehicleGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "车牌号",
		dataIndex : "licensePlate",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "车辆型号",
		dataIndex : "vehicleModel",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "费用",
		dataIndex : "vehicleAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 99999999
		})
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-approvalTask",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		});
	}
	EquipRepairVehicleGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipRepairVehicleListViewField,
		title : this.title,
		option : "车辆费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipRepairVehicleGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.vehicleAmount);
		}
		return Ext.util.Format.number(summaryAmount, "0.00");
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var subrecord = new RecordType();
		Ext.apply(subrecord.data, {
			licensePlate : data.licensePlate,
			vehicleModel : data.sedan,
			vehicleAmount : 0
		});
		this.stopEditing();
		this.getStore().add(subrecord);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new CarSelector({
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		this.subtractRecordHeight(m.length);
		for (var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});