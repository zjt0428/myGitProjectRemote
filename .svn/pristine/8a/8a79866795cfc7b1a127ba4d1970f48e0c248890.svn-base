var VerifySelfListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	this.showRelateModule = this.showRelateModule || a.showRelateModule;
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "自检编号",
			name : "Q_equipFlow.equipDiary.selfSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "工程名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadVerifySelf
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : VerifySelfListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "自检编号",
			dataIndex : "selfSerial"
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "安装单位",
			dataIndex : "inEntName"
		} ]
	};
	VerifySelfListView.superclass.constructor.call(this, Ext.apply({
		id : "VerifySelfListView",
		title : TabTitle.VERIFY_SELF_LIST,
		iconCls : "menu-business-vself",
		url : __ctxPath + "/verify/listVerifySelf.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(VerifySelfListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va) {
	},
	loadLiftVerifySelf : function(a) {
		new LiftVerifySelfForm(a).show();
	},
	loadTowerCraneVerifySelf : function(a) {
		new TowerCraneVerifySelfForm(a).show();
	},
	loadVerifySelf : function(a) {
		switch (a.equipFlow.equipDiary.verifyType) {
			case "S":
				this.loadLiftVerifySelf(a);
				break;
			case "T":
				this.loadTowerCraneVerifySelf(a);
				break;
		}
	},
	editLiftVerifySelf : function(a) {
		new LiftVerifySelfForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editTowerCraneVerifySelf : function(a) {
		new TowerCraneVerifySelfForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	switchEditVerifySelf : function(data) {
		switch (data.equipFlow.equipDiary.verifyType) {
			case "S":
				this.editLiftVerifySelf(data);
				break;
			case "T":
				this.editTowerCraneVerifySelf(data);
				break;
		}
	},
	editVerifySelf : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		this.switchEditVerifySelf(a[0].data);
	},
	delVerifySelf : function() {
		this.speciallyGridAction(this.dataGridPanel, "selfId", __ctxPath + "/verify/multiDelVerifySelf.do", "删除");
	},
	printVerifySelf : function(type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/verify/printVerifySelf.do?formpage=VerifySelf" + type + "&selfId=" + a[0].data["selfId"];
		});
	}
});