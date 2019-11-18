var PractiCreditListView = function(a) {
	Ext.apply(this, a);
	this.params = this.params ? this.params : {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "人员名称",
			name : "Q_practiName_S_LK"
		}, {
			lable : "评定日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_appraiseDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_appraiseDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readPractiCredit
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : [ "creditId", "practiName", "practiKindworkName", "creditTypeName", "reason", "appraiseOrg", "appraiseDate" ]
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "人员姓名",
			dataIndex : "practiName"
		}, {
			header : "类型",
			dataIndex : "creditTypeName"
		}, {
			header : "从业工种",
			dataIndex : "practiKindworkName"
		}, {
			width : 240,
			header : "事由",
			dataIndex : "reason"
		}, {
			header : "审核部门",
			dataIndex : "appraiseOrg"
		}, {
			header : "评定日期",
			dataIndex : "appraiseDate"
		} ]
	};
	PractiCreditListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiCreditListView",
		title : TabTitle.PRACTI_CREDIT_LIST,
		iconCls : "menu-business-credit",
		url : __ctxPath + "/archive/listPractiCredit.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiCreditListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiCreditAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPractiCredit.createDelegate(this)
			});
		}
		if (isGranted("_PractiCreditEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPractiCredit.createDelegate(this)
			});
		}
		if (isGranted("_PractiCreditMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiCredit.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】所选的信用记录！";
		var msg2 = "您确认要【" + op + "】所选的信用记录吗？";
		var msg3 = "成功【" + op + "】所选的信用记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readPractiCredit : function(a) {
		new PractiCreditForm(a).show();
	},
	addPractiCredit : function() {
		if (Ext.isEmpty(this.practiId)) {
			new PractitionerSelector({
				single : true,
				params : {
					"QVO_permissionFlag_S_LK" : this.params.QVO_permissionFlag_S_LK
				},
				callback : function(d) {
					new PractiCreditForm(d[0].data, {
						saveable : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			}).show();
		}
	},
	editPractiCredit : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new PractiCreditForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractiCredit : function() {
		this.speciallyGridAction(this.dataGridPanel, "creditId", __ctxPath + "/archive/multiDelPractiCredit.do", "删除");
	}
});