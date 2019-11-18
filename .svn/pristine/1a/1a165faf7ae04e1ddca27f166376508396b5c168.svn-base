var ProjectRepairForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	Ext.apply(this, {
		departmentId : Ext.id()
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.repairId,
		relateModule : RelationModule.projectRepair.relateModule,
		saveable : this.saveable
	});
	
	this.projectRepairBeforeGrid = new ProjectRepairBeforeGrid({
		saveable : this.saveable
	})
	
	this.projectRepairAfterGrid = new ProjectRepairAfterGrid({
		saveable : this.saveable,
		contractId : this.data==null ? null : this.data.contractmaId
	})
	
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
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					emptyText : "系统自动生成",
					fieldLabel : "维修编号",
					name : "repairSerial.paymentSerial"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "projectRepair.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "projectRepair.fillDate",
					value : new Date()
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "维修主题",
					name : "projectRepair.repairTheme"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					disabled : !this.saveable,
					width : 150,
					allowBlank : false,
					fieldLabel : "维修日期",
					name : "projectRepair.repairDate"
				}, {
					xtype : "hidden",
					id : this.departmentId,
					name : "projectRepair.depId",
				}, {
					xtype : "treecombo",
					maxLength : 32,
					disabled : !this.saveable,
					allowBlank : false,
					width : 150,
					valId : this.departmentId,
					fieldLabel : "主管部门",
					name : "projectRepair.depName",
					url : __ctxPath + "/system/listDepartment.do"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "合同编号",
					name : "projectRepair.contractMaterials.contractSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "项目名称",
					name : "projectRepair.contractMaterials.projectName"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "项目地址",
					name : "projectRepair.contractMaterials.address",
				}]
			}]
		}]
	}, {
		xtype : "fieldset",
		items : [{
			xtype : "tabpanel",
			autoHeight : true,
			anchor : "98%",
			activeTab : 0,
			items : [this.projectRepairBeforeGrid, this.projectRepairAfterGrid]
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [{
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			disabled : !this.saveable,
			fieldLabel : "备注",
			name : "projectRepair.remark"
		}, fileAttachContainer]
	}]
	
	ProjectRepairForm.superclass.constructor.call(this, {
		title : "项目维修",
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			object : "projectRepair",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.repairId,
				relateModule : RelationModule.projectRepair.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.repairId,
				relateModule : RelationModule.projectRepair.relateModule
			},
			url : __ctxPath + "/archive/saveProjectRepair.do",
			items : items,
			fieldMapping : ProjectRepairFieldMapping,
			hiddenField : ProjectRepairHiddenField
		}
	});
}
Ext.extend(ProjectRepairForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("projectRepairBefores", $gridstore2json(this.projectRepairBeforeGrid));
		this.setFieldValue("projectRepairAfters", $gridstore2json(this.projectRepairAfterGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/archive/multiSubmitProjectRepair.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
			}
			this.close();
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.repairId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadProjectRepair.do?repairId=" + this.repairId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.projectRepairBeforeSet, this.projectRepairBeforeGrid);
					this.setFormSubModuleGrid(data.projectRepairAfterSet, this.projectRepairAfterGrid);
					this.projectRepairAfterGrid.contractId = data.contractMaterials.contractmaId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = [ "contractMaterials.contractmaId", "contractMaterials.contractSerial", "contractMaterials.projectName",
				"contractMaterials.address" ];
			var values = [ this.data.contractmaId, this.data.contractSerial, this.data.projectName, this.data.address ];
			this.setMultiFieldValue(fieldNames, values);
			this.projectRepairBeforeGrid.addProjectId(this.data.projectId);
		}
	}
})