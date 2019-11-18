var SettleProjectForm = function(a, b) {
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

	var fieldAllSelect = new Ext.form.CheckboxGroup({
		xtype : "checkboxgroup",
		disabled : this.existsable,
		fieldLabel : "是否出借",
		items : [{
			id : "isMachine",
			boxLabel : "是",
			checked : true,
			name : "settleProject.backOff",
			inputValue : "1",
			listeners : {
				 'check' : function() {
					 fieldAllSelect.singlecheck(fieldAllSelect,0);
				 }
			 }
		}, {
			id : "noMachine",
			boxLabel : "否",
			name : "settleProject.backOff",
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
	this.settleFeeGrid = new SettleFeeGrid({
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
					fieldLabel : "结算人员",
					name : "settleProject.settleMan",
					value:curUserInfo.fullname
				}, {
					hidden:true,
					maxLength : 20,
					name : "settleProject.userId",
					value:curUserInfo.userId
				}, {
					readOnly : true,
					fieldLabel : "结算单号",
					name : "settleProject.settleSerial"
				} ]
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
					name : "settleProject.startDate",
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
					name : "settleProject.endDate",
					value : new Date(),
					renderer : function (value,record,data){
						this.endDate = value;
						return value; 
					}
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					fieldLabel : "结算日期",
					name : "settleProject.settleDate",
					value : new Date()
				},{
					fieldLabel : "结算主题",
					name : "settleProject.settleTitle"
				}]
			}]
		} ]
	}
	, {
		xtype : "fieldset",
		title : "结算信息",
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
					single : false,
					allowBlank : true,
					fieldLabel : "合同编号",
					name : "settleProject.contractSerial"
				},{
					single : false,
					allowBlank : true,
					fieldLabel : "合同类别",
					name : "settleProject.contractCategory"
				} ,{
					single : false,
					allowBlank : true,
					fieldLabel : "管理部门",
					name : "settleProject.depName"
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "本期结算金额",
					name : "settleProject.currentSettleAmount"
					
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					single : false,
					allowBlank : true,
					fieldLabel : "工程名称",
					name : "settleProject.projectName"
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "计税方式",
					name : "settleProject.taxModeName"
					
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "优惠金额",
					name : "settleProject.rentalPrice"
					
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "累计结算金额",
					name : "settleProject.totalSettleAmount"
					
				}]
			} , {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					single : false,
					allowBlank : true,
					fieldLabel : "合同税率",
					name : "settleProject.taxRate"
				}, {
					single : false,
					allowBlank : true,
					fieldLabel : "优惠比例",
					name : "settleProject.rentalRate"
					
				},{
					single : false,
					allowBlank : true,
					fieldLabel : "期初结算金额",
					name : "settleProject.initialSettleAmount"
					
				},fieldAllSelect]
			}]
		} ]
	}
	 ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.settleFeeGrid]
	}); 
	if(!this.isMulti){
		items.push(this.relateTabPanel);
	}
	SettleProjectForm.superclass.constructor.call(this, {
		title : "项目结算",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "settleProject",
			saveable : this.saveable,
			url : this.isMulti?(__ctxPath + "/equip/multiSaveSettleProject.do?contractIds="+this.contractIds):(__ctxPath + "/equip/saveSettleProject.do"),
			items : items,
			fieldMapping : SettleProjectFieldMapping,
			hiddenField : SettleProjectHiddenField
		}
	});
};
Ext.extend(SettleProjectForm, Knight.ux.FormPanelWindow, {
	importAppUserArchives : function(data,fields) {
		var s = "";
		var id = "";
		for(var i=0;i<data.length;i++){
			if(i<data.length-1){
				s+= data[i].data.fullname+",";
			}else{
				s+= data[i].data.fullname;
			}
			id+= data[i].data.userId;
		}
		this.setMultiFieldValue(fields, [s,id]);
	},
	importBaseLocationArchives : function(data) {
		this.setMultiFieldValue(["storageLocation" ], [ data.locationName ]);
	},
	
	saveFormData : function() {
		if(!this.isMulti){
			this.setFieldValue("settleProjectDetails", $gridstore2json(this.settleFeeGrid));
		}
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
		}.createDelegate(this));
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.settleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadSettleProject.do?settleId=" + this.settleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.settleProjectDetailsSet, this.settleFeeGrid);
//					this.setFieldRawValue("taxModeName", data.taxModeName);
//					this.setFieldRawValue("contractCategory", data.contractCategoryName);
					if(data.backOff.indexOf("0")>=0){
						this.fieldSelect.check(this.fieldSelect,1);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			if(!this.isMulti){
				var fieldNames = ["contractSerial","contractCategory","projectName","taxModeName","depName","contractId","taxRate","rentalRate"];
				var values = [ this.contractNo, this.contractCategoryName, this.projectName, this.taxModeName,this.competentDepartment,this.contractId,this.applicableTaxRate,this.collectionRatio];
				this.setMultiFieldValue(fieldNames, values);
			}
		}
	},
	caculateFee : function() {
		var store = this.settleFeeGrid.getStore();
		if(store.data.length>0){
			store.data.clear();
		}
		var startDate = this.formatDateTime(this.findFormField("startDate").getValue());
		var endDate = this.formatDateTime(this.findFormField("endDate").getValue());
		var rentalRate = this.findFormField("rentalRate").getValue();
		$request({
		url : __ctxPath + "/equip/caculateSettleProject.do",
		waitMsg : "正在载入数据...",
		params : {
			"startDate" : startDate,
			"endDate" : endDate,
			"rentalRate" : rentalRate,
			"contractId" : this.contractId
		}, 
		success : function(b,c) {
			var data = Ext.util.JSON.decode(b.responseText);
			for(var i = 0 ;i< data.result.length;i++){
				if(data.result[i].item.indexOf("优惠费用")>=0){
					this.findFormField("rentalPrice").setValue(data.result[i].amount);
				}
				this.findFormField("currentSettleAmount").setValue(data.result[i].currentSettleAmount);
				this.settleFeeGrid.addSubModuleDate(data.result[i]);
			}
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
		var data = [];
		var params ={};
		params.startDate=startDate;
		params.endDate=endDate;
		params.contractId=this.contractId;
		data.params = params;
		this.settleFeeGrid.detailFee(data);
	},

});