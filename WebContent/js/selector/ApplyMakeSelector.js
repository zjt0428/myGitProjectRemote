var ApplyMakeSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "项目名称",
			name : "Q_applyforState_S_LK"
		}, {
			lable : "制单人",
			name : "Q_makeMan_S_LK"
		}, {
			lable : "制作主题",
			name : "Q_makeTheme_S_LK"
		}, {
			lable : "仓库名称",
			name : "Q_storeName_S_LK"
		}, {
			lable : "制作日期",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_makeDate_S_GE"
		}, {
			lable : "至",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_makeDate_S_LE"
		} ];
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				fields : ApplyMakeListViewField
			},
			columns : [ {
				width : 60,
				header : "状态 ",
				dataIndex : "applyforStateName"
			}, {
				header : "制作单号",
				dataIndex : "makeSerial"
			}, {
				header : "制作主题",
				dataIndex : "makeTheme"
			}, {
				header : "制作日期",
				dataIndex : "makeDate"
			}, {
				header : "制单人",
				dataIndex : "makeMan"
			}, {
				header : "仓库名称",
				dataIndex : "storeName"
			}, {
				header : "计划完成时间",
				dataIndex : "completeDate"
			} ]
	}
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选制作申请",
				single : this.single,
				collect : true,
				fields : ApplyMakeListViewField,
				columns : [{
					header : "制作单号",
					dataIndex : "makeSerial"
				}, {
					header : "制作主题",
					dataIndex : "makeTheme"
				}, {
					header : "制作日期",
					dataIndex : "makeDate"
				}, {
					header : "制单人",
					dataIndex : "makeMan"
				}, {
					header : "仓库名称",
					dataIndex : "storeName"
				}]
		}
	}
	
	ApplyMakeSelector.superclass.constructor.call(this, {
		configView : {
			title : "制作申请"
		},
		source : {
			url : __ctxPath + "/daily/listApplyMake.do",
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
}
Ext.extend(ApplyMakeSelector, Knight.ux.RelationSelector, {});