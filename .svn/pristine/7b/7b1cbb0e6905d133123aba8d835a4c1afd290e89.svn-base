var RiskSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "通知编号",
			name : "Q_riskSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		} ];
	}
	var datagrid_config = {
		store : {
			fields : RiskListViewField
		},
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 50,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>未反馈</font>" : "已反馈";
			}
		}, {
			header : "通知编号",
			dataIndex : "riskSerial"
		}, {
			header : "检查日期",
			dataIndex : "checkDate"
		}, {
			header : "整改设备",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "检查单位",
			dataIndex : "checkCustomName"
		}, {
			header : "整改负责人",
			dataIndex : "improvePerson"
		} ]
	};
	RiskSelector.superclass.constructor.call(this, {
		configView : {
			title : "整改反馈"
		},
		source : {
			url : __ctxPath + "/safety/listRisk.do",
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
Ext.extend(RiskSelector, Knight.ux.RelationSelector, {});