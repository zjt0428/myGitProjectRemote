var InspectSelfChooseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =======================================================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "分类",
			name : "Q_inspectItem_S_LK"
		} ];
	}
	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readInspect
	} ];
	
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : InspectSelfChooseListViewField,
			sortDir : "asc"
		},
		tbarItems : tbarItems,
		columns : [{
			header : "分类",
			dataIndex : "inspectItem"
		} ]
	};
	
	InspectSelfChooseListView.superclass.constructor.call(this, Ext.apply({
		id : "inspectSelfChooseListView",
		title : "实际执行自检项",
		object : "inspectSelfChoose",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		url : __ctxPath + "/equip/listInspectSelfChoose.do",
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InspectSelfChooseListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InspectChooseDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "移除",
				required : true,
				handler : this.mutilDisableSelections.createDelegate(this)
			});
		}
		return tbarItems;
	},
	mutilDisableSelections : function(){
		this.speciallyGridAction(this.dataGridPanel, "chooseId", __ctxPath + "/equip/multiDelInspectSelfChoose.do", "删除");
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的自检项吗！";
		var msg2 = "您确认要【" + op + "】所选自检项吗？";
		var msg3 = "成功【" + op + "】所选自检项！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	
	readInspect : function(data) {
	}
});