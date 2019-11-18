var PractitionerBlackListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_blacklist_S_EQ = '1';
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		practiDepartmentId : Ext.id()
	});
	// =====================================================================//
	if (!this.searchDisenable) {
		var incumbentCombo = $initSimpleComboBoxField("在职", "Q_incumbent_S_EQ", [ [ "1", "在岗" ], [ "2", "待岗" ], [ "0", "离职" ] ], {
			width : 60,
			lable : "人员状态",
			allowBlank : true
		});
		var kindWorkCombo = $initComboBoxField("从业工种", "Q_kindWork_S_EQ", "kindWork", {
			width : 75,
			lable : "从业工种",
			allowBlank : true
		});
		var insureStatusCombo = $initComboBoxField("参保状态", "Q_insureStatus_S_EQ", "INSURE_STATUS", {
			width : 75,
			lable : "参保状态",
			allowBlank : true
		});
		var generalItems = [ kindWorkCombo, incumbentCombo, insureStatusCombo,{
			xtype : "hidden",
			id : this.practiDepartmentId,
			name : "Q_department.depId_L_EQ"
		}, {
			lable : "人员名称",
			name : "Q_practiName_S_LK"
		}, {
			lable : "身份证号",
			name : "Q_idCard_S_LK"
		},{
			xtype : "datacombo",
			width : 75,
			lable : "上班情况",
			name : "Q_workState_S_EQ",
			store : [ [ "2", "上班" ], [ "1", "下班" ] ]
		} /*{
			xtype : "treecombo",
			valId : this.practiDepartmentId,
			width : 130,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do?opt=appUser",
			name : "practitioner.department.depName"
		},{
			lable : "入职时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_divisionDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_divisionDate_S_LE"
		}, {
			lable : "离职时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_separationDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_separationDate_S_LE"
		}*/ ];
		var advancedItems = [ {
			fieldType : "COMBO_FIELD",
			name : "Q_incumbent_S_EQ",
			fieldLabel : "在岗状态",
			store : [ [ "1", "在岗" ],[ "2", "待岗" ], [ "0", "离职" ] ]
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_practiName_S_LK",
			fieldLabel : "人员姓名"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_idCard_S_LK",
			fieldLabel : "身份证号"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_birthplace_S_LK",
			fieldLabel : "籍贯"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_mobile_S_LK",
			fieldLabel : "联系电话"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "出生日期",
			leftFieldLabel : "Q_birthDate_S_GE",
			rightFieldLabel : "Q_birthDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readPractitioner
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : PractitionerListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "practiStatus",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			header : "人员姓名",
			dataIndex : "practiName"
		}, {
			header : PractitionerListViewHeader.corpName,
			dataIndex : "corpInfo",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.corpName;
				}
			}
		}, {
			header : "登陆帐户",
			dataIndex : "appUser",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.username;
				}
			}
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
		}, {
			header : "身份证号",
			dataIndex : "idCard"
		}, {
			header : "移动电话",
			dataIndex : "mobile"
		}, {
			header : "专业职称",
			dataIndex : "professionTitle"
		}, {
			header : "入职时间",
			dataIndex : "divisionDate"
		}, {
			header : "离职时间",
			dataIndex : "separationDate"
		}, {
			header : "从业工种",
			dataIndex : "kindWorkName"
		}, {
			header : "所在项目",
			dataIndex : "projectName"
		}, {
			header : "人员状态",
			dataIndex : "incumbent",
			renderer : function(n) {
				if (n == "1") {
					return "在岗";
				} else if("2"==n){
					return "待岗";
				}else{
					return "离职";
				}
			}
		}, {
			header : "参保状态",
			dataIndex : "insureStatusName"
		}, {
			header : "资质标识",
			dataIndex : "certFlag",
			renderer : function(n) {
				if (n == "1") {
					return "有";
				} else {
					return "无";
				}
			}
		} ]
	};
	PractitionerBlackListView.superclass.constructor.call(this, Ext.apply({
		id : "PractitionerBlackListView",
		title : "黑名单管理",
		iconCls : "menu-business-practi",
		url : __ctxPath + "/archive/listPractitioner.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractitionerBlackListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		if (isGranted("_BPractitionerCertAdd")) {
			actionItems.push({
				iconCls : "btn-business-practicert_add",
				qtip : "人员资质",
				handler : this.addPractiCert
			});
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BPractitionerEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPractitioner.createDelegate(this)
			});
		}
		if (isGranted("_BPractitionerMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractitioner.createDelegate(this)
			});
		}
		if (isGranted("_BPractitionerMultiForbidden")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancelPractitioner.createDelegate(this)
			});
		}
		if (isGranted("_BPractitionerRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverPractitioner.createDelegate(this)
			});
		}
		if (isGranted("_BPractitionerBack")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "复职",
				handler : this.backPractitioner.createDelegate(this)
			});
		}
		if (isGranted("_BPractitionerMoveListWhite")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "加入白名单",
				handler : this.moveListPractitioner.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_BPractitionerExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportPractitioner.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的从业人员！";
		var msg2 = "您确认要【" + op + "】所选的从业人员吗？";
		var msg3 = "成功【" + op + "】所选的从业人员！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readPractitioner : function(a) {
		var f = Ext.getCmp("centerTabPanel");
		var g = Ext.getCmp("PractitionerView");
		if (g != null) {
			f.remove(g);
		}
		g = new PractitionerView(a);
		f.add(g);
		f.activate(g);
	},
	addPractiCert : function(a) {
		new PractiCertForm({
			mobile : a.mobile,
			idCard : a.idCard,
			practiName : a.practiName,
			practiId : a.practiId
		}, {
			saveable : true,
			callback : function() {
				var practiCertListView = Ext.getCmp("PractiCertListView");
				if (practiCertListView) {
					practiCertListView.dataGridPanel.getStore().reload();
				}
			}.createDelegate(this)
		}).show();
	},
	addPractitioner : function() {
		new CorpSelector({
			single : true,
			callback : function(d) {
				new PractitionerForm(d[0].data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editPractitioner : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new PractitionerForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractitioner : function() {
		this.speciallyGridAction(this.dataGridPanel, "practiId", __ctxPath + "/archive/multiDelPractitioner.do", "删除");
	},
	cancelPractitioner : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		for(var i = 0; i<a.length;i++){
			if(a[i].data.practiStatus == '2'){
				$toast("请勿重复注销人员！");
				return;
			}
		}
		this.speciallyGridAction(this.dataGridPanel, "practiId", __ctxPath + "/archive/multiCancelPractitioner.do", "注销");
	},
	recoverPractitioner : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		for(var i = 0; i<a.length;i++){
			if(a[i].data.practiStatus != '2'){
				$toast("非注销人员，无须恢复！");
				return;
			}
		}
		this.speciallyGridAction(this.dataGridPanel, "practiId", __ctxPath + "/archive/recoverPractitioner.do", "恢复");
	},
	backPractitioner : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		for(var i = 0; i<a.length;i++){
			if(a[i].data.incumbent != '0'){
				$toast("非离职人员，无须复职！");
				return;
			}
		}
		this.speciallyGridAction(this.dataGridPanel, "practiId", __ctxPath + "/archive/backPractitioner.do", "复职");
	},
	moveListPractitioner : function() {
		this.speciallyGridAction(this.dataGridPanel, "practiId", __ctxPath + "/archive/moveListPractitioner.do?target=0", "加入白名单");
	},
	exportPractitioner : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractitioner.do", this.dataGridPanel);
	}
});