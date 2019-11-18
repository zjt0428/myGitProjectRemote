Ext.ns("Knight.ux");
Knight.ux.DateMenu = Ext.extend(Ext.menu.Menu, {
	enableScrolling : false,
	hideOnClick : true,
	pickerId : null,
	cls : 'x-date-menu',
	initComponent : function() {
		this.on('beforeshow', this.onBeforeShow, this);
		if (this.strict = (Ext.isIE7 && Ext.isStrict)) {
			this.on('show', this.onShow, this, {
				single : true,
				delay : 20
			});
		}
		Ext.apply(this, {
			plain : true,
			showSeparator : false,
			items : this.picker = new Ext.DatePicker(Ext.applyIf({
				internalRender : this.strict || !Ext.isIE9m,
				ctCls : 'x-menu-date-item',
				id : this.pickerId
			}, this.pickerConfig))
		});
		this.picker.purgeListeners();
		Knight.ux.DateMenu.superclass.initComponent.call(this);

		this.relayEvents(this.picker, [ 'select' ]);
		this.on('show', this.picker.focus, this.picker);
		this.on('select', this.menuHide, this);
		if (this.handler) {
			this.on('select', this.handler, this.scope || this);
		}
	},
	menuHide : function() {
		if (this.hideOnClick) {
			this.hide(true);
		}
	},
	onBeforeShow : function() {
		if (this.picker) {
			this.picker.hideMonthPicker(true);
		}
	},
	onShow : function() {
		var el = this.picker.getEl();
		el.setWidth(el.getWidth());
	}
});
Ext.reg('kudatemenu', Knight.ux.DateMenu);