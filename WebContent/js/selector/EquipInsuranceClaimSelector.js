var EquipInsuranceClaimSelector = function(a) {
	Ext.apply(this, a || {});
	/*this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	//this.params.Q_status_S_LE = "4";
	this.params.Q_status_S_EQ = "1";
	Ext.apply(this.params, a.params || {});*/
	var generalItems = [ {
		header : "状态 ",
		dataIndex : "applyforStateName"
	}, {
		header : "保险单号",
		dataIndex : "insureSerial"
	}, {
		header : "保险公司",
		dataIndex : "insuranceCompany"
	}, {
		header : "起保日期",
		dataIndex : "startInsureDate"
	}, {
		header : "停保日期",
		dataIndex : "endInsureDate"
	}, {
		header : "理赔电话",
		dataIndex : "claimPhone"
	}, {
		header : "保费总额",
		dataIndex : "totalPremium"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipInsuranceListViewField
		},
		columns : [{
			header : "状态 ",
			dataIndex : "applyforStateName"
		}, {
			header : "保险单号",
			dataIndex : "insureSerial"
		}, {
			header : "保险公司",
			dataIndex : "insuranceCompany"
		}, {
			header : "起保日期",
			dataIndex : "startInsureDate"
		}, {
			header : "停保日期",
			dataIndex : "endInsureDate"
		}, {
			header : "理赔电话",
			dataIndex : "claimPhone"
		}, {
			header : "保费总额",
			dataIndex : "totalPremium"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : EquipInsuranceListViewField,
			columns : [ {
				width : 80,
				header : "备案编号",
				dataIndex : "recordId"
			}, {
				width : 80,
				header : "出厂编号",
				dataIndex : "exwSerial"
			}, {
				width : 80,
				header : "设备名称",
				dataIndex : "equipGenericName"
			} ]
		};
	}
	EquipInsuranceClaimSelector.superclass.constructor.call(this, {
		configView : {
			title : "保单选择"
		},
		source : {
			url : __ctxPath + "/equip/selectClaimListEquipInsurance.do",
			search_config : {
				preLableHidden : true,
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},listeners : {
				"rowclick" : function(grid, rowIndex) {
					var rowData = grid.getStore().getAt(rowIndex).data;
					this.readStoreHouse(rowData);
				}.createDelegate(this)
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(EquipInsuranceClaimSelector, Knight.ux.RelationSelector, {
	readStoreHouse : function(a) {
		this.relatePanel.expand();
		var equipstore = this.contractRelateEquipView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_contractLease.contractId_L_EQ" : a.contractId
		});
		equipstore.load();
	}
	
	
	
});