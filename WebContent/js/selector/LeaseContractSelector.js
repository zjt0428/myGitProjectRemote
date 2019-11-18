var LeaseContractSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_status_S_GE = "3";
	Ext.apply(this.params, a.params || {});
	Ext.apply(this, {
		departmentId : Ext.id()
	});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			xtype : "hidden",
			id : this.departmentId,
			name : "Q_depId_L_EQ"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "合同主题",
			name : "Q_leaseTheme_S_LK"
		}, {
			lable : "合同编号",
			name : "Q_leaseIdentifier_S_LK"
		}, {
			lable : "租借单位",
			name : "Q_leaseUnit_S_LK"
		}, {
			xtype : "treecombo",
			maxLength : 32,
			width : 150,
			valId : this.departmentId,
			url : __ctxPath + "/system/listDepartment.do",
			lable : "管理部门",
			name : "depName"
		},{
			xtype : "areaCompositeField",
			defaultMargins : "11 2 0 0",
			style : {
				marginLeft : "855px"
			},
			skipLastItemMargin : false,
			provinceName :  "province",
			cityName : "city",
			countyName : "county"
		}]
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				fields : LeaseContractListViewField
			},
			columns : [{
				header : "状态",
				dataIndex : "statusName"
			}, {
				width :40,
				header : "合同流水号",
				dataIndex : "leaseSerial"
			}, {
				header : "合同编号",
				dataIndex : "leaseIdentifier"
			}, {
				header : "合同主题",
				dataIndex : "leaseTheme"
			}, {
				width : 120,
				header : "项目名称",
				dataIndex : "project",
				renderer : function(n) {
					return n.projectName;
				}
			}, {
				header : "承租单位",
				dataIndex : "lesseeUnit"
			}, {
				header : "租借单位",
				dataIndex : "leaseUnit"
			}, {
				header : "管理部门",
				dataIndex : "depName"
			}, {
				width : 120,
				header : "项目地址",
				dataIndex : "project",
				renderer : function(n) {
					return n.address;
				}
			}, {
				header : "签订日期",
				dataIndex : "signingDate"
			}]
	}
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	var searchActionItems = [];
	if (this.collectEnable) {
		target = {
				title : "已选租借合同",
				single : this.single,
				collect : true,
				rowNumWidth : 30,
				fields : LeaseContractListViewField,
				columns : [{
					header : "合同流水号",
					dataIndex : "leaseSerial"
				}, {
					header : "合同编号",
					dataIndex : "leaseIdentifier"
				}, {
					header : "项目名称",
					dataIndex : "project",
					renderer : function(n) {
						return n.projectName;
					}
				}]
		};
		
		searchActionItems.push({
			xtype : "button",
			iconCls : "btn-ok",
			text : "一键全选",
			handler : this.selectAll.createDelegate(this)
		});
	}

	LeaseContractSelector.superclass.constructor.call(this, {
		configView : {
			title : "租借合同"
		},
		source : {
			url : __ctxPath + "/materials/listLeaseContract.do",
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
}
Ext.extend(LeaseContractSelector, Knight.ux.RelationSelector, {
	selectAll : function() {
		var params = this.sourcePanel.ownerCt.searchPanel.getForm().getValues(false);
//		params.limit = this.sourcePanel.getStore().totalLength;
		Ext.apply(params,{
			"QUERY_ALL_WITHOUT_LIMIT" : "Y"
		});
		var datas = $ajaxSyncCall(__ctxPath + "/materials/listLeaseContract.do",params);
		var data= datas.result;
		for (var i = 0; i < data.length; i++) {
			this.addCollectStore(data[i]);
		}
	}
});