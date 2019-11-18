var PractiLeaveListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var kindWorkCombo = $initComboBoxField("从业工种", "Q_practitioner.kindWork_S_EQ", "kindWork", {
			width : 130,
			lable : "从业工种",
			allowBlank : true
		});
		var effectiveCombo = $initComboBoxField("状态", "Q_effective_S_EQ", "EFFECTIVE_FLAG", {
			width : 60,
			lable : "状态",
			allowBlank : true
		});
		var generalItems = [ effectiveCombo, {
			lable : "人员名称",
			name : "Q_practitioner.practiName_S_LK"
		},kindWorkCombo,  {
			lable : "所属企业",
			width : 130,
			name : "Q_practitioner.corpInfo.corpName_S_LK"
		}, {
			lable : "所属部门",
			width : 130,
			name : "Q_practitioner.department.depName_S_LK"
		}, {
			lable : "离职日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			width : 100,
			name : "Q_leaveTime_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			width : 100,
			name : "Q_leaveTime_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readPractiLeave
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : PractiLeaveListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "effective",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="生效" src="' + __ctxPath + '/img/flag/round_001.png"/>';
				} else {
					return '<img title="未生效" src="' + __ctxPath + '/img/flag/round_005.png"/>';
				}
			}
		}, {
			header : "离职人员",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.practiName;
				}
			}
		},{
			header : "离职日期",
			dataIndex : "leaveTime"
		}, {
			header : "所属企业",
			width : 180,
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.corpInfo.corpName;
				}
			}
		}, {
			header : "所属部门",
			width : 180,
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.department.depName;
				}
			}
		}, {
			header : "从业工种",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.kindWorkName;
				}
			}
		},{
			header : "离职原因",
			width : 280,
			dataIndex : "remark"
		},
		 {
			header : "创建人",
			dataIndex : "userName"
		}, {
			header : "创建日期",
			dataIndex : "createTime"
		} ]
	};
	PractiLeaveListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiLeaveListView",
		title : "人员离职管理",
		iconCls : "menu-business-practicert",
		url : __ctxPath + "/archive/listPractiLeave.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiLeaveListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiLeaveAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPractiLeave.createDelegate(this)
			});
		}
		if (isGranted("_PractiLeaveEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPractiLeave.createDelegate(this)
			});
		}
		if (isGranted("_PractiLeaveMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiLeave.createDelegate(this)
			});
		}
		if (isGranted("_PractiLeaveMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectivePractiLeave.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_PractiLeaveExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportPractiLeave.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选的信息吗？";
		var msg3 = "成功【" + op + "】所选的信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readPractiLeave : function(a) {
		new PractiLeaveForm(a).show();
	},
	addPractiLeave : function() {
		if (!this.practiId) {
			new PractitionerSelector({
				single : true,
				params : {
					"Q_incumbent_S_NEQ" : '0' ,
					"QVO_permissionFlag_S_LK" : this.params.QVO_permissionFlag_S_LK
				},
				callback : function(d) {
					new PractiLeaveForm(d[0].data, {
						saveable : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			}).show();
		} else {
			new PractiLeaveForm({
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
	editPractiLeave : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new PractiLeaveForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractiLeave : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		for(var i = 0;i<a.length;i++){
			if('1' == a[i].data.effective){
				$toast("已生效信息不可删除！");
			}
		}
		this.speciallyGridAction(this.dataGridPanel, "leaveId", __ctxPath + "/archive/multiDelPractiLeave.do", "删除");
	},
	effectivePractiLeave : function() {
		this.speciallyGridAction(this.dataGridPanel, "leaveId", __ctxPath + "/archive/multiEffectivePractiLeave.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	exportPractiLeave : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractiLeave.do", this.dataGridPanel);
	}
});
