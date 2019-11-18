var LeaseRepairForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.repairId,
		relateModule : RelationModule.leaseRepair.relateModule,
		saveable : this.saveable
	});
	
	this.leaseRepairBeforeGrid = new LeaseRepairBeforeGrid({
		saveable : this.saveable
	});
	
	this.leaseRepairAfterGrid = new LeaseRepairAfterGrid({
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
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					emptyText : "系统自动生成",
					fieldLabel : "维修编号",
					name : "leaseRepair.repairSerial"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "leaseRepair.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "leaseRepair.fillDate",
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
					name : "leaseRepair.repairTheme"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					disabled : !this.saveable,
					width : 150,
					allowBlank : false,
					fieldLabel : "维修日期",
					name : "leaseRepair.repairDate"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "主管部门",
					name : "leaseRepair.depName"
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
					name : "leaseRepair.leaseContract.leaseIdentifier"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "项目名称",
					name : "leaseRepair.leaseContract.project.projectName"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					editable : false,
					fieldLabel : "租借单位",
					name : "leaseRepair.leaseContract.leaseUnit"
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
			items : [this.leaseRepairBeforeGrid, this.leaseRepairAfterGrid]
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
			name : "leaseRepair.remark"
		}, fileAttachContainer]
	}]
		
	LeaseRepairForm.superclass.constructor.call(this, {
		title : "租借维修",
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			object : "leaseRepair",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.repairId,
				relateModule : RelationModule.leaseRepair.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.repairId,
				relateModule : RelationModule.leaseRepair.relateModule
			},
			url : __ctxPath + "/materials/saveLeaseRepair.do",
			items : items,
			fieldMapping : LeaseRepairFieldMapping,
			hiddenField : LeaseRepairHiddenField
		}
	});
}
Ext.extend(LeaseRepairForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("leaseRepairBefores", $gridstore2json(this.leaseRepairBeforeGrid));
		this.setFieldValue("leaseRepairAfters", $gridstore2json(this.leaseRepairAfterGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitLeaseRepair.do", resp.applyforId);
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
				url : __ctxPath + "/materials/loadLeaseRepair.do?repairId=" + this.repairId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.leaseRepairBeforeSet, this.leaseRepairBeforeGrid);
					this.setFormSubModuleGrid(data.leaseRepairAfterSet, this.leaseRepairAfterGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = [ "leaseContract.leaseId", "leaseContract.leaseIdentifier", "leaseContract.leaseUnit",
				"leaseContract.project.projectName", "depId", "depName"];
			var values = [ this.data.leaseId, this.data.leaseIdentifier, this.data.leaseUnit,
				this.data.project.projectName, this.data.depId, this.data.depName ];
			this.setMultiFieldValue(fieldNames, values);
			this.leaseRepairBeforeGrid.addLeaseId(this.data.leaseId);
		}
	}
})