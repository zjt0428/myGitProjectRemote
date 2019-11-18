var MessageFormWindows = function(a) {
	Ext.apply(this, a);
	var items = [ {
		xtype : "hidden",
		name : "userId"
	}, {
		xtype : "container",
		style : "padding:5px 0px 0px 0px;",
		layout : "column",
		height : 60,
		anchor : "100%",
		items : [ {
			xtype : "label",
			style : "padding:5px 5px 0px 2px;",
			html : "收信人<font color=red>*</font>:"
		}, {
			xtype : "textarea",
			maxLength : 1000,
			allowBlank : false,
			readOnly : true,
			width : 250,
			height : 50,
			name : "userFullname"
		}, {
			xtype : "container",
			border : true,
			width : 90,
			heigth : 55,
			items : [ {
				xtype : "button",
				iconCls : "btn-personal_recipient",
				text : "添加联系人 ",
				width : 80,
				handler : this.importReceiveUser.createDelegate(this)
			}, {
				xtype : "container",
				height : 3
			}, {
				xtype : "button",
				text : "清除联系人",
				iconCls : "btn-del",
				width : 80,
				handler : this.cleanReceiveUser.createDelegate(this)
			} ]
		} ]
	}, {
		xtype : "textarea",
		fieldLabel : "内容",
		width : 380,
		height : 80,
		maxLength : 1000,
		maxLengthText : "消息内容只允许输入1000个中文字符",
		autoScroll : true,
		allowBlank : false,
		name : "content"
	} ];
	this.messageFormPanel = new Ext.FormPanel({
		frame : false,
		bodyStyle : "margin:3px 3px 3px 3px;",
		autoScroll : true,
		defaultType : "textarea",
		labelAlign : "right",
		labelSeparator : "：",
		labelWidth : 50,
		url : __ctxPath + "/info/sendShortMessage.do",
		items : items
	});
	var buttonItems = [ {
		text : "发送",
		iconCls : "btn-personal-mail_go",
		handler : this.send.createDelegate(this)
	}, {
		text : "重置",
		iconCls : "btn-reset",
		handler : this.reset.createDelegate(this)
	} ];
	MessageFormWindows.superclass.constructor.call(this, {
		id : "MessageFormWindows",
		title : "发送信息",
		iconCls : "btn-personal-mail_attach",
		width : 480,
		height : 230,
		plain : true,
		border : false,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : [ this.messageFormPanel ],
		buttons : buttonItems
	});
};
Ext.extend(MessageFormWindows, Ext.Window, {
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
	send : function() {
		if (this.messageFormPanel.getForm().isValid()) {
			this.messageFormPanel.getForm().submit({
				waitMsg : "正在 发送信息",
				success : function(b, c) {
					$toast("信息发送成功！");
					if (this.callback) {
						this.callback.call(this);
					}
					this.close();
				}.createDelegate(this)
			});
		}
	},
	reset : function() {
		this.messageFormPanel.getForm().reset();
	}
});