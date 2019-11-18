var InstallManageListView = function(a) {
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
		}, {
			lable : "进场时间",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startinDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startinDate_DG_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadInstallManage
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
			fields : InstallManageListViewField
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
			header : "进场日期",
			dataIndex : "startinDate"
		}, {
			header : "退场日期",
			dataIndex : "endinDate"
		}, {
			header : "本次附墙数",
			dataIndex : "wallAttacheQty"
		}, {
			header : "臂长",
			dataIndex : "brachium"
		}, {
			header : "安装高度",
			dataIndex : "installHeight"
		} ]
	};
	InstallManageListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallManageListView",
		title : TabTitle.INSTALL_MANAGE_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/equip/listInstallManage.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InstallManageListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	rendererRowActionItems : function(action, record) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallManageMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInstallManage.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的安装信息！";
		var msg2 = "您确认要【" + op + "】所选的安装信息吗？";
		var msg3 = "成功【" + op + "】所选的安装信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadInstallManage : function(a) {
		new InstallManageForm(a).show();
	},
	delInstallManage : function() {
		this.speciallyGridAction(this.dataGridPanel, "installId", __ctxPath + "/equip/multiDelInstallManage.do", "删除");
	}
});