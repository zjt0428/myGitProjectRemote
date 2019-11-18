var CorpAccountSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_corpStatus_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "企业名称",
		name : "Q_corpName_S_LK"
	}, {
		lable : "成立时间",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_corpBirthDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_birthDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "corpId",
			sortDir : "asc",
			id : "corpId",
			fields : CorpInfoListViewField
		},
		columns : [ {
			header : "状态",
			dataIndex : "corpStatus",
			width : 40,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			width : 100,
			header : "企业名称",
			dataIndex : "corpName"
		}, {
			width : 100,
			header : "所属部门",
			dataIndex : "department",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.depName;
				}
			}
		}, {
			width : 80,
			header : "成立日期",
			dataIndex : "birthDate"
		}, {
			width : 160,
			header : "企业类型",
			dataIndex : "corpTypeName"
		} ],
	};
	// =============================================this.favoritesPanel=======================================================//
	if (this.collectEnable) {
	var target = {
		title : "企业帐户",
		single : this.single,
		url : __ctxPath + "/archive/listAccountCorpInfo.do",
		parent : "corp",
		fields : [ "corpAccountId", "corpId", "bankDeposit", "account", "balance", "address" ],
		columns : [ {
			width : 100,
			header : "开户行",
			dataIndex : "bankDeposit"
		}, {
			width : 100,
			header : "账号",
			dataIndex : "account"
		}, {
			width : 100,
			header : "帐户余额",
			dataIndex : "balance"
		} ]
	};
	}
	CorpAccountSelector.superclass.constructor.call(this, {
		configView : {
			title : "企业帐户信息选择"
		},
		source : {
			url : __ctxPath + "/archive/listCorpInfo.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : false,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(CorpAccountSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		this.targetPanel.getStore().reload({
			params : {
				"Q_corpId_L_EQ" : data.corpId
			}
		});
	}
});