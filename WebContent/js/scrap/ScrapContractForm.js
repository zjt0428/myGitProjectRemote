var ScrapContractForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.reviewtable = this.reviewtable; // 评审功能按钮

	this.scrapDetailGrid = new ScrapDetailGrid({
		scrapContract : true,
		addForbidden : true,
		title : "周材库存",
		saveable : this.saveable
	});
	var assetAttributess = $initComboBoxField("资产属性", "scrapContract.assetsProperty", "assetsProperty", {
		defaultValueIndex : 1,
		editable : true,
//		valueField : "name",
		readOnly : !this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.repairId,
		relateModule : RelationModule.scrapContract.relateModule,
		saveable : this.saveable
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
					fieldLabel : "制单人",
					name : "scrapContract.userName",
					value:curUserInfo.fullname
				}, {
					hidden:true,
					maxLength : 20,
					name : "scrapContract.userId",
					value:curUserInfo.userId
				}, {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "scrapContract.contractSerial"
				}, {
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
//					readOnly : true,
					fieldLabel : "甲方单位",
					name : "scrapContract.paEntName",
					relateModule : RelationModule.corp.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importBaseDepotArchives2.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					fieldLabel : "制单日期",
					name : "scrapContract.contractDate",
					value : new Date()
				},{
					xtype : "relationCompositeField",
					single : false,
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "仓库名称",
					name : "scrapContract.storeName",
					relateModule : RelationModule.baseDepot.relateModule,
					fields:[ "storeName","storeNameId"],
					importhandler : this.importBaseDepotArchives.createDelegate(this)
				},  {
//					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "乙方单位",
					name : "scrapContract.customerName"
//					relateModule : RelationModule.customer.relateModule,
//					cleanhandler : this.cleanMultiField.createDelegate(this),
//					importhandler : this.importBaseDepotArchives3.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "合同主题",
					name : "scrapContract.contractTheme"
				},{
					readOnly : true,
					fieldLabel : "库位",
					name : "scrapContract.storageLocation",
					value:this.storageLocation
				} ,assetAttributess  ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.scrapDetailGrid]
	}); 
	items.push(this.relateTabPanel);
	var remarks ={
			xtype : "fieldset",
			anchor : "98%",
			lablewidth : 30,
			items : [ {
				anchor : "95%",
				maxLength : 256,
				height : 48,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "scrapContract.remark"
			},fileAttachContainer ]
	};
	items.push(remarks);
	ScrapContractForm.superclass.constructor.call(this, {
		title : "报废合同明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "scrapContract",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.contractId,
				relateModule : RelationModule.scrapContract.relateModule
			},
//			review : {
//				action : this.reviewtable,
//				relateId : this.contractId,
//				relateModule : RelationModule.scrapContract.relateModule
//			},
			approve : {
				action : this.approveable,
				relateId : this.contractId,
				relateModule : RelationModule.scrapContract.relateModule
			},
			url : __ctxPath + "/stock/saveScrapContract.do",
			items : items,
			fieldMapping : ScrapContractFieldMapping,
			hiddenField : ScrapContractHiddenField
		}
	});
};
Ext.extend(ScrapContractForm, Knight.ux.FormPanelWindow, {
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
	importBaseDepotArchives : function(data,fields) {
		var s = "";
		var id = "";
		for(var i=0;i<data.length;i++){
			if(i<data.length-1){
				s+= data[i].data.depotName+",";
			}else{
				s+= data[i].data.depotName;
			}
			id+= data[i].data.depotId;
		}
		this.setMultiFieldValue(fields, [s,id]);
	},
	importBaseDepotArchives2 : function(data) {
		this.setMultiFieldValue(["paEntName" ], [ data.corpName ]);
	},
	importBaseDepotArchives3 : function(data) {
		this.setMultiFieldValue(["customerName" ], [ data.customerName ]);
	},	
	saveFormData : function() {
		this.setFieldValue("scrapDetails", $gridstore2json(this.scrapDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/stock/multiSubmitScrapContract.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.contractId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/stock/loadScrapContract.do?contractId=" + this.contractId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
					this.setFormSubModuleGrid(data.scrapDetailSet, this.scrapDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [  "storeName", "storageLocation", "status","storeId","locationId"];
			var values = [ this.storeName,this.storageLocation,this.status,this.storeId,this.locationId ];
			this.setMultiFieldValue(fieldNames, values);
			for(var i=0;i<this.scrapDetailSet.length;i++) {
				this.scrapDetailSet[i].detailId = null;
			}
			this.setFormSubModuleGrid(this.scrapDetailSet, this.scrapDetailGrid);
		}
	}

});