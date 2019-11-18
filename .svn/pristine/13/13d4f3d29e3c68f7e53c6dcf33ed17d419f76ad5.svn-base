var IndisBasecheckForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.schemaId,
		relateModule : RelationModule.indisBasecheck.relateModule,
		saveable : this.saveable
	});
	var title = "其他设备";
	var verifyTitle = "其他设备";
	var vitemType = "Q";
	if (this.equipment.equipGeneric == "T") {
		verifyTitle = "塔式";
		vitemType = "T";
	} else if (this.equipment.equipGeneric == "S") {
		verifyTitle = "升降机";
		vitemType = "S";
	}
	if (RelationModule.equipInstall.relateModule == this.relateModule) {
		verifyTitle += "安装";
		vitemType += "I";
	} else if (RelationModule.equipDismantle.relateModule == this.relateModule) {
		verifyTitle += "拆卸";
		vitemType += "D";
	}
	title = verifyTitle + "基础验收";
	verifyTitle += "基础验收项目";
	vitemType += "B";

	this.verifyStandardGrid = new VerifyStandardGrid({
		grid_config : {
			title : verifyTitle,
		},
		select_params : {
			"Q_I.LEVEL_N_EQ" : 1,
			"Q_[I.VITEM_TYPE]_S_EQ" : vitemType
		},
		itemNameLable : "内容",
		demandDesLable : "要求标准",
		standardResultLable : "实测结果",
		remarkLable : "备注"
	}, {
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "基础验收编号",
					name : "indisBasecheck.basecheckSerial"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "indisBasecheck.equipment.recordId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "安装单位",
					name : "indisBasecheck.inEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "使用单位",
					name : "indisBasecheck.emEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					maxLength : 16,
					fieldLabel : "楼号",
					name : "indisBasecheck.buildingNum"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "填报日期",
					name : "indisBasecheck.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "indisBasecheck.equipment.equipGenericName"
				}, {
					allowBlank : false,
					fieldLabel : "安拆资质证书号",
					name : "indisBasecheck.inEntCertNum",
					value : "无"
				}, {
					maxLength : 32,
					fieldLabel : "项目经理",
					name : "indisBasecheck.managerProject"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "indisBasecheck.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "indisBasecheck.equipment.equipSpecificName"
				}, {
					allowBlank : false,
					fieldLabel : "资质等级",
					name : "indisBasecheck.inEntTitleLevel",
					value : "无"
				}, {
					maxLength : 16,
					fieldLabel : "联系方式",
					name : "indisBasecheck.managerPhone"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "indisBasecheck.project.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "92%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "indisBasecheck.project.address"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			fieldLabel : "备注",
			name : "indisBasecheck.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "panel",
		layout : "fit",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		items : [ this.verifyStandardGrid ]
	} ];
	IndisBasecheckForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : title,
			object : "indisBasecheck",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveIndisBasecheck.do",
			items : items,
			fieldMapping : IndisBasecheckFieldMapping,
			hiddenField : IndisBasecheckHiddenField
		}
	});
};
Ext.extend(IndisBasecheckForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		var fieldNames = [ "projectId", "projectName", "address" ];
		this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(data, fieldNames));
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "emEnt", "emEntModule", "emEntName" ], [ data.customerId, RelationModule.customer.relateModule, data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		var fieldNames = [ "inEnt", "inEntModule", "inEntName", "inEntCertNum" ];
		var values = [ data.corpId, RelationModule.corp.relateModule, data.corpName, data.corpCert ? data.corpCert.certNum : "" ];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		this.setFieldValue("verifyStandards", $gridstore2json(this.verifyStandardGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.basecheckId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadIndisBasecheck.do?basecheckId=" + this.basecheckId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.verifyStandardSet, this.verifyStandardGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "projectId", "projectName", "address" ];
			this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(this.contract, fieldNames));

			var contract = this.contract;
			var corpCert = this.inEntInfo.corpCert;
			fieldNames = [ "contractLease.contractId", "relateModule", "emEnt", "emEntModule", "emEntName", "inEnt", "inEntModule", "inEntName", "inEntCertNum" ];
			var values = [ contract.contractId, this.relateModule, contract.paEnt, contract.paModule, contract.paEntName, contract.pbEnt, contract.pbModule, contract.pbEntName, corpCert ? corpCert.certNum : "" ];
			this.setMultiFieldValue(fieldNames, values);

			var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipment, fieldNames));
		}
	}
});