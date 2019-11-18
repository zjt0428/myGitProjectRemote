var LaborPayListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_payState_S_NEQ = "3";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var actionItems = null;
		generalItems = [ {
			lable : "合同编号",
			name : "Q_contractNo_S_LK"
		}, {
			lable : "承租方",
			name : "Q_paEntName_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "项目经理",
			name : "Q_leaseProjectHead_S_LK"
		}, {
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			lable : "结算时间",
			name : "Q_startSettleDate_S_GE"
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_startSettleDate_S_LE"
		} ];
	actionItems = [ {
		qtip : "追加记录",
		text : "追加记录",
		handler : this.editLaborPay
	}, {
		iconCls : "btn-grid-read",
		qtip : "详情",
		handler : this.loadLaborPay
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : LaborPayListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "合同编号",
			dataIndex : "contractNo"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "工地项目经理",
			dataIndex : "leaseProjectHead"
		}, {
			header : "结算开始时间",
			dataIndex : "startSettleDate"
		}, {
			header : "截止时间",
			dataIndex : "endSettleDate"
		}, {
			header : "应付金额",
			dataIndex : "copeAmount"
		}, {
			header : "已付金额",
			dataIndex : "paidAmount"
		}, {
			header : "上期支付时间",
			dataIndex : "periodPayDate"
		}, {
			header : "创建时间",
			dataIndex : "createDate"
		}, {
			header : "状态",
			dataIndex : "payStateName"
		}]
	};
LaborPayListView.superclass.constructor.call(this, Ext.apply({
		id : "LaborPayListView",
		title : '待支付',
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/dispatch/listLaborPay.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LaborPayListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LaborPayAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLaborPay.createDelegate(this)
			});
		}
		if (isGranted("_LaborPayMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLaborPay.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的支付单！";
		var msg2 = "您确认要【" + op + "】所选支付单吗？";
		var msg3 = "成功【" + op + "】所选支付单！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	addLaborPay : function() {
		new LaborSettleSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/dispatch/loadLaborSettle.do",
					params : {
						laborSettId : data.laborSettId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						new LaborPayForm({
							laborSettId : data.laborSettId,
							laborPay : data
						}, {
							animateTarget : this.el,
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	delLaborPay : function() {
		this.speciallyGridAction(this.dataGridPanel, "laborPayId", __ctxPath + "/dispatch/multiDelLaborPay.do", "删除");
	},
	loadLaborPay : function(a) {
		new LaborPayForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editLaborPay : function(a) {
		new LaborPayForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},

});