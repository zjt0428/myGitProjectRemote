var ProjectMaterialsStoreListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.params["Q_project.projectId_L_EQ"] = ""
	this.params.Q_quantity_S_NEQ = "0"
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [
		{
			lable : "品名",
			name : "Q_materialsSpecifications.materialsCommodity.commodity_S_LK"
		},{
			lable : "助记码",
			name : "Q_materialsSpecifications.mnemonics_S_LK"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : ["storeId","project.projectId","materialsSpecifications.materialsCommodity.commodity","materialsSpecifications.specifications",
			          "materialsSpecifications.mnemonics","materialsSpecifications.firstUnitConversion","materialsSpecifications.secondConvertedQuantity","quantity"]
		},
		tbarItems : tbarItems,
		columns : [ {
			header:"品名",
			dataIndex:"materialsSpecifications.materialsCommodity.commodity"
		},{
			header:"规格",
			dataIndex:"materialsSpecifications.specifications"
		},{
			header : "助记码",
			dataIndex : "materialsSpecifications.mnemonics"
		},{
			header : "计量单位",
			dataIndex : "materialsSpecifications.firstUnitConversion"
		}, {
			header : "换算系数",
			dataIndex : "materialsSpecifications.secondConvertedQuantity"
		},{
			header : "项目库存",
			dataIndex : "quantity"
		} ]
	};
	ProjectMaterialsStoreListView.superclass.constructor.call(this, Ext.apply({
		id : "ProjectMaterialsStoreListView",
		title : "库存周材",
		iconCls : "menu-business-component",
		url : __ctxPath + "/archive/materialsListProject.do",
		base_params : this.params,
		search_config : {
			collapsed : false,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ProjectMaterialsStoreListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, v) {
		var msg1 = "请选择要【" + op + "】的零配件信息！";
		var msg2 = "您确认要【" + op + "】所选的零配件信息吗？";
		var msg3 = "成功【" + op + "】所选的零配件信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, v);
	},
	getRowClass : function(record, rowIndex, rowParams, store) {
		if (Ext.isEmpty(record.data.parachuteFlag) || "1" != record.data.parachuteFlag || Ext.isEmpty(record.data.leftcageCheckDate)) {
			return;
		}
		var leftcageCheckDate = Date.parseDate(record.data.leftcageCheckDate, "Y-m-d");
		var days = ((new Date()).getTime() - leftcageCheckDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
		if (0 < days && days < 30) {
			var task = new Ext.util.DelayedTask(function() {
				this.dataGridPanel.getView().addRowClass(rowIndex, "x-grid-back-red");
			}.createDelegate(this));
			task.delay(10);
		}
	},
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		return tbarItems;
	},
});