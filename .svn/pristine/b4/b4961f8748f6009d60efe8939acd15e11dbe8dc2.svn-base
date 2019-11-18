var OtherBusinessForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var feesTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "feesType"
	});
	var calculationData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "CALCULATION_METHOD"
	});
	var baseDepotData = $ajaxSyncCall(__ctxPath + "/materials/listBaseDepotPermission.do", {
		userId : curUserInfo.userId
	});
	this.otherBusinessDetailGrid = new OtherBusinessDetailGrid({
		otherBusinessId : this.otherBusinessId,
		calculationData : calculationData,
		feesTypeData : feesTypeData,
//		projectId:this.equipFlow.contractLease.projectId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.otherBusinessId,
		relateModule : RelationModule.otherBusiness.relateModule,
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [/* {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "状态",
					name : "lostCompensation.applyforStateName"
				},*/ {
					readOnly : true,
					fieldLabel : "单据编号",
					name : "otherBusiness.otherBusinessSerial"
				}, {
					readOnly : true,
					fieldLabel : "制单人",
					name : "otherBusiness.userName"
				}, {
					xtype : "simplecombo",
					width : 130,
					readOnly : false,
					codeData : baseDepotData,
					fieldLabel : "基地仓库名称",
					hiddenName : "otherBusiness.baseDepot.depotId",
					name : "otherBusiness.baseDepot.depotName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "收费时间",
					name : "otherBusiness.chargeableTime",
					value : new Date()
				}, {
					fieldLabel : "附属单据号",
					name : "otherBusiness.affiliatedSerial"
				}, {
					id : "total",
					readOnly : true,
					fieldLabel : "费用合计",
					name : "otherBusiness.totalCosts"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "otherBusiness.contractSerial"
				}, {
					readOnly : true,
					fieldLabel : "工程名称",
					name : "otherBusiness.projectName",
				}, {
					readOnly : true,
					fieldLabel : "承租单位",
					name : "otherBusiness.paEntName",
				} ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "60%",
		layout : "fit",
		items : [ this.otherBusinessDetailGrid ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
			anchor : "85%",
			maxLength : 1000,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "otherBusiness.remark"
		} ]
	} ];
	OtherBusinessForm.superclass.constructor.call(this, {
		title : "其他业务信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "otherBusiness",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.otherBusinessId,
				relateModule : RelationModule.otherBusiness.relateModule
			},
			url : __ctxPath + "/materials/saveOtherBusiness.do",
			items : items,
			fieldMapping : OtherBusinessFieldMapping,
			hiddenField : OtherBusinessHiddenField
		}
	});
};
Ext.extend(OtherBusinessForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("otherBusinessDetails", $gridstore2json(this.otherBusinessDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitOtherBusiness.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.otherBusinessId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadOtherBusiness.do?otherBusinessId=" + this.otherBusinessId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.otherBusinessDetailSet, this.otherBusinessDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
            var fieldNames = ["contractId","contractSerial","projectName","paEntName","contractNumber"];
            var values = [this.contractMaterials.contractmaId,this.contractMaterials.contractSerial,this.contractMaterials.projectName,this.contractMaterials.paEntName,this.contractMaterials.contractNumber];
            this.setMultiFieldValue(fieldNames, values);
		}
	}
});