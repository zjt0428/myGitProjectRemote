var ComponentSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	Ext.apply(this, {
		repertoryCategoryId : Ext.id()
	});
	var statusCombo = $initSimpleComboBoxField("状态", "Q_status_S_EQ", [ [ "1", "闲置" ], [ "0", "在用" ], [ "", "全部" ] ], {
		width : 60,
		lable : "状态",
		allowBlank : true
	});
	var componSpecificCombo = $initComboBoxField("规格型号", "Q_componSpecific_S_EQ", "componSpecific", {
		width : 160,
		lable : "设备型号",
		allowBlank : true,
		editable : true
	});
	var componGenericCombo = $initComboBoxField("设备名称", "Q_componGeneric_S_EQ", "componGeneric", {
		width : 160,
		lable : "配件名称",
		allowBlank : true,
		editable : true
	});
	
	var generalItems = [ {
		xtype : "hidden",
		id : this.repertoryCategoryId,
		name : "Q_componCategory_S_EQ"
	}, statusCombo, componGenericCombo, {
		xtype : "treecombo",
		valId : this.repertoryCategoryId,
		allowBlank : false,
		width : 130,
		lable : "零配件类别",
		url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
		name : "componCategoryName"
	}, {
		lable : "配件型号",
		name : "Q_dimensions_S_LK"
	}, {
		lable : "归属设备",
		name : "Q_exwSerial_S_LK"
	}, {
		lable : "归属仓库",
		name : "Q_storeName_S_LK"
	}, componSpecificCombo ];
	
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ComponentListViewField
		},
		columns : [ {
			header : "零部件名称",
			dataIndex : "componGenericName"
		}, {
			header : "配件型号",
			dataIndex : "dimensions"
		}, {
			header : "设备型号",
			dataIndex : "componSpecificName"
				
		}, {
			header : "零配件类别",
			dataIndex : "componCategoryName"
		}, {
			header : "生产厂家",
			dataIndex : "equipVenderName"
		},{
			header : "归属设备",
			dataIndex : "exwSerial",
			hidden:this.antiFall?true:false
		}, {
			header : "单价",
			dataIndex : "unitprice",
			renderer : function(value, metadata, record) {
				var r =record.data.unitprice;
				var  num = r.indexOf(".");
				value = r.substring(0, num+3);
		            return value;
		    }
				
		} , {
			header : "归属仓库",
			dataIndex : "storeName"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选零配件",
			single : this.single,
			collect : true,
			fields : ComponentListViewField,
			columns : [{
                header : "调拨数量",
                dataIndex : "counts"
            }, {
				header : "配件规格",
				dataIndex : "dimensions"
			}, {
				header : "零部件名称",
				dataIndex : "componGenericName"
			} ]
		};
	}

	var searchActionItems = [];
	if (isGranted("_ComponentAdd")) {
		searchActionItems.push({
			xtype : "button",
			iconCls : "btn-head-add",
			text : "新增配件",
			handler : this.fireBusinessEvent.createDelegate(this, [ "ComponentListView", ListViewButtonsId.componentAdd ])
		});
	}
	ComponentSelector.superclass.constructor.call(this, {
		configView : {
			title : "零配件选择",
			width : 1400
		},
		source : {
			url : __ctxPath + "/archive/listComponent.do",
			base_params : this.params,
			current_params : this.current_params,
			search_config : {
				preLableHidden : true,
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
Ext.extend(ComponentSelector, Knight.ux.RelationSelector, {
    sourceRowdblclick : function(p, i) {
        var a = this;
        if (!this.targetEnable) {
            return;
        }
        if (!this.targetRemoteEnable) {
            var clickRow = p.getStore().getAt(i);
            Ext.MessageBox.prompt('调配数量','请输入数量',function(btn,text){
//                if(clickRow.data.consumeCounts<text&&!a.purchaseHidden){
//                    Ext.Msg.alert("注意！","调拨数量不能大于库存数量");
//                    return;
//                }
                if(text==0||text==null||text==''||!IsNum(text)){
                    Ext.Msg.alert("注意！","请输入配件调度数量");
                    return;
                }
                clickRow.data.counts = text;
                a.addCollectStore(clickRow.data);
            });
        } else {
            this.clickrowdb = p.getStore().getAt(i);
            a.targetRowdbReload(this.clickrowdb.data);
        }
    }
});