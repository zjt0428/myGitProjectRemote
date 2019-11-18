var AdvancedQueryWin = function(a, b) {
	Ext.apply(this, b || {});
	Ext.applyIf(this, {
		width : 480
	});
	this.height = 120;
	var queryHiddenFieldItems = [];
	var queryFieldItemsLeft = [];
	var queryFieldItemsRight = [];
	for (var i = 0, j = 0; i < a.length; i++) {
		var queryField = null;
		switch (a[i].fieldType) {
			case 'CHAR_FIELD':
				queryField = this.createCharField(a[i]);
				break;
			case 'NUMBER_FIELD':
				queryField = this.createNumberField(a[i]);
				break;
			case 'DATETIME_FIELD':
				queryField = this.createDateTimeField(a[i]);
				break;
			case 'DATE_FIELD':
				queryField = this.createDateField(a[i]);
				break;
			case 'CODE_FIELD':
				queryField = this.createCodeField(a[i]);
				break;
			case 'COMBO_FIELD':
				queryField = this.createComboField(a[i]);
				break;
			case 'CODE_TREE_FIELD':
				var treeId = Ext.id();
				queryHiddenFieldItems.push(new Ext.form.Hidden({
					id : treeId,
					name : a[i].name
				}));
				queryField = new Knight.ux.TreeCombo({
					id : Ext.id(),
					xtype : "treecombo",
					valId : treeId,
					fieldLabel : a[i].fieldLabel,
					url : a[i].url,
					name : "F_" + a[i].name
				});
				break;
			case 'ADDRESS_FIELD':
				j--;
				this.provinceCombo = $initComboBoxField("省", "Q_province_S_EQ", "province", {
					width : 90,
					allowBlank : true
				}, {
					'select' : this.provinceSelect.createDelegate(this)
				});
				this.cityCombo = $initComboBoxField("市", "Q_city_S_EQ", "city", {
					autoLoad : false,
					width : 90,
					allowBlank : true
				}, {
					'select' : this.citySelect.createDelegate(this)
				});
				this.countyCombo = $initComboBoxField("区", "Q_county_S_EQ", "county", {
					autoLoad : false,
					width : 90,
					allowBlank : true
				}, {
					'select' : this.countySelect.createDelegate(this)
				});
				this.addressFiled = {
					xtype : 'compositefield',
					fieldLabel : a[i].fieldLabel ? a[i].fieldLabel : '所在省',
					items : [ this.provinceCombo, {
						xtype : 'displayfield',
						value : '市：',
						margins : '5 0 0 7'
					}, this.cityCombo, {
						xtype : 'displayfield',
						value : '区：',
						margins : '5 0 0 7'
					}, this.countyCombo ]
				};
				break;
			case 'HIDDEN_FIELD':
				j--;
				var hiddenFiled = new Ext.form.Hidden(a[i]);
				queryHiddenFieldItems.push(hiddenFiled);
				break;
			case 'DATE_RANGE_FIELD':
				j--;
				this.height += 30;
				var leftDateField = new Ext.form.DateField({
					fieldLabel : a[i].fieldLabel,
					xtype : "datefield",
					format : "Y-m-d",
					width : 120,
					editable : false,
					name : a[i].leftFieldLabel
				});
				var rightDateField = new Ext.form.DateField({
					fieldLabel : '至',
					labelStyle : 'text-align:center',
					xtype : "datefield",
					format : "Y-m-d",
					width : 120,
					editable : false,
					name : a[i].rightFieldLabel
				});
				if (!this.dateRangeFields) {
					this.dateRangeFields = [];
				}
				this.dateRangeFields.push({
					layout : "column",
					items : [ {
						layout : "form",
						columnWidth : 0.5,
						items : [ leftDateField ]
					}, {
						layout : "form",
						columnWidth : 0.5,
						defaults : {
							width : 120
						},
						items : [ rightDateField ]
					} ]
				});
		}
		if (!queryField) {
			continue;
		}
		if ((i + j) % 2 == 0) {
			this.height += 30;
			queryFieldItemsLeft.push(queryField);
		} else {
			queryFieldItemsRight.push(queryField);
		}
	}
	for ( var param in this.base_params) {
		queryHiddenFieldItems.push({
			xtype : "textfield",
			hidden : true,
			name : param,
			value : this.base_params[param]
		});
	}
	var queryFieldItems = [ {
		layout : "column",
		items : [ {
			layout : "form",
			columnWidth : 0.5,
			defaults : {
				width : 120
			},
			items : queryFieldItemsLeft
		}, {
			layout : "form",
			columnWidth : 0.5,
			defaults : {
				width : 120
			},
			items : queryFieldItemsRight
		} ]
	} ];
	if (this.dateRangeFields) {
		queryFieldItems = queryFieldItems.concat(this.dateRangeFields);
	}
	if (this.addressFiled) {
		queryFieldItems.push(this.addressFiled);
	}
	if (queryHiddenFieldItems.length > 0) {
		this.height += 10;
		queryFieldItems = queryFieldItems.concat(queryHiddenFieldItems);
	}
	this.searchPanel = new Ext.FormPanel({
		frame : true,
		autoScroll : true,
		labelAlign : "right",
		labelSeparator : "：",
		labelWidth : 80,
		bodyStyle : "padding : 1px 1px 1px 1px",
		items : [ queryFieldItems ]
	});

	AdvancedQueryWin.superclass.constructor.call(this, {
		layout : "fit",
		iconCls : "menu-set-department",
		width : this.width,
		height : this.height,
		items : this.searchPanel,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		closeAction : "hide",
		buttonAlign : "center",
		buttons : [ {
			text : "查询",
			iconCls : "btn-advanced_search",
			scope : this,
			handler : this.advancedSearchSubmit.createDelegate(this)
		}, {
			text : "清除",
			iconCls : "btn-clean",
			scope : this,
			handler : function() {
				this.searchPanel.getForm().reset();
			}
		}, {
			text : "关闭",
			iconCls : "btn-close",
			scope : this,
			handler : function() {
				this.hide();
			}
		} ]
	});
};
Ext.extend(AdvancedQueryWin, Ext.Window, {
	advancedSearchSubmit : function() {
		if (this.searchPanel.getForm().isValid()) {
			if (this.submit) {
				this.hide();
				this.submit.call(this, this.searchPanel);
			} else {
				this.searchPanel.getForm().submit({
					waitMsg : "正在提交查询",
					url : this.url,
					success : function(f, g) {
						if (this.callback) {
							this.callback.call(this, f, g);
						}
						this.hide();
					}.createDelegate(this)
				});
			}
		}
	},
	getForm : function() {
		return this.searchPanel.getForm();
	},
	provinceSelect : function(combo, record, index) {
		this.getForm().findField("Q_province_S_EQ").setValue(record.data.code);
		this.getForm().findField("Q_city_S_EQ").setValue("");
		this.getForm().findField("Q_county_S_EQ").setValue("");
		this.cityCombo.getStore().proxy.conn.url = __ctxPath + "/system/queryCode.do", this.cityCombo.getStore().reload({
			params : {
				codeId : "city",
				bhField : record.data.code.substr(0, 2)
			}
		});
		this.countyCombo.getStore().clearData();
		this.cityCombo.setValue("");
		this.countyCombo.setValue("");
	},
	citySelect : function(combo, record, index) {
		this.getForm().findField("Q_city_S_EQ").setValue(record.data.code);
		this.getForm().findField("Q_county_S_EQ").setValue("");
		this.countyCombo.getStore().proxy.conn.url = __ctxPath + "/system/queryCode.do", this.countyCombo.getStore().reload({
			params : {
				codeId : "county",
				bhField : record.data.code.substr(0, 4)
			}
		});
		this.countyCombo.setValue("");
	},
	countySelect : function(combo, record, index) {
		this.getForm().findField("Q_county_S_EQ").setValue(record.data.code);
	},
	createCharField : function(c) {
		var charField = new Ext.form.TextField(c);
		return charField;
	},
	createNumberField : function(c) {
		var numberField = new Ext.form.NumberField(c);
		return numberField;
	},
	createDateTimeField : function(c) {
		var dateTimeField = new Ext.ux.form.DateTimeField(c);
		return dateTimeField;
	},
	createDateField : function(c) {
		var dateField = new Ext.form.DateField(c);
		return dateField;
	},
	createCodeField : function(c) {
		var comboField = $initComboBoxField(c.fieldLabel, c.name, c.codeId, {
			allowBlank : true
		});
		return comboField;
	},
	createComboField : function(c) {
		var comboField = new Ext.form.ComboBox(Ext.apply({
			width : 130,
			hiddenName : c.name,
			emptyText : "请选择...",
			mode : "local",
			editable : false,
			allowBlank : false,
			triggerAction : "all"
		}, c));
		return comboField;
	}
});