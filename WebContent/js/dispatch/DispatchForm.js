var DispatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var dispatchCheckboxGroup = new Ext.form.CheckboxGroup({  
		id:"dispatchCheckboxGroup",
	    xtype: 'checkboxgroup',  
	    name: 'model_type',  
	    width: 180,
	    columns: 3,
	    //fieldLabel: '',  
	    items: [
	    	{boxLabel: '主机', name: 'host'},
	        {boxLabel: '标准节', name: 'standardSection'},
	        {boxLabel: '附墙', name: 'wall'},
	        {boxLabel: '底座', name: 'base'},
	        {boxLabel: '其他', name: 'other'}
	    ]
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报人信息",
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
					name : "dispatch.userName"
				}, {
					readOnly : true,
					editable : false,
					fieldLabel : "调度编号",
					emptyText:"系统自动生成",
					name : "dispatch.dispatchSerial"
				}, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "dispatch.department.depName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					id : "providedDate",
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					readOnly : true,
					fieldLabel : "填报日期",
					name : "dispatch.providedDate",
					value : new Date()
				}, {
					id : "dispatchTheme",
					fieldLabel : "调度主题",
					allowBlank : false,
					name : "dispatch.dispatchTheme",
					tooltip : "默认为新增时的项目名称+的调度+年月日",
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ dispatchCheckboxGroup ,{
					xtype : "button",
					bodyStyle : "padding-left:10px",
					text : "确定",
					fieldLabel : "主题按钮",
					handler : this.addTheme.createDelegate(this)
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
					readOnly : true,
					fieldLabel : "关联业务",
					name : "dispatch.relateModuleName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "dispatch.relateSerial"
				}, {
					readOnly : true,
					fieldLabel : "项目编号",
					name : "dispatch.projectSerial"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "dispatch.projectName"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "发货仓库",
					fields : [ "deliveryEntId", "deliveryEntName","deliveryAddress" ],
					name : "dispatch.deliveryEntName",
					relateModule : RelationModule.storeHouse.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importStoreHouseArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "承租单位",
					name : "dispatch.receiveEntName",
					fields : [ "receiveEntId", "receiveEntName" ],
					relateModule : RelationModule.customer.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importCustomerArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					width : 400,
					fieldLabel : "仓库地址",
					name : "dispatch.deliveryAddress"
				}, {
					width : 400,
					fieldLabel : "项目地址",
					name : "dispatch.receiveAddress"
				}]
			} ]
		} ]
	} ];
	this.initRelationPanel(this.relation);
	this.dispatchComponGrid = new DispatchComponGrid(a, {
		addForbidden : true,
		delForbidden : false,
		saveable : this.saveable,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	});
	
	var resourceItems = [ this.dispatchComponGrid ];
	if (this.dispatchEquipGrid) {
		resourceItems.unshift(this.dispatchEquipGrid);
	}
	items.push({
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : resourceItems
	});

	var tbarItems = null;
	if (this.relationPanel) {
		items.push(this.relationPanel);
		if (this.saveable) {
			tbarItems = [ {
				iconCls : "btn-collapse",
				text : "隐藏关联业务",
				handler : this.onOffRelationPanel.createDelegate(this)
			} ];
		}
	};
	items.push( {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
			anchor : "95%",
			maxLength : 1000, 
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",			
			fieldLabel : "备注",
			name : "dispatch.remark"
		} ] 
	} )
	DispatchForm.superclass.constructor.call(this, {
		title : "调度信息明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "dispatch",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.dispatchId,
				relateModule : RelationModule.dispatch.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.dispatchId,
				relateModule : RelationModule.dispatch.relateModule
			},
			url : __ctxPath + "/dispatch/saveDispatch.do",
			items : items,
			fieldMapping : DispatchFieldMapping,
			hiddenField : DispatchHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(DispatchForm, Knight.ux.FormPanelWindow, {
	initRelationPanel : function() {
	},
	preSaveValidate : function() {
		return true;
	},
	onOffRelationPanel : function(btn) {
		if (this.relationPanel.isVisible()) {
			this.relationPanel.hide();
			btn.setIconClass("btn-expand");
			btn.setText("显示关联业务");
		} else {
			this.relationPanel.show();
			btn.setIconClass("btn-collapse");
			btn.setText("隐藏关联业务");
		}
	},
	importStoreHouseArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeId, data.storeName,data.address ]);
		this.relation.storeId = data.storeId;
		this.relation.storeName = data.storeName;
	},
	importCustomerArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.customerId, data.customerName ]);
	},
	importTeamsArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.teams ]);
	},
	importEntManagerArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName ]);
	},
	importCustomerLinkerArchives : function(data) {
		this.setMultiFieldValue([ "projectManager" ], [ data.linker ]);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
		//record.set("startDate", this.getFieldValue("startPlanDate"));
	},
	dispatchPractiArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
		//record.set("startDate", this.getFieldValue("startPlanDate"));
	},
	addTheme : function(record) {
		var ids = [];  
		var cbitems = Ext.getCmp("dispatchCheckboxGroup").items;    
		for (var i = 0; i < cbitems.length; i++) {    
		    if (cbitems.itemAt(i).checked) {    
		        ids.push(cbitems.itemAt(i).boxLabel);    
		    }    
		} 
		Ext.getCmp('dispatchTheme').setValue(ids)
	},
	saveFormData : function() {
		if (!this.preSaveValidate(this)) {
			return;
		}
		if(this.dispatchEquipGrid.getStore().data.items.length == 0){
			Ext.MessageBox.alert("提示","发设备信息不能为空");
   		 return ;
		}
		var store= this.contractEquipBriefGrid.getStore();
		var arr = [];
		for(var i=0;i<store.getCount(); i++) {
			var obj ={};
			var data = store.getAt(i).data;
			obj.equipSpecificName=data.equipSpecificName;
			obj.quantity=data.quantity;
			arr.push(obj);
		}
		var equip = this.dispatchEquipGrid.getStore();
		var equipArr = [];
		//	客户反馈不需要此判断
		// for(var j=0;j<equip.getCount();j++){
		// 	var exist = false;
		// 	for(var i=0;i<arr.length; i++) {
		// 		if(arr[i].equipSpecificName==equip.getAt(j).data.equipment.equipSpecificName) {
		// 			arr[i].quantity = arr[i].quantity-1;
		// 			exist = true;
		// 		}
		// 	}
		// 	if(!exist) {
		// 		$toast("所属型号应属于合同明细内");
		// 		return ;
		// 	}
		// }
		for(var i=0;i<arr.length; i++) {
			if(arr[i].quantity<0){
				$toast("发货调度的总数不能超过合同该型号的设备数");
			}
		}
        
		if(this.dispatchEquipGrid.getStore().getCount()>this.relation.equipCount-this.relation.sentEquipQuantity){
			$toast("当前合同的累计调度数量已超过合同签订数，请确认是否签订了补充合同");
		}	
		
		
		this.setFieldValue("dispatchCompons", $gridstore2json(this.dispatchComponGrid));
		var data = this.dispatchComponGrid.getStore().data.items;
        for(var k =0;k<data.length;k++){
        	var iniCounts = data[k].data.iniCounts;
        	var storeCounts = data[k].data.storeCounts;
        	if(iniCounts ==""||iniCounts==null){
        		 Ext.MessageBox.alert("提示","调度数量为空不能保存");
        		 return ;
        	}
        	if(iniCounts > storeCounts){
        		 Ext.MessageBox.alert("提示","调度数量大于库存数量不能保存");
        		 return ;
        	}     
            }
            
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitDispatch.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.dispatchId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadDispatch.do?dispatchId=" + this.dispatchId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if (!this.copyable){
						this.setFormSubModuleGrid(data.dispatchEquipSet, this.dispatchEquipGrid);
						this.setFormSubModuleGrid(data.dispatchComponSet, this.dispatchComponGrid);
					} else {
						this.findFormField("dispatchId").setValue(null);
					} 
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldName = [ "department.depId", "department.depName", "userId", "userName" ];
			var value = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = [ "projectId", "projectSerial", "projectName", "receiveAddress", "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName", "manager","contractId" ];
			var values = [ this.relation.projectId, this.relation.projectSerial, this.relation.projectName, this.relation.address, this.relation.relateId, this.relation.relateSerial, this.relation.relateTheme, this.relation.relateModule, this.relation.relateModuleName, this.relation.manager,this.relation.contractId ];
			this.setMultiFieldValue(fieldNames, values);
			//this.copyMultiFieldValue(fieldNames, this.relation);
			this.setFieldValue("dispatchTheme", this.relation.projectName + "的调度" + new Date().format("Ymd"));
			this.dataT = null;
			this.dataS = null;
			$request({
				url : __ctxPath + "/form/loadDispatchAllocateInit.do?limit=1000",
				async : true,
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					this.dataT = resp.data[0];
					this.dataS = resp.data[1];
				}.createDelegate(this)
		    });
			fieldNames = [ "receiveEntId", "receiveEntName", "entManager" ];
			var contractLease = null;
			if (RelationModule.contractLease.relateModule == this.relation.relateModule) { // 合同
				contractLease = this.relation;
			} else {
				contractLease = this.relation.equipFlow.contractLease;
			}
			if (contractLease != null) {
				values = [ contractLease.paEnt, contractLease.paEntName, contractLease.paEntLinkMan ];
				this.setMultiFieldValue(fieldNames, values);
			}
		}
	}
});