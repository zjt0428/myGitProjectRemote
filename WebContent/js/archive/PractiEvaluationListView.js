var PractiEvaluationListView = function(a) {
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
			lable : "评价人员",
			name : "Q_evaluaMan_S_LK"
		}, {
			lable : "受评价人员",
			name : "Q_acceptMan_S_LK"
		}, {
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			lable : "评价时间",
			name : "Q_evaluaDate_DL_GE"
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_evaluaDate_DG_LE"
		} ];
	actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadPractiEvaluation
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : PractiEvaluationListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "星级",
			dataIndex : "evaluaStar",
			width : 60,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/>';
				} else if (n == "2"){
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/>';
				}else if (n == "3"){
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/>';
				}else if (n == "4"){
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/>';
				}else if (n == "5"){
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/> '
					+'<img title="激活" src="' + __ctxPath + '/img/btn/commons/star.png"/>';
				}
			}
		}, {
			width : 60,
			header : "评价人员",
			dataIndex : "evaluaMan"
		}, {
			header : "受评价人员",
			dataIndex : "acceptMan"
		}, {
			header : "评价时间",
			dataIndex : "evaluaDate"
		} ]
	};
	PractiEvaluationListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiEvaluationListView",
		title : '人员评价',
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/archive/listPractiEvaluation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiEvaluationListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiEvaluationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPractiEvaluation.createDelegate(this)
			});
		}
		if (isGranted("_PractiEvaluationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiEvaluation.createDelegate(this)
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
	addPractiEvaluation : function() {
		new PractiEvaluationFrom(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractiEvaluation : function() {
		this.speciallyGridAction(this.dataGridPanel, "evaluaId", __ctxPath + "/archive/multiDelPractiEvaluation.do", "删除");
	},
	loadPractiEvaluation : function(a) {
		new PractiEvaluationFrom(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});