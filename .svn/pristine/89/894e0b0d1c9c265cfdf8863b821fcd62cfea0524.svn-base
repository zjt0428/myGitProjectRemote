/**
 * <code><pre>
 * configView : {
 * 	title : ''
 * },
 * emptySelectedText : '',
 * source : {
 * 	url : '',
 * 	base_params : {},
 * 	search_config : {
 * 		generalItems : []
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
 * 		columns : []
 * 	}
 * },
 * target : {
 * 	title : '',
 * 	collect : boolean,
 * 	single : boolean,
 *  width : number,
 * 	parent : '',
 *  url : '',
 *  rowNumWidth : number,
 * 	fields : [],
 * 	columns : []
 * },
 * callback : function
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.RelationSelector = function(a) {
	this.config = {
		emptySelectedText : "还未选取所需信息项,如无选项可选,请点击【取消】!"
	};
	Ext.apply(this.config, a);
	this.sourcePanel = null;
	this.targetPanel = null;
	this.targetEnable = false;
	this.targetRemoteEnable = false;
	if (a.target) {
		this.targetEnable = true;
		if (!Ext.isEmpty(a.target.url)) {
			this.targetRemoteEnable = true;
		}
	}

	var selectePanel = this.initSelectePanel(a);
	Knight.ux.RelationSelector.superclass.constructor.call(this, Ext.apply({
		title : "关联业务",
		layout : "fit",
		iconCls : "menu-set-department",
		x : 200,
		y : 200,
		width : 1200,
		height : 600,
		items : [ selectePanel ],
		border : false,
		maximizable : true,
		maximized : this.collectEnable == true ? this.collectEnable : false,
		modal : true,
		plain : true,
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
	}, a.configView || {}));
};
Ext.extend(Knight.ux.RelationSelector, Ext.Window, {
	// protected
	targetRowdbReload : function(data) {
	},
	// private
	getJsonStore : function(url, params, fields) {
		return new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : url,
				params : params
			}),
			reader : new Ext.data.JsonReader({
				root : "result",
				totalProperty : "totalCounts",
				id : fields[0],
				fields : fields
			})
		});
	},
	// private
	getArrayStore : function(fields) {
		return new Ext.data.JsonStore({
			fields : fields
		});
	},
	// private
	getFavoritesItems : function() {
		if (!this.config.target.parent) {
			this.config.target.parent = "parent";
		}
		var c = this.config.target;
		c.width = (c.width ? c.width : "260");
		var store = null;
		var bbar = null;
		if (this.targetRemoteEnable) {
			this.config.source.datagrid_config.single = true;
			store = this.getJsonStore(c.url, c.params, c.fields);
			if (!(c.params && c.params.limit && c.params.limit < 0)) {
				bbar = new Ext.PagingToolbar({
					pageSize : 25,
					store : store,
					displayInfo : true,
					displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
					emptyMsg : "当前没有记录"
				});
			}
		} else {
			this.config.source.datagrid_config.single = false;
			store = this.getArrayStore(c.fields);
		}
		var sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : c.single
		});
		for ( var column in c.columns) {
			column.width = column.width ? column.width : 100;
		}
		c.columns.unshift(sm);
		c.columns.unshift(new Ext.grid.RowNumberer({
			width : c.rowNumWidth ? c.rowNumWidth : 23
		}));
		var cm = new Ext.grid.ColumnModel({
			columns : c.columns,
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});
		this.targetPanel = new Ext.grid.EditorGridPanel({
			title : c.title ? c.title : "已选内容",
			layout : "fit",
			store : store,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			sm : sm,
			cm : cm,
			viewConfig : {
				forceFit : false,
				enableRowBody : false,
				showPreview : false
			},
			bbar : bbar
		});
		this.targetPanel.addListener("rowdblclick", this.targetRowdblclick.createDelegate(this));
		var favoritesPanel = new Ext.Panel({
			layout : "border",
			region : "east",
			width : c.width,
			height : "100%",
			split : true,
			collapseMode : "mini",
			border : false,
			autoScroll : true,
			items : [ new Ext.Panel({
				region : "west",
				frame : true,
				width : 40,
				layout : {
					type : "vbox",
					pack : "center",
					align : "stretch"
				},
				defaultType : "button",
				items : [ {
					iconCls : "btn-add-all",
					text : "",
					scope : this,
					handler : this.addAll.createDelegate(this)
				}, {
					iconCls : "btn-rem-all",
					text : "",
					scope : this,
					handler : this.removeAll.createDelegate(this)
				} ]
			}), {
				region : "center",
				layout : "fit",
				autoScroll : true,
				items : [ this.targetPanel ]
			} ]
		});
		return [ favoritesPanel ];
	},
	initSelectePanel : function(c) {
		var c = this.config;
		var favoritesItems = null;
		if(c.items) {
			favoritesItems = c.items;
		}
		if (this.targetEnable) {
			favoritesItems = this.getFavoritesItems();
		}
		c.source.items = favoritesItems;
		var selectePanel = new Knight.ux.SearchGridPanel(c.source);
		this.customPanel = selectePanel;
		this.sourcePanel = selectePanel.getDataGridPanel();
		this.sourcePanel.addListener("rowdblclick",
				c.source.dbclickConfirm?this.confirm.createDelegate(this):this.sourceRowdblclick.createDelegate(this));
		return selectePanel;
	},
	addCollectStore : function(data) {
		var s = this.targetPanel.getStore();
		for (var i = 0; i < s.getCount(); i++) {
			if (s.getAt(i).data[this.config.target.fields[0]] == data[this.config.target.fields[0]]) {
				return;
			}
		}
		var RecordType = s.recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, data);
		this.targetPanel.stopEditing();
		s.add(recordType);
		this.targetPanel.startEditing(0, 0);
	},
	sourceRowdblclick : function(p, i) {
		if (!this.targetEnable) {
			return;
		}
		if (!this.targetRemoteEnable) {
			var clickRow = p.getStore().getAt(i);
			this.addCollectStore(clickRow.data);
		} else {
			this.clickrowdb = p.getStore().getAt(i);
			this.targetRowdbReload(this.clickrowdb.data);
		}
	},
	targetRowdblclick : function(p, i) {
		if (!this.targetEnable) {
			return;
		}
		var clickRow = p.getStore().getAt(i);
		p.getStore().remove(clickRow);
	},
	addAll : function() {
		if (!this.targetEnable) {
			return;
		}
		var m = this.sourcePanel.getSelectionModel().getSelections();
		if (!this.targetRemoteEnable) {
			for (var i = 0; i < m.length; i++) {
				this.addCollectStore(m[i].data);
			}
		} else {
			this.clickrowdb = m[0];
			this.targetRowdbReload(this.clickrowdb.data);
		}
	},
	removeAll : function() {
		if (!this.targetEnable) {
			return;
		}
		var m = this.targetPanel.getSelectionModel().getSelections();
		var s = this.targetPanel.getStore();
		for (var i = 0; i < m.length; i++) {
			this.targetPanel.stopEditing();
			s.remove(m[i]);
		}
		this.targetPanel.startEditing(0, 0);
	},
	confirm : function() {
		var data = null;
		if (!this.targetEnable) {
			data = this.sourcePanel.getSelectionModel().getSelections();
		} else {
			if (this.config.target.collect) {
				data = this.targetPanel.getStore().data.items;
			} else {
				data = this.targetPanel.getSelectionModel().getSelections();
			}
			if (this.targetRemoteEnable) {
				for (var i = 0; i < data.length; i++) {
					data[i].data[this.config.target.parent] = {};
					Ext.apply(data[i].data[this.config.target.parent], this.clickrowdb.data);
				}
			}
		}
		if (data.length == 0) {
			Ext.Msg.alert("信息提示", this.config.emptySelectedText);
			return;
		}
		if (this.callback) {
			this.callback.call(this, data);
		}
		if (this.callfinally){
			this.callfinally.call(this.data);
		}
		this.close();
	},
	cancel : function() {
		if (this.callfinally){
			this.callfinally.call(this);
		}
		this.close();
	},
	fireBusinessEvent : function(listViewPanle, buttonId, params) {
		var center = Ext.getCmp("centerTabPanel");
		var tabItem = center.getItem(listViewPanle);
		if (tabItem == null) {
			var panel = eval("new " + listViewPanle + "(params)");
			tabItem = center.add(panel);
		}
		var button = Ext.getCmp(buttonId);
		button.handler.call(this);
	},
	getSelectePanel : function() {
		return this.customPanel;
	}
});