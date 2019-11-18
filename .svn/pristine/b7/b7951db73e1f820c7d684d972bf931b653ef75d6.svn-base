var DispatchComponSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "调度主题",
		name : "Q_dispatchTheme_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : DispatchComponListViewField
		},
		columns : [ {
			header : "配件类型",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.componCategoryName==null ? record.data.component.COMPONCATEGORYNAME:record.data.component.componCategoryName;
			}
		}, {
			header : "设备型号",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.componSpecificName==null ? record.data.component.COMPONSPECIFICNAME:record.data.component.componSpecificName;
			}
		}, {
			header : "生产厂家",
			dataIndex : "equipVenderName",
			renderer : function(value, metadata, record) {
				console.info(record.data)
				return record.data.component.equipVenderName==null ? record.data.component.EQUIPVENDERNAME:record.data.component.equipVenderName;
			}
		}, {
			header : "配件名称",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.componGenericName==null? record.data.component.COMPONGENERICNAME:record.data.component.componGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.dimensions==null ? record.data.component.DIMENSIONS:record.data.component.dimensions;
			}
		},{
			header : "计量单位",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.calculate==null ? record.data.component.CALCULATE:record.data.component.calculate;
			}
		}, {
			header : "所在仓库",
			dataIndex : "storeName"
		}, {
			width : 60,
			header : "库存数量",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.storeCounts==null ? record.data.component.STORECOUNTS:record.data.component.storeCounts;
			}
		}, {
			header : "预计开始时间",
			dataIndex : "startDate",
			editor : new Ext.form.DateField({
				format : "Y-m-d",
				editable : false,
				allowBlank : false
			}),
			renderer : function(value, metadata, record) {
				if (typeof (value) == "string") {
					return value.substring(0, 10);
				}
				value = Ext.util.Format.date(value, "Y-m-d");
				record.data.component.startDate = value;
				return value;
			}
		}, {
			width : 60,
			header : "调拨数量",
			dataIndex : "iniCounts",
			editor : new Ext.form.NumberField({
			}),
			renderer : function(value, metadata, record) {
				if (this.saveable && value > record.get("component").consumeCounts) {
					Ext.Msg.alert("信息警告", "该类型配件库存不足!");
				}
				record.data.component.counts = value;
				return value;
			}
		}  ],
	};
	// =============================================this.favoritesPanel=======================================================//
	this.target_params = this.target_params ? this.target_params : {};
	Ext.apply(this.target_params, {
		limit : -1
	});
	var target = {
		title : "调度零配件选择",
		single : this.single,
		url : __ctxPath + "/dispatch/listComponDispatch.do",
		parent : "dispatch",
		fields : DispatchComponListViewField,
		params : this.target_params,
		columns : [ {
			header : "配件编号",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.componSerial;
			}
		}, {
			header : "配件规格",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.dimensions;
			}
		}, {
			header : "配件类别",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.componCategoryName;
			}
		}, {
			header : "配件名称",
			dataIndex : "component",
			renderer : function(value, metadata, record) {
				return record.data.component.componGenericName;
			}
		}, {
			header : "预计进场时间",
			dataIndex : "startDate"
		} ]
	};
	DispatchComponSelector.superclass.constructor.call(this, {
		configView : {
			title : "调度零配件选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listComponDispatch.do",
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
Ext.extend(DispatchComponSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		var params = {
			"Q_dispatchId_L_EQ" : data.dispatchId
		};
		Ext.apply(params, this.target_params);
		this.targetPanel.getStore().baseParams = {};
		Ext.apply(this.targetPanel.getStore().baseParams, params);
		this.targetPanel.getStore().reload({
			params : params
		});
	}
});