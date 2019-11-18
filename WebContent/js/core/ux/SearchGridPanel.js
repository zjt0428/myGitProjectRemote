/**
 * <code><pre>
 * 	url : '',
 * 	base_params : {},
 * 	search_config : {
 * 		collapsed : boolean,
 * 		preLableHidden : boolean,
 * 		generalItems : [],
 * 		advancedItems : [],
 * 		searchActionItems : []
 * 	},
 * 	datagrid_view : {},
 * 	datagrid_config : {
 * 		single : boolean,
 * 		store : {
 * 			sortField : sortField,
 * 			sortDir : 'asc',
 * 			id : id,
 * 			fields : [ ]
 * 		},
 * 		plugins : plugins,
 * 		tbarItems : [],
 * 		action : {
 * 			width : number,
 * 			actionItems : [],
 * 			renderer : renderer
 * 		},
 * 		columns : []
 * 	},
 * 	items : ['south', 'east', 'west']
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.SearchGridPanel = function(a) {
	Ext.apply(a, a || {});
	this.dataGridPanel;
	this.searchPanel;
	var mainPanelItems = [];

	var searchable = a.search_config && a.search_config.generalItems && a.search_config.generalItems.length > 0;
	if (searchable) {
		this.initSearchPanel(a);
		mainPanelItems.push(this.searchPanel);
	}
	this.initDataGridPanel(a);
	mainPanelItems.push(this.dataGridPanel);
	if (a.items) {
		mainPanelItems = mainPanelItems.concat(a.items);
	}
	a.items = mainPanelItems;
	Knight.ux.SearchGridPanel.superclass.constructor.call(this, Ext.apply({
		region : "center",
		layout : "border",
		items : mainPanelItems
	}, a));
};
Ext.extend(Knight.ux.SearchGridPanel, Ext.Panel, {
	getRowClass : function(record, rowIndex, rowParams, store) {
	},
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
	},
	searchSubmit : function() {
		this.dataGridPanel.getStore().baseParams = this.searchPanel.getForm().getValues(false);
		this.dataGridPanel.getStore().load();
		this.currentSearchPanel = this.searchPanel;
	},
	searchReset : function() {
		this.searchPanel.getForm().reset();
	},
	searchResetOriginal : function(params) {
		this.searchPanel.getForm().items.each(function(f) {
			if (params[f.name]) {
				f.originalValue = params[f.name];
				f.setValue(f.originalValue);
				f.clearInvalid();
			}
		});
	},
	advancedSearch : function() {
		this.advancedSearchPanel.show();
	},
	getSearchPanel : function() {
		return this.searchPanel;
	},
	getDataGridPanel : function() {
		return this.dataGridPanel;
	},
	initSearchPanel : function(a) {
		var c = a.search_config;
		var searchItems = [];
		if (!c.preLableHidden) {
			searchItems.push({
				text : "查询条件:"
			});
		}
		for (var i = 0; i < c.generalItems.length; i++) {
			if (c.generalItems[i].lable) {
				searchItems.push({
					text : c.generalItems[i].lable
				});
			}
			if (!c.generalItems[i].xtype) {
				c.generalItems[i].xtype = "textfield";
			}
			if (!c.generalItems[i].width) {
				c.generalItems[i].width = 80;
			}
			//回车查询
			if(!c.generalItems[i].enableKeyEvents){
				c.generalItems[i].enableKeyEvents = true;
				if(typeof(c.generalItems[i].listeners)=="undefined" || typeof(c.generalItems[i].listeners)=="null") {
					c.generalItems[i].listeners ={
						keyup : function(textfield,event) {
							if(event.getKey()==13) {
								this.searchSubmit();
							}
						}.createDelegate(this)
					};
				}else{
					c.generalItems[i].listeners.keyup = function(textfield,event) {
							if(event.getKey()==13) {
								this.searchSubmit();
							}
						}.createDelegate(this)
				}
			}
			searchItems.push(c.generalItems[i]);
		}
		for ( var param in a.base_params) {
			searchItems.push({
				xtype : "textfield",
				hidden : true,
				name : param,
				value : a.base_params[param]
			});
		}
		searchItems.push({
			xtype : "button",
			text : "查询",
			iconCls : "btn-search",
			handler : this.searchSubmit.createDelegate(this)
		});
		searchItems.push({
			xtype : "button",
			text : "重置",
			iconCls : "btn-reset",
			handler : this.searchReset.createDelegate(this)
		});
		if (c.searchActionItems && c.searchActionItems.length > 0) {
			searchItems = searchItems.concat(c.searchActionItems);
		}
		var advancedable = a.search_config && a.search_config.advancedItems && a.search_config.advancedItems.length > 0;
		if (advancedable) {
			this.advancedSearchPanel = new AdvancedQueryWin(c.advancedItems, {
				base_params : a.base_params,
				submit : function() {
					this.currentSearchPanel = this.advancedSearchPanel;
					this.dataGridPanel.getStore().baseParams = this.advancedSearchPanel.getForm().getValues(false);
					this.dataGridPanel.getStore().load();
				}.createDelegate(this)
			});
			searchItems.push({
				xtype : "button",
				text : "高级查询",
				iconCls : "btn-head-lookup",
				handler : this.advancedSearch.createDelegate(this)
			});
		}
		this.searchPanel = new Ext.FormPanel({
			height : 40,
			frame : false,
			region : "north",
			border : false,
			layout : "hbox",
			collapsed : c.collapsed,
			split : true,
			collapseMode : "mini",
			layoutConfig : {
				padding : "5",
				align : "middle"
			},
			defaults : {
				xtype : "label",
				margins : {
					top : 0,
					right : 4,
					bottom : 4,
					left : 4
				}
			},
			items : searchItems
		});
		this.currentSearchPanel = this.searchPanel;
	},
	initDataGridPanel : function(a) {
		var c = a.datagrid_config;
		for ( var param in a.current_params) {
			a.base_params[param] = a.current_params[param];
		}
		var store = new Knight.ux.JsonStore(Ext.apply({
			url : a.url,
			baseParams : a.base_params,
			sortField : c.store.fields[0],
			sortDir : "desc",
			id : c.store.fields[0]
		}, c.store));
		if (!c.delayed_load) {
			store.load();
		}
		for (var i = 0; i < c.columns.length; i++) {
			var column = c.columns[i];
			column.width = column.width ? column.width : 100;
			if (column.renderer && typeof (column.renderer) == "function") {
				column.defineRenderer = column.renderer;
				column.renderer = function(value, meta, record) {
					meta.attr = 'style="white-space:normal;"';
					return this.defineRenderer.call(this, value, meta, record);
				}
			} else {
				column.renderer = function(value, meta, record) {
					meta.attr = 'style="white-space:normal;"';
					return value;
				}
			}
		}
		if (!c.checkboxHidden) {
			var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : c.single
			});
			c.columns.unshift(sm);
		}
		c.columns.unshift(new Ext.grid.RowNumberer());
		var actionable = a.datagrid_config.rowAction && a.datagrid_config.rowAction.actionItems && a.datagrid_config.rowAction.actionItems.length > 0;
		if (actionable) {
			var actionItems = a.datagrid_config.rowAction.actionItems;
			var renderer = a.datagrid_config.rowAction.renderer;
			var width = 40;
			if (a.datagrid_config.rowAction.width) {
				width = a.datagrid_config.rowAction.width;
			} else {
				var w = 20 * actionItems.length;
				width = (width > w ? width : w);
			}
			for (var i = 0; i < actionItems.length; i++) {
				if (!actionItems[i].style) {
					actionItems[i].style = "margin:2px 7px 0 5px";
				}
				if (actionItems[i].text) {
					width += 15;
				}
				actionItems[i].callback = actionItems[i].handler;
				actionItems[i].handler = function(grid, rowIndex, colIndex, action, key) {
					var data = grid.getStore().getAt(rowIndex).data;
					action.callback.call(this, data, grid, action, rowIndex, colIndex, key);
				}.createDelegate(this)
			}
			var rowActions = new Ext.ux.grid.ActionColumn({
				header : "管理",
				width : width,
				items : actionItems,
				renderer : renderer
			});
			c.columns.push(rowActions);
		}
		var cm = new Ext.grid.ColumnModel({
			columns : c.columns,
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});

		var tbarable = a.datagrid_config.tbarItems && a.datagrid_config.tbarItems.length > 0;
		var tbar = null;
		if (tbarable) {
			tbar = new Ext.Toolbar({
				height : 30,
				bodyStyle : "text-align:left",
				items : c.tbarItems
			});
		}
		this.dataGridPanel = new Ext.grid.GridPanel(Ext.apply({
			region : "center",
			tbar : tbar,
			store : store,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : cm,
			sm : sm,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false,
				getRowClass : this.getRowClass.createDelegate(this)
			},
			bbar : new Ext.PagingToolbar({
				pageSize : 25,
				store : store,
				displayInfo : true,
				displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
				emptyMsg : "当前没有记录"
			})
		}, a.datagrid_view || {}));
	}
});
Knight.ux.JsonStore = Ext.extend(Ext.data.JsonStore, {
	constructor : function(a) {
		var c = a.baseParams ? a.baseParams : {};
		c.start = 0;
		c.limit = 25;
		var b = {
			baseParams : c,
			root : "result",
			totalProperty : "totalCounts",
			remoteSort : true
		};
		Ext.apply(b, a);
		Knight.ux.JsonStore.superclass.constructor.call(this, b);
	}
});