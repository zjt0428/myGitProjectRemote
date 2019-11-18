
var EquipInsureClaimDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [  {
		header : "保单号",
		dataIndex : "insureSerial"
	}, {
		header : "开户行",
		dataIndex : "bankDeposit",
	}, {
		header : "账号",
		dataIndex : "depositAccount",
	}, {
		width : 90,
		header : "理赔时间",
		dataIndex : "claimDate",
	},{
		header : "损失数",
		dataIndex : "costAmount",
	},{
		header : "赔偿额",
		dataIndex : "claimAmount",
	}, {
		width : 90,
		header : "理赔事由",
		dataIndex : "claimReason",
	} ,{
		header : "保险公司",
		dataIndex : "insuranceCompany"
	}, {
		header : "出险险种",
		dataIndex : "category"
	}, {
		header : "设备名称",
		dataIndex : "equipGeneric"
	},{
		header : "规格型号",
		dataIndex : "equipSpecific"
	},{
		header : "出厂编号",
		dataIndex : "exwSerial"
	},{
		header : "设备自编号",
		dataIndex : "equipSerial"
	},{
		header : "归属仓库",
		dataIndex : "storeName"
	}];
	
	EquipInsureClaimDetailGrid.superclass.constructor.call(this, Ext.apply({
		loadurl : __ctxPath + "/equip/claimDetailEquipInsurance.do?insureId=" + this.insureId,
		fields : EquipInsuranceClaimListViewField,
		title : "理赔明细",
		option : "设备",
		height : this.height,
		columns : columns,
	}, this.grid_config || {}));
};

Ext.extend(EquipInsureClaimDetailGrid, Knight.ux.SubModuleBaseGrid, {
});