/**
 * <pre><code>
 * saveable : Boolean,
 * height : Number,
 * contractId : Number,
 * rentStandardData : Array,
 * measurementData : Array
 * </code></pre>
 */
var RentEquipBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();

	var columns = [ {
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			maxLength : 32
		})
	}, {
		header : "备案编号",
		dataIndex : "recordId",
		editor : new Ext.form.TextField({
			maxLength : 32
		})
	}, {
		header : "品名",
		dataIndex : "equipCategoryName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		})
	}, {
		header : "规格型号",
		dataIndex : "equipSpecificName",
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
	},{
		xtype : "checkcolumn",
		header : "整月",
		dataIndex : "monthTag",
		width : 50,
		renderer : function(v, p, record){
			p.css += ' x-grid3-check-col-td';
			if(v == "true" || v == true){
                record.data.summary = record.data.rentStandard*record.data.quantity;
				v = '-on';
			}else{
				record.data.summary = "";
				v = '';
			}
			return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
		}
	},{
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
		header : "租赁费(承包单价)",
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
			maxValue : 99999
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
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? 0 : value;
			record.data.deductRent = value;
			return Ext.util.Format.number(value, "0.00");
		}
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			if(!record.data.monthTag){
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
					summary += KnightUtil.math.forHundredthDight(daysRent * rentDays * quantity - deductRent);
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
			return Ext.util.Format.number(summary, "0.00");
		}
			return Ext.util.Format.number(value, "0.00");
		}
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 80,
		header : "出厂编号",
		dataIndex : "exwSerial"
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable && this.contractId) {
		this.tbarItems = [ {
			iconCls : "btn-loading",
			text : "全部设备",
			handler : this.loadEquipmentResource.createDelegate(this)
		} ];
	}
	RentEquipBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : RentEquipBriefListViewField,
		title : "设备结算信息",
		option : "设备",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipBriefRentContract.do"
	}, this.grid_config || {}));
};
Ext.extend(RentEquipBriefGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipId == data.equipId) {
				return;
			}
		}
		var endRentDate = this.parentForm.findFormField("endRentDate").getValue();
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
			startRentDate : Date.parseDate(data.lastRentDate, "Y-m-d").add(Date.DAY, 1),
			endRentDate : endRentDate,
			rentDays : 0,
			quantity : 1,
			deductRent : 0
		});
		this.stopEditing();
		this.getStore().add(subModule);
		this.startEditing(0, 0);
	},
	loadEquipmentResource : function() {
		new EquipSelector({
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					d[i].set("lastRentDate", new Date().add(Date.DAY, -1).format("Y-m-d"));
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
			rentId : this.rentId,
			equipCategoryName : "品名",
			equipSpecificName : "规格",
			unit : "台",
			startRentDate : new Date(),
			endRentDate : endRentDate,
			rentDays : 0,
			quantity : 1,
			deductRent : 0
		};
	}
});