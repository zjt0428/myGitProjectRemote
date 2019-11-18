var TeamsAccountPractiGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "姓名",
		dataIndex : "practiName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "工作内容",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}, {
		header : "底薪",
		dataIndex : "baseSalary",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "分摊费用",
		dataIndex : "presentAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "应扣金额",
		dataIndex : "deductAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var baseSalary = Number(record.data.baseSalary);
			var presentAmount = Number(record.data.presentAmount);
			var deductAmount = Number(record.data.deductAmount);
			record.data.summary = baseSalary + presentAmount - deductAmount;
			return Ext.util.Format.number(record.data.summary, "0.00");
		}
	}, {
		header : "项目名称",
		dataIndex : "projectName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-head-import",
			text : "导入",
			handler : this.importPractiResource.createDelegate(this)
		});
	}
	TeamsAccountPractiGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : TeamsAccountPractiListViewField,
		title : "班组成员工资",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelPractiTeamsAccount.do"
	}, this.grid_config || {}));
};
Ext.extend(TeamsAccountPractiGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			baseSalary : 0,
			presentAmount : 0,
			deductAmount : 0
		};
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var practiId = this.getStore().getAt(i).data.practiId;
			if (practiId && practiId == data.practiId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			practiId : data.practiId,
			practiName : data.practiName,
			baseSalary : data.baseSalary,
			presentAmount : 0,
			deductAmount : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	importPractiResource : function() {
		new PractitionerSelector({
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					this.addSubModuleDate(d[i].data);
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
	}
});