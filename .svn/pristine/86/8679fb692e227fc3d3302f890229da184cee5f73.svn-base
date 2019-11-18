var LeaseApplicationSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "供应单位",
			name : "Q_suppliers_S_LK"
		}, {
			lable : "申请单位",
			name : "Q_applyingUnit_S_LK"
		}, {
			lable : "租借主题",
			name : "Q_leaseTheme_S_LK"
		}];
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				fields : LeaseApplicationListViewField
			},
			columns : [{
				header : "单据编号",
				dataIndex : "applicationSerial"
			}, {
				header : "租借主题",
				dataIndex : "leaseTheme"
			}, {
				header : "申请人",
				dataIndex : "userName"
			}, {
				header : "申请日期",
				dataIndex : "fillDate"
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function (n) {
					return n.projectName;
				}
			}, {
				header : "申请单位",
				dataIndex : "applyingUnit"
			}, {
				header : "供应单位 ",
				dataIndex : "suppliers"
			}]
	}
	// ==================================this.favoritesPanel=============================================//
	LeaseApplicationSelector.superclass.constructor.call(this, {
		configView : {
			title : "租借申请"
		},
		source : {
			url : __ctxPath + "/materials/listLeaseApplication.do",
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
		}
	});
}
Ext.extend(LeaseApplicationSelector, Knight.ux.RelationSelector, {});