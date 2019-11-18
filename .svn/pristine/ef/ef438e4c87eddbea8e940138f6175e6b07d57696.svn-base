var SafetyEducationListView = function(a) {
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
			lable : "教育主题",
			name : "Q_safetySerial_S_LK"
		}, {
			lable : "授课人",
			name : "Q_teachMan_S_LK"
		}, {
			lable : "受教育人员",
			name : "Q_educaMan_S_LK"
		}, {
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			lable : "教育时间",
			name : "Q_edcationTime_DL_GE"
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_edcationTime_DG_LE"
		} ];
	actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadSafetyEducation
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : SafetyEducationListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "主题",
			dataIndex : "safetySerial"
		}, {
			width : 60,
			header : "授课人",
			dataIndex : "teachMan"
		}, {
			header : "受教育人员",
			dataIndex : "educaMan"
		}, {
			header : "教育时间",
			dataIndex : "edcationTime"
		} ]
	};
	SafetyEducationListView.superclass.constructor.call(this, Ext.apply({
		id : "SafetyEducationListView",
		title : '安全教育',
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/archive/listSafetyEducation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SafetyEducationListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SafetyEducationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSafetyEducation.createDelegate(this)
			});
		}
		if (isGranted("_SafetyEducationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSafetyEducation.createDelegate(this)
			});
		}
		if (isGranted("_SafetyEducationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSafetyEducation.createDelegate(this)
			});
		}
		if (isGranted("_SafetyEducationMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitSafetyEducation.createDelegate(this)
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
	addSafetyEducation : function() {
		new SafetyEducationFrom(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editSafetyEducation : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new SafetyEducationFrom(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delSafetyEducation : function() {
		this.speciallyGridAction(this.dataGridPanel, "safetyId", __ctxPath + "/archive/multiDelSafetyEducation.do", "删除");
	},
	submitSafetyEducation : function() {
		this.speciallyGridAction(this.dataGridPanel, "safetyId", __ctxPath + "/archive/multiSubmitSafetyEducation.do", "提交");
	},
//	exportSafetyEducation : function() {
//		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractiInsurance.do", this.dataGridPanel);
//	},
//	printsSafetyEducation : function(type) {
//		$print(this.dataGridPanel, function(a) {
//			return __ctxPath + "/archive/printPractiInsurance.do?insureId=" + a[0].data["insureId"];
//		}, null, 1000, 600);
//	},
	loadSafetyEducation : function(a) {
		new SafetyEducationFrom(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});