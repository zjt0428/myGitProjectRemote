var LogisticsTransportForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.currentDate = new Date();
	this.length = a.length;
	if(this.length>0){
		this.equipable = true;
		this.recordId=a.data1[0].equipment.recordId;
		this.exwSerial=a.data1[0].equipment.exwSerial;
		this.equipSpecificName=a.data1[0].equipment.equipSpecificName;
		this.equipId=a.data1[0].equipment.equipId;
	};
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.transportId,
		relateModule : RelationModule.logisticsTransport.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "必填信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.24,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "制单人",
					name : "logisticsTransport.originator"
				}, {
					xtype : "datefield",
					width : 120,
					allowBlank : false,
					format : "Y-m-d H:i:s",
					editable : false,
					fieldLabel : "发货时间",
					name : "logisticsTransport.deliveryDate",
					value : this.currentDate
				},  {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					width : 120,
					fieldLabel : "运输车辆",
					name : "logisticsTransport.licensePlate",
					relateModule : RelationModule.car.relateModule,
					fields : [ "licensePlate", "driverPhone","driver" ],
					importhandler : this.importTransportEntArchives.createDelegate(this)
				}, {
					xtype : "hidden",
					fieldLabel : "司机",
					name : "logisticsTransport.driver"
				},{
					xtype : "hidden",
					fieldLabel : "联系电话",
					name : "logisticsTransport.driverPhone"
				},{
					readOnly : true,
					width : 350,
					fieldLabel : "项目名称",
					name : "logisticsTransport.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.24,
				defaultType : "textfield",
				items : [{
					xtype : "datefield",
					id:"dispatchDate",
					width : 120,
					allowBlank : true,
					format : "Y-m-d H:i:s",
					editable : false,
					fieldLabel : "调度时间",
					name : "logisticsTransport.dispatchDate",
					value : this.currentDate
				}, {
					readOnly : true,
					allowBlank : true,
					fieldLabel : "合同编号",
					name : "logisticsTransport.relateSerial"
				},{
					id : "logisticsTransportTheme",
					xtype : "textfield",
					width : 120,
					fieldLabel : "发货主题",
					name : "logisticsTransport.shipmentsTheme"
				},{
					xtype : "textfield",
					width : 120,
					fieldLabel : "原单据编号",
					name : "logisticsTransport.originalSerial"
				}]
			}, {
				layout : "form",
				columnWidth : 0.24,
				defaultType : "textfield",
				items : [{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					width : 120,
					fieldLabel : "发货人",
					name : "logisticsTransport.deliveryMan",
					fields : [ "deliveryMan", "deliveryPhone" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "收货人",
					name : "logisticsTransport.receiveMan",
					fields : [ "receiveMan", "receivePhone" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				},
				{
					xtype : "textfield",
					allowBlank : false,
					width : 120,
					fieldLabel : "项目地址",
					name : "logisticsTransport.address"
				}
				]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.52,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					width : 400,
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "发货仓库",
					fields : [ "deliveryEntId", "deliveryEntName" ],
					name : "logisticsTransport.deliveryEntName",
					relateModule : RelationModule.storeHouse.relateModule,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importStoreHouse.createDelegate(this)
				} ]
			} ]
		} ]
	} ];
	var tbarItems = [];
	var url = __ctxPath + "/dispatch/saveLogisticsTransport.do";
	if (this.signable || (!this.signable && !this.saveable)) {
		items.push({
			xtype : "fieldset",
			title : "到货签收",
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
						id : "signMan",
						maxLength : 20,
						allowBlank : !this.signable,
						fieldLabel : "签收人",
						name : "logisticsTransport.signMan"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "datefield",
						id : "signDate",
						width : 120,
						format : "Y-m-d",
						allowBlank : !this.signable,
						editable : false,
						fieldLabel : "签收时间",
						name : "logisticsTransport.signDate",
						value : this.currentDate
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "datacombo",
						id : "signResult",
						allowBlank : !this.signable,
						fieldLabel : "签收意见",
						name : "logisticsTransport.signResult",
						store : [ "正常", "异常" ]
					} ]
				} ]
			} ]
		});
		
	}

	this.componSpecificCombo = $initComboBoxField("所属型号", "Q_componSpecific_S_EQ", "componSpecific", {
		editable : true,
		allowBlank : true
	});
	this.equipVenderCombo = $initComboBoxField("生产厂家", "Q_equipVender_S_EQ", "equipVender", {
		editable : true,
		allowBlank : true
	});
	this.logisticsTrandetailGrid = new LogisticsTrandetailGrid({
		dispatchId:this.dispatchId,
		store : this.store,
		projectId : this.projectId
	}, {
		signable : this.signable || (!this.signable && !this.saveable),
		saveable : this.saveable
	});
	var tranDisBtnTopbarItems = null;
	if (this.saveable) {
		tranDisBtnTopbarItems = [this.componSpecificCombo,this.equipVenderCombo,{
			iconCls : "btn-search",
			text : "加载配货单",
			handler : this.tranDisBtnSubmit.createDelegate(this)
		}];
	}
	this.tranDistributionbutionGrid = new TranDistributionbutionGrid(null, { 
		saveable : this.saveable,
		tbarItems : tranDisBtnTopbarItems
	});
	if(this.tag==null){
		this.relateTabPanel = new Ext.TabPanel({
			autoHeight : true,
			anchor : "98%",
			activeTab : 0,
			items : [ this.logisticsTrandetailGrid, this.tranDistributionbutionGrid]
		});
	}else{
		this.relateTabPanel = new Ext.TabPanel({
			autoHeight : true,
			anchor : "98%",
			activeTab : 0,
			items : [ this.tranDistributionbutionGrid]
		});
	}
	
	items.push(this.relateTabPanel);
	items.push({
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ 
			{
				anchor : "85%",
				maxLength : 512,
				maxLengthText : MoreThanMaxLength,
				xtype : "textarea",
				readOnly : !this.saveable,
				fieldLabel : "备注",
				name : "logisticsTransport.remark"
			}, fileAttachContainer ] 
	});

	LogisticsTransportForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "物流信息明细",
		maximized : true,
		form_config : {
			labelWidth : 85,
			object : "logisticsTransport",
			saveable : this.saveable,
			tbarItems : tbarItems,
			url : url,
			accept : {
				action : this.acceptable,
				relateId : this.transportId,
				relateModule : RelationModule.logisticsTransport.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.transportId,
				relateModule : RelationModule.logisticsTransport.relateModule
			},
			items : items,
			fieldMapping : LogisticsTransportFieldMapping,
			hiddenField : LogisticsTransportHiddenField
		}
	});
};
Ext.extend(LogisticsTransportForm, Knight.ux.FormPanelWindow, {
	importEquipmentArchives : function(data) {
		this.equipable = false;
		this.setMultiFieldValue([ "equipment.equipId", "equipment.recordId", "equipment.equipSpecificName","equipment.exwSerial" ], [ data.equipId, data.recordId, data.equipSpecificName,data.exwSerial ]);
		//自动加载附件清单
		$request({
			url : __ctxPath + "/archive/loadEquipment.do?",
			waitMsg : "正在载入数据...",
			params : {
				equipId : data.equipId
			},
			success : function(b,c) {
				var data = Ext.util.JSON.decode(b.responseText).data[0];
				for(var i = 0 ;i< data.equipmentAffiliatedSet.length;i++){
                    var record = {};
                    Ext.apply(
                        record,
                        {
                            disAllInitId : i,
                            componGenericName : data.equipmentAffiliatedSet[i].componGenericName,
                            componSpecific:data.equipmentAffiliatedSet[i].componSpecific,
                            dimensions : data.equipmentAffiliatedSet[i].dimensions,
                            calculate : data.equipmentAffiliatedSet[i].unit,
                            quantity : data.equipmentAffiliatedSet[i].quantity}
                    )
					this.tranDistributionbutionGrid.addSubModuleDate(record);
				}
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
		})
	},
	importTransportEntArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.licensePlate, data.driverPhone,data.driver]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName, data.mobile ]);
	},
	importStoreHouse : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeId, data.storeName ]);
	},
	importCustomerArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.customerId, data.customerName ]);
	},
	tranDisBtnSubmit : function() {
		$request({
		url : __ctxPath + "/form/listsDispatchAllocateInit.do?pagesize=1000",
		waitMsg : "正在载入数据...",
		params : {
			"Q_equipSpecific_S_EQ" : this.componSpecificCombo.getValue(),
			"Q_equipVender_S_EQ" : this.equipVenderCombo.getValue()
		}, 
		success : function(b,c) {
			var data = Ext.util.JSON.decode(b.responseText);
			for(var i = 0 ;i< data.result.length;i++){
				this.tranDistributionbutionGrid.addSubModuleDate(data.result[i]);
			}
		}.createDelegate(this),
		failure : function(c, d) {
			Ext.Msg.alert("出错", "载入数据失败!");
		}
		})
	},
	
	saveFormData : function() {
		if(this.equipable){
			this.setMultiFieldValue(["equipment.equipId"],[this.equipId]);	
		}	
		this.getForm().findField("logisticsTransport.logisticsTrandetails").setValue($gridstore2json(this.logisticsTrandetailGrid));
		this.getForm().findField("logisticsTransport.logisticsTranDistributionbutions").setValue($gridstore2json(this.tranDistributionbutionGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitLogisticsTransport.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.transportId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadLogisticsTransport.do?transportId=" + this.transportId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldValue("signMan",data.receiveMan);
					this.setFieldValue("signDate",new Date());
					this.setFieldValue("dispatchDate",new Date(data.dispatchDate));
					this.setFieldValue("signResult","正常");
					this.setFormSubModuleGrid(data.logisticsTrandetailSet, this.logisticsTrandetailGrid);
					this.setFormSubModuleGrid(data.logisticsTranDistributionbutionSet, this.tranDistributionbutionGrid);
					if (this.signable && !this.approveable) {
						for (var i = 0; i < this.logisticsTrandetailGrid.getStore().getCount(); i++) {
							var x = this.logisticsTrandetailGrid.getStore().getAt(i).data.counts;
							var y = this.logisticsTrandetailGrid.getStore().getAt(i).data.signCounts;
							this.logisticsTrandetailGrid.getStore().getAt(i).
							set("signCounts",this.logisticsTrandetailGrid.getStore().getAt(i).data.counts);
						}
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			if(isCorpAppUser()){
				$request({
					url : __ctxPath + "/archive/loadCorpInfo.do? corpId="+curUserInfo.corpInfo.corpId,
					waitMsg : "正在载入数据...",
					success : function(b,c) {
						var data = Ext.util.JSON.decode(b.responseText).data[0];
						/*Ext.getCmp('transportBankDeposit').setValue(data.address); */
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
					})
			};
			if(this.tag!=null){
				var fieldNames = [ "originator", "relateSerial","address","projectName","projectId","projectSerial" ];
				var values = [ curUserInfo.fullname, this.project.contractNo,this.project.address,this.project.projectName,this.project.projectId,this.project.projectSerial ];
				this.setMultiFieldValue(fieldNames, values);

			}else{
				var fieldNames = [ "originator", "deliveryEntId","deliveryEntName", "shipmentsTheme", "receiveEntName","deliveryPhone","relateSerial","dispatchId" ];
				var values = [ curUserInfo.fullname,this.project.deliveryEntId ,this.project.deliveryEntName, this.project.dispatchTheme, this.project.unCustomName, curUserInfo.mobile,this.project.relateSerial,this.dispatchId ];
				this.setMultiFieldValue(fieldNames, values);
				var fieldNames = [ "projectId", "projectSerial", "projectName", "address" ];
				this.project.address = this.project.receiveAddress;
				this.copyMultiFieldValue(fieldNames, this.project);
			}
		}
	}
});