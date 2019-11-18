Ext.ns("Ext.ux.form");
Ext.ux.form.SimpleCombo = Ext.extend(Ext.form.ComboBox, {
	constructor : function(p) {
		if (!p.codeData) {
			p.codeData = [];
		}
		var configure = {
			emptyText : "请选择...",
			mode : "local",
			triggerAction : "all",
			valueField : "code",
			displayField : "name",
			allowBlank : p.allowBlank,
			store : new Ext.data.SimpleStore({
				fields : [ "code", "name" ],
				data : p.codeData
			})
		};
		if (!p.allowBlank && p.codeData.length > 0 && p.codeData[0].length > 0) {
			configure.value = p.codeData[0][0];
			configure.defaultIndex = 0;
		}
		Ext.apply(configure, p || {});
		Ext.ux.form.SimpleCombo.superclass.constructor.call(this, configure);
	}
});
Ext.reg("simplecombo", Ext.ux.form.SimpleCombo);
Ext.ux.form.DataCombo = Ext.extend(Ext.form.ComboBox, {
	constructor : function(params) {
		params.hiddenName = params.name;
		var configure = {
			emptyText : "请选择...",
			mode : "local",
			triggerAction : "all"
		};
		Ext.apply(configure, params || {});
		Ext.ux.form.DataCombo.superclass.constructor.call(this, configure);
	}
});
Ext.reg("datacombo", Ext.ux.form.DataCombo);