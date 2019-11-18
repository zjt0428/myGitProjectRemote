var BaseLocationListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "库位编码",
			name : "Q_locationSerial_S_LK"
		},{
			lable : "库位名称",
			name : "Q_locationName_S_LK"
		},{
			lable : "所属仓库",
			name : "Q_depotName_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readBaseLocation
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : BaseLocationListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "库位编码",
				dataIndex : "locationSerial"
			}, {
				header : "库位名称",
				dataIndex : "locationName"
			}, {
				header : "所属仓库",
				dataIndex : "depotName"
			}, {
				header : "联系人",
				dataIndex : "linkman"
			}, {
				header : "地址",
				dataIndex : "address"
			}, {
				header : "描述",
				dataIndex : "description"
			}]
	}
	
	BaseLocationListView.superclass.constructor.call(this, Ext.apply({
		id : "BaseLocationListView",
		title : "库位设置",
		iconCls:"menu-business-component",
		url : __ctxPath + "/materials/listBaseLocation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(BaseLocationListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的库位信息！";
		var msg2 = "您确认要【" + op + "】所选的库位信息吗？";
		var msg3 = "成功【" + op + "】所选的库位信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BaseLocationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addBaseLocation.createDelegate(this)
			});
		}
		if (isGranted("_BaseLocationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editBaseLocation.createDelegate(this)
			});
		}
		if (isGranted("_BaseLocationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delBaseLocation.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readBaseLocation : function(a) {
		new BaseLocationForm(a).show();
	},
	
	addBaseLocation : function(){
		new BaseDepotSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new BaseLocationForm({
					baseDepot : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	
	editBaseLocation : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new BaseLocationForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delBaseLocation : function(){
		this.speciallyGridAction(this.dataGridPanel, "locationId", __ctxPath + "/materials/multiDelBaseLocation.do", "删除");
	}
});