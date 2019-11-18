var DismantleManageListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadDismantleManage
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : DismantleManageListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "进场时间",
			dataIndex : "startdisDate"
		}, {
			header : "结束时间",
			dataIndex : "enddisDate"
		}, {
			header : "拆卸高度",
			dataIndex : "dismantleHeight"
		} ]
	};
	DismantleManageListView.superclass.constructor.call(this, Ext.apply({
		id : "DismantleManageListView",
		title : TabTitle.DISMANTLE_MANAGE_LIST,
		iconCls : "menu-business-dismantle",
		url : __ctxPath + "/equip/listDismantleManage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(DismantleManageListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	rendererRowActionItems : function(action, record) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DismantleManageMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delDismantleManage.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的拆卸告知！";
		var msg2 = "您确认要【" + op + "】所选的拆卸告知吗？";
		var msg3 = "成功【" + op + "】所选的拆卸告知！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadDismantleManage : function(a) {
		new DismantleManageForm(a).show();
	},
	delDismantleManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "dismantleId", __ctxPath + "/equip/multiDelDismantleManage.do", "删除");
	}
});