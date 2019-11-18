var ScrapApplySelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "申请单号",
		name : "Q_scrapSerial_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ScrapApplyListViewField
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "申请人",
			dataIndex : "userName"
		},{
			width : 300,
			header : "申请单号",
			dataIndex : "scrapSerial"
		}, {
			width : 300,
			header : "报废主题",
			dataIndex : "scrapTheme"
		}, {
			width : 300,
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			width : 300,
			header : "库位",
			dataIndex : "storageLocation"
		}],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	ScrapApplySelector.superclass.constructor.call(this, {
		configView : {
			title : "报废申请"
		},
		source : {
			url : __ctxPath + "/stock/listScrapApply.do",
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
Ext.extend(ScrapApplySelector, Knight.ux.RelationSelector, {
});