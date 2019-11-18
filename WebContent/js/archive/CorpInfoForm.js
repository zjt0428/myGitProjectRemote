var CorpInfoForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.depGetUrl = "/system/listDepartment.do?opt=appUser";
	this.depType = curUserInfo.department.depType;
	if(this.depType && this.depType == '1'){
		this.depGetUrl = "/system/listLabourDepartment.do?opt=appUser";
	}
	Ext.apply(this, {
		photoPanelId : Ext.id(),
		economicFieldId : Ext.id(),
		corpDepartmentId : Ext.id()
	});
//	var photoBbar = null;
//	if (this.saveable) {
//		photoBbar = new Ext.Toolbar({
//			height : 30,
//			items : [ {
//				text : "更新",
//				iconCls : "btn-upload",
//				handler : this.uploadPhoto.createDelegate(this)
//			}, "->", {
//				text : "删除",
//				iconCls : "btn-delete",
//				iconAlign : "right",
//				handler : this.delCorpPhoto.createDelegate(this)
//			} ]
//		});
//	}
	var depSelector = new TreeSelector("corpInfo.department.depId", __ctxPath + "/system/listDepartment.do?opt=appUser", "所属部门", "corpInfo.depId",false,{
		width : 150
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.corpId,
		relateModule : RelationModule.corp.relateModule,
		saveable : this.saveable
	});
	this.corpAccountGrid = new CorpAccountGrid({
		corpId : this.corpId
	}, {
		saveable : this.saveable
	});
	var items = [ {
		xtype : "hidden",
		id : this.economicFieldId,
		name : "corpInfo.economic"
	}, {
		xtype : "fieldset",
		title : "基础信息及联系方式",
		anchor : "95%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 1,
				items : [ {
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 0.25,
						defaultType : "textfield",
						items : [ {
							allowBlank : false,
							maxLength : 64,
							fieldLabel : CorpInfoFormLable.corpName,
							name : "corpInfo.corpName"
						}, {
							xtype : "textfield",
							maxLength : 20,
							fieldLabel : "企业简码",
							name : "corpInfo.corpCode"
						}, /*{
							fieldLabel : "所属部门",
							name : "corpInfo.department.depName",
							disabled : !this.saveable
						}*/{
							xtype : "hidden",
							id : this.corpDepartmentId,
							name : "corpInfo.department.depId"
						}, {
							xtype : "treecombo",
							valId : this.corpDepartmentId,
							width : 150,
							allowBlank : false,
							fieldLabel : "所属部门",
							url : __ctxPath + this.depGetUrl,
							name : "corpInfo.department.depName"
						}, {
							hidden : true,
							xtype : "treecombo",
							valId : this.economicFieldId,
							width : 130,
							fieldLabel : "企业工商登记类型",
							url : __ctxPath + "/system/treeCode.do?codeId=econType",
							name : "corpInfo.economicName"
						}, {
							hidden : true,
							fieldLabel : "注册所在地",
							readOnly : true,
							name : "corpInfo.regAddress"
						} ]
					}, {
						layout : "form",
						columnWidth : 0.25,
						defaultType : "textfield",
						items : [ {
							maxLength : 16,
							fieldLabel : "办公电话",
							name : "corpInfo.officeTel"
						}, {
							maxLength : 16,
							fieldLabel : "传真号码",
							name : "corpInfo.fax"
						}, {
							maxLength : 6,
							regex : /^\s*$|[0-9]{6}$/,
							fieldLabel : "邮编",
							name : "corpInfo.postalCode"
						}, {
							hidden : true,
							maxLength : 64,
							regex : /(^\s*$|^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$)|(^\s*$)/,
							fieldLabel : "E-Mail",
							name : "corpInfo.linkEmail"
						}, {
							hidden : true,
							maxLength : 24,
							fieldLabel : "安全生产许可证",
							name : "corpInfo.safetyProdCert"
						}, {
							hidden : true,
							xtype : "numberfield",
							fieldLabel : "注册资本(万元)",
							name : "corpInfo.regPrin"
						}, {
							hidden : true,
							maxLength : 50,
							fieldLabel : "工商营业执照",
							name : "corpInfo.license"
						}, {
							hidden : true,
							xtype : "datefield",
							width : 130,
							editable : false,
							format : "Y-m-d",
							fieldLabel : "成立日期",
							name : "corpInfo.birthDate"
						} ]
					}, {
						layout : "form",
						columnWidth : 0.25,
						defaultType : "textfield",
						items : [ {
							allowBlank : true,
							maxLength : 20,
							fieldLabel : "维保责任人",
							name : "corpInfo.maintenances"
						}, {
							allowBlank : true,
							maxLength : 20,
							fieldLabel : "总经济师",
							name : "corpInfo.chiefEconomist"
						}, {
							allowBlank : true,
							maxLength : 20,
							fieldLabel : "物资责任人",
							name : "corpInfo.material"
						}, {
							allowBlank : true,
							maxLength : 20,
							fieldLabel : "安全总监",
							name : "corpInfo.safety"
						}]
					}, {
						layout : "form",
						columnWidth : 0.25,
						defaultType : "textfield",
						items : [ {
							anchor : "90%",
							allowBlank : true,
//							regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "联系方式",
							name : "corpInfo.maintenancesTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						},{
							anchor : "90%",
							allowBlank : true,
							//regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "联系方式",
							name : "corpInfo.chiefEconomistTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						},{
							anchor : "90%",
							allowBlank : true,
							//regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "联系方式",
							name : "corpInfo.materialTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						},{
							anchor : "90%",
							allowBlank : true,
							//regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "联系方式",
							name : "corpInfo.safetyTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						}]
					}]
				}, {
					xtype : "textfield",
					width : 400,
					maxLength : 128,
					fieldLabel : "通讯地址",
					name : "corpInfo.address"
				}, {
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 0.33,
						defaultType : "textfield",
						items : [ {
							allowBlank : false,
							maxLength : 20,
							fieldLabel : CorpInfoFormLable.dutyman,
							name : "corpInfo.dutyman"
						}, {
							anchor : "90%",
//							regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "责任人联系方式2",
							name : "corpInfo.dutymanTel2",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						}, {
							allowBlank : false,
							maxLength : 20,
							fieldLabel : "财务责任人",
							name : "corpInfo.finance"
						}, {
							allowBlank : false,
							maxLength : 20,
							fieldLabel : "资产责任人",
							name : "corpInfo.capital"
						}, {
							allowBlank : false,
							maxLength : 20,
							fieldLabel : "市场责任人",
							name : "corpInfo.market"
						}]
					},{
						layout : "form",
						columnWidth : 0.5,
						defaultType : "textfield",
						items : [ {
							anchor : "98%",
							allowBlank : false,
//							regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "责任人联系方式1",
							name : "corpInfo.dutymanTel1",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						}, {
							anchor : "98%",
//							regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "责任人联系方式3",
							name : "corpInfo.dutymanTel3",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						}, {
							anchor : "98%",
							allowBlank : true,
							//regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "财务联系方式",
							name : "corpInfo.financeTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
								
						}, {
							anchor : "98%",
							allowBlank : true,
							//regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "资产联系方式",
							name : "corpInfo.capitalTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						}, {
							anchor : "98%",
							allowBlank : true,
							//regex : /^([0-9]{11})?$|^[0][0-9]{2,3}-[0-9]{5,10}$/,
							fieldLabel : "市场联系方式",
							name : "corpInfo.marketTel",
							listeners : {
								render : function(field) {
									Ext.QuickTips.init();
									Ext.QuickTips.register({
										target : field.el,
										text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
									});
								}
							}
						}]} ]
				}, {
					xtype : "areaCompositeField",
					hidden : true,
					width : 100,
					disabled : !this.saveable,
					fieldLabel : "所在地",
					provinceName : "corpInfo.province",
					cityName : "corpInfo.city",
					countyName : "corpInfo.county"
				}, {
					hidden : true,
					xtype : "dynamiccheckboxgroup",
					fieldLabel : "企业类型",
					columns : 5,
					labelFiled : "value",
					valueFiled : "code",
					url : __ctxPath + "/system/checkCode.do?codeId=corpType",
					name : "corpInfo.corpType"
				} ]
			}
//			{
//				layout : "form",
//				columnWidth : 0.33,
//				items : [ {
//					id : this.photoPanelId,
//					xtype : "panel",
//					height : 190,
//					width : 220,
//					html : "<img src='" + __ctxPath + "/images/default_corp.png' height=220 width=220/>",
//					bbar : photoBbar
//				} ]
//			} 
			]
		}, 
		{
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 32,
					fieldLabel : "技术部责任人",
					name : "corpInfo.technology"
				}, {
					maxLength : 32,
					fieldLabel : "维保部责任人",
					name : "corpInfo.maintenance"
				}, {
					maxLength : 32,
					fieldLabel : "工程部责任人",
					name : "corpInfo.engineering"
				}, {
					maxLength : 32,
					fieldLabel : "安全部责任人",
					name : "corpInfo.security"
				}, {
					maxLength : 32,
					fieldLabel : "总工",
					name : "corpInfo.chiefEngineer"
				}, {
					maxLength : 32,
					fieldLabel : "安拆资质证书号",
					name : "corpInfo.certNum"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					anchor : "98%",
					maxLength : 48,
					fieldLabel : "技术联系方式",
					name : "corpInfo.technologyTel",
					listeners : {
						render : function(field) {
							Ext.QuickTips.init();
							Ext.QuickTips.register({
								target : field.el,
								text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
							});
						}
					}
				}, {
					anchor : "98%",
					maxLength : 48,
					fieldLabel : "维保联系方式",
					name : "corpInfo.maintenanceTel",
					listeners : {
						render : function(field) {
							Ext.QuickTips.init();
							Ext.QuickTips.register({
								target : field.el,
								text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
							});
						}
					}
				}, {
					anchor : "98%",
					maxLength : 48,
					fieldLabel : "工程联系方式",
					name : "corpInfo.engineeringTel",
					listeners : {
						render : function(field) {
							Ext.QuickTips.init();
							Ext.QuickTips.register({
								target : field.el,
								text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
							});
						}
					}
				}, {
					anchor : "98%",
					maxLength : 48,
					fieldLabel : "安全联系方式",
					name : "corpInfo.securityTel",
					listeners : {
						render : function(field) {
							Ext.QuickTips.init();
							Ext.QuickTips.register({
								target : field.el,
								text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
							});
						}
					}
				}, {
					anchor : "98%",
					maxLength : 48,
					fieldLabel : "总工联系方式",
					name : "corpInfo.chiefEngineerTel",
					listeners : {
						render : function(field) {
							Ext.QuickTips.init();
							Ext.QuickTips.register({
								target : field.el,
								text : "<font color='red'>多个联系方式以英文符逗号【,】分割</font>"
							});
						}
					}
				}, {
					anchor : "98%",
					maxLength : 48,
					fieldLabel : "资质等级",
					name : "corpInfo.certLevel"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "法人信息",
		anchor : "95%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					maxLength : 20,
					fieldLabel : CorpInfoFormLable.legalMan,
					name : "corpInfo.legalMan"
				}, {
					maxLength : 16,
					fieldLabel : CorpInfoFormLable.legalMobile,
					name : "corpInfo.legalMobile"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 50,
					fieldLabel : CorpInfoFormLable.legalManProtitle,
					name : "corpInfo.legalManProtitle"
				}, {
					fieldLabel : "身份证号",
					regex : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)|^\s*$/,
					name : "corpInfo.legalManIdcard"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 50,
					fieldLabel : CorpInfoFormLable.legalManDuty,
					name : "corpInfo.legalManDuty"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "其他信息",
		anchor : "95%",
		items : [ {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "企业简介",
			name : "corpInfo.corpDesc"
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "corpInfo.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.corpAccountGrid ]
	} ];
	CorpInfoForm.superclass.constructor.call(this, {
		title : (this.corpName ? this.corpName : "") + "基本信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			object : "corpInfo",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveCorpInfo.do",
			items : items,
			fieldMapping : CorpInfoFieldMapping,
			hiddenField : CorpInfoHiddenField
		}
	});
};
Ext.extend(CorpInfoForm, Knight.ux.FormPanelWindow, {
	uploadPhoto : function() {
		var photoField = this.getForm().findField("corpInfo.photo");
		var photoPanel = Ext.getCmp(this.photoPanelId);
		var corpPhotoDialog = $createUploadDialog({
			file_cat : "CORP_PHOTO",
			file_types : "*.jpg;*.png",
			callback : function(a, b) {
				if (a.length < 1) {
					return;
				}
				photoField.setValue(a[0].fileId);
				photoPanel.body.update("<img src='" + __ctxPath + "/file-upload?method=download&fileId=" + a[0].fileId + "' height=220 width=220/>");
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
	delCorpPhoto : function() {
		var photoField = this.getForm().findField("corpInfo.photo");
		var photoPanel = Ext.getCmp(this.photoPanelId);
		if (Ext.isEmpty(photoField.getValue())) {
			Ext.MessageBox.alert("操作信息", "未上传企业照片!");
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
						photoPanel.body.update("<img src='" + __ctxPath + "/images/default_corp.png' height=220 width=220/>");
					},
					failure : function(q, r) {
						Ext.MessageBox.alert("操作信息", "删除失败");
					}
				});
			}
		});
	},
	loadCorpInfoSuccess : function(g, h) {
		var data = Ext.util.JSON.decode(h.response.responseText).data[0];
		this.setFieldRawValue("province", data.provinceName);
		this.setFieldRawValue("city", data.cityName);
		this.setFieldRawValue("county", data.countyName);
		if (data.department) {
			this.getForm().findField("corpInfo.depId").setValue(data.department.depId);
			this.getForm().findField("depTreeSelector").setValue(data.department.depName);
		}
//
//		IF (!EXT.ISEMPTY(DATA.PHOTO)) {
//			VAR PHOTOPANEL = EXT.GETCMP(THIS.PHOTOPANELID);
//			PHOTOPANEL.BODY.UPDATE("<IMG SRC='" + __CTXPATH + "/FILE-UPLOAD?METHOD=DOWNLOAD&FILEID=" + DATA.PHOTO + "' HEIGHT=220 WIDTH=220/>");
//		}
		this.setFormSubModuleGrid(data.corpAccountSet, this.corpAccountGrid);
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.corpId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadCorpInfo.do?corpId=" + this.corpId,
				waitMsg : "正在载入数据...",
				success : this.loadCorpInfoSuccess.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
//			this.setFieldValue("department.depName", curUserInfo.depName);
		}
	},
	saveFormData : function() {
		this.setFieldValue("corpAccounts", $gridstore2json(this.corpAccountGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("成功保存信息！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this))
	}
});
