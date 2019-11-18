var AutocraneSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var autocraneDependCombo = $initComboBoxField("汽车吊所属单位", "Q_autocraneDepend_S_EQ", "autocraneDepend", {
		width : 80,
		lable : "收款单位",
		allowBlank : true
	});
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_project.projectName_S_LK"
	}, {
		lable : "使用单位",
		name : "Q_emEntName_S_LK"
	},autocraneDependCombo ];
	var datagrid_config = {
		store : {
			fields : AutocraneListViewField
		},
		columns : [ {
			header : "填报日期",
			dataIndex : "providedDate"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.address;
			}
		}, {
			header : "使用单位",
			dataIndex : "emEntName"
		}, {
			header : "汽车吊所属单位",
			dataIndex : "autocraneDependName"
		}, {
			header : "费用合计",
			dataIndex : "autocraneAmount"
		}, {
			header : "已付金额",
			dataIndex : "paymentAmount"
		}, {
			header : "余额",
			dataIndex : "balanceAmount"
		}, {
			header : "状态",
			dataIndex : "effectiveName"
		} ]
	};
	AutocraneSelector.superclass.constructor.call(this, {
		configView : {
			title : "汽吊管理"
		},
		source : {
			url : __ctxPath + "/dispatch/listAutocrane.do",
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
Ext.extend(AutocraneSelector, Knight.ux.RelationSelector, {});