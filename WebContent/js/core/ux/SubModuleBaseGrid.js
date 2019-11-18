/**
 * <code><pre>
 * saveable : boolean,
 * selectable : boolean,
 * bbar : {},
 * height : number,
 * option : '',
 * title : '',
 * columns : [],
 * tbarItems : [],
 * fields : [],
 * viewConfig : {},
 * delurl : '',
 * loadurl : '',
 * base_params : {},
 * grid_view : {}
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.SubModuleBaseGrid = function(a) {
	this.saveable = a.saveable ? true : false;
	this.selectable = a.selectable;
	this.delurl = a.delurl;
	this.option = a.option;
	this.fieldId = a.fields[0];

	var tbar = null;
	var tbarItems = [];
	if (a.tbarItems && a.tbarItems.length > 0) {
		tbarItems.push(a.tbarItems);
	}
	if (a.saveable) {
        if (!a.delForbidden) {
            if (this.delurl) {
                tbarItems.unshift({
                    iconCls : "btn-head-del",
                    text : "删除",
                    handler : this.delSubModule.createDelegate(this)
                });
            }
        }
		if (!a.addForbidden) {
			tbarItems.unshift({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSubModule.createDelegate(this)
			})
		}
	}
	if (tbarItems.length > 0) {
		tbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			items : tbarItems
		});
		this.selectable = true;
	}
	for ( var column in a.columns) {
		column.width = column.width ? column.width : 100;
	}
	var sm = null;
	a.columns.unshift(new Ext.grid.RowNumberer());
	if (this.selectable) {
		sm = new Ext.grid.CheckboxSelectionModel();
		a.columns.unshift(sm);
	}

	var actionable = a.rowAction && a.rowAction.actionItems && a.rowAction.actionItems.length > 0;
	if (actionable) {
		var actionItems = a.rowAction.actionItems;
		var renderer = a.rowAction.renderer;
		var width = 40;
		if (a.rowAction.width) {
			width = a.rowAction.width;
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
		a.columns.push(rowActions);
	}

	var grid_view = {
		autoHeight : true,
		title : a.title,
		columns : a.columns,
		clicksToEdit : this.saveable ? 1 : 5,
		viewConfig : a.viewConfig ? a.viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		}
	}
	var store = null;
	if (Ext.isEmpty(a.loadurl)) {
		store = this.initUnloadStore(a.fields);
	} else {
		store = this.initLoadselfStore(a.loadurl, a.fields, a.base_params);
	}
	if (a.bbar) {
		grid_view.bbar = new Ext.PagingToolbar(Ext.apply({
			store : store,
			displayInfo : true,
			displayMsg : "当前显示从{0}至{1},共{2}条记录",
			emptyMsg : "当前没有记录"
		}, a.bbar || {}))
	}
	Ext.apply(grid_view, a.grid_view || {});
	Knight.ux.SubModuleBaseGrid.superclass.constructor.call(this, Ext.apply({
		layout : "fit",
		tbar : tbar,
		store : store,
		trackMouseOver : true,
		sm : sm,
		enableHdMenu : false,
		listeners : {
			beforeedit : this.beforeedit.createDelegate(this),
			afteredit : this.afteredit.createDelegate(this)
		}
	}, grid_view));
};
Ext.extend(Knight.ux.SubModuleBaseGrid, Ext.grid.EditorGridPanel, {
	initLoadselfStore : function(url, fields, base_params) {
		var c = base_params ? base_params : {};
		Ext.applyIf(c, {
			start : 0,
			limit : 25
		});
		var store = new Ext.data.JsonStore({
			url : url,
			baseParams : c,
			root : "result",
			totalProperty : "totalCounts",
			id : fields[0],
			sortField : fields[0],
			sortDir : "asc",
			fields : fields
		});
		store.load();
		return store;
	},
	initUnloadStore : function(fields) {
		return new Ext.data.JsonStore({
			id : fields[0],
			sortField : fields[0],
			sortDir : "asc",
			fields : fields
		});
	},
	speciallyGridAction : function(g, id, url, op, p, v, c) {
		var msg1 = "请选择要【" + op + "】的" + this.option + "！";
		var msg2 = "您确认要【" + op + "】所选的" + this.option + "吗？";
		var msg3 = "成功【" + op + "】所选的" + this.option + "！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p, v, c);
	},
	beforeedit : function() {
		return this.saveable;
	},
	afteredit : function() {
		return this.saveable;
	},
	getTopArrayCodeName : function(a) {
		if (Ext.isEmpty(a)) {
			return null;
		}
		if (Ext.isEmpty(a[0])) {
			return null;
		}
		if (Ext.isEmpty(a[0][1])) {
			return null;
		}
		return a[0][1];
	},
	addSubModule : function() {
		this.addRecordHeight(1);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, this.createSubModule());
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(this.store.data.items.length-1,2);
	},
	delSubModule : function() {
		if (Ext.isEmpty(this.delurl)) {
			var m = this.getSelectionModel().getSelections();
			this.subtractRecordHeight(m.length);
			for (var i = 0; i < m.length; i++) {
				this.stopEditing();
				this.getStore().remove(m[i]);
			}
			this.startEditing(0, 0);
		} else {
			this.speciallyGridAction(this, this.fieldId, this.delurl, "删除", null, null, function() {
				var m = this.getSelectionModel().getSelections();
				this.subtractRecordHeight(m.length);
				this.stopEditing();
				for (var i = 0; i < m.length; i++) {
					if (this.recordcallback) {
						this.recordcallback.call(this);
					}
					this.getStore().remove(m[i]);
				}
				this.startEditing(0, 0);
			}.createDelegate(this));
		}
	},
	createSubModule : function() {
	}
});