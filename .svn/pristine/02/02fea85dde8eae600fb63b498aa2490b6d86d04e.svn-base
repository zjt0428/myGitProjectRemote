var PurchaseBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "状态",
		dataIndex : "statusName"
	}, {
		header : "品牌",
		dataIndex : "brand",
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "零配件类别",
		dataIndex : "partsCategory",
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "采购项目名称",
		dataIndex : "briefName",
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "规格型号",
		dataIndex : "specific",
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "配件型号",
		dataIndex : "dimensions",
		editor : new Ext.form.TextField({
			maxLength : 64
		})
	}, {
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			maxLength : 16
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			maxLength : 16
		})
	}, {
		header : "费用单价(元)",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			decimalPrecision: 5
		})
	}, {
		width : 80,
		header : "单项小计",
		dataIndex : "summary",
		editor : new Ext.form.NumberField({
			maxLength : 10
		}),
		renderer : function(value, metadata, record) {
			if (value != record.data.summary1) {
				record.data.summary1 = value;
				return value;
			}
			var unitPrice = record.data.unitPrice;
			var quantity = record.data.quantity;
			var summary = unitPrice * quantity;
			record.data.summary = summary;
			record.data.summary1 = summary;
			return summary;
		}
	}, {
		header : "到货时间",
		dataIndex : "arrivalDate"
	}, {
		header : "验收时间",
		dataIndex : "acceptanceDate"
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable) {
		this.tbarItems = [ {
			iconCls : "btn-head-add",
			text : "新增",
			handler : this.importComponResource.createDelegate(this)
		} ];
	}
	PurchaseBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		fields : PurchaseBriefListViewField,
		title : "采购项目信息",
		option : "采购项目",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelBriefPurchase.do"
	}, this.grid_config || {}));
};
Ext.extend(PurchaseBriefGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			purchaseId : this.purchaseId,
			componId : data.componId,
			briefName : data.componGenericName,
			partsCategory : data.componCategoryName,
			specific : data.componSpecificName,
			dimensions : data.dimensions,
			quantity : data.counts,
			unit : data.calculate,
			unitPrice : data.unitprice,
			summary : data.unitprice,
			summary1 : data.unitprice,
			userId : curUserInfo.userId,
			userName : curUserInfo.fullname,
			status : "0",
			statusName : "未验收"
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	importComponResource : function() {
		new ComponentSelector({
			collectEnable : true,
			purchaseHidden : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					this.loadResource(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	},
	createSubModule : function() {
		return {
			purchaseId : this.purchaseId,
			briefName : "采购项目",
			specific : "采购规格",
			quantity : 1,
			unit : "元",
			unitPrice : 1000,
			summary : 1000,
			summary1 : 1000,
			userId : curUserInfo.userId,
			userName : curUserInfo.fullname,
			status : "0",
			statusName : "未验收"
		};
	}
});