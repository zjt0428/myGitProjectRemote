var VerifyItemDemandGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "检验要求",
		dataIndex : "demandDes",
		renderer : function(value, meta, record) {
			meta.attr = 'style="white-space:normal;"';
			return value;
		}
	} ];
	var tbarItems = [];
	if (this.saveable) {
		if (isGranted("_VerifyItemDemandAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addVerifyItemDemand.createDelegate(this)
			});
		}
		if (isGranted("_VerifyItemDemandEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editVerifyItemDemand.createDelegate(this)
			});
		}
		if (isGranted("_VerifyItemDemandMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delVerifyItemDemand.createDelegate(this)
			});
		}
	}
	VerifyItemDemandGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		selectable : true,
		title : "检验项目要求",
		option : "检验要求",
		tbarItems : tbarItems,
		height : this.height,
		loadurl : __ctxPath + "/verify/listDemandVerifyItem.do",
		delurl : __ctxPath + "/verify/multiDelDemandVerifyItem.do",
		base_params : {
			Q_itemId_L_EQ : "-1"
		},
		fields : VerifyItemDemandListViewField,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(VerifyItemDemandGrid, Knight.ux.SubModuleBaseGrid, {
	addVerifyItemDemand : function() {
		if (!this.itemName) {
			$toast("请选择要操作的检验项目！");
			return;
		}
		new VerifyItemDemandFormWindow({
			itemId : this.itemId,
			itemName : this.itemName
		}, {
			callback : function() {
				this.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editVerifyItemDemand : function() {
		if (!this.itemName) {
			$toast("请选择要操作的检验项目！");
			return;
		}
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		a[0].data.itemName = this.itemName;
		new VerifyItemDemandFormWindow(a[0].data, {
			callback : function() {
				this.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delVerifyItemDemand : function() {
		this.delSubModule();
	}
});
var VerifyItemDemandFormWindow = function(a, b) {
	Ext.apply(this, a);
	Ext.apply(this, b);
	var items = [ {
		xtype : "hidden",
		name : "demandId",
		value : this.demandId
	}, {
		xtype : "hidden",
		name : "itemId",
		value : this.itemId
	}, {
		xtype : "textfield",
		style : "margin : 5px 0px 0px 0px",
		fieldLabel : "所属检验项目",
		width : 200,
		labelStyle : "text-align:right;padding: 8px 0px 0px 0px;",
		disabled : true,
		value : this.itemName
	}, {
		id : "verifyItemDemand_demandDes",
		xtype : "textarea",
		style : "margin : 5px 0px 0px 0px",
		fieldLabel : "检验要求内容",
		width : 200,
		labelStyle : "text-align:right;padding: 8px 0px 0px 0px;",
		allowBlank : false,
		value : this.demandDes
	} ];
	VerifyItemDemandFormWindow.superclass.constructor.call(this, {
		modal : true,
		width : 400,
		height : 200,
		layout : "form",
		title : "检验项目要求",
		buttonAlign : "center",
		bodyStyle : "padding:5px",
		items : items,
		buttons : [ {
			text : "保存",
			iconCls : "btn-save",
			scope : this,
			handler : this.saveVerifyItemDemand
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
Ext.extend(VerifyItemDemandFormWindow, Ext.Window, {
	saveVerifyItemDemand : function() {
		var c = Ext.getCmp("verifyItemDemand_demandDes").getValue();
		if (Ext.isEmpty(c)) {
			$toast("检验要求内容不能为空");
			return;
		}
		$request({
			url : __ctxPath + "/verify/saveDemandVerifyItem.do",
			params : {
				demandId : this.demandId,
				itemId : this.itemId,
				demandDes : c
			},
			success : function(d, e) {
				$toast("检验内容保存成功！");
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