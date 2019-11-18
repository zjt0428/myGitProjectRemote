var ProfileForm = function() {
	if (curUserInfo.keyFlag == "1") {
		this.appUserIkeyGrid = new Ext.grid.GridPanel({
			title : "密钥信息",
			width : 640,
			height : 200,
			colspan : 2,
			ds : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + "/system/listCurrentKeyAppUserKey.do"
				}),
				reader : new Ext.data.JsonReader({
					root : "result",
					totalProperty : "totalCounts",
					fields : [ "keyId", "keyStatus", "keySerial", "distributeTime", "validPeriodTime", "expirationTime", "updateTime", "project" ]
				})
			}),
			cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), {
				header : "keyId",
				dataIndex : "keyId",
				hidden : true
			}, {
				header : "状态",
				dataIndex : "keyStatus",
				width : 40,
				renderer : function(f) {
					if (f == "1") {
						return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
					} else {
						return '<img title="禁用" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
					}
					return g;
				}
			}, {
				header : "密钥序列号",
				dataIndex : "keySerial",
				width : 160
			}, {
				header : "发放时间",
				dataIndex : "distributeTime",
				width : 100
			}, {
				header : "生效时间",
				dataIndex : "validPeriodTime",
				width : 100
			}, {
				header : "过期时间",
				dataIndex : "expirationTime",
				width : 100
			}, {
				header : "所属项目",
				dataIndex : "project",
				width : 100,
				renderer : function(n) {
					if (n == null) {
						return "";
					} else {
						return n.projectName;
					}
				}
			} ])
		});
	}
	var items = [ {
		xtype : "panel",
		frame : false,
		autoWidth : true,
		autoHeight : true,
		border : false,
		layout : "table",
		bodyStyle : "margin-top:5px;margin-left: 30px; background-color: transparent;",
		layoutConfig : {
			columns : 2
		},
		items : [ {
			xtype : "panel",
			width : 320,
			height : 240,
			title : "个人资料",
			layout : "form",
			style : "padding:3px 4px 1px 0px;",
			defaultType : "textfield",
			defaults : {
				width : 200
			},
			labelWidth : 75,
			labelAlign : "right",
			hideLabels : false,
			items : [ {
				xtype : "hidden",
				fieldLabel : "员工ID",
				name : "appUser.userId"
			}, {
				xtype : "hidden",
				fieldLabel : "所在部门编号",
				name : "appUser.department.depId"
			}, {
				fieldLabel : "登录账号",
				name : "appUser.username",
				readOnly : true
			}, {
				fieldLabel : "员工姓名",
				name : "appUser.fullname",
				allowBlank : false,
				blankText : "员工姓名不能为空!"
			}, {
				fieldLabel : "E-mail",
				name : "appUser.email",
				vtype : "email",
				allowBlank : false,
				blankText : "邮箱不能为空!",
				vtypeText : "邮箱格式不正确!"
			}, {
				fieldLabel : "所在部门",
				name : "appUser.department.depName",
				readOnly : true
			}, {
				fieldLabel : "登陆方式",
				xtype : "radiogroup",
				disabled : true,
				items : [ {
					boxLabel : "普通登陆",
					name : "appUser.keyFlag",
					inputValue : 0,
					checked : true
				}, {
					boxLabel : "证书登陆",
					name : "appUser.keyFlag",
					inputValue : 1
				} ]
			} ]
		}, {
			xtype : "panel",
			width : 320,
			height : 240,
			title : "扩展信息",
			layout : "form",
			style : "padding:3px 4px 1px 0px;",
			defaultType : "textfield",
			defaults : {
				width : 203
			},
			labelWidth : 75,
			labelAlign : "right",
			hideLabels : false,
			items : [ {
				fieldLabel : "性别",
				xtype : "combo",
				hiddenName : "appUser.sex",
				mode : "local",
				editable : false,
				triggerAction : "all",
				store : [ [ "1", "先生" ], [ "0", "女士" ] ],
				value : "1"
			}, {
				fieldLabel : "移动电话",
				maxLength : 16,
				xtype : "numberfield",
				name : "appUser.mobile"
			}, {
				fieldLabel : "联系电话",
				maxLength : 16,
				name : "appUser.phone"
			}, {
				fieldLabel : "联系地址",
				maxLength : 128,
				name : "appUser.address"
			}, {
				fieldLabel : "邮政编码",
				regex : /^\d{6}$|^\s*$/,
				name : "appUser.zip"
			} ]
		} ]
	} ];
	if (this.appUserIkeyGrid) {
		items.push(this.appUserIkeyGrid);
	}
	var tbar = new Ext.Toolbar({
		height : 30,
		items : [ {
			text : "保存",
			iconCls : "btn-save",
			handler : this.saveProfile.createDelegate(this)
		}, {
			text : "取消",
			iconCls : "btn-reset",
			handler : this.cancelProfile.createDelegate(this)
		}, {
			text : "修改密码",
			iconCls : "btn-password",
			handler : this.resetPassword.createDelegate(this)
		} ]
	});
	ProfileForm.superclass.constructor.call(this, {
		id : "ProfileForm",
		title : "个人资料",
		closable : true,
		iconCls : "menu-set-customer",
		border : false,
		autoScroll : true,
		labelAlign : "right",
		layout : "fit",
		tbar : tbar,
		defaultType : "textfield",
		url : __ctxPath + "/system/profileAppUser.do",
		reader : new Ext.data.JsonReader({
			root : "data"
		}, AppUserFieldMapping),
		items : items,
		listeners : {
			afterrender : this.loadFormData.createDelegate(this)
		}
	});
};
Ext.extend(ProfileForm, Ext.form.FormPanel, {
	loadFormData : function() {
		this.getForm().load({
			deferredRender : false,
			url : __ctxPath + "/system/getAppUser.do",
			waitMsg : "正在载入数据...",
			success : function(f, g) {
				var data = Ext.util.JSON.decode(g.response.responseText).data[0];
				if (data.department) {
					this.getForm().findField("appUser.department.depId").setValue(data.department.depId);
					this.getForm().findField("appUser.department.depName").setValue(data.department.depName);
				}
			}.createDelegate(this),
			failure : function(d, e) {
				$toast("载入失败");
			}
		});
	},
	saveProfile : function() {
		$formsubmit(this.getForm(), function(e, g) {
			$toast("保存成功！");
		}.createDelegate(this));
	},
	cancelProfile : function() {
		var c = Ext.getCmp("centerTabPanel");
		c.remove("ProfileForm");
	},
	resetPassword : function() {
		new ResetPasswordForm(curUserInfo.userId);
	}
});
