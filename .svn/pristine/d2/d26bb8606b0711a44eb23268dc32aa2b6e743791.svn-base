var TakeStockForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	
	this.baldetailGrid = new BaldetailGrid(null,{
		title : "盘点明细",
		saveable : this.saveable,
		parentForm : this
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.takeStockId,
		relateModule : RelationModule.takeStock.relateModule,
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
				items : [{
					maxLength : 20,
					readOnly : true,
					fieldLabel : "制单人",
					name : "takeStock.userName",
					value:curUserInfo.fullname
				}, {
					hidden : true,
					name : "takeStock.userId",
					value:curUserInfo.userId
				},{
					readOnly : true,
					fieldLabel : "单据编号",
					name : "takeStock.invoicesSerial"
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
					fieldLabel : "盘点日期",
					name : "takeStock.takeStockDate",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
//					single : false,
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "盘点仓库",
					name : "takeStock.storeName",
					relateModule : RelationModule.baseDepotJoinUser.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importBaseDepotArchives.createDelegate(this)
				
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					readOnly : true,
					fieldLabel : "盘点仓库库位",
					name : "takeStock.locationName"
				}]
			}]
		}]
	}];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [this.baldetailGrid]
	}); 
	items.push(this.relateTabPanel);
	items.push({
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
			anchor : "95%",
			maxLength : 256,
			height : 48,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "takeStock.remark"
		},fileAttachContainer ]
	} )

	TakeStockForm.superclass.constructor.call(this, {
		title : "盘点管理明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "takeStock",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.takeStockId,
				relateModule : RelationModule.takeStock.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.takeStockId,
				relateModule : RelationModule.takeStock.relateModule
			},
			url : __ctxPath + "/takestock/saveTakeStock.do",
			items : items,
			fieldMapping : TakeStockFieldMapping,
			hiddenField : TakeStockHiddenField
		}
	});
};
Ext.extend(TakeStockForm, Knight.ux.FormPanelWindow, {
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
	importBaseDepotArchives : function(data) {
		this.setMultiFieldValue(["storeId","storeName" ], [ data.depotId,data.depotName ]);
		this.baldetailGrid.storeId = data.depotId;
		new BaseLocationSelector({
			single : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : data.depotId
			},
			callback : function(d) {
				var data = d[0].data;
				this.setMultiFieldValue(["locationId","locationName" ], [ data.locationId,data.locationName ]);
				this.baldetailGrid.locationId = data.locationId;
			}.createDelegate(this)
		}).show();
	},
	
	saveFormData : function() {
		this.setFieldValue("baldetails",$gridstore2json(this.baldetailGrid))
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.takeStockId) {
				this.submitApplication(__ctxPath + "/takestock/multiSubmitTakeStock.do", resp.takeStockId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.takeStockId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/takestock/loadTakeStock.do?takeStockId=" + this.takeStockId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.baldetailSet,this.baldetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
		}
	}

});