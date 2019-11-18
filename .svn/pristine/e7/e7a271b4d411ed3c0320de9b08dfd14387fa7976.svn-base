var AnnounceUserListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_userId_L_EQ = curUserInfo.userId;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "公告标题",
			name : "Q_announce.announceTitle_S_LK"
		}, {
			lable : "发布时间",
			editable : false,
			xtype : "datetimefield",
			format : "Y-m-d H:i:s",
			name : "Q_publishTime_D_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datetimefield",
			format : "Y-m-d H:i:s",
			name : "Q_publishTime_D_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadAnnounceUser
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "announceUserId",
			sortDir : "desc",
			id : "announceUserId",
			fields : [ "announceUserId", "userId", "userName", "announceId", "publishTime", "readFlag", "announce" ]
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "readFlag",
			width : 40,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="已阅读" src="' + __ctxPath + '/img/flag/round_001.png"/>';
				} else {
					return '<img title="未阅读" src="' + __ctxPath + '/img/flag/round_005.png"/>';
				}
			}
		}, {
			header : "公告标题",
			dataIndex : "announce",
			renderer : function(n) {
				return n.announceTitle;
			}
		}, {
			header : "公告类别",
			dataIndex : "announce",
			renderer : function(n) {
				return n.announceType;
			}
		}, {
			header : "发布人",
			dataIndex : "announce",
			renderer : function(n) {
				return n.userName;
			}
		}, {
			header : "发布部门",
			dataIndex : "announce",
			renderer : function(n) {
				if (n == null || n.department == null) {
					return "";
				} else {
					return n.department.depName;
				}
			}
		}, {
			header : "发布时间",
			dataIndex : "publishTime"
		} ]
	};
	AnnounceUserListView.superclass.constructor.call(this, Ext.apply({
		id : "AnnounceUserListView",
		title : TabTitle.ANNOUNCE_USER_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/form/listAnnounceUser.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AnnounceUserListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [ {
			iconCls : "btn-head-edit",
			text : "已读",
			handler : this.readAnnounceUser.createDelegate(this)
		}, {
			iconCls : "btn-head-del",
			text : "删除",
			handler : this.delAnnounceUser.createDelegate(this)
		} ];
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的公告信息！";
		var msg2 = "您确认要【" + op + "】所选的公告信息吗？";
		var msg3 = "成功【" + op + "】所选的公告信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadAnnounceUser : function(a) {
		$request({
			url : __ctxPath + "/form/loadAnnounce.do?announceId=" + a.announceId,
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data[0];
				data.readFlag = a.readFlag;
				data.publishTime = a.publishTime;
				data.announceUserId = a.announceUserId;
				new AnnounceUserForm(data, {
					parent : this
				}).show();
			}.createDelegate(this)
		});
	},
	readAnnounceUser : function() {
		this.speciallyGridAction(this.dataGridPanel, "announceUserId", __ctxPath + "/form/multiSetReadAnnounceUser.do", "标识已读", function(a) {
			if ("0" == a.readFlag) {
				return true;
			}
			return false;
		}.createDelegate(this));
	},
	delAnnounceUser : function() {
		this.speciallyGridAction(this.dataGridPanel, "announceUserId", __ctxPath + "/form/multiDelAnnounceUser.do", "删除", function(a) {
			if ("1" == a.readFlag) {
				return true;
			}
			$toast("【删除】的公告信息必须是【已阅读】的公告！");
			return false;
		}.createDelegate(this));
	}
});