var SystemLogListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = [ {
		lable : "用户名",
		name : "Q_username_S_LK"
	}, {
		lable : "执行时间",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_createTime_D_GT"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_createTime_D_LT"
	}, {
		lable : "执行操作",
		name : "Q_description_S_LK"
	} ];
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readSystemLog
	} ];
	var tbarItems = this.initTopBarActionItems();
	var datagrid_config = {
		store : {
			sortField : "logId",
			sortDir : "desc",
			id : "logId",
			fields : [ "logId", "username", "userId", "createTime", "description", "userIp", "operatPath", "remark" ]
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "用户名",
			dataIndex : "username",
			width : 100
		}, {
			header : "请求时间",
			dataIndex : "createTime",
			renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			width : 100
		}, {
			header : "执行操作",
			dataIndex : "description",
			width : 100
		}, {
			header : "请求地址",
			dataIndex : "userIp",
			width : 100
		}, {
			header : "执行方法",
			dataIndex : "operatPath",
			width : 250
		} ]
	};
	SystemLogListView.superclass.constructor.call(this, Ext.apply({
		id : "SystemLogListView",
		title : "系统日志管理",
		iconCls : "menu-system-log",
		url : __ctxPath + "/system/listSystemLog.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SystemLogListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push({
			iconCls : "btn-head-del",
			text : "删除系统日志",
			handler : this.delSystemLog.createDelegate(this)
		});
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的日志信息!";
		var msg2 = "您确认要【" + op + "】该日志信息吗?";
		var msg3 = "成功【" + op + "】该日志信息!";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readSystemLog : function(a) {
		new SystemLogDetailWin({
			data : a
		}).show();
	},
	delSystemLog : function() {
		this.speciallyGridAction(this.dataGridPanel, "logId", __ctxPath + "/system/multiDelSystemLog.do", "删除");
	}
});
var SystemLogDetailWin = function(a) {
	Ext.apply(this, a);
	this.detailFrom = new Ext.FormPanel({
		closable : true,
		autoScroll : true,
		bodyStyle : "padding:5px 5px 0",
		frame : true,
		defaultType : "textfield",
		defaults : {
			width : 150,
			border : false
		},
		items : [ {
			fieldLabel : "日志ID*",
			name : "logId"
		}, {
			fieldLabel : "用户ID*",
			name : "userId"
		}, {
			fieldLabel : "用户名*",
			name : "username"
		}, {
			fieldLabel : "请求时间*",
			name : "createTime"
		}, {
			fieldLabel : "执行操作",
			name : "description"
		}, {
			fieldLabel : "请求地址",
			name : "operatPath",
			width : 250
		}, {
			xtype : "textarea",
			anchor : "95%",
			fieldLabel : "提交内容",
			name : "remark"
		} ]
	});
	a.data.createTime = Ext.util.Format.date(this.data.createTime, 'Y-m-d H:i:s')
	this.detailFrom.getForm().loadRecord(a);
	SystemLogDetailWin.superclass.constructor.call(this, {
		id : "SystemLogDetailWin",
		title : "日志明细",
		iconCls : "menu-info",
		width : 500,
		height : 300,
		border : false,
		layout : "fit",
		items : [ this.detailFrom ],
		modal : true
	});
};
Ext.extend(SystemLogDetailWin, Ext.Window, {});
