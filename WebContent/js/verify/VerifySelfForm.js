var VerifySelfForm = function(a) {
	var tbarItems = [];
	if (this.saveable) {
		tbarItems.push({
			iconCls : "btn-business-magicwand",
			text : "默认验收人",
			handler : this.allFillRemark.createDelegate(this)
		});
	}
	this.selfStandardGrid = new VerifyStandardGrid(a.demand_config, {
		tbarItems : tbarItems,
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.selfId,
		relateModule : RelationModule.verifySelf.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报人信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "verifySelf.userName"
				}, {
					readOnly : true,
					fieldLabel : "自检编号",
					name : "verifySelf.selfSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 135,
					editable : false,
					fieldLabel : "填报日期",
					name : "verifySelf.providedDate",
					value : new Date()
				}, {
					fieldLabel : "检查人",
					name : "verifySelf.selfVerifyMan"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "所在部门",
					name : "verifySelf.department.depName"
				}, {
					fieldLabel : "检查高度",
					name : "verifySelf.maxHeight"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "设备及项目信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true,
					allowBlank : false
				},
				items : [ {
					allowBlank : true,
					fieldLabel : "备案编号",
					name : "verifySelf.equipFlow.equipDiary.recordId"
				}, {
					fieldLabel : "出厂日期",
					name : "verifySelf.equipFlow.equipDiary.exwDate"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "安装单位",
					name : "verifySelf.inEntName",
					relateModule : RelationModule.corp.relateModule,
					fields : [ "inEnt", "inEntName" ],
					importhandler : this.importCorpInfoEntArchives.createDelegate(this)
				}, {
					fieldLabel : "安装高度",
					name : "verifySelf.equipFlow.equipInstall.installHeight"
				} , {
					readOnly : false,
					allowBlank : true,
					fieldLabel : "检查时幅度",
					name : "verifySelf.checkAmplitude"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true,
					allowBlank : false
				},
				items : [ {
					fieldLabel : "安装设备",
					name : "verifySelf.equipFlow.equipDiary.equipGenericName"
				}, {
					fieldLabel : "制造单位",
					name : "verifySelf.equipFlow.equipDiary.equipVender"
				}, {
					allowBlank : true,
					readOnly : false,
					fieldLabel : "单位资质证书",
					name : "verifySelf.inEntCertNum"
				}, {
					allowBlank : true,
					fieldLabel : "安装负责人",
					name : "verifySelf.equipFlow.equipInstall.principal"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true,
					allowBlank : false
				},
				items : [ {
					fieldLabel : "规格型号",
					name : "verifySelf.equipFlow.equipDiary.equipSpecificName"
				}, {
					fieldLabel : "出厂编号",
					name : "verifySelf.equipFlow.equipDiary.exwSerial"
				}, {
					allowBlank : true,
					readOnly : false,
					fieldLabel : "资质等级",
					name : "verifySelf.inEntCertType"
				}, {
					fieldLabel : "项目名称",
					name : "verifySelf.equipFlow.equipDiary.projectName"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			xtype : "textfield",
			fieldLabel : "项目地址",
			name : "verifySelf.equipFlow.equipDiary.address"
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "verifySelf.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "panel",
		layout : "fit",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		items : [ this.selfStandardGrid ]
	} ];
	VerifySelfForm.superclass.constructor.call(this, {
		form_config : {
			title : this.equipFlow.equipDiary.recordId + "-设备自检明细",
			object : "verifySelf",
			saveable : this.saveable,
			url : __ctxPath + "/verify/saveVerifySelf.do",
			items : items,
			fieldMapping : VerifySelfFieldMapping,
			hiddenField : VerifySelfHiddenField
		}
	});
};
Ext.extend(VerifySelfForm, Knight.ux.FormPanelWindow, {
	importCorpInfoEntArchives : function(data, fields) {
		var values = [ data.corpId, data.corpName ];
		if (data.corpCert) {
			values.push(data.corpCert.certNum, data.corpCert.certTypeName);
		} else {
			values.push("", "");
		}
		this.setMultiFieldValue(fields, values);
	},
	saveFormData : function() {
		this.getForm().findField("verifySelf.selfStandards").setValue($gridstore2json(this.selfStandardGrid));
		$formsubmit(this.getForm(), function() {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.selfId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/verify/loadVerifySelf.do?selfId=" + this.selfId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.selfStandardSet, this.selfStandardGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var equipFlow = this.equipFlow;
			var fieldNames = [ "relateId", "relateModule", "userId", "userName", "department.depId", "department.depName", "equipFlow.flowId" ];
			var values = [ equipFlow.equipInstall.installId, RelationModule.equipInstall.relateModule, curUserInfo.userId, curUserInfo.fullname, curUserInfo.depId, curUserInfo.depName, equipFlow.flowId ];
			var corp = curUserInfo.corpInfo;
			if (corp) {
				fieldNames.push("inEnt", "inEntName");
				values.push(corp.corpId, corp.corpName);
				var cert = corp.corpCert;
				if (cert) {
					fieldNames.push("inEntCertNum", "inEntCertType");
					values.push(cert.certNum, cert.certTypeName);
				}
			}
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "recordId", "exwDate", "equipGenericName", "equipVender", "equipSpecificName", "exwSerial", "projectName", "address" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(equipFlow.equipDiary, fieldNames));
			fieldNames = [ "installHeight", "principal" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipInstall", fieldNames), this.paddingValues(equipFlow.equipInstall, fieldNames));
		}
	},
	allFillRemark : function() {
		var selfVerifyMan = this.getFieldValue("selfVerifyMan");
		for (var i = 0; i < this.selfStandardGrid.getStore().getCount(); i++) {
			this.selfStandardGrid.getStore().getAt(i).set("remark", selfVerifyMan);
		}
	}
});