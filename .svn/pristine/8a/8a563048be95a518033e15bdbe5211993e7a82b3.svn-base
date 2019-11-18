var LaborSettleForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮
	var practiTypeCombo = $initComboBoxField("人员类型", "laborSettle.practiType", "PRACTI_TYPE", {
		editable : false,
		allowBlank : false,
		value : this.equipGeneric,
		readOnly : !this.saveable,
		listeners:{
			select: function(combo, record, index){
			   var c =this.getFieldValue('deductions');
			   var total =this.getFieldValue('costTotal');
     		   var reta =this.getFieldValue('settleContract.taxRate');
     		   var equipGeneric =this.getFieldValue('equipment.equipGeneric');
     		   var f = Number(reta.substring(0,reta.length-1))/100;
     		   var equipFee = this.getFieldValue('equipFee');
     		   var practiFee = this.getFieldValue('practiFee');
     		   var managerFee = this.getFieldValue('managerFee');
        	   if("0" == record.data.code){
        		   this.setFieldValue("taxPoint", Number(total)*f);
        		   var riskFee = (Number(total)-(Number(total)*f))*0.04;
        		   this.setFieldValue("riskFee", Number(riskFee));
        		   if(Number(practiFee) == ""){
        			   practiFee = 100;
        			   this.setFieldValue("practiFee", Number(practiFee));
        		   }else{
        			   this.setFieldValue("practiFee", Number(practiFee));
        		   }
        		   if(Number(managerFee) == ""){
        			   managerFee = 0;
        			   this.setFieldValue("managerFee", Number(managerFee));
        		   }else{
        			   this.setFieldValue("managerFee", Number(managerFee));
        		   }
        		   var laborFree = Number(total)-Number(riskFee)-(Number(total)*f)-Number(c)
        		   this.setFieldValue("laborFree",laborFree);
        	   }else{
        		   this.setFieldValue("taxPoint", Number(total)*f);
        		   var riskFee = (Number(total)-(Number(total)*f))*0.05;
        		   this.setFieldValue("riskFee", Number(riskFee));
        		   var managerFee = (Number(total)-(Number(total)*f))*0.013;
        		   this.setFieldValue("managerFee", Number(managerFee));
        		   this.setFieldValue("practiFee", 100);
        		   
        		   if("S" == equipGeneric){
        			   if(Number(equipFee)==""){
        				   equipFee = 0;
        				   this.setFieldValue("equipFee",Number(equipFee));
        			   }else {
        				   this.setFieldValue("equipFee",Number(equipFee));
        			   }
        		   }else{
        			   if(Number(equipFee)==""){
        				   equipFee = 220;
        				   this.setFieldValue("equipFee",Number(equipFee));
        			   }else {
        				   this.setFieldValue("equipFee",Number(equipFee));
        			   }
        		   }
        		   if(Number(practiFee) == ""){
        			   practiFee = 100;
        			   this.setFieldValue("practiFee", Number(practiFee));
        		   }else{
        			   this.setFieldValue("practiFee", Number(practiFee));
        		   }
        		   var laborFree = Number(total)-Number(practiFee)-Number(equipFee)-Number(riskFee)-Number(managerFee)-(Number(total)*f)-Number(c);
        		   this.setFieldValue("laborFree", laborFree);
        	   }
		     }.createDelegate(this)
		}
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报信息",
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
					name : "laborSettle.userName"
				}, {
					hidden : true,
					name : "laborSettle.userId"
				}, {
					hidden : true,
					name : "laborSettle.equipment.equipGeneric"
				}, {
					readOnly : true,
					fieldLabel : "结算编号",
					name : "laborSettle.laborSettSerial"
				}, {
					id:"summaryReceivable",
					readOnly : true,
					fieldLabel : "累计应收租金",
					name : "laborSettle.settleContract.summaryReceivable"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					readOnly : true,
					format : "Y-m-d H:i:s",
					width : 150,
					editable : false,
					fieldLabel : "填报日期",
					name : "laborSettle.createDate",
					value : new Date()
				}, {
					width : 330,
					maxLength : 126,
					readOnly : true,
					fieldLabel : "结算主题",
					name : "laborSettle.settleContract.settleTheme"
				}, {
					id:"summaryReceived",
					readOnly : true,
					fieldLabel : "累计已收租金",
					name : "laborSettle.settleContract.summaryReceived"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "laborSettle.department.depName"
				}, {
					hidden : true,
					name : "laborSettle.department.depId"
				},{
					readOnly : true,
					fieldLabel : "结算方式",
					name : "laborSettle.settleContract.fundTypeName"
				}, {
					readOnly : true,
					fieldLabel : "尚欠款",
					name : "laborSettle.settleContract.arrears"
				}]
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
					id: "startSettleDate",
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 200,
					readOnly : true,
					editable : false,
					fieldLabel : "结算起始时间",
					name : "laborSettle.startSettleDate",
					value : new Date()
				}, {
					width : 330,
					readOnly : true,
					fieldLabel : "合同主题",
					name : "laborSettle.settleContract.contractTheme"
				}, {
					width : 330,
					readOnly : true,
					fieldLabel : "承租单位",
					name : "laborSettle.paEntName"
				}, {
					width : 330,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "laborSettle.projectName"
				}, {
					width : 200,
					readOnly : true,
					xtype : "numberfield",
					fieldLabel : "已收金额",
					name : "laborSettle.paidAmount",
					value : 0
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id : "endSettleDate",
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 200,
					readOnly : true,
					editable : false,
					fieldLabel : "结算截止时间",
					name : "laborSettle.endSettleDate",
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "合同编号",
					name : "laborSettle.contractNo"
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "出租单位",
					name : "laborSettle.pbEntName",
				}, {
					width : 200,
					readOnly : true,
					fieldLabel : "项目编号",
					name : "laborSettle.settleContract.projectSerial"
				}, {
					width : 200,
					readOnly : true,
					xtype : "numberfield",
					fieldLabel : "剩余金额",
					name : "laborSettle.afterTaxAmount"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id:"settleAmount",
					readOnly : true,
					xtype : "numberfield",
					fieldLabel : "本期结算金额（元）",
					name : "laborSettle.costTotal"
				}, {
					readOnly : true,
					fieldLabel : "结算标识",
					name : "laborSettle.settleLogo"
				}, {
					readOnly : true,
					fieldLabel : "款项状态",
					name : "laborSettle.payStateName"
				}, {
					readOnly : true,
					fieldLabel : "税率",
					name : "laborSettle.settleContract.taxRate",
				}]
			} ]
		} ]
	},{
		xtype : "fieldset",
		title : "其他信息",
		anchor : "95%",
		collapsible : true,
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					fieldLabel : "扣款",
					name : "laborSettle.deductions",
				}, {
					readOnly : true,
					xtype : "numberfield",
					fieldLabel : "税点",
					name : "laborSettle.taxPoint",
				}, {
					xtype : "numberfield",
					fieldLabel : "风险金",
					name : "laborSettle.riskFee",
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					readOnly : true,
					xtype : "numberfield",
					fieldLabel : "劳务费",
					name : "laborSettle.laborFree",
				}, {
					xtype : "numberfield",
					fieldLabel : "设备保费",
					name : "laborSettle.equipFee",
				},{
					xtype : "numberfield",
					fieldLabel : "管理费",
					name : "laborSettle.managerFee",
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					fieldLabel : "人员保费",
					name : "laborSettle.practiFee",
				},practiTypeCombo ]
			} ]
		}]
	}];
	LaborSettleForm.superclass.constructor.call(this, {
		title : "劳务结算明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 960,
		height : 760,
		form_config : {
			labelWidth : 100,
			object : "laborSettle",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.laborSettId,
				relateModule : RelationModule.laborSettle.relateModule
			},
			url : __ctxPath + "/dispatch/saveLaborSettle.do",
			items : items,
			fieldMapping : LaborSettleFieldMapping,
			hiddenField : LaborSettleHiddenField
		}
	});
};
Ext.extend(LaborSettleForm, Knight.ux.FormPanelWindow, {
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
		if (!Ext.isEmpty(this.laborSettId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadLaborSettle.do?laborSettId=" + this.laborSettId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("practiType", data.practiTypeName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} 
	}
	
});