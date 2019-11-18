var BindingFormWindows = function(a) {
	Ext.apply(this, a);
	
	var url = "";
	if(this.equipId) {
		url = __ctxPath + "/archive/bindingEquipment.do";
	}else {
		url = __ctxPath + "/dispatch/bindingContractLease.do";
	}
	var items = [ {
		xtype : "hidden",
		name : "equipId",
		value : this.equipId
	},{
		xtype : "hidden",
		name : "contractId",
		value : this.contractId
	},{
		xtype : "hidden",
		name : "userId"
	}, {
		xtype : "container",
		style : "padding:5px 0px 0px 0px;",
		layout : "column",
		height : 80,
		anchor : "100%",
		items : [ {
			xtype : "label",
			style : "padding:5px 5px 0px 2px;",
			html : "绑定人员<font color=red>*</font>:"
		}, {
			xtype : "textarea",
			maxLength : 1000,
			allowBlank : false,
			readOnly : true,
			width : 250,
			height : 80,
			name : "userFullname"
		}, {
			xtype : "container",
			border : true,
			width : 90,
			heigth : 80,
			items : [ {
				xtype : "button",
				iconCls : "btn-personal_recipient",
				text : "添加",
				width : 80,
				handler : this.importReceiveUser.createDelegate(this)
			}, {
				xtype : "container",
				height : 3
			}, {
				xtype : "button",
				text : "清除",
				iconCls : "btn-del",
				width : 80,
				handler : this.cleanReceiveUser.createDelegate(this)
			} ]
		} ]
	}];
	this.messageFormPanel = new Ext.FormPanel({
		frame : false,
		bodyStyle : "margin:3px 3px 3px 3px;",
		autoScroll : true,
		defaultType : "textarea",
		labelAlign : "right",
		labelSeparator : "：",
		labelWidth : 50,
		url : url,
		items : items
	});
	var buttonItems = [ {
		text : "保存",
		iconCls : "btn-save",
		handler : this.save.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-reset",
		handler : this.cancel.createDelegate(this)
	} ];
	BindingFormWindows.superclass.constructor.call(this, {
		id : "BindingFormWindows",
		title : "设备人员绑定",
		width : 480,
		height : 180,
		plain : true,
		border : false,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : [ this.messageFormPanel ],
		buttons : buttonItems
	});
};
Ext.extend(BindingFormWindows, Ext.Window, {
	importReceiveUser : function() {
		UserSelector.getView(function(h, f) {
			var c = this.messageFormPanel.getForm().findField("userId");
			var b = this.messageFormPanel.getForm().findField("userFullname");
			if (c.getValue() != "" && b.getValue() != "") {
				var e = (c.getValue() + ",").concat(h);
				var a = (b.getValue() + ",").concat(f);
				var d = uniqueArray(e.split(","));
				var g = uniqueArray(a.split(","));
				c.setValue(d.toString());
				b.setValue(g.toString());
			} else {
				c.setValue(h);
				b.setValue(f);
			}
		}.createDelegate(this)).show();
	},
	cleanReceiveUser : function() {
		this.messageFormPanel.getForm().findField("userFullname").setValue(null);
		this.messageFormPanel.getForm().findField("userId").setValue(null);
	},
	save : function() {
		if (this.messageFormPanel.getForm().isValid()) {
			this.messageFormPanel.getForm().submit({
				waitMsg : "正在保存......",
				success : function(b, c) {
					$toast("保存成功！");
					if (this.callback) {
						this.callback.call(this);
					}
					this.close();
				}.createDelegate(this)
			});
		}
	},
	cancel : function() {
		this.close();
	}
});