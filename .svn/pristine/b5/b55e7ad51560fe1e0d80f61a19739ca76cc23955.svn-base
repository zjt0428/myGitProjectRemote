var TruckCranePriceListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	var belongToAreaCombo = $initComboBoxField("区域", "Q_belongToArea_S_EQ", "belongToArea", {
		width : 80,
		lable : "区域",
		allowBlank : true
	});
	var truckCraneSpecificCombo = $initComboBoxField("汽吊型号", "Q_truckCraneSpecific_S_EQ", "truckCraneSpecific", {
		width : 120,
		lable : "汽吊型号",
		allowBlank : true
	});
	if (!this.searchDisenable) {
		generalItems = [belongToAreaCombo,truckCraneSpecificCombo];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readTruckCranePrice
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : TruckCranePriceListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "区域",
				dataIndex : "belongToAreaName"
			},{
				header : "汽吊型号",
				dataIndex : "truckCraneSpecificName"
			}, {
				header : "项目单价",
				dataIndex : "projectPrice"
			}, {
				header : "班组单价",
				dataIndex : "teamPrice"
			}]
	}
	
	TruckCranePriceListView.superclass.constructor.call(this, Ext.apply({
		id : "TruckCranePriceListView",
		title : "汽吊价格明细",
		url : __ctxPath + "/equip/listTruckCranePrice.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(TruckCranePriceListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的汽吊价格信息！";
		var msg2 = "您确认要【" + op + "】所选的汽吊价格信息吗？";
		var msg3 = "成功【" + op + "】所选的汽吊价格信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_TruckCranePriceAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTruckCranePrice.createDelegate(this)
			});
		}
		if (isGranted("_TruckCranePriceEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTruckCranePrice.createDelegate(this)
			});
		}
		if (isGranted("_TruckCranePriceMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTruckCranePrice.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readTruckCranePrice : function(a) {
		new TruckCranePriceForm(a).show();
	},
	
	addTruckCranePrice : function(){
		new TruckCranePriceForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editTruckCranePrice : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new TruckCranePriceForm(a[0].data, {
			saveable : true,
			editable:true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delTruckCranePrice : function(){
		this.speciallyGridAction(this.dataGridPanel, "priceId", __ctxPath + "/equip/multiDelTruckCranePrice.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
});