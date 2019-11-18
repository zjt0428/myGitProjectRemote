var EquipInsuranceFrom = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.insureId,
		relateModule : RelationModule.equipInsurance.relateModule,
		saveable : this.saveable
	});
	var insureProgramData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "insureProgram"
	});//合同单位
	var supplierFields = [ "insuranceCompany", "linkman", "claimPhone","linkmanPhone" ];
	this.equipInsuranceDetailGrid = new EquipInsuranceDetailGrid({
		insureProgramData : insureProgramData,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	},{
		parentForm : this,
		saveable : this.saveable,
	});
	
	this.equipInsureClaimDetailGrid = new EquipInsureClaimDetailGrid({
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	},{
		parentForm : this,
		insureId : this.insureId
	});
	
	var items = [ {
		id : this.insureId,
		xtype : "hidden",
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
					maxLength : 20,
					readOnly : true,
					width : 180,
					fieldLabel : "填报人",
					name : "equipInsurance.userName"
				}, {
					allowBlank : false,
					width : 180,
					fieldLabel : "保险单号",
					name : "equipInsurance.insureSerial"
				}, {
					fieldLabel : "联系人",
					width : 180,
					name : "equipInsurance.linkman"
				}, {
					fieldLabel : "联系人电话",
					width : 180,
					name : "equipInsurance.linkmanPhone"
				}  ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					width : 180,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipInsurance.department.depName"
				}, {
					xtype : "relationCompositeField",
					fieldLabel : "保险公司",
					allowBlank : false,
					readOnly : true,
					width : 180,
					name : "equipInsurance.insuranceCompany",
					relateModule : RelationModule.supplier.relateModule,
					fields : supplierFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importSupplierArchives.createDelegate(this)
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 180,
					editable : false,
					allowBlank : false,
					fieldLabel : "起保日期",
					name : "equipInsurance.startInsureDate",
					// listeners : {
					// 	change : function(field, newValue, oldValue){
					// 		var startDate = newValue;
					// 		for (var i = 0; i < this.equipInsuranceDetailGrid.getStore().getCount(); i++) {
					// 			this.equipInsuranceDetailGrid.getStore().getAt(i).data.startInsureDate == startDate;
					// 		}
					// 	}.createDelegate(this)
					// }
				}, {
					readOnly : true,
					width : 180,
					fieldLabel : "保障数量",
					name : "equipInsurance.equipNum"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 180,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "equipInsurance.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					width : 180,
					fieldLabel : "理赔电话",
					name : "equipInsurance.claimPhone"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 180,
					editable : false,
					fieldLabel : "停保日期",
					name : "equipInsurance.endInsureDate",
				}, {
					readOnly : true,
					fieldLabel : "保费总额",
					name : "equipInsurance.totalPremium"
				} ]
			} ]
		},{
			anchor : "85%",
			height : 40,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "equipInsurance.remark"
		}, fileAttachContainer ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipInsuranceDetailGrid,this.equipInsureClaimDetailGrid ]
	});
	items.push(this.relateTabPanel);
	EquipInsuranceFrom.superclass.constructor.call(this, {
		title : "设备保险信息",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		form_config : {
			labelWidth : 90,
			object : "equipInsurance",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.insureId,
				relateModule : RelationModule.equipInsurance.relateModule
			},
			url : __ctxPath + "/equip/saveEquipInsurance.do",
			items : items,
			fieldMapping : EquipInsuranceFieldMapping,
			hiddenField : EquipInsuranceHiddenField
		}
	});
};
Ext.extend(EquipInsuranceFrom, Knight.ux.FormPanelWindow, {
	importSupplierArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierName, data.linkMan, data.tel, data.linkManPhone ]);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
	},
	saveFormData : function() {
		var gridCount = this.equipInsuranceDetailGrid.getStore().getCount();
		if(gridCount<1) {
			$toast("未关联设备，无法保存！");
			return;
		} 
		var r = null;
		var checkEndDate = this.getFieldValue("endInsureDate");
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var time = year+"-"+month+"-"+day;
		var d1 = new Date(checkEndDate.replace(/\-/g, "\/"));
		var d2 = new Date(time.replace(/\-/g, "\/"));
		if(d1 < d2){
			$toast("停保日期必须大于当前时间！");
			return;
		}
		var g = 0;
		for (var i = 0; i < this.equipInsuranceDetailGrid.getStore().getCount(); i++) {
				r += Number( this.equipInsuranceDetailGrid.getStore().getAt(i).data.premium);
				var a = this.equipInsuranceDetailGrid.getStore().getAt(i);
				for(var j = gridCount-1; j>i; j--){
					if(a.data.equipment.equipId == this.equipInsuranceDetailGrid.getStore().getAt(j).data.equipment.equipId){
						gridCount -= 1;
					}
				}
				
		}
		this.setFieldValue("equipNum", gridCount);
		this.setFieldValue("totalPremium", r );
		this.setFieldValue("equipInsuranceDetails", $gridstore2json(this.equipInsuranceDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
//			var resp = Ext.util.JSON.decode(e.response.responseText);
//			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipInsurance.do", resp.applyforId);
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
				url : __ctxPath + "/equip/loadEquipInsurance.do?insureId=" + this.insureId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.equipInsuranceDetailSet, this.equipInsuranceDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});