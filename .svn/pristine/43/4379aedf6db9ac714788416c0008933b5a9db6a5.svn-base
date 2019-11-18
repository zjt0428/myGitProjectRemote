var OtherMaterialStockForm = function(a, b){
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	this.applicationDetailGrid = new ApplicationDetailGrid(null,{
		title : "申请明细",
		saveable : this.saveable,
		depotId : this.storeId==null?null:this.storeId,
		locationIds : this.locationId==null?null:this.locationId
	});
	
	var handleTypeCombo = $initComboBoxField("处理类型", "otherMaterialStock.handleType", "HANDLE_TYPE", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.otherMaterialStockId,
		relateModule : RelationModule.otherMaterialStock.relateModule,
		saveable : this.saveable
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					readOnly : true,
					fieldLabel : "单据编号",
					name : "otherMaterialStock.omsSerial"
				}, {
					readOnly : true,
					fieldLabel : "制单人",
					name : "otherMaterialStock.userName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					xtype : "relationCompositeField",
					allowBlank : false,
					disabled : !this.saveable,
					fieldLabel : "仓库名称",
					name : "otherMaterialStock.storeName",
					relateModule : RelationModule.baseDepotJoinUser.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importBaseDepotArchives.createDelegate(this)
				
				}, {
					allowBlank : false,
					readOnly : true,
					fieldLabel : "库位",
					name : "otherMaterialStock.storageLocation"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "处理日期",
					name : "otherMaterialStock.handleDate",
					value : new Date()
				}, handleTypeCombo]
			} ]
		},{
			anchor : "95%",
			maxLength : 128,
			height : 48,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "otherMaterialStock.remark"
		} ]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ fileAttachContainer ]
	}];
	
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [this.applicationDetailGrid]
	}); 
	items.push(this.relateTabPanel);
	
	OtherMaterialStockForm.superclass.constructor.call(this, {
		title : "其他出入库处理明细",
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "otherMaterialStock",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.otherMaterialStockId,
				relateModule : RelationModule.otherMaterialStock.relateModule
			},
			url : __ctxPath + "/materials/saveOtherMaterialStock.do",
			items : items,
			fieldMapping : OtherMaterialStockFieldMapping,
			hiddenField : OtherMaterialStockHiddenField
		}
	});
};

Ext.extend(OtherMaterialStockForm, Knight.ux.FormPanelWindow, {
	importBaseDepotArchives : function(data) {
		this.setMultiFieldValue(["storeId","storeName" ], [ data.depotId,data.depotName ]);
		this.applicationDetailGrid.storeId = data.depotId;
		new BaseLocationSelector({
			single : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : data.depotId
			},
			callback : function(d) {
				var data = d[0].data;
				this.setMultiFieldValue(["locationId","storageLocation" ], [ data.locationId,data.locationName ]);
				this.applicationDetailGrid.locationId = data.locationId;
			}.createDelegate(this)
		}).show();
	},
	saveFormData : function() {
		this.setFieldValue("applicationDetails", $gridstore2json(this.applicationDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.otherMaterialStockId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitOtherMaterialStock.do", resp.otherMaterialStockId);
			}else{
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
			
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.otherMaterialStockId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadOtherMaterialStock.do?otherMaterialStockId=" + this.otherMaterialStockId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.applicationDetailSet, this.applicationDetailGrid);
					this.setFieldRawValue("handleType", data.handleTypeName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.setMultiFieldValue([ "userId", "userName" ], [curUserInfo.userId, curUserInfo.fullname ]);
		}
	}
});