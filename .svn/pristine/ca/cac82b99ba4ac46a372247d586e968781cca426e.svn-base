var AmountEquipShareGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "出厂编号",
		dataIndex : "exwSerial"
	}, {
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		header : "设备类别",
		dataIndex : "equipCategoryName"
	}, {
		header : "设备名称",
		dataIndex : "equipGenericName"
	}, {
		header : "规格型号",
		dataIndex : "equipSpecificName"
	}, {
		header : "分摊费用",
		dataIndex : "presentAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 99999999
		})
	} ];
	AmountEquipShareGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "费用设备分摊",
		option : "分摊设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : AmountEquipShareListViewField,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelAmountEquipShare.do"
	}, this.grid_config || {}));
};
Ext.extend(AmountEquipShareGrid, Knight.ux.SubModuleBaseGrid, {
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
			equipId : data.equipId,
			recordSerial : data.recordSerial,
			equipCategory : data.equipCategory,
			equipCategoryName : data.equipCategoryName,
			equipGeneric : data.equipGeneric,
			equipGenericName : data.equipGenericName,
			equipSpecific : data.equipSpecific,
			equipSpecificName : data.equipSpecificName,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			propertyEnt : data.propertyEnt,
			propertyName : data.propertyName,
			presentAmount : 0
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		var params = null;
		var projectId = this.parentForm.findFormField("projectId").getValue();
		if (!Ext.isEmpty(projectId)) {
			params = {
				//"QUERY_FILTER" : "relation_project",
				//"Q_d.delFlag_S_EQ" : "1",
				//"Q_status_S_LE" : "",
				//"Q_vo.delFlag_S_EQ" : "1",
				//"Q_vo.projectId_L_EQ" : projectId
				"Q_delFlag_S_EQ" : "1",
				"Q_projectId_L_EQ" : projectId
			}
		}
		new EquipSelector({
			params : params,
			collectEnable : true,
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});