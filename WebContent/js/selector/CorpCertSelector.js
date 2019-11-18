var CorpCertSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_isvalid_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "资质证书编号",
		name : "Q_certNum_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : CorpCertListViewField
		},
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
			header : "发证单位",
			dataIndex : "organName"
		}, {
			header : "有效截止日期",
			dataIndex : "endDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : CorpCertListViewField,
			columns : [ {
				header : "证书编号",
				dataIndex : "certNum"
			}, {
				header : "资质类型",
				dataIndex : "certTypeName"
			}, {
				header : "发证单位",
				dataIndex : "organName"
			}, {
				header : "有效截止日期",
				dataIndex : "endDate"
			} ]
		};
	}
	CorpCertSelector.superclass.constructor.call(this, {
		configView : {
			title : "企业资质"
		},
		source : {
			url : __ctxPath + "/archive/listCorpCert.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(CorpCertSelector, Knight.ux.RelationSelector, {});