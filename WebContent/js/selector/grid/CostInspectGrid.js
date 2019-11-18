var CostInspectGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "巡检班组",
		dataIndex : "depName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/listDepartment.do?opt=appUser"
		})
	}, {
		header : "工时内容",
		dataIndex : "workContent",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}, {
		header : "巡检工时",
		dataIndex : "hoursInspect",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record){
			if(Ext.isEmpty(value)){
				return value = 0;
			}
			return value;
		}
	}, {
		header : "单价",
		dataIndex : "price",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record){
			if(Ext.isEmpty(value)){
				value = 0;
			}
			record.data.price = value;
			return value;
		}
	}, {
		header : "金额",
		dataIndex : "amount",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			value = record.get("hoursInspect")*record.get("price");
			if(Ext.isEmpty(value)){
				value = 0;
			}
			record.data.amount = value;
			return value;
		}
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	} ];
	CostInspectGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : CostInspectListViewField,
		title : "巡检费用",
		option : "巡检费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/equip/multiDelCostEquipInspect.do",
	}, this.grid_config || {}));
};
Ext.extend(CostInspectGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		
	},
//	addSubModuleDate : function(data) {
//		var RecordType = this.getStore().recordType;
//		var recordType = new RecordType();
//		Ext.apply(recordType.data, {
//			position : data.ITEM_NAME,
//			substance : data.DEMAND_DES,
//		});
//		this.stopEditing();
//		this.getStore().add(recordType);
//		this.startEditing(0, 0);
//	},
//	importVerifyResource : function() {
//		var verifyType = this.parentForm.getFieldValue("equipInspectSchema.equipDiary.verifyType");
//		new VerifyItemSelector({
//			params : {
//				"Q_I.LEVEL_N_EQ" : 1,
//				"Q_[I.VITEM_TYPE]_S_EQ" : verifyType + "EI"
//			},
//			callback : function(d) {
//				for (var i = 0; i < d.length; i++) {
//					var data = d[i].data;
//					this.addSubModuleDate(data);
//				}
//			}.createDelegate(this)
//		}).show();
//	}
});