var AntiFallDetectionListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "检测编号",
			name : "Q_detectNum_S_LK"
		}, {
			lable : "防坠器编号",
			name : "Q_antiFallNum_S_LK"
		},{
			lable : "检测评定日期",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_DG_LE"
		} ,{
			lable : "检测有效日期",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_endDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_endDate_DG_LE"
		}   ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipDetect
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AntiFallDetectionListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [  {
			header : "",
			dataIndex : "status",
			width : 15,
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
		},{
			header : "检测编号",
			dataIndex : "detectNum"
		},{
			header : "防坠器编号",
			dataIndex : "antiFallNum"
		},{
			header : "检测费用",
			dataIndex : "antiFallFee"
		}, {
			header : "检测评定日期",
			dataIndex : "startDate"
		},
		{
			header : "检测有效日期",
			dataIndex : "endDate"
		}, 
		{
			header : "检测状态",
			dataIndex : "status",
			renderer:function(n){
				if(n=="1"){
					return "有效";
				}
				else
					return "无效";
			}
		} ]
	};
	AntiFallDetectionListView.superclass.constructor.call(this, Ext.apply({
		id : "AntiFallDetectionListView",
		title : TabTitle.ANTI_FALL_DETECTION_LIST,
		iconCls : "menu-business-detector",
		url : __ctxPath + "/equip/listAntiFallDetection.do",
		//url : __ctxPath + "/equip/listEquipHitch.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AntiFallDetectionListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AntiFallDetectionAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInstallEquipDetect.createDelegate(this)

			});
		}
		if (isGranted("_AntiFallDetectionEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipDetect.createDelegate(this)
			});
		}
		if (isGranted("_AntiFallDetectionMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipDetect.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的检测信息！";
		var msg2 = "您确认要【" + op + "】所选的检测信息吗？";
		var msg3 = "成功【" + op + "】所选的检测信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipDetect : function(a) {
		new AntiFallDetectionForm(a).show();
	},
	addInstallEquipDetect : function() {
		new ComponentSelector({
			params : {
				//"Q_flowState_S_EQ" : "2"
				"Q_parachuteFlag_S_EQ":"1"
			},
			single : true,
			antiFall:true,
			callback : function(d) {
					var data = d[0].data;
					new AntiFallDetectionForm(data, {
						saveable : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
			}.createDelegate(this)
		}).show();
	},
	addEmployEquipDetect : function() {
		new EquipFlowEmploySelector({
			params : {
				"Q_flowState_S_EQ" : "4"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new EquipDetectForm(data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editEquipDetect : function() {		
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new AntiFallDetectionForm(a[0].data, {			
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delEquipDetect : function() {
		this.speciallyGridAction(this.dataGridPanel, "antiFallId", __ctxPath + "/equip/multiDelAntiFallDetection.do", "删除");
	}
});