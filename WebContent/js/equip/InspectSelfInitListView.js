var InspectSelfInitListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_inspectType_S_EQ"] = this.typeId;
	this.typeId= this.typeId;
	var tis = this;
	Ext.apply(this.params, (a && a.params) || {});
	// =======================================================================================================//
	var generalItems = null;
	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readInspect
	}, {
		iconCls : "btn-head-add",
		qtip : "添加以应用",
		handler : this.addChoose
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : InspectSelfInitListViewField,
			sortDir : "asc"
		},
		tbarItems : tbarItems,
		rowAction : {
			actionItems : actionItems
		},
		columns : [{
			header : "分类",
			dataIndex : "inspectItem"
		} ]
	};
	this.inspectSelfChooseListView = new InspectSelfChooseListView({
		params:{
			"Q_inspectType_S_EQ" : this.typeId
		}
	});
	this.readChoosePanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 800,
		maxSize : 800,
		region : "east",
		split : true,
		collapsed : false,
		collapseMode : "mine",
		items : [ this.inspectSelfChooseListView ]
	});
	this.inspectSelfInitDetailListView = new InspectSelfInitDetailListView({});
	this.readInspectPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		height : 300,
		width : 250,
		maxSize : 250,
		region : "south",
		split : true,
		collapsed : false,
		collapseMode : "mine",
		items : [ this.inspectSelfInitDetailListView]
	});
	InspectSelfInitListView.superclass.constructor.call(this, Ext.apply({
		id : this.id,
		title : "检查项目初始化",
		iconCls : this.typeId=="1"?"menu-business-tower":"menu-business-lift",
//		object : "inspectInit",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		customable : true,
		url : __ctxPath + "/equip/listInspectSelfInit.do",
		datagrid_config : datagrid_config,
		items : [this.readChoosePanel, this.readInspectPanel]
	}, a));
	this.inspectSelfChooseListView.getDataGridPanel().getStore().load();
};
Ext.extend(InspectSelfInitListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InitAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInit.createDelegate(this)
			});
		}
		if (isGranted("_InitEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInit.createDelegate(this)
			});
		}
		if (isGranted("_InitDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.mutilDisableSelections.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的项目工程！";
		var msg2 = "您确认要【" + op + "】所选项目工程吗？";
		var msg3 = "成功【" + op + "】所选项目工程！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
//	readInspect : function(data) {
//		new InspectInitForm(data).show();
//	},
	readInspect : function(a) {
		this.readInspectPanel.expand();
		var params = {
			"Q_inspectSelfInit.initId_L_EQ" : a.initId,
			"initId" : a.initId,
			"inspectType" : this.typeId
		};
//		this.inspectSelfInitDetailListView.initId = a.initId;
//		this.inspectSelfInitDetailListView.inspectType = a.inspectType;
		Ext.apply(this.inspectSelfInitDetailListView.getDataGridPanel().getStore().baseParams, params);
		this.inspectSelfInitDetailListView.getDataGridPanel().getStore().load();

	},
	readChoose : function(a) {
		this.readChoosePanel.expand();
		var params = {
			"Q_inspectType_S_EQ" : a.inspectType
		};
//		this.inspectSelfChooseListView.initId = a.initId;
//		this.inspectSelfChooseListView.inspectType = a.inspectType;
		Ext.apply(this.inspectSelfChooseListView.getDataGridPanel().getStore().baseParams, params);
		this.inspectSelfChooseListView.getDataGridPanel().getStore().load();
	},
	addChoose : function(a) {
		var me = this;
		var typeId = this.typeId;
		Env.request({
			url: __ctxPath+'/equip/saveInspectSelfChoose.do?initId='+a.initId+"&inspectType="+this.typeId,
			async : false,
			success : function(r, o) {
				var resp = Ext.util.JSON.decode(r.responseText);
				if(resp["success"] === false){
					$toast(resp["msg"]);
					return;
				}
				$toast("添加成功！");
				me.readChoose({
					inspectType : typeId
				});
			},
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
		});
		
	},
	addInit : function() {
		new InspectSelfInitForm(null, {
			inspectType : this.typeId,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editInit : function(selections) {
		$editGridrowSelecte(this.dataGridPanel, null , function(a) {
			new InspectSelfInitForm(a.data, {
				inspectType : this.typeId,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	mutilDisableSelections : function(){
		this.speciallyGridAction(this.dataGridPanel, "initId", __ctxPath + "/equip/multiDelInspectSelfInit.do", "删除");
		this.inspectSelfInitDetailListView.getDataGridPanel().getStore().removeAll();
		this.inspectSelfInitDetailListView.getDataGridPanel().getStore().load();
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的自检项吗！";
		var msg2 = "该操作将同时删除所有对应的标准内容，您确认要【" + op + "】所选自检项吗？";
		var msg3 = "成功【" + op + "】所选自检项！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
});