var AnnounceListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "公告标题",
			name : "Q_announceTitle_S_LK"
		}, {
			lable : "填写时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAnnounce
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AnnounceListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "publish",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="已发布" src="' + __ctxPath + '/img/flag/round_001.png"/>';
				} else {
					return '<img title="未发布" src="' + __ctxPath + '/img/flag/round_005.png"/>';
				}
			}
		}, {
			width : 80,
			header : "公告标题",
			dataIndex : "announceTitle"
		}, {
			width : 80,
			header : "公告类别",
			dataIndex : "announceType"
		}, {
			width : 80,
			header : "发布人",
			dataIndex : "userName"
		}, {
			width : 80,
			header : "发布部门",
			dataIndex : "department",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.depName;
				}
			}
		}, {
			width : 80,
			header : "填写时间",
			dataIndex : "providedDate"
		} ]
	};
	AnnounceListView.superclass.constructor.call(this, Ext.apply({
		id : "AnnounceListView",
		title : TabTitle.ANNOUNCE_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/form/listAnnounce.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AnnounceListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AnnounceAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAnnounce.createDelegate(this)
			});
		}
		if (isGranted("_AnnounceEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAnnounce.createDelegate(this)
			});
		}
		if (isGranted("_AnnounceMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAnnounce.createDelegate(this)
			});
		}
		if (isGranted("_AnnouncePublish")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "发布",
				handler : this.publishAnnounce.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的公告信息！";
		var msg2 = "您确认要【" + op + "】所选的公告信息吗？";
		var msg3 = "成功【" + op + "】所选的公告信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readAnnounce : function(a) {
		new AnnounceForm(a, null).show();
	},
	addAnnounce : function() {
		new AnnounceForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editAnnounce : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new AnnounceForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delAnnounce : function() {
		this.speciallyGridAction(this.dataGridPanel, "announceId", __ctxPath + "/form/multiDelAnnounce.do", "删除", function(a) {
			if ("0" == a.publish) {
				return true;
			}
			$toast("【删除】的公告信息必须是【未发布】的公告！");
			return false;
		}.createDelegate(this));
	},
	publishAnnounce : function() {
		this.speciallyGridAction(this.dataGridPanel, "announceId", __ctxPath + "/form/multiPublishAnnounce.do", "发布", function(a) {
			if ("0" == a.publish) {
				return true;
			}
			$toast("【发布】的公告信息必须是【未发布】的公告！");
			return false;
		}.createDelegate(this));
	}
});