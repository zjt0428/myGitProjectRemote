	var AppUserForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=appUser", "所属部门", "appUser.depId",false);
	var userTypeCombo = $initComboBoxField("用户类别", "appUser.userType", "APPUSER_TYPE", {
		allowBlank : false,
		defaultValueIndex : 0
	});
	if (this.showikeyable) {
		this.appUserIkeyGrid = new Ext.grid.GridPanel({
			title : "密钥信息",
			width : 600,
			height : 120,
			colspan : 2,
			ds : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + "/system/listAppUserKey.do"
				}),
				reader : new Ext.data.JsonReader({
					root : "result",
					totalProperty : "totalCounts",
					fields : [ "keyId", "keyStatus", "keySerial", "distributeTime", "validPeriodTime", "expirationTime", "updateTime" ]
				})
			}),
			cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), {
				header : "keyId",
				dataIndex : "keyId",
				hidden : true
			}, {
				header : "状态",
				dataIndex : "keyStatus",
				width : 50,
				renderer : function(f) {
					var g = "";
					if (f == "1") {
						g += '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
					} else {
						g += '<img title="禁用" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
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
				width : 120
			}, {
				header : "生效时间",
				dataIndex : "validPeriodTime",
				width : 120
			}, {
				header : "过期时间",
				dataIndex : "expirationTime",
				width : 120
			} ])
		});
	}
	if (this.showRoleable) {
		this.appUserRoleSelector = new Ext.Panel({
			title : "用户角色",
			width : 600,
			autoScroll : true,
			colspan : 2,
			items : [ {
				xtype : "itemselector",
				id : "AppUserRoles",
				name : "AppUserRoles",
				disabled : this.appUserRolesdisable,
				fromLegend : "",
				imagePath : __ctxPath + "/ext3.4/ux/images/",
				multiselects : [ {
					id : "chooseRoles",
					legend : "可选角色",
					width : 290,
					height : 360,
					store : new Ext.data.SimpleStore({
						autoLoad : true,
						baseParams : {
							userId : this.userId,
							roleType : this.roleType
						},
						url : __ctxPath + "/system/chooseRolesAppUser.do",
						fields : [ "roleId", "roleName" ]
					}),
					displayField : "roleName",
					valueField : "roleId"
				}, {
					id : "selectedRoles",
					name : "selectedRoles",
					legend : "已有角色",
					width : 290,
					height : 360,
					store : new Ext.data.SimpleStore({
						autoLoad : true,
						baseParams : {
							userId : this.userId
						},
						url : __ctxPath + "/system/selectedRolesAppUser.do",
						fields : [ "roleId", "roleName" ]
					}),
					tbar : [ {
						text : "清除所选",
						handler : function() {
							this.getForm().findField("AppUserRoles").reset();
						}.createDelegate(this)
					} ],
					displayField : "roleName",
					valueField : "roleId"
				} ]
			} ]
		});
	}

	var items = [ {
		xtype : "panel",
		id : "AppUserMustInfo",
		width : 300,
		height : 260,
		title : "基本信息",
		layout : "form",
		style : "border-width:1px 1px 1px 1px; background-color:transparent; padding:1px 1px 1px 1px;",
		defaultType : "textfield",
		defaults : {
			width : 163
		},
		labelWidth : 90,
		labelAlign : "right",
		hideLabels : false,
		items : [ {
			xtype : "container",
			height : 5
		}, {
			fieldLabel : "登录账号",
			name : "appUser.username",
			allowBlank : false,
			blankText : "登录账号不能为空!"
		}, {
			fieldLabel : "登录密码",
			name : "appUser.password",
			inputType : "password",
			allowBlank : false,
			blankText : "登录密码不能为空!",
			value : "123456",
			listeners : {
				render : function(field) {
					Ext.QuickTips.init();
					Ext.QuickTips.register({
						target : field.el,
						text : "<font color='red'>默认密码为123456</font>"
					});
				}
			}
		}, {
			fieldLabel : "用户姓名",
			name : "appUser.fullname",
			allowBlank : false,
			blankText : "用户姓名不能为空!"
		}, {
			fieldLabel : "E-mail",
			name : "appUser.email",
			vtype : "email",
			allowBlank : false,
			blankText : "邮箱不能为空!",
			vtypeText : "邮箱格式不正确!"
		}, depSelector, {
			fieldLabel : "状态",
			hiddenName : "appUser.status",
			xtype : "combo",
			mode : "local",
			editable : false,
			triggerAction : "all",
			store : [ [ "1", "可用" ], [ "0", "禁用" ] ],
			value : 1
		}, {
			fieldLabel : "IKEY验证",
			hiddenName : "appUser.keyFlag",
			xtype : "combo",
			mode : "local",
			editable : false,
			triggerAction : "all",
			store : [ [ "1", "启用" ], [ "0", "关闭" ] ],
			value : 0
		}, {
            fieldLabel : "所属企业",
            name : "appUser.corpInfo.corpName",
            xtype : "relationCompositeField",
            relateModule : RelationModule.corp.relateModule,
            readOnly : true,
            allowBlank : true,
            importhandler : this.importCorpAccountArchives.createDelegate(this)
        }, {
			xtype : "hidden",
			name : "appUser.department.depId",
			id : "appUser.depId"
		} ]
	}, {
		xtype : "panel",
		width : 300,
		height : 260,
		style : "border-width:1px 1px 1px 1px; background-color:transparent; padding:1px 1px 1px 1px;",
		title : "扩展信息",
		layout : "form",
		defaultType : "textfield",
		labelWidth : 90,
		defaults : {
			width : 163
		},
		hideLabel : false,
		items : [ {
			xtype : "container",
			height : 5
		}, {
			fieldLabel : "性别",
			xtype : "combo",
			hiddenName : "appUser.sex",
			mode : "local",
			allowBlank : false,
			editable : false,
			triggerAction : "all",
			store : [ [ "1", "先生" ], [ "0", "女士" ] ],
			value : "1"
		}, {
			fieldLabel : "移动电话",
			maxLength : 16,
			allowBlank : false,
			xtype : "numberfield",
			name : "appUser.mobile"
		}, {
			fieldLabel : "联系电话",
			maxLength : 16,
			name : "appUser.phone"
		}, {
			fieldLabel : "邮政编码",
			regex : /[0-9]{6}|^\s*$/,
			name : "appUser.zip"
		}, {
			fieldLabel : "联系地址",
			name : "appUser.address",
			maxLength : 128
		}, {
			xtype : "datefield",
			fieldLabel : "录入时间",
			name : "appUser.createTime",
			format : "Y-m-d",
			editable : false,
			value : new Date(),
			length : 50
		}, userTypeCombo,/* {
		fieldLabel : "用户类别",
		name : "appUser.userTypeName",
		readOnly : true
	}, */ {
			fieldLabel : "员工编号",
			name : "appUser.userSerial"
		} ]
	} ];
	if (this.appUserIkeyGrid) {
		items.push(this.appUserIkeyGrid);
	}
	if (this.appUserRoleSelector) {
		items.push(this.appUserRoleSelector);
	}
	var tbarItems = null;
	if (this.resetPasswordable) {
		tbarItems = [ {
			text : "修改密码",
			iconCls : "btn-password",
			handler : function() {
				new ResetPasswordForm(a);
			}
		} ];
	}

	AppUserForm.superclass.constructor.call(this, {
		width : 660,
		title : this.fullname ? this.fullname + "-用户信息" : "新增用户信息",
		iconCls : "menu-set-customer",
		maximized:false,
		form_config : {
			labelWidth : 135,
			labelAlign : "right",
			layout : "table",
			defaultType : "textfield",
			layoutConfig : {
				columns : 2
			},
			object : "appUser",
			saveable : this.saveable,
			url : __ctxPath + "/system/saveAppUser.do",
			items : items,
			fieldMapping : AppUserFieldMapping,
			hiddenField : AppUserHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(AppUserForm, Knight.ux.FormPanelWindow, {
    importCorpAccountArchives : function(data){
        var fieldNames = [ "corpInfo.corpId","corpInfo.corpName" ];
        var values = [ data.corpId,data.corpName];
        this.setMultiFieldValue(fieldNames, values);
    },
	saveFormData : function() {
		var depId = this.getForm().findField("appUser.department.depId").value;
		if (Ext.isEmpty(depId)) {
			$toast("错误信息", "请选择用户所属部门!");
			return;
		}
		$formsubmit(this.getForm(), function(e, g) {
			$toast("保存成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this), function(e, f) {
			$toast("错误信息", f.result.msg);
			this.getForm().findField("appUser.username").setValue("");
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.userId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/system/getAppUser.do?userId=" + this.userId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					var i = getDateFromFormat(data.createTime, "yyyy-MM-dd HH:mm:ss");
					this.getForm().findField("appUser.createTime").setValue(new Date(i));
					if (data.department) {
						this.getForm().findField("appUser.depId").setValue(data.department.depId);
						this.getForm().findField("depTreeSelector").setValue(data.department.depName);
					}
					if (data.appUserKeySet && this.showikeyable) {
						this.appUserIkeyGrid.getStore().loadData(data.appUserKeySet);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
//			this.getForm().findField("appUser.userType").setValue(this.userType);
//			this.getForm().findField("appUser.userTypeName").setValue(this.userTypeName);
		}
	}
});
