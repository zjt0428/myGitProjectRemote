var MemoForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	this.memoDetailGrid = new MemoDetailGrid(null, {
		saveable : this.saveable
	});
	this.memoDeputyGrid = new MemoDeputyGrid(null, {
		saveable : this.saveable,
		grid_config : {
			grid_view : {
				layout : "fit",
				autoHeight : false,
				height : 215
			}
		}
	});
	this.memoDeputyGridPanel = new Ext.Panel({
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		height : 215,
		items : [ this.memoDeputyGrid ]
	});
	var incidentTypeCombo = $initComboBoxField("事件类型", "memo.incidentType", "incidentType", {
		editable : true
	});
	var items = [ {
		xtype : "panel",
		layout : "column",
		items : [ {
			layout : "form",
			columnWidth : 0.66,
			items : [ {
				xtype : "fieldset",
				title : "事件信息",
				anchor : "98%",
				collapsible : true,
				items : [ {
					xtype : "panel",
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 0.5,
						defaultType : "textfield",
						items : [ {
							readOnly : true,
							fieldLabel : "事件编号",
							name : "memo.memoSerial"
						}, {
							xtype : "relationCompositeField",
							disabled : !this.saveable,
							readOnly : true,
							fieldLabel : "经办人",
							name : "memo.practiName",
							relateModule : RelationModule.practitioner.relateModule,
							importhandler : this.importPractiArchives.createDelegate(this)
						}, {
							xtype : "relationCompositeField",
							disabled : !this.saveable,
							readOnly : true,
							fieldLabel : "设备名称",
							name : "memo.equipGenericName",
							relateModule : RelationModule.equipment.relateModule,
							importhandler : this.importEquipmentArchives.createDelegate(this)
						}, {
							xtype : "relationCompositeField",
							disabled : !this.saveable,
							readOnly : true,
							fieldLabel : "项目名称",
							name : "memo.projectName",
							relateModule : RelationModule.project.relateModule,
							importhandler : this.importProjectArchives.createDelegate(this)
						}, incidentTypeCombo ]
					}, {
						layout : "form",
						columnWidth : 0.5,
						defaultType : "textfield",
						items : [ {
							allowBlank : false,
							maxLength : 48,
							fieldLabel : "主题",
							name : "memo.memoTheme"
						}, {
							xtype : "relationCompositeField",
							disabled : !this.saveable,
							readOnly : true,
							allowBlank : false,
							fieldLabel : "关联客户",
							name : "memo.customName",
							relateModule : RelationModule.customer.relateModule,
							importhandler : this.importCustomerArchives.createDelegate(this)
						}, {
							readOnly : true,
							fieldLabel : "出厂编号",
							name : "memo.exwSerial"
						}, {
							readOnly : true,
							fieldLabel : "备案编号",
							name : "memo.recordId"
						} ]
					} ]
				}, {
					xtype : "textarea",
					anchor : "95%",
					maxLength : 128,
					height : 48,
					fieldLabel : "备注",
					name : "memo.remark"
				} ]
			} ]
		}, {
			layout : "form",
			columnWidth : 0.34,
			defaultType : "textfield",
			items : [ this.memoDeputyGridPanel ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.memoDetailGrid ]
	} ];
	MemoForm.superclass.constructor.call(this, {
		title : "工作备忘",
		width : 800,
		form_config : {
			labelWidth : 75,
			object : "memo",
			saveable : this.saveable,
			url : __ctxPath + "/form/saveMemo.do",
			items : items,
			fieldMapping : MemoFieldMapping,
			hiddenField : MemoHiddenField
		}
	});
};
Ext.extend(MemoForm, Knight.ux.FormPanelWindow, {
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "practiId", "practiName" ], [ data.practiId, data.practiName ]);
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "customId", "customName" ], [ data.customerId, data.customerName ]);
	},
	importEquipmentArchives : function(data) {
		var fieldNames = [ "equipId", "equipGeneric", "equipGenericName", "recordId", "exwSerial" ];
		var values = [ data.equipId, data.equipGeneric, data.equipGenericName, data.recordId, data.exwSerial ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "projectId", "projectName", "address" ], [ data.projectId, data.projectName, data.address ]);
	},
	saveFormData : function() {
		this.setFieldValue("memoDetails", $gridstore2json(this.memoDetailGrid));
		this.setFieldValue("memoDeputys", $gridstore2json(this.memoDeputyGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.memoId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/form/loadMemo.do?memoId=" + this.memoId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.memoDetailSet, this.memoDetailGrid);
					this.setFormSubModuleGrid(data.memoDeputySet, this.memoDeputyGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname ];
			if (curUserInfo.practitioner) {
				fieldNames.push("practiId", "practiName");
				values.push(curUserInfo.practitioner.practiId, curUserInfo.practitioner.practiName);
			}
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});