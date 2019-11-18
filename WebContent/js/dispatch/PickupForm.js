var PickupForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
    this.pickupSerial = null;
	this.currentDate = new Date();
	var maxPickupDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);
	var storeHouseData = null;
	if (this.returnable) {
		storeHouseData = $ajaxSyncCall(__ctxPath + "/archive/arraylistStoreHouse.do", {
			Q_delFlag_S_EQ : "1"
		});
	}

	this.pickupComponentGrid = new PickupComponentGrid({
		parentForm : this,
		storeHouseData : storeHouseData,
		pickupId : this.pickupId
	}, {
		returnable : this.returnable,
		saveable : this.saveable,
		selectable : this.returnable
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
					name : "pickup.userName"
				}, {
					readOnly : true,
					fieldLabel : "领用单号",
					name : "pickup.pickupSerial"
						
				
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
					name : "pickup.providedDate",
					value : this.currentDate
				},{
					editable : true,
					fieldLabel : "领用主题",
					allowBlank : true,
					name : "pickup.pickupTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "pickup.department.depName"
				}, $initComboBoxField("领用用途", "pickup.pickupPurpose", "pickupPurpose", {
					editable : true,
					allowBlank : true,
					name : "pickup.pickupPurpose"
				}) ]
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "关联业务",
					name : "pickup.relateModuleName",
					relations : [ {
						relation : RelationModule.contractLease,
						params : {
							Q_applyforState_S_GE : "3"
						}
					}, {
						relation : RelationModule.equipInstall
					}, {
						relation : RelationModule.equipDetect
					}, {
						relation : RelationModule.equipment
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "领用人",
					readOnly : true,
					name : "pickup.recipients",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "pickup.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "应付金额",
					name : "pickup.pickupAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "pickup.equipment.recordId"
				}, {
					readOnly : true,
					fieldLabel : "业务编号",
					name : "pickup.relateSerial"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					maxValue : maxPickupDate,
					fieldLabel : "领用时间",
					name : "pickup.pickupDate",
					value : this.currentDate
				}, {
					id : "paidAmount",
					//readOnly : true,
					fieldLabel : "已付金额",
					name : "pickup.paidAmount",
					value : "0"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "设备型号",
					name : "pickup.equipment.equipSpecificName"
				}, {
					readOnly : true,
					fieldLabel : "业务主题",
					name : "pickup.relateTheme"
				}, {
					readOnly : true,
					fieldLabel : "领用状态",
					name : "pickup.pickupStatusName"
				},{
					id : "totalAmount",
					readOnly : true,
					fieldLabel : "合计金额",
					name : "pickup.totalAmount"
				} ]
			} ]
		}, {
			anchor : "50%",
			xtype : "textfield",
			readOnly : true,
			fieldLabel : "关联项目",
			name : "pickup.projectName"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.pickupComponentGrid ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
				anchor : "95%",
				maxLength : 128,
				maxLengthText : MoreThanMaxLength,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "pickup.remark"
		} ] 
	} ];
	if (this.returnable) {
		var tbarItems = [ {
			iconCls : "btn-approve-info",
			text : "归还",
			handler : this.returnComponentPickup.createDelegate(this)
		} ]
	}
	PickupForm.superclass.constructor.call(this, {
		title : "领用信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "pickup",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.pickupId,
				relateModule : RelationModule.pickup.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.pickupId,
				relateModule : RelationModule.pickup.relateModule
			},
			url : __ctxPath + "/dispatch/savePickup.do",
			items : items,
			fieldMapping : PickupFieldMapping,
			hiddenField : PickupHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(PickupForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "recipients", "recipientsDepName" ], [ data.practiName, data.department.depName ]);
	},
	speciallyGridAction : function(g, id, url, op, p, v, c) {
		var msg1 = "请选择要【" + op + "】的领用！";
		var msg2 = "您确认要【" + op + "】所选的领用吗？";
		var msg3 = "成功【" + op + "】所选的领用！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p, v, c);
	},
	saveFormData : function() {
		var TotalSummary = this.pickupComponentGrid.getTotalSummary();
		var paidAmount = Ext.getCmp("paidAmount").value;
		if(paidAmount ==null || paidAmount == "") {
			paidAmount = "0.00";
			Ext.getCmp("paidAmount").setValue("0.00");
		}
		var totalAmount = Number(TotalSummary)-Number(paidAmount);
		Ext.getCmp("totalAmount").setValue(totalAmount);
		this.setFieldValue("pickupComponents", $gridstore2json(this.pickupComponentGrid));
		this.setFieldValue("pickupAmount", TotalSummary);
        this.setFieldValue("pickupSerial",this.pickupSerial);
        var data = this.pickupComponentGrid.getStore().data.items;
        for(var k =0;k<data.length;k++){
        	var quantity = data[k].data.quantity;
        	var consumeCounts = data[k].data.consumeCounts;
        	if(quantity ==""||quantity==null){
       		 Ext.MessageBox.alert("提示","领用数量为空不能保存");
       		 return ;
       	}
        	if(quantity > consumeCounts){
        		 Ext.MessageBox.alert("提示","领用数量大于库存数量不能保存");
        		 return ;
        	}
        }
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitPickup.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.pickupId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadPickup.do?pickupId=" + this.pickupId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.pickupComponentSet, this.pickupComponentGrid);
					if (!Ext.isEmpty(data.equipment)) {
						this.setFieldValue("equipment.equipId", data.equipment.equipId);
						this.setFieldValue("equipment.equipSpecificName", data.equipment.equipSpecificName);
						this.setFieldValue("equipment.recordId", data.equipment.recordId);
						this.setFieldValue("equipment.exwSerial", data.equipment.exwSerial);
					}
                    this.pickupSerial = data.pickupSerial;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName", "projectName" ];
		var values = [ relation.relateId, relation.relateSerial, relation.relateTheme, relation.relateModule, relation.relateModuleName, relation.projectName ];
		if (!Ext.isEmpty(data.equipFlow)) {
			fieldNames.push("equipment.equipId", "equipment.recordId", "equipment.equipSpecificName", "equipment.exwSerial");
			values.push(data.equipFlow.equipId, data.equipFlow.equipDiary.recordId, data.equipFlow.equipDiary.equipSpecificName, data.equipFlow.equipDiary.exwSerial);
		} else if (!Ext.isEmpty(data.equipDiary)) {
			fieldNames.push("equipment.equipId", "equipment.recordId", "equipment.equipSpecificName", "equipment.exwSerial");
			values.push(data.equipDiary.equipId, data.equipDiary.recordId, data.equipDiary.equipSpecificName, data.equipDiary.exwSerial);
		} else if (relation.relateModule == RelationModule.equipment.relateModule) {
			fieldNames.push("equipment.equipId", "equipment.recordId", "equipment.equipSpecificName", "equipment.exwSerial");
			values.push(data.equipId, data.recordId, data.equipSpecificName, data.exwSerial);
		}
		this.setMultiFieldValue(fieldNames, values);
	},
	returnComponentPickup : function() {
		var a = this.pickupComponentGrid.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("选择要归还的配件信息");
			return;
		}
		var array = [];
		for (var i = 0; i < a.length; i++) {
			if ("3" == a[i].data.status) {
				continue;
			}
			var r = a[i].data;
			for ( var n in r) {
				if (Ext.isEmpty(r[n])) {
					r[n] = undefined;
				}
			}
			array.push(r);
		}
		if (array.length == 0) {
			$toast("选择未归还的配件信息");
			return;
		}
		$baseRowAction("确定归还所选配件信息吗？", __ctxPath + "/dispatch/returnComponentPickup.do", {
			pickupId : this.pickupId,
			returnComponents : Ext.util.JSON.encode(array)
		}, function() {
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});