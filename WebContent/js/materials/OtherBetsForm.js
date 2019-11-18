var OtherBetsForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var feesTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "contractCostitem"
	});
	var calculationData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "CALCULATION_METHOD"
	});
	this.otherBetsDetailGrid = new OtherBetsDetailGrid({
		otherBetsId : this.otherBetsId,
		calculationData : calculationData,
		feesTypeData : feesTypeData,
//		projectId:this.equipFlow.contractLease.projectId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.otherBetsId,
		relateModule : RelationModule.otherBets.relateModule,
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
					name : "otherBets.otherBetsSerial"
				}, {
					readOnly : true,
					fieldLabel : "制单人",
					name : "otherBets.userName"
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
					fieldLabel : "收费时间",
					name : "otherBets.chargeableTime",
					value : new Date()
				}, {
					fieldLabel : "附属单据号",
					name : "otherBets.affiliatedSerial"
				}, {
					id : "total",
					readOnly : true,
					fieldLabel : "费用合计",
					name : "otherBets.totalCosts"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "otherBets.contractNo"
				}, {
					readOnly : true,
					fieldLabel : "工程名称",
					name : "otherBets.projectName",
				}, {
					readOnly : true,
					fieldLabel : "承租单位",
					name : "otherBets.paEntName",
				} ]
			} ]
		} ]
	},{
		xtype : "fieldset",
		title : "设备信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
			    xtype : "relationCompositeField",
				disabled : !this.saveable,
				readOnly : true,
				allowBlank : true,
				fieldLabel : "设备自编号",
				name : "otherBets.equipSerial",
				relateModule : RelationModule.equipmentes.relateModule,
				importhandler : this.importProjectArchives.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备型号",
					name : "otherBets.equipSpecificName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "生产厂家",
					name : "otherBets.equipVender"
				} ]
			} ]
		}]
	},{
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ fileAttachContainer ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "60%",
		layout : "fit",
		items : [ this.otherBetsDetailGrid ]
	} ];
	OtherBetsForm.superclass.constructor.call(this, {
		title : "其他业务管理明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "otherBets",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.otherBetsId,
				relateModule : RelationModule.otherBets.relateModule
			},
			url : __ctxPath + "/materials/saveOtherBets.do",
			items : items,
			fieldMapping : OtherBetsFieldMapping,
			hiddenField : OtherBetsHiddenField
		}
	});
};
Ext.extend(OtherBetsForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("otherBetsDetails", $gridstore2json(this.otherBetsDetailGrid));
		var total = 0;
		var store = this.otherBetsDetailGrid.getStore();
		for(var i=0;i<store.getCount();i++){
			if(store.getAt(i).data.calculationMethodName == "相加"){
				total += Number(store.getAt(i).data.fee);
			}else if(store.getAt(i).data.calculationMethodName == "相减") {
				total -= Number(store.getAt(i).data.fee);
			}
		}
		this.setFieldValue("totalCosts",total.toFixed(2)); 
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitOtherBets.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.otherBetsId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadOtherBets.do?otherBetsId=" + this.otherBetsId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.otherBetsDetailSet, this.otherBetsDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
            var fieldNames = ["contractId","contractNo","projectName","paEntName","contractNumber"];
            var values = [this.contractLease.contractId,this.contractLease.contractNo,this.contractLease.projectName,this.contractLease.paEntName,this.contractLease.contractNumber];
            this.setMultiFieldValue(fieldNames, values);
		}
	},
	importProjectArchives : function(otherBets) {
		this.setMultiFieldValue(["equipSerial","equipSpecific","equipSpecificName","equipVender"], [otherBets.equipSerial,otherBets.equipSpecific,otherBets.equipSpecificName,otherBets.equipVender ]);
	}
});