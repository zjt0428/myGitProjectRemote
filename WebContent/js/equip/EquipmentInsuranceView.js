var EquipmentInsuranceView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var actionItems = null;
	   actionItems = [ {
			iconCls : "btn-grid-read",
			qtip : "明细",
			handler : this.readEquipmentInsurance
		},{
			iconCls : "btn-head-add",
			qtip : "添加设备保险理赔",
			handler : this.addEquipmentInsuranceClaim
	   }];
		var tbarItems = null;
		if (!this.tbarDisenable) {
			tbarItems = this.initTopBarActionItems();
		}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : EquipInsuranceDetailListViewField
		},
		tbarItems : tbarItems,
		rowAction : {
			width : 70,
			actionItems : actionItems,
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.statusName;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		} ]
	};
	EquipmentInsuranceView.superclass.constructor.call(this, Ext.apply({
		id : "EquipmentInsuranceView",
		title : "保险设备",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/equip/detailListEquipInsurance.do",
		search_config : {
			collapsed : false,
			preLableHidden : true,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipmentInsuranceView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push("->");
		if (isGranted("_EquipInsurancePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "续保打印",
				handler : this.printsEquipInsurancet.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, p) {
		var msg1 = "请选择要【" + op + "】的设备信息！";
		var msg2 = "您确认要【" + op + "】所选设备信息吗？";
		var msg3 = "成功【" + op + "】所选设备信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p);
	},
	readEquipmentInsurance : function(a) {
		new EquipmentInsuranceInfoForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addEquipmentInsuranceClaim : function(a) {
		new EquipmentInsuranceClaimForm(a, {
			saveable :true,
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	printsEquipInsurancet : function(type) {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		var b = ",";
		for(var i = 0;i < a.length; i++){
			b += a[i].data.detailId+",";
		}
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipInsurance.do?detailIds=" + b;
		}, null, 1000, 600);
	},
});