var SupplierForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

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
				items : [ {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "单位名称",
					name : "supplier.supplierName",

				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 32,
					fieldLabel : "单位类型",
					name : "supplier.unitType"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 16,
					fieldLabel : "办公电话",
					name : "supplier.tel"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 128,
					fieldLabel : "办公地址",
					name : "supplier.address"
				}, {
					fieldLabel : "联系人",
					name : "supplier.linkMan"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					maxLength : 128,
					width : 410,
					fieldLabel : "主营业务",
					name : "supplier.mainBusiness"
				}, {
					maxLength : 13,
					width : 300,
					fieldLabel : "联系人电话",
					name : "supplier.linkManPhone"
				} ]
			} ]
		} ]
	} ];
	this.supplierLinkerGrid = new SupplierLinkerGrid({
		supplierId : this.supplierId
	}, {
		saveable : this.saveable
	});
	this.supplierAccountGrid = new SupplierAccountGrid({
		supplierId : this.supplierId
	}, {
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		bodyStyle : "background:#dfe8f7;",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ {
			xtype : "panel",
			bodyStyle : "background:#dfe8f7; margin:5px 0px 0px 0px;",
			title : "补充信息",
			anchor : "98%",
			layout : 'form',
			height : 150,
			frame: true,
			items : [ {
				xtype : "panel",
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.33,
					items : [ {
						xtype : "numberfield",
						maxLength : 10,
						fieldLabel : "注册资金",
						name : "supplier.regCapital",

					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					items : [ {
						xtype : "datefield",
						width : 130,
						editable : false,
						format : "Y-m-d",
						fieldLabel : "成立日期",
						name : "supplier.birthDate"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					items : [ {
						xtype : "textfield",
						maxLength : 128,
						fieldLabel : "业务区域",
						name : "supplier.businessArea"
					} ]
				} ]
			}, {
				xtype : "textarea",
				anchor : "95%",
				maxLength : 128,
				height : 48,
				fieldLabel : "简介",
				name : "supplier.description"
			}, {
				xtype : "textarea",
				anchor : "95%",
				maxLength : 128,
				height : 48,
				fieldLabel : "备注",
				name : "supplier.remark"
			} ]
		}, this.supplierLinkerGrid, this.supplierAccountGrid ]
	});
	items.push(this.relateTabPanel);
	SupplierForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : "供应商明细",
			object : "supplier",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveSupplier.do",
			items : items,
			fieldMapping : SupplierFieldMapping,
			hiddenField : SupplierHiddenField
		}
	});
};
Ext.extend(SupplierForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		for (var i = 0; i < this.supplierLinkerGrid.getStore().getCount(); i++) {
			var r = this.supplierLinkerGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.linkerType)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录联系人类型未选择!");
				return;
			}
		}
		this.setFieldValue("supplierAccounts", $gridstore2json(this.supplierAccountGrid));
		this.setFieldValue("supplierLinkers", $gridstore2json(this.supplierLinkerGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.supplierId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadSupplier.do?supplierId=" + this.supplierId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.supplierLinkerSet, this.supplierLinkerGrid);
					this.setFormSubModuleGrid(data.supplierAccountSet, this.supplierAccountGrid);
					if (!Ext.isEmpty(data.supplierLinker)) {
						var linkerGridStore = this.supplierLinkerGrid.getStore();
						for (var i = 0; i < linkerGridStore.getCount(); i++) {
							if (linkerGridStore.getAt(i).data.supplierLinkerId == data.supplierLinker.supplierLinkerId) {
								linkerGridStore.getAt(i).set("defaultFlag", true);
								break;
							}
						}
					}
					if (!Ext.isEmpty(data.supplierAccount)) {
						var accountGridStore = this.supplierAccountGrid.getStore();
						for (var i = 0; i < accountGridStore.getCount(); i++) {
							if (accountGridStore.getAt(i).data.supplierAccountId == data.supplierAccount.supplierAccountId) {
								accountGridStore.getAt(i).set("defaultFlag", true);
								break;
							}
						}
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});