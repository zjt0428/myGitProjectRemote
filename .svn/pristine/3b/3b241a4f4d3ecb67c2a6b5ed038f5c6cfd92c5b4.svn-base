var PractiInsuranceListView = function(a) {
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
	var applyforStatusCombo = $initComboBoxField("状态", "Q_effective_S_LK", "INSURE_EFFECTIVE", {
		width : 80,
		lable : "状态",
		allowBlank : true
	});
	if (!this.searchDisenable) {
		generalItems = [ applyforStatusCombo,{
			lable : "保险编号",
			name : "Q_insureSerial_S_LK"
		}, {
			lable : "保险公司",
			name : "Q_insuranceCompany_S_LK"
		}, {
			lable : "所属公司",
			name : "Q_corpName_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_practiInsuranceDetailSet.projectName_S_LK"
		}, {
			lable : "人员姓名",
			name : "Q_practiInsuranceDetailSet.practitioner.practiName_S_LK"
		}, {
			lable : "身份证号",
			name : "Q_practiInsuranceDetailSet.practitioner.idCard_S_LK"
		}, {
			xtype : "datacombo",
			width : 75,
			lable : "是否理赔",
			name : "Q_claims_S_EQ",
			store : [ [ "0", "否" ], [ "1", "是" ] ]
		}, {
			xtype : "datacombo",
			width : 75,
			lable : "人员是否已满",
			name : "Q_practiFull_S_EQ",
			store : [ [ "0", "否" ], [ "1", "是" ] ]
		}/*, {
			xtype : "checkboxgroup",
			width : 100,
			items : [ {
				boxLabel : "一个月内到期",
				name : "expire",
				inputValue : "1"
			} ]
		}*/];
	}
	actionItems = [ {
		iconCls : "btn-package_green",
		qtip : "详情",
		handler : this.readStock
	}, {
		iconCls : "btn-package_go",
		qtip : "明细",
		handler : this.readPractiInsurance
	}, {
		iconCls : "btn-grid-read",
		qtip : "查看",
		handler : this.loadPractiInsurance
	}];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : PractiInsuranceListViewField
		},
		rowAction : {
			width : 70,
			actionItems : actionItems,
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态 ",
			dataIndex : "effectiveName"
		}, {
			header : "保险编号",
			dataIndex : "insureSerial"
		}, {
			header : "保障人数",
			dataIndex : "practiAmount",
			renderer : function(value, metadata, record) {
				return  value+"/"+record.data.practiMaxNum;
			}
		}, {
			header : "起保日期",
			dataIndex : "startInsureDate"
		}, {
			header : "停保日期",
			dataIndex : "endInsureDate"
		}, {
			header : "保费金额",
			dataIndex : "totalPremium"
		}, {
			header : "保险公司",
			dataIndex : "insuranceCompany"
		}, {
			header : "联系人",
			dataIndex : "linkman"
		}, {
			header : "理赔电话",
			dataIndex : "claimiPhone"
		}, {
			header : "理赔金额",
			dataIndex : "claimAmount"
		},{
			header : "所属公司",
			dataIndex : "corpName"
		}]
	};
	this.practiInsuranceEastView = new PractiInsuranceEastView({
	});
	this.practiInsuranceEastTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 600,
		maxSize : 600,
		region : "east",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.practiInsuranceEastView]
	});

	this.practiInsuranceSouthView = new PractiInsuranceSouthView();
	this.practiInsuranceSouthTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		height : 150,
		maxSize : 300,
		region : "south",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.practiInsuranceSouthView]
	});
	
	PractiInsuranceListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiInsuranceListView",
		title : "人员保险",
		iconCls : "menu-business-storehouse",
		url : __ctxPath + "/archive/listPractiInsurance.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [this.practiInsuranceSouthTabPanel,this.practiInsuranceEastTabPanel]
	}, a));
};
Ext.extend(PractiInsuranceListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PractiInsuranceAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPractiInsurance.createDelegate(this)
			});
		}
		if (isGranted("_PractiInsuranceEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPractiInsurance.createDelegate(this)
			});
		}
		if (isGranted("_PractiInsuranceMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPractiInsurance.createDelegate(this)
			});
		}
		if (isGranted("_PractiInsuranceMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectivePractiInsurance.createDelegate(this)
			});
		}
		if (isGranted("_PractiInsuranceMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectivePractiInsurance.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的保险！";
		var msg2 = "您确认要【" + op + "】所选保险吗？";
		var msg3 = "成功【" + op + "】所选保险！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readPractiInsurance : function(a) {
		this.practiInsuranceEastTabPanel.expand();
		var practiInsuranceEastListView = this.practiInsuranceEastView.getDataGridPanel().getStore();
		Ext.apply(practiInsuranceEastListView.baseParams, {
			"Q_insureId_L_EQ" : a.insureId,
			"Q_delFlag_S_EQ" : "1"

		});
		practiInsuranceEastListView.load();
		this.practiInsuranceEastView.showAdd(a.effective);
	},
	readStock : function(a) {
		this.practiInsuranceSouthTabPanel.expand();
		var practiInsuranceSouthListView = this.practiInsuranceSouthView.getDataGridPanel().getStore();
		Ext.apply(practiInsuranceSouthListView.baseParams, {
			"Q_insureId_L_EQ" : a.insureId
		});
		practiInsuranceSouthListView.load();
		this.practiInsuranceSouthView.insureId = a.insureId;
		this.practiInsuranceSouthView.searchResetOriginal({
			"Q_insureId_L_EQ" : a.insureId
		});
	},
	addPractiInsurance : function() {
		new PractiInsuranceFrom(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editPractiInsurance : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.effective) {
			$toast("请选择【未生效】的保险记录！");
			return;
		}
		new PractiInsuranceFrom(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPractiInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/archive/multiDelPractiInsurance.do", "删除",function(a) {
			if ("1" != a.effective) {
				return true;
			}
			return false;
		}.createDelegate(this), "是否确认删除");
	},
	exportPractiInsurance : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportPractiInsurance.do", this.dataGridPanel);
	},
	printsPractiInsurance : function(type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/archive/printPractiInsurance.do?insureId=" + a[0].data["insureId"];
		}, null, 1000, 600);
	},
	loseEffectivePractiInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/archive/loseEffectivePractiInsurance.do", "失效", function(a) {
			if ("1" == a.effective || "12" == a.effective) {
				return true;
			}
			$toast("该保险信息已经【失效】！");
			return false;
		}.createDelegate(this), "是否确认失效");
	},
	effectivePractiInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/archive/multiEffectivePractiInsurance.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该保险信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loadPractiInsurance : function(a) {
		new PractiInsuranceFrom(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});