var LogisticsBacksportForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.isCompon = this.isCompon? true :false;
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.currentDate = new Date();

	this.logisticsBackdetailGrid = null;
	if(this.isCompon==true){
		this.logisticsBackdetailGrid = new LogisticsBackdetailGrid2({
			rowId : this.rowId
		}, {
			saveable : this.saveable
		});
	}else{
		this.logisticsBackdetailGrid = new LogisticsBackdetailGrid({
			flowId : this.flowId,
		}, {
			saveable : this.saveable
		});		
	}
	
	var carfeeTopbarItems = null;
	if (this.saveable) {
		carfeeTopbarItems = [ {
			iconCls : "btn-share",
			text : "导入",
			handler : this.importBackcarfeeCarInfo.createDelegate(this)
		} ];
	}
	this.logisticsBackcarfeeGrid = new LogisticsBackcarfeeGrid(null, {
		saveable : this.saveable,
		tbarItems : carfeeTopbarItems
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.backsportId,
		relateModule : RelationModule.logisticsBacksport.relateModule,
		saveable : this.saveable
	});
	var autocraneDependCombo = $initComboBoxField("车辆出租单位", "logisticsBacksport.autocraneDepend", "autocraneDepend", {
		defaultValueIndex : 0,
		allowBlank : true,
		editable : true
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
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					width : 120,
					fieldLabel : "物流状态",
					name : "logisticsBacksport.statusName"
				}, {
					xtype : "datefield",
					width : 120,
					allowBlank : false,
					format : "Y-m-d",
					editable : false,
					fieldLabel : "发货时间",
					name : "logisticsBacksport.deliveryDate",
					value : this.currentDate
				}, {
					xtype : "numberfield",
					width : 120,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "运输费(元)",
					name : "logisticsBacksport.backsportAmount"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "备案编号",
					name : "logisticsTransport.equipment.recordId",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					width : 120,
					fieldLabel : "附墙数",
					name : "logisticsTransport.wallAttacheQty"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					width : 120,
					fieldLabel : "款项状态",
					name : "logisticsBacksport.fundStatusName"
				}, {
					xtype : "datefield",
					width : 120,
					allowBlank : false,
					format : "Y-m-d",
					editable : false,
					fieldLabel : "预计到达时间",
					name : "logisticsBacksport.expectedArriveDate",
					value : this.currentDate
				}, {
					fieldLabel : "车辆停放地",
					width : 120,
					name : "logisticsBacksport.materialPark"
				}, {
					readOnly : true,
					width : 120,
					fieldLabel : "设备型号",
					name : "logisticsTransport.equipment.equipSpecificName"
				}, {
					xtype : "numberfield",
					width : 120,
					fieldLabel : "标准节螺栓数",
					name : "logisticsTransport.knotBoltCounts"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					width : 120,
					readOnly: true,
					fieldLabel : "物流单号",
					name : "logisticsBacksport.backsportSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					width : 120,
					fieldLabel : "发货人",
					name : "logisticsBacksport.deliveryMan",
					fields : [ "deliveryMan", "deliveryPhone" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "接货人",
					name : "logisticsBacksport.receiveMan",
					fields : [ "receiveMan", "receivePhone" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					width : 120,
					fieldLabel : "标准节数",
					name : "logisticsTransport.knotCounts"
				}, {
					width : 120,
					fieldLabel : "项目负责人",
					name : "logisticsTransport.projectPrincipal"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					width : 120,
					fieldLabel : "批次号",
					name : "logisticsBacksport.batchNumber"
				}, {
					width : 120,
					fieldLabel : "发货联系电话",
					name : "logisticsBacksport.deliveryPhone"
				}, {
					width : 120,
					fieldLabel : "接货联系电话",
					name : "logisticsBacksport.receivePhone"
				}, {
					xtype : "numberfield",
					width : 120,
					fieldLabel : "加强节数",
					name : "logisticsTransport.strengthenCounts"
				}, {
					xtype : "numberfield",
					width : 120,
					readOnly : true,
					fieldLabel : "已付金额",
					name : "logisticsTransport.finishedAmount"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					width : 120,
					fieldLabel : "项目名称",
					name : "logisticsBacksport.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.75,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					anchor : "95%",
					fieldLabel : "地址",
					name : "logisticsBacksport.address"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ autocraneDependCombo, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "运输单位",
					name : "logisticsBacksport.backsportEntName",
					relateModule : RelationModule.supplier.relateModule,
					fields : [ "backsportEntName", "backsportContactTel", "backsportBankDeposit", "backsportBankAccount" ],
					importhandler : this.importBacksportEntArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "公里数",
					name : "logisticsBacksport.kilometers"
				}, {
					width : 120,
					fieldLabel : "运输单位联系电话",
					name : "logisticsBacksport.backsportContactTel"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					width : 120,
					fieldLabel : "开户行",
					name : "logisticsBacksport.backsportBankDeposit"
				}, {
					width : 120,
					fieldLabel : "出厂编号",
					name : "logisticsTransport.equipment.exwSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					width : 120,
					fieldLabel : "银行账号",
					name : "logisticsBacksport.backsportBankAccount"
				}, {
					xtype : "numberfield",
					width : 120,
					readOnly : true,
					fieldLabel : "余额",
					name : "logisticsTransport.remainderAmount"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 512,
			xtype : "textarea",
			readOnly : !this.saveable,
			height : 45,
			fieldLabel : "备注",
			name : "logisticsBacksport.remark"
		}, fileAttachContainer ]
	} ];
	var tbarItems = [];
	var url = __ctxPath + "/dispatch/saveLogisticsBacksport.do";
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
						maxLength : 20,
						allowBlank : !this.signable,
						fieldLabel : "签收人",
						name : "logisticsBacksport.signMan"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "datefield",
						width : 120,
						format : "Y-m-d",
						allowBlank : !this.signable,
						editable : false,
						fieldLabel : "签收时间",
						name : "logisticsBacksport.signDate",
						value : this.currentDate
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "datacombo",
						allowBlank : !this.signable,
						fieldLabel : "签收意见",
						name : "logisticsBacksport.signResult",
						store : [ "正常", "异常" ]
					} ]
				} ]
			} ]
		});
		if (this.signable) {
			url = __ctxPath + "/dispatch/receivedLogisticsBacksport.do";
			tbarItems.push({
				iconCls : "btn-submit",
				text : "签收",
				handler : this.saveFormData.createDelegate(this)
			});
		}
	}
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.logisticsBackdetailGrid, this.logisticsBackcarfeeGrid ]
	});
	items.push(this.relateTabPanel);

	LogisticsBacksportForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "物流信息明细",
		width : 1080,
		form_config : {
			labelWidth : 90,
			object : "logisticsBacksport",
			saveable : this.saveable,
			tbarItems : tbarItems,
			url : url,
			items : items,
			fieldMapping : LogisticsBacksportFieldMapping,
			hiddenField : LogisticsBacksportHiddenField
		}
	});
};
Ext.extend(LogisticsBacksportForm, Knight.ux.FormPanelWindow, {
	importEquipmentArchives : function(data) {
		this.setMultiFieldValue([ "equipment.equipId", "equipment.recordId", "equipment.equipSpecificName", "equipment.exwSerial" ], [ data.equipId, data.recordId, data.equipSpecificName, data.exwSerial ]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName, data.mobile ]);
	},
	importBacksportEntArchives : function(data, fields) {
		var bankDeposit = null;
		var account = null;
		if (data.supplierAccount) {
			bankDeposit = data.supplierAccount.bankDeposit;
			account = data.supplierAccount.account;

		}
		this.setMultiFieldValue(fields, [ data.supplierName, data.tel, bankDeposit, account ]);
	},
	importBackcarfeeCarInfo : function() {
		var detailStore = this.logisticsBackdetailGrid.getStore();
		for (var i = 0; i < detailStore.getCount(); i++) {
			if (!Ext.isEmpty(detailStore.getAt(i).data.carId)) {
				$request({
					url : __ctxPath + "/archive/loadCar.do",
					params : {
						carId : detailStore.getAt(i).data.carId
					},
					success : function(g, h) {
						var data = Ext.util.JSON.decode(g.responseText).data[0];
						this.logisticsBackcarfeeGrid.addSubModuleDate(data);
					}.createDelegate(this)
				});
			}
		}
	},
	saveFormData : function() {
		this.setFieldValue("backsportAmount", this.logisticsBackcarfeeGrid.getTotalSummary());
		if(this.isCompon==true){
			this.getForm().findField("logisticsBacksport.logisticsBackdetail2s").setValue($gridstore2json(this.logisticsBackdetailGrid));
		}else{
			this.getForm().findField("logisticsBacksport.logisticsBackdetails").setValue($gridstore2json(this.logisticsBackdetailGrid));
		}
		this.getForm().findField("logisticsBacksport.logisticsBackcarfees").setValue($gridstore2json(this.logisticsBackcarfeeGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.backsportId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadLogisticsBacksport.do?backsportId=" + this.backsportId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if(this.isCompon==true){
						this.setFormSubModuleGrid(data.logisticsBackdetail2Set, this.logisticsBackdetailGrid);
					}else{
						this.setFormSubModuleGrid(data.logisticsBackdetailSet, this.logisticsBackdetailGrid);
					}
					this.setFormSubModuleGrid(data.logisticsBackcarfeeSet, this.logisticsBackcarfeeGrid);
					if (this.signable) {
						for (var i = 0; i < this.logisticsBackdetailGrid.getStore().getCount(); i++) {
							var x = this.logisticsBackdetailGrid.getStore().getAt(i).data.counts;
							var y = this.logisticsBackdetailGrid.getStore().getAt(i).data.signCounts;
							this.logisticsBackdetailGrid.getStore().getAt(i).
							set("signCounts",this.logisticsBackdetailGrid.getStore().getAt(i).data.counts);
						}
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var isCompon = this.isCompon;
			if(this.isCompon==true){
				var fieldNames = [ "projectId", "projectSerial", "projectName", "address","isCompon","rowId"];
				var values = [this.projectId,this.projectSerial,this.projectName,this.address,"1",this.rowId];
				this.setMultiFieldValue(fieldNames,values);
			}else{
				var fieldNames = [ "projectId", "projectSerial", "projectName", "address" ];
				this.copyMultiFieldValue(fieldNames, this.equipDiary);
				fieldNames = [ "equipId", "recordId", "equipSpecificName", "exwSerial" ];
				this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipDiary, fieldNames));
		}
		}
	}
});