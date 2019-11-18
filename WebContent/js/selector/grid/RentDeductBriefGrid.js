/**
 * <pre><code>
 * saveable : Boolean,
 * height : Number,
 * measurementData : Array
 * </code></pre>
 */
var RentDeductBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
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
		width : 100,
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 9999
		})
	}, {
		width : 100,
		header : "费用单价",
		dataIndex : "unitprice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 9999999
		})
	}, {
		width : 80,
		header : "计量单位",
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
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var quantity = record.data.quantity;
			var unitprice = record.data.unitprice;
			var summary = unitprice * quantity;
			record.data.summary = summary;
			return summary;
		}
	}, {
		width : 100,
		header : "扣费说明",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	if (this.saveable) {
		this.tbarDeducts = [ {
			iconCls : "btn-loading",
			text : "设备",
			handler : this.loadEquipmentResource.createDelegate(this)
		} ];
	}
	RentDeductBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : RentDeductBriefListViewField,
		title : "转租扣费信息",
		option : "转租扣费",
		tbarItems : this.tbarDeducts,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelDeductBriefRentContract.do"
	}, this.grid_config || {}));
};
Ext.extend(RentDeductBriefGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		var measurement = "";
		try {
			measurement = this.measurementData[0][1];
		} catch (e) {
		}
		return {
			rentId : this.rentId,
			quantity : 0,
			unitprice : 0,
			measurement : measurement
		};
	},
	loadEquipmentResource : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要结算的信息！");
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