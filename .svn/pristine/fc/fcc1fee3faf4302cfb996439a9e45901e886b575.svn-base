var PractiDiaryListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_active_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});

	var currentTime = new Date();
	// ===================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "人员姓名",
			name : "Q_practiName_S_LK"
		}, {
			lable : "所属企业",
			name : "Q_corpName_S_LK"
		}, {
			lable : "启用时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_D_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startDate_D_LE"
		} ];
	}
	var datagrid_config = {
		store : {
			fields : PractiDiaryListViewField
		},
		columns : [ {
			header : "人员姓名",
			dataIndex : "practiName"
		}, {
			width : 70,
			header : "从业工种",
			dataIndex : "kindWorkName"
		}, {
			header : "手机号",
			dataIndex : "mobile"
		}, {
			width : 60,
			header : "岗位",
			dataIndex : "station"
		}, {
			header : "所属企业",
			dataIndex : "corpName"
		}, {
			header : "所属部门",
			dataIndex : "depName"
		}, {
			header : "进场日期",
			dataIndex : "startDate"
		}, {
			header : "退场日期",
			dataIndex : "endDate",
			renderer : function(value, metadata, record) {
				temp = Date.parseDate(value, "Y-m-d H:i:s");
				if (temp > currentTime) {
					if (value == "2079-06-06 00:00:00") {
						return "-"
					}
					return "<font face='宋体' color='red'>" + value + "</font>";
				} else {
					return value;
				}
			}
		}, {
			width : 60,
			header : "关联业务",
			dataIndex : "businessModuleName"
		}, {
			width : 60,
			header : "业务编号",
			dataIndex : "businessSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		} ]
	};
	PractiDiaryListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiDiaryListView",
		title : TabTitle.PRACTI_DIARY_LIST,
		iconCls : "menu-business-practidiary",
		url : __ctxPath + "/equip/listPractiDiary.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiDiaryListView, Knight.ux.SearchGridPanel, {});