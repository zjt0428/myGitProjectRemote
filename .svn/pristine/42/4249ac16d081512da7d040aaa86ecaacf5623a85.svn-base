var PractiInsureClaimRecordGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "保单号",
		dataIndex : "insureSerial"
	}, {
		header : "保险公司",
		dataIndex : "insuranceCompany"
	}, {
		header : "出险险种",
		dataIndex : "insuranceTypeName"
	}, {
		header : "姓名",
		dataIndex : "practiName"
	}, {
		header : "性别",
		dataIndex : "sexName"
	}, {
		header : "所属公司",
		dataIndex : "corpName"
	}, {
		header : "工种",
		dataIndex : "kindWorkName"
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
		header : "身份证号",
		dataIndex : "idCard"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "开户行",
		dataIndex : "bankDeposit"
	}, {
		header : "账号",
		dataIndex : "depositAccount"
	}, {
		header : "理赔时间",
		dataIndex : "claimDate"
	}, {
		header : "损失额",
		dataIndex : "costAmount"
	}, {
		header : "赔偿额",
		dataIndex : "claimAmount"
	}, {
		header : "理赔事由",
		dataIndex : "claimReason"
	} ];
	PractiInsureClaimRecordGrid.superclass.constructor.call(this, Ext.apply({
		title : "理赔记录",
		fields : PractiInsureClaimRecordGridField,
		option : "人员",
		addForbidden : true,
		delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		loadurl : __ctxPath + "/archive/claimRecordListPractiInsurance.do?practiId=" + this.practiId,
	}, this.grid_config || {}));
};
Ext.extend(PractiInsureClaimRecordGrid, Knight.ux.SubModuleBaseGrid, {
});