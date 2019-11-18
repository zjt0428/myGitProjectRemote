var InspectManageListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadInspectManage
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
			fields : InspectManageListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "巡检时间",
			dataIndex : "inspectDate"
		}, {
			header : "巡检人员",
			dataIndex : "inspectPepoles"
		}, {
			header : "巡检结果",
			dataIndex : "inspectResultName"
		}, {
			width : 250,
			header : "巡检内容",
			dataIndex : "remark"
		} ]
	};
	InspectManageListView.superclass.constructor.call(this, Ext.apply({
		id : "InspectManageListView",
		title : TabTitle.INSPECT_MANAGE_LIST,
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/equip/listInspectManage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InspectManageListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	rendererRowActionItems : function(action, record) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InspectManageMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInspectManage.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的安全巡检！";
		var msg2 = "您确认要【" + op + "】所选的安全巡检吗？";
		var msg3 = "成功【" + op + "】所选的安全巡检！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadInspectManage : function(a) {
		new InspectManageForm(a).show();
	},
	delInspectManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "inspectId", __ctxPath + "/equip/multiDelInspectManage.do", "删除");
	}
});