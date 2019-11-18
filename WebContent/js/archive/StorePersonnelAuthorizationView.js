var StorePersonnelAuthorizationView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.saveable = this.saveable? false:true;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : StorePersonnelAuthorizationViewFeild
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "账号",
			dataIndex : "userName"
		}, {
			width : 80,
			header : "姓名",
			dataIndex : "fullName"
		}, {
			header : "部门",
			dataIndex : "department"
		}, {
			header : "手机号码",
			dataIndex : "phoneNumber"
		}]
	};
	StorePersonnelAuthorizationView.superclass.constructor.call(this, Ext.apply({
		id : "StorePersonnelAuthorizationView",
		title : "人员授权",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/archive/listEquipment.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(StorePersonnelAuthorizationView, Knight.ux.SearchGridPanel, {});