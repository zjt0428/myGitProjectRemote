var EquipBlockupBatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var blockupTypeCombo = $initComboBoxField("停用类别","equipBlockup.blockupType",  "BLOCKUP_TYPE", {
		editable : this.saveable,
		defaultValueIndex : 1
	});
	var  items = [{
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
					width : 130,
					readOnly : true,
					fieldLabel : "填报人",
					name : "equipBlockup.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "停用日期",
					name : "equipBlockup.blockupDate",
//					value : new Date()
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "equipBlockup.providedDate",
					value : new Date()
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "恢复日期",
					name : "equipBlockup.reactivateDate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					hidden : true,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipBlockup.department.depName"
				} ,blockupTypeCombo, {
					fieldLabel : "备注",
					allowBlank : true,
					name : "equipBlockup.remark"
				} ]
			} ]
		} ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.relateEquipFlowGrid ]
	}];
	EquipBlockupBatchForm.superclass.constructor.call(this, {
		title : "停用管理批量制定",
		width : 800,
		height : 450,
		form_config : {
			labelWidth : 90,
			object : "equipBlockup",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveBatchEquipBlockup.do",
			items : items,	
			fieldMapping :EquipBlockupFieldMapping,
			hiddenField : EquipBlockupHiddenField
			}
	});
};
Ext.extend(EquipBlockupBatchForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		var relateIds = [];
		for (var i = 0; i < this.relateEquipFlowGrid.getStore().getCount(); i++) {
			var r = this.relateEquipFlowGrid.getStore().getAt(i).data;
			relateIds.push(r.relateId);
		}
		this.setFieldValue("relateIds", relateIds.join(","));
//		this.setFieldValue("equipFlowEmploySerials", $gridstore2json(this.relateEquipFlowGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.blockupId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipBlockup.do?blockupId=" + this.blockupId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.findFormField("blockupSerial").setReadOnly(true);
//					this.setFormSubModuleGrid(data.blockupStandardSet, this.EquipFlowEmployGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "equipFlow.flowId", "equipFlow.equipId"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.flowId, this.equipId];
			this.setMultiFieldValue(fieldNames, values);
	
		}
	}

});