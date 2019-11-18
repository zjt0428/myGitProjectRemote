var PractiCertListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var kindWorkCombo = $initComboBoxField("从业工种", "Q_practiKindwork_S_EQ", "kindWork", {
			width : 75,
			lable : "从业工种",
			allowBlank : true
		});
		var qstateCombo = $initSimpleComboBoxField("状态", "Q_qstate_S_EQ", [ [ "", "全部" ], [ "1", "有效" ], [ "2", "注销" ], [ "4", "过期" ] ], {
			width : 60,
			lable : "状态",
			allowBlank : true
		});
		var specialtyTypeNameCombo = $initComboBoxField("注册类型及等级", "Q_specialtyType_S_EQ","specialtyType", {
			width : 60,
			lable : "注册类型及等级",
			allowBlank : true
		});
		var generalItems = [ qstateCombo, kindWorkCombo,specialtyTypeNameCombo, {
			lable : "资质证书编号",
			name : "Q_certNum_S_LK"
		}, {
			lable : "注册单位",
			name : "Q_registrantOrganization_S_LK"
		}, {
			lable : "人员名称",
			name : "Q_practitioner.practiName_S_LK"
		}, {
			lable : "有效日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_effectDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_effectDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readPractiCert
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : PractiCertListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "qstate",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="有效" src="' + __ctxPath + '/img/flag/round_001.png"/>';
				} else if (n == "2") {
					return '<img title="注销" src="' + __ctxPath + '/img/flag/round_004.png"/>';
				} else if (n == "4") {
					return '<img title="过期" src="' + __ctxPath + '/img/flag/round_002.png"/>';
				} else {
					return '<img title="未知" src="' + __ctxPath + '/img/flag/round_005.png"/>';
				}
			}
		}, {
			header : "证书编号",
			dataIndex : "certNum"
		}, {
			header : "所属人员",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.practiName;
				}
			}
		}, {
			header : "身份证号",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.idCard;
				}
			}
		}, {
			header : "从业工种",
			dataIndex : "practiKindworkName"
		},{
			header : "注册单位",
			dataIndex : "registrantOrganization"
		},
		{
			header : "注册类型及等级",
			dataIndex : "specialtyTypeName"
		}, {
			header : "发证单位",
			dataIndex : "awardDepartName"
		}, {
			header : "有效截止日期",
			dataIndex : "effectDate"
		} ]
	};
	PractiCertListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiCertListView",
		title : TabTitle.PRACTI_CERT_LIST,
		iconCls : "menu-business-practicert",
		url : __ctxPath + "/archive/listPractiCert.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiCertListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiCertAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPractiCert.createDelegate(this)
			});
		}
		if (isGranted("_PractiCertEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPractiCert.createDelegate(this)
			});
		}
		if (isGranted("_PractiCertMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiCert.createDelegate(this)
			});
		}
		if (isGranted("_PractiCertMultiCancel")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancellationPractiCert.createDelegate(this)
			});
		}
		if (isGranted("_PractiCertRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverPractiCert.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_PractiCertExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportPractiCert.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的人员证书！";
		var msg2 = "您确认要【" + op + "】所选的人员证书吗？";
		var msg3 = "成功【" + op + "】所选的人员证书！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readPractiCert : function(a) {
		new PractiCertForm(a).show();
	},
	addPractiCert : function() {
		if (!this.practiId) {
			new PractitionerSelector({
				single : true,
				params : {
					"QVO_permissionFlag_S_LK" : this.params.QVO_permissionFlag_S_LK
				},
				callback : function(d) {
					new PractiCertForm(d[0].data, {
						saveable : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			}).show();
		} else {
			new PractiCertForm({
				practiName : this.practiName,
				practiId : this.practiId
			}, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}
	},
	editPractiCert : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new PractiCertForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractiCert : function() {
		this.speciallyGridAction(this.dataGridPanel, "certId", __ctxPath + "/archive/multiDelPractiCert.do", "删除");
	},
	cancellationPractiCert : function() {
		this.speciallyGridAction(this.dataGridPanel, "certId", __ctxPath + "/archive/multiCancelPractiCert.do", "注销");
	},
	recoverPractiCert : function() {
		this.speciallyGridAction(this.dataGridPanel, "certId", __ctxPath + "/archive/recoverPractiCert.do", "恢复");
	},
	exportPractiCert : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractiCert.do", this.dataGridPanel);
	}
});
