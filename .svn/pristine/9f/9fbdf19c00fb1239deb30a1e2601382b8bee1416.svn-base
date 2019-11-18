var ContractDispatchEquipSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : ContractLeaseFormConfigure.contractSerialHeader,
		name : "contractNo"
	}, {
		lable : "项目名称",
		name : "projectName"
	}, {
		lable : "设备自编号",
		name : "equipSerial"
	}  ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ContractLeaseListViewField
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		},  {
			header : "合同编号",
			dataIndex : "contractNo"
		}],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.collectEnable) {
			target = {
			title : "<font style=\'font-size:13px\' color=red>合同调度设备选取</font>",
			width : 1200,
			single : this.single,
			url : __ctxPath + "/dispatch/listEquipDispatch.do",
			parent : "contractLease",
			fields : DispatchEquipListViewField,
			columns : [ {
				dataIndex : "workStatus",
				width : 40,
				renderer : function(n) {
					if (n == "0") {
						return '未安装';
					} else if (n == "1") {
						return '已安装';
					} else {
						return '已拆卸';
					}
				}
			}, {
				header : "楼号",
				dataIndex : "buildingNum"
			}, {
				header : "设备自编号",
				dataIndex : "equipment",
				renderer : function(n) {
					return n.equipSerial;
				}
			}, {
				header : "备案编号",
				dataIndex : "equipment",
				renderer : function(n) {
					return n.recordId;
				}
			}, {
				header : "出厂编号",
				dataIndex : "equipment",
				renderer : function(n) {
					return n.exwSerial;
				}
			}, {
				header : "设备类别",
				dataIndex : "equipment",
				renderer : function(n) {
					return n.equipCategoryName;
				}
			}, {
				header : "设备名称",
				dataIndex : "equipment",
				renderer : function(n) {
					return n.equipGenericName;
				}
			}, {
				header : "预计进场时间",
				dataIndex : "startDate"
			} ]
		};
	}		
	ContractDispatchEquipSelector.superclass.constructor.call(this, {
		configView : {
			title : "合同调度设备选择(请双击合同信息/点击箭头 选取已调度设备信息)"
		},
		source : {
			url : __ctxPath + "/dispatch/listByTransStatusContractLease.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : false,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(ContractDispatchEquipSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		var params = Ext.apply({	
			maximized:true,
			"QUERY_FILTER" : "relate_dispatch",
			"Q_d.relateId_L_EQ" : data.contractId,
			"Q_d.relateModule_S_EQ" : RelationModule.contractLease.relateModule,
			"Q_d.applyforState_S_EQ" : "3",
			"Q_d.delFlag_S_EQ" : "1"
		}, this.target_params || {});
		this.targetPanel.getStore().reload({
			params : params
		});
	}
});