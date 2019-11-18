var VerifyItemSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_[I.DEL_FLAG]_S_EQ"] = "1";
	this.params["Q_I.LEVEL_N_EQ"] = this.level;
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "检测项目",
		name : "Q_[I.ITEM_NAME]_S_LK"
	}, {
		lable : "检测要求",
		name : "Q_[D.DEMAND_DES]_S_LK"
	} ];
	var columns = [ {
		header : "项目要求ID",
		dataIndex : "DEMAND_ID",
		hidden : true
	}, {
		width : 70,
		header : "项目类别",
		dataIndex : "VITEM_TYPE_NAME"
	} ];
	if (this.level === 2) {
		columns.push({
			width : 70,
			header : "检测项目分类",
			dataIndex : "PARENT_ITEM_NAME"
		});
	}
	columns.push({
		width : 80,
		header : "检测项目名称",
		dataIndex : "ITEM_NAME"
	}, {
		width : 240,
		header : "项目要求内容",
		dataIndex : "DEMAND_DES",
		renderer : function(value, meta, record) {
			meta.attr = 'style="white-space:normal;"';
			return value;
		}
	})
	VerifyItemSelector.superclass.constructor.call(this, {
		configView : {
			title : "检测项目及要求选择"
		},
		source : {
			url : __ctxPath + "/verify/listSelectVerifyItem.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				autoExpandColumn : "DEMAND_DES",
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : {
				store : {
					id : "DEMAND_ID",
					fields : [ "DEMAND_ID", "VITEM_TYPE_NAME", "PARENT_ITEM_NAME", "ITEM_NAME", "LEVEL", "DEMAND_DES" ]
				},
				columns : columns
			}
		}
	});
};
Ext.extend(VerifyItemSelector, Knight.ux.RelationSelector, {});