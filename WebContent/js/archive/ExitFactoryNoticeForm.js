var ExitFactoryNoticeForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;

	var regulatorsCombo = $initComboBoxField("监管部门", "exitFactoryNotice.regulators", "regulators", {
		allowBlank : true
	});

	var practiFields = [ "practitioner.practiId","practitioner.practiName" ];
	var projectFields = [ "project.projectId","project.projectName","project.address" ];
	var items = [ {
		xtype : "fieldset",
		title : "退场明细",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [{
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "exitFactoryNotice.userName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "exitFactoryNotice.project.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : projectFields,
//					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importProjectArchives.createDelegate(this)
				}, {
					maxLength : 64,
					fieldLabel : "项目地址",
					name : "exitFactoryNotice.project.address"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [ {
					xtype : "datefield",
					editable : false,
					allowBlank : false,
					format : "Y-m-d",
					width : 130,
					fieldLabel : "下单日期",
					name : "exitFactoryNotice.providedDate",
					value : new Date()
				}, {
					width : 130,
					fieldLabel : "项目联系方式",
					name : "exitFactoryNotice.projectTel"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "业务员",
					name : "exitFactoryNotice.practitioner.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					fields : practiFields,
//					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importPractiArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				items : [ {
					xtype : "datetimefield",
					width : 130,
					editable : false,
					readOnly : false,
					allowBlank : false,
					format : "Y-m-d H",
					fieldLabel : "项目要求进场时间",
					name : "exitFactoryNotice.startDate",
					value : new Date()
				}, {
					xtype : "datetimefield",
					width : 130,
					readOnly : false,
					editable : false,
					format : "Y-m-d H",
					fieldLabel : "项目要求安装时间",
					name : "exitFactoryNotice.installDate",
					value : new Date()
				}, {
					xtype : "numberfield",
					allowBlank : true,
					fieldLabel : "吊车费用",
					width : 130,
					maxValue : 99999,
					name : "exitFactoryNotice.craneFee"
				} ]
			} ]
		}, {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				defaults : {
					allowBlank : false
				},
				items : [ {
					maxLength : 64,
					fieldLabel : "开工许可证",
					allowBlank : true,
					name : "exitFactoryNotice.startLincense"
				}, regulatorsCombo ]
			}]
		}, {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 1,
				defaultType : "textfield",
				items : [ {
					xtype : "textarea",
					maxLength : 128,
					maxLengthText : MoreThanMaxLength,
					anchor : "95%",
					height : "60",
					fieldLabel : "进车条件",
					name : "exitFactoryNotice.conditions"
				}, {
					xtype : "textarea",
					maxLength : 128,
					maxLengthText : MoreThanMaxLength,
					anchor : "95%",
					height : "60",
					fieldLabel : "其他条款",
					name : "exitFactoryNotice.otherContent"
				}]
			}]
		}]
	}];
	this.ExitFactoryEquipGrid = new ExitFactoryEquipGrid(null,{
		saveable : this.saveable,
		exitFactoryNoticeId : this.exitFactoryNoticeId
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [this.ExitFactoryEquipGrid]
	});
	items.push(this.relateTabPanel);
	
	var tbarItems = [{
		iconCls : "btn-accept-info",
		text : "安检部意见",
		handler : this.showSecurityApplication.createDelegate(this)
	},{
		iconCls : "btn-accept-info",
		text : "工程部意见",
		handler : this.showEngineeringApplication.createDelegate(this)
	},{
		iconCls : "btn-accept-info",
		text : "资产部意见",
		handler : this.showAssetsApplication.createDelegate(this)
	}];
	tbarItems.push("->");
	tbarItems.push({
		iconCls : "btn-approve",
		text : "安监部审批",
		handler : this.opinionApplication.createDelegate(this,["security"])
	});
	tbarItems.push({
		iconCls : "btn-approve",
		text : "工程部审批",
		handler : this.opinionApplication.createDelegate(this,["engineering"])
	});
	tbarItems.push({
		iconCls : "btn-approve",
		text : "资产部审批",
		handler : this.opinionApplication.createDelegate(this,["assets"])
	});
	ExitFactoryNoticeForm.superclass.constructor.call(this, {
		title : "退场通知",
		height : 600,
		centerLayout : true,
		form_config : {
			object : "exitFactoryNotice",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveExitFactoryNotice.do",
			items : items,
			fieldMapping : ExitFactoryNoticeFieldMapping,
			hiddenField : ExitFactoryNoticeHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(ExitFactoryNoticeForm, Knight.ux.FormPanelWindow, {
	showSecurityApplication : function(a){
		$request({
			url : __ctxPath + "/form/listFormOpinion.do",
			params : {
				Q_relateId_L_EQ : this.exitFactoryNoticeId,
				Q_opinionType_S_EQ : "security"
			},
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).result;
				if (data.length <= 0) {
					Ext.Msg.alert("提示信息", "未加载到相关信息!");
					return;
				}
				new HandleForCommentsWin(data, {
					opinionShow : true
				}).show();
			}.createDelegate(this)
		});
	},
	showEngineeringApplication : function(a){
		$request({
			url : __ctxPath + "/form/listFormOpinion.do",
			params : {
				Q_relateId_L_EQ : this.exitFactoryNoticeId,
				Q_opinionType_S_EQ : "engineering"
			},
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).result;
				if (data.length <= 0) {
					Ext.Msg.alert("提示信息", "未加载到相关信息!");
					return;
				}
				new HandleForCommentsWin(data, {
					opinionShow : true
				}).show();
			}.createDelegate(this)
		});
	},
	showAssetsApplication : function(a){
		$request({
			url : __ctxPath + "/form/listFormOpinion.do",
			params : {
				Q_relateId_L_EQ : this.exitFactoryNoticeId,
				Q_opinionType_S_EQ : "assets"
			},
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).result;
				if (data.length <= 0) {
					Ext.Msg.alert("提示信息", "未加载到相关信息!");
					return;
				}
				new HandleForCommentsWin(data, {
					opinionShow : true
				}).show();
			}.createDelegate(this)
		});
	},
	opinionApplication : function(a){
		new HandleForCommentsWin({
			opinionType : a,
			relateId : this.exitFactoryNoticeId,
			relateModule : "ExitFactoryNotice"
		}, {
			opinion : true,
			presubmit : this.preOpiniontApplicationSubmit.createDelegate(this),
			callback : function() {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this)
		}).show();
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId	,data.practiName ]);
	},
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId,data.projectName,data.address ]);
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.exitFactoryNoticeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadExitFactoryNotice.do?exitFactoryNoticeId=" + this.exitFactoryNoticeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.exitFactoryEquipSet, this.ExitFactoryEquipGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = ["userName"];
			var values = [curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames,values);
		}
	},
	saveFormData : function() {
		this.setFieldValue("exitFactoryEquips", $gridstore2json(this.ExitFactoryEquipGrid));
		$formsubmit(this.getForm(), function() {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});
