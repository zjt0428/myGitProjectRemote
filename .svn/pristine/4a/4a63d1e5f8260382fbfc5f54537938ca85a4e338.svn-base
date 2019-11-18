var EquipmentDiaryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 80,
		header : "启用日期",
		dataIndex : "activateDate"
	}, {
		width : 100,
		header : "进场时间",
		dataIndex : "startDate"
	}, {
		width : 100,
		header : "退场日期",
		dataIndex : "endDate"
	}, {
		width : 80,
		header : "施工单位",
		dataIndex : "paEntName"
	}, {
		width : 80,
		header : "项目名称",
		dataIndex : "projectName"
	} ];
	EquipmentDiaryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		loadurl : __ctxPath + "/equip/listEquipmentDiary.do",
		base_params : {
			Q_equipId_L_EQ : Ext.isEmpty(this.equipId) ? "-1" : this.equipId,
			Q_active_S_EQ : "1"
		},
		fields : EquipDiaryListViewField,
		title : "使用记录",
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipmentDiaryGrid, Knight.ux.SubModuleBaseGrid, {});