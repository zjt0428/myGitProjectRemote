var StoreComponListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "零配件编号",
			name : "Q_componSerial_S_LK"
		}];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : ComponentListViewField
		},
		tbarItems : tbarItems,
		columns : [
		    {
			header : "产品编号",
			dataIndex : "componSerial"
		},
		{
			header : "库存数量",
			dataIndex : "storeCounts"
		},{
			header : "生产厂家",
			dataIndex : "equipVenderName"
		},{
			header : "零配件类别",
			dataIndex : "componCategoryName"
		}, {
			header : "零部件名称",
			dataIndex : "componGenericName"
		}, {
			header : "设备型号",
			dataIndex : "componSpecificName"
		}]
	};
	StoreComponListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreComponListView",
		title : "项目配件",
		iconCls : "menu-business-component",
		url : __ctxPath + "/archive/listOnStoreComponent.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(StoreComponListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_StoreComponImport")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "添加",
				handler : this.importComponent.createDelegate(this)
			});
		}
//		if (isGranted("_StoreComponRemove")) {
//			tbarItems.push({
//				iconCls : "btn-head-del",
//				text : "移除",
//				handler : this.removeStoreCompon.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, p) {
		var msg1 = "请选择要【" + op + "】的零配件信息！";
		var msg2 = "您确认要【" + op + "】所选零配件信息吗？";
		var msg3 = "成功【" + op + "】所选零配件信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p);
	},
	importComponent : function() {
		if (Ext.isEmpty(this.storeId)) {
			return;
		}
		new ComponentSelector({
			collectEnable : true,
			callback : function(d) {
				var e = Array();
				var counts =  Array();
				for (var i = 0; i < d.length; i++) {
					var map ={};
					map['id'] = d[i].data.componId;
					map['counts']  = d[i].data.counts;
					e.push(d[i].data.componId);
					counts.push(map);
				}
				$request({
					params : {
						storeId : this.storeId,
						ids : e,
						counts:Ext.util.JSON.encode(counts)
					},
					url : __ctxPath + "/archive/importComponentStoreHouse.do",
					success : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	removeStoreCompon : function() {
		if (Ext.isEmpty(this.storeId)) {
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "componId", __ctxPath + "/archive/removeComponentStoreHouse.do", "移除");
	}
});