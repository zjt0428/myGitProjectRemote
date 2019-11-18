var TechnicalDisclosureListView = function(a) {
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
		},{
			lable : "设备自编号",
			name : "Q_equipment.equipSerial_S_LK"
		} ,
		{
			lable : "交底人员",
			name : "Q_disclosureMan_S_LK"
		},{
			lable : "交底日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d H:i:s",
			name : "Q_disclosureDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d H:i:s",
			name : "Q_disclosureDate_S_LE"
		}, {
			lable : "交底类型",
			name : "Q_relateModule_S_LK"
		} ,
		{
			lable : "设备名称",
			name : "Q_equipment.equipGenericName_S_LK"
		} ,{
			lable : "项目经理",
			name : "Q_project.materialPractiName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadTechnicalDisclosure
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : TechnicalDisclosureListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [  {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, 
		{
			header : "交底类型",
			dataIndex : "relateModule",
			renderer : function(n) {
				if(n=="EQUIP_INSTALL"){
					return '整机安装交底';
				}else if(n=="EQUIP_INSTALL_ADD"){
					return '顶升交底';
				}else if(n=="EQUIP_DISMANTLE"){
					return '整机拆卸交底';
				}else {
					return '拆卸降节交底';
				}
			}
		},
		{
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		},{
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		},  {
			header : "交底人",
			dataIndex : "disclosureMan"
		}, {
			header : "交底日期",
			dataIndex : "disclosureDate"
		},{
			header : "项目经理",
			dataIndex : "project",
			renderer : function(n) {
				return n.materialPractiName;
			}
		} ]
	};
	TechnicalDisclosureListView.superclass.constructor.call(this, Ext.apply({
		id : "TechnicalDisclosureListView",
		title : TabTitle.TECHNICAL_DISCLOSURE_LIST,
		iconCls : "menu-business-verify",
		url : __ctxPath + "/safety/listTechnicalDisclosure.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(TechnicalDisclosureListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的验收信息！";
		var msg2 = "您确认要【" + op + "】所选的验收信息吗？";
		var msg3 = "成功【" + op + "】所选的验收信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_disclosureDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTechnicalDisclosure.createDelegate(this),				
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTechnicalDisclosure.createDelegate(this)
			});
		}
		return tbarItems;
	},
	loadTechnicalDisclosure : function(a) {
		new TechnicalDisclosureForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editTechnicalDisclosure : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new TechnicalDisclosureForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delTechnicalDisclosure : function() {
		this.speciallyGridAction(this.dataGridPanel, "disclosureId", __ctxPath + "/safety/multiDelTechnicalDisclosure.do", "删除");
	},
	addTechnicalDisclosure : function() {
		this.speciallyGridAction(this.dataGridPanel, "disclosureId", __ctxPath + "/safety/multiDelTechnicalDisclosure.do", "删除");
	},
	printTechnicalDisclosure : function(relate) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printTechnicalDisclosure.do?formpage=TechnicalDisclosure" + relate + "&disclosureId=" + a[0].data["disclosureId"];
		});
	}
});