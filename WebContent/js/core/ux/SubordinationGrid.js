/**
 * <code><pre>
 * saveable : boolean, // 内置新增/删除按钮开关
 * createable : boolean, // 新增按钮开关
 * removeable : boolean, // 删除按钮开关
 * selectable : boolean,
 * height : number,
 * object : Object,
 * enabled : boolean,
 * placeholder : '',
 * title : '',
 * columns : [],
 * tbarItems : [],
 * sortField : '',
 * fields : [],
 * viewConfig : {},
 * removal : {
 * 	url : '',
 *  callback : 'function'
 * },
 * url : '', // 数据加载url
 * paging : true, // 分页
 * base_params : {},
 * grid_view : {}
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.SubordinationGrid = function(a) {
	this.saveable = a.saveable ? true : false;
	this.selectable = a.selectable;
	this.object = a.object;
	this.enabled = a.enabled;
	this.placeholder = a.placeholder ? a.placeholder : a.title;
	this.removal = {};
	Ext.apply(this.removal, a.removal || {});
	if (a.removalable !== false && Ext.isEmpty(this.removal.url)) {
		if (this.enabled) {
			this.removal.url = __ctxPath + "/" + this.object + "/multi/disable.do";
		} else {
			this.removal.url = __ctxPath + "/" + this.object + "/multi/delete.do";
		}
	}
	this.fieldId = a.fields[0];
	if (!Env.isString(this.fieldId)) {
		this.fieldId = a.fields[0].name;
	}

	// 初始化TopToolbar
	var tbar = null;
	var tbarItems = [];
	if (this.saveable) {
		if (a.createable !== false) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.createSubordination.createDelegate(this)
			})
		}
		if (a.removeable !== false) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.removeSubordination.createDelegate(this)
			});
		}
	}
	if (a.tbarItems && a.tbarItems.length > 0) {
		tbarItems.push(a.tbarItems);
	}
	if (tbarItems.length > 0) {
		tbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			items : tbarItems
		});
		this.selectable = true;
	}
	// 初始化columns
	for (var i = 0; i < a.columns.length; i++) {
		var column = a.columns[i];
		column.width = column.width ? column.width : 100;
		if (column.renderer && typeof (column.renderer) == "function") {
			column.defineRenderer = column.renderer;
		}
		column.renderer = function(value, meta, record, row, index, store) {
			if (this.autoExpand) {
				meta.attr = 'style="white-space:normal;word-break:break-all;"';
			}
			var field = store.fields.get(this.dataIndex);
//			var renderValue = this.parseLexiconField(value, field);
			if (this.defineRenderer) {
				return this.defineRenderer.call(this, value, meta, record, row, index, store, null);
			}
			return value;
		}
	}
	var sm = null;
	a.columns.unshift(new Ext.grid.RowNumberer());
	if (this.selectable) {
		sm = new Ext.grid.CheckboxSelectionModel();
		a.columns.unshift(sm);
	}
	if (a.rowAction && a.rowAction.actionItems && a.rowAction.actionItems.length > 0) {
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
	// 初始化store
	if (a.remoteloadable !== false) {
		a.url = __ctxPath + "/" + this.object + "/list.do";
		if (a.enabled) {
			a.url = __ctxPath + "/" + this.object + "/enable/list.do";
		}
		if(a.customable){
			a.url = __ctxPath + "/" + a.url;
		}
	}
	var configure = {
		id : this.fieldId,
		remoteSort : true,
		sortField : a.sortField ? a.sortField : this.fieldId,
		sortDir : "desc",
		fields : a.fields
	};
	if (!Ext.isEmpty(a.url)) {
		if (a.paging === false) {
			a.paging = true;
		}
		var baseParams = {
			start : 0,
			limit : 25
		}
		Ext.apply(baseParams, a.base_params || {});
		Ext.apply(configure, {
			url : a.url,
			baseParams : baseParams,
			root : "result",
			totalProperty : "totalCounts"
		});
	} else {
		a.paging = false;
	}
	var store = new Ext.data.JsonStore(configure);
	if (!Ext.isEmpty(a.url)) {
		new Ext.util.DelayedTask(function() {
			store.load({
				callback : function(records, options, success) {
					if (records.length == 0 && typeof (a.extendEmptyAfterLoad) == "function") {
						new Ext.util.DelayedTask(function() {
							a.extendEmptyAfterLoad.call(this);
						}).delay(100);
						return;
					}
					if (records.length > 0 && typeof (a.extendAfterLoad) == "function") {
						new Ext.util.DelayedTask(function() {
							a.extendAfterLoad.call(this);
						}).delay(100);
						return;
					}
				}
			});
		}).delay(100);
	} else if (typeof (a.preBeforeLoad) == "function") {
		new Ext.util.DelayedTask(function() {
			a.preBeforeLoad.call(this);
		}).delay(100);
	}
	// 初始化列表视图
	var grid_view = a.grid_view ? a.grid_view : {};
	Ext.applyIf(grid_view, {
		autoHeight : true,
		title : a.title,
		columns : a.columns,
		clicksToEdit : this.saveable ? 1 : 5,
		viewConfig : a.viewConfig ? a.viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		}
	});
	if (a.paging) {
		grid_view.bbar = new Ext.PagingToolbar({
			store : store,
			displayInfo : true,
			displayMsg : "当前显示从{0}至{1},共{2}条记录",
			emptyMsg : "当前没有记录"
		})
	}
	Knight.ux.SubordinationGrid.superclass.constructor.call(this, Ext.apply({
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
Ext.extend(Knight.ux.SubordinationGrid, Ext.grid.EditorGridPanel, {
	/** tbar 操作 */
	generalGridAction : function(options) {
		var emptyText = options.emptyText;
		var confirmText = options.confirmText;
		var successText = options.successText;
		var url = options.url;
		var validate = options.validate;
		var callback = options.callback;
		var selections = this.getSelectionModel().getSelections();
		if (selections.length == 0) {
			$toast(emptyText);
			return;
		}
		var e = Array();
		for (var i = 0; i < selections.length; i++) {
			if (typeof (validate) == "function") {
				if (validate.call(this, selections[i].data)) {
					e.push(selections[i].data[this.fieldId]);
				}
			} else if (!Ext.isEmpty(selections[i].data[this.fieldId])) {
				e.push(selections[i].data[this.fieldId]);
			}
		}
		if (!Ext.isEmpty(url) && e.length > 0) {
			var params = {
				ids : e
			};
			Ext.apply(params, options.params || {});
			Ext.Msg.confirm("信息确认", confirmText, function(c) {
				if (c == "yes") {
					Env.request({
						url : url,
						params : params,
						success : function(r, o) { // response, options
							$toast(successText);
							if (typeof (callback) == "function") {
								callback.call(this);
							}
						}.createDelegate(this)
					});
				}
			}.createDelegate(this));
		} else {
			if (typeof (callback) == "function") {
				callback.call(this, selections);
			}
		}
	},
	/** rowAction 操作 */
	generalConfirmRowRecordAction : function(data, grid, action, rowIndex, colIndex, key) {
		var objectId = data[this.fieldId];
		if (Ext.isEmpty(objectId)) {
			if (typeof (action.callback) == "function") {
				action.callback.call(this, data, grid, action, rowIndex, colIndex, key);
			}
			return;
		}
		var params = Ext.apply({
			ids : objectId
		}, action.params || {});
		Ext.applyIf(action, {
			title : "操作提示",
			confirmText : "你确定要【" + action.qtip + "】" + this.placeholder + "吗?",
			successText : "成功【" + action.qtip + "】所选的" + this.placeholder + "!"
		});
		Ext.Msg.confirm(action.title, action.confirmText, function(b) {
			if (b == "yes") {
				if (Ext.isEmpty(action.url)) {
					$toast(action.successText);
					if (typeof (action.callback) == "function") {
						action.callback.call(this, data, grid, action, rowIndex, colIndex, key);
					}
					return;
				}
				Env.request({
					url : action.url,
					params : params,
					success : function(r, o) { // response, options
						$toast(action.successText);
						if (typeof (action.callback) == "function") {
							action.callback.call(this, data, grid, action, rowIndex, colIndex, key);
						}
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	},
	generalOperationGridAction : function(url, op, va, cb) {
		this.generalGridAction({
			emptyText : "请选择要【" + op + "】的" + this.placeholder + "!",
			confirmText : "您确认要【" + op + "】所选的" + this.placeholder + "吗?",
			successText : "成功【" + op + "】所选的" + this.placeholder + "!",
			url : url,
			validate : va,
			callback : cb
		});
	},
	beforeedit : function() {
		return this.saveable;
	},
	afteredit : function() {
		return this.saveable;
	},
	createSubordination : function() {
		this.addRecordHeight(1);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, this.createRecordData());
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	removeSubordination : function() {
		var callback = function() {
			var m = this.getSelectionModel().getSelections();
			this.subtractRecordHeight(m.length);
			this.stopEditing();
			for (var i = 0; i < m.length; i++) {
				this.getStore().remove(m[i]);
			}
			this.startEditing(0, 0);
			if (this.removal.callback) {
				this.removal.callback.call(this, m);
			}
		};
		this.generalOperationGridAction(this.removal.url, "删除", null, callback.createDelegate(this));
	},
	removeRecord : function(data, grid, action, rowIndex, colIndex, key) {
		var callback = null;
		if (typeof (action.callback) == "function") {
			callback = action.callback;
		}
		action.callback = function(data, grid, action, rowIndex, colIndex, key) {
			this.subtractRecordHeight(1);
			this.stopEditing();
			this.getStore().remove(grid.getStore().getAt(rowIndex));
			this.startEditing(0, 0);
			if (callback) {
				callback.call(this, data, grid, action, rowIndex, colIndex, key);
			}
		}.createDelegate(this);
		if (Ext.isEmpty(action.url)) {
			action.url = this.removal.url;
		}
		this.generalConfirmRowRecordAction(data, grid, action, rowIndex, colIndex, key);
	},
	deleteSubordinationRecord : function(data, grid, action, rowIndex, colIndex, key) {
		action.url = __ctxPath + "/" + this.object + "/multi/disable.do";
		this.removeRecord(data, grid, action, rowIndex, colIndex, key);
	},
	disableSubordinationRecord : function(data, grid, action, rowIndex, colIndex, key) {
		action.url = __ctxPath + "/" + this.object + "/multi/disable.do";
		this.removeRecord(data, grid, action, rowIndex, colIndex, key);
	},
	createRecordData : function() {
	},
	setParentForm : function(form) {
		this.parentForm = form;
	}
});