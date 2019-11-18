var EquipInsuranceFrom = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.componId,
		relateModule : RelationModule.component.relateModule,
		saveable : this.saveable
	});
	var insureProgramData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "insureProgram"
	});//合同单位
	this.equipInsuranceDetailGrid = new EquipInsuranceDetailGrid(null, {
		saveable : this.saveable,
		insureProgramData : insureProgramData,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
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
					allowBlank : false,
					fieldLabel : "保险单号",
					name : "equipInsurance.insureSerial"
				}, {
					allowBlank : false,
					fieldLabel : "联系人",
					name : "equipInsurance.linkman"
				}, {
					readOnly : true,
					fieldLabel : "保费总额",
					name : "equipInsurance.totalPremium"
				}, {
					width : 600,
					height : 70,
					fieldLabel : "备注",
					allowBlank : true,
					name : "equipInsurance.remark"
				}, fileAttachContainer ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "保险公司",
					allowBlank : false,
					name : "equipInsurance.insuranceCompany"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "起保日期",
					name : "equipInsurance.startInsureDate",
				}, {
					readOnly : true,
					fieldLabel : "保障数量",
					name : "equipInsurance.equipNum"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					fieldLabel : "理赔电话",
					name : "equipInsurance.claimPhone"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "停保日期",
					name : "equipInsurance.endInsureDate",
				} ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipInsuranceDetailGrid ]
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
		for (var i = 0; i < this.equipInsuranceDetailGrid.getStore().getCount(); i++) {
			r += Number( this.equipInsuranceDetailGrid.getStore().getAt(i).data.premium);
		}
		this.setFieldValue("equipNum", gridCount);
		this.setFieldValue("totalPremium", r );
		this.setFieldValue("equipInsuranceDetails", $gridstore2json(this.equipInsuranceDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipInsurance.do", resp.applyforId);
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
		}
	}
});