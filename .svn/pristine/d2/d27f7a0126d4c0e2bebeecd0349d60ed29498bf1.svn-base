var EquipVerifyListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "设备自编号",
			name : "Q_equipSerial_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipVerify
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
			fields : EquipInstallReviewListViewField
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
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "设备自编号",
			dataIndex : "equipSerial"
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
			header : "验收结论",
			dataIndex : "reviewConclusion"
		}, {
			header : "验收情况",
			dataIndex : "reviewStatus"
		}, {
			header : "驳回原因",
			dataIndex : "rejectReason"
		} ,{
			header : "验收类别",
			dataIndex : "relateModule"
		} ,{
			header : "验收ID",
			hidden : true,
			dataIndex : "reviewId"
		} ]
	};
	EquipVerifyListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipVerifyListView",
		title : TabTitle.EQUIP_VERIFY_LIST,
		iconCls : "menu-business-verify",
		url : __ctxPath + "/equip/reviewlistEquipVerify.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipVerifyListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		/*if (isGranted("_EquipVerifyAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInstallEquipVerify.createDelegate(this),				
			});
		}
		if (isGranted("_EquipVerifyEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipVerify.createDelegate(this),				
			});
		}*/
		if (isGranted("_EquipVerifyDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipVerify.createDelegate(this),				
			});
		}
	/*	if (isGranted("_EquipVerifyMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveEquipVerify.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipVerifyPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipVerify.createDelegate(this)
			});
		}*/
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的验收信息！";
		var msg2 = "您确认要【" + op + "】所选的验收信息吗？";
		var msg3 = "成功【" + op + "】所选的验收信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipVerify : function(a) {
		new EquipInstallReviewForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	
	},
	addEquipVerify : function(data) {
		new EquipVerifyForm(data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addInstallEquipVerify : function() {
		new EquipFlowInstallSelector({
			params : {
				"Q_flowState_S_EQ" : "2",
				"Q_verifyDate_S_NULL" : "1"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?loadProject=true&flowId=" + data.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						this.addEquipVerify({
							relateId : equipFlow.equipInstall.installId,
							relateSerial : equipFlow.equipInstall.installSerial,
							relateModule : RelationModule.equipInstall.relateModule,
							relateModuleName : RelationModule.equipInstall.relateModuleName,
							equipFlow : equipFlow
						})
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addEmployEquipVerify : function() {
		new EquipFlowEmploySelector({
			params : {
				"Q_flowState_S_EQ" : "4"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?loadProject=true&flowId=" + data.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						this.addEquipVerify({
							relateId : equipFlow.equipEmploy.employId,
							relateSerial : equipFlow.equipEmploy.employSerial,
							relateModule : RelationModule.equipEmploy.relateModule,
							relateModuleName : RelationModule.equipEmploy.relateModuleName,
							equipFlow : equipFlow
						})
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	editEquipVerify : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.effective) {
					Ext.MessageBox.alert("操作信息", "该验收信息已经【生效】不允许修改！");
					return false;
				}
				return true;
			}.createDelegate(this), function(a) {
				new EquipVerifyForm(a.data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this));
	},
	delEquipVerify : function() {
		this.speciallyGridAction(this.dataGridPanel, "verifyId", __ctxPath + "/safety/multiDelEquipInstallReview.do", "删除", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("【已生效】的验收信息无法【删除】！");
			return false;
		}.createDelegate(this));
	},
	effectiveEquipVerify : function() {
		this.speciallyGridAction(this.dataGridPanel, "verifyId", __ctxPath + "/equip/multiEffectiveEquipVerify.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该启用信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	printEquipVerify : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipVerify.do?formpage=EquipVerify&verifyId=" + a[0].data["verifyId"];
		});
	}
});