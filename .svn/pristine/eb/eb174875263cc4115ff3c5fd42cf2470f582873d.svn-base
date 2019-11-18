var ReceiveManageForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.currentDate = new Date();
	var storeHouseData = null;
	if (this.returnable) {
		storeHouseData = $ajaxSyncCall(__ctxPath + "/materials/arraylistReceiveManage.do", {
			Q_delFlag_S_EQ : "1"
		});
	}
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.scrapId,
		relateModule : RelationModule.materialsDispatch.relateModule,
		saveable : this.saveable
	});
	this.receiveManageDetailGrid = new ReceiveManageDetailGrid({
		parentForm : this,
		storeHouseData : storeHouseData,
		receiveId : this.receiveId
	}, {
		returnable : this.returnable,
		saveable : this.saveable,
		selectable : this.returnable
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					readOnly : true,
					fieldLabel : "领用编号",
					name : "receiveManage.receiveSerial"
				},{
					editable : true,
					fieldLabel : "领用主题",
					allowBlank : true,
					name : "receiveManage.receiveTheme"
				},{
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "仓库库位",
					readOnly : true,
					name : "receiveManage.depotName",
					relateModule : RelationModule.baseDepot.relateModule,
					importhandler : this.importBaseDepot.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "receiveManage.userName"
				},{
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					editable : false,
					fieldLabel : "填报日期",
					name : "receiveManage.provideDate",
					value : this.currentDate
				}, {
					fieldLabel : "领用用途",
					editable : true,
					allowBlank : true,
					name : "receiveManage.receivePurpose"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "领用人",
					readOnly : true,
					name : "receiveManage.receiveMan",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				},{
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					editable : true,
					fieldLabel : "领用日期",
					name : "receiveManage.receiveDate",
					value : this.currentDate
				}, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "合计金额",
					name : "receiveManage.totalAmount",
					value : 0
				} ]
			} ]
		} ]
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
				name : "receiveManage.remark"
		},fileAttachContainer ] 
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.receiveManageDetailGrid ]
	} ];
	if (this.returnable) {
		var tbarItems = [ {
			iconCls : "btn-approve-info",
			text : "归还",
			handler : this.returnComponentPickup.createDelegate(this)
		} ]
	}
	ReceiveManageForm.superclass.constructor.call(this, {
		title : "领用信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "receiveManage",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.receiveId,
				relateModule : RelationModule.receiveManage.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.receiveId,
				relateModule : RelationModule.receiveManage.relateModule
			},
			url : __ctxPath + "/materials/saveReceiveManage.do",
			items : items,
			fieldMapping : ReceiveManageFieldMapping,
			hiddenField : ReceiveManageHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(ReceiveManageForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "receiveMan" ], [ data.practiName ]);
	},
	speciallyGridAction : function(g, id, url, op, p, v, c) {
		var msg1 = "请选择要【" + op + "】的领用！";
		var msg2 = "您确认要【" + op + "】所选的领用吗？";
		var msg3 = "成功【" + op + "】所选的领用！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p, v, c);
	},
	saveFormData : function() {
//		var TotalSummary = this.pickupComponentGrid.getTotalSummary();
//		var paidAmount = Ext.getCmp("paidAmount").value;
//		if(paidAmount ==null || paidAmount == "") {
//			paidAmount = "0.00";
//			Ext.getCmp("paidAmount").setValue("0.00");
//		}
//		var totalAmount = Number(TotalSummary)-Number(paidAmount);
//		Ext.getCmp("totalAmount").setValue(totalAmount);
		this.setFieldValue("receiveManageDetails", $gridstore2json(this.receiveManageDetailGrid));
//		this.setFieldValue("pickupAmount", TotalSummary);
        this.setFieldValue("receiveSerial",this.receiveSerial);
        var data = this.receiveManageDetailGrid.getStore().data.items;
        for(var k =0;k<data.length;k++){
        	var receiveCounts = data[k].data.receiveCounts;
        	var locationCounts = data[k].data.locationCounts;
        	if(receiveCounts ==""||receiveCounts==null){
       		 Ext.MessageBox.alert("提示","领用数量为空不能保存");
       		 return ;
       	}
        	if(receiveCounts > locationCounts){
        		 Ext.MessageBox.alert("提示","领用数量大于库存数量不能保存");
        		 return ;
        	}
        }
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitReceiveManage.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.receiveId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadReceiveManage.do?receiveId=" + this.receiveId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.receiveManageDetailSet, this.receiveManageDetailGrid);
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
	importBaseDepot : function(data){
		var fieldNames = ["depotId","depotName"];
		var values = [data.depotId,data.depotName];
		this.setMultiFieldValue(fieldNames,values);
	},
	returnComponentReceiveManage : function() {
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
		$baseRowAction("确定归还所选配件信息吗？", __ctxPath + "/materials/returnComponentReceiveManage.do", {
			receiveId : this.receiveId,
			returnComponents : Ext.util.JSON.encode(array)
		}, function() {
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});