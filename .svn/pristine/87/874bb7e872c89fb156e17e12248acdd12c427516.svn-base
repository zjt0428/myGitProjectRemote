var MaterialsCommodityListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_commodity_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readMaterialsCommodity
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : MaterialsCommodityListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "资产属性",
				dataIndex : "assetsProperty"
			}, {
				header : "品名",
				dataIndex : "commodity"
			}, {
				xtype : "checkcolumn",
				width : 24,
				header : "是否在用",
				dataIndex : "whetherUsing",
				renderer : function(v, p, record){
					p.css += ' x-grid3-check-col-td';
					if(v == "on") {
						v = '-on';
					} else {
						v = '';
					}
					return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
				}
			}, {
				header : "日租金",
				dataIndex : "dailyRent"
			}, {
				header : "租金核算单位",
				dataIndex : "rentUnit"
			}, {
				header : "丢失赔偿单价",
				dataIndex : "compensationCosts"
			}, {
				header : "丢失赔偿单位",
				dataIndex : "compensationUnit"
			}]
	}
	
	MaterialsCommodityListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsCommodityListView",
		title : "周材品名设置",
		url : __ctxPath + "/materials/listMaterialsCommodity.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(MaterialsCommodityListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsCommodityAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsCommodity.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsCommodityEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsCommodity.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsCommodityMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsCommodity.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readMaterialsCommodity : function(a) {
		new MaterialsCommodityForm(a).show();
	},
	
	addMaterialsCommodity : function(){
		new MaterialsCommodityForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editMaterialsCommodity : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new MaterialsCommodityForm(a[0].data, {
			saveable : true,
			editable:true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delMaterialsCommodity : function(){
		this.speciallyGridAction(this.dataGridPanel, "commodityId", __ctxPath + "/materials/multiDelMaterialsCommodity.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
});