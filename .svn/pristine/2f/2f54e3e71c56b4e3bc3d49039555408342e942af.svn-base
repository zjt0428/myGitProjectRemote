var PractitionerForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.userId = curUserInfo.userId;
	this.depGetUrl = "/system/listDepartment.do?opt=appUser";
	this.depType = curUserInfo.department.depType;
	if(this.depType && this.depType == '1'){
		this.depGetUrl = "/system/listLabourDepartment.do?opt=appUser";
	}
	Ext.apply(this, {
		practiDepartmentId : Ext.id()
	});
	var sexCombo = $initComboBoxField("性别", "practitioner.sex", "SEX", {
		allowBlank : false,
		readOnly : !this.saveable
	});
	var nationCombo = $initComboBoxField("民族", "practitioner.nation", "nation", {
		allowBlank : true,
		readOnly : !this.saveable
	});
	var degreeCombo = $initComboBoxField("学位", "practitioner.degree", "degree", {
		allowBlank : true,
		readOnly : !this.saveable
	});
	var eduLevelCombo = $initComboBoxField("学历", "practitioner.eduLevel", "edulevel", {
		allowBlank : true,
		readOnly : !this.saveable
	});
	var kindWorkCombo = $initComboBoxField("从业工种", "practitioner.kindWork", "kindWork", {
		editable : true,
		allowBlank : true,
		readOnly : !this.saveable
	});
	var insureStatusCombo = $initComboBoxField("参保状态", "practitioner.insureStatus", "INSURE_STATUS", {
		width : 130,
		lable : "参保状态",
		allowBlank : false,
		disabled : true,
		defaultValueIndex : 0
	});
	//身份证不重复
	var isSingle = true;	
	var isSingle_m = true;
	this.randomId = Math.floor(Math.random()*1000);
	Ext.apply(this, {
		photoPanelId : Ext.id()
	});
	this.incumbentIndex = 1;
	this.certFlagIndex = 0;
	var photoBbar = null;
	if (this.saveable) {
		photoBbar = new Ext.Toolbar({
			height : 30,
			items : [ {
				text : "更新",
				iconCls : "btn-upload",
				handler : this.uploadPhoto.createDelegate(this)
			}, "->", {
				text : "删除",
				iconCls : "btn-delete",
				iconAlign : "right",
				handler : this.delPractitionerPhoto.createDelegate(this)
			} ]
		});
	}
	this.appUserInfo = {
			xtype : "fieldset",
			title : "系统账号",
			anchor : "95%",
			items : [ {
				xtype : "panel",
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.35,
					defaultType : "textfield",
					items : [ {
						id : "acc"+this.randomId,
						fieldLabel : "登录账号",
						name : "practitioner.appUser.username",
//						allowBlank : false,
						readOnly : this.appUser?true:false,
						value : "",
						blankText : "登录账号不能为空!"
					}]
				}, {
					layout : "form",
					columnWidth : 0.65,
					defaultType : "textfield",
					items : [ {
						fieldLabel : "移动电话",
						maxLength : 16,
//						allowBlank : false,
						labelStyle : "margin-left:75px;",
						xtype : "numberfield",
						name : "practitioner.appUser.mobile"
					}]
				},{
					layout : "form",
					columnWidth : 0.35,
					defaultType : "textfield",
					items : [{
						id : "pwd"+this.randomId,
						fieldLabel : "登录密码",
						name : "practitioner.appUser.password",
						inputType : "password",
//						allowBlank : false,
						readOnly : this.appUser?true:false,
						blankText : "登录密码不能为空!",
						value : ""/*,
						listeners : {
							render : function(field) {
								Ext.QuickTips.init();
								Ext.QuickTips.register({
									target : field.el,
									text : "<font color='red'>默认密码为123456</font>"
								});
							}
						}*/
					}]
				},{
					layout : "form",
					columnWidth : 0.6,
					defaultType : "textfield",
					items : [{
						xtype : "button",
						width : 80,
						iconCls : "btn-password",
						text : "重置密码",
						hidden : !this.saveable,
//						style : "margin-left:60px;",
						handler : this.resetAppUserPassword.createDelegate(this)
					}]
				
				} ]
			} ]
		}
	this.appUserRoleSelector = new Ext.Panel({
		title : "用户角色",
//		width : 600,
		anchor : "95%",
		autoScroll : true,
		colspan : 2,
		items : [ {
			xtype : "itemselector",
			id : "AppUserRoles",
			name : "AppUserRoles",
			disabled : this.appUserRolesdisable,
			fromLegend : "",
			anchor : "100%",
			imagePath : __ctxPath + "/ext3.4/ux/images/",
			multiselects : [ {
				id : "chooseRoles",
				legend : "可选角色",
				width : 400,
				height : 360,
				store : new Ext.data.SimpleStore({
					autoLoad : true,
					baseParams : {
						userId : this.appUser?this.appUser.userId:this.userId,
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
				width : 400,
				height : 360,
				store : new Ext.data.SimpleStore({
					autoLoad : true,
					baseParams : {
						userId : this.appUser?this.appUser.userId:null,
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
	this.baseInfo = {
		xtype : "fieldset",
		title : "基础信息",
		anchor : "95%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.75,
				items : [ {
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 0.5,
						defaultType : "textfield",
						labelWidth : 90,
						items : [ {
							maxLength : 20,
							fieldLabel : PractitionerFormLable.corpName,
							name : "practitioner.corpInfo.corpName",
							readOnly : true
						}, {
							xtype : "treecombo",
							valId : this.practiDepartmentId,
							width : 130,
							allowBlank : false,
							fieldLabel : "所属部门",
							url : __ctxPath + this.depGetUrl,
							name : "practitioner.department.depName"
						}, /*{
							xtype : "container",
							layout : "column",
							height : 28,
							anchor : "100%",
							items : [ {
								xtype : "label",
								style : "padding:3px 5px 0px 38px;",
								html : "系统帐户:"
							}, {
								xtype : "textfield",
								readOnly : true,
								width : 88,
								name : "practitioner.appUser.username"
							}, {
								xtype : "button",
								disabled : !this.saveable,
								style : "padding:0px 0px 0px 2px;",
								autoWidth : true,
								iconCls : "btn-personal_recipient",
								handler : this.importAppUser.createDelegate(this)
							}, {
								xtype : "button",
								disabled : !this.saveable,
								style : "padding:0px 0px 0px 2px;",
								autoWidth : true,
								iconCls : "btn-clean",
								handler : this.cleanAppUser.createDelegate(this)
							} ]
						}, */{
							xtype : "datefield",
							width : 130,
							editable : false,
							format : "Y-m-d",
							fieldLabel : "入职时间",
							name : "practitioner.divisionDate"
						}, {
							maxLength : 20,
							fieldLabel : "在职岗位",
							name : "practitioner.station"
						}, {
							xtype : "numberfield",
							fieldLabel : "基本月薪",
							name : "practitioner.baseSalary"
						}, kindWorkCombo,{
							maxLength : 64,
							fieldLabel : "开户行",
							name : "practitioner.bankDeposit"
						},{
							xtype : "container",
							layout : "column",
							height : 28,
							anchor : "100%",
							items : [ {
								xtype : "label",
								style : "padding:3px 5px 0px 39px;",
								html : "所在项目:"
							}, {
								xtype : "textfield",
								readOnly : true,
								width : 157,
								height : 25,
								name : "practitioner.projectName"
							}/*, {
								xtype : "button",
								disabled : !this.saveable,
								style : "padding:0px 0px 0px 2px;",
								autoWidth : true,
								iconCls : "btn-anchor-point",
								handler : this.importProject.createDelegate(this)
							}, {
								xtype : "button",
								disabled : true,
								style : "padding:0px 0px 0px 2px;",
								autoWidth : true,
								iconCls : "btn-clean",
								handler : this.cleanProject.createDelegate(this)
							} */]
						}, {
							xtype : "radiogroup",
							fieldLabel : "从业资质",
							disabled : true,
							columns : [ 60, 60 ],
							items : [ {
								boxLabel : "无",
								name : "practitioner.certFlag",
								inputValue : "0",
								checked : true
							}, {
								boxLabel : "有",
								name : "practitioner.certFlag",
								inputValue : "1"
							} ],
							listeners : {
								change : function(a, b) {
									a.items.items[this.certFlagIndex].setValue(true);
								}.createDelegate(this)
							}
						},{
							xtype : "radiogroup",
							fieldLabel : "人员状态",
							disabled : true,
							columns : [ 60, 60, 60 ],
							items : [ {
								id : "radio_in"+this.randomId,
								boxLabel : "在岗",
								name : "practitioner.incumbent",
								inputValue : "1"
							}, {
								id : "radio_wait"+this.randomId,
								boxLabel : "待岗",
								name : "practitioner.incumbent",
								inputValue : "2",
								checked : true
							}, {
								id : "radio_quit"+this.randomId,
								boxLabel : "离职",
								name : "practitioner.incumbent",
								inputValue : "0"
							}],
							listeners : {
								change : function(a, b) {
									a.items.items[this.incumbentIndex].setValue(true);
									this.incumbentChange(a, b);
								}.createDelegate(this)
							}
						} ]
					}, {
						layout : "form",
						columnWidth : 0.5,
						defaultType : "textfield",
						labelWidth : 90,
						items : [ {
							allowBlank : false,
							maxLength : 20,
							fieldLabel : "人员姓名",
							name : "practitioner.practiName"
						}, sexCombo, {
							id : "idCard"+this.randomId,
							fieldLabel : "身份证号",
							regex : /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
							name : "practitioner.idCard",
							listeners : {
								valid : function(a) {
									var idCard = a.getValue();
									if(idCard != ""){
										var birthDate = new Date(idCard.substring(6, 10), idCard.substring(10, 12) - 1, idCard.substring(12, 14));
										this.getForm().findField("practitioner.birthDate").setValue(birthDate);
										var sexInt = parseInt(idCard.substring(16, 17));
										var sex = sexInt%2;
										this.getForm().findField("practitioner.sex").setValue(sex==0?0:1);
										this.getForm().findField("practitioner.sex").setRawValue(sex==0?'女':'男');
									}
								}.createDelegate(this)
							},
							validationEvent : 'blur',
							validator : function(thisText) {
								//只在修改页面中校验，查看详情不需要
								if(this.saveable && thisText.length == 18){
									Ext.Ajax.request({
										url : __ctxPath + "/archive/checkRepetitionPractitioner.do",
										method : 'post',
										params : {
											practiId : this.practiId?this.practiId:'',
											idCard : thisText
										},
										success : function(m) {
											var resp = Ext.util.JSON.decode(m.responseText);
											var inp = Ext.getCmp("idCard"+ this.randomId);
											if(resp.success === false){
												isSingle = false;
												if(inp){
													inp.markInvalid(resp.msg);
												}
											}else{
												isSingle = true;
												if(inp){
													inp.clearInvalid();
												}
											}
										}
									});
								}
								return isSingle;
							}.createDelegate(this)
						}, {
							xtype : "datefield",
							width : 130,
							editable : false,
							format : "Y-m-d",
							fieldLabel : "出生日期",
							name : "practitioner.birthDate"
						},/*{
							id : "isAffiliateGroup",
							xtype : "radiogroup",
							fieldLabel : "挂靠状态",
							disabled : !this.saveable,
							columns : [ 80, 80 ],
							items : [ {
								id : "radio_yes",
								boxLabel : "非挂靠",
								name : "practitioner.isAffiliate",
								inputValue : "0",
								checked : true
							}, {
								id : "radio_no",
								boxLabel : "挂靠",
								name : "practitioner.isAffiliate",
								inputValue : "1"
							}]
						} ,*/ nationCombo, {
							allowBlank : true,
							maxLength : 16,
							fieldLabel : "籍贯",
							name : "practitioner.birthplace"
						},{
							maxLength : 32,
							fieldLabel : "银行账号",
							name : "practitioner.account"
						}, {
							allowBlank : true,
							maxLength : 32,
							fieldLabel : "所属班组",
							name : "practitioner.teams"
						}, {
							xtype : "datefield",
							width : 130,
							editable : false,
							readOnly : true,
							format : "Y-m-d",
							fieldLabel : "离职时间",
							name : "practitioner.separationDate"
						},insureStatusCombo]
					} ]
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				items : [ {
					id : this.photoPanelId,
					xtype : "panel",
					height : 190,
					width : 140,
					html : "<img src='" + __ctxPath + "/images/default_person.gif' height=160 width=140/>",
					bbar : photoBbar
				} ]
			} ]
		}]
	}
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.practiId,
		relateModule : RelationModule.practitioner.relateModule,
		saveable : this.saveable
	});
	this.others = {
			xtype : "fieldset",
			title : "联系信息",
			anchor : "95%",
			items : [ {
				xtype : "panel",
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.5,
					defaultType : "textfield",
					items : [ {
						id : "mobile"+this.randomId,
						maxLength : 11,
						fieldLabel : "联系电话",
						name : "practitioner.mobile"/*,
						validationEvent : 'blur',
						validator : function(thisText) {
							//只在修改页面中校验，查看详情不需要
							if(this.saveable && thisText.length == 11){
								Ext.Ajax.request({
									url : __ctxPath + "/archive/checkMobilePractitioner.do",
									method : 'post',
									params : {
										practiId : this.practiId?this.practiId:'',
										idCard : thisText
									},
									success : function(m) {
										var resp = Ext.util.JSON.decode(m.responseText);
										var inp = Ext.getCmp("mobile"+ randomId);
										if(resp.success === false){
											isSingle_m = false;
											if(inp){
												inp.markInvalid(resp.msg);
											}
										}else{
											isSingle_m = true;
											if(inp){
												inp.clearInvalid();
											}
										}
									}
								});
							}
							return isSingle_m;
						}.createDelegate(this)*/
					}, {
						maxLength : 16,
						fieldLabel : "家庭电话",
						name : "practitioner.homeTel"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.5,
					defaultType : "textfield",
					items : [ {
						maxLength : 128,
						regex : /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$|^\s*$/,
						fieldLabel : "E-Mail",
						name : "practitioner.email"
					}, {
						maxLength : 128,
						fieldLabel : "联系地址",
						name : "practitioner.address"
					} ]
				} ]
			} ]
		}
	this.eduInfo = {
			xtype : "fieldset",
			title : "教育培训信息",
			anchor : "95%",
			items : [ {
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.5,
					defaultType : "textfield",
					items : [ degreeCombo, {
						maxLength : 64,
						fieldLabel : "毕业院校",
						name : "practitioner.university"
					}, {
						maxLength : 64,
						fieldLabel : "专业职称",
						name : "practitioner.professionTitle"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.5,
					defaultType : "textfield",
					items : [ eduLevelCombo, {
						maxLength : 64,
						fieldLabel : "学历专业",
						name : "practitioner.major"
					} ]
				} ]
			} ]
		}
	this.remarkInfo = {
			xtype : "fieldset",
			title : "其他信息",
			anchor : "95%",
			items : [ {
				anchor : "95%",
				xtype : "textarea",
				maxLength : 128,
				maxLengthText : MoreThanMaxLength,
				fieldLabel : "备注",
				name : "practitioner.remark"
			}, fileAttachContainer ]
		} 
	
	var items = [ {
		xtype : "hidden",
		id : this.practiDepartmentId,
		name : "practitioner.department.depId"
	}];
	items.push(this.baseInfo);
//	if (isGranted("_All") || isGranted("_AppUserAdd")||isGranted("_LabAppUserAdd")) {
		items.push(this.appUserInfo);
		items.push(this.appUserRoleSelector);
//	}
	items.push(this.others);
	items.push(this.eduInfo);
	items.push(this.remarkInfo);
	PractitionerForm.superclass.constructor.call(this, {
		id : "PractitionerForm"+this.randomId,
		title : (this.practiName ? this.practiName : "") + "从业人员详细信息",
		animateTarget : this.animateTarget,
		width : 900,
		height : 560,
		constrain: true,//禁止窗口移出浏览器屏幕
		layout : "fit",
		maximizable : true,
		maximized : false,
		form_config : {
			object : "practitioner",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractitioner.do",
			items : items,
			fieldMapping : PractitionerFieldMapping,
			hiddenField : PractitionerHiddenField
		}
	});
};
Ext.extend(PractitionerForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName ]);
	},
	incumbentChange : function(a, b) {
		var divisionDate = this.findFormField("divisionDate");
//		if ("0" == b.inputValue) {
//			divisionDate.allowBlank = true;
//		} else {
//			divisionDate.allowBlank = false;
//		}
	},
	cleanAppUser : function() {
		this.cleanMultiField([ "appUser.userId", "appUser.username", "appUser.depId" ]);
	},
	importAppUser : function() {
		var depId = this.getFieldValue("department.depId");
		new UserSimpleSelector({
			params : {
				Q_depId_L_EQ : depId
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				this.setMultiFieldValue([ "appUser.userId", "appUser.username", "appUser.depId" ], [ data.userId, data.username, data.department.depId ]);
			}.createDelegate(this)
		}).show();
	},
	cleanProject : function() {
		this.cleanMultiField([ "projectId", "projectName" ]);
		this.incumbentIndex = 1 ;
		Ext.getCmp("radio_in"+this.randomId).setValue(false);
		Ext.getCmp("radio_wait"+this.randomId).setValue(true);
		Ext.getCmp("radio_quit"+this.randomId).setValue(false);
	},
	importProject : function() {
		new ProjectSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				this.setMultiFieldValue([ "projectId", "projectName" ], [ data.projectId, data.projectName ]);
				this.incumbentIndex = 0 ;
				Ext.getCmp("radio_in"+this.randomId).setValue(true);
				Ext.getCmp("radio_wait"+this.randomId).setValue(false);
				Ext.getCmp("radio_quit"+this.randomId).setValue(false);
			}.createDelegate(this)
		}).show();
	},
	uploadPhoto : function() {
		var photoField = this.getForm().findField("practitioner.photo");
		var photoPanel = Ext.getCmp(this.photoPanelId);
		var corpPhotoDialog = $createUploadDialog({
			file_cat : "PRACTI_PHOTO",
			callback : function(a, b) {
				if (a.length < 1) {
					return;
				}
				photoField.setValue(a[0].fileId);
				photoPanel.body.update("<img src='" + __ctxPath + "/file-upload?method=download&fileId=" + a[0].fileId + "' height=160 width=140/>");
			},
			permitted_extensions : [ "jpg", "gif" ]
		});
		if (!Ext.isEmpty(photoField.getValue())) {
			Ext.Msg.confirm("信息确认", "再次上传需要先删除原有图片,是否删除？", function(e) {
				if (e == "yes") {
					corpPhotoDialog.show(this);
				}
			}.createDelegate(this));
		} else {
			corpPhotoDialog.show(this);
		}
	},
	delPractitionerPhoto : function() {
		var photoField = this.getForm().findField("practitioner.photo");
		var photoPanel = Ext.getCmp(this.photoPanelId);
		if (Ext.isEmpty(photoField.getValue())) {
			Ext.MessageBox.alert("操作信息", "未上传人员照片!");
			return;
		}
		Ext.Msg.confirm("信息确认", "确定删除照片？", function(e) {
			if (e == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/system/deleteFileAttach.do",
					params : {
						fileId : photoField.getValue()
					},
					success : function() {
						photoField.setValue(null);
						photoPanel.body.update("<img src='" + __ctxPath + "/images/default_person.png' height=160 width=240/>");
					},
					failure : function(q, r) {
						Ext.MessageBox.alert("操作信息", "删除失败");
					}
				});
			}
		});
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.practiId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractitioner.do?practiId=" + this.practiId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("practitioner.sex").setRawValue(data.sexName);
					this.getForm().findField("practitioner.nation").setRawValue(data.nationName);
					this.getForm().findField("practitioner.degree").setRawValue(data.degreeName);
					this.getForm().findField("practitioner.eduLevel").setRawValue(data.eduLevelName);
					this.getForm().findField("practitioner.kindWork").setRawValue(data.kindWorkName);
					this.getForm().findField("practitioner.insureStatus").setRawValue(data.insureStatusName);
					if (!Ext.isEmpty(data.photo)) {
						var photoPanel = Ext.getCmp(this.photoPanelId);
						photoPanel.body.update("<img src='" + __ctxPath + "/file-upload?method=download&fileId=" + data.photo + "' height=160 width=140/>");
					} 
					if(data.certFlag == '0'){
						this.certFlagIndex = 0;
					}else{
						this.certFlagIndex = 1;
					}
					if(data.incumbent == '1'){
						this.incumbentIndex = 0 ;
					}else if(data.incumbent == '2'){
						this.incumbentIndex = 1 ;
					}else if(data.incumbent == '0'){
						this.incumbentIndex = 2 ;
					}else{
						this.incumbentIndex = 1 ;
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.getForm().findField("practitioner.appUser.username").setValue("");
			this.getForm().findField("practitioner.appUser.password").setValue("");
			this.getForm().findField("practitioner.corpInfo.corpId").setValue(this.corpId);
			this.getForm().findField("practitioner.corpInfo.corpName").setValue(this.corpName);
			this.getForm().findField("practitioner.department.depId").setValue(this.department.depId);
			this.getForm().findField("practitioner.department.depName").setValue(this.department.depName);
		}
		var _that = this;
		var acc = Ext.getCmp("acc" + this.randomId);
		var pwd = Ext.getCmp("pwd" + this.randomId);
		acc.readOnly = true;
		pwd.readOnly = true;
		setTimeout(function(){
			if(Ext.isEmpty(acc.value)){
				acc.getEl().dom.readOnly = false;
			}
			if(Ext.isEmpty(pwd.value)){
				pwd.getEl().dom.readOnly = false;
			}
		},3000);
	},
	saveFormData : function() {
		var appUserDepId = this.getFieldValue("appUser.depId");
		var depId = this.getFieldValue("department.depId");
		var projectId = this.getFieldValue("projectId");
		var incumbent = this.getFieldValue("incumbent");
		var practiName = this.getFieldValue("practiName")
		var practiId = this.getFieldValue("practiId");
		
//		if (!Ext.isEmpty(appUserDepId) && depId != appUserDepId) {
//			$toast("系统用户所属部门和从业人员所在部门不一致!");
//			return;
//		}
		if(incumbent == 1 && Ext.isEmpty(projectId)){
			$toast("在岗人员需指定【所在项目】！");
			return;
		}
		var practiData = $ajaxSyncCall(__ctxPath + "/archive/listPractitioner.do", {
			"Q_practiName_S_EQ" : practiName,
			"Q_delFlag_S_EQ" : "1"
		});
		
		if(Ext.isEmpty(practiId) && practiData.result.length>0 && !Ext.isEmpty(practiName)) {
			Ext.Msg.confirm("提示","人员姓名重复，是否继续新增？",function (e) {
				if(e == "yes") {
					this.checkUser();
				} else {
					return;
				}
			}.createDelegate(this))
		} else {
			this.checkUser();
		}
	},
	checkUser : function(){
		var userId = this.getFieldValue("userId");
		var username = this.getFieldValue("appUser.username");
		var password = this.getFieldValue("appUser.password");
		var mobile = this.getFieldValue("appUser.mobile");
		if(!Ext.isEmpty(username) && Ext.isEmpty(password)){
			$toast("密码不能为空!");
			return;
		}
		if(Ext.isEmpty(userId)){
			var appUserData = $ajaxSyncCall(__ctxPath + "/system/checkRepeatAppUser.do", {
				"Q_username_S_EQ" : username.toLowerCase()
			});
			if(!Ext.isEmpty(username) && appUserData.result.length>0){
				Ext.Msg.confirm("提示","该账号已存在，是否进行绑定？",function (e) {
					if(e == "yes") {
						this.getForm().findField("practitioner.userId").setValue(appUserData.result[0].userId);
						this.formsubmit();
					} else {
						$toast("提示","该账号已存在,请重新输入！");
						return;
					}
				}.createDelegate(this))
			}else{
				var appUserMobileData = $ajaxSyncCall(__ctxPath + "/system/checkRepeatAppUser.do", {
					"Q_mobile_S_EQ" : mobile
				});
				if(!Ext.isEmpty(mobile) && appUserMobileData.result.length>0){
					$toast("提示","该手机号已存在,请重新输入！");
					return;
				}
			}
		}else{
			var appUserMobileData = $ajaxSyncCall(__ctxPath + "/system/checkRepeatAppUser.do", {
				"Q_mobile_S_EQ" : mobile
			});
			if(!Ext.isEmpty(mobile) && appUserMobileData.result.length>0){
				var res = appUserMobileData.result;
				var repeat = true;
				for(var i = 0; i< res.length; i++){
					if(res[i].userId == userId){
						repeat = false;
					}
				}
				if(repeat == true){
					$toast("提示","该手机号已存在,请重新输入！");
					return;
				}
			}
		}
		this.formsubmit();
	},
	formsubmit : function(){
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function(c, e) {
				$toast("成功保存信息！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	},
	resetAppUserPassword : function() {
		if(!Ext.isEmpty(this.appUser)){
			if (1 == this.appUser.userId) {
				$toast("超级管理员密码不在此重置！");
				return false;
			}
			var data = $ajaxSyncCall(__ctxPath + "/system/multiResetPwdAppUser.do", {
				"ids" : this.appUser.userId
			});
			if(!Ext.isEmpty(data.success) && data.success == true){
				$toast("密码重置成功！");
			}
		}else{
			$toast("未绑定账户信息！");
		}
	}
});