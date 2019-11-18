var IndexPortletSelector = function(home) {
	this.appHome = home;
	var column0 = this.initLeftColumns();
	var column1 = this.initRightColumns();
	this.formPanel = new Ext.FormPanel({
		layout : "column",
		items : [ {
			layout : "form",
			columnWidth : 0.5,
			border : false,
			items : column0
		}, {
			layout : "form",
			columnWidth : 0.5,
			border : false,
			items : column1
		} ]
	});
	this.buttons = [ {
		xtype : "button",
		text : "确定",
		iconCls : "btn-save",
		handler : this.activePortletLayout.createDelegate(this)
	}, {
		xtype : "button",
		text : "取消",
		iconCls : "btn-cancel",
		handler : function() {
			this.close();
		}.createDelegate(this)
	} ];
	IndexPortletSelector.superclass.constructor.call(this, {
		title : "选择显示模块",
		layout : "fit",
		height : 220,
		width : 300,
		modal : true,
		defaults : {
			padding : "5"
		},
		buttonAlign : "center",
		buttons : this.buttons,
		items : this.formPanel
	});
};
Ext.extend(IndexPortletSelector, Ext.Window, {
	initLeftColumns : function() {
		var column = [];
		for ( var panelId in PortletItemCfg.defaults) {
			var cfg = PortletItemCfg.defaults[panelId];
			var selected = (Ext.getCmp(cfg.id) == null) ? false : true;
			column.push({
				id : cfg.id + "CheckBox",
				xtype : "checkbox",
				boxLabel : cfg.title,
				hideLabel : true,
				checked : selected,
				name : cfg.id
			});
		}
		for ( var panelId in PortletItemCfg.lefts) {
			var cfg = PortletItemCfg.lefts[panelId];
			var selected = (Ext.getCmp(cfg.id) == null) ? false : true;
			if (isGranted("_" + cfg.id)) {
				column.push({
					id : cfg.id + "CheckBox",
					xtype : "checkbox",
					boxLabel : cfg.title,
					hideLabel : true,
					checked : selected,
					name : cfg.id
				});
			}
		}
		return column;
	},
	initRightColumns : function() {
		var column = [];
		for ( var panelId in PortletItemCfg.rights) {
			var cfg = PortletItemCfg.rights[panelId];
			var selected = (Ext.getCmp(cfg.id) == null) ? false : true;
			if (isGranted("_" + cfg.id)) {
				column.push({
					id : cfg.id + "CheckBox",
					xtype : "checkbox",
					boxLabel : cfg.title,
					hideLabel : true,
					checked : selected,
					name : cfg.id
				});
			}
		}
		return column;
	},
	activePortletLayout : function() {
		var pl = Ext.getCmp("AppHomeViewPortletLeft");
		var p = Ext.getCmp("AppHomeViewPortlet");
		var checkedPrtlets = this.formPanel.getForm().getValues();
		for ( var portletId in checkedPrtlets) {
			if ("on" == checkedPrtlets[portletId] && Ext.getCmp(portletId) == null) {
				pl.add(this.appHome.initHomePortletItem(portletId));
			}
		}
		pl.doLayout();
		p.doLayout();
		this.appHome.items.items[0].doLayout();
		this.close();
	}
});