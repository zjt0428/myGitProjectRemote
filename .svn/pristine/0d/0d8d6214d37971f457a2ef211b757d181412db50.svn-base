var MessageReceiveListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_delFlag_SN_EQ"] = 0;
	this.params["Q_userId_L_EQ"] = curUserInfo.userId;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			width : 75,
			xtype : "combo",
			lable : "类型",
			hiddenName : "Q_[shortMessage.msgType]_SN_EQ",
			name : "Q_[shortMessage.msgType]_SN_EQ",
			mode : "local",
			editable : true,
			triggerAction : "all",
			store : [ [ "1", "个人信息" ], [ "2", "日程安排" ], [ "3", "计划任务" ], [ "4", "代办任务" ], [ "5", "系统消息" ], [ "0", "系统消息" ] ]
		}, {
			lable : "发送人",
			name : "Q_[shortMessage.sender]_S_LK"
		}, {
			lable : "发送时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_[shortMessage.sendTime]_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_[shortMessage.sendTime]_DG_LE"
		} ];
	}
	var actionItems = [];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "receiveId",
			sortDir : "desc",
			id : "receiveId",
			fields : [ "receiveId", "readFlag", "shortMessage" ]
		},
		rowAction : {
			width : 50,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "readFlag",
			width : 30,
			renderer : function(c) {
				return c == "1" ? "<img src='" + __ctxPath + "/img/flag/email_open.png'/>" : "<img src='" + __ctxPath + "/img/flag/email.png'/>";
			}
		}, {
			header : "类别",
			dataIndex : "shortMessage",
			width : 60,
			renderer : function(c) {
				return "<p style='color:green;'>" + c.msgTypeName + "</p>";
			}
		}, {
			header : "发送人",
			dataIndex : "shortMessage",
			width : 60,
			renderer : function(c) {
				return c.sender;
			}
		}, {
			header : "内容",
			dataIndex : "shortMessage",
			width : 300,
			renderer : function(value, meta, record) {
				meta.attr = 'style="white-space:normal;"';
				return value.content;
			}
		}, {
			header : "发送时间",
			dataIndex : "shortMessage",
			width : 90,
			renderer : function(c) {
				return c.sendTime;
			}
		} ]
	};
	MessageReceiveListView.superclass.constructor.call(this, Ext.apply({
		id : "MessageReceiveListView",
		title : "接收信息管理",
		iconCls : "btn-personal-mail_receive",
		url : __ctxPath + "/info/listInMessage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MessageReceiveListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-grid-del",
			text : "删除",
			handler : this.removeReceiveMessage
		});
		actionItems.push({
			iconCls : "btn-personal-msgs",
			text : "回复",
			hidden : true,
			handler : this.replyReceiveMessage
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.shortMessage.msgType) {
			case 1:
				action[1].hidden = false;
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [ {
			iconCls : "btn-personal-mail_attach",
			text : "发送消息",
			handler : this.sendMessage.createDelegate(this)
		}, {
			iconCls : "ux-flag-blue",
			text : "标记为已读",
			handler : this.setReadFlag.createDelegate(this)
		}, {
			iconCls : "btn-del",
			text : "删除信息",
			handler : this.delInMessage.createDelegate(this)
		} ];
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的接收信息！";
		var msg2 = "您确认要【" + op + "】所选的接收信息吗？";
		var msg3 = "成功【" + op + "】所选的接收信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	removeReceiveMessage : function(a) {
		Ext.Msg.confirm("删除操作", "你确定要删除该信息吗?", function(c) {
			if (c == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/info/multiRemoveInMessage.do",
					params : {
						ids : a.receiveId
					},
					method : "post",
					success : function() {
						$toast("删除信息成功！");
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	},
	replyReceiveMessage : function(a) {
		Ext.Ajax.request({
			url : __ctxPath + "/info/multiReadInMessage.do",
			params : {
				ids : a.receiveId
			},
			success : function(b, c) {
				var replyMessage = new MessageFormWindows();
				replyMessage.messageFormPanel.getForm().findField("userId").setValue(a.shortMessage.senderId);
				replyMessage.messageFormPanel.getForm().findField("userFullname").setValue(a.shortMessage.sender);
				replyMessage.show();
			}.createDelegate(this)
		});
	},
	sendMessage : function() {
		new MessageFormWindows().show();
	},
	setReadFlag : function() {
		this.speciallyGridAction(this.dataGridPanel, "receiveId", __ctxPath + "/info/multiReadInMessage.do", "标记");
	},
	delInMessage : function() {
		this.speciallyGridAction(this.dataGridPanel, "receiveId", __ctxPath + "/info/multiRemoveInMessage.do", "删除");
	}
});