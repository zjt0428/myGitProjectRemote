var StoreEquipListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
//	this.params.Q_storeId_L_EQ = -1;
	this.saveable = this.saveable? false:true;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : EquipmentListViewField
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "statusName"
		}, {
			width : 80,
			header : "业务状态",
			dataIndex : "businessStatusName"
		}, {
			header : "设备自编号",
			dataIndex : "equipSerial"
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "生产厂家",
			dataIndex : "equipVender"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "规格型号",
			dataIndex : "equipSpecificName"
		} ]
	};
	StoreEquipListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreEquipListView",
		title : "库存设备",
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
Ext.extend(StoreEquipListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_StoreEquipImport") && this.saveable==true) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "添加",
				handler : this.importEquipment.createDelegate(this)
			});
		}
		if (isGranted("_StoreEquipRemove") && this.saveable==true) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "移除",
				handler : this.removeStoreEquip.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, p) {
		var msg1 = "请选择要【" + op + "】的设备信息！";
		var msg2 = "您确认要【" + op + "】所选设备信息吗？";
		var msg3 = "成功【" + op + "】所选设备信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p);
	},
	importEquipment : function() {
		if (Ext.isEmpty(this.storeId)) {
			return;
		}
		new EquipSelector({
			params : {
				"Q_storeId_L_NULL" : 1
			},
			collectEnable : true,
			callback : function(d) {
				var e = Array();
				for (var i = 0; i < d.length; i++) {
					e.push(d[i].data.equipId);
				}
				$request({
					params : {
						storeId : this.storeId,
						ids : e
					},
					url : __ctxPath + "/archive/importEquipmentStoreHouse.do",
					success : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	removeStoreEquip : function() {
		if (Ext.isEmpty(this.storeId)) {
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/removeEquipmentStoreHouse.do", "移除");
	}
});