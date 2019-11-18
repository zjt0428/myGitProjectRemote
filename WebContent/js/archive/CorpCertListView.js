var CorpCertListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "资质证书编号",
			name : "Q_certNum_S_LK"
		}, {
			lable : "企业名称",
			name : "Q_corpName_S_LK"
		}, {
			lable : "有效日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_endDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_endDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readCorpCert
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : CorpCertListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "isvalid",
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
			header : "企业名称",
			dataIndex : "corpName"
		}, {
			header : "证书编号",
			dataIndex : "certNum"
		}, {
			header : "资质类型",
			dataIndex : "certTypeName"
		}, {
			hidden : true,
			header : "资质等级",
			dataIndex : "titleLevelName"
		}, {
			header : "发证单位",
			dataIndex : "organName"
		}, {
			header : "发证日期",
			dataIndex : "organDate"
		}, {
			header : "有效截止日期",
			dataIndex : "endDate"
		}, {
			hidden : true,
			header : "副本数量",
			dataIndex : "copyCertCount"
		} ]
	};
	CorpCertListView.superclass.constructor.call(this, Ext.apply({
		id : "CorpCertListView",
		title : TabTitle.CORP_CERT_LIST,
		iconCls : "menu-business-corpcert",
		url : __ctxPath + "/archive/listCorpCert.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(CorpCertListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_CorpCertAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addCorpCert.createDelegate(this)
			});
		}
		if (isGranted("_CorpCertEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editCorpCert.createDelegate(this)
			});
		}
		if (isGranted("_CorpCertMultiCancel")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancellationCorpCert.createDelegate(this)
			});
		}
		if (isGranted("_CorpCertRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverCorpCert.createDelegate(this)
			});
		}
		if (isGranted("_CorpCertMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delCorpCert.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的企业资质证书！";
		var msg2 = "您确认要【" + op + "】所选的企业资质证书吗？";
		var msg3 = "成功【" + op + "】所选的企业资质证书！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readCorpCert : function(a) {
		new CorpCertForm(a).show();
	},
	addCorpCert : function() {
		if (!this.corpId) {
			new CorpSelector({
				single : true,
				callback : function(d) {
					new CorpCertForm(d[0].data, {
						saveable : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			}).show();
		} else {
			new CorpCertForm({
				corpName : this.corpName,
				corpCode : this.corpCode,
				corpId : this.corpId
			}, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}
	},
	editCorpCert : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new CorpCertForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delCorpCert : function() {
		this.speciallyGridAction(this.dataGridPanel, "certId", __ctxPath + "/archive/multiDelCorpCert.do", "删除");
	},
	cancellationCorpCert : function() {
		this.speciallyGridAction(this.dataGridPanel, "certId", __ctxPath + "/archive/multiCancelCorpCert.do", "注销");
	},
	recoverCorpCert : function() {
		this.speciallyGridAction(this.dataGridPanel, "certId", __ctxPath + "/archive/recoverCorpCert.do", "恢复");
	}
});
