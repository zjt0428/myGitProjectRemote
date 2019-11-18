var MessageSendListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_[shortMessage.senderId]_L_EQ"] = curUserInfo.userId;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "收信人",
			name : "Q_[userFullname]_S_LK"
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
			fields : [ "receiveId", "userId", "userFullname", "readFlag", "shortMessage" ]
		},
		rowAction : {
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
			header : "收信人",
			dataIndex : "userFullname",
			width : 60
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
	MessageSendListView.superclass.constructor.call(this, Ext.apply({
		id : "MessageSendListView",
		title : "发送信息管理",
		iconCls : "btn-personal-mail_send",
		url : __ctxPath + "/info/listInMessage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MessageSendListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-personal-msg-send",
			text : "重发",
			hidden : true,
			handler : this.reSendMessage
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.shortMessage.msgType) {
			case 1:
				action[0].hidden = false;
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [ {
			iconCls : "btn-personal-mail_attach",
			text : "发送消息",
			handler : this.sendMessage.createDelegate(this)
		} ];
		return tbarItems;
	},
	reSendMessage : function(a) {
		Ext.Ajax.request({
			url : __ctxPath + "/info/sendShortMessage.do",
			params : {
				userId : a.userId,
				content : a.shortMessage.content
			},
			success : function() {
				$toast("重发成功！");
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	sendMessage : function() {
		new MessageFormWindows({
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
});