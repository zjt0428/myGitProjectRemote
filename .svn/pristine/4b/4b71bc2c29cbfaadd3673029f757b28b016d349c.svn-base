var StoreMaterialsListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
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
			fields : StoreMaterialsListViewField
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "品名",
			dataIndex : "materialsSpecifications.materialsCommodity.commodity"
		}, {
			width : 80,
			header : "规格",
			dataIndex : "materialsSpecifications.specifications"
		}, {
			header : "助记码",
			dataIndex : "materialsSpecifications.mnemonics"
		}, {
			header : "租金核算单位",
			dataIndex : "materialsSpecifications.materialsCommodity.rentUnit"
		}, {
			header : "日租金",
			dataIndex : "materialsSpecifications.materialsCommodity.dailyRent"
		}, {
			header : "丢失赔偿单价",
			dataIndex : "materialsSpecifications.materialsCommodity.compensationCosts"
		}]
	};
	StoreMaterialsListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreMaterialsListView",
		title : "周材库存",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/materials/listSpecificBaseDepot.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(StoreMaterialsListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DepotImport") && this.saveable==true) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "补仓",
				handler : this.importEquipment.createDelegate(this)
			});
		}
		if (isGranted("_DepotRemove") && this.saveable==true) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "移除",
				handler : this.removeDepot.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, p) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选信息吗？";
		var msg3 = "成功【" + op + "】所选信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p);
	},
	importEquipment : function() {
		if (Ext.isEmpty(this.depotId)) {
			return;
		}
		new MaterialsInfoSelector({
//			params : {
//				"Q_depotId_L_NULL" : 1
//			},
			collectEnable : true,
			callback : function(d) {
				var e = Array();
				var counts =  Array();
				for (var i = 0; i < d.length; i++) {
					var map ={};
					e.push(d[i].data.specificationsId);
					map['id'] = d[i].data.specificationsId;
//					map['counts']  = d[i].data.counts==null?d[i].data.quantity:d[i].data.counts;
					map['counts']  = 0;
					counts.push(map);
				}
				$request({
					params : {
						depotId : this.depotId,
						ids : e,
						counts:Ext.util.JSON.encode(counts)
					},
					url : __ctxPath + "/materials/addSpecificBaseDepot.do",
					success : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	removeDepot : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (Ext.isEmpty(a[0].data.storeMaterialsId)) {
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "storeMaterialsId", __ctxPath + "/materials/delSpecificBaseDepot.do", "移除");
	}
});