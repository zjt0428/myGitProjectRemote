var PractiResumeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "人员姓名",
			name : "Q_practiName_S_LK"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : [ "resumeId", "projectName", "practiName", "recordId", "practiKindworkName", "startDate", "endDate" ]
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "人员姓名",
			dataIndex : "practiName"
		}, {
			header : "从业工种",
			dataIndex : "practiKindworkName"
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "开始时间",
			dataIndex : "startDate"
		}, {
			header : "结束时间",
			dataIndex : "endDate"
		} ]
	};
	PractiResumeListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiResumeListView",
		title : TabTitle.PRACTI_RESUME_LIST,
		iconCls : "menu-business-resume",
		url : __ctxPath + "/archive/listPractiResume.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiResumeListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiResumeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiResume.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】所选的从业记录！";
		var msg2 = "您确认要【" + op + "】所选的从业记录吗？";
		var msg3 = "成功【" + op + "】所选的从业记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	delPractiResume : function() {
		this.speciallyGridAction(this.dataGridPanel, "resumeId", __ctxPath + "/archive/multiDelPractiResume.do", "删除");
	}
});