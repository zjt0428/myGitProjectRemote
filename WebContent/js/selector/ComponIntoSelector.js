var ComponIntoSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
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
	var generalItems = [ {
		lable : "零配件编号",
		name : "Q_component.componSerial_S_LK"
	}, componSpecificCombo, componGenericCombo ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ComponIntoStoreDetailViewField
		},
		columns : [ {
			header : "产品编号",
			dataIndex : "component",
			renderer : function(a, b, c) {
				return a.componSerial;
			}			
		}, {
			hidden : this.componCategoryNameHidden,
			header : "零配件类别",
			dataIndex : "component",
			renderer : function(a, b, c) {
				return a.componCategoryName;
			}
		}, {
			header : "零部件名称",
			dataIndex : "component",
			renderer : function(a, b, c) {
				return a.componGenericName;
			}
		}, {
			header : "设备型号",
			dataIndex : "component",
			renderer : function(a, b, c) {
				return a.componSpecificName;
			}
		}, {
			header : "配件规格",
			dataIndex : "component",
			renderer : function(a, b, c) {
				return a.dimensions;
			}
		}, {
			header : "计量单位",
			dataIndex : "component",
			renderer : function(a, b, c) {
				return a.calculate;
			}
		}, {
			header : "调配数量",
			dataIndex : "counts"
		}, {
			header : "已核实数量",
			dataIndex : ""
		} ],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.targetCollect) {
		target = {
			title : "调度零配件选择",
			single : this.single,
			collect : true,
			fields : ComponIntoStoreDetailViewField,
			columns : [ {
				header : "零部件名称",
				dataIndex : "component.componGenericName"
			}, {
				header : "设备型号",
				dataIndex : "component.componSpecificName"
			}, {
				header : "调配数量",
				dataIndex : "counts"
			} ]
		};
	}
	ComponIntoSelector.superclass.constructor.call(this, {
		configView : {
			title : "调度零配件选择"
		},
		source : {
			url : __ctxPath + "/equip/queryComponIntoStore.do",
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
Ext.extend(ComponIntoSelector, Knight.ux.RelationSelector, {});