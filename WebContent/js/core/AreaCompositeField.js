Ext.ns("Knight.ux");
Knight.ux.AreaCompositeField = function(a) {
	a.allowBlank = a.allowBlank === false ? a.allowBlank : true;
	Ext.apply(this, a || {});
	var autoLoad = true;
	if (this.readOnly || this.hidden) {
		autoLoad = false;
	}
	var displaty_margins = "3 1 0 3";
	this.provinceIndex = 0;
	this.cityIndex = 1;
	this.countyIndex = 2;
	Knight.ux.AreaCompositeField.superclass.constructor.call(this, {
		width : this.width*3,
		items : [ {
			xtype : "combo",
			width : this.width,
			mode : "local",
			triggerAction : "all",
			forceSelection : true,
			editable : false,
			readOnly : false,
			allowBlank : this.allowBlank,
			valueField : "code",
			displayField : "name",
			triggerAction : "all",
			emptyText : "请选择省份",
			hiddenName : this.provinceName,
			name : this.provinceName + "Name",
			store : new Ext.data.SimpleStore({
				autoLoad : autoLoad,
				url : __ctxPath + "/system/listCode.do?codeId=province",
				fields : [ "code", "name" ]
			}),
			listeners : {
				"select" : this.provinceSelect.createDelegate(this)
			}
		}, {
			xtype : "combo",
			width : this.width,
			mode : "local",
			triggerAction : "all",
			forceSelection : true,
			editable : false,
			readOnly : false,
			allowBlank : this.allowBlank,
			valueField : "code",
			displayField : "name",
			triggerAction : "all",
			emptyText : "请选择城市",
			hiddenName : this.cityName,
			name : this.cityName + "Name",
			store : new Ext.data.SimpleStore({
				autoLoad : autoLoad,
				url : __ctxPath + "/system/listCode.do?codeId=city",
				fields : [ "code", "name" ]
			}),
			listeners : {
				"select" : this.citySelect.createDelegate(this)
			}
		}, {
			xtype : "combo",
			width : this.width,
			mode : "local",
			triggerAction : "all",
			forceSelection : true,
			editable : false,
			readOnly : false,
			allowBlank : this.allowBlank,
			valueField : "code",
			displayField : "name",
			triggerAction : "all",
			emptyText : "请选择区/县",
			hiddenName : this.countyName,
			name : this.countyName + "Name",
			store : new Ext.data.SimpleStore({
				autoLoad : autoLoad,
				url : __ctxPath + "/system/listCode.do?codeId=county",
				fields : [ "code", "name" ]
			}),
			listeners : {
				"select" : this.countySelect.createDelegate(this)
			}
		} ],
		afterRender : function() {
			this.provinceCombo = this.items.itemAt(this.provinceIndex);
			this.cityCombo = this.items.itemAt(this.cityIndex);
			this.countyCombo = this.items.itemAt(this.countyIndex);
		}.createDelegate(this)
	});
};
Ext.extend(Knight.ux.AreaCompositeField, Ext.form.CompositeField, {
	provinceSelect : function(combo, record, index) {
		this.provinceCombo.setValue(record.data.code);
		this.cityCombo.setValue("");
		this.countyCombo.setValue("");
		this.cityCombo.getStore().proxy.conn.url = __ctxPath + "/system/queryCode.do", this.cityCombo.getStore().reload({
			params : {
				codeId : "city",
				bhField : record.data.code.substr(0, 2)
			}
		});
		this.countyCombo.getStore().clearData();
	},
	citySelect : function(combo, record, index) {
		this.cityCombo.setValue(record.data.code);
		this.countyCombo.setValue("");
		this.countyCombo.getStore().proxy.conn.url = __ctxPath + "/system/queryCode.do", this.countyCombo.getStore().reload({
			params : {
				codeId : "county",
				bhField : record.data.code.substr(0, 4)
			}
		});
	},
	countySelect : function(combo, record, index) {
		this.countyCombo.setValue(record.data.code);
	},
	setProvinceRawValue : function(valueName) {
		this.provinceCombo.setRawValue(valueName);
	},
	setCityRawValue : function(valueName) {
		this.cityCombo.setRawValue(valueName);
	},
	setCountyRawValue : function(valueName) {
		this.countyCombo.setRawValue(valueName);
	},
	setRawValue : function(provinceName, cityName, countyName) {
		this.setProvinceRawValue(provinceName);
		this.setCityRawValue(cityName);
		this.setCountyRawValue(countyName);
	}
});
Ext.reg("areaCompositeField", Knight.ux.AreaCompositeField);