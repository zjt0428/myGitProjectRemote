var ScrapApplyForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮


	var locationData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do", {
		'Q_baseDepot.depotId_L_EQ' : this.storeId
	});
	var faultLocationData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultLocation"
	});
	var diagnosisData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "faultDiagnosis"
	});
	
	this.scrapDetailGrid = new ScrapDetailGrid({
		title : "周材库存",
		depotId : this.storeId,
		addForbidden : false,
		saveable : this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.scrapId,
		relateModule : RelationModule.scrapApply.relateModule,
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
					fieldLabel : "申请人",
					name : "scrapApply.userName",
					value:curUserInfo.fullname
				}, {
					hidden:true,
					maxLength : 20,
					name : "scrapApply.userId",
					value:curUserInfo.userId
				}, {
					readOnly : true,
					fieldLabel : "申请单号",
					name : "scrapApply.scrapSerial"
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
					fieldLabel : "申请日期",
					name : "scrapApply.applyDate",
					value : new Date()
				},{
					fieldLabel : "报废主题",
					name : "scrapApply.scrapTheme"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "仓库名称",
					name : "scrapApply.storeName"
				}, {
					xtype : "simplecombo",
					width : 130,
					allowBlank : true,
					codeData : locationData,
					fieldLabel : "库位",
//					hiddenName : "scrapApply.storageLocation",
					name : "scrapApply.storageLocation",
					listeners : {
						'select' : this.locationSelect.createDelegate(this)
					}
				}]
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
				name : "scrapApply.remark"
			},fileAttachContainer ]
	};
	items.push(remarks);
	ScrapApplyForm.superclass.constructor.call(this, {
		title : "报废申请明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "scrapApply",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.scrapId,
				relateModule : RelationModule.scrapApply.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.scrapId,
				relateModule : RelationModule.scrapApply.relateModule
			},
			url : __ctxPath + "/stock/saveScrapApply.do",
			items : items,
			fieldMapping : ScrapApplyFieldMapping,
			hiddenField : ScrapApplyHiddenField
		}
	});
};
Ext.extend(ScrapApplyForm, Knight.ux.FormPanelWindow, {
	locationSelect : function(data) {
		this.scrapDetailGrid.locationId = data.value;
		this.setFieldValue("storeId",this.storeId);
		this.setFieldValue("locationId",data.value);
	},
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
	importBaseLocationArchives : function(data) {
		this.setMultiFieldValue(["storageLocation" ], [ data.locationName ]);
	},
	
	saveFormData : function() {
		this.setFieldValue("scrapDetails", $gridstore2json(this.scrapDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/stock/multiSubmitScrapApply.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.scrapId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/stock/loadScrapApply.do?scrapId=" + this.scrapId,
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
			var fieldNames = [ "storeId","storeName"];
			var values = [this.storeId, this.storeName ];
			this.setMultiFieldValue(fieldNames, values);

		}
	}

});