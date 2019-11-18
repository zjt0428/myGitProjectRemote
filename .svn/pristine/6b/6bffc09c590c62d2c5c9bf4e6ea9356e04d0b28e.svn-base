var IndisSchemaSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_[project.projectName]_S_LK"
	}, {
		lable : "方案编号",
		name : "Q_schemaSerial_S_LK"
	}, {
		lable : "备案编号",
		name : "Q_[equipment.recordId]_S_LK"
	}, {
		lable : "出厂编号",
		name : "Q_[equipment.exwSerial]_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : IndisSchemaListViewField
		},
		columns : [ {
			header : "方案编号",
			dataIndex : "schemaSerial"
		}, {
			header : "填报日期",
			dataIndex : "providedDate"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(n) {
				return n.address;
			}
		}, {
			header : "使用单位",
			dataIndex : "emEntName"
		}, {
			header : "安装单位",
			dataIndex : "inEntName"
		}, {
			header : "楼号",
			dataIndex : "blockNumber"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : IndisSchemaListViewField,
			columns : [ {
				header : "方案编号",
				dataIndex : "schemaSerial"
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function(n) {
					return n.projectName;
				}
			}, {
				header : "楼号",
				dataIndex : "blockNumber"
			}, {
				header : "设备名称",
				dataIndex : "equipment",
				renderer : function(n) {
					return n.equipGenericName;
				}
			} ]
		};
	}
	IndisSchemaSelector.superclass.constructor.call(this, {
		configView : {
			title : "方案选择"
		},
		source : {
			url : __ctxPath + "/safety/listIndisSchema.do",
			base_params : this.params,
			search_config : {
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
Ext.extend(IndisSchemaSelector, Knight.ux.RelationSelector, {});