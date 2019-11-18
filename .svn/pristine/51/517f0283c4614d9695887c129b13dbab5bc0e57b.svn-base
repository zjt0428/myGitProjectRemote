var EquipFlowComponDiarySelector = function(a) {
	Ext.apply(this, a || {});
	//this.params = {};

	//this.params.Q_counts_N_GT = "0";
	Ext.apply(this.params, a.params || {});

	// ====================================this.searchPanel===============================================//
	var componSpecificCombo = $initComboBoxField("设备型号", "Q_component.componSpecific_S_EQ", "componSpecific", {
		width : 100,
		lable : "设备型号",
		allowBlank : true
	});
	var componGenericCombo = $initComboBoxField("零部件名称", "Q_component.componGeneric_S_EQ", "componGeneric", {
		width : 100,
		lable : "零部件名称",
		allowBlank : true
	});
	var generalItems = [ componSpecificCombo, componGenericCombo, {
		lable : "归属设备",
		name : "Q_exwSerial_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ComponDiaryListViewField
		},
		columns : [ {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "产品编号",
			dataIndex : "componSerial",
            hidden : a.isWareHouse
		}, {
			hidden : this.componCategoryNameHidden,
			header : "零配件类别",
			dataIndex : "componCategoryName",
            hidden : a.isWareHouse
		},{
			header : "零部件名称",
			dataIndex : "componGenericName"
		}, {
			header : "归属设备",
			dataIndex : "exwSerial",
            hidden : a.isWareHouse
		}, {
			header : "设备型号",
			dataIndex : "componSpecificName",
            hidden : a.isWareHouse
		}, {
			header : "配件规格",
			dataIndex : "dimensions"
		}, {
			header : "计量单位",
			dataIndex : "calculate",
            hidden : a.isWareHouse
		}, {
			header : "调配数量",
			dataIndex : "counts"
		}, {
			header : "已核实数量",
			dataIndex : "acceptCounts"
		} ],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.targetCollect) {
		target = {
			title : a.title? a.title: "调度零配件选择",
			single : this.single,
			collect : true,
			fields : ComponDiaryListViewField,
			columns : [ {
				header : "零部件名称",
				dataIndex : "componGenericName"
			}, {
				header : "设备型号",
				dataIndex : "componSpecificName"
			}, {
				header : "调配数量",
				dataIndex : "counts"
			} ]
		};
	}
	EquipFlowComponDiarySelector.superclass.constructor.call(this, {
		configView : {
			title : a.title? a.title: "调度零配件选择"
		},
		source : {
			url : this.noRepet?__ctxPath + "/equip/noRepetListComponDiary.do":__ctxPath + "/equip/listComponDiary.do",
		//	url : __ctxPath + "/archive/componListProject.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : false,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(EquipFlowComponDiarySelector, Knight.ux.RelationSelector, {});