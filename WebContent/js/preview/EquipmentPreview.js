var EquipmentPreview = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	} ];
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.staticComponentEquipment.createDelegate(this)
	} ];
	var datagrid_config = {
		store : {
			fields : EquipmentListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		columns : [ {
			width : 40,
			header : "业务状态",
			dataIndex : "businessStatusName",
			renderer : function(n) {
				if (n == "正在使用") {
					return "<font face='宋体' color='blue'>" + n + "</font>";
				}
				if (n == "报停") {
					return "<font face='宋体' color='red'>" + n + "</font>";
				}
				return n;
			}
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目地址",
			dataIndex : "projectAddress"
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "最近维修时间",
			dataIndex : "latestRepairDate"
		}, {
			header : "最近安检时间",
			dataIndex : "latestInspectDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	EquipmentPreview.superclass.constructor.call(this, {
		configView : {
			title : "设备选择",
			buttons : []
		},
		source : {
			url : __ctxPath + "/archive/listEquipment.do",
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
		}
	});
};
Ext.extend(EquipmentPreview, Knight.ux.RelationSelector, {
	staticComponentEquipment : function(record) {
		$print(this.sourcePanel, function(a, b) {
			return __ctxPath + "/archive/printProject.do?formpage=ProjectEquipmentPreview&projectId=" + b.projectId + "&equipId=" + b.equipId;
		}, record);
	}
});