var ContractLeaseSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var categoryCombo = $initComboBoxField("合同类别", "Q_contractCategory_S_EQ", "contractCategory", {
		width : 120,
		lable : "合同类别",
		allowBlank : true
	});
	var generalItems = [ {
		lable : ContractLeaseFormConfigure.contractSerialHeader,
		name : "Q_contractNo_S_LK"
	}, {
		lable : "承租方",
		name : "Q_paEntName_S_LK"
	},{
		lable : "项目经理",
		name : "Q_materialPractiName_S_LK"
	},{
		lable : "出租方",
		name : "Q_pbEntName_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "项目地址",
		xtype : "areaCompositeField",
		defaultMargins : "11 2 0 0",
		style : {
			marginLeft : "760px"
		},
		skipLastItemMargin : false,
		provinceName :  "province",
		cityName : "city",
		countyName : "county"
	},categoryCombo ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ContractLeaseListViewField
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		}, /*{
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial"
		},*/{
			header : "合同编号",
			dataIndex : "contractNo"
		},
		{
			header : "合同编号",
			dataIndex : "contractSerial"
		},{
			header : "承租方",
			dataIndex : "paEntName"
		},{
			header : "出租方",
			dataIndex : "pbEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "设备型号",
			dataIndex : "equipSpecificNames"
		}, {
			header : "合同金额",
			dataIndex : "contractAmount"
		}, {
			header : "结算类型",
			dataIndex : "settleType"
		}, {
			header : "项目经理",
			dataIndex : "materialPractiName"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	var searchActionItems = [];
	if (this.collectEnable) {
		target = {
			title : "已选合同",
			single : this.single,
			collect : true,
			fields : ContractLeaseListViewField,
			columns : [ /*{
				header : ContractLeaseFormConfigure.contractSerialHeader,
				dataIndex : "contractSerial"
			},*/{
				header : "合同编号",
				dataIndex : "contractNo"
			}, {
				header : "承租方",
				dataIndex : "paEntName"
			}, {
				header : "出租方",
				dataIndex : "pbEntName"
			} ]
		};
		searchActionItems.push({
			xtype : "button",
			iconCls : "btn-ok",
			text : "一键全选",
			handler : this.selectAll.createDelegate(this)
		});
	}
	
	this.contractRelateEquipView = new ContractRelateEquipView();
	this.relatePanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		height : 150,
		maxSize : 300,
		region : "south",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.contractRelateEquipView]
	});
	
	ContractLeaseSelector.superclass.constructor.call(this, {
		height : 700,
		width : 500,
		configView : {
			title : "合同选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listContractLease.do",
			base_params : this.params,
			search_config : {
				preLableHidden : true,
				generalItems : generalItems,
				searchActionItems : searchActionItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				},
				listeners : {
					"rowclick" : function(grid, rowIndex) {
						var rowData = grid.getStore().getAt(rowIndex).data;
						this.readStoreHouse(rowData);
					}.createDelegate(this)
				}
			},
			datagrid_config : datagrid_config
		},
		target : target,
		items : [this.relatePanel]
	});
};

Ext.extend(ContractLeaseSelector, Knight.ux.RelationSelector, {
	selectAll : function() {
		//获取查询条件 params
		var params = this.sourcePanel.ownerCt.searchPanel.getForm().getValues(false);
//		params.limit = this.sourcePanel.getStore().totalLength;
		Ext.apply(params,{
			"QUERY_ALL_WITHOUT_LIMIT" : "Y"
		});
		var datas = $ajaxSyncCall(__ctxPath + "/dispatch/listContractLease.do",params);
		var data= datas.result;
		for (var i = 0; i < data.length; i++) {
			this.addCollectStore(data[i]);
		}
	},
	readStoreHouse : function(a) {
		this.relatePanel.expand();
		var equipstore = this.contractRelateEquipView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_contractLease.contractId_L_EQ" : a.contractId
		});
		equipstore.load();
	}
});