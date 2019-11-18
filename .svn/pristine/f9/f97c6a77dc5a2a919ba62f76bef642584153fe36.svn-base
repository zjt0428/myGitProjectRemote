var LeasedLostCompensationForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	
	this.leasedLostCompensationDetailGrid = new LeasedLostCompensationDetailGrid({
		leaseId:this.leaseContract==null ? null : this.leaseContract.leaseId,
		contractId:this.leaseContract==null ? null : this.leaseContract.contractId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.lostId,
		relateModule : RelationModule.leasedLostCompensation.relateModule,
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
					name : "LeasedLostCompensation.applyforStateName"
				},*/ {
					width : 260,
					fieldLabel : "主题",
					name : "leasedLostCompensation.lostTheme"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "丢失单号",
					name : "leasedLostCompensation.lostSerial"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "制单人",
					name : "leasedLostCompensation.userName"
				} , {
					width : 260,
					readOnly : true,
					fieldLabel : "审核人",
					name : "leasedLostCompensation.checkMan"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "审批人",
					name : "leasedLostCompensation.recheckMan"
				}  ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 260,
					editable : false,
					readOnly : true,
					fieldLabel : "制单日期",
					name : "leasedLostCompensation.applyDate",
					value : new Date()
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "leasedLostCompensation.projectName"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "承租单位",
					name : "leasedLostCompensation.paEntName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 260,
					editable : false,
					readOnly : true,
					fieldLabel : "审核时间",
					name : "leasedLostCompensation.checkDate"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 260,
					editable : false,
					readOnly : true,
					fieldLabel : "审批时间",
					name : "leasedLostCompensation.recheckDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 260,
					readOnly : true,
					fieldLabel : "合同编号",
					name : "leasedLostCompensation.contractSerial"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "项目地址",
					name : "leasedLostCompensation.address"
				}, {
					id : "leaseCompensationDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 260,
					editable : false,
					readOnly : true,
					fieldLabel : "丢失赔偿时间",
					name : "leasedLostCompensation.compensationDate",
					value : new Date()
				}, {
					width : 260,
					id : "leasedLostCompensation_totalCompensation",
					readOnly : true,
					fieldLabel : "丢失赔偿金额",
					name : "leasedLostCompensation.totalCompensation",
					value : 0
				}, {
					width : 260,
					fieldLabel : "丢失批次说明",
					name : "leasedLostCompensation.explain"
				} ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.leasedLostCompensationDetailGrid ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ fileAttachContainer, {
			anchor : "85%",
			maxLength : 1000,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "leasedLostCompensation.remark"
		} ]
	} ];
	LeasedLostCompensationForm.superclass.constructor.call(this, {
		title : "租借丢失赔偿",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "leasedLostCompensation",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.lostId,
				relateModule : RelationModule.leasedLostCompensation.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.lostId,
				relateModule : RelationModule.leasedLostCompensation.relateModule
			},
			url : __ctxPath + "/materials/saveLeasedLostCompensation.do",
			items : items,
			fieldMapping : LeasedLostCompensationFieldMapping,
			hiddenField : LeasedLostCompensationHiddenField
		}
	});
};
Ext.extend(LeasedLostCompensationForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("leasedLostCompensationDetails", $gridstore2json(this.leasedLostCompensationDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitLeasedLostCompensation.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.lostId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLeasedLostCompensation.do?lostId=" + this.lostId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.leasedLostCompensationDetailSet, this.leasedLostCompensationDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
            var fieldNames = ["leaseContract.leaseId","contractSerial","projectName","paEntName","address","contractNumber","projectId"];
            var values = [this.leaseContract.leaseId,this.leaseContract.leaseIdentifier,this.leaseContract.project.projectName,this.leaseContract.lesseeUnit,
                          this.leaseContract.project.address,this.leaseContract.leaseSerial,this.leaseContract.project.projectId];
            this.setMultiFieldValue(fieldNames, values);
		}
	}
});