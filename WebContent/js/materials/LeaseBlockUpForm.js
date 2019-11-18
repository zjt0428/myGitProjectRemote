var LeaseBlockUpForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var topbarItems = [{
		iconCls : "btn-search",
		text : "费用清单",
		handler : this.detailFee.createDelegate(this)
	}];
	var insideTopbarItems = [{
		iconCls : "btn-search",
		text : "费用清单",
		handler : this.insideDetailFee.createDelegate(this)
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
	
	var caculateRuleCombo = $initComboBoxField("结算方式", "leaseBlockUp.caculateRule", "CACULATE_RULE", {
		defaultValueIndex : 3
	});
	
	var fieldAllSelect = new Ext.form.CheckboxGroup({
		xtype : "checkboxgroup",
		disabled : this.existsable,
		fieldLabel : "倒扣租金",
		items : [{
			boxLabel : "否",
			checked : true,
			name : "leaseBlockUp.backOff",
			inputValue : "1",
			listeners : {
				 'check' : function() {
					 fieldAllSelect.singlecheck(fieldAllSelect,0);
				 }
			 }
		}, {
			boxLabel : "是",
			name : "leaseBlockUp.backOff",
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
	this.leaseBlockUpDetailGrid = new LeaseBlockUpDetailGrid({
		saveable : this.saveable,
		tbarItems : topbarItems
	});
	this.insideBlockUpDetailGrid = new InsideBlockUpDetailGrid({
		saveable : this.saveable,
		tbarItems : insideTopbarItems
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
					readOnly : true,
					fieldLabel : "报停人员",
					name : "leaseBlockUp.userName",
					value : curUserInfo.fullname
				}, {
					readOnly : true,
					fieldLabel : "报停单号",
					name : "leaseBlockUp.blockSerial"
				}, {
					fieldLabel : "报停主题",
					name : "leaseBlockUp.blockTitle"
				}, {
					readOnly : true,
					fieldLabel : "报停天数",
					name : "leaseBlockUp.blockupDays"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "起始日期",
					name : "leaseBlockUp.startDate",
					value : new Date(),
					renderer : function (value,record,data){
						this.startDate = value;
						return value; 
					}
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "截止日期",
					name : "leaseBlockUp.endDate",
					value : new Date(),
					renderer : function (value,record,data){
						this.endDate = value;
						return value; 
					}
				}, caculateRuleCombo]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					readOnly : true,
					editable : false,
					fieldLabel : "制单日期",
					name : "leaseBlockUp.applyDate",
					value : new Date()
				}, {
					fieldLabel : "计费方式",
					editable : false,
					readOnly : true,
					name : "leaseBlockUp.tranportCaculateTypeName"
				}, fieldAllSelect]
			}]
		} ]
	}, {
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
					name : "leaseBlockUp.leaseContract.leaseIdentifier"
				}, {
					allowBlank : true,
					fieldLabel : "主管部门",
					name : "leaseBlockUp.leaseContract.depName"
				}, {
					allowBlank : true,
					fieldLabel : "本次结算金额",
					name : "leaseBlockUp.settledAmount"
				}, {
					allowBlank : true,
					fieldLabel : "内部结算金额",
					name : "leaseBlockUp.insideAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : true,
					readOnly : true,
					fieldLabel : "工程名称",
					name : "leaseBlockUp.leaseContract.project.projectName"
				}, {
					allowBlank : true,
					readOnly : true,
					fieldLabel : "计税方式",
					name : "leaseBlockUp.leaseContract.taxMethodName"
				}, {
					allowBlank : true,
					fieldLabel : "优惠比例",
					name : "leaseBlockUp.leaseContract.discountRentalRate"
					
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "已结算金额",
					name : "leaseBlockUp.finSettingAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : true,
					readOnly : true,
					fieldLabel : "合同主题",
					name : "leaseBlockUp.leaseContract.leaseTheme"
				}, {
					readOnly : true,
					fieldLabel : "适用税率",
					name : "leaseBlockUp.leaseContract.taxRate"
				}, {
					readOnly : true,
					allowBlank : true,
					fieldLabel : "承租单位",
					name : "leaseBlockUp.leaseContract.lesseeUnit"
				}, {
					readOnly : true,
					allowBlank : true,
					fieldLabel : "租借单位",
					name : "leaseBlockUp.leaseContract.leaseUnit"
				} ]
			} ]
		} ]
	}
	 ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.leaseBlockUpDetailGrid, this.insideBlockUpDetailGrid]
	}); 
	if(!this.isMulti){
		items.push(this.relateTabPanel);
	}
	LeaseBlockUpForm.superclass.constructor.call(this, {
		id :"LeaseBlockUpForm",
		title : "租借报停明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "leaseBlockUp",
			saveable : this.saveable,
			url :  __ctxPath + "/materials/saveLeaseBlockUp.do",
			items : items,
			fieldMapping : LeaseBlockUpFieldMapping,
			hiddenField : LeaseBlockUpHiddenField
		}
	});
};
Ext.extend(LeaseBlockUpForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.backOff =  this.fieldSelect.getValue()[0].inputValue;
		var url = null;
		if(this.isMulti) {
			url = __ctxPath + "/materials/multiSaveLeaseBlockUp.do?leaseIds="+this.leaseIds+"&backOff="+this.backOff;
			this.multiSubmit(this.getForm(),url);
		} else {
			this.setFieldValue("leaseBlockUpDetails", $gridstore2json(this.leaseBlockUpDetailGrid));
			this.setFieldValue("insideBlockUpDetails", $gridstore2json(this.insideBlockUpDetailGrid));
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
		if (!Ext.isEmpty(this.blockId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLeaseBlockUp.do?blockId=" + this.blockId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.leaseBlockUpDetailSet, this.leaseBlockUpDetailGrid);
					this.setFormSubModuleGrid(data.insideBlockUpDetailSet, this.insideBlockUpDetailGrid);
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
				var fieldNames = ["leaseContract.leaseIdentifier","leaseContract.depName","leaseContract.project.projectName","leaseContract.taxMethodName",
				                  "leaseContract.lesseeUnit","leaseContract.taxMethod","leaseContract.discountRentalRate","leaseContract.leaseTheme",
				                  "leaseContract.taxRate","leaseContract.leaseUnit","tranportCaculateTypeName","tranportCaculateType","leaseContract.leaseId"];
				var values = [ this.leaseContract.leaseIdentifier, this.leaseContract.depName, this.leaseContract.project.projectName, this.leaseContract.taxMethodName,
				               this.leaseContract.lesseeUnit,this.leaseContract.taxMethod,this.leaseContract.discountRentalRate,this.leaseContract.leaseTheme,this.leaseContract.taxRate,
				               this.leaseContract.leaseUnit,this.leaseContract.accountingMethodName,this.leaseContract.accountingMethod,this.leaseContract.leaseId];
				this.setMultiFieldValue(fieldNames, values);
			}else{
				this.setFieldValue("tranportCaculateTypeName",this.accountingMethodName);
			}
		}
	},
	caculateFee : function() {
		var startDate = this.formatDateTime(this.getFieldValue("startDate"));
		var endDate = this.formatDateTime(this.getFieldValue("endDate"));
//		var rentalRate = this.getFieldValue("leaseBlockUp.leaseContract.discountRentalRate");
		var sDate = new Date(startDate);
		var eDate = new Date(endDate);
		var blockupDays =  Math.round((eDate.getTime() - sDate.getTime())/(86400000))+1;
		this.setFieldValue("blockupDays", blockupDays);
		this.backOff = this.fieldSelect.getValue()[0].inputValue;
		$request({
		url : __ctxPath + "/materials/caculateLeaseBlockUp.do",
		waitMsg : "正在载入数据...",
		params : {
			"startDate" : startDate,
			"endDate" : endDate,
			"leaseId" :  this.leaseContract.leaseId,
			"accountingMethod" : this.accountingMethod,
			"backOff" : this.backOff
		}, 
		success : function(b,c) {
			var data = Ext.util.JSON.decode(b.responseText);
			var set1 =[];
			var set2 =[];
			if(this.blockId) {
				for(var i=0; i<data.result.length; i++) {
					data.result[i].blockId = this.blockId;
				}
			}
			set1.push(data.result[0]);
			set1.push(data.result[1]);
			set1.push(data.result[2]);
			set2.push(data.result[3]);
			set2.push(data.result[4]);
			set2.push(data.result[5]);
			var store1 = this.leaseBlockUpDetailGrid.getStore();
			if(store1) {
				for(var i=0; i<store1.getCount(); i++){
					for(var j=0; j<set1.length; j++) {
						if(store1.getAt(i).data.item==set1[j].item) {
							set1[j].detailId = store1.getAt(i).data.detailId
						}
					}
				}
			}
			var store2 = this.insideBlockUpDetailGrid.getStore();
			if(store2) {
				for(var i=0; i<store2.getCount(); i++){
					for(var j=0; j<set2.length; j++) {
						if(store2.getAt(i).data.item==set2[j].item) {
							set2[j].detailId = store2.getAt(i).data.detailId
						}
					}
				}
			}
			this.leaseBlockUpDetailGrid.getStore().loadData(set1);
			this.insideBlockUpDetailGrid.getStore().loadData(set2);
			this.setFieldValue("settledAmount",data.result[2].amount);
			this.setFieldValue("insideAmount",data.result[5].amount);
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
		params.leaseId=this.leaseContract.leaseId;
		params.tranportCaculateType= this.tranportCaculateType;
		data.params = params;
		data.materials = true;
		data.backOff = backOff;
		this.leaseBlockUpDetailGrid.detailFee(data);
	},
	insideDetailFee : function() {
		var startDate = this.formatDateTime(this.findFormField("startDate").getValue());
		var endDate = this.formatDateTime(this.findFormField("endDate").getValue());
		var backOff = this.fieldSelect.getValue()[0].inputValue;
		var data = [];
		var params ={};
		params.startDate=startDate;
		params.endDate=endDate;
		params.leaseId=this.leaseContract.leaseId;
		params.tranportCaculateType= this.tranportCaculateType;
		data.params = params;
		data.materials = true;
		data.backOff = backOff;
		this.insideBlockUpDetailGrid.detailFee(data);
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