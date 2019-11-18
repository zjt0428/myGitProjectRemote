var MaterialsDamageListView = function(a) {
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
		handler : this.readMaterialsDamage
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : MaterialsDamageListViewField
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
				header : "损坏类型",
				dataIndex : "damageType"
			}, {
				header : "计量单位",
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
				header : "损坏单价",
				dataIndex : "damageUnitPrice"
			}]
	}
	
	MaterialsDamageListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsDamageListView",
		title : "损坏赔偿设置",
		url : __ctxPath + "/materials/listMaterialsDamage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(MaterialsDamageListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsDamageAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsDamage.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsDamageEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsDamage.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsDamageMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsDamage.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readMaterialsDamage : function(a) {
		new MaterialsDamageForm(a).show();
	},
	
	addMaterialsDamage : function() {
		new MaterialsDamageForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editMaterialsDamage : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new MaterialsDamageForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delMaterialsDamage : function() {
		this.speciallyGridAction(this.dataGridPanel, "damageId", __ctxPath + "/materials/multiDelMaterialsDamage.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
})