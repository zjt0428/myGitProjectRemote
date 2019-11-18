var CorpListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "企业名称",
			name : "Q_corpName_S_LK"
		}, {
			lable : "成立时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_birthDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_birthDate_S_LE"
		} ];
		var advancedItems = [ {
			fieldType : "ADDRESS_FIELD"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_corpName_S_LK",
			fieldLabel : "企业名称"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_legalMan_S_LK",
			fieldLabel : "企业法人"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_dutyman_S_LK",
			fieldLabel : "责任人"
		}, {
			fieldType : "CODE_TREE_FIELD",
			name : "Q_economic_L_EQ",
			fieldLabel : "工商登记类型",
			url : __ctxPath + "/system/treeCode.do?codeId=econType"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "成立时间",
			leftFieldLabel : "Q_birthDate_S_GE",
			rightFieldLabel : "Q_birthDate_S_LE"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_license_S_LK",
			fieldLabel : "营业执照"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readCorp
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : CorpInfoListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "corpStatus",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			header : CorpListViewHeader.corpName,
			dataIndex : "corpName"
		}, {
			header : CorpListViewHeader.department,
			dataIndex : "department",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.depName;
				}
			}
		}, {
			hidden : true,
			width : 120,
			header : "企业类型",
			dataIndex : "corpTypeName"
		}, {
			hidden : true,
			header : "工商营业执照",
			dataIndex : "license"
		}, {
			hidden : true,
			header : "成立日期",
			dataIndex : "birthDate"
		}, {
			header : CorpListViewHeader.legalMan,
			dataIndex : "legalMan"
		}, {
			header : CorpListViewHeader.dutyman,
			dataIndex : "dutyman"
		}, {
			header : "责任人联系方式一",
			dataIndex : "dutymanTel1"
		} ]
	};
	CorpListView.superclass.constructor.call(this, Ext.apply({
		id : "CorpListView",
		title : TabTitle.CORP_LIST,
		iconCls : "menu-business-corp",
		url : __ctxPath + "/archive/listCorpInfo.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_view : {
			autoExpandColumn : "corpTypeName",
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(CorpListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		if (isGranted("_CorpInfoCertAdd")) {
			actionItems.push({
				iconCls : "menu-business-corpcert",
				qtip : "企业资质",
				handler : this.addCorpCert
			});
		}
		if (isGranted("_CorpInfoPractiAdd")) {
			actionItems.push({
				iconCls : "btn-user-add",
				qtip : "从业人员",
				handler : this.addPracti
			});
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_CorpInfoAdd")) {
			tbarItems.push({
				id : ListViewButtonsId.corpInfoAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addCorp.createDelegate(this)
			});
		}
		if (isGranted("_CorpInfoEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editCorp.createDelegate(this)
			});
		}
		if (isGranted("_CorpInfoMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delCorp.createDelegate(this)
			});
		}
		if (isGranted("_CorpInfoMultiCancel")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancelCorp.createDelegate(this)
			});
		}
		if (isGranted("_CorpInfoRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverCorp.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_CorpInfoExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportCorp.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的企业！";
		var msg2 = "您确认要【" + op + "】所选的企业信息吗？";
		var msg3 = "成功【" + op + "】所选的企业信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readCorp : function(a) {
		var f = Ext.getCmp("centerTabPanel");
		var g = Ext.getCmp("CorpInfoView");
		if (g != null) {
			f.remove(g);
		}
		g = new CorpInfoView(a);
		f.add(g);
		f.activate(g);
	},
	addCorpCert : function(a) {
		new CorpCertForm(a, {
			saveable : true,
			callback : function() {
				var corpCertListView = Ext.getCmp("CorpCertListView");
				if (corpCertListView) {
					corpCertListView.dataGridPanel.getStore().reload();
				}
			}.createDelegate(this)
		}).show();
	},
	addPracti : function(a) {
		new PractitionerForm(a, {
			saveable : true
		}).show();
	},
	addCorp : function() {
		new CorpInfoForm(null, {
			animateTarget : this.el,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editCorp : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new CorpInfoForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delCorp : function() {
		this.speciallyGridAction(this.dataGridPanel, "corpId", __ctxPath + "/archive/multiDelCorpInfo.do", "删除");
	},
	cancelCorp : function() {
		this.speciallyGridAction(this.dataGridPanel, "corpId", __ctxPath + "/archive/multiCancelCorpInfo.do", "注销");
	},
	recoverCorp : function() {
		this.speciallyGridAction(this.dataGridPanel, "corpId", __ctxPath + "/archive/recoverCorpInfo.do", "恢复");
	},
	exportCorp : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportCorpInfo.do", this.dataGridPanel);
	}
});