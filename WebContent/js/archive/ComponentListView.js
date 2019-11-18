var ComponentListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		repertoryCategoryId : Ext.id()
	});
	// =====================================================================//
	if (!this.searchDisenable) {
		var componSpecificCombo = $initComboBoxField("设备型号", "Q_componSpecific_S_EQ", "componSpecific", {
			width : 100,
			lable : "设备型号",
			editable : true,
			allowBlank : true
		});
		var componGenericCombo = $initComboBoxField("零配件名称", "Q_componGeneric_S_EQ", "componGeneric", {
			width : 100,
			lable : "零配件名称",
			editable : true,
			allowBlank : true
		});
		var repertoryCategoryCombo = $initComboBoxField("零配件类别", "Q_componCategory_S_EQ", "repertoryCategory", {
			width : 130,
			lable : "零配件类别",
			editable : true,
			allowBlank : true
		});
		var generalItems = [ 
           componGenericCombo, {
			lable : "配件规格",
			name : "Q_dimensions_S_LK"
		}];
		var advancedItems = [ {
			fieldType : "ADDRESS_FIELD"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "RFID号",
			name : "Q_rfidCode_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_batchNumber_S_LK",
			fieldLabel : "批次号"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_dimensions_S_LK",
			fieldLabel : "配件规格"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_supplierName_S_LK",
			fieldLabel : "供应商"
		}, {
			fieldType : "CODE_FIELD",
			codeId : "componSpecific",
			name : "Q_componSpecific_S_EQ",
			fieldLabel : "设备型号"
		}, {
			fieldType : "CODE_FIELD",
			codeId : "componGeneric",
			name : "Q_componGeneric_S_EQ",
			fieldLabel : "零配件名称"
		}, {
			fieldType : "CODE_TREE_FIELD",
			name : "Q_componCategory_S_EQ",
			fieldLabel : "零配件类别",
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "购买时间",
			leftFieldLabel : "Q_purchaseDate_S_GE",
			rightFieldLabel : "Q_purchaseDate_S_LE"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "报废日期",
			leftFieldLabel : "Q_scrapDate_S_GE",
			rightFieldLabel : "Q_scrapDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readComponent
	},{
		iconCls : "btn-grid-read",
		qtip : "库存明细",
		handler : this.readStoreDetail
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ComponentListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "零配件类别",
			dataIndex : "componCategoryName"
		}, {
			header : "设备型号",
			dataIndex : "componSpecificName"
		}, {
			header : "生产厂家",
			dataIndex : "equipVenderName"
		},   {
			header : "零部件名称",
			dataIndex : "componGenericName"
		},{
			header : "配件规格",
			dataIndex : "dimensions"
		}, {
			header : "计量单位",
			dataIndex : "calculate",
			
		}, {
			header : "资产总计",
			dataIndex : "assetValue",
			hidden : true
		}, {
			width : 60,
			header : "配件总量",
			dataIndex : "totalCounts",
			renderer : function(value, metadata, record) {
				record.data.totalCounts = record.data.storeCounts+record.data.inuseCounts+record.data.unuseCounts;
				return record.data.totalCounts;
			}
		}, {
			width : 60,
			header : "使用数量",
			dataIndex : "inuseCounts"
		}, {
			width : 60,
			header : "库存数量",
			dataIndex : "storeCounts"
		}, {
			width : 60,
			header : "未安装数量",
			dataIndex : "unuseCounts"
		}, {
			width : 40,
			header : "状态",
			dataIndex : "statusName",
			/*hidden : false,*/
			renderer : function(n) {
				if (n == "闲置") {
					return n;
				} else {
					return "<font face='宋体' color='red'>" + n + "</font>";
				}
			}
		} ]
	};
	ComponentListView.superclass.constructor.call(this, Ext.apply({
		id : "ComponentListView",
		title : TabTitle.COMPONENT_LIST,
		iconCls : "menu-business-component",
		url : __ctxPath + "/archive/listComponent.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ComponentListView, Knight.ux.SearchGridPanel, {
	getRowClass : function(record, rowIndex, rowParams, store) {
		if (Ext.isEmpty(record.data.parachuteFlag) || "1" != record.data.parachuteFlag || Ext.isEmpty(record.data.leftcageCheckDate)) {
			return;
		}
		var leftcageCheckDate = Date.parseDate(record.data.leftcageCheckDate, "Y-m-d");
		var days = ((new Date()).getTime() - leftcageCheckDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
		if (0 < days && days < 30) {
			var task = new Ext.util.DelayedTask(function() {
				this.dataGridPanel.getView().addRowClass(rowIndex, "x-grid-back-red");
			}.createDelegate(this));
			task.delay(10);
		}
	},
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ComponentAdd")) {
			tbarItems.push({
				id : ListViewButtonsId.componentAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addComponent.createDelegate(this)
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "复制",
				handler : this.copyComponent.createDelegate(this)
			});
		}
		if (isGranted("_ComponentEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editComponent.createDelegate(this)
			});
		}
		if (isGranted("_ComponentMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delComponent.createDelegate(this)
			});
		}
		if (isGranted("_ComponentConfirm")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "确认",
				handler : this.confirmComponent.createDelegate(this)
			});
		}

		tbarItems.push("->");
		if (isGranted("_ComponentExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportComponent.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, v) {
		var msg1 = "请选择要【" + op + "】的零配件信息！";
		var msg2 = "您确认要【" + op + "】所选的零配件信息吗？";
		var msg3 = "成功【" + op + "】所选的零配件信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, v);
	},
	readComponent : function(a) {
		new ComponentForm(a, {
			baseWidth : 0.28
		}).show();
	},
	readStoreDetail : function(a) {
		new StoreDetailForm(a, {
			baseWidth : 0.28
		}).show();
	},
	addComponent : function() {
		new ComponentForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	copyComponent : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【复制】的记录！");
			return;
		}
		new ComponentForm(a[0].data, {
			copyable : true,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editComponent : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new ComponentForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},

	delComponent : function() {
		this.speciallyGridAction(this.dataGridPanel, "componId", __ctxPath + "/archive/multiDelComponent.do", "删除", function(a) {
			if ("1" == a.status) {
				$toast("已确认零配件不能删除！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	//确定
	confirmComponent : function() {
		this.speciallyGridAction(this.dataGridPanel, "componId", __ctxPath + "/archive/confirmComponent.do", "确定");
	
	},
	exportComponent : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportComponent.do", this.dataGridPanel);
	},

});