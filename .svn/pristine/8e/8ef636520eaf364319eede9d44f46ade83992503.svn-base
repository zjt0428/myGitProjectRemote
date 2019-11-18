var AnnexDetailSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "配件名称",
		name : "Q_componGenericName_S_LK"
	}, {
		lable : "配件类别",
		name : "Q_componCateGoryName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "joinId",
			sortDir : "asc",
			id : "joinId",
			fields : AnnexDetailListViewField
		},
		columns : [  {
			width : 100,
			header : "配件类别",
			dataIndex : "componCateGoryName"
		}, {
			width : 100,
			header : "生产厂家",
			dataIndex : "equipVenderName"
		}, {
			width : 80,
			header : "设备型号",
			dataIndex : "equipSpecificName"
		}, {
			width : 160,
			header : "配件名称",
			dataIndex : "componGenericName"
		}, {
			width : 160,
			header : "配件规格",
			dataIndex : "dimension"
		} , {
			width : 160,
			header : "计量单位",
			dataIndex : "calculate"
		} , {
			width : 160,
			header : "项目库存",
			dataIndex : "quantity"
		}  ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选清单",
				single : this.single,
				collect : true,
				fields : AnnexDetailListViewField,
				columns : [{
	                header : "配件名称",
	                dataIndex : "componGenericName"
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
	CorpSelector.superclass.constructor.call(this, {
		configView : {
			title : "附件清单选择"
		},
		source : {
			url : __ctxPath + "/materials/listOnProjectAnnexDetails.do",
			base_params : this.params,
			search_config : {
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

Ext.extend(AnnexDetailSelector, Knight.ux.RelationSelector, {
	
	 sourceRowdblclick : function(p, i) {
	        var a = this;
	        if (!this.targetEnable) {
	            return;
	        }
	        if (!this.targetRemoteEnable) {
	            var clickRow = p.getStore().getAt(i);
	            Ext.MessageBox.prompt('调配数量','请输入数量',function(btn,text){
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