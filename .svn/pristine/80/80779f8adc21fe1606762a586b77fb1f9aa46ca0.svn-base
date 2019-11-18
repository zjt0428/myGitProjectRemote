var LostHandleForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	

	var componSpecificData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "componSpecific"
	});
	var warehouseResultData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "INSPECT_RESULT"
	});
	var warehouseStatusData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "WAREHOUSE_COMPON_STATUS"
	});
	var storeHouseData = $ajaxSyncCall(__ctxPath + "/archive/arraylistStoreHouse.do", {
		Q_delFlag_S_EQ : "1"
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.lostId,
		relateModule : RelationModule.lostHandle.relateModule,
		saveable : this.saveable
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
					name : "lostHandle.userName"
				}, {
					readOnly : true,
					fieldLabel : "单据编号",
					name : "lostHandle.lostSerial"
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
					fieldLabel : "丢损日期",
					name : "lostHandle.lostDate",
					value : new Date()
				}, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "费用合计",
					name : "lostHandle.costTotal",
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "lostHandle.department.depName"
				}]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : false,
					fieldLabel : "附属单据号",
					name : "lostHandle.subsidiarySerial"
				}]
			}  ]
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
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "合同编号",
					name : "lostHandle.contractNo"
				},{
					hidden : true,
					fieldLabel : "合同流水号",
					name : "lostHandle.contractSerial"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "承租单位",
					name : "lostHandle.paEntName"
				}, {
					readOnly : false,
					fieldLabel : "出租单位",
					name : "lostHandle.pbEntName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "textfield",
					anchor : "95%",
					readOnly : true,
					fieldLabel : "项目名称",
					name : "lostHandle.projectName"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目地址",
			name : "lostHandle.projectAddress"
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
				name : "lostHandle.equipSerial",
				relateModule : RelationModule.equipments.relateModule,
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
					name : "lostHandle.equipSpecificName"
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
					name : "lostHandle.equipVender"
				} ]
			} ]
		}]
	},{
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ fileAttachContainer ] 
	} ];
	this.lostDetailGrid = new LostDetailGrid(null, {
		componSpecificData : componSpecificData,
		addForbidden : true,
		delForbidden : false,
		projectId : this.contractLease == null ? this.projectId : this.contractLease.projectId,
		saveable: this.saveable,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	});
	var resourceItems = [ this.lostDetailGrid];
	items.push({
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : resourceItems
	});
	
	LostHandleForm.superclass.constructor.call(this, {
		title : "丢失处理信息明细",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "lostHandle",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.lostId,
				relateModule : RelationModule.lostHandle.relateModule
			},
			url : __ctxPath + "/equip/saveLostHandle.do",
			items : items,
			fieldMapping : LostHandleFieldMapping,
			hiddenField : LostHandleHiddenField
		}
	});
};
Ext.extend(LostHandleForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName, data.mobile ]);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
	},
	saveFormData : function() {
		var rentAmount = this.lostDetailGrid.getTotalSummary();
//		if (rentAmount == 0) {
//			Ext.MessageBox.alert("操作信息", "结算金额为【0】!");
//			return;
//		}
		this.setFieldValue("costTotal", rentAmount);
		this.setFieldValue("lostDetails", $gridstore2json(this.lostDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitLostHandle.do", resp.applyforId, resp.msg);
		}.createDelegate(this));
	},
	loadFormData : function(){
		if (!Ext.isEmpty(this.lostId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadLostHandle.do?lostId=" + this.lostId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					
					var totalCost = 0;
					for(var i = 0;i<data.lostDetailSet.length;i++){
						totalCost  =Number(totalCost) +Number(data.lostDetailSet[i].totals);
					}
					this.setFieldValue("costTotal", totalCost);
					this.setFormSubModuleGrid(data.lostDetailSet, this.lostDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else {
			var contractLease = this.contractLease;
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "contractId","contractNo","paEntName","pbEntName","projectId","projectName","projectAddress","contractSerial" ];
			values = [contractLease.contractId,contractLease.contractNo,contractLease.paEntName,contractLease.pbEntName,contractLease.projectId,contractLease.projectName,contractLease.address,contractLease.contractSerial];
			this.setMultiFieldValue(fieldNames, values);					
		}
	},
	importProjectArchives : function(data) {
		this.setMultiFieldValue(["equipSerial","equipSpecific","equipSpecificName","equipVender"], [ data.equipSerial,data.equipSpecific,data.equipSpecificName, data.equipVender ]);
	}
});