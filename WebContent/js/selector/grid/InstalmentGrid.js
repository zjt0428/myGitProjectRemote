var InstalmentGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "付款计划";
	this.showremark = this.showremark ? true : false;
	var columns = [ {
		header : "关联业务",
		dataIndex : "relateModuleName"
	}, {
		header : "业务名称",
		dataIndex : "relateSerial"
	}, {
		header : "期数",
		sortable : true,
		dataIndex : "periods",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 3
		})
	}, {
		header : "预付款额",
		dataIndex : "payment",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		header : "付款日期",
		dataIndex : "payDate",
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
			record.data.payDate = value;
			return value;
		}
	}, {
		header : "已付金额",
		dataIndex : "alreadyPayment"
	}, {
		header : "付款状态",
		dataIndex : "statusName"
	} ];
	if (this.showremark) {
		columns.push({
			header : "备注",
			dataIndex : "remark"
		});
	}
	InstalmentGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : InstalmentListViewField,
		title : this.title,
		option : "付款计划",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelInstalment.do"
	}, this.grid_config || {}));
};
Ext.extend(InstalmentGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalPayment : function() {
		var summaryAmount = 0;
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.payment);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		return {
			relateId : this.relateId,
			relateSerial : this.relateSerial,
			relateModule : this.relateModule,
			relateModuleName : this.relateModuleName,
			periods : this.getStore().getCount() + 1,
			payment : 0,
			payDate : new Date(),
			presentPayment : 0,
			status : 0,
			statusName : "待付款"
		};
	}
});