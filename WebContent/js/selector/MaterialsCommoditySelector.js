var MaterialsCommoditySelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_commodity_S_LK"
		}];
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				fields : MaterialsCommodityListViewField
			},
			columns : [{
				header : "资产属性",
				dataIndex : "assetsProperty"
			}, {
				header : "品名",
				dataIndex : "commodity"
			}, {
				xtype : "checkcolumn",
				width : 24,
				header : "是否在用",
				dataIndex : "whetherUsing",
				renderer : function(v, p, record){
					p.css += ' x-grid3-check-col-td';
					if(v == "on") {
						v = '-on';
					} else {
						v = '';
					}
					return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
				}
			}, {
				header : "日租金",
				dataIndex : "dailyRent"
			}, {
				header : "租金核算单位",
				dataIndex : "rentUnit"
			}, {
				header : "丢失赔偿单价",
				dataIndex : "compensationCosts"
			}]
	}
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选周材",
				single : this.single,
				collect : true,
				fields : MaterialsCommodityListViewField,
				columns : [{
					header : "品名",
					dataIndex : "commodity"
				}, {
					header : "日租金",
					dataIndex : "dailyRent"
				}, {
					header : "租金核算单位",
					dataIndex : "rentUnit"
				}, {
					header : "丢失赔偿单价",
					dataIndex : "compensationCosts"
				}]
		}
	}
	var searchActionItems = [];
	
	MaterialsCommoditySelector.superclass.constructor.call(this, {
		configView : {
			title : "周材品名选择"
		},
		source : {
			url : __ctxPath + "/materials/listMaterialsCommodity.do",
			base_params : this.params,
			search_config : {
				searchActionItems : searchActionItems,
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

Ext.extend(MaterialsCommoditySelector, Knight.ux.RelationSelector, {});