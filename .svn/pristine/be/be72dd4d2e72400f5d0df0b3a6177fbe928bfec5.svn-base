var ProjectComponSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_status_S_EQ = "0";
	this.params.Q_counts_N_GT = 0;
	if(this.drop==true){
		this.title="请选择要降节的零配件";
		this.sourceUrl = __ctxPath + "/equip/loadCompondiarySetEquipInstall.do?installId=" + this.installId;
		this.fields = ["componDiaryId","projectId","componId","counts","statusName","component","component.dimensions","component.componCategoryName","component.componGenericName","component.equipVenderName","component.componSpecificName","component.componSerial","component.knotMetric","component.exwSerial","addFestival"]

	}		
	else if(this.drop==false){
		
		this.title="请选择要顶升的零配件";
		this.sourceUrl=__ctxPath + "/archive/componListProject.do";
		this.fields = ["projectComponId","projectId","componId","counts","statusName","component","component.dimensions","component.componCategoryName","component.componGenericName","component.equipVenderName","component.componSpecificName","component.componSerial","component.knotMetric","component.exwSerial","addFestival"]

	}
	else{
		this.title="请选择零配件";
	this.sourceUrl=__ctxPath + "/archive/componListProject.do";
	this.fields = ["projectComponId","projectId","componId","counts","statusName","component","component.dimensions","component.componCategoryName","component.componGenericName","component.equipVenderName","component.componSpecificName","component.componSerial","component.knotMetric","component.exwSerial","addFestival"]

	}
	this.params.ORDER_status_BY = "ASC";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	Ext.apply(this, {
		repertoryCategoryId : Ext.id()
	});
	var statusCombo = $initSimpleComboBoxField("状态", "Q_status_S_EQ", [ [ "", "全部" ], [ "0", "未使用" ], [ "1", "已使用" ] ], {
		width : 60,
		lable : "状态",
		allowBlank : true
//	    listeners: {
//	        afterRender: function(combo) {
//	        	  var firstValue = store.reader.jsonData[0].text;
//	        	  combo.setValue("0");
	              //同时下拉框会将与name为firstValue值对应的 text显示
//	         }
//			,select:function(combo,record,index){
//				//record你应该知道是什么吧，index呢？不知道就去看api
//				if(index==0){
//					curParams.Q_status_S_EQ = "";
//				}
//			}
//	    }
	});

	var componSpecificCombo = $initComboBoxField("规格型号", "Q_component.componSpecific_S_EQ", "componSpecific", {
		width : 160,
		lable : "设备型号",
		allowBlank : true,
		editable : true
	});
	var componGenericCombo = $initComboBoxField("配件名称", "Q_component.componGeneric_S_EQ", "componGeneric", {
		width : 160,
		lable : "配件名称",
		allowBlank : true,
		typeAhead: true,
		editable : true
	});
	var generalItems = [ statusCombo, componGenericCombo,componSpecificCombo, {
		lable : "归属设备",
		name : "Q_component.exwSerial_S_LK"
	}, {
		xtype : "treecombo",
		valId : this.repertoryCategoryId,
		allowBlank : false,
		width : 130,
		lable : "零配件类别",
		url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
		name : "componCategoryName"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			//fields : ["projectComponId","projectId","componId","counts","statusName","component","component.dimensions","component.componCategoryName","component.componGenericName","component.componSpecificName","component.componSerial","component.exwSerial","addFestival"]
			fields:this.fields
		},
		columns : [ {
			width : 40,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "配件名称",
			dataIndex : "component.componGenericName"
		}, {
			header : "配件规格",
			dataIndex : "component.dimensions"
		}, {
			header : "设备型号",
			dataIndex : "component.componSpecificName"
		},{
			header : "配件类别",
			dataIndex : "component.componCategoryName"
		}, {
			header : "生产厂家",
			dataIndex : "component.equipVenderName"
		},{
			header : "归属设备",
			dataIndex : "component.exwSerial"
		}, {
			header : "产品编号",
			dataIndex : "component.componSerial"
		}, {
			header : "数量",
			dataIndex : "counts"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选零配件",
			//single : this.single,
			collect : true,
			fields:this.fields,
			//fields : ["projectComponId","projectId","componId","counts","statusName","component","component.dimensions","component.componCategoryName","component.componGenericName","component.componSpecificName","component.componSerial","component.exwSerial","addFestival"],
			columns : [ {
				header : "安装数量",
				dataIndex : "addFestival"
			}, 
			{
				header : "配件规格",
				dataIndex : "component.dimensions"
			}, {
				header : "零部件名称",
				dataIndex : "component.componGenericName"
			} ]
		};
	}

	var searchActionItems = [];

	ProjectComponSelector.superclass.constructor.call(this, {
		configView : {
			title : this.title,
			width : 1200
		},
		source : {
			//url : __ctxPath + "/archive/componListProject.do",
			url:this.sourceUrl,
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
Ext.extend(ProjectComponSelector, Knight.ux.RelationSelector, {
	sourceRowdblclick : function(p, i) {
		var promptBox = "加节";
		if(this.drop){
			promptBox = "降节";
		}
		if(!this.drop){
			if(p.getStore().getAt(i).data.statusName == "在用"){
				$toast("所选取的零配件状态为【在用】,无法添加！");
				return;
			}
		}
		if(p.getStore().getAt(i).data.counts == 0){
			$toast("所选取的零配件项目库存为0,无法添加！");
			return;
		}
		if (!this.targetEnable) {
			return;
		}
		Ext.MessageBox.prompt("输入框","请输入"+promptBox+"数量",function(bu,txt){    
			if(p.getStore().getAt(i).data.counts <txt){
				$toast("所选取的零配件项目库存小于输入的"+promptBox+"数","无法添加！");
				return;
			}
			p.getStore().getAt(i).data.addFestival=txt;
			if(txt>p.getStore().getAt(i).data.counts){
				$toast("安装数量不得超过发货数量！");
				return;
			}
			if (!this.targetRemoteEnable) {
				var clickRow = p.getStore().getAt(i);
				this.addCollectStore(clickRow.data);
			} else {
				this.clickrowdb = p.getStore().getAt(i);
				this.targetRowdbReload(this.clickrowdb.data);
			}
		},this);
	}
});