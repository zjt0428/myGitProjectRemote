/*var ProjectExpenseGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		width : 100,
		header : "发生时间",
		dataIndex : "spendDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : true,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.spendDate = value;
			return value;
		}
	}, {
		width : 100,
		header : "内容描述",
		dataIndex : "discription",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		width : 100,
		header : "完成状态",
		dataIndex : "status",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		width : 100,
		header : "发生费用",
		dataIndex : "expenseAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 8
		})
	}, {
		width : 100,
		header : "费用说明",
		dataIndex : "expenseDesc",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 64
		})
	}, {
		width : 130,
		header : "备 注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 128
		})
	} ];
	ProjectExpenseGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ProjectExpenseListViewField,
		title : "商务记录",
		option : "商务记录",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelExpensesProject.do"
	}, this.grid_config || {}));
};
Ext.extend(ProjectExpenseGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			projectId : this.projectId,
			spendDate : new Date(),
			discription : null,
			status : null,
			expenseAmount : 0,
			expenseDesc : null,
			remark : null
		};
	}
});*/