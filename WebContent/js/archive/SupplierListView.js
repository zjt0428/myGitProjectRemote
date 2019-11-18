var SupplierListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "供应商名称",
			name : "Q_supplierName_S_LK"
		}, {
			lable : "主营业务",
			name : "Q_mainBusiness_S_LK"
		} ];
		var advancedItems = [ {
			fieldType : "CHAR_FIELD",
			name : "Q_supplierName_S_LK",
			fieldLabel : "供应商名称"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_mainBusiness_S_LK",
			fieldLabel : "主营业务"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_unitType_S_LK",
			fieldLabel : "单位类型"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_address_S_LK",
			fieldLabel : "办公地址"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "成立时间",
			leftFieldLabel : "Q_birthDate_S_GE",
			rightFieldLabel : "Q_birthDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readSupplier
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : SupplierListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "status",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			header : "单位名称",
			dataIndex : "supplierName"
		}, {
			header : "单位类型",
			dataIndex : "unitType"
		}, {
			header : "办公电话",
			dataIndex : "tel"
		}, {
			header : "主营业务",
			dataIndex : "mainBusiness"
		}, {
			hidden : true,
			header : "成立时间",
			dataIndex : "birthDate"
		}, {
			header : "业务区域",
			dataIndex : "businessArea"
		}, {
			header : "联系人",
			dataIndex : "linkMan"
		}, {
			header : "联系人电话",
			dataIndex : "linkManPhone"
		} ]
	};
	SupplierListView.superclass.constructor.call(this, Ext.apply({
		id : "SupplierListView",
		title : TabTitle.SUPPLIER_LIST,
		iconCls : "menu-business-supplier",
		url : __ctxPath + "/archive/listSupplier.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_view : {
			autoExpandColumn : "businessArea",
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SupplierListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SupplierAdd")) {
			tbarItems.push({
				id : ListViewButtonsId.supplierAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSupplier.createDelegate(this)
			});
		}
		if (isGranted("_SupplierEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSupplier.createDelegate(this)
			});
		}
		if (isGranted("_SupplierMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSupplier.createDelegate(this)
			});
		}
		if (isGranted("_SupplierMultiCancel")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancelSupplier.createDelegate(this)
			});
		}
		if (isGranted("_SupplierRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverSupplier.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_SupplierExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportSupplier.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的供应商！";
		var msg2 = "您确认要【" + op + "】所选的供应商吗？";
		var msg3 = "成功【" + op + "】所选的供应商！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readSupplier : function(a) {
		new SupplierForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addSupplier : function() {
		new SupplierForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editSupplier : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new SupplierForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delSupplier : function() {
		this.speciallyGridAction(this.dataGridPanel, "supplierId", __ctxPath + "/archive/multiDelSupplier.do", "删除");
	},
	cancelSupplier : function() {
		this.speciallyGridAction(this.dataGridPanel, "supplierId", __ctxPath + "/archive/multiCancelSupplier.do", "注销");
	},
	recoverSupplier : function() {
		this.speciallyGridAction(this.dataGridPanel, "supplierId", __ctxPath + "/archive/recoverSupplier.do", "恢复");
	},
	exportSupplier : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportSupplier.do", this.dataGridPanel);
	}
});