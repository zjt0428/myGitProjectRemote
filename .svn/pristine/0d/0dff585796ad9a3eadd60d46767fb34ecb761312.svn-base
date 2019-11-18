var MessageDetailWindows = function(receiveId) {
	this.receiveId = receiveId;
	this.currentMessage = null;
	this.params = {};
	this.params.limit = 1;
	this.params.sort = "receiveId";
	this.params.dir = "desc";
	this.params["Q_delFlag_SN_EQ"] = 0;
	this.params["Q_userId_L_EQ"] = curUserInfo.userId;

	this.messagePanel = new Ext.Panel({
		border : false,
		html : ""
	});
	var buttonItems = [ {
		hidden : true,
		text : "上一条",
		iconCls : "btn-previous",
		handler : this.preMessage.createDelegate(this)
	}, {
		hidden : true,
		text : "下一条",
		iconCls : "btn-next",
		handler : this.nextMessage.createDelegate(this)
	}, {
		hidden : true,
		text : "回复",
		iconCls : "btn-personal-msgs",
		handler : this.replyMessage.createDelegate(this)
	}, {
		text : "关闭",
		iconCls : "btn-del",
		handler : this.closeMessageWindows.createDelegate(this)
	} ];
	MessageDetailWindows.superclass.constructor.call(this, {
		title : "个人短信详情",
		iconCls : "menu-personal-mail_box",
		height : 200,
		width : 380,
		modal : true,
		layout : "fit",
		buttonAlign : "center",
		items : [ this.messagePanel ],
		buttons : buttonItems,
		listeners : {
			afterrender : this.loadafterrender.createDelegate(this, [ {
				"Q_receiveId_L_EQ" : this.receiveId
			}, "未加载到消息!" ])
		}
	});
};
Ext.extend(MessageDetailWindows, Ext.Window, {
	preMessage : function() {
		this.loadafterrender({
			Q_receiveId_L_LT : this.currentMessage.receiveId
		}, "这里已经是第一条了.")
	},
	nextMessage : function() {
		this.loadafterrender({
			Q_receiveId_L_GT : this.currentMessage.receiveId,
			sort : "receiveId",
			dir : "asc"
		}, "这里已经是最后一条了.")
	},
	replyMessage : function() {
		this.close();
		new MessageReplyWindows({
			receiveUserId : this.currentMessage.shortMessage.senderId,
			receiveUserName : this.currentMessage.shortMessage.sender
		}, {}).show();
	},
	closeMessageWindows : function() {
		this.close();
	},
	loadafterrender : function(cp, emptyTest) {
		var params = {};
		Ext.apply(params, this.params);
		Ext.apply(params, cp);
		Ext.Ajax.request({
			url : __ctxPath + "/info/listInMessage.do",
			params : params,
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				if (resp.totalCounts == 0) {
					Ext.MessageBox.alert("操作信息", emptyTest);
					return;
				}
				var message = resp.result[0];
				this.currentMessage = message;
				var html = '<table width="98%" cellpadding="0" cellspacing="1">' +
								'<tr>' +
									'<td style="padding-bottom:10px;">[' + message.receiveId + ']来自：<font color="green">' + message.shortMessage.sender + '</font>&nbsp;&nbsp;<font color="red">' + message.shortMessage.sendTime + '</font>&nbsp;&nbsp;<font color="green">' + message.shortMessage.msgTypeName + '</font></td>' +
								'</tr>' +
								'<tr>' +
									'<td style="font:13px 宋体;color: black;line-height:24px;">&nbsp;&nbsp;&nbsp;&nbsp;' + message.shortMessage.content + '</td>' +
								'</tr>' +
							'</table>';
				this.messagePanel.body.update(html);
				this.buttons[0].show();
				this.buttons[1].show();
				if (message.shortMessage.msgType == 1) {
					this.buttons[2].show();
				}
				if (message.readFlag == 0) {
					Ext.Ajax.request({
						url : __ctxPath + "/info/multiReadInMessage.do",
						params : {
							ids : message.receiveId
						},
						success : function(b, c) {
							var messagePanel = Ext.getCmp('MessagePanelView');
							if (messagePanel != null) {
								messagePanel.getUpdater().update(messagePanel.url);
							}
						}
					});
				}
			}.createDelegate(this),
			failure : function(g, h) {
				$toast("信息加载失败！");
			}
		});
	}
});