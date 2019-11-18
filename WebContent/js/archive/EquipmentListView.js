var EquipmentListView = function(a) {
	Ext.apply(this, a || {});
	this.params = this.params ? this.params : {};
	this.params.Q_delFlag_S_EQ = "1";
//	this.params.Q_businessStatus_S_NEQ = "B";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.equipPermission;
	}
//	if (!isGranted("_EquipmentReadAll")) {
//		this.params.Q_userId_L_EQ = curUserInfo.userId;
//	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "EQUIP_COMPON_STATUS", {
			width : 75,
			lable : "状态",
			allowBlank : true
		});
		var insureStatusCombo = $initComboBoxField("参保状态", "Q_insureStatus_S_LK", "INSURE_STATUS", {
			width : 75,
			lable : "参保状态",
			allowBlank : true
		});
		var businessStatusCombo = $initComboBoxField("业务状态", "Q_businessStatus_S_EQ", "EQUIP_BUSINESS_STATUS", {
			width : 75,
			lable : "业务状态",
			allowBlank : true
		});
		var equipVenderCombo = $initComboBoxField("制造厂家", "Q_equipVender_S_EQ", "equipVender", {
			width : 140,
			lable : "制造厂家",
			editable : true,
			allowBlank : true,
		});
		var equipSpecificCombo = $initComboBoxField("规格型号", "Q_equipSpecific_S_EQ", "equipSpecific", {
			width : 140,
			lable : "规格型号",
			editable : true,
			allowBlank : true,
		});
		var generalItems = [ statusCombo, insureStatusCombo,businessStatusCombo, {
			lable : "出厂编号",
			name : "Q_exwSerial_S_LK"
		},{
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		},{
			lable : "设备自编号",
			name : "Q_equipSerial_S_LK"
		}, equipSpecificCombo, {
			lable : "归属仓库",
			name : "Q_storeName_S_LK"
		} ];
		var advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_recordSerial_S_LK",
			fieldLabel : "设备编号"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "许可证号",
			name : "Q_licenseNumber_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_propertyName_S_LK",
			fieldLabel : "产权单位"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "出厂日期",
			leftFieldLabel : "Q_exwDate_S_GE",
			rightFieldLabel : "Q_exwDate_S_LE"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "报废日期",
			leftFieldLabel : "Q_scrapDate_S_GE",
			rightFieldLabel : "Q_scrapDate_S_LE"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "采购日期",
			leftFieldLabel : "Q_purchaseDate_S_GE",
			rightFieldLabel : "Q_purchaseDate_S_LE"
		},{
			fieldType : "CODE_FIELD",
			codeId : "equipGeneric",
			name : "Q_equipGeneric_S_EQ",
			fieldLabel : "设备名称"
		},{
			fieldType : "CODE_TREE_FIELD",
			name : "Q_equipCategory_S_EQ",
			fieldLabel : "设备类别",
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		} , {
			fieldType : "CHAR_FIELD",
			fieldLabel : "出厂编号",
			name : "Q_exwSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "设备自编号",
			name : "Q_equipSerial_S_LK"
		},{
			fieldType : "CODE_FIELD",
			codeId : "equipSpecific",
			name : "Q_equipSpecific_S_EQ",
			fieldLabel : "规格型号"
		},{
			fieldType : "CODE_FIELD",
			codeId : "EQUIP_COMPON_STATUS",
			name : "Q_status_S_EQ",
			fieldLabel : "状态"
		},{
			fieldType : "CODE_FIELD",
			codeId : "INSURE_STATUS",
			name : "Q_insureStatus_S_LK",
			fieldLabel : "参保状态"
		},{
			fieldType : "CODE_FIELD",
			codeId : "EQUIP_BUSINESS_STATUS",
			name : "Q_businessStatus_S_EQ",
			fieldLabel : "业务状态"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readEquipment
	}, {
		iconCls : "btn-grid-passcheck",
		hidden : true,
		qtip : "实时监控",
		handler : this.realTimeMonitoring
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : EquipmentListViewField
		},
		rowAction : {
			width : 70,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "业务状态",
			dataIndex : "businessStatusName",
			renderer : function(n) {
				if (n == "正在使用") {
					return "<font face='宋体' color='blue'>" + n + "</font>";
				}
				if (n == "报停") {
					return "<font face='宋体' color='red'>" + n + "</font>";
				}
				return n;
			}
		}, {
			header : "参保状态",
			dataIndex : "insureStatusName"
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "设备自编号",
			dataIndex : "equipSerial"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "规格型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "购买日期",
			dataIndex : "purchaseDate"
		}, {
			header : "设备来源",
			dataIndex : "equipSourceName"
		}, {
			header : "制造厂家",
			dataIndex : "equipVender"
		}, {
			header : "产权单位",
			dataIndex : "propertyName"
		}, {
			header : "资产现值",
			dataIndex : "presentValue"
		}, {
			header : "资产原值",
			dataIndex : "assetValue"
		}, {
			header : "归属仓库",
			dataIndex : "storeName"
		}, {
			width : 40,
			header : "状态",
			dataIndex : "statusName",
			renderer : function(n) {
				if (n == "在用") {
					return "<font face='宋体' color='blue'>" + n + "</font>";
				}
				if (n == "报废") {
					return "<font face='宋体' color='red'>" + n + "</font>";
				}
				return n;
			}
		}, {
			header : "当前存放地",
			dataIndex : "projectName"
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		}]
	};
	EquipmentListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipmentListView",
		title : TabTitle.EQUIPMENT_LIST,
		iconCls : "menu-business-equip",
		url : __ctxPath + "/archive/listEquipment.do",
		base_params : this.params,
		search_config : {
			preLableHidden : true,
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipmentListView, Knight.ux.SearchGridPanel, {
	rendererRowActionItems : function(action, record) {
		var data = record.data;
		if (!Ext.isEmpty(data.monitorSerial)) {
			action[1].hidden = false;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipmentAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipment.createDelegate(this, [ {
					mortgage : 0
				} ])
			});
//			tbarItems.push({
//				iconCls : "btn-head-add",
//				text : "复制",
//				handler : this.copyEquipment.createDelegate(this)
//			});
		}
		if (isGranted("_EquipmentEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipmentMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipmentScrap")) {
			tbarItems.push({
				iconCls : "btn-invalid",
				text : "报废",
				handler : this.scrapEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipmentMultiCancel")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancelEquipment.createDelegate(this)
			});
		}
/*			if (isGranted("_EquipmentRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipmentRelease")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "释放",
				handler : this.releaseEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipmentRefresh")) {
			tbarItems.push({
				iconCls : "btn-refresh",
				text : "更新",
				handler : this.refreshEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipmentConfirm")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "确定",
				handler : this.confirmEquipment.createDelegate(this)
			});
		}*/
		if (isGranted("_EquipmentBinding")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "绑定",
				handler : this.bindingEquipment.createDelegate(this)
			});
		}
		if (isGranted("_EquipChange")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改设备档案",
				handler : this.changeEquip.createDelegate(this)
			});
		}
		
		tbarItems.push("->");
//		if (isGranted("_EquipmentPrintDocument")) {
//			tbarItems.push({
//				iconCls : "btn-head-print",
//				text : "一机一档",
//				handler : this.printEquipmentDocument.createDelegate(this)
//			});
//		}
		if (isGranted("_EquipmentExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipment.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, v) {
		var msg1 = "请选择要【" + op + "】的设备信息！";
		var msg2 = "您确认要【" + op + "】所选设备信息吗？";
		var msg3 = "成功【" + op + "】所选设备信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, v);
	},
	readEquipment : function(a) {
		var f = Ext.getCmp("centerTabPanel");
		var g = Ext.getCmp("EquipmentView");
		if (g != null) {
			f.remove(g);
		}
		g = new EquipmentView(a);
		f.add(g);
		f.activate(g);
	},
	realTimeMonitoring : function(a) {
		var url = String.format(_EquipmentMonitorURL, a.monitorSerial);
		window.open(url, "实时情况", "height=" + (screen.availHeight - 50) + ", width=" + (screen.availWidth - 10) + ", top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, fullscreen=yes, resizable=yes,location=no, status=no");
	},
	addEquipment : function(a) {
		new EquipmentForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	copyEquipment : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【复制】的记录！");
			return;
		}
		new EquipmentForm(a[0].data, {
			copyable : true,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editEquipment : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if("1"!=a[0].data.status){
			$toast("非闲置设备不能修改！");
			return false;
		}
		new EquipmentForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delEquipment : function() {
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/multiDelEquipment.do", "删除", function(a) {
			if ("0" == a.status) {
				$toast("在用设备不能删除！");
				return false;
			}
			if ("2" == a.status) {
				$toast("借用设备不能删除！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	cancelEquipment : function() {
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/multiCancelEquipment.do", "注销", function(a) {
//			&&("注销" == a.businessStatusName
			if (a.businessStatusName !="待用") {
				$toast("设备无法注销！");
				return false;
			}else if (a.status != "1") {
				$toast("设备无法注销！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	recoverEquipment : function() {
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/recoverEquipment.do", "恢复", function(a) {
			if (!("注销" == a.businessStatusName)) {
				$toast("注销设备才能恢复！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	releaseEquipment : function() {
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/releaseEquipment.do", "释放");
	},
	refreshEquipment : function() {
		$request({
			url : __ctxPath + "/archive/refreshEquipment.do"
		});
	},
	confirmEquipment : function() {
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/confirmEquipment.do", "确定");
		this.dataGridPanel.getStore().reload();
	
	},
	printEquipmentDocument : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的设备信息！");
			return;
		}
		var url = __ctxPath + "/archive/printDocumentEquipment.do?equipId=" + a[0].data["equipId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	exportEquipment : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportEquipment.do", this.dataGridPanel);
	},
	bindingEquipment : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>0) {
			var equipId = "";
			for(var i=0;i<a.length;i++) {
				equipId += a[i].data.equipId+","
			}
			equipId = equipId.substr(0,equipId.length-1);
		}else {
			$toast("请先选择设备");
			return;
		}
		new BindingFormWindows({
			equipId : equipId,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	changeEquip : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("只能选择一条记录");
			return;
		}
		new ChangeEquipArchivesForm({
			maximized : false ,
			equipId : a[0].data.equipId,
			recordId : a[0].data.recordId,
			equipSerial : a[0].data.equipSerial,
			propertyName : a[0].data.propertyName,
			exwSerial : a[0].data.exwSerial,
			equipSource : a[0].data.equipSourceName,
			equipSpecific : a[0].data.equipSpecificName,
			equipGeneric : a[0].data.equipGenericName,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	scrapEquipment : function() {
		this.speciallyGridAction(this.dataGridPanel, "equipId", __ctxPath + "/archive/scrapEquipment.do", "报废", function(a) {
			if ("1" != a.status ) {
				$toast("非闲置设备不能报废！");
				return false;
			}
			return true;
		}.createDelegate(this));
	}
});