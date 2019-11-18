var DispatchAllocateInitListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// ===================================================================//
	var tbarItems = [];
	this.initTopBarActionItems(tbarItems);
	var generalItems = null;
	var equipCategoryCombo = $initComboBoxField("配件类型", "Q_initStatus_S_EQ", "repertoryCategory", {
		lable : "配件类型",
		allowBlank : true
	});
	var equipSpecificCombo = $initComboBoxField("设备型号", "Q_equipSpecific_S_EQ", "equipSpecific", {
		editable : true,
		lable : "设备型号",
		allowBlank : true
	});
	generalItems = [ equipCategoryCombo,equipSpecificCombo ];
	var datagrid_config = {
		store : {
			fields : [ "disAllInitId","calculate", "quantity","initStatus","dimensions","equipSpecificName","equipVenderName","componGenericName","componCateGoryName","equipSpecific","initStatusName","repertoryCategory",]
	
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "配件类别",
			dataIndex : "initStatusName",
		},{
			header : "设备型号",
			dataIndex : "equipSpecificName",
		},  {
			header : "生产厂家",
			dataIndex : "equipVenderName",
		}, {
			header : "配件名称",
			dataIndex : "componGenericName",
		}, {
			header : "配件规格",
			dataIndex : "dimensions",
		},{
			header : "计量单位",
			dataIndex : "calculate",
		},  {
			header : "标配数量",
			dataIndex : "quantity",			
		}]
	};
	DispatchAllocateInitListView.superclass.constructor.call(this, Ext.apply({
		id : "DispatchAllocateInitListView",
		title :"配货清单",
		iconCls : "menu-archive-draft-manage",
		url : __ctxPath + "/form/listDispatchAllocateInit.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(DispatchAllocateInitListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function(tbarItems) {
		if (isGranted("_DispatchAllocateInitAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addDispatchAllocateT.createDelegate(this)
			});
		}
		if (isGranted("_DispatchAllocateInitEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editDispatchAllocate.createDelegate(this)
			});
		}
		if (isGranted("_DispatchAllocateInitMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delDispatchAllocate.createDelegate(this)
			});
		}
		
		
	},
	addDispatchAllocateT : function(){
		new DispatchAllocateInitForm({
				type: "Tower",
				title : "配货清单",
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
		}).show();
	},
	addDispatchAllocateT : function(){
		new DispatchAllocateInitForm({
			type: "Lift",
			title : "配货清单",
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的配置信息!";
		var msg2 = "您确认要【" + op + "】该配置信息吗?";
		var msg3 = "成功【" + op + "】该配置信息!";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	editDispatchAllocate : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new DispatchAllocateInitForm({
			disAllInitId :a[0].data.disAllInitId,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delDispatchAllocate : function() {
		this.speciallyGridAction(this.dataGridPanel, "disAllInitId", __ctxPath + "/form/multiDelDispatchAllocateInit.do", "删除");
	}
});