var MaterialsSpecificationsListView = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_materialsCommodity.commodity_S_LK"
		}, {
			lable : "代码编号",
			name : "Q_mnemonics_S_LK"
		}];
	}
	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readMaterialsSpecifications
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : MaterialsSpecificationsListViewField
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
				header : "周材规格",
				dataIndex : "specifications"
			}, {
				header : "代码编号",
				dataIndex : "mnemonics"
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
				header : "计量单位",
				dataIndex : "firstUnitConversion"
			},  {
				header : "计量数量",
				dataIndex : "firstConvertedQuantity"
			},{
				header : "换算单位",
				dataIndex : "secondUnitConversion"
			}, {
				header : "换算数量",
				dataIndex : "secondConvertedQuantity"
			}]
	}
	
	MaterialsSpecificationsListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsSpecificationsListView",
		title : "周材规格设置",
		url : __ctxPath + "/materials/listMaterialsSpecifications.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};

Ext.extend(MaterialsSpecificationsListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsSpecificationsAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsSpecifications.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsSpecificationsEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsSpecifications.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsSpecificationsMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsSpecifications.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readMaterialsSpecifications : function (a) {
		new MaterialsSpecificationsForm(a).show();
	},
	
	addMaterialsSpecifications : function () {
		new MaterialsSpecificationsForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editMaterialsSpecifications : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new MaterialsSpecificationsForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delMaterialsSpecifications : function () {
		this.speciallyGridAction(this.dataGridPanel, "specificationsId", __ctxPath + "/materials/multiDelMaterialsSpecifications.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
})