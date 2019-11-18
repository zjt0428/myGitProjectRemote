var MessageReplyWindows = function(a, b) {
	Ext.apply(this, a);
	var cfg = {};
	Ext.applyIf(cfg, {
		x : 5,
		y : 350
	});
	this.messagePanel = new Ext.form.FormPanel({
		frame : false,
		bodyStyle : "padding:5px 20px 0px 0px;",
		width : 275,
		height : 180,
		labelAlign : "right",
		labelSeparator : "：",
		labelWidth : 48,
		defaultType : "textarea",
		url : __ctxPath + "/info/sendShortMessage.do",
		items : [ {
			xtype : "hidden",
			name : "userId",
			value : this.receiveUserId
		}, {
			xtype : "textfield",
			style : "padding:0px 0px 0px 0px",
			width : 220,
			readOnly : true,
			fieldLabel : "收信人",
			name : "userFullname",
			value : this.receiveUserName
		}, {
			style : "padding:0px 0px 0px 0px",
			width : 220,
			height : 80,
			allowBlank : false,
			maxLength : 1000,
			maxLengthText : "消息内容只允许输入1000个中文字符",
			fieldLabel : "内容",
			name : "content"
		} ]
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
	MessageReplyWindows.superclass.constructor.call(this, Ext.apply({
		title : "回复",
		iconCls : "menu-personal-mail_reply",
		width : 300,
		height : 200,
		layout : "fit",
		plain : true,
		border : false,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : this.messagePanel,
		buttons : buttonItems
	}, b || {
		x : 5,
		y : 350
	}));
};
Ext.extend(MessageReplyWindows, Ext.Window, {
	send : function() {
		if (this.messagePanel.getForm().isValid()) {
			this.messagePanel.getForm().submit({
				waitMsg : "正在 发送信息",
				success : function(d, e) {
					$toast("信息发送成功！");
					this.close();
				}.createDelegate(this)
			});
		}
	},
	reset : function() {
		this.messagePanel.getForm().findField("content").reset();
	}
});