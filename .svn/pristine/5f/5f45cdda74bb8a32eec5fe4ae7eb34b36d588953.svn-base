var MaterialsScrapListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_materialsCommodity.commodity_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readMaterialsScrap
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : MaterialsScrapListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "品名",
				dataIndex : "materialsCommodity.commodity"
			}, {
				header : "收费类型",
				dataIndex : "feesType"
			}, {
				header : "报废类型",
				dataIndex : "scrapType"
			}, {
				header : "收费单位",
				dataIndex : "measurementUnit"
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
				header : "报废单价",
				dataIndex : "scrapUnitPrice"
			}]
	}
	
	MaterialsScrapListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsScrapListView",
		title : "报废赔偿设置",
		url : __ctxPath + "/materials/listMaterialsScrap.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(MaterialsScrapListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsScrapAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsScrap.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsScrapEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsScrap.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsScrapMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsScrap.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readMaterialsScrap : function(a) {
		new MaterialsScrapForm(a).show();
	},
	
	addMaterialsScrap : function(a) {
		new MaterialsScrapForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editMaterialsScrap : function(a) {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new MaterialsScrapForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delMaterialsScrap : function(a) {
		this.speciallyGridAction(this.dataGridPanel, "scrapId", __ctxPath + "/materials/multiDelMaterialsScrap.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
})