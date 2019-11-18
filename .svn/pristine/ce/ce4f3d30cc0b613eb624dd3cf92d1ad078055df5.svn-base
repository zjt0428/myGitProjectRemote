var SafetyMonitorSettleListsGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var grid = this;
	var columns = [ {
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "设备名称",
		dataIndex : "equipGenericName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipGenericData,
			editable : false
		}),
		renderer : function(value, metadata, record, rowIndex, colIndex, store) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var  equipSelect=grid.getColumnModel().getCellEditor(4,rowIndex);
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.equipGenericName);
				value = store.getAt(index).data.name;
			}
			var  newEquipSpecificData=[];
			if(!Ext.isEmpty(this.getEditor().value) && index != -1){
				newEquipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listEquipSpecificCode.do", {
					codeId : this.getEditor().value
				});
				if(grid.saveable) {
					equipSelect.field.getStore().loadData(newEquipSpecificData);
				}
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.equipGenericName = value;
			return value;
		}
	}, {
		header : "设备型号",
		dataIndex : "equipSpecificName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipSpecificData
		}),
		renderer : function(value, metadata, record) {
			if (value == undefined) {
				return;
			}
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.equipSpecificName);
				value = store.getAt(index).data.name;
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.equipSpecificName = value;
			return value;
		}
	}, {
		width : 40,
		header : "设备自编号",
		dataIndex : "equipSerial",
		editor : new Ext.form.TextField({
			maxLength : 6
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				value = record.json.equipSerial;
				record.data.equipSerial = value;
				return value;
			}else{
				return value;
			}
		}
	},/* {
		header : "起租日",
		dataIndex : "startRentDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		})
	},*/{
		header : "启用日",
		allowBlank : false,
		dataIndex : "startSettleDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.startSettleDate = record.json.startSettleDate;
				return record.json.startSettleDate;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startSettleDate = value;
			return value;
		}
	}, 
	{
		header : "截止日",
		allowBlank : false,
		dataIndex : "endSettleDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.endSettleDate = record.json.endSettleDate;
				return record.json.endSettleDate;
			}
			var startSettleDate = Date.parseDate(record.data.startSettleDate, "Y-m-d");
			if (startSettleDate > value) {
				Ext.MessageBox.alert("操作信息", "截止日期小于开始日期!");
				value = startSettleDate;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endSettleDate = value;
			return value;
		}
	},
	/* {
		width : 50,
		header : "计费天数",
		dataIndex : "settleDays",
        css : "color:#7F7F7F;",
		renderer : function(value, metadata, record) {
			var startSettleDate = Date.parseDate(record.data.startSettleDate, "Y-m-d");
			var endSettleDate = Date.parseDate(record.data.endSettleDate, "Y-m-d");
			if (endSettleDate < startSettleDate) {
				Ext.MessageBox.alert("操作信息", "截止日期小于开始日期!");
				record.data.settleDays = 0;
				return 0;
			}
			var s = (endSettleDate.getTime() - startSettleDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
			var days = Math.round(s);
			record.data.settleDays = days;
			return days;
		}
	},*/{
		width : 50,
		header : "租金标准(元)",
		
		dataIndex : "rentStandard",
		editor : new Ext.form.NumberField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.rentStandard = record.json.rentStandard;
				return record.json.rentStandard;
			}
			record.data.initialHeight = value;
			return value;
		}
	},{
		width : 80,
		header : "租金单位",
		dataIndex : "rentUnit",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.measurementData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.rentUnit);
				value = store.getAt(index).data.name;
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.rentUnit = value;
			return value;
		}
	}, {
		width : 80,
		header : "日租金",
		dataIndex : "daysRent",
		css : "color:#7F7F7F;",
		editor : new Ext.form.NumberField({
			decimalPrecision : 3,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.daysRent = record.json.daysRent;
				return record.json.daysRent;
			}
			if (value != record.data.daysRent1) {
				record.data.daysRent1 = value;
				return value;
			}
			var daysRent = Ext.util.Format.number(record.data.rentStandard / 30, '0.000');
			record.data.daysRent1 = daysRent;
			record.data.daysRent = daysRent;
			return daysRent;
		}
	},
	
	 {
		width : 80,
		header : "应扣租金",
		dataIndex : "deductRent",
		editor : new Ext.form.NumberField({
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.deductRent = record.json.deductRent;
				return record.json.deductRent;
			}
			value = Ext.isEmpty(value) ? 0 : value;
			record.data.deductRent = value;
			return Ext.util.Format.number(value, "0.00");
		}
	}, 
	
	];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable ) {
		this.tbarItems = [ {
			iconCls : "btn-head-add",
			text : "新增",
			handler : this.addSubModule.createDelegate(this)
		}/*,{
			iconCls : "btn-head-del",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		}*/];
	}
	if(this.saveable && !this.delForbidden){
		this.tbarItems.push({
			iconCls : "btn-head-del",
			text : "删除2",
			handler : this.delSubModules.createDelegate(this)
		});
	}
	SafetyMonitorSettleListsGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : SafetyMonitorSettleListViewField,
		title : "安全监控系统结算清单",
		option : "安全监控系统结算清单",
		addForbidden : true,
		delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelSafetyMonitorSettleContract.do"
	}, this.grid_config || {}));
};
Ext.extend(SafetyMonitorSettleListsGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			dispatchable : 0
		};
	},
	loadResource : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipId == data.equipId) {
				return;
			}
		}
		var endSettleDate = null;
		if (Ext.isEmpty(data.lastBlockupDate)) {
			endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
		} else {
			endSettleDate = data.lastBlockupDate;
		}
		if(Ext.isEmpty(data.lastSettleDate)) {
			data.lastSettleDate =  this.parentForm.getFieldValue("startSettleDate");
		}
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		this.addHeight(recordHeight);
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
		Ext.apply(subModule.data, {
			equipDiaryId : data.equipDiaryId,
			equipId : data.equipId,
			recordSerial : data.recordSerial,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			equipCategoryName : data.equipCategoryName,
			equipSpecificName : data.equipSpecificName,
			buildingNum : data.buildingNum,
			unit : "台",
			startSettleDate : data.lastSettleDate,
			endSettleDate : endSettleDate,
			settleDays : 0,
			quantity : 1,
			deductRent : 0,
			rentStandard :data.rentStandard,
			equipSerial : data.equipSerial,
			taxRate : parentTaxRate
		});
		this.stopEditing();
		this.getStore().add(subModule);
		this.startEditing(0, 0);
	},
	loadContractEquipResource : function() {
		$request({
			url : __ctxPath + "/equip/listEquipmentDiary.do",
			params : {
				"Q_contractId_L_EQ" : this.contractId,
				"Q_lastSettleDate_S_NOTNULL" : "0",
				"limit" : -1
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var diarys = resp.result;
				for (var i = 0; i < diarys.length; i++) {
					this.loadResource(diarys[i]);
				}
			}.createDelegate(this)
		});
	},
	loadEquipmentResource : function() {
		new EquipSelector({
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					d[i].set("lastSettleDate", new Date().format("Y-m-d"));
					this.loadResource(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	},
	automaticDeduction : function() {
		if(this.getSelectionModel().hasSelection()){
		var m = this.getSelectionModel().getSelections();
		for (var i = 0; i < m.length; i++) {
			var quantity = m[i].get("quantity");
			var daysRent = m[i].get("daysRent");
			m[i].set("deductRent", quantity * daysRent);
			}
		}else{
			Ext.MessageBox.show({
		        title : "提示",
		       	msg :"请选择要操作的设备!",
		       	buttons: Ext.MessageBox.OK
		    });
		}
	},
	delSubModules : function(){
		if (!Ext.isEmpty(this.delurl)) {
			this.speciallyGridAction(this, this.fieldId, this.delurl, "删除", null, null, function() {
				var m = this.getSelectionModel().getSelections();
				this.subtractRecordHeight(m.length);
				for (var i = 0; i < m.length; i++) {
					if(m[i].data.dispatchable!="0"){
						Ext.Msg.alert("第[" + (i + 1) + "]条设备已发货，无法删除!");
						return; 
					}
					this.stopEditing();
					this.getStore().remove(m[i]);
				}
				this.startEditing(0, 0);
			}.createDelegate(this));
		}
	}
});