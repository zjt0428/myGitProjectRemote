
var EquipInsureClaimRecordGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.currentDate = new Date();
//	if (this.saveable) {
//			this.tbarItems.push({
//				iconCls : "btn-head-add",
//				text : "保存",
//				handler : this.addSubModule.createDelegate(this)
//			})
//	}
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	this.tbarItems = [ {
		iconCls : "btn-head-edit",
		text : "修改设备理赔信息",
		handler : this.updateEquipmentInsuranceClaim.createDelegate(this)
	},{
		iconCls : "btn-head-del",
		text : "删除设备理赔信息",
		handler : this.delEquipmentInsuranceClaim.createDelegate(this)
	}];
	var columns = [  {
		header : "保单号",
		dataIndex : "insureSerial"
	}, {
		header : "开户行",
		dataIndex : "bankDeposit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "账号",
		dataIndex : "depositAccount",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 90,
		header : "理赔时间",
		dataIndex : "claimDate",
		editor : new Ext.form.TextField({
			maxLength : 32
		})
	},{
		header : "损失数",
		dataIndex : "costAmount",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	},{
		header : "赔偿额",
		dataIndex : "claimAmount",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 90,
		header : "理赔事由",
		dataIndex : "claimReason",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "保险公司",
		dataIndex : "insuranceCompany"
	}, {
		header : "理赔项目",
		dataIndex : "projectName"
	}, {
		header : "出险险种",
		dataIndex : "insuranceCategory"
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
	},{
		header : "保险ID",
		hidden : true,
		dataIndex : "insureId"
	},{
		header : "设备ID",
		hidden : true,
		dataIndex : "equipId"
	}];
	
	EquipInsureClaimRecordGrid.superclass.constructor.call(this, Ext.apply({
		loadurl : __ctxPath + "/equip/claimRecordListEquipInsurance.do?equipId=" + this.equipId,
		fields : EquipInsuranceClaimListViewField,
		title : "设备理赔记录单",
		option : "设备",
		delurl : __ctxPath + "/equip/EquipInsuranceClaim.do?claimId=" + this.claimId,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
	}, this.grid_config || {}));
};

Ext.extend(EquipInsureClaimRecordGrid, Knight.ux.SubModuleBaseGrid, {
		addSubModuleDate : function(data) {
			var RecordType = this.getStore().recordType;
			var record = new RecordType();
			Ext.apply(record.data, {
				insureSerial : data.insureSerial,
				insuranceCompany : data.insuranceCompany,
				category : data.category,
				equipGeneric : data.equipGeneric,
				equipSpecific : data.equipSpecific,
				exwSerial : data.exwSerial,
				equipSerial :data.equipSerial,
				storeName : data.storeName,
				projectName : data.projectName
			});
			this.stopEditing();
			this.getStore().add(record);
			this.startEditing(0, 0);
		},
		updateEquipmentInsuranceClaim : function() {
			var a = this.getSelectionModel().getSelections();
			if (a.length == 0) {
				$toast("请选择要【修改】的记录！");
				return;
			}
			new EquipmentInsuranceClaimForm(a[0].data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		},
		delEquipmentInsuranceClaim : function() {
			var a = this.getSelectionModel().getSelections();
			if (a.length == 0) {
				$toast("请选择要【删除】的记录！");
				return;
			}
			this.speciallyGridAction(this, "claimId", __ctxPath + "/equip/multiDelEquipInsuranceClaim.do", "删除");
		}
		
});