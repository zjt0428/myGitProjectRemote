var InstallDismantlePriceListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	var applyforStatusCombo = $initComboBoxField("安拆类型", "Q_installDismantleType_S_EQ", "INSTALL_DISMANTLE_TYPE", {
		width : 120,
		lable : "状态",
		allowBlank : true
	});
	var belongToAreaCombo = $initComboBoxField("区域", "Q_belongToArea_S_EQ", "belongToArea", {
		width : 80,
		lable : "区域",
		allowBlank : true
	});
	var belongToEquipSpecificNameCombo = $initComboBoxField("设备型号", "Q_equipSpecific_S_EQ", "equipSpecific", {
		width : 80,
		lable : "设备型号",
		allowBlank : true
	});
	if (!this.searchDisenable) {
		generalItems = [applyforStatusCombo,belongToAreaCombo,belongToEquipSpecificNameCombo];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readInstallDismantlePrice
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : InstallDismantlePriceListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "区域",
				dataIndex : "belongToAreaName"
			}, {
				header : "设备型号",
				dataIndex : "equipSpecificName"
			}, {
				header : "安拆类型",
				dataIndex : "installDismantleTypeName"
			}, {
				header : "计量单位",
				dataIndex : "measurementUnit"
			}, {
				header : "项目单价",
				dataIndex : "projectPrice"
			}, {
				header : "班组单价",
				dataIndex : "teamPrice"
			}]
	}
	
	InstallDismantlePriceListView.superclass.constructor.call(this, Ext.apply({
		id : "InstallDismantlePriceListView",
		title : "安拆价格明细",
		url : __ctxPath + "/equip/listInstallDismantlePrice.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(InstallDismantlePriceListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的安拆价格信息！";
		var msg2 = "您确认要【" + op + "】所选的安拆价格信息吗？";
		var msg3 = "成功【" + op + "】所选的安拆价格信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallDismantlePriceAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInstallDismantlePrice.createDelegate(this)
			});
		}
		if (isGranted("_InstallDismantlePriceEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInstallDismantlePrice.createDelegate(this)
			});
		}
		if (isGranted("_InstallDismantlePriceMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInstallDismantlePrice.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readInstallDismantlePrice : function(a) {
		new InstallDismantlePriceForm(a).show();
	},
	
	addInstallDismantlePrice : function(){
		new InstallDismantlePriceForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editInstallDismantlePrice : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new InstallDismantlePriceForm(a[0].data, {
			editable:true,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delInstallDismantlePrice : function(){
		this.speciallyGridAction(this.dataGridPanel, "priceId", __ctxPath + "/equip/multiDelInstallDismantlePrice.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
});