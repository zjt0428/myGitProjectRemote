/**
 * <pre><code>
 * saveable : Boolean,
 * height : Number,
 * contractId : Number,
 * rentStandardData : Array,
 * measurementData : Array
 * </code></pre>
 */
var RentComponBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();

	var columns = [ {
		header : "品名",
		dataIndex : "componCategoryName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		})
	}, {
		header : "设备型号",
		dataIndex : "componSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 40,
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "启用日",
		dataIndex : "startRentDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startRentDate = value;
			return value;
		}
	}, {
		header : "截止日",
		dataIndex : "endRentDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			var startRentDate = Date.parseDate(record.data.startRentDate, "Y-m-d");
			if (startRentDate > value) {
				Ext.MessageBox.alert("操作信息", "截止日期小于开始日期!");
				value = startRentDate;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endRentDate = value;
			return value;
		}
	}, {
		width : 50,
		header : "计费天数",
		dataIndex : "rentDays",
		renderer : function(value, metadata, record) {
			var startRentDate = Date.parseDate(record.data.startRentDate, "Y-m-d");
			var endRentDate = Date.parseDate(record.data.endRentDate, "Y-m-d");
			if (endRentDate < startRentDate) {
				Ext.MessageBox.alert("操作信息", "截止日期小于开始日期!");
				record.data.rentDays = 0;
				return 0;
			}
			var s = (endRentDate.getTime() - startRentDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
			var days = Math.round(s);
			record.data.rentDays = days;
			return days;
		}
	}, {
		width : 80,
		header : "租金标准",
		dataIndex : "rentStandard",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.rentStandardData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.rentStandard = value;
			return value;
		}
	}, {
		width : 80,
		header : "租金单位",
		dataIndex : "measurement",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.measurementData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.measurement = value;
			return value;
		}
	}, {
		width : 50,
		header : "租赁数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		width : 80,
		header : "日租金",
		dataIndex : "daysRent",
		editor : new Ext.form.NumberField({
			maxLength : 6
		}),
		renderer : function(value, metadata, record) {
			if (value != record.data.daysRent1) {
				record.data.daysRent1 = value;
				return value;
			}
			var daysRent = Math.round(record.data.rentStandard / 30 * 100) / 100;
			record.data.daysRent1 = daysRent;
			record.data.daysRent = daysRent;
			return daysRent;
		}
	}, {
		width : 80,
		header : "应扣租金",
		dataIndex : "deductRent",
		editor : new Ext.form.NumberField({
			maxLength : 6
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? 0 : value;
			record.data.deductRent = value;
			return value;
		}
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var summary = 0;
			var startRentDate = Date.parseDate(record.data.startRentDate, "Y-m-d");
			var endRentDate = Date.parseDate(record.data.endRentDate, "Y-m-d");
			var rentStandard = Number(record.data.rentStandard);
			var daysRent = record.data.daysRent;
			var rentDays = record.data.rentDays;
			var quantity = record.data.quantity;
			var deductRent = record.data.deductRent;
			var monthDifference = (endRentDate.getYear() - startRentDate.getYear()) * 12 + (endRentDate.getMonth() - startRentDate.getMonth())
			if (monthDifference == 0) {
				var rentMonthArray = KnightUtil.date.getMonthStartStop(startRentDate);
				if (startRentDate.getDate() == rentMonthArray[0].getDate() && endRentDate.getDate() == rentMonthArray[1].getDate()) {
					summary += KnightUtil.math.forHundredthDight(rentStandard * quantity - deductRent);
				} else {
					summary = KnightUtil.math.forHundredthDight(daysRent * rentDays * quantity - deductRent);
				}
			} else {
				summary = KnightUtil.math.forHundredthDight(rentStandard * (monthDifference - 1) * quantity - deductRent);

				var startRentMonthArray = KnightUtil.date.getMonthStartStop(startRentDate);
				var endRentMonthArray = KnightUtil.date.getMonthStartStop(endRentDate);
				if (startRentDate.getDate() == startRentMonthArray[0].getDate()) {
					summary += rentStandard * quantity;
				} else {
					var startRentDiff = startRentMonthArray[1].getDate() - startRentDate.getDate();
					summary += KnightUtil.math.forHundredthDight(daysRent * (startRentDiff + 1) * quantity);
				}
				if (endRentDate.getDate() == endRentMonthArray[1].getDate()) {
					summary += rentStandard * quantity;
				} else {
					var endRentDiff = endRentDate.getDate() - endRentMonthArray[0].getDate();
					summary += KnightUtil.math.forHundredthDight(daysRent * (endRentDiff + 1) * quantity);
				}
			}
			record.data.summary = summary;
			return summary;
		}
	}, {
		width : 100,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 80,
		header : "零配件编号",
		dataIndex : "componSerial",
		editor : new Ext.form.TextField({
			width : 70,
			readOnly : true
		})
	}, {
		header : "设备编号",
		dataIndex : "recordId"
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable && this.contractId) {
		this.tbarItems = [ {
			iconCls : "btn-head-import",
			text : "导入",
			handler : this.importComponResource.createDelegate(this)
		}, {
			iconCls : "btn-loading",
			text : "设备",
			handler : this.loadEquipmentResource.createDelegate(this)
		} ];
	}
	RentComponBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : RentComponBriefListViewField,
		title : "零配件结算信息",
		option : "零配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelComponBriefRentContract.do"
	}, this.grid_config || {}));
};
Ext.extend(RentComponBriefGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var startRentDate = this.parentForm.findFormField("startRentDate").getValue();
		var endRentDate = this.parentForm.findFormField("endRentDate").getValue();
		this.addHeight(recordHeight);
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
		Ext.apply(subModule.data, {
			componDiaryId : data.componDiaryId,
			componId : data.componId,
			componSerial : data.componSerial,
			componCategoryName : data.componCategoryName,
			componSpecificName : data.componSpecificName,
			unit : "台",
			startRentDate : startRentDate,
			endRentDate : endRentDate,
			quantity : 0,
			deductRent : 0
		});
		this.stopEditing();
		this.getStore().add(subModule);
		this.startEditing(0, 0);
	},
	importComponResource : function() {
		new ComponentSelector({
			params : {
				"Q_storeId_L_NULL" : 1
			},
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					this.loadResource(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	},
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		var endRentDate = this.parentForm.findFormField("endRentDate").getValue();
		return {
			componCategoryName : "品名",
			componSpecificName : "规格",
			unit : "台",
			startRentDate : new Date(),
			endRentDate : endRentDate,
			quantity : 0,
			deductRent : 0
		};
	},
	loadEquipmentResource : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要结算的配件信息！");
			return;
		}
		new EquipSelector({
			callback : function(d) {
				for (var i = 0; i < a.length; i++) {
					a[i].set("equipId", d[0].get("equipId"));
					a[i].set("recordId", d[0].get("recordId"));
				}
			}.createDelegate(this)
		}).show();
	}
});