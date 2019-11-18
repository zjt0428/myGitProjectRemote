var EquipEmployForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	this.practiDiaryGrid = new PractiDiaryGrid(null, {
		importParams : {
			Q_dispatchId_L_EQ : this.equipFlow.dispatchId
		},
		retrieveable : this.retrieveable,
		saveable : this.saveable
	});
	this.totalPractiDiaryGrid = new PractiDiaryGrid(null, {
		title : "从业人员清单",
		grid_config : {
			bbar : true,
			loadurl : __ctxPath + "/equip/listPractiDiary.do",
			base_params : {
				"Q_flowId_L_EQ" : this.equipFlow.flowId
			}
		}
	});
	this.componDiaryGrid = new ComponDiaryGrid(null, {
		importParams : {
			Q_dispatchId_L_EQ : this.equipFlow.dispatchId
		},
		retrieveable : this.retrieveable,
		saveable : this.saveable
	});
	this.totalComponDiaryGrid = new ComponDiaryGrid(null, {
		title : "已安装配件清单",
		jackingEnabled : isGranted("_EquipEmployJacking"),
		grid_config : {
			bbar : true,
			loadurl : __ctxPath + "/equip/listComponDiary.do",
			base_params : {
				"Q_flowId_L_EQ" : this.equipFlow.flowId
			}
		}
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
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "equipEmploy.userName"
				}, {
					readOnly : true,
					fieldLabel : "使用单号",
					name : "equipEmploy.employSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "equipEmploy.providedDate",
					value : new Date()
				}, {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "使用主题",
					name : "equipEmploy.employTheme",
					tooltip : "默认为新增时的项目名称+的使用+年月日"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipEmploy.department.depName"
				}, {
					fieldLabel : "承租单位",
					name : "equipEmploy.equipFlow.contractLease.paEntName"
				} ]
			} ]
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
					name : "equipEmploy.equipFlow.equipDiary.recordSerial"
				}, {
					fieldLabel : "规格型号",
					name : "equipEmploy.equipFlow.equipDiary.equipSpecificName"
				}, {
					fieldLabel : "安装编号",
					name : "equipEmploy.equipFlow.equipInstall.installSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "使用负责人",
					name : "equipEmploy.principal",
					fields : [ "principalId", "principal", "principalTel" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "安装总高度",
					name : "equipEmploy.equipFlow.equipInstall.installHeight"
				}, {
					xtype : "relationCompositeField",
					single : false,
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "开机人员",
					name : "equipEmploy.partake",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMutilPractiArchives.createDelegate(this)
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
					name : "equipEmploy.equipFlow.equipDiary.equipCategoryName"
				}, {
					fieldLabel : "备案编号",
					name : "equipEmploy.equipFlow.equipDiary.recordId"
				}, {
					fieldLabel : "项目编号",
					name : "equipEmploy.equipFlow.equipDiary.projectSerial"
				}, {
					readOnly : false,
					fieldLabel : "联系方式",
					name : "equipEmploy.principalTel"
				}, {
					xtype : "relationCompositeField",
					single : true,
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "机长",
					name : "equipEmploy.captain",
					fields : [ "captainId", "captain", "captainTel" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "本次标准节数",
					name : "equipEmploy.equipFlow.equipInstall.knotCounts"
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
					name : "equipEmploy.equipFlow.equipDiary.equipGenericName"
				}, {
					fieldLabel : "出厂编号",
					name : "equipEmploy.equipFlow.equipDiary.exwSerial"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "启用时间",
					name : "equipEmploy.employDate",
					value : new Date()
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "预计结束时间",
					name : "equipEmploy.endPlanDate"
				}, {
					fieldLabel : "机长电话",
					name : "equipEmploy.captainTel"
				}, {
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "本次附墙数",
					name : "equipEmploy.equipFlow.equipInstall.wallAttacheQty"
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
					readOnly : true,
					fieldLabel : "项目名称",
					name : "equipEmploy.equipFlow.equipDiary.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ { 
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "人员进场日期",
					name : "equipEmploy.approachDate"
				} ]
			} ]
		}, {
			layout : "form",
			columnWidth : 0.66,
			defaultType : "textfield",
			items : [ {
				anchor : "95%",
				readOnly : true,
				fieldLabel : "项目所属地",
				name : "equipEmploy.equipFlow.equipDiary.address"
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "equipEmploy.remark"
		} ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.componDiaryGrid, this.practiDiaryGrid, this.totalComponDiaryGrid, this.totalPractiDiaryGrid ]
	} ];
	EquipEmployForm.superclass.constructor.call(this, {
		title : "使用信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "equipEmploy",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.employId,
				relateModule : RelationModule.equipEmploy.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.employId,
				relateModule : RelationModule.equipEmploy.relateModule
			},
			url : __ctxPath + "/equip/saveEquipEmploy.do",
			items : items,
			fieldMapping : EquipEmployFieldMapping,
			hiddenField : EquipEmployHiddenField
		}
	});
};
Ext.extend(EquipEmployForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.mobile ]);
	},
	importMutilPractiArchives : function(datas) {
		var partakeField = this.findFormField("partake");
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if (Ext.isEmpty(partakeField.getValue())) {
				partakeField.setValue(data.practiName);
			} else {
				partakeField.setValue(partakeField.getValue() + "," + data.practiName);
			}
		}
	},
	saveFormData : function() {
		var pds = this.practiDiaryGrid.getStore().data.items;
		var cds = this.componDiaryGrid.getStore().data.items;
		var startinDate = this.getFieldValue("employDate").dateFormat("Y-m-d H:i:s");
		var endinDate = (Ext.isEmpty(this.getFieldValue("endPlanDate")) ? new Date() : this.getFieldValue("endPlanDate")).dateFormat("Y-m-d H:i:s");
		for (var i = 0; i < pds.length; i++) {
			if (Ext.isEmpty(pds[i].get("startDate"))) {
				pds[i].set("startDate", startinDate);
			}
			if (Ext.isEmpty(pds[i].get("endDate"))) {
				pds[i].set("endDate", endinDate);
			}
		}
		for (var i = 0; i < cds.length; i++) {
			if (Ext.isEmpty(cds[i].get("startDate"))) {
				cds[i].set("startDate", startinDate);
			}
			if (Ext.isEmpty(cds[i].get("endDate"))) {
				cds[i].set("endDate", endinDate);
			}
		}
		this.setFieldValue("practiDiarys", $gridstore2json(this.practiDiaryGrid));
		this.setFieldValue("componDiarys", $gridstore2json(this.componDiaryGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipEmploy.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.employId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipEmploy.do?employId=" + this.employId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.practiDiarySet, this.practiDiaryGrid);
					this.setFormSubModuleGrid(data.componDiarySet, this.componDiaryGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var equipFlow = this.equipFlow;
			var equipInstall = equipFlow.equipInstall;
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "equipFlow.flowId", "employDate" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, equipFlow.flowId, new Date(Date.parse(equipFlow.equipActivate.activateDate.replace(/-/g, "/"))) ];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "projectSerial", "projectName", "address", "recordSerial", "equipCategoryName", "equipGenericName", "equipSpecificName", "recordId", "exwSerial", "activateDate" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(equipFlow.equipDiary, fieldNames));
			this.setFieldValue("employTheme", equipFlow.equipDiary.projectName + "的使用" + new Date().format("Ymd"));
			fieldNames = [ "wallAttacheQty", "knotCounts", "installHeight", "installSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipInstall", fieldNames), this.paddingValues(equipFlow.equipInstall, fieldNames));
			fieldNames = [ "equipFlow.contractLease.paEntName" ];
			values = [ equipFlow.contractLease.paEntName ];
			this.setMultiFieldValue(fieldNames, values);

			new Ext.util.DelayedTask(function() {
				var dispatchcompons = equipFlow.dispatch.dispatchComponSet;
				var diarycompons = equipFlow.componDiarySet;
				for (var i = 0; i < dispatchcompons.length; i++) {
					var flag = true;
					for (var j = 0; j < diarycompons.length; j++) {
						if (dispatchcompons[i].dispatchComponId == diarycompons[j].businessComponId) {
							flag = false;
							break;
						}
					}
					if (flag) {
						this.componDiaryGrid.addSubModuleDate(dispatchcompons[i]);
					}
				}
				var dispatchpractis = equipFlow.dispatch.dispatchPractiSet;
				var diarypractis = equipFlow.practiDiarySet;
				for (var i = 0; i < dispatchpractis.length; i++) {
					var flag = true;
					for (var j = 0; j < diarypractis.length; j++) {
						if (dispatchpractis[i].dispatchPractiId == diarypractis[j].businessPractiId) {
							flag = false;
							break;
						}
					}
					if (flag) {
						this.practiDiaryGrid.addSubModuleDate(dispatchpractis[i]);
					}
				}
			}.createDelegate(this)).delay(50);
		}
	}
});