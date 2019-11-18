var PractiInsureClaimDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
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
	PractiInsureClaimDetailGrid.superclass.constructor.call(this, Ext.apply({
		loadurl : __ctxPath + "/archive/claimDetailPractiInsurance.do?insureId=" + this.insureId,
		fields : PractiInsureClaimRecordGridField,
		title : "理赔明细",
		option : "人员",
		height : this.height,
		columns : columns,
	}, this.grid_config || {}));
};

Ext.extend(PractiInsureClaimDetailGrid, Knight.ux.SubModuleBaseGrid, {
});