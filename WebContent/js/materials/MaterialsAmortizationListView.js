var MaterialsAmortizationListView = function (a) {
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
		handler : this.readMaterialsAmortization
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : MaterialsAmortizationListViewField
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
				header : "总计摊销月数",
				dataIndex : "totalAmortizationMonths"
			}, {
				header : "年摊销率",
				dataIndex : "yearAmortizationRate"
			}]
	}
	
	MaterialsAmortizationListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsAmortizationListView",
		title : "周转材料摊销设置",
		url : __ctxPath + "/materials/listMaterialsAmortization.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(MaterialsAmortizationListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsAmortizationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsAmortization.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsAmortizationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsAmortization.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsAmortizationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsAmortization.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readMaterialsAmortization : function (a) {
		new MaterialsAmortizationForm(a).show();
	},
	
	addMaterialsAmortization : function () {
		new MaterialsAmortizationForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editMaterialsAmortization : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new MaterialsAmortizationForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delMaterialsAmortization : function () {
		this.speciallyGridAction(this.dataGridPanel, "amortizationId", __ctxPath + "/materials/multiDelMaterialsAmortization.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
})