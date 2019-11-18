var EquipBlockUpGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		header : "设备名称",
		dataIndex : "equipGenericName"
	}, {
		header : "规格型号",
		dataIndex : "equipSpecificName"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "启用日期",
		dataIndex : "employDate"
	} ];
	var tbarItems = [ {
		iconCls : "btn-head-del",
		text : "删除",
		handler : this.delSubModule.createDelegate(this)
	} ];
	EquipBlockUpGrid.superclass.constructor.call(this, Ext.apply({
		saveable : true,
		selectable : true,
		fields : [ "relateId", "employId", "recordId", "equipGenericName", "equipSpecificName", "projectName", "employDate" ],
		title : "使用设备信息",
		option : "使用设备",
		columns : columns,
		tbarItems : tbarItems,
	}, this.grid_config || {}));
};
Ext.extend(EquipBlockUpGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		 for (var i = 0; i < this.getStore().getCount(); i++) {
			 if (this.getStore().getAt(i).data.relateId == data.equipInstall.installId) {
				 return;
			 }
		 }
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			relateId : data.flowId,
			recordId : data.equipDiary.recordId,
			equipGenericName : data.equipDiary.equipGenericName,
			equipSpecificName : data.equipDiary.equipSpecificName,
			projectName : data.equipDiary.projectName,
			employDate : data.equipActivate.activateDate
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new EquipFlowActivateSelector({
			collectEnable : true,
			params : {
				"Q_flowState_S_LE" : "7",
				"Q_equipment.businessStatus_S_NEQ" : "7",
				"Q_equipment.status_S_NEQ" : "4",
				"Q_equipment.delFlag_S_EQ" : "1",
				"Q_activateId_L_NOTNULL" : "1"
			},
			single : false,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	delSubModule : function() {
		var m = this.getSelectionModel().getSelections();
		this.subtractRecordHeight(m.length);
		this.stopEditing();
		for (var i = 0; i < m.length; i++) {
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});