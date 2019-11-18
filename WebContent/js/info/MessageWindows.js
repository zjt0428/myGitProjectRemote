var MessageWindows = function() {
	this.message;
	this.messagePanel = new Ext.Panel({
		height : 150,
		width : 160,
		html : ""
	});
	var buttonItems = [ {
		hidden : true,
		iconCls : "btn-down",
		text : "下一条",
		handler : this.nextMessage.createDelegate(this)
	}, {
		hidden : true,
		text : "回复",
		iconCls : "btn-personal-msgs",
		handler : this.replyMessage.createDelegate(this)
	}, {
		text : "删除",
		iconCls : "btn-del",
		handler : this.deleteCurrentMessage.createDelegate(this)
	} ];
	MessageWindows.superclass.constructor.call(this, {
		id : "messageWindows",
		iconCls : "menu-personal-reply",
		x : 5,
		y : 350,
		width : 300,
		height : 200,
		layout : "fit",
		plain : true,
		border : false,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : [ this.messagePanel ],
		buttons : buttonItems,
		listeners : {
			afterrender : this.loadafterrender.createDelegate(this)
		}
	});
};
Ext.extend(MessageWindows, Ext.Window, {
	nextMessage : function() {
		this.buttons[0].hide();
		this.buttons[1].hide();
		this.loadafterrender();
	},
	replyMessage : function() {
		this.close();
		new MessageReplyWindows({
			receiveUserId : this.message.shortMessage.senderId,
			receiveUserName : this.message.shortMessage.sender
		}).show();
	},
	deleteCurrentMessage : function() {
		Ext.Ajax.request({
			url : __ctxPath + "/info/multiRemoveInMessage.do",
			method : "POST",
			params : {
				ids : this.message.receiveId
			},
			success : function(g, h) {
				this.close();
				$toast("信息删除成功！");
			}.createDelegate(this),
			failure : function(g, h) {
				$toast("信息删除失败！");
			}
		});
	},
	loadafterrender : function() {
		Ext.Ajax.request({
			url : __ctxPath + "/info/readInMessage.do",
			success : function(a, c) {
				var resp = Ext.util.JSON.decode(a.responseText);
				this.message = resp.message;
				if (Ext.isEmpty(this.message)) {
					this.close();
				}
				this.setTitle(this.message.shortMessage.sender + "--发送的消息");
				this.messagePanel.body.update("<p>  " + this.message.shortMessage.sender + "  " + this.message.shortMessage.sendTime + '</p><p style="color:blue;margin: 5px 0px 0px 0px;text-indent: 2em;">' + this.message.shortMessage.content + "</p>");
				if (this.message.haveNext) {
					this.buttons[0].show();
				}
				if (this.message.shortMessage.msgType == 1) {
					this.buttons[1].show();
				}
				var messagePanelView = Ext.getCmp("MessagePanelView");
				if (messagePanelView != null) {
					messagePanelView.getUpdater().update(messagePanelView.url);
				}
				this.messagePanel.doLayout();
			}.createDelegate(this)
		});
	}
});