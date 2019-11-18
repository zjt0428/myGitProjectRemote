var CustomerForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	
	var customerLevelCombo = $initComboBoxField("客户级别", "customer.customerLevel", "customerLevel", {
		allowBlank : true
	});
	var customerAttributeCombo = $initComboBoxField("客户属性", "customer.customerAttribute", "customerAttribute", {
		allowBlank : true
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
				items : [ {
					allowBlank : false,
					fieldLabel : CustomerFormLable.customerName,
					name : "customer.customerName"
				}, {
					allowBlank : false,
					maxLength : 64,
					fieldLabel : "客户简称",
					name : "customer.customerNiceName"
				},customerLevelCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 32,
					fieldLabel : CustomerFormLable.unitType,
					name : "customer.unitType"
				}, {
					maxLength : 128,
					fieldLabel : "办公地址",
					name : "customer.address"
				},customerAttributeCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 16,
					fieldLabel : "办公电话",
					name : "customer.tel"
				}, {
					maxLength : 128,
					fieldLabel : CustomerFormLable.mainBusiness,
					name : "customer.mainBusiness"
				} ]
			} ]
		} ]
	} ];
	this.customerLinkerGrid = new CustomerLinkerGrid({
		customerId : this.customerId
	}, {
		saveable : this.saveable
	});
	this.customerAccountGrid = new CustomerAccountGrid({
		customerId : this.customerId
	}, {
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		bodyStyle : "background:#dfe8f7;",
		anchor : "98%",
		activeTab : 0,
		items : [ {
			xtype : "panel",
			bodyStyle : "background:#dfe8f7; margin:5px 0px 0px 0px;",
			title : "补充信息",
			anchor : "98%",
			layout : 'form',
			height : 150,
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
						name : "customer.regCapital",

					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					items : [ {
						xtype : "datefield",
						width : 130,
						editable : false,
						format : "Y-m-d",
						fieldLabel : CustomerFormLable.birthDate,
						name : "customer.birthDate"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					items : [ {
						xtype : "textfield",
						maxLength : 128,
						fieldLabel : CustomerFormLable.businessArea,
						name : "customer.businessArea"
					} ]
				} ]
			}, {
				anchor : "95%",
				maxLength : 128,
				height : 48,
				xtype : "textarea",
				fieldLabel : "简介",
				name : "customer.description"
			}, {
				anchor : "95%",
				maxLength : 128,
				height : 48,
				xtype : "textarea",
				fieldLabel : "备注",
				name : "customer.remark"
			} ]
		}, this.customerLinkerGrid, this.customerAccountGrid ]
	});
	items.push(this.relateTabPanel);

	CustomerForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : "客户明细",
			object : "customer",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveCustomer.do",
			items : items,
			fieldMapping : CustomerFieldMapping,
			hiddenField : CustomerHiddenField
		}
	});
};
Ext.extend(CustomerForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		for (var i = 0; i < this.customerLinkerGrid.getStore().getCount(); i++) {
			var r = this.customerLinkerGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.linkerType)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录联系人类型未选择!");
				return;
			}
		}
		this.setFieldValue("customerAccounts", $gridstore2json(this.customerAccountGrid));
		this.setFieldValue("customerLinkers", $gridstore2json(this.customerLinkerGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.customerId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadCustomer.do?customerId=" + this.customerId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.customerLinkerSet, this.customerLinkerGrid);
					this.setFormSubModuleGrid(data.customerAccountSet, this.customerAccountGrid);
					if (!Ext.isEmpty(data.customerLinker)) {
						var linkerGridStore = this.customerLinkerGrid.getStore();
						for (var i = 0; i < linkerGridStore.getCount(); i++) {
							if (linkerGridStore.getAt(i).data.customerLinkerId == data.customerLinker.customerLinkerId) {
								linkerGridStore.getAt(i).set("defaultFlag", true);
								break;
							}
						}
					}
					if (!Ext.isEmpty(data.customerAccount)) {
						var accountGridStore = this.customerAccountGrid.getStore();
						for (var i = 0; i < accountGridStore.getCount(); i++) {
							if (accountGridStore.getAt(i).data.customerAccountId == data.customerAccount.customerAccountId) {
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