var UserSimpleSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_SN_EQ = "0";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "用户姓名",
		name : "Q_fullname_S_LK"
	}, {
		lable : "所在部门",
		name : "Q_department.depName_S_LK"
	} ];
	this.selectorItem = new Knight.ux.SearchGridPanel({
		searchable : true,
		url : __ctxPath + "/system/listAppUser.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_view : {
			enableHdMenu : false
		},
		datagrid_config : {
			single : this.single,
			store : {
				sortField : "userId",
				sortDir : "asc",
				id : "userId",
				fields : [ "userId", "username", "status", "fullname", "sex", "department", "createTime","mobile" ]
			},
			columns : [ {
				header : "状态",
				dataIndex : "status",
				width : 30,
				renderer : function(f) {
					if (f == "1") {
						return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
					} else {
						return '<img title="禁用" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
					}
				}
			}, {
				header : "登陆帐号",
				dataIndex : "username",
			}, {
				header : "用户名",
				dataIndex : "fullname",
			}, {
				header : "所属部门",
				dataIndex : "department",
				renderer : function(f) {
					if (f == null) {
						return "";
					} else {
						return f.depName;
					}
				}
			}, {
				header : "创建时间",
				dataIndex : "createTime"
			} ],
		}
	});
	UserSimpleSelector.superclass.constructor.call(this, {
		title : "选择用户",
		iconCls : "menu-set-user",
		layout : "fit",
		width : 750,
		height : 420,
		items : [ this.selectorItem ],
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		buttonAlign : "center",
		buttons : [ {
			iconCls : "btn-ok",
			text : "确定",
			handler : this.confirm.createDelegate(this)
		}, {
			text : "取消",
			iconCls : "btn-cancel",
			handler : this.cancel.createDelegate(this)
		} ]
	});
};
Ext.extend(UserSimpleSelector, Ext.Window, {
	confirm : function() {
		var data = this.selectorItem.getDataGridPanel().getSelectionModel().getSelections();
		if (data.length <= 0) {
			Ext.Msg.alert("信息提示", "请选择用户信息!");
			return;
		}
		if (this.callback) {
			this.callback.call(this, data);
		}
		this.close();
	},
	cancel : function() {
		this.close();
	}
});