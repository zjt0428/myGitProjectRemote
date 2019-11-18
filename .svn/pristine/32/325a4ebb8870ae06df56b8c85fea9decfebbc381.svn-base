var MaterialsStoreByDateSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	this.fields = ["specificationsId","specifications","commodity","commodityId","quantity","unit","conversionNum","mnemonics" ]
	var generalItems = [ {
		lable : "品名",
		name : "commodity"
	},{
		lable : "规格",
		name : "specifications"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "specificationsId",
			sortDir : "desc",
			id : "specificationsId",
			fields : this.fields
		},
		columns : [ {
			header : "品名",
			dataIndex : "commodity"
		}, {
			header : "规格",
			dataIndex : "specifications"
		}, {
			header : "单位",
			dataIndex : "unit"
		}, {
			header : "数量",
			dataIndex : "quantity" 
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	var searchActionItems = [];
	if (this.collectEnable) {
		target = {
			title : "已选",
			single : this.single,
			collect : true,
			fields : this.fields,
			columns : [  {
				header : "品名",
				dataIndex : "commodity"
			},{
				header : "规格",
				dataIndex : "specifications"
			}, {
				header : "单位",
				dataIndex : "unit"
			} ]
		};
		searchActionItems.push({
			xtype : "button",
			iconCls : "btn-ok",
			text : "一键全选",
			handler : this.selectAll.createDelegate(this)
		});
	}
	MaterialsStoreByDateSelector.superclass.constructor.call(this, {
		configView : {
			title : "基地库存选择"
		},
		source : {
			url : __ctxPath + "/materials/getStoreBySelectedDateMaterialsStore.do",
			base_params : this.params,
			search_config : {
				preLableHidden : false,
				generalItems : generalItems,
				searchActionItems : searchActionItems
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
Ext.extend(MaterialsStoreByDateSelector, Knight.ux.RelationSelector, {
	
	selectAll : function() {
		//获取查询条件 params
		var params = this.sourcePanel.ownerCt.searchPanel.getForm().getValues(false);
		params.limit = this.sourcePanel.getStore().totalLength;
		params.start = 0;
		params.selectedDate = Ext.util.Format.date(params.selectedDate,"Y-m-d");
		var datas = $ajaxSyncCall(__ctxPath + "/materials/getStoreBySelectedDateMaterialsStore.do",params);
		var data= datas.result;
		for (var i = 0; i < data.length; i++) {
			this.addCollectStore(data[i]);
		}
	}
});