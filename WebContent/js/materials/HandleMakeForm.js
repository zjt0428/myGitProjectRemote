var HandleMakeForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var runningStateCombo = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=project", "制作班组", "handleMake.teamId",false);
	var localtionData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do",{
		"Q_baseDepot.depotId_L_EQ": this.data==null?this.applyMake.storeId:this.data.storeId
	});
	this.makeProductGrid = new MakeProductGrid({
		saveable : this.saveable,
		localtionData : localtionData
	});
	this.consumeProductGrid = new ConsumeProductGrid({
		saveable : this.saveable,
		localtionData : localtionData,
		storeId : this.applyMake!=null?this.applyMake.storeId:this.data.storeId
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.handleId,
		relateModule : RelationModule.handleMake.relateModule,
		saveable : this.saveable
	});
	
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [/*{
					disabled : !this.saveable,
					hidden : true,
					allowBlank : false,
					fieldLabel : "申请id",
					name : "handleMake.applyMake.applyMakeId"
				},*/{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "制单人",
					name : "handleMake.userName"
				}/*, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					readOnly : true,
					editable : false,
					single:false,
					width : 172,
					fieldLabel : "制作人员",
					name : "handleMake.producers",
					relateModule : RelationModule.practitioner.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importPractitioner.createDelegate(this)
				}*/, {
					xtype : "hidden",
					name : "handleMake.teamId",
					id : "handleMake.teamId"
				},runningStateCombo, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "仓库名称",
					name : "handleMake.applyMake.storeName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					emptyText:"系统自动生成",
					fieldLabel : "制作单号",
					name : "handleMake.handleSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "制作主题",
					name : "handleMake.handleTheme"
				},{
					xtype : "datefield",
					format : "Y-m-d",
					width : 147,
					allowBlank : true,
					editable : false,
					fieldLabel : "计划完成时间",
					name : "handleMake.planFinishDate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 147,
					disabled : !this.saveable,
					allowBlank : false,
					editable : false,
					readOnly : true,
					value : new Date(),
					fieldLabel : "处理日期",
					name : "handleMake.fillDate"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "资产属性",
					name : "handleMake.applyMake.assetsPropertyName"
				}, {
					readOnly : true,
					fieldLabel : "审批人",
					name : "handleMake.approveMan"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 147,
					readOnly : true,
					editable : false,
					fieldLabel : "审批时间 ",
					name : "handleMake.approveDate"
				}]
			}]
		}]
	}]
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.makeProductGrid,this. consumeProductGrid]
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
					name : "handleMake.remark"
			}, fileAttachContainer ] 
		};
	items.push(this.relateTabPanel);
	items.push(remarks);
	HandleMakeForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		title : "制作处理明细",
		form_config : {
			object : "handleMake",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.handleId,
				relateModule : RelationModule.handleMake.relateModule
			},
			url : __ctxPath + "/materials/saveHandleMake.do",
			items : items,
			fieldMapping : HandleMakeFieldMapping,
			hiddenField : HandleMakeHiddenField
		}
	});
}
Ext.extend(HandleMakeForm, Knight.ux.FormPanelWindow, {
	importPractitioner : function (datas) {
		var producersField = this.findFormField("producers");
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if (Ext.isEmpty(producersField.getValue())) {
				producersField.setValue(data.practiName);
			} else {
				producersField.setValue(producersField.getValue() + "," + data.practiName);
			}
		}
	},
	importStoreHouse : function (data, fields) {
		this.setMultiFieldValue(fields, [data.storeId, data.storeName]);
	},
	saveFormData : function() {
		this.setFieldValue("makeProducts", $gridstore2json(this.makeProductGrid));
		this.setFieldValue("consumeProducts", $gridstore2json(this.consumeProductGrid));
		var team = this.getForm().findField("depTreeSelector").value;
		this.setFieldValue("teamName", team);
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitHandleMake.do", resp.applyforId);
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
				url : __ctxPath + "/materials/loadHandleMake.do?handleId=" + this.handleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.makeProductSet, this.makeProductGrid);
					this.setFormSubModuleGrid(data.consumeProductSet, this.consumeProductGrid);
					this.getForm().findField("depTreeSelector").setValue(data.teamName);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = ["applyMake.applyMakeId","applyMake.storeId","applyMake.storeName","applyMake.assetsProperty","applyMake.assetsPropertyName","planFinishDate"]
			var values = [this.data.applyMakeId,this.data.storeId,this.data.storeName,this.data.assetsProperty,this.data.assetsPropertyName,
			              this.data.completeDate];
			this.setMultiFieldValue(fieldNames, values);
			this.setFormSubModuleGrid(this.data.productMakeSet, this.makeProductGrid);
			this.setMultiFieldValue(this.data.storeId, this.consumeProductGrid.storeId);
		}
	}
})