var OtherLeaseBusinessForm = function(a, b) {
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
	this.otherLeaseDetailGrid = new OtherLeaseDetailGrid({
		otherId : this.otherId,
		calculationData : calculationData,
		feesTypeData : feesTypeData
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.otherId,
		relateModule : RelationModule.otherLeaseBusiness.relateModule,
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
					name : "otherLeaseBusiness.businessSerial"
				}, {
					readOnly : true,
					fieldLabel : "制单人",
					name : "otherLeaseBusiness.userName"
				}, {
					xtype : "simplecombo",
					width : 130,
					readOnly : false,
					codeData : baseDepotData,
					fieldLabel : "基地仓库名称",
					hiddenName : "otherLeaseBusiness.baseDepot.depotId",
					name : "otherLeaseBusiness.baseDepot.depotName"
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
					name : "otherLeaseBusiness.chargeableTime",
					value : new Date()
				}, {
					fieldLabel : "附属单据号",
					name : "otherLeaseBusiness.affiliatedSerial"
				}, {
					id : "total",
					readOnly : true,
					fieldLabel : "费用合计",
					name : "otherLeaseBusiness.totalCosts"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "otherLeaseBusiness.leaseContract.leaseIdentifier"
				}, {
					readOnly : true,
					fieldLabel : "工程名称",
					name : "otherLeaseBusiness.projectName",
				}, {
					readOnly : true,
					fieldLabel : "租借单位",
					name : "otherLeaseBusiness.leaseContract.leaseUnit",
				} ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "60%",
		layout : "fit",
		items : [ this.otherLeaseDetailGrid ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [{
			anchor : "85%",
			maxLength : 1000,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "otherLeaseBusiness.remark"
		}]
	} ];
	OtherLeaseBusinessForm.superclass.constructor.call(this, {
		title : "租借其他业务",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "otherLeaseBusiness",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.otherId,
				relateModule : RelationModule.otherLeaseBusiness.relateModule
			},
			url : __ctxPath + "/materials/saveOtherLeaseBusiness.do",
			items : items,
			fieldMapping : OtherLeaseBusinessFieldMapping,
			hiddenField : OtherLeaseBusinessHiddenField
		}
	});
};
Ext.extend(OtherLeaseBusinessForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("otherLeaseDetails", $gridstore2json(this.otherLeaseDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitOtherLeaseBusiness.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.otherId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadOtherLeaseBusiness.do?otherId=" + this.otherId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.otherLeaseDetailSet, this.otherLeaseDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
            var fieldNames = ["leaseContract.leaseId","leaseContract.leaseIdentifier","projectName","leaseContract.leaseUnit","leaseContract.leaseSerial"];
            var values = [this.leaseContract.leaseId,this.leaseContract.leaseIdentifier,this.leaseContract.project.projectName,
                          this.leaseContract.leaseUnit,this.leaseContract.leaseSerial];
            this.setMultiFieldValue(fieldNames, values);
		}
	}
});