var BusinessMessageListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// ===================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			width : 75,
			xtype : "combo",
			lable : "状态",
			hiddenName : "Q_sendFlag_S_EQ",
			name : "Q_sendFlag_S_EQ",
			mode : "local",
			editable : true,
			triggerAction : "all",
			store : [ [ "0", "未发送" ], [ "1", "发送成功" ], [ "2", "发送失败" ] ]
		}, {
			lable : "消息内容",
			name : "Q_message_S_LK"
		}, {
			lable : "接收号码",
			name : "Q_receiveTel_S_LK"
		}, {
			lable : "接收人",
			name : "Q_receiveName_S_LK"
		}, {
			lable : "生成时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_createTime_D_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_createTime_D_LE"
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
			sortField : "messageId",
			sortDir : "desc",
			id : "messageId",
			fields : [ "messageId", "message", "receiveTel", "receiveName", "senderId", "senderName", "sendFlag", "sendTime", "createTime", "replyCodeName" ]
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "接收人",
			dataIndex : "receiveName"
		}, {
			width : 60,
			header : "接收号码",
			dataIndex : "receiveTel"
		}, {
			width : 50,
			header : "发送人",
			dataIndex : "senderName"
		}, {
			width : 80,
			header : "发送时间",
			dataIndex : "sendTime"
		}, {
			width : 240,
			header : "消息内容",
			dataIndex : "message",
			renderer : function(value, meta, record) {
				meta.attr = 'style="white-space:normal;"';
				return value;
			}
		}, {
			width : 80,
			header : "生成时间",
			dataIndex : "createTime"
		}, {
			width : 60,
			header : "发送状态",
			dataIndex : "sendFlag",
			renderer : function(value, metadata, record) {
				if (value == "1") {
					return "发送成功";
				} else if (value == "2") {
					return "发送失败";
				} else {
					return "未发送";
				}
			}
		}, {
			width : 80,
			header : "发送结果",
			dataIndex : "replyCodeName"
		} ]
	};
	BusinessMessageListView.superclass.constructor.call(this, Ext.apply({
		id : "BusinessMessageListView",
		title : TabTitle.BUSINESS_MESSAGE_LIST,
		iconCls : "menu-archive-draft-manage",
		url : __ctxPath + "/form/listBusinessMessage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(BusinessMessageListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		if (isGranted("_BusinessMessageResend")) {
			actionItems.push({
				iconCls : "btn-business-resend",
				qtip : "重发",
				handler : this.resendBusinessMessage
			});
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BusinessMessageQueueResend")) {
			tbarItems.push({
				iconCls : "btn-business-resendqueue",
				text : "批量重发",
				handler : this.resendQueueBusinessMessage.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的系统信息！";
		var msg2 = "您确认要【" + op + "】所选的系统信息吗？";
		var msg3 = "成功【" + op + "】所选的系统信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	resendQueueBusinessMessage : function() {
		this.speciallyGridAction(this.dataGridPanel, "messageId", __ctxPath + "/form/resendQueueBusinessMessage.do", "批量发送");
	},
	resendBusinessMessage : function(a) {
		$request({
			url : __ctxPath + "/form/resendBusinessMessage.do?messageId=" + a.messageId,
			success : function(g, h) {
				$toast("消息发送成功");
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	}
});