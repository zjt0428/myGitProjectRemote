var EquipDiaryListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_active_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});

	var currentTime = new Date();
	// ===================================================================//
	var generalItems = null;
	var advancedItems = null;
	if (!this.searchDisenable) {
		var equipSpecificCombo = $initComboBoxField("规格型号", "Q_equipSpecific_S_EQ", "equipSpecific", {
			width : 100,
			lable : "规格型号",
			allowBlank : true
		});
		generalItems = [ equipSpecificCombo, {
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			lable : "RFID号",
			name : "Q_rfidCode_S_LK"
		} ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_rfidCode_S_LK",
			fieldLabel : "RFID号"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_businessSerial_S_LK",
			fieldLabel : "业务编号"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_equipVender_S_LK",
			fieldLabel : "制造厂家"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "启用时间",
			leftFieldLabel : "Q_startDate_D_GE",
			rightFieldLabel : "Q_startDate_D_LE"
		}, {
			fieldType : "CODE_FIELD",
			codeId : "equipGeneric",
			name : "Q_equipGeneric_S_EQ",
			fieldLabel : "设备名称"
		}, {
			fieldType : "CODE_FIELD",
			codeId : "equipSpecific",
			name : "Q_equipSpecific_S_EQ",
			fieldLabel : "规格型号"
		}, {
			fieldType : "CODE_TREE_FIELD",
			name : "Q_equipCategory_S_EQ",
			fieldLabel : "设备类别",
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : EquipDiaryListViewField
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "设备类别",
			dataIndex : "equipCategoryName"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "规格型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "启用日期",
			dataIndex : "activateDate"
		}, {
			header : "进场时间",
			dataIndex : "startDate",
			renderer : function(value, metadata, record) {
				return value.substr(0, 10);
			}
		}, {
			header : "退场日期",
			dataIndex : "endDate",
			renderer : function(value, metadata, record) {
				temp = Date.parseDate(value, "Y-m-d H:i:s");
				if (temp > currentTime) {
					if (value == "2079-06-06 00:00:00") {
						return "-"
					}
					return "<font face='宋体' color='red'>" + value + "</font>";
				} else {
					return value.substr(0, 10);
				}
			}
		}, {
			width : 60,
			header : "关联业务",
			dataIndex : "businessModuleName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		} ]
	};
	EquipDiaryListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipDiaryListView",
		title : TabTitle.EQUIP_DIARY_LIST,
		iconCls : "menu-business-equipdiary",
		url : __ctxPath + "/equip/listEquipmentDiary.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipDiaryListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push("->");
		if (isGranted("_EquipDiaryExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipDiary.createDelegate(this)
			});
		}
		return tbarItems;
	},
	exportEquipDiary : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipmentDiary.do", this.dataGridPanel);
	}
});