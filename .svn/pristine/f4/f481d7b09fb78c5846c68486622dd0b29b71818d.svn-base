var EquipReduceDetailListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.params.Q_relateModule_S_EQ = "EQUIP_DISMANTLE_REDUCE";
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "备案编号",
			name : "Q_equipment.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipment.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipment.project.projectName_S_LK"
		},{
			lable : "设备自编号",
			name : "Q_equipment.equipSerial_S_LK"
		},{
			lable : "执行人",
			name : "Q_executerName_S_LK"
		},{
			lable : "执行日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_executeDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_executeDate_S_LE"
		},{
			lable : "类型",
			name : "Q_relateModule_S_LK"
		},{
			lable : "设备类型",
			name : "Q_equipment.equipCategoryName_S_LK"
		},{
			lable : "项目经理",
			name : "Q_equipment.project.materialPractiName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readDetail
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var datagrid_config = {
		store : {
			fields : EquipAddReduceDetailListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [  {
			header : "项目名称",
			dataIndex : "equipment",
			renderer : function(n){
				return n.project.projectName;
			}
		},{
			header : "类型",
			dataIndex : "relateModule",
			renderer : function(n) {
				if(n=="EQUIP_INSTALL"){
					return '顶升加节';
				}else{
					return '拆卸降节';
				}
			}
		},{
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n){
				return n.equipSerial;
			}
		},{
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n){
				return n.equipExwSerial;
			}
		},
		{
			header : "设备类型",
			dataIndex : "equipment",
			renderer : function(n){
				return n.equipCategoryName;
			}
		},{
			header : "执行人",
			dataIndex : "executerName"
		}, {
			header : "执行日期",
			dataIndex : "executeDate"
		},
		{
			header : "项目经理",
			dataIndex : "equipment",
			renderer : function(n){
				if(n.project!=null){
					return n.project.materialPractiName;
				}else{
					return null;
				}
			}
		},{
			header : "拆卸的标准节数量",
			dataIndex : "knotDisQty"
		},{
			header : "拆卸的附墙数量",
			dataIndex : "wallAttacheDisQty"
		},
		{
			header : "拆卸的附墙杆数量",
			dataIndex : "wallAttachePoleQty"
		}, {
			header : "拆卸的附墙框数量",
			dataIndex : "wallAttacheFrameQty"
		} , {
			header : "安装高度",
			dataIndex : "installHeight"
		}  , {
			header : "当前安装高度",
			dataIndex : "currentinstallHeight"
		} , {
			header : "大臂长度",
			dataIndex : "brachium"
		} ]
	};
	
	EquipReduceDetailListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipReduceDetailListViewField",
		title : "拆卸降节",
		iconCls : "menu-business-verify",
		url : __ctxPath + "/archive/listEquipAddReduceDetail.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipReduceDetailListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的验收信息！";
		var msg2 = "您确认要【" + op + "】所选的验收信息吗？";
		var msg3 = "成功【" + op + "】所选的验收信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipAddReduceDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipAddReduceDel.createDelegate(this),				
			});
		}return tbarItems;},
	delEquipAddReduceDel : function() {
		this.speciallyGridAction(this.dataGridPanel, "addReduceId", __ctxPath + "/safety/multiDelEquipAddReduceDetail.do", "删除");
	},
	readDetail : function(a) {
		new EquipReduceForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});