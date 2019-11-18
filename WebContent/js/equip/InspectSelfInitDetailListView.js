var InspectSelfInitDetailListView = function(a,b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {};
	this.params["Q_inspectSelfInit.initId_L_EQ"] = this.initId;
	this.params.inspectType = this.inspectType;
	this.params.initId = this.initId;
	Ext.apply(this.params, (a && a.params) || {});
	// ===============================================================================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "内容",
			editable : false,
			xtype : "textfield",
			name : "Q_detailContent_S_LK"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : InspectSelfInitDetailListViewField,
			sort : "initDetailId"
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "标准内容",
			dataIndex : "detailContent"
		}]
	};
	InspectSelfInitDetailListView.superclass.constructor.call(this, Ext.apply({
		id : "InspectSelfInitDetailListView",
		title : "内容明细",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		customable : true,
		url : __ctxPath + '/equip/listDetailInspectSelfInit.do',
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InspectSelfInitDetailListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InitDetailAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInitDetail.createDelegate(this)
			});
		}
		if (isGranted("_InitDetailEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInitDetail.createDelegate(this)
			});
		}
		if (isGranted("_InitDetailDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.mutilDisableSelections.createDelegate(this)
			});
		}
		return tbarItems;
	},
	addInitDetail : function() {
		if(this.params.initId == null){
			$toast("请先点击一项分类明细！");
			return;
		}
		new InspectSelfInitDetailForm(null, {
			initId : this.params.initId,
			inspectType : this.params.inspectType,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editInitDetail : function(selections) {
		$editGridrowSelecte(this.dataGridPanel, null , function(a) {
			new InspectSelfInitDetailForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	mutilDisableSelections : function(){
		this.speciallyGridAction(this.dataGridPanel, "initDetailId", __ctxPath + "/equip/multiDelDetailInspectSelfInit.do", "删除");
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的自检项吗！";
		var msg2 = "您确认要【" + op + "】所选自检项吗？";
		var msg3 = "成功【" + op + "】所选自检项！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	
});