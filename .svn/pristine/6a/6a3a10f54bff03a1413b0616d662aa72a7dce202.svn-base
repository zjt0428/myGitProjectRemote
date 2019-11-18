var EquipContractLeaseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadEquipActivate
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
			fields : EquipContractLeaseListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "启用日期",
			dataIndex : "activateDate" 
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目所属地",
			dataIndex : "address"
		}, {
			header : "使用单位",
			dataIndex : "emEntName"
		} ]
	};
	EquipContractLeaseListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipContractLeaseListView",
		title : TabTitle.EQUIP_ACTIVATE_LIST,
		iconCls : "menu-business-activate",
		url : __ctxPath + "/equip/listContractEquipActivate.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipContractLeaseListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipContractLeaseAdd")){
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				tooltip : {
					text : "关联业务检测报告",
					title : "按合同"
				},
				handler : this.addInstallContractLease.createDelegate(this)
			})
		}
		if (isGranted("_EquipActivateEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipActivate.createDelegate(this)
			});
		}
		if (isGranted("_EquipActivateMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipActivate.createDelegate(this)
			});
		}
		tbarItems.push("->");
//		if (isGranted("_EquipActivatePrinter")) {
//			tbarItems.push({
//				iconCls : "btn-head-print",
//				text : "打印",
//				handler : this.printEquipActivate.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的启用信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的启用信息吗？";
		var msg3 = "成功【" + op + "】所选的启用信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipActivate : function(a) {
		new EquipContractLeaseForm(a).show();
	},
	addInstallContractLease : function(){
		new ContractLeaseSelector({
			single : true,
			/*params : {	//条件过滤
			},*/
			callback : function(a){
				var data = a[0].data;
				$request({
					url : __ctxPath + "/dispatch/loadContractLease.do",
					params : {
						loadProject : true,
						contractId : data.contractId,
					},
					success : function(g, h){
						var resp = Ext.util.JSON.decode(g.responseText);
						new EquipContractLeaseForm(resp.data[0], {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				})
			}.createDelegate(this)
		}).show();
	},
	editEquipActivate : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new EquipContractLeaseForm(a[0].data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
		}).show();
	},
	delEquipActivate : function() {
		this.speciallyGridAction(this.dataGridPanel, "activateId", __ctxPath + "/equip/multiDelContractEquipActivate.do", "删除", function(a) {
//			if ("0" == a.effective) {
//				return true;
//			}
//			$toast("【已生效】的启用信息无法【删除】！");
			return true;
		}.createDelegate(this));
	}
//	printEquipActivate : function() {
//		$print(this.dataGridPanel, function(a) {
//			return __ctxPath + "/equip/printEquipActivate.do?formpage=EquipActivate&activateId=" + a[0].data["activateId"];
//		});
//	}
});