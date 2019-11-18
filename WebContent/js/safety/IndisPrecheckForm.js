var IndisPrecheckForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.precheckId,
		relateModule : RelationModule.indisPrecheck.relateModule,
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
	title = verifyTitle + "前检查";
	verifyTitle += "前检查项目";
	vitemType += "P";

	this.verifyStandardGrid = new VerifyStandardGrid({
		grid_config : {
			title : verifyTitle,
		},
		select_params : {
			"Q_I.LEVEL_N_EQ" : 1,
			"Q_[I.VITEM_TYPE]_S_EQ" : vitemType
		},
		itemNameLable : "项目",
		demandDesLable : "检查要求",
		standardResultLable : "检查结果"
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
					fieldLabel : "检查编号",
					name : "indisPrecheck.precheckSerial"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "indisPrecheck.equipment.recordId"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "安装单位",
					name : "indisPrecheck.inEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					fieldLabel : "本次安装高度(M)",
					value : 0,
					name : "indisPrecheck.initialHeight"
				}, {
					fieldLabel : "楼号",
					maxLength : 16,
					name : "indisPrecheck.buildingNum"
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
					name : "indisPrecheck.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "indisPrecheck.equipment.equipGenericName"
				}, {
					allowBlank : false,
					fieldLabel : "安拆资质证书号",
					name : "indisPrecheck.inEntCertNum",
					value : "无"
				}, {
					xtype : "numberfield",
					fieldLabel : "最终安装高度(M)",
					value : 0,
					name : "indisPrecheck.finalHeight"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "indisPrecheck.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "indisPrecheck.equipment.equipSpecificName"
				}, {
					allowBlank : false,
					fieldLabel : "资质等级",
					name : "indisPrecheck.inEntTitleLevel",
					value : "无"
				}, {
					xtype : "numberfield",
					fieldLabel : "附墙道数",
					value : 0,
					name : "indisPrecheck.wallAttacheQty"
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
					name : "indisPrecheck.project.projectName",
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
					name : "indisPrecheck.project.address"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			fieldLabel : "备注",
			name : "indisPrecheck.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "panel",
		layout : "fit",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		items : [ this.verifyStandardGrid ]
	} ];
	IndisPrecheckForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : title,
			object : "indisPrecheck",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveIndisPrecheck.do",
			items : items,
			fieldMapping : IndisPrecheckFieldMapping,
			hiddenField : IndisPrecheckHiddenField
		}
	});
};
Ext.extend(IndisPrecheckForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		var fieldNames = [ "projectId", "projectName", "address" ];
		this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(data, fieldNames));
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
		if (!Ext.isEmpty(this.precheckId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadIndisPrecheck.do?precheckId=" + this.precheckId,
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
			fieldNames = [ "contractLease.contractId", "relateModule", "inEnt", "inEntModule", "inEntName", "inEntCertNum" ];
			var values = [ contract.contractId, this.relateModule, contract.pbEnt, contract.pbModule, contract.pbEntName, corpCert ? corpCert.certNum : "" ];
			this.setMultiFieldValue(fieldNames, values);

			var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipment, fieldNames));
		}
	}
});