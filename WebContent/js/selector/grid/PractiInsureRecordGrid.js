var PractiInsureRecordGrid = function(a, b) {
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
		header : "保险种类",
		dataIndex : "insuranceTypeName"
	}, {
		header : "保费",
		dataIndex : "premium"
	}, {
		header : "保险公司",
		dataIndex : "insuranceCompany"
	}, {
		header : "所属公司",
		dataIndex : "corpName"
	}, {
		header : "工种",
		dataIndex : "kindWorkName"
	}, {
		header : "联系人电话",
		dataIndex : "linkmanPhone"
	}, {
		header : "联系人",
		dataIndex : "linkman"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "理赔电话",
		dataIndex : "claimPhone"
	}, {
		header : "备注",
		dataIndex : "remark"
	} ];
	PractiInsureRecordGrid.superclass.constructor.call(this, Ext.apply({
		title : "投保记录",
		fields : PractiInsureRecordGridField,
		option : "人员",
		addForbidden : true,
		delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		loadurl : __ctxPath + "/archive/insureRecordListPractiInsurance.do?practiId=" + this.practiId,
	}, this.grid_config || {}));
};
Ext.extend(PractiInsureRecordGrid, Knight.ux.SubModuleBaseGrid, {
	
});