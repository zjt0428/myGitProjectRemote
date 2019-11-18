var CeaseReportForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var topbarItems = [{
		iconCls : "btn-search",
		text : "费用清单",
		handler : this.detailFee.createDelegate(this)
	}];
	if (this.saveable) {
		topbarItems.push(
				{
					iconCls : "btn-search",
					text : "费用结算",
					handler : this.caculateFee.createDelegate(this)
				}	
		)
	}
	
	var caculateRuleCombo = $initComboBoxField("结算方式", "ceaseReport.caculateRule", "CACULATE_RULE", {
		defaultValueIndex : 3
	});
	
	var fieldAllSelect = new Ext.form.CheckboxGroup({
		xtype : "checkboxgroup",
		disabled : this.existsable,
		fieldLabel : "倒扣租金",
		items : [{
			boxLabel : "否",
			checked : true,
			name : "ceaseReport.backOff",
			inputValue : "1",
			listeners : {
				 'check' : function() {
					 fieldAllSelect.singlecheck(fieldAllSelect,0);
				 }
			 }
		}, {
			boxLabel : "是",
			name : "ceaseReport.backOff",
			inputValue : "0",
			listeners : {
				 'check' : function() {
					 fieldAllSelect.singlecheck(fieldAllSelect,1);
				 }
			 }
		}],
		singlecheck : function (ChkGrp, index) {
	         if (ChkGrp.items.itemAt(index).checked) {
	             for (var i = 0; i <ChkGrp.items.length; i++) {
	                  if (i != index) {
	                     if(ChkGrp.items.itemAt(i).checked) {
	                          var id =ChkGrp.items.itemAt(i).id;
	                          ChkGrp.setValue(id, false);
                     	}
                  	}
             	}
         	}
		},
		check : function (ChkGrp, index) {
            for (var i = 0; i <ChkGrp.items.length; i++) {
                 if (i == index) {
                     var id =ChkGrp.items.itemAt(i).id;
                     ChkGrp.setValue(id, true);
             	}
        	}
		}
	});
	this.fieldSelect = fieldAllSelect;
	this.ceaseReportDetailGrid = new CeaseReportDetailGrid({
		title : "费用清单",
		saveable : this.saveable,
		tbarItems : topbarItems
	});
	var items = [ {
		xtype : "fieldset",
		title : "基础数据项",
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
					fieldLabel : "报停人员",
					name : "ceaseReport.userName",
					value:curUserInfo.fullname
				}, {
					readOnly : true,
					fieldLabel : "报停单号",
					name : "ceaseReport.ceaseSerial"
				},{
					fieldLabel : "报停主题",
					name : "ceaseReport.ceaseTitle"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "起始日期",
					name : "ceaseReport.startDate",
					value : new Date(),
					renderer : function (value,record,data){
						this.startDate = value;
						return value; 
					}
				},{
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "截止日期",
					name : "ceaseReport.endDate",
					value : new Date(),
					renderer : function (value,record,data){
						this.endDate = value;
						return value; 
					}
				},caculateRuleCombo]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					readOnly : true,
					editable : false,
					fieldLabel : "制单日期",
					name : "ceaseReport.applyDate",
					value : new Date()
				},  {
					fieldLabel : "计费方式",
					editable : false,
					readOnly : true,
					name : "ceaseReport.tranportCaculateTypeName"
				},fieldAllSelect]
			}]
		} ]
	}
	, {
		xtype : "fieldset",
		title : "合同信息",
		anchor : "98%",
		hidden : this.isMulti,
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : true,
					readOnly : true,
					fieldLabel : "合同编号",
					name : "ceaseReport.contractMaterials.contractSerial"
				},{
					allowBlank : true,
					readOnly : true,
					fieldLabel : "合同类别",
					name : "ceaseReport.contractMaterials.contractCategoryName"
				} ,{
					single : false,
					allowBlank : true,
					fieldLabel : "主管部门",
					name : "ceaseReport.contractMaterials.competentDepartment"
				}, {
					allowBlank : true,
					fieldLabel : "本次结算金额",
					name : "ceaseReport.settledAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					single : false,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "工程名称",
					name : "ceaseReport.contractMaterials.projectName"
				}, {
					single : false,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "计税方式",
					name : "ceaseReport.contractMaterials.taxCaculateTypeName"
					
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "优惠比例",
					name : "ceaseReport.contractMaterials.rentalRate"
					
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "已结算金额",
					name : "ceaseReport.finSettingAmount"
				}]
			} , {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					single : false,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "合同主题",
					name : "ceaseReport.contractMaterials.contractTheme"
				}, {
					readOnly : false,
					fieldLabel : "适用税率",
					name : "ceaseReport.contractMaterials.taxRate"
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "承租单位",
					name : "ceaseReport.contractMaterials.paEntName"
					
				},{
					single : false,
					allowBlank : true,
					fieldLabel : "出租单位",
					name : "ceaseReport.contractMaterials.pbEntName"
					
				}]
			}]
		} ]
	}
	 ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.ceaseReportDetailGrid]
	}); 
	if(!this.isMulti){
		items.push(this.relateTabPanel);
	}
	CeaseReportForm.superclass.constructor.call(this, {
		id :"CeaseReportForm",
		title : "报停管理明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "ceaseReport",
			saveable : this.saveable,
			url :  __ctxPath + "/materials/saveCeaseReport.do",
			items : items,
			fieldMapping : CeaseReportFieldMapping,
			hiddenField : CeaseReportHiddenField
		}
	});
};
Ext.extend(CeaseReportForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.backOff =  this.fieldSelect.getValue()[0].inputValue;
		var url = null;
		if(this.isMulti) {
			url = __ctxPath + "/materials/multiSaveCeaseReport.do?contractIds="+this.contractIds+"&backOff="+this.backOff;
			this.multiSubmit(this.getForm(),url);
		} else {
			this.setFieldValue("ceaseReportDetails", $gridstore2json(this.ceaseReportDetailGrid));
			$formsubmit(this.getForm(), function(c, e) {
				$toast("信息操作成功！");
				var resp = Ext.util.JSON.decode(e.response.responseText);
					if (this.callback) {
						this.callback.call(this);
					}
					this.close();
			}.createDelegate(this));
		}
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.ceaseId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadCeaseReport.do?ceaseId=" + this.ceaseId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.ceaseReportDetailSet, this.ceaseReportDetailGrid);
					if(data.backOff.indexOf("0")>=0){
						this.fieldSelect.check(this.fieldSelect,1);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.fieldSelect.items[1].checked=true;
			this.fieldSelect.items[0].checked=false;
			this.setFieldValue("userId",curUserInfo.userId);
			if(!this.isMulti){
				var fieldNames = ["contractMaterials.contractSerial","contractMaterials.contractCategoryName","contractMaterials.projectName","contractMaterials.taxCaculateTypeName",
				                  "contractMaterials.contractmaId","contractMaterials.taxRate","contractMaterials.rentalRate","contractMaterials.contractTheme",
				                  "tranportCaculateTypeName","contractMaterials.competentDepartment","contractMaterials.paEntName","contractMaterials.pbEntName",
				                  "tranportCaculateType"];
				var values = [ this.contractSerial, this.contractCategoryName, this.projectName, this.taxCaculateTypeName,this.contractmaId,this.taxRate,
				               this.rentalRate,this.contractTheme,this.tranportCaculateTypeName,this.competentDepartment,this.paEntName,this.pbEntName,this.tranportCaculateType];
				this.setMultiFieldValue(fieldNames, values);
			}else{
				this.setFieldValue("tranportCaculateTypeName",this[0].data.tranportCaculateTypeName);
			}
		}
	},
	caculateFee : function() {
		var store = this.ceaseReportDetailGrid.getStore();
		if(store.data.length>0){
			store.data.clear();
		}
		var startDate = this.formatDateTime(this.findFormField("startDate").getValue());
		var endDate = this.formatDateTime(this.findFormField("endDate").getValue());
		var rentalRate = this.getFieldValue("contractMaterials.rentalRate");
		this.backOff = this.fieldSelect.getValue()[0].inputValue;
		$request({
		url : __ctxPath + "/materials/caculateCeaseReport.do",
		waitMsg : "正在载入数据...",
		params : {
			"startDate" : startDate,
			"endDate" : endDate,
			"contractId" : this.contractmaId,
			"tranportCaculateType" : this.tranportCaculateType,
			"backOff" : this.backOff
		}, 
		success : function(b,c) {
			var data = Ext.util.JSON.decode(b.responseText);
			this.ceaseReportDetailGrid.getStore().loadData(data.result);
			this.setFieldValue("settledAmount",data.result[2].amount);
		}.createDelegate(this),
		failure : function(c, d) {
			Ext.Msg.alert("出错", "载入数据失败!");
		}
		})
	},
	formatDateTime : function(date) {   
	    var y = date.getFullYear();    
	    var m = date.getMonth() + 1;    
	    m = m < 10 ? ('0' + m) : m;    
	    var d = date.getDate();    
	    d = d < 10 ? ('0' + d) : d;    
	    return y + '-' + m + '-' + d;    
	},
	detailFee : function() {
		var startDate = this.formatDateTime(this.findFormField("startDate").getValue());
		var endDate = this.formatDateTime(this.findFormField("endDate").getValue());
		var backOff = this.fieldSelect.getValue()[0].inputValue;
		var data = [];
		var params ={};
		params.startDate=startDate;
		params.endDate=endDate;
		params.contractId=this.contractmaId? this.contractmaId : this.contractMaterials.contractmaId;
		params.tranportCaculateType= this.tranportCaculateType;
		data.params = params;
		data.materials = true;
		data.backOff = backOff;
		this.ceaseReportDetailGrid.detailFee(data);
	},
	multiSubmit : function(form,url) {
		form.submit({
			submitEmptyText:false,
			target: "附件详细信息",
			method : "POST",
			waitMsg : "正在提交数据...",
			url : url,
			success : function(b, c) {
				if (c.response.responseText.indexOf("success:false") != -1 || c.response.responseText.indexOf("\"success\":false") != -1) {
						var d = Ext.util.JSON.decode(c.response.responseText);
						msg = "由于批量新增的数量过多，需要时间处理，请稍后注意信息提示!";
						if (d.msg) {
							msg = d.msg;
						}
						Ext.MessageBox.show({
							title : "操作信息",
							msg : msg,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				} else {
					if(this.callback) {
						this.callback.call(this);
					}
					this.close();
					$toast("信息操作成功！");
				}
			}.createDelegate(this),
			failure : function(b, c) {
					var d = Ext.util.JSON.decode(c.response.responseText);
					msg = "由于批量新增的数量过多，需要时间处理，请稍后注意信息提示!";
					if (d.msg) {
						msg = d.msg;
					}
					Ext.MessageBox.show({
						title : "操作信息",
						msg : msg,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			}.createDelegate(this)
		});
	}
});