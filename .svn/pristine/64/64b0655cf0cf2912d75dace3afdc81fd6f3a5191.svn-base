var AppUserKeyForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var currentDate = new Date();
	var a = [ {
		xtype : "hidden",
		name : "appUserKey.keyId"
	}, {
		xtype : "hidden",
		name : "appUserKey.userId"
	}, {
		xtype : "hidden",
		name : "appUserKey.keyExtend.foreignId"
	}, {
		xtype : "hidden",
		name : "appUserKey.keyExtend.keyExtendId"
	}, {
		xtype : "hidden",
		name : "appUserKey.keyExtend.foreignModule"
	}, {
		fieldLabel : "IKEY用户",
		width : 135,
		name : "appUserKey.appUser.username"
	}, {
		xtype : "container",
		layout : "column",
		height : 28,
		anchor : "100%",
		items : [ {
			xtype : "label",
			style : "padding:3px 12px 0px 39px;",
			text : "密钥序列号:"
		}, {
			xtype : "textfield",
			readOnly : true,
			allowBlank : false,
			width : 140,
			name : "appUserKey.keySerial"
		}, {
			xtype : "button",
			style : "padding:1px 0px 0px 5px;",
			autoWidth : true,
			iconCls : "btn-computer-key",
			handler : this.loadAppUserKeySerial.createDelegate(this)
		} ]
	}, {
		xtype : 'datefield',
		width : 135,
		format : "Y-m-d",
		fieldLabel : "发放时间",
		name : "appUserKey.distributeTime"
	}, {
		xtype : 'datefield',
		width : 135,
		allowBlank : false,
		editable : false,
		format : "Y-m-d",
		fieldLabel : "生效时间",
		name : "appUserKey.validPeriodTime",
		value : currentDate
	}, {
		xtype : 'datefield',
		width : 135,
		allowBlank : false,
		editable : false,
		format : "Y-m-d",
		fieldLabel : "过期时间",
		name : "appUserKey.expirationTime",
		value : new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
	}, {
		xtype : 'datefield',
		width : 135,
		format : "Y-m-d",
		fieldLabel : "修改时间",
		name : "appUserKey.updateTime"
	}, {
		xtype : "container",
		layout : "column",
		height : 28,
		anchor : "100%",
		items : [ {
			xtype : "label",
			style : "padding:3px 12px 0px 50px;",
			text : "关联项目:"
		}, {
			xtype : "textfield",
			readOnly : true,
			allowBlank : false,
			width : 140,
			name : "appUserKey.keyExtend.foreignName"
		}, {
			xtype : "button",
			style : "padding:1px 0px 0px 5px;",
			autoWidth : true,
			iconCls : "btn-anchor-point",
			handler : this.importProjectArchives.createDelegate(this)
		} ]
	}, {
		xtype : "radiogroup",
		width : 135,
		fieldLabel : "启用标识",
		items : [ {
			boxLabel : "启用",
			name : "appUserKey.keyStatus",
			inputValue : 1,
			checked : true
		}, {
			boxLabel : "禁用",
			name : "appUserKey.keyStatus",
			inputValue : 0
		} ]
	} ];
	this.topbar = null;
	if (!this.read) {
		this.topbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			bodyStyle : "",
			items : [ {
				iconCls : "btn-save",
				text : "保存",
				xtype : "button",
				handler : this.saveAppUserKey.createDelegate(this)
			}, {
				iconCls : "btn-reset",
				text : "重置",
				xtype : "button",
				handler : this.resetAppUserKey.createDelegate(this)
			} ]
		});
	}
	AppUserKeyForm.superclass.constructor.call(this, {
		id : "AppUserKeyForm",
		title : (this.username ? this.username : "") + "IKEY信息",
		bodyStyle : "margin : 5px 1px 1px 1px",
		labelWidth : 110,
		frame : true,
		autoScroll : true,
		tbar : this.topbar,
		labelAlign : "right",
		labelSeparator : "：",
		defaultType : "textfield",
		url : __ctxPath + "/system/saveAppUserKey.do",
		reader : new Ext.data.JsonReader({
			root : "data"
		}, [ {
			name : "appUserKey.keyId",
			mapping : "keyId"
		}, {
			name : "appUserKey.appUser.username",
			mapping : "appUser.username"
		}, {
			name : "appUserKey.keyStatus",
			mapping : "keyStatus"
		}, {
			name : "appUserKey.keySerial",
			mapping : "keySerial"
		}, {
			name : "appUserKey.distributeTime",
			mapping : "distributeTime"
		}, {
			name : "appUserKey.validPeriodTime",
			mapping : "validPeriodTime"
		}, {
			name : "appUserKey.expirationTime",
			mapping : "expirationTime"
		}, {
			name : "appUserKey.updateTime",
			mapping : "updateTime"
		} ]),
		items : [ a ],
		listeners : {
			afterrender : this.loadAppUserKey
		}
	});
};
Ext.extend(AppUserKeyForm, Ext.FormPanel, {
	loadAppUserKey : function() {
		if (!Ext.isEmpty(this.keyId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/system/loadAppUserKey.do?keyId=" + this.keyId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if (data.keyExtend) {
						this.getForm().findField("appUserKey.keyExtend.foreignId").setValue(data.keyExtend.foreignId);
						this.getForm().findField("appUserKey.keyExtend.keyExtendId").setValue(data.keyExtend.keyExtendId);
						this.getForm().findField("appUserKey.keyExtend.foreignModule").setValue(data.keyExtend.foreignModule);
						this.getForm().findField("appUserKey.keyExtend.foreignName").setValue(data.keyExtend.foreignName);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.getForm().findField("appUserKey.distributeTime").setValue(new Date());
			this.getForm().findField("appUserKey.appUser.username").setValue(this.username);
			this.getForm().findField("appUserKey.userId").setValue(this.userId);
		}
		this.getForm().findField("appUserKey.distributeTime").disable();
		this.getForm().findField("appUserKey.appUser.username").disable();
		this.getForm().findField("appUserKey.updateTime").disable();
		this.getForm().findField("appUserKey.keyExtend.foreignName").disable();
	},
	saveAppUserKey : function() {
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function() {
				$toast("成功保存信息！");
				Ext.getCmp("AppUserKeyFormWin").close();
			});
		}
	},
	resetAppUserKey : function() {
		this.getForm().reset();
	},
	importProjectArchives : function() {
		
	},
	loadAppUserKeySerial : function() {
		if (!ePass) {
			Ext.Msg.alert("出错", "Load ePass 1000ND Safe Active Control!");
			return;
		}
		try {
			ePass.OpenDevice(1, "");
		} catch (error) {
			Ext.Msg.alert("出错", "Load ePass 1000ND Safe Active Control!");
			return;
		}
		try {
			var keySeral = ePass.GetStrProperty(7, 0, 0);
			this.getForm().findField("appUserKey.keySerial").setValue(keySeral);
			ePass.CloseDevice();
		} catch (error) {
		}
	}
});

var AppUserKeyFormWin = function(a, b) {
	this.formPanel = null;
	if (!Ext.isEmpty(a.userId) || !Ext.isEmpty(a.keyId)) {
		this.formPanel = new AppUserKeyForm(a, b);
	}
	AppUserKeyFormWin.superclass.constructor.call(this, {
		layout : "fit",
		id : "AppUserKeyFormWin",
		iconCls : "menu-set-department",
		width : 350,
		height : 330,
		minWidth : 299,
		minHeight : 329,
		items : this.formPanel,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		listeners : {
			beforerender : function() {
				if (Ext.isEmpty(a.userId) && Ext.isEmpty(a.keyId)) {
					this.modal = false;
					this.close();
					Ext.Msg.alert("出错", "载入系统用户信息失败!");
				}
			}
		}
	});
};
Ext.extend(AppUserKeyFormWin, Ext.Window, {
	getForm : function() {
		return this.formPanel.getForm();
	}
});