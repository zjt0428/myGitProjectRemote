var LostCompensationForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	
	this.lostCompensationDetailGrid = new LostCompensationDetailGrid({
		contractId:this.contractMaterials==null ? null : this.contractMaterials.contractmaId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.lostId,
		relateModule : RelationModule.lostCompensation.relateModule,
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
					width : 260,
					fieldLabel : "主题",
					name : "lostCompensation.lostTheme"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "丢失单号",
					name : "lostCompensation.lostSerial"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "制单人",
					name : "lostCompensation.userName"
				} , {
					width : 260,
					fieldLabel : "审核人",
					name : "lostCompensation.checkMan"
				}, {
					width : 260,
					fieldLabel : "审批人",
					name : "lostCompensation.recheckMan"
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
					name : "lostCompensation.applyDate",
					value : new Date()
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "lostCompensation.projectName"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "承租单位",
					name : "lostCompensation.paEntName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 260,
					editable : false,
					readOnly : true,
					fieldLabel : "审核时间",
					name : "lostCompensation.checkDate"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 260,
					editable : false,
					readOnly : true,
					fieldLabel : "审批时间",
					name : "lostCompensation.recheckDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 260,
					readOnly : true,
					fieldLabel : "合同编号",
					name : "lostCompensation.contractSerial"
				}, {
					width : 260,
					readOnly : true,
					fieldLabel : "项目地址",
					name : "lostCompensation.address"
				}, {
					id : "compensationDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 260,
					editable : false,
//					readOnly : true,
					fieldLabel : "丢失赔偿时间",
					name : "lostCompensation.compensationDate",
					value : new Date()
				}, {
					width : 260,
					id : "lostCompensation_totalCompensation",
					readOnly : true,
					fieldLabel : "丢失赔偿金额",
					name : "lostCompensation.totalCompensation",
					value : 0
				}, {
					width : 260,
					fieldLabel : "丢失批次说明",
					name : "lostCompensation.explain"
				} ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.lostCompensationDetailGrid ]
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
			name : "lostCompensation.remark"
		} ]
	} ];
	LostCompensationForm.superclass.constructor.call(this, {
		title : "周材丢失赔偿处理",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "lostCompensation",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.lostId,
				relateModule : RelationModule.lostCompensation.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.lostId,
				relateModule : RelationModule.lostCompensation.relateModule
			},
			url : __ctxPath + "/materials/saveLostCompensation.do",
			items : items,
			fieldMapping : LostCompensationFieldMapping,
			hiddenField : LostCompensationHiddenField
		}
	});
};
Ext.extend(LostCompensationForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("lostCompensationDetails", $gridstore2json(this.lostCompensationDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitLostCompensation.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.lostId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLostCompensation.do?lostId=" + this.lostId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.lostCompensationDetailSet, this.lostCompensationDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
            var fieldNames = ["contractMaterials.contractmaId","contractSerial","projectName","paEntName","address","contractNumber"];
            var values = [this.contractMaterials.contractmaId,this.contractMaterials.contractSerial,this.contractMaterials.projectName,this.contractMaterials.paEntName,this.contractMaterials.address,this.contractMaterials.contractNumber];
            this.setMultiFieldValue(fieldNames, values);
		}
	}
});