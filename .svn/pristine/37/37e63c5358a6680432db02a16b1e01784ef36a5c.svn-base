var DepartmentSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_SN_EQ = "0";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var bbarItems = [ {
		iconCls : "btn-refresh",
		text : "刷新",
		handler : this.refreshDeparmentTree.createDelegate(this)
	}, {
		text : "展开",
		iconCls : "btn-expand",
		handler : this.expandDeparmentTree.createDelegate(this)
	}, {
		text : "收起",
		iconCls : "btn-collapse",
		handler : this.collapseDeparmentTree.createDelegate(this)
	} ];

	this.departmentTree = new Ext.tree.TreePanel({
		title : "部门信息显示",
		region : "west",
		width : 180,
		height : 300,
		split : true,
		collapsible : true,
		autoScroll : true,
		bbar : new Ext.Toolbar({
			items : bbarItems
		}),
		loader : new Ext.tree.TreeLoader({
			url : __ctxPath + "/system/listDepartment.do"
		}),
		root : new Ext.tree.AsyncTreeNode({
			expanded : true
		}),
		rootVisible : false,
		listeners : {
			"click" : this.loadSubDeparment.createDelegate(this)
		}
	});

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : this.single
	});
	var columns = [ sm, new Ext.grid.RowNumberer(), {
		header : "depId",
		dataIndex : "depId",
		hidden : true
	}, {
		width : 60,
		header : "部门名称",
		dataIndex : "depName",
		renderer : function(m, l, j) {
			var n = "";
			var o = j.data.depLevel;
			if (o != null && !isNaN(o)) {
				for ( var k = 2; k <= o; k++) {
					n += '<img src="' + __ctxPath + '/images/system/down.gif"/>';
				}
			}
			n += m;
			return n;
		}
	} ];
	var cm = new Ext.grid.ColumnModel({
		columns : columns,
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});
	var store = new Knight.ux.JsonStore({
		remoteSort : false,
		url : __ctxPath + "/system/selectDepartment.do",
		id : "depId",
		fields : [ "depId", "depName", "depLevel" ]
	});
	this.departmentGridPanel = new Ext.grid.GridPanel({
		width : 400,
		height : 300,
		region : "center",
		title : "部门列表",
		store : store,
		shim : true,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : cm,
		sm : sm,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : store,
			displayInfo : true,
			displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
			emptyMsg : "当前没有记录"
		})
	});

	DepartmentSelector.superclass.constructor.call(this, {
		title : "部门选择器",
		iconCls : "menu-department",
		width : 630,
		height : 380,
		layout : "border",
		border : false,
		items : [ this.departmentGridPanel, this.departmentTree ],
		modal : true,
		buttonAlign : "center",
		buttons : [ {
			iconCls : "btn-ok",
			text : "确定",
			handler : this.confirm.createDelegate(this)
		}, {
			text : "取消",
			iconCls : "btn-cancel",
			handler : this.cancel.createDelegate(this)
		} ]
	});
};
Ext.extend(DepartmentSelector, Ext.Window, {
	refreshDeparmentTree : function() {
		this.departmentTree.root.reload();
	},
	expandDeparmentTree : function() {
		this.departmentTree.expandAll();
	},
	collapseDeparmentTree : function() {
		this.departmentTree.collapseAll();
	},
	loadSubDeparment : function(node) {
		if (node == null || node.id == null) {
			return;
		}
		this.departmentGridPanel.getStore().baseParams = {
			depId : node.id
		};
		this.departmentGridPanel.getStore().load();
	},
	cancel : function() {
		this.close();
	},
	confirm : function() {
		var data = this.departmentGridPanel.getSelectionModel().getSelections();
		if (data.length == 0) {
			Ext.Msg.alert("信息提示", "还未选择任何信息!");
			return;
		}
		if (this.callback) {
			this.callback.call(this, data);
		}
		this.close();
	}
});
