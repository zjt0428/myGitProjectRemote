var SafeCheckListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "楼号",
			name : "Q_buildingNum_S_LK"
		}, {
			lable : "检查人员",
			name : "Q_checkStaff_S_LK"
		},{
			lable : "检查时间",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_checkDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			width : 100,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_checkDate_DG_LE"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readSafeCheck
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : SafeCheckListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [  {
			header : "状态",
			dataIndex : "statusName",
			width : 20
		},{
			header : "项目名称",
			dataIndex : "projectName"
		},{
			header : "楼号",
			dataIndex : "buildingNum"
		},{
			header : "设备型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		},
		{
			header : "检查人员",
			dataIndex : "checkStaff"
		}, 
		{
			header : "检查时间",
			dataIndex : "checkDate"
		} ]
	};
	SafeCheckListView.superclass.constructor.call(this, Ext.apply({
		id : "SafeCheckListView",
		title : "安全检查",
		iconCls : "menu-business-detector",
		url : __ctxPath + "/safety/listSafeCheck.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SafeCheckListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SafeCheckAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSafeCheck.createDelegate(this)

			});
		}
		if (isGranted("_SafeCheckEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSafeCheck.createDelegate(this)
			});
		}
		if (isGranted("_SafeCheckMultiDelAll")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSafeCheck.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的检测信息！";
		var msg2 = "您确认要【" + op + "】所选的检测信息吗？";
		var msg3 = "成功【" + op + "】所选的检测信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readSafeCheck : function(a) {
		new SafeCheckForm(a, {
			baseWidth : 0.28
		}).show();
	},
	addSafeCheck : function() {
		new EquipSelector({
			single : true,
			params : {
				Q_status_S_EQ : "0"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/archive/loadEquipment.do",
					params : {
						equipId : data.equipId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						new SafeCheckForm({
							equipId : data.equipId,
							equip : data
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();

					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	editSafeCheck : function() {		
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		var statu = a[0].data.status;
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		} else if(statu == "3") {
			$toast("设备已整改，无法修改！");
			return;
		}
		new SafeCheckForm(a[0].data, {			
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delSafeCheck : function() {
		this.speciallyGridAction(this.dataGridPanel, "safeCheckId", __ctxPath + "/safety/multiDelAllSafeCheck.do", "删除",function(a) {
			if (a.status == "3") {
				$toast("已整改设备不能删除！");
				return;
			}
			return true;
		}.createDelegate(this));
	}
});