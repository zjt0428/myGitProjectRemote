var SalaryPractiGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 100,
		header : "人员",
		dataIndex : "practiName"
	}, {
		width : 100,
		header : "出勤",
		dataIndex : "attendance",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "基本工资",
		dataIndex : "baseSalary",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			readOnly : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "岗位补贴",
		dataIndex : "station",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "加班工资",
		dataIndex : "overtimeWork",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "带班费",
		dataIndex : "daibanFee",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "应酬费",
		dataIndex : "dinnerPartyFee",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "开车补贴",
		dataIndex : "driveSubsidies",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "房贴",
		dataIndex : "houseSubsidies",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "电话费",
		dataIndex : "telephoneFee",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "全勤奖",
		dataIndex : "perAttendance",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "餐费补贴",
		dataIndex : "mealFee",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "保险费",
		dataIndex : "insurancePremium",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "借款",
		dataIndex : "borrowFee",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "罚款",
		dataIndex : "fine",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "公积金",
		dataIndex : "housingFund",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "个税",
		dataIndex : "tax",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "其他应扣",
		dataIndex : "otherDeduct",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "其他项目",
		dataIndex : "otherItems",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "奖金",
		dataIndex : "reward",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			readOnly : true,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "应发工资",
		dataIndex : "totalAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			readOnly : true,
			maxLength : 7
		}),
		renderer : function(value, metadata, record) {
			if (!this.saveable) {
				return value;
			}
			var totalAmount = Ext.util.Format.number(Number(record.data.baseSalary) + Number(record.data.station) 
					+ Number(record.data.overtimeWork) + Number(record.data.mealFee)  
					+ Number(record.data.reward) + Number(record.data.daibanFee) + Number(record.data.dinnerPartyFee) + Number(record.data.driveSubsidies)
					+ Number(record.data.houseSubsidies) + Number(record.data.telephoneFee) + Number(record.data.perAttendance), "0.00");
			record.data.totalAmount = totalAmount;
			return totalAmount;
		}.createDelegate(this)
	}, {
		width : 100,
		header : "应扣金额",
		dataIndex : "deductAmount", 		
		editor : new Ext.form.NumberField({ 		
			allowBlank : false,
			readOnly : true,
			maxLength : 7
		}),
		renderer : function(value, metadata, record) {
			if (!this.saveable) {
				return value;
			}
			var deductAmount = Ext.util.Format.number(record.data.insurancePremium + record.data.housingFund + 
					record.data.tax + record.data.otherDeduct + record.data.borrowFee+ record.data.fine + Number(record.data.otherItems) , "0.00");
			record.data.deductAmount = deductAmount;
			return deductAmount;
		}.createDelegate(this)
	}, {
		width : 100,
		header : "实发工资",
		dataIndex : "finalAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			readOnly : true,
			maxLength : 7
		}),
		renderer : function(value, metadata, record) {
			if (!this.saveable) {
				return value;
			}
			var finalAmount = Ext.util.Format.number(record.data.totalAmount - record.data.deductAmount, "0.00");
			record.data.finalAmount = finalAmount;
			return finalAmount;
		}.createDelegate(this)
	}, {
		width : 100,
		header : "本月支付",
		dataIndex : "monthPay",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "未支付",
		dataIndex : "nonPayment",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "累计余款",
		dataIndex : "accBalance",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		width : 100,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	} ];
	var fields = [ "salaryPractiId", "salaryId", "monthId", "salaryMonth", "practiId", "practiName", "baseSalary", "station", "overtimeWork", "mealFee", "insurancePremium", "housingFund", "tax", "otherDeduct", "otherItems",
			"reward", "totalAmount", "deductAmount", "finalAmount", "remark","attendance","daibanFee" ,"dinnerPartyFee" ,"driveSubsidies" ,"houseSubsidies" ,"telephoneFee" ,"perAttendance" ,"fine" ,"borrowFee" ,"monthPay" ,"nonPayment","accBalance"  ];
	SalaryPractiGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "薪资人员",
		option : "薪资人员",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : fields,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelPractiSalary.do"
	}, this.grid_config || {}));
};
Ext.extend(SalaryPractiGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.finalAmount);
		}
		return summaryAmount;
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.practiId == data.practiId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			salaryId : this.salaryId,
			monthId : this.monthId,
			salaryMonth : this.salaryMonth,
			practiId : data.practiId,
			practiName : data.practiName,
			practiTel : data.mobile,
			baseSalary : IsNum(data.baseSalary) ? 0:data.baseSalary,
			station : 0,
			overtimeWork : 0,
			mealFee : 0,
			endowment : 0,
			socialInsurance : 0,
			housingFund : 0,
			tax : 0,
			otherDeduct : 0,
			otherItems : 0,
			reward : 0,
			totalAmount : 0,
			deductAmount : 0,
			finalAmount : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new PractitionerSelector({
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});