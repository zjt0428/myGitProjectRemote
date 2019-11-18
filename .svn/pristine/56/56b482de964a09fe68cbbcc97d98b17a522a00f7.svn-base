var InsureEquipForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var items = [ {
		xtype : "fieldset",
		title : "报告编号",
		anchor : "98%",
		hidden : this.claimable,
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					xtype : "textfield",
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "保险单号",
					name : "insureEquip.insureSerial"
				}, {
					readOnly : true,
					fieldLabel : "产权单位",
					name : "insureEquip.equipment.propertyName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "insureEquip.equipment.equipGenericName"
				}, {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "insureEquip.equipment.exwSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "insureEquip.equipment.equipSpecificName"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "insureEquip.equipment.recordId"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsed : this.claimable,
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "起保日期",
					name : "insureEquip.startInsureDate",
					value : new Date()
				}, {
					xtype : "numberfield",
					allowBlank : false,
					maxLength : 9,
					fieldLabel : "保险费",
					name : "insureEquip.premium"
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "联系人",
					name : "insureEquip.linkman"
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
					fieldLabel : "终止日期",
					name : "insureEquip.endInsureDate",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "保险公司",
					name : "insureEquip.insuranceCompany",
					relateModule : RelationModule.supplier.relateModule,
					importhandler : this.importSupplierArchives.createDelegate(this)
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "停保日期",
					name : "insureEquip.stopInsureDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					allowBlank : false,
					maxLength : 9,
					fieldLabel : "投保单价",
					name : "insureEquip.coverage"
				}, {
					maxLength : 16,
					allowBlank : false,
					fieldLabel : "理赔电话",
					name : "insureEquip.claimPhone"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "复保日期",
					name : "insureEquip.recoverInsureDate",
					value : new Date()
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
					fieldLabel : "项目名称",
					name : "insureEquip.project.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "95%",
					readOnly : true,
					fieldLabel : "项目所属地",
					name : "insureEquip.project.address"
				} ]
			} ]
		}, {
			xtype : "dynamiccheckboxgroup",
			fieldLabel : "保险项目",
			columns : 6,
			labelFiled : "value",
			valueFiled : "code",
			url : __ctxPath + "/system/checkCode.do?codeId=insureProgram",
			name : "insureEquip.insureProgram"
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "insureEquip.remark"
		} ]
	} ];
	if (!Ext.isEmpty(this.insureId)) {
		this.insureClaimGrid = new InsureClaimGrid({
			insureId : this.insureId,
			insureSerial : this.insureSerial,
			equipId : this.equipId
		}, {
			saveable : this.claimable,
			callback : function() {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this)
		});
		var insureClaimPanel = new Ext.Panel({
			bodyStyle : "margin : 5px 0px 5px 0px",
			anchor : "98%",
			layout : "fit",
			items : [ this.insureClaimGrid ]
		});
		if (this.claimable) {
			items.unshift(insureClaimPanel);
		} else {
			items.push(insureClaimPanel);
		}
	}
	InsureEquipForm.superclass.constructor.call(this, {
		title : "保险信息明细",
		animateTarget : this.animateTarget,
		centerLayout : true,
		width : 870,
		form_config : {
			labelWidth : 100,
			object : "insureEquip",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveInsureEquip.do",
			items : items,
			fieldMapping : InsureEquipFieldMapping,
			hiddenField : InsureEquipHiddenField
		}
	});
};
Ext.extend(InsureEquipForm, Knight.ux.FormPanelWindow, {
	importSupplierArchives : function(data) {
		data.supplierLinker = data.supplierLinker ? data.supplierLinker : {};
		this.setMultiFieldValue([ "insuranceCompany", "linkman", "claimPhone" ], [ data.supplierName, data.supplierLinker.linker, data.supplierLinker.tel ]);
	},
	importProjectArchives : function(data) {
		var fieldNames = [ "projectId", "projectName", "address" ];
		this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(data, fieldNames));
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.insureId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadInsureEquip.do?insureId=" + this.insureId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.insureClaimSet, this.insureClaimGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial", "propertyName" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipment, fieldNames));
		}
	}
});