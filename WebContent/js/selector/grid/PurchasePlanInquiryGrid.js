var PurchasePlanInquiryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "材料名称",
		dataIndex : "materialName",
		editable : !this.selectable,
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "配件规格",
		dataIndex : "specific",
		editable : !this.selectable,
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "单位",
		dataIndex : "unit",
		editable : !this.selectable,
		editor : new Ext.form.TextField({
			maxLength : 16
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editable : !this.selectable,
		editor : new Ext.form.NumberField({
			maxLength : 7
		})
	}, {
		hidden : !this.selectable,
		header : "审批数量",
		dataIndex : "approvalQuantity",
		editor : new Ext.form.NumberField({
			maxLength : 7
		}),
		value : this.quantity
	}, {
		hidden : !this.selectable,
		header : "限购日期",
		dataIndex : "purchaseDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.purchaseDate = value;
			return value;
		}
	},{
		hidden : !this.selectable,
		header : "询价价格",
		dataIndex : "inquiryPrice",
		editor : new Ext.form.NumberField({
			maxLength : 7
		})
	},{
		hidden : !this.selectable,
		width : 80,
		header : "小计",
		dataIndex : "summary",
		editor : new Ext.form.NumberField({
			maxLength : 10
		}),
		renderer : function(value, metadata, record) {
			var inquiryPrice = record.data.inquiryPrice;
			var quantity = record.data.quantity;
			value = inquiryPrice * quantity;
			record.data.summary= value;
			return value;
		}
	}];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable) {
		this.tbarItems = [ {
			iconCls : "btn-head-add",
			text : "新增",
			handler : this.importComponResource.createDelegate(this)
		} ];
	}
	PurchasePlanInquiryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		fields : PurchasePlanInquiryListViewField,
		title : "采购计划",
		option : "采购计划",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelInquiryPurchasePlan.do"
	}, this.grid_config || {}));
};
Ext.extend(PurchasePlanInquiryGrid, Knight.ux.SubModuleBaseGrid, {
	importComponResource : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var purchasePlan = this.getStore().getAt(i).data.purchasePlan;
			if (purchasePlan && purchasePlan.purchasePlanId == data.purchasePlanId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
});