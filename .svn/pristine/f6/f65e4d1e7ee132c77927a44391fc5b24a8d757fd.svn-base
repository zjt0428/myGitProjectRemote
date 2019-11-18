var ReimburseTicketGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		width : 100,
		header : "费用类别",
		dataIndex : "reimburseTypeName",
		editor : new Knight.ux.TreeCombo({
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=reimburseType"
		}),
		renderer : function(value, metadata, record) {
			if (value == undefined) {
				return;
			}
			if (record.data.reimburse == undefined) {
				record.data.reimburse = value;
				if (record.data.reimburseType == undefined) {
					record.data.reimburseType = this.getEditor().id;
				}
				return value;
			}
			if (record.data.reimburse != value) {
				record.data.reimburseType = this.getEditor().id;
				record.data.reimburse = value;
			}
			return value;
		}
	}, {
		header : "发生日期",
		dataIndex : "ticketDate",
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
			record.data.ticketDate = value;
			return value;
		}
	}, {
		header : "票据张数",
		dataIndex : "ticketQuantity",
		editor : new Ext.form.NumberField({
			maxValue : 999
		})
	}, {
		header : "规格名称",
		dataIndex : "specificName",
		editor : new Ext.form.TextField({
			maxLength : 16
		})
	}, {
		header : "型号",
		dataIndex : "modelName",
		editor : new Ext.form.TextField({
			maxLength : 16
		})
	}, {
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 9999999
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			maxValue : 999
		})
	}, {
		header : "小计金额",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var unitPrice = Number(record.data.unitPrice);
			var quantity = Number(record.data.quantity);
//			var summary = unitPrice * quantity;
			var summary = Ext.util.Format.number(unitPrice * quantity, '0.00');
			record.data.summary = summary;
			return summary;
		}
	}, {
		width : 200,
		header : "费用说明",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		hidden : true,
		width : 200,
		header : "车辆ID",
		dataIndex : "carId"
	}, {
		header : "车牌号",
		dataIndex : "licensePlate"
	} ];
	ReimburseTicketGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "报销票据",
		option : "报销票据",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ReimburseTicketListViewField,
		columns : columns,
		tbarItems : [ {
			iconCls : "btn-head-add",
			text : "车辆",
			handler : this.importCarArchives.createDelegate(this)
		} ],
		delurl : __ctxPath + "/fund/multiDelTicketReimburse.do"
	}, this.grid_config || {}));
};
Ext.extend(ReimburseTicketGrid, Knight.ux.SubModuleBaseGrid, {
	importCarArchives : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【车辆】的票据信息！");
			return;
		}
		new CarSelector({
			callback : function(d) {
				var data = d[0].data;
				for (var i = 0; i < a.length; i++) {
					a[i].set("carId", data.carId);
					a[i].set("licensePlate", data.licensePlate);
				}
			}.createDelegate(this)
		}).show();
	},
	createSubModule : function() {
		return {
			reimburseId : this.reimburseId,
			ticketDate : new Date(),
			ticketQuantity : 0,
			unitPrice : 0,
			quantity : 0,
			summary : 0
		};
	}
});