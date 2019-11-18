Ext.ns("SysConfigView");
var SysConfigView = function() {
	this.topbar = null;
	this.topbar = new Ext.Toolbar({
		height : 30,
		bodyStyle : "text-align:left",
		bodyStyle : "",
		items : []
	});
	this.topbar.add(new Ext.Button({
		text : "保存",
		iconCls : "btn-save",
		handler : this.saveSystemConfigure.createDelegate(this)
	}));
	this.topbar.add(new Ext.Button({
		text : "重置",
		iconCls : "btn-reseted",
		handler : this.resetSystemConfigure.createDelegate(this)
	}));

	this.form = new Ext.FormPanel({
		id : "mailConfigForm",
		url : __ctxPath + "/system/saveSysConfig.do",
		defaultType : "textfield",
		bodyStyle : "padding-left : 10px;",
		frame : false,
		border : false,
		layout : "form",
		items : []
	});
	this.loadSystemConfigure();
	SysConfigView.superclass.constructor.call(this, {
		id : "SysConfigView",
		iconCls : "menu-system-setting",
		title : "系统配置",
		tbar : this.topbar,
		autoScroll : true,
		items : [ this.form ]
	});
};
Ext.extend(SysConfigView, Ext.Panel, {
	createFieldItems : function(a, b) {
		switch (b.typeName) {
			case "TEXT":
				a.push({
					xtype : "textfield",
					width : 180,
					allowBlank : false,
					name : b.configKey,
					value : b.dataValue
				});
				break;
			case "COMBO":
				var store = [];
				var ds = b.datastore.split(";");
				for ( var i = 0; i < ds.length; i++) {
					var s = ds[i].split(":");
					store.push([ s[0], s[1] ]);
				}
				a.push({
					xtype : "combo",
					mode : "local",
					editable : false,
					triggerAction : "all",
					store : store,
					width : 175,
					allowBlank : false,
					hiddenName : b.configKey,
					value : b.dataValue
				});
				break;
		}
	},
	dolayoutSystemItems : function(a) {
		var configureItems = [];
		for ( var i = 0; i < a.length; i++) {
			var fieldItems = [ {
				xtype : "label",
				style : "font-weight:bold;padding: 5px 0px 0px 0px;",
				text : a[i].configName + ":",
				width : 145
			} ];
			this.createFieldItems(fieldItems, a[i]);
			fieldItems.push({
				xtype : "label",
				style : "padding: 5px 0px 0px 10px;",
				width : 200,
				text : a[i].configDesc
			});
			configureItems.push({
				xtype : "fieldset",
				title : a[i].fieldset,
				layout : "form",
				width : 600,
				items : [ {
					xtype : "container",
					style : "padding-bottom:3px;",
					layout : "column",
					items : fieldItems
				} ]
			});
		}
		return configureItems;
	},
	loadSystemConfigure : function() {
		Ext.Ajax.request({
			async : false,
			url : __ctxPath + "/system/loadSysConfig.do",
			success : function(b, d) {
				var c = Ext.util.JSON.decode(b.responseText);
				this.form.add(this.dolayoutSystemItems(c.data));
			}.createDelegate(this)
		});
	},
	saveSystemConfigure : function() {
		if (this.form.getForm().isValid()) {
			this.form.getForm().submit({
				method : "post",
				waitMsg : "正在提交数据...",
				success : function(c, e) {
					$toast("成功信息保存！");
					var d = Ext.getCmp("centerTabPanel");
					d.remove("SysConfigView");
				},
				failure : function(c, d) {
					Ext.MessageBox.show({
						title : "操作信息",
						msg : "信息保存出错，请联系管理员！",
						buttons : Ext.MessageBox.OK,
						icon : "ext-mb-error"
					});
				}
			});
		}
	},
	resetSystemConfigure : function() {
		Ext.Ajax.request({
			url : __ctxPath + "/system/loadSysConfig.do",
			success : function(c, e) {
				this.form.removeAll();
				var d = Ext.util.JSON.decode(c.responseText);
				this.form.add(this.dolayoutSystemItems(d.data));
				this.form.doLayout();
			}.createDelegate(this)
		});
	}
});