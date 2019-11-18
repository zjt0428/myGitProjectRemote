var MemoListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	if (!Ext.isEmpty(curUserInfo.practitioner)) {
		this.params["QUERY_FILTER"] = "allPractiRelate";
		this.params["QFVO_[vo.userId|vo.practiId|md.practiId]_L_EQ"] = curUserInfo.userId + "," + curUserInfo.practitioner.practiId + "," + curUserInfo.practitioner.practiId;
	} else {
		this.params["Q_userId_L_EQ"] = curUserInfo.userId;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "事件编号",
			name : "Q_memoSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_exwSerial_S_LK"
		}, {
			lable : "事件主题",
			name : "Q_memoTheme_S_LK"
		}, {
			lable : "经办人",
			name : "Q_practiName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readMemo
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : MemoListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 40,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>未归档</font>" : "已归档";
			}
		}, {
			header : "事件编号",
			dataIndex : "memoSerial"
		}, {
			header : "主题",
			dataIndex : "memoTheme"
		}, {
			header : "经办人",
			dataIndex : "practiName"
		}, {
			header : "事件类型",
			dataIndex : "incidentTypeName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "客户名称",
			dataIndex : "customName"
		}, {
			header : "状态",
			dataIndex : "processStatus",
			width : 40,
			renderer : function(n) {
				return n == "1" ? "已完成" : "<font color='red'>未完成</font>";
			}
		} ]
	};
	MemoListView.superclass.constructor.call(this, Ext.apply({
		id : "MemoListView",
		title : TabTitle.MEMO_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/form/listMemo.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MemoListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push({
			iconCls : "btn-head-add",
			text : "新增",
			handler : this.addMemo.createDelegate(this)
		});
		tbarItems.push({
			iconCls : "btn-head-edit",
			text : "修改",
			handler : this.editMemo.createDelegate(this)
		});
		tbarItems.push({
			iconCls : "btn-head-del",
			text : "删除",
			handler : this.delMemo.createDelegate(this)
		});
		tbarItems.push({
			iconCls : "btn-head-recover",
			text : "归档",
			handler : this.filingMemo.createDelegate(this)
		});
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的工作备忘！";
		var msg2 = "您确认要【" + op + "】所选的工作备忘吗？";
		var msg3 = "成功【" + op + "】所选的工作备忘！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readMemo : function(a) {
		new MemoForm(a).show();
	},
	addMemo : function() {
		new MemoForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editMemo : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.status) {
				$toast("【修改】的工作备忘必须是【未归档】状态！");
				return false;
			}
			return true;
		}, function(a) {
			new MemoForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delMemo : function() {
		this.speciallyGridAction(this.dataGridPanel, "memoId", __ctxPath + "/form/multiDelMemo.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的工作备忘必须是【未发布】的公告！");
			return false;
		}.createDelegate(this));
	},
	filingMemo : function() {
		this.speciallyGridAction(this.dataGridPanel, "memoId", __ctxPath + "/form/filingMemo.do", "归档", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【发布】的工作备忘必须是【未归档】状态！");
			return false;
		}.createDelegate(this));
	}
});