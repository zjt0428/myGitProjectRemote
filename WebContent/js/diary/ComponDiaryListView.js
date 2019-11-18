var ComponDiaryListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_active_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});

	var currentTime = new Date();
	// ===================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var componSpecificCombo = $initComboBoxField("规格型号", "Q_componSpecific_S_EQ", "componSpecific", {
			width : 75,
			lable : "规格型号",
			allowBlank : true
		});
		var componGenericCombo = $initComboBoxField("配件名称", "Q_componGeneric_S_EQ", "componGeneric", {
			width : 75,
			lable : "配件名称",
			editable : true,
			allowBlank : true
		});
		generalItems = [ componSpecificCombo, {
			lable : "零配件编号",
			name : "Q_componSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		}, componGenericCombo, {
			lable : "进场时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_D_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_D_LE"
		} ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "配件编号",
			name : "Q_componSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "RFID号",
			name : "Q_rfidCode_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "业务编号",
			name : "Q_businessSerial_S_LK"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "进场时间",
			leftFieldLabel : "Q_startDate_D_GE",
			rightFieldLabel : "Q_startDate_D_LE"
		}, {
			fieldType : "CODE_FIELD",
			fieldLabel : "规格型号",
			codeId : "componSpecific",
			name : "Q_componSpecific_S_EQ"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ComponDiaryListViewField
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "零配件编号",
			dataIndex : "componSerial"
		}, {
			header : "零配件类别",
			dataIndex : "componCategoryName"
		}, {
			header : "零配件名称",
			dataIndex : "componGenericName"
		}, {
			header : "调度数量",
			dataIndex : "counts"
		}, {
			header : "规格型号",
			dataIndex : "componSpecificName"
		}, {
			header : "进场时间",
			dataIndex : "startDate"
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
					return value;
				}
			}
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "单位",
			dataIndex : "calculate"
		}, {
			header : "调度人",
			dataIndex : "dispatchUserName"
		}, {
			width : 150,
			header : "项目名称",
			dataIndex : "projectName"
		} ]
	};
	ComponDiaryListView.superclass.constructor.call(this, Ext.apply({
		id : "ComponDiaryListView",
		title : TabTitle.COMPON_DIARY_LIST,
		iconCls : "menu-business-compondiary",
		url : __ctxPath + "/equip/listComponDiary.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ComponDiaryListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push("->");
		if (isGranted("_ComponDiaryExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportComponDiary.createDelegate(this)
			});
		}
		return tbarItems;
	},
	exportComponDiary : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportComponDiary.do", this.dataGridPanel);
	}
});