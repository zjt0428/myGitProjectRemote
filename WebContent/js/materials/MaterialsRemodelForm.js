var MaterialsRemodelForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var assetsPropertyCombo = $initComboBoxField("资产属性", "materialsRemodel.assetsProperty", "assetsProperty", {
		defaultValueIndex : 1,
		editable : true
	});
	var remodelTypeCombo = $initComboBoxField("改型类别", "materialsRemodel.remodelType", "remodelType", {
		defaultValueIndex : 0,
		editable : true
	});
	var baseDepotData = $ajaxSyncCall(__ctxPath + "/materials/listBaseDepotPermission.do", {
		userId : curUserInfo.userId
	});
	var materialsCommodityData = $ajaxSyncCall( __ctxPath + "/materials/arrayListMaterialsCommodity.do",{
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.remodelId,
		relateModule : RelationModule.materialsRemodel.relateModule,
		saveable : this.saveable
	});
	this.beforeRemodelGrid = new BeforeRemodelGrid({
		relateId : this.remodelId
	}, {
		saveable : this.saveable
	});
	this.afterRemodelGrid = new AfterRemodelGrid({
		relateId : this.remodelId
	}, {
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
					fieldLabel : "改型单号",
					name : "materialsRemodel.remodelSerial"
				}, {
					fieldLabel : "制作主题",
					name : "materialsRemodel.producationTheme"
				},  {
					readOnly : true,
					fieldLabel : "制单人",
					name : "materialsRemodel.userName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "simplecombo",
					width : 130,
					readOnly : false,
					allowBlank : true,
					codeData : baseDepotData,
					fieldLabel : "入库仓库",
					hiddenName : "materialsRemodel.baseDepot.depotId",
					name : "materialsRemodel.baseDepot.depotName",
					listeners : {
						"select" : this.depotSelect.createDelegate(this)
					}
				},{
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "计划完成时间",
					name : "materialsRemodel.planFinishDate"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					width : 120,
					fieldLabel : "制作人员",
					name : "materialsRemodel.producer",
					fields : [ "producerId","producer"],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [assetsPropertyCombo, remodelTypeCombo, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 130,
					editable : false,
					fieldLabel : "制单日期",
					name : "materialsRemodel.applyDate",
					value : new Date()
				} ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.beforeRemodelGrid,this.afterRemodelGrid ]
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
				name : "materialsRemodel.remark"
			},fileAttachContainer ]
	};
	items.push(remarks);
	
	MaterialsRemodelForm.superclass.constructor.call(this, {
		title : "周材改型明细",
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "materialsRemodel",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.remodelId,
				relateModule : RelationModule.materialsRemodel.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.remodelId,
				relateModule : RelationModule.materialsRemodel.relateModule
			},
			url : __ctxPath + "/materials/saveMaterialsRemodel.do",
			items : items,
			fieldMapping : MaterialsRemodelFieldMapping,
			hiddenField : MaterialsRemodelHiddenField
		}
	});
};
Ext.extend(MaterialsRemodelForm, Knight.ux.FormPanelWindow, {
	depotSelect : function(data) {
//		var locationData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do", {
//			'Q_baseDepot.depotId_L_EQ' : data.value
//		});
//		this.beforeRemodelGrid.locationData = locationData;
		this.beforeRemodelGrid.depotId = data.value;
		this.afterRemodelGrid.depotId = data.value;
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiId,data.practiName]);
	},
	getDepotId : function(){
		return this.getFieldValue("baseDepot.depotId");
	},
	saveFormData : function() {
		this.setFieldValue("beforeRemodels", $gridstore2json(this.beforeRemodelGrid));
		this.setFieldValue("afterRemodels", $gridstore2json(this.afterRemodelGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitMaterialsRemodel.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.remodelId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadMaterialsRemodel.do?remodelId=" + this.remodelId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("remodelType", data.remodelTypeName);
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
 					this.setFormSubModuleGrid(data.beforeRemodelSet, this.beforeRemodelGrid);
					this.setFormSubModuleGrid(data.afterRemodelSet, this.afterRemodelGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});