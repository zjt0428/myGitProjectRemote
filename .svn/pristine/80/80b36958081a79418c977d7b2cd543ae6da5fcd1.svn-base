var ProjectComponListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.params.Q_projectId_L_EQ = ""
	this.params.Q_counts_N_NEQ = "0"
	// =====================================================================//
	if (!this.searchDisenable) {
		var componSpecificCombo = $initComboBoxField("设备型号", "Q_component.componSpecific_S_EQ", "componSpecific", {
			lable : "设备型号",
			allowBlank : true
		});
		var componEquipVenderCombo = $initComboBoxField("生产厂家", "Q_component.equipVender_S_EQ", "equipVender", {
			editable : true,
			lable : "生产厂家",
			allowBlank : true
		});
		var generalItems = [componSpecificCombo,componEquipVenderCombo,
		{
			lable : "零配件编号",
			name : "Q_component.componSerial_S_LK"
		},{
			lable : "归属设备",
			name : "Q_component.exwSerial_S_LK"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : ["projectComponId","projectId","component.componSerial","component.componCategoryName","component.componGenericName","component.componSpecificName",,"component.equipVenderName","component.exwSerial","counts","statusName"]
		},
		tbarItems : tbarItems,
		columns : [ {
			header:"状态",
			dataIndex:"status",
			hidden : true
		},{
			header:"状态",
			dataIndex:"statusName"
		},{
			header : "产品编号",
			dataIndex : "component.componSerial"
		}, {
			header : "零配件类别",
			dataIndex : "component.componCategoryName"
		}, {
			header : "零部件名称",
			dataIndex : "component.componGenericName"
		}, {
			header : "设备型号",
			dataIndex : "component.componSpecificName"
		},{
			header : "生产厂家",
			dataIndex : "component.equipVenderName"
		},{
			header : "项目库存",
			dataIndex : "counts"
		} ]
	};
	ProjectComponListView.superclass.constructor.call(this, Ext.apply({
		id : "ProjectComponListView",
		title : "库存零配件",
		iconCls : "menu-business-component",
		url : __ctxPath + "/archive/componListProject.do",
		base_params : this.params,
		search_config : {
			collapsed : false,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ProjectComponListView, Knight.ux.SearchGridPanel, {
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
				handler : this.importComponent.createDelegate(this)
			});
		}
	
//		if (isGranted("_ComponentMultiDel")) {
//			tbarItems.push({
//				iconCls : "btn-head-del",
//				text : "删除",
//				handler : this.delComponent.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, v) {
		var msg1 = "请选择要【" + op + "】的零配件信息！";
		var msg2 = "您确认要【" + op + "】所选的零配件信息吗？";
		var msg3 = "成功【" + op + "】所选的零配件信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, v);
	},
	importComponent : function() {
		if (Ext.isEmpty(this.projectId)) {
			return;
		}
		new ComponentSelector({
			collectEnable : true,
			callback : function(d) {
				var e = Array();
				var counts =  Array();
				for (var i = 0; i < d.length; i++) {
					var map ={};
					map['id'] = d[i].data.componId;
					map['counts']  = d[i].data.counts;
					e.push(d[i].data.componId);
					counts.push(map);
				}
				$request({
					params : {
						projectId : this.projectId,
						ids : e,
						counts:Ext.util.JSON.encode(counts)
					},
					url : __ctxPath + "/archive/importComponentProject.do",
					success : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	delComponent : function() {
		this.speciallyGridAction(this.dataGridPanel, "componId", __ctxPath + "/archive/multiDelComponent.do", "删除", function(a) {
			if ("0" == a.status) {
				$toast("在用零配件不能删除！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	exportComponent : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportComponent.do", this.dataGridPanel);
	},
});