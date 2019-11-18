var InventoryForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	Ext.apply(this, {
		repertoryCategoryId : Ext.id()
	});

	var categoryTopbarItems = null;
	if (this.saveable) {
		categoryTopbarItems = [ {
			iconCls : "btn-head-del",
			text : "盘点计算",
			handler : this.calculateInventoryCategory.createDelegate(this)
		}, {
			iconCls : "btn-head-del",
			text : "重置盘点",
			handler : this.resetInventoryCategory.createDelegate(this)
		} ];
	}
	this.inventoryCategoryGrid = new InventoryCategoryGrid(null, {
		saveable : this.saveable,
		tbarItems : categoryTopbarItems
	});
	var items = [ {
		xtype : "hidden",
		id : this.repertoryCategoryId,
		name : "inventory.repertoryCategory"
	}, {
		xtype : "fieldset",
		title : "盘点信息",
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
					readOnly : true,
					width : 145,
					fieldLabel : "盘点人",
					name : "inventory.userName"
				}, {
					readOnly : true,
					width : 145,
					fieldLabel : "盘点编号",
					name : "inventory.inventorySerial"
				}, {
					xtype : "treecombo",
					valId : this.repertoryCategoryId,
					allowBlank : true,
					width : 145,
					fieldLabel : "盘点类别",
					url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
					name : "inventory.repertoryCategoryName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 145,
					editable : false,
					fieldLabel : "盘点日期",
					name : "inventory.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					width : 145,
					fieldLabel : "盘点主题",
					name : "inventory.inventoryTheme"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 145,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "期初时间",
					name : "inventory.startTime",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					width : 145,
					fieldLabel : "填报部门",
					name : "inventory.department.depName"
				}, {
					xtype : "container",
					height : 26
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 145,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "期末时间",
					name : "inventory.endTime",
					value : new Date()
				} ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.inventoryCategoryGrid ]
	} ];
	InventoryForm.superclass.constructor.call(this, {
		title : "盘点信息",
		animateTarget : this.animateTarget,
		width : 800,
		form_config : {
			labelWidth : 75,
			object : "inventory",
			saveable : this.saveable,
			url : __ctxPath + "/form/saveInventory.do",
			items : items,
			fieldMapping : InventoryFieldMapping,
			hiddenField : InventoryHiddenField
		}
	});
};
Ext.extend(InventoryForm, Knight.ux.FormPanelWindow, {
	calculateInventoryCategory : function() {
		var categoryField = this.getForm().findField("inventory.repertoryCategory");
		var category = categoryField.getValue();
		var categoryNameField = this.getForm().findField("inventory.repertoryCategoryName");
		var startTimeField = this.getForm().findField("inventory.startTime");
		var startTime = startTimeField.getValue();
		var endTimeField = this.getForm().findField("inventory.endTime");
		var endTime = endTimeField.getValue();
		$request({
			url : __ctxPath + "/form/calculateCategoryInventory.do",
			params : {
				category : category,
				startTime : startTime,
				endTime : endTime
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var ds = resp.data[0];
				for ( var i = 0; i < ds.length; i++) {
					this.inventoryCategoryGrid.addSubModule(ds[i]);
				}
				categoryNameField.setReadOnly(true);
				startTimeField.setReadOnly(true);
				endTimeField.setReadOnly(true);
			}.createDelegate(this)
		});
	},
	resetInventoryCategory : function() {
		var subHeight = 21 * this.inventoryCategoryGrid.getStore().getCount();
		this.inventoryCategoryGrid.getStore().removeAll();
		this.inventoryCategoryGrid.subtractHeight(subHeight);
		this.getForm().findField("inventory.repertoryCategoryName").setReadOnly(false);
		this.getForm().findField("inventory.startTime").setReadOnly(false);
		this.getForm().findField("inventory.endTime").setReadOnly(false);
	},
	saveFormData : function() {
		this.getForm().findField("inventory.inventoryCategorys").setValue($gridstore2json(this.inventoryCategoryGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.inventoryId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/form/loadInventory.do?inventoryId=" + this.inventoryId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];

					this.inventoryCategoryGrid.addRecordHeight(data.inventoryCategorySet.length);
					this.inventoryCategoryGrid.getStore().loadData(data.inventoryCategorySet);

					this.getForm().findField("inventory.repertoryCategoryName").setReadOnly(true);
					this.getForm().findField("inventory.startTime").setReadOnly(true);
					this.getForm().findField("inventory.endTime").setReadOnly(true);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});