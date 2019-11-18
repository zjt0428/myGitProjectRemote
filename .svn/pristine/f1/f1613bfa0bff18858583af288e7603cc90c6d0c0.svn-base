var MaterialsInfoListView = function(a) {
	Ext.apply(this, a);
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//

	var actionItems = [{
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadDetail
	}];
	
	var generalItems = [ {
		lable : "品名",
		name : "Q_materialsCommodity.commodity_S_LK"
	}, {
		lable : "规格",
		name : "Q_specifications_S_LK"
	}, {
		lable : "助记码",
		name : "Q_mnemonics_S_LK"
	} ];
	var datagrid_config = {
		store : {
			sortField : "specificationsId",
			sortDir : "asc",
			id : "specificationsId",
			fields : [ "specificationsId", "specifications","mnemonics","materialsCommodity" ]
		},
		rowAction : {
			actionItems : actionItems
		},
		columns : [ {
			header : "品名",
			dataIndex : "materialsCommodity",
			width : 80,
			renderer : function(n){
				return n.commodity;
			}
		}, {
			header : "规格",
			dataIndex : "specifications"
		}, {
			header : "助记码",
			dataIndex : "mnemonics"
		}, {
			header : "租金核算单位",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.rentUnit;
			}
		}, {
			header : "日租金",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.dailyRent;
			}
		} , {
			header : "丢失赔偿单价",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.compensationCosts;
			}
		}]
	};

	var tbarItems = [ {
		iconCls : "btn-refresh",
		text : "刷新",
		handler : this.departmentReload.createDelegate(this)
	}, {
		text : "展开",
		iconCls : "btn-expand",
		handler : this.expandAll.createDelegate(this)
	}, {
		text : "收起",
		iconCls : "btn-collapse",
		handler : this.collapseAll.createDelegate(this)
	} ];

	this.commodityTree = new Ext.tree.TreePanel({
		region : "west",
		title : "周材选择",
		collapsible : true,
		split : true,
		height : 800,
		width : 180,
		tbar : new Ext.Toolbar({
			items : tbarItems
		}),
		loader : new Ext.tree.TreeLoader({
			url : __ctxPath + "/materials/listMaterialsInfo.do"
		}),
		root : new Ext.tree.AsyncTreeNode({
			id : 0,
			expanded : true
		}),
		rootVisible : false,
		listeners : {
			click : this.departmentOnclick.createDelegate(this),
		}
	});
	
	MaterialsInfoListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsInfoListView",
		title : "周材信息",
		iconCls : "menu-business-corpview",
		url : __ctxPath + "/materials/findMaterialsInfo.do",
		base_params : this.params,
		items : [ this.commodityTree ],
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		datagrid_view : {
			title : "周材基本信息"
		}
	}, a));
};
Ext.extend(MaterialsInfoListView, Knight.ux.SearchGridPanel, {
	
	departmentReload : function() {
		this.commodityTree.root.reload();
	},
	expandAll : function() {
		this.commodityTree.expandAll();
	},
	collapseAll : function() {
		this.commodityTree.collapseAll();
	},
	
	departmentOnclick : function(b) {
		this.dataGridPanel.getStore().baseParams = {
			commodityId : b.id
		};
		this.dataGridPanel.getStore().load();
	},
	
	loadDetail : function(data) {
		new MaterialsInfoForm({
			specificationsId : data.specificationsId
		}).show();
	}
	
	
});
