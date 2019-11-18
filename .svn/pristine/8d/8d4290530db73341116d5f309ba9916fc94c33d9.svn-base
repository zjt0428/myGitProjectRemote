var EquipDismantleDetailListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
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
			name : "Q_project.projectName_S_LK"
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
			header : "执行人",
			dataIndex : "executerName"
		}, {
			header : "执行日期",
			dataIndex : "executeDate"
		},  {
			header : "变动的标准节数量",
			dataIndex : "knotNum"
		}, {
			header : "类型",
			dataIndex : "relateModule",
			renderer : function(n) {
				if(n=="EQUIP_INSTALL"){
					return '顶升加节';
				}else{
					return '拆卸降节';
				}
			}
		}, {
			header : "标准节总数",
			dataIndex : "knotCounts"
		}, {
			header : "附墙总数",
			dataIndex : "wallAttacheQty"
		} ]
	};
	
	EquipDismantleDetailListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipReduceDetailListViewField",
		title : TabTitle.TECHNICAL_DISCLOSURE_LIST,
		iconCls : "menu-business-verify",
		url : __ctxPath + "/archive/equipDismantleListEquipAddReduceDetail.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipDismantleDetailListView, Knight.ux.SearchGridPanel, {
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
		new EquipAddReduceForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});