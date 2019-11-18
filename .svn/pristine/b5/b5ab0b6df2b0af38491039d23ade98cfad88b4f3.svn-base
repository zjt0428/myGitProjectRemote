/**
 * 结合rowAction和ActionColumn写的图标操作列 示例：
 * 
 * <pre><code>
 * {
 * 	xtype : 'actioncolumn',
 * 	header : this.actionColumnHeader,
 * 	autoWidth : false,
 * 	width : this.actionColumnWidth,
 * 	items : [ {
 * 		iconCls : 'icon-edit',
 * 		tooltip : '示例',
 * 		text : '示例',
 * 		stopSelection : false,
 * 		scope : this,
 * 		handler : function(grid, rowIndex, colIndex) {
 * 			this.onUpdate();
 * 		}
 * 	} ]
 * }
 * </code></pre>
 * 
 * @class Ext.ux.grid.ActionColumn
 * @extends Ext.grid.ActionColumn
 */
Ext.ns("Ext.ux.grid");
Ext.ux.grid.ActionColumn = Ext.extend(Ext.grid.ActionColumn, {
	constructor : function(cfg) {
		var me = this, items = cfg.items || (me.items = [ me ]);
		Ext.grid.ActionColumn.superclass.constructor.call(me, cfg);
		me.renderer = function(v, meta) {
			var rowActionItems = new Array(items.length);
			for ( var i = 0; i < rowActionItems.length; i++) {
				rowActionItems[i] = {};
				if (items[i].hidden == undefined) {
					rowActionItems[i].hidden = false;
				} else {
					rowActionItems[i].hidden = items[i].hidden;
				}
			}
			v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, [ rowActionItems, arguments[2] ]) || '' : '';
			meta.css += ' x-action-col-cell';
			for ( var i = 0; i < items.length; i++) {
				if (rowActionItems[i].hidden) {
					continue;
				}
				var item = items[i];
				var cls = Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || this.scope || this, arguments) : '';
				var tooltip = item.tooltip ? item.tooltip : item.qtip;
				var tooltip = tooltip ? (' ext:qtip="' + tooltip + '"') : '';
				v += '<div class="' + (item.iconCls || '') + ' x-action-col-' + String(i) + ' ' + (item.text ? 'ux-action-col-text ' : '') + cls + ' ux-action-col-item"' + tooltip + ' style="cursor:pointer;' + item.style + '">'
						+ (item.text ? '<span ' + tooltip + ' style="cursor:pointer;">' + item.text + '</span>' : '') + '</div>';
			}
			return v;
		};
	},
	processEvent : function(name, e, grid, rowIndex, colIndex) {
		var t = e.getTarget('.ux-action-col-item');
		if (t) {
			var m = t.className.match(this.actionIdRe), item, fn;
			if (m && (item = this.items[parseInt(m[1], 10)])) {
				if (name == 'click') {
					(fn = item.handler || this.handler) && fn.call(item.scope || this.scope || this, grid, rowIndex, colIndex, item, e);
				} else if ((name == 'mousedown') && (item.stopSelection !== false)) {
					return false;
				}
			}
		}
		return Ext.grid.ActionColumn.superclass.processEvent.apply(this, arguments);
	}
});
Ext.apply(Ext.grid.Column.types, {
	actioncolumn : Ext.ux.grid.ActionColumn
});