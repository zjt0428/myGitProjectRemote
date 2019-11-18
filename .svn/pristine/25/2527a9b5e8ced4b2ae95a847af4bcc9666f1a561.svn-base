var LeaseSettlementSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "合同编号",
			name : "Q_[leaseContract.leaseIdentifier]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}]
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				fields : LeaseSettlementListViewField
			},
			columns : [{
				header : "状态",
				dataIndex : "statusName"
			}, {
				header : "单据编号",
				dataIndex : "settlementSerial"
			}, {
				header : "合同编号",
				dataIndex : "leaseContract",
				renderer : function (n) {
					return n.leaseIdentifier;
				}
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function (n) {
					return n.projectName;
				}
			}, {
				header : "结算主题",
				dataIndex : "settlementTheme"
			}, {
				header : "起止时间",
				dataIndex : "startDate"
			}, {
				header : "截止时间",
				dataIndex : "endDate"
			}]
	}
	
	// ==================================this.favoritesPanel=============================================//
	
	LeaseSettlementSelector.superclass.constructor.call(this, {
		configView : {
			title : "租借结算"
		},
		source : {
			url : __ctxPath + "/materials/listLeaseSettlement.do",
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
Ext.extend(LeaseSettlementSelector, Knight.ux.RelationSelector, {});