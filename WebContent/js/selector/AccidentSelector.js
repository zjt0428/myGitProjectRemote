var AccidentSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "事故编号",
		name : "Q_accidentSerial_S_LK"
	}, {
		lable : "备案编号",
		name : "Q_[equipment.recordId]_S_LK"
	}, {
		lable : "责任单位",
		name : "Q_responsibleUnit_S_LK"
	}, {
		lable : "事故类别",
		name : "Q_accidentCategory_S_LK"
	} ];
	var datagrid_config = {
		store : {
			fields : AccidentListViewField
		},
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 40,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>未结案</font>" : "已结案";
			}
		}, {
			header : "事故编号",
			dataIndex : "accidentSerial"
		}, {
			header : "登记日期",
			dataIndex : "providedDate"
		}, {
			header : "事故设备",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "事故责任单位",
			dataIndex : "responsibleUnit"
		}, {
			header : "事故级别",
			dataIndex : "accidentLevelName"
		},{
			header : "事故类别",
			dataIndex : "accidentCategory"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		} ]
	};
	AccidentSelector.superclass.constructor.call(this, {
		configView : {
			title : "事故登记"
		},
		source : {
			url : __ctxPath + "/safety/listAccident.do",
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
Ext.extend(AccidentSelector, Knight.ux.RelationSelector, {});