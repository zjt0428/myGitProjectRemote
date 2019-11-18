var EquipVerifyForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	this.verifyStandardGrid = new VerifyStandardGrid({
		grid_config : {
			title : "验收项目",
		},
		select_params : {
			"Q_I.LEVEL_N_EQ" : 1,
			"Q_[I.VITEM_TYPE]_S_EQ" : this.equipFlow.equipDiary.verifyType + "EV"
		},
		itemNameLable : "项目",
		demandDesLable : "验收内容",
		standardResultLable : "验收结果",
		remarkLable : "结论"
	}, {
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "报告编号",
		anchor : "98%",
		items : [ {
			xtype : "textfield",
			readOnly : true,
			fieldLabel : "验收单号",
			name : "equipVerify.verifySerial"
		} ]
	}, {
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
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "使用设备",
					name : "equipVerify.equipFlow.equipDiary.recordSerial"
				}, {
					fieldLabel : "规格型号",
					name : "equipVerify.equipFlow.equipDiary.equipSpecificName"
				}, {
					fieldLabel : "设备自编号",
					name : "equipVerify.equipFlow.equipDiary.equipSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备类别",
					name : "equipVerify.equipFlow.equipDiary.equipCategoryName"
				}, {
					fieldLabel : "备案编号",
					name : "equipVerify.equipFlow.equipDiary.recordId"
				}, {
					fieldLabel : "关联业务编号",
					name : "equipVerify.relateSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备名称",
					name : "equipVerify.equipFlow.equipDiary.equipGenericName"
				}, {
					fieldLabel : "项目编号",
					name : "equipVerify.equipFlow.equipDiary.projectSerial"
				}, {
					fieldLabel : "项目名称",
					name : "equipVerify.equipFlow.equipDiary.projectName"
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
					fieldLabel : "安装单位",
					name : "equipVerify.inEntName",
					relateModule : RelationModule.corp.relateModule,
					fields : [ "inEnt", "inEntName" ],
					importhandler : this.importCorpInfoEntArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "使用单位",
					name : "equipVerify.emEntName"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "验收日期",
					name : "equipVerify.verifyDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "监理单位",
					name : "equipVerify.supEntName"
				}, {
					fieldLabel : "验收结论",
					name : "equipVerify.verifyResult"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "验收人员",
					name : "equipVerify.practiName",
					fields : [ "practiName"],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "租赁单位",
					//name : "equipVerify.leaseEntName"
					name : "equipVerify.equipFlow.contractLease.pbEntName"
				}, {
					fieldLabel : "验收意见",
					name : "equipVerify.suggest"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目所属地",
			name : "equipVerify.equipFlow.equipDiary.address"
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "equipVerify.remark"
		} ]
	}, {
		xtype : "panel",
		layout : "fit",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		items : [ this.verifyStandardGrid ]
	} ];
	EquipVerifyForm.superclass.constructor.call(this, {
		title : "验收信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "equipVerify",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipVerify.do",
			items : items,
			fieldMapping : EquipVerifyFieldMapping,
			hiddenField : EquipVerifyHiddenField
		}
	});
};
Ext.extend(EquipVerifyForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName ]);
	},
	importCorpInfoEntArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.corpId, data.corpName ]);
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
		if (!Ext.isEmpty(this.verifyId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipVerify.do?verifyId=" + this.verifyId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.findFormField("verifySerial").setReadOnly(true);
					this.setFormSubModuleGrid(data.verifyStandardSet, this.verifyStandardGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var project = this.equipFlow.project;
			var fieldNames = [ "inEnt", "inEntName", "emEnt", "emEntName", "supEnt", "supEntName", "relateId", "relateSerial", "relateModule", "relateModuleName", "equipFlow.flowId", "equipFlow.equipId" ];
			var values = [ project.ctCustomId, project.ctCustomName, project.unCustomId, project.unCustomName, project.supCustomId, project.supCustomName, this.relateId, this.relateSerial, this.relateModule, this.relateModuleName, this.equipFlow.flowId,
					this.equipFlow.equipId];
			if (curUserInfo.corpInfo) {
				fieldNames.push("leaseEnt", "leaseEntName");
				values.push(curUserInfo.corpInfo.corpId, curUserInfo.corpInfo.corpName);
			}
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "recordSerial", "equipSpecificName", "equipCategoryName", "recordId", "equipGenericName", "projectSerial", "projectName", "equipSerial"/*,"address"*/ ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary",fieldNames), this.paddingValues(this.equipFlow.equipDiary,fieldNames));
			fieldNames = [ "pbEntName"];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.contractLease",fieldNames), this.paddingValues(this.equipFlow.contractLease,fieldNames));
			fieldNames = [ "address" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary",fieldNames), this.paddingValues(this.equipFlow.equipDiary,fieldNames));
		}
	}
});