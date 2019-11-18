var BasicPreEmbeddingNoticeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_project.projectName_S_LK"
		}, {
			lable : "业务员",
			name : "Q_practitioner.practiName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadBasicPreEmbeddingNotice
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : BasicPreEmbeddingNoticeListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.projectName;
				}
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.address;
				}
			}
		}, {
			header : "项目联系方式",
			dataIndex : "projectTel"
		}, {
			header : "项目要求进场时间",
			dataIndex : "startDate"
		}, {
			header : "项目要求安装时间",
			dataIndex : "installDate"
		} ]
	};
	BasicPreEmbeddingNoticeListView.superclass.constructor.call(this, Ext.apply({
		id : "BasicPreEmbeddingNoticeListView",
		title : TabTitle.BASIC_PRE_EMBEDDING_NOTICE_LIST,
		iconCls : "menu-business-practi",
		url : __ctxPath + "/archive/listBasicPreEmbeddingNotice.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
//			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(BasicPreEmbeddingNoticeListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BasicPreEmbeddingNoticeAdd")) {
			tbarItems.push({
//				id : ListViewButtonsId.enterFactoryNoticeAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addBasicPreEmbeddingNotice.createDelegate(this)
			});
		}
		if (isGranted("_BasicPreEmbeddingNoticeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editBasicPreEmbeddingNotice.createDelegate(this)
			});
		}
		if (isGranted("_BasicPreEmbeddingNoticeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delBasicPreEmbeddingNotice.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的从业人员！";
		var msg2 = "您确认要【" + op + "】所选的从业人员吗？";
		var msg3 = "成功【" + op + "】所选的从业人员！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	addBasicPreEmbeddingNotice : function() {
		new BasicPreEmbeddingNoticeForm({}, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		 }).show();
	},
	loadBasicPreEmbeddingNotice : function(a) {
		new BasicPreEmbeddingNoticeForm(a).show();
	},
	editBasicPreEmbeddingNotice : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new BasicPreEmbeddingNoticeForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delBasicPreEmbeddingNotice : function() {
		this.speciallyGridAction(this.dataGridPanel, "preEmbeddingNoticeId", __ctxPath + "/archive/multiDelBasicPreEmbeddingNotice.do", "删除");
	}
});