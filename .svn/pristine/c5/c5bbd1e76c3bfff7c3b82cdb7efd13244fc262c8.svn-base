var EquipInsureRecordGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		width : 90,
		header : "起保日期",
		dataIndex : "startInsureDate"
	}, {
		width : 90,
		header : "停保日期",
		dataIndex : "endInsureDate"
	}, {
		header : "保险单号",
		dataIndex : "insureSerial"
	}, {
		header : "保险公司",
		dataIndex : "insuranceCompany"
	}, {
		header : "理赔电话",
		dataIndex : "claimPhone"
	}, {
		header : "联系人",
		dataIndex : "linkman"
	}, {
		header : "联系人电话",
		dataIndex : "linkmanPhone"
	}, {
		header : "保险种类",
		dataIndex : "insuranceCategory"
	}, {
		header : "设备价值",
		dataIndex : "equipWorth"
	}, {
		header : "保费",
		dataIndex : "premium"
	}, {
		header : "合同编号",
		dataIndex : "contractId"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "设备在项目时段",
		dataIndex : "equipSpecificName"
	}, {
		header : "备注",
		dataIndex : "remark"
	} ];
	EquipInsureRecordGrid.superclass.constructor.call(this, Ext.apply({
		title : "设备保险记录单",
		fields : EquipInsuranceRecordListViewField,
		option : "设备",
		addForbidden : true,
		delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		loadurl : __ctxPath + "/equip/insureRecordListEquipInsurance.do?equipId=" + this.equipId,
	}, this.grid_config || {}));
};
Ext.extend(EquipInsureRecordGrid, Knight.ux.SubModuleBaseGrid, {
	
});