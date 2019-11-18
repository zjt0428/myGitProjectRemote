var DemandDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "助记码",
		dataIndex : "mnemonicCode",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 32
		})
	},{
		header : "品名",
		dataIndex : "commodity",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	},{
		header : "规格",
		dataIndex : "specifications",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "品牌",
		dataIndex : "brand",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 32
		})
	}, {
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 32
		})
	},{
		header : "需求数量",
		dataIndex : "demandNum",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999
		})
	},{
		header : "辅助单位",
		dataIndex : "auxiliaryUnit",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 32
		})
	},{
		header : "辅助数量",
		dataIndex : "auxiliaryNum",
		allowBlank:false,
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999
		})
	},{
		header : "预计进场时间",
		dataIndex : "startDate",
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
			record.data.startDate = value;
			return value;
		}
	} ];
	DemandDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "需求明细",
		option : "业务设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : DemandDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelDemandDetail.do"
	}, this.grid_config || {}));
};
Ext.extend(DemandDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0
		};
	},	
	addSubModuleDate : function(data) {
//		for ( var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.commodityId == data.commodityId) {
//				return;
//			}
//		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			demandId : this.demandId,
			commodityId : data.commodityId,
			mnemonicCode : data.mnemonics,
			commodity : data.materialsCommodity.commodity,
			specifications : data.specifications,
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
			collectEnable : true,
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
		/*		var data = d[0].data;
				this.addSubModuleDate(data);*/
			}.createDelegate(this)
		}).show();
	}
});