var MaterialsInfoSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [{
		lable : "助记码",
		name : "Q_mnemonics_S_LK"
	}, {
		lable : "品名",
		name : "Q_materialsCommodity.commodity_S_LK"
	}, {
		lable : "规格",
		name : "Q_specifications_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "specificationsId",
			sortDir : "asc",
			id : "specificationsId",
			fields : [ "specificationsId", "specifications","mnemonics","materialsCommodity","firstUnitConversion","secondUnitConversion","firstConvertedQuantity","secondConvertedQuantity" ]
		},
		columns : [ {
			header : "品名",
			dataIndex : "materialsCommodity",
			width : 80,
			renderer : function(n){
				return n.commodity;
			}
		}, {
			header : "规格",
			dataIndex : "specifications"
		}, {
			header : "助记码",
			dataIndex : "mnemonics"
		}, {
			header : "租金核算单位",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.rentUnit;
			}
		}, {
			header : "日租金",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.dailyRent;
			}
		} , {
			header : "丢失赔偿单价",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.compensationCosts;
			}
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选周材",
			single : this.single,
			collect : true,
			fields : [ "specificationsId", "specifications","mnemonics","materialsCommodity","firstUnitConversion","secondUnitConversion","firstConvertedQuantity","secondConvertedQuantity" ],
			columns : [ {
				width : 80,
				header : "品名",
				dataIndex : "materialsCommodity",
				renderer : function(n){
					return n.commodity;
				}
			}, {
				width : 80,
				header : "规格",
				dataIndex : "specifications"
			}, {
				width : 80,
				header : "助记码",
				dataIndex : "mnemonics"
			} ]
		};
	}

	MaterialsInfoSelector.superclass.constructor.call(this, Ext.apply({
		configView : {
			title : "周材选择"
		},
		source : {
			id : "MaterialsInfoListView",
			iconCls : "menu-set-department",
			url : __ctxPath + "/materials/findMaterialsInfo.do",
			base_params : this.params,
			search_config : {
				preLableHidden : true,
				generalItems : generalItems
			},
			datagrid_view : {
				title : "周材基本信息",
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	},a));
};
Ext.extend(MaterialsInfoSelector, Knight.ux.RelationSelector, {
//	sourceRowdblclick : function(p, i) {
//	    var a = this;
//		if(p.getStore().getAt(i).data.counts == 0){
//			$toast("所选取的零配件项目库存为0,无法添加！");
//			return;
//		}
//		if (!this.targetEnable) {
//			return;
//		}
//		var clickRow = p.getStore().getAt(i);
//	    Ext.MessageBox.prompt('调配数量','请输入数量',function(btn,text){
//          if(text==0||text==null||text==''||!IsNum(text)){
//              Ext.Msg.alert("注意！","请输入配件调度数量");
//              return;
//          }
//          clickRow.data.counts = text;
//          a.addCollectStore(clickRow.data);
//      });
//	}
});