var SafeClarificationListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var actionItems = null;
		generalItems = [ {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "交底人",
			name : "Q_clarificaMan_S_LK"
		}, {
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			lable : "交底时间",
			name : "Q_clarificaTime_DL_GE"
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_clarificaTime_DG_LE"
		} ];
	actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadSafeClarification
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : SafeClarificationListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "交底项目",
			dataIndex : "projectName"
		}, {
			width : 60,
			header : "交底负责人",
			dataIndex : "clarificaHead"
		}, {
			width : 60,
			header : "交底人",
			dataIndex : "clarificaMan"
		}, {
			header : "所属公司",
			dataIndex : "copeName"
		}, {
			header : "交底时间",
			dataIndex : "clarificaTime"
		} ]
	};
	SafeClarificationListView.superclass.constructor.call(this, Ext.apply({
		id : "SafeClarificationListView",
		title : '安全交底',
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/archive/listSafeClarification.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SafeClarificationListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SafeClarificationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSafeClarification.createDelegate(this)
			});
		}
		if (isGranted("_SafeClarificationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSafeClarification.createDelegate(this)
			});
		}
		if (isGranted("_SafeClarificationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSafeClarification.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的保险！";
		var msg2 = "您确认要【" + op + "】所选保险吗？";
		var msg3 = "成功【" + op + "】所选保险！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	addSafeClarification : function() {
		new SafeClarificationFrom(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editSafeClarification : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new SafeClarificationFrom(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delSafeClarification : function() {
		this.speciallyGridAction(this.dataGridPanel, "clarificaId", __ctxPath + "/archive/multiDelSafeClarification.do", "删除");
	},
//	exportSafeClarification : function() {
//		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractiInsurance.do", this.dataGridPanel);
//	},
//	printsSafeClarification : function(type) {
//		$print(this.dataGridPanel, function(a) {
//			return __ctxPath + "/archive/printPractiInsurance.do?insureId=" + a[0].data["insureId"];
//		}, null, 1000, 600);
//	},
	loadSafeClarification : function(a) {
		new SafeClarificationFrom(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});