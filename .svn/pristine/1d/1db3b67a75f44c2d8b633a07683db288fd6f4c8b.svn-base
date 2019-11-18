var DepotTransfersForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.depottId,
		relateModule : RelationModule.depotTransfers.relateModule,
		saveable : this.saveable
	});
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=appUser", "调入部门", "depotTransfers.department.depId",false);
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
					name : "depotTransfers.userName"
				}, {
					readOnly : true,
					editable : false,
					fieldLabel : "调拨编号",
					emptyText:"系统自动生成",
					name : "depotTransfers.transfersNum"
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
					name : "depotTransfers.inputDate",
					value : new Date()
				}, {
					maxLength : 64,
					allowBlank : false,
					fieldLabel : "调拨主题",
					name : "depotTransfers.transfersTheme",
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
					name : "depotTransfers.transfersDate",
					value : new Date()
				},]
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
					allowBlank : false,
					fieldLabel : "调出仓库",
					name : "depotTransfers.outDepotName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 147,
					readOnly : true,
					allowBlank : false,
					single:false,
					fieldLabel : "调出仓库发货人",
					name : "depotTransfers.outDepotPerson",
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importOutDepotConsignor.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 147,
					readOnly : true,
					allowBlank : false,
					single:false,
					fieldLabel : "调入仓库收货人",
					name : "depotTransfers.inDepotPerson",
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importInDepotConsignee.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					fieldLabel : "调入仓库",
					name : "depotTransfers.inDepotName",
					relateModule : RelationModule.storeHouse.relateModule,
					importhandler : this.importInBaseDepotArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 147,
					allowBlank : true,
					fieldLabel : "运输车辆号",
					name : "depotTransfers.vehicleNum",
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCarArchives.createDelegate(this)
				}]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					width : 147,
					fieldLabel : "运输人员",
					name : "depotTransfers.vehiclePerson"
				},depSelector,
				{
					xtype : "hidden",
					name : "depotTransfers.department.depId",
					id : "depotTransfers.department.depId"
				}]
			} ]
		} ]
	} ];
	this.initRelationPanel(this.relationt);
	this.transfersEquipDetailGrid = new TransfersEquipDetailGrid(a, {
		outDepotId : this.data1==null?this.outDepotId:this.data2.storeId,
		saveable : this.saveable,
//		localtionData : localtionData,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	})
	this.transfersDetailGrid = new TransfersDetailGrid(a, {
		outDepotId : this.data1==null?this.outDepotId:this.data2.storeId,
		saveable : this.saveable,
//		localtionData : localtionData,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	})
	var resourceItems = [ this.transfersEquipDetailGrid,this.transfersDetailGrid ];
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
	DepotTransfersForm.superclass.constructor.call(this, {
		title : "仓库调拨信息明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "depotTransfers",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.depottId,
				relateModule : RelationModule.depotTransfers.relateModule
			},
			url : __ctxPath + "/materials/saveDepotTransfers.do",
			items : items,
			fieldMapping : DepotTransfersFieldMapping,
			hiddenField : DepotTransfersHiddenField,
			tbarItems : tbarItems
		}
	});
};
Ext.extend(DepotTransfersForm, Knight.ux.FormPanelWindow, {
	initRelationPanel : function() {
	},
	importInDepotConsignee : function (data) {
		var fieldNames = [ "inDepotPerson"];
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
		var fieldNames = [ "outDepotPerson"];
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
	importInBaseDepotArchives : function(data) {
		var fieldNames=[ "inDepotId","inDepotName"];
		var values=[ data.storeId,data.storeName ];
		this.setMultiFieldValue(fieldNames, values);
		this.transfersDetailGrid.inDepotId = data.storeId;
		this.transfersEquipDetailGrid.inDepotId = data.storeId;
		this.inDepotId = data.depotId;
	},
	importOutBaseDepotArchives : function(data) {
		var fieldNames=[ "outDepotId","outDepotName"];
		var values=[ data.storeId,data.storeName ];
		this.setMultiFieldValue(fieldNames, values);
		this.transfersDetailGrid.outDepotId = data.storeId;
		this.transfersEquipDetailGrid.outDepotId = data.storeId;
	},
	importCarArchives : function(data) {
		this.setFieldValue("vehicleNum", data.licensePlate);
		this.setFieldValue("vehiclePerson", data.driver);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
	},
	saveFormData : function() {
		this.setFieldValue("transfersDetails", $gridstore2json(this.transfersDetailGrid));
		this.setFieldValue("transfersEquipDetails", $gridstore2json(this.transfersEquipDetailGrid));
		var inDepotId = this.getFieldValue("inDepotId");
		var outDepotId = this.getFieldValue("outDepotId");
		if(inDepotId != undefined|| inDepotId != ""){
			if(inDepotId == outDepotId){
				Ext.MessageBox.alert("提示","调入和调出的仓库不能重复");
				return ;
			}
		}
		var data1 = this.transfersDetailGrid.getStore().data.items;
        for(var k =0;k<data1.length;k++){
        	var transfersCounts = Number(data1[k].data.transfersCounts);//调拨数量
        	var quantity = Number(data1[k].data.quantity);//调出仓库库存数量
        	if(transfersCounts ==""||transfersCounts==null){
        		 Ext.MessageBox.alert("提示","调拨数量为空不能保存");
        		 return ;
        	}
        	if(transfersCounts > quantity){
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
			this.submitApplication(__ctxPath + "/materials/multiSubmitDepotTransfers.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.depottId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadDepotTransfers.do?depottId=" + this.depottId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.transfersDetailSet, this.transfersDetailGrid);
					this.setFormSubModuleGrid(data.transfersEquipDetailSet, this.transfersEquipDetailGrid);
					if (data.department) {
						this.getForm().findField("depotTransfers.department.depId").setValue(data.department.depId);
						this.getForm().findField("depTreeSelector").setValue(data.department.depName);
					}
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
				var values = [this.data1.storeId,this.data1.storeName,this.data2.storeId,this.data2.storeName];
				this.setMultiFieldValue(fieldName, values);
				this.transfersDetailGrid.outDepotId = this.data1.storeId;
				this.transfersDetailGrid.inDepotId = this.data2.storeId;
				this.transfersEquipDetailGrid.outDepotId = this.data1.storeId;
				this.transfersEquipDetailGrid.inDepotId = this.data2.storeId;
			}
		}
	}
});