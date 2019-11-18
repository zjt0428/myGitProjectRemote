var VerifyItemListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	this.vitemTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "VITEM_TYPE"
	});
	if (!this.searchDisenable) {
		var vitemTypeCombo = new Ext.ux.form.SimpleCombo({
			width : 100,
			allowBlank : true,
			lable : "项目类别",
			hiddenName : "Q_vitemType_S_EQ",
			codeData : this.vitemTypeData
		});
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_itemName_S_LK"
		}, vitemTypeCombo ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "检验要求",
		qtip : "加载检验要求",
		handler : this.loadVerifyItemDemand
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "path",
			sortDir : "desc",
			id : "itemId",
			fields : VerifyItemListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 80,
			header : "检验项目名称",
			dataIndex : "itemName"
		}, {
			width : 80,
			header : "所属项目分类",
			dataIndex : "itemParentName"
		}, {
			width : 80,
			header : "项目类别",
			dataIndex : "vitemTypeName"
		} ]
	};
	// =======================================检验要求面板==============================================//
	this.verifyItemDemandPanel = new VerifyItemDemandGrid(null, {
		saveable : !this.tbarDisenable,
		grid_config : {
			bbar : {
				pageSize : 25
			},
			grid_view : {
				autoHeight : false,
				width : 450,
				region : "east",
				split : true,
				collapseMode : "mini"
			}
		}
	});
	VerifyItemListView.superclass.constructor.call(this, {
		id : "VerifyItemListView",
		title : TabTitle.VERIFY_ITEM_LIST,
		iconCls : "menu-business-verifyitem",
		url : __ctxPath + "/verify/listVerifyItem.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [ this.verifyItemDemandPanel ]
	});
};
Ext.extend(VerifyItemListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			hidden : true,
			iconCls : "btn-head-add",
			text : "下级项目",
			qtip : "添加下级项目",
			handler : this.addVerifySubItem
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		if (record.data.level < 2) {
			action[1].hidden = false;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_VerifyItemAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addVerifyItem.createDelegate(this)
			});
		}
		if (isGranted("_VerifyItemEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editVerifyItem.createDelegate(this)
			});
		}
		if (isGranted("_VerifyItemMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delVerifyItem.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的检验项目！";
		var msg2 = "您确认要【" + op + "】所选检验项目吗？该检验项目所包含的下级项目也会一并删除!";
		var msg3 = "成功【" + op + "】所选检验项目！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	addVerifySubItem : function(a) {
		new VerifyItemFormWindow({
			vitemTypeData : this.vitemTypeData,
			vitemType : a.vitemType,
			vitemTypeName : a.vitemTypeName,
			parentItemId : a.itemId,
			parentItemName : a.itemName
		}, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadVerifyItemDemand : function(a) {
		this.verifyItemDemandPanel.getStore().baseParams = {
			Q_itemId_L_EQ : a.itemId
		};
		this.verifyItemDemandPanel.getStore().load();
		this.verifyItemDemandPanel.setTitle("[" + a.itemName + "]-检验项目要求");
		this.verifyItemDemandPanel.itemId = a.itemId;
		this.verifyItemDemandPanel.itemName = a.itemName;
	},
	addVerifyItem : function() {
		new VerifyItemFormWindow({
			vitemTypeData : this.vitemTypeData
		}, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editVerifyItem : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new VerifyItemFormWindow(a[0].data, {
			vitemTypeData : this.vitemTypeData,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delVerifyItem : function() {
		this.speciallyGridAction(this.dataGridPanel, "itemId", __ctxPath + "/verify/multiDelVerifyItem.do", "删除");
	}
});
var VerifyItemFormWindow = function(a, b) {
	Ext.apply(this, a);
	Ext.apply(this, b);
	this.vitemTypeCombo = new Ext.ux.form.SimpleCombo({
		width : 135,
		fieldLabel : "项目类别",
		labelStyle : "text-align:right;",
		hiddenName : "vitemType",
		name : "vitemTypeName",
		value : this.vitemType,
		codeData : this.vitemTypeData
	});
	var a = [ {
		xtype : "hidden",
		name : "itemId",
		value : this.itemId
	} ];
	if (this.parentItemId) {
		a.push({
			xtype : "hidden",
			name : "parentItemId",
			value : this.parentItemId
		}, {
			xtype : "textfield",
			style : "margin : 5px 0px 0px 0px",
			fieldLabel : "所属项目分类",
			width : 135,
			labelStyle : "text-align:right;padding: 8px 0px 0px 0px;",
			disabled : true,
			value : this.parentItemName
		});
		this.vitemTypeCombo.setReadOnly(true);
	}
	if (!Ext.isEmpty(this.itemId)) {
		this.vitemTypeCombo.setReadOnly(true);
	}
	a.push({
		id : "verifyItem_itemName",
		xtype : "textfield",
		style : "margin : 5px 0px 0px 0px",
		fieldLabel : "检验项目名称",
		width : 135,
		labelStyle : "text-align:right;padding: 8px 0px 0px 0px;",
		allowBlank : false,
		value : this.itemName
	});
	a.push(this.vitemTypeCombo);
	VerifyItemFormWindow.superclass.constructor.call(this, {
		modal : true,
		width : 400,
		height : this.parentItemId ? 200 : 150,
		layout : "form",
		title : "检验项目",
		buttonAlign : "center",
		bodyStyle : "padding:5px",
		items : [ a ],
		buttons : [ {
			text : "保存",
			iconCls : "btn-save",
			scope : this,
			handler : this.saveVerifyItem
		}, {
			text : "关闭",
			iconCls : "btn-close",
			scope : this,
			handler : function() {
				this.close();
			}
		} ]
	});
};
Ext.extend(VerifyItemFormWindow, Ext.Window, {
	loadData : function() {
		this.vitemTypeCombo.setRawValue(this.vitemTypeName);
	},
	saveVerifyItem : function() {
		var c = Ext.getCmp("verifyItem_itemName").getValue();
		if (Ext.isEmpty(c)) {
			$toast("检验项目名称为空");
			return;
		}
		var vitemTypeValue = this.vitemTypeCombo.getValue();
		$request({
			url : __ctxPath + "/verify/saveVerifyItem.do",
			params : {
				itemId : this.itemId,
				parentItemId : this.parentItemId,
				vitemType : vitemTypeValue,
				itemName : c
			},
			success : function(d, e) {
				$toast("检验项目保存成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this),
			failure : function(d, e) {
				$toast("操作出错，请联系管理员！");
				this.close();
			}.createDelegate(this)
		});
	}
});