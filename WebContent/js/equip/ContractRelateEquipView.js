var ContractRelateEquipView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		} ];
	}
	var datagrid_config = {
		checkboxHidden : true,
		delayed_load : true,
		store : {
			fields :  ["flowId","equipment"],
		},
		columns : [{
			hidden : true,
			dataIndex : "flowId"
		}, {
			header : "状态",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.businessStatusName;
			}
		},  {
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备类别",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipCategoryName;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}]
	};
	ContractRelateEquipView.superclass.constructor.call(this, Ext.apply({
		id : "ContractRelateEquipView",
		title : "合同关联设备",
		url : __ctxPath + "/equip/listEquipFlow.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
//			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractRelateEquipView, Knight.ux.SearchGridPanel, {});