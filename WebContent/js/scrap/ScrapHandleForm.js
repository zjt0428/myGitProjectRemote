var ScrapHandleForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var faultLocationData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultLocation"
	});
	var diagnosisData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultDiagnosis"
	});

	this.scrapDetailGrid = new ScrapDetailGrid({
		title : "周材库存",
		saveable : this.saveable,
		depotId : this.storeId,
		locationId : this.locationId
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.handleId,
		relateModule : RelationModule.equipRepair.relateModule,
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
					name : "scrapHandle.userName",
					value:curUserInfo.fullname
				}, {
					hidden:true,
					maxLength : 20,
					name : "scrapHandle.userId",
					value:curUserInfo.userId
				}, {
					readOnly : true,
					fieldLabel : "报废单号",
					name : "scrapHandle.scrapSerial"
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
					fieldLabel : "制单日期",
					name : "scrapHandle.applyDate",
					value : new Date()
				},{
					readOnly : true,
					fieldLabel : "仓库名称",
					name : "scrapHandle.storeName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "库位",
					name : "scrapHandle.storageLocation"
				} ]
			} ]
		} ]
	}];
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
	ScrapHandleForm.superclass.constructor.call(this, {
		title : "报废处理明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "scrapHandle",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.handleId,
				relateModule : RelationModule.scrapHandle.relateModule
			},
			url : __ctxPath + "/stock/saveScrapHandle.do",
			items : items,
			fieldMapping : ScrapHandleFieldMapping,
			hiddenField : ScrapHandleHiddenField
		}
	});
};
Ext.extend(ScrapHandleForm, Knight.ux.FormPanelWindow, {
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
	
	saveFormData : function() {
		this.setFieldValue("scrapDetails", $gridstore2json(this.scrapDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/stock/multiSubmitScrapHandle.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.handleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/stock/loadScrapHandle.do?handleId=" + this.handleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.scrapDetailSet, this.scrapDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "contractSerial", "storeName", "storageLocation", "status","storeId","locationId"];
			var values = [ this.scrapSerial,this.storeName,this.storageLocation,this.status,this.storeId,this.locationId ];
			this.setMultiFieldValue(fieldNames, values);
			for(var i=0;i<this.scrapDetailSet.length;i++) {
				this.scrapDetailSet[i].detailId = null;
			}
			this.setFormSubModuleGrid(this.scrapDetailSet, this.scrapDetailGrid);
		}
	}

});