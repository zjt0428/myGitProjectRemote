var AllocationDepotForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var assetsPropertyCombo = $initComboBoxField("资产属性", "allocationDepot.assetsProperty", "assetsProperty", {
		width : 147,
		editable : true,
		readOnly : !this.saveable,
		allowBlank : false,
		defaultValueIndex : 1
	});
	var allocationTypeCombo = $initComboBoxField("调拨类型", "allocationDepot.allocationType", "ALLOCATION_TYPE", {
		width : 147,
		editable : true,
		readOnly : !this.saveable,
		allowBlank : false,
		defaultValueIndex : 1
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.allocationId,
		relateModule : RelationModule.allocationDepot.relateModule,
		saveable : this.saveable
	});
	var localtionData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do",{
		"Q_baseDepot.depotId_L_EQ": this.data2==null?this.inDepotId:this.data2.depotId
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
					fieldLabel : "制单人",
					name : "allocationDepot.userName"
				}, {
					readOnly : true,
					editable : false,
					fieldLabel : "调拨编号",
					emptyText:"系统自动生成",
					name : "allocationDepot.allocationSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 147,
					editable : false,
					readOnly : true,
					fieldLabel : "录入时间",
					name : "allocationDepot.inputDate",
					value : new Date()
				}, {
					maxLength : 64,
					allowBlank : false,
					fieldLabel : "调拨主题",
					name : "allocationDepot.allocationTheme",
				} ]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 147,
					editable : false,
					allowBlank : false,
					fieldLabel : "调拨日期",
					name : "allocationDepot.allocationDate",
					value : new Date()
				}, allocationTypeCombo]
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
//					xtype : "relationCompositeField",
//					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "调出仓库",
					name : "allocationDepot.outDepotName"/*,
					relateModule : RelationModule.baseDepot.relateModule,
					importhandler : this.importOutBaseDepotArchives.createDelegate(this)*/
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 147,
					readOnly : true,
					allowBlank : true,
					single:false,
					fieldLabel : "调出仓库发货人",
					name : "allocationDepot.outDepotConsignor",
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importOutDepotConsignor.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 147,
					allowBlank : true,
					fieldLabel : "运输车辆号",
					name : "allocationDepot.vehicleNum",
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCarArchives.createDelegate(this)
				},assetsPropertyCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
//					xtype : "relationCompositeField",
//					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "调入仓库",
					name : "allocationDepot.inDepotName"/*,
					relateModule : RelationModule.baseDepot.relateModule,
					importhandler : this.importInBaseDepotArchives.createDelegate(this)*/
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 147,
					readOnly : true,
					allowBlank : true,
					single:false,
					fieldLabel : "调入仓库收货人",
					name : "allocationDepot.inDepotConsignee",
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importInDepotConsignee.createDelegate(this)
				}, {
					width : 147,
					fieldLabel : "运输人员",
					name : "allocationDepot.vehiclePerson"
				} ]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "附属单据号",
					name : "allocationDepot.attachSerial"
				}, {
					fieldLabel : "申请人",
					name : "allocationDepot.applicantMan"
				}, {
					fieldLabel : "负责人",
					name : "allocationDepot.chargeMan"
				}, {
					fieldLabel : "联系电话",
					name : "allocationDepot.contactTel"
				}]
			} ]
		} ]
	} ];
	this.initRelationPanel(this.relationt);
	this.allocationDepotDetailGrid = new AllocationDepotDetailGrid(a, {
		outDepotId : this.data1==null?this.outDepotId:this.data2.depotId,
		saveable : this.saveable,
		localtionData : localtionData,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	})
	var resourceItems = [ this.allocationDepotDetailGrid ];
	items.push({
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : resourceItems
	});
	var remarks = {
			xtype : "fieldset",
			anchor : "98%",
			labelWidth : 30,
			items : [ {
				anchor : "85%",
				maxLength : 1000,
				maxLengthText : MoreThanMaxLength,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "allocationDepot.remark"
		}, fileAttachContainer ] 
		};
	items.push(remarks);
	var tbarItems = null;
	AllocationDepotForm.superclass.constructor.call(this, {
		title : "仓库调拨信息明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "allocationDepot",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.allocationId,
				relateModule : RelationModule.allocationDepot.relateModule
			},
			url : __ctxPath + "/materials/saveAllocationDepot.do",
			items : items,
			fieldMapping : AllocationDepotFieldMapping,
			hiddenField : AllocationDepotHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(AllocationDepotForm, Knight.ux.FormPanelWindow, {
	initRelationPanel : function() {
	},
	importInDepotConsignee : function (data) {
		var fieldNames = [ "inDepotConsignee"];
		var s = "";
		var str = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.fullname+",";
			str += '{"userId":"'+data[i].data.userId+'","userName":"'+data[i].data.fullname+'"},'
		}
		str=str.substring(0,str.length-1);
		this.array = "["+str+"]";
		this.setMultiFieldValue(fieldNames, [s]);
	},
	importOutDepotConsignor : function (data) {
		var fieldNames = [ "outDepotConsignor"];
		var s = "";
		var str = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.fullname+",";
			str += '{"userId":"'+data[i].data.userId+'","userName":"'+data[i].data.fullname+'"},'
		}
		str=str.substring(0,str.length-1);
		this.array = "["+str+"]";
		this.setMultiFieldValue(fieldNames, [s]);
	},
//	importOutBaseDepotArchives : function(data, relation) {
//		var fieldNames=[ "outDepotId","outDepotName"];
//		var values=[ data.depotId,data.depotName ];
//		this.setMultiFieldValue(fieldNames, values);
//		this.allocationDepotDetailGrid.outDepotId = data.depotId;
//	},
//	importInBaseDepotArchives : function(data, fields) {
//		var fieldNames=[ "inDepotId","inDepotName"];
//		var values=[ data.depotId,data.depotName ];
//		this.setMultiFieldValue(fieldNames, values);
//	},
	importInBaseDepotArchives : function(data) {
		var fieldNames=[ "inDepotId","inDepotName"];
		var values=[ data.depotId,data.depotName ];
		this.setMultiFieldValue(fieldNames, values);
		this.allocationDepotDetailGrid.inDepotId = data.depotId;
		this.inDepotId = data.depotId;
	},
	importOutBaseDepotArchives : function(data) {
		var fieldNames=[ "outDepotId","outDepotName"];
		var values=[ data.depotId,data.depotName ];
		this.setMultiFieldValue(fieldNames, values);
		this.allocationDepotDetailGrid.outDepotId = data.depotId;
	},
	importCarArchives : function(data) {
		this.setFieldValue("vehicleNum", data.licensePlate);
		this.setFieldValue("vehiclePerson", data.driver);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
		//record.set("startDate", this.getFieldValue("startPlanDate"));
	},
	saveFormData : function() {
		this.setFieldValue("allocationDepotDetails", $gridstore2json(this.allocationDepotDetailGrid));
		var inDepotId = this.getFieldValue("inDepotId");
		var outDepotId = this.getFieldValue("outDepotId");
		if(inDepotId != undefined|| inDepotId != ""){
			if(inDepotId == outDepotId){
				Ext.MessageBox.alert("提示","调入和调出的仓库不能重复");
				return ;
			}
		}
		var data1 = this.allocationDepotDetailGrid.getStore().data.items;
        for(var k =0;k<data1.length;k++){
        	var allocationCounts = Number(data1[k].data.allocationCounts);//调拨数量
        	var quantity = Number(data1[k].data.quantity);//调出仓库库存数量
        	if(allocationCounts ==""||allocationCounts==null){
        		 Ext.MessageBox.alert("提示","调拨数量为空不能保存");
        		 return ;
        	}
        	if(allocationCounts > quantity){
        		 Ext.MessageBox.alert("提示","调拨数量大于仓库库存不能保存");
        		 return ;
        	}
        	if(inDepotId==""||inDepotId==null||outDepotId==inDepotId){
        		 Ext.MessageBox.alert("提示","调入库位不能为空且调入调出的库位不能相同");
        		 return ;
        	}
        	this.setFieldValue("depotInitId",data1[k].data.depotInitId);
        }
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/materials/multiSubmitAllocationDepot.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.allocationId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadAllocationDepot.do?allocationId=" + this.allocationId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
					this.setFieldRawValue("allocationType", data.allocationTypeName);
					this.setFormSubModuleGrid(data.allocationDepotDetailSet, this.allocationDepotDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
			if(this.data1 != null && this.data2 != null){
				var fieldName = ["outDepotId","outDepotName","inDepotId","inDepotName"];
				var values = [this.data1.depotId,this.data1.depotName,this.data2.depotId,this.data2.depotName];
				this.setMultiFieldValue(fieldName, values);
				this.allocationDepotDetailGrid.outDepotId = this.data1.depotId;
				this.allocationDepotDetailGrid.inDepotId = this.data2.depotId;
			}
		}
	}
});