var CorpSelector = function(a) {
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
			header : "责任人",
			dataIndex : "dutyman"
		}, {
			width : 160,
			header : "责任人联系方式",
			dataIndex : "dutymanTel1"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选企业",
			single : this.single,
			collect : true,
			fields : CorpInfoListViewField,
			columns : [ {
				header : "企业名称",
				dataIndex : "corpName"
			}, {
				header : "所属部门",
				dataIndex : "department",
				renderer : function(n) {
					if (n == null) {
						return "";
					} else {
						return n.depName;
					}
				}
			}]
		};
	}

	var searchActionItems = [];
	if (isGranted("_CorpInfoAdd")) {
		searchActionItems.push({
			xtype : "button",
			iconCls : "menu-business-corp",
			text : "新增企业",
			handler : this.fireBusinessEvent.createDelegate(this, [ "CorpListView", ListViewButtonsId.corpInfoAdd ])
		});
	}
	CorpSelector.superclass.constructor.call(this, {
		configView : {
			title : "企业选择"
		},
		source : {
			url : __ctxPath + "/archive/listCorpInfo.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems,
				searchActionItems : searchActionItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config,
			dbclickConfirm : true
		},
		target : target
	});
};

Ext.extend(CorpSelector, Knight.ux.RelationSelector, {});