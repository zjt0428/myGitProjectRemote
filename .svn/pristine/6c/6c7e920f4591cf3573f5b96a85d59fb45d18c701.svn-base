var ComponIntoStoreSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "入库单号",
		name : "Q_serial_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ComponIntoStoreListViewField
		},
		columns : [ {
			header : "入库单号",
			dataIndex : "serial",
			
		},{
			header : "入库时间",
			dataIndex : "intoDate"
		},{
			header : "项目名称",
			dataIndex : "projectName"
		},{
			width : 50,
			header : "负责人",
			dataIndex : "principal"
		},{
			width : 50,
			header : "入库选择",
			dataIndex : "storeName"
		}]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : ComponIntoStoreListViewField,
			columns : [{
				header : "入库单号",
				dataIndex : "serial",
				
			},{
				header : "入库时间",
				dataIndex : "intoDate"
			},{
				header : "项目名称",
				dataIndex : "projectName"
			},{
				width : 50,
				header : "负责人",
				dataIndex : "principal"
			},{
				width : 50,
				header : "入库选择",
				dataIndex : "storeName"
			}]
		};
	}
	ComponIntoStoreSelector.superclass.constructor.call(this, {
		configView : {
			title : "配件物流"
		},
		source : {
			url : __ctxPath + "/equip/listComponIntoStore.do",
			base_params : this.params,
			search_config : {
				preLableHidden : true,
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(ComponIntoStoreSelector, Knight.ux.RelationSelector, {});