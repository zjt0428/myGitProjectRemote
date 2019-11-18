var AppDispatchListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
		
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var disTypeCombo = $initComboBoxField("调度类型", "Q_disType_S_EQ", "DISPATCH_TYPE");
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [disTypeCombo,{
			lable : "项目名称",
			name : "Q_projName_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readDispatch
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AppDispatchListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "调度单号",
			dataIndex : "dispatchSerial"
		},{
			header : "调度日期",
			dataIndex : "disDate"
		}, {
			header : "调度类型",
			dataIndex : "disTypeName"
		}, {
			header : "调入地",
			dataIndex : "receiveWarehouseName"
		}, {
			header : "调出地",
			dataIndex : "sendWarehouseName"
		},{
			header : "调度人员",
			dataIndex : "dispatcher"
		}, {
			header : "备注说明",
			dataIndex : "remark"
		}]
	};
	AppDispatchListView.superclass.constructor.call(this, Ext.apply({
		id : "AppDispatchListView",
		title : TabTitle.DISPATCH_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/app/listDispatch.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AppDispatchListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AppDispatchDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delDispatch.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的工作备忘！";
		var msg2 = "您确认要【" + op + "】所选的工作备忘吗？";
		var msg3 = "成功【" + op + "】所选的工作备忘！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readDispatch : function(a) {
		new AppDispatchForm(a,{
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delDispatch : function(a){
		this.speciallyGridAction(this.dataGridPanel, "disid", __ctxPath + "/app/multiDelDispatch.do", "删除");
	}
});