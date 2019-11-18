var LeasedLostCompensationDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	}, {
		header : "助记码",
		dataIndex : "mnemonics"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "unit"
	}, {
		header : "欠收数量",
		dataIndex : "oweQuantity"
	}, {
		header : "丢失数量",
		dataIndex : "lostQuantity",
		editor : new Ext.form.NumberField ({
			maxValue : 999999
		}),
		renderer : function(value,p,record){
			if(Ext.isEmpty(value)){
				return record.data.lostQuantity = 0;
			}
			if(Number(record.data.lostQuantity)>Number(record.data.oweQuantity)&&record.data.lostQuantity!=0) {
				Ext.MessageBox.alert('友情提示','【丢失数量】不能大于【欠收数量】');
				value = record.data.oweQuantity;
			}
			record.data.lostQuantity = value;
			return value;
		}
	}, {
		header : "辅助单位",
		dataIndex : "supplementUnit"
	},{
		hidden : true,
		header : "换算系数",
		dataIndex : "conversionNum"
	}, {
		header : "辅助丢失数量",
		dataIndex : "supplementQuantity",
		renderer : function(value,metadata,record) {
			if(Ext.isEmpty(value)){
				return record.data.supplementQuantity = 0;
			}
			value = (Number(record.data.lostQuantity)*Number(record.data.conversionNum)).toFixed(2);
			record.data.supplementQuantity = value;
			return value;
		}
			
	}, {
		header : "赔偿单价",
		dataIndex : "compensationCosts",
		editor : new Ext.form.NumberField({
			allowBlank : false
		})
	}, {
		header : "赔偿金额",
		dataIndex : "totalCosts",
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				return record.data.totalCosts = 0;
			}
			record.data.totalCosts =  (Number(record.data.supplementQuantity)*Number(record.data.compensationCosts)).toFixed(2);
			this.calculate();
			return record.data.totalCosts;
		}.createDelegate(this)
	}];
	
	var tbarItems = [];
	if(this.saveable) {
		tbarItems.push({
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadProjectMaterials.createDelegate(this)
		},{
			iconCls : "btn-head-add",
			text : "全部赔偿",
			handler : this.allLost.createDelegate(this)
		});
	}
	LeasedLostCompensationDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden :true,
		fields : LeasedLostCompensationDetailListViewField,
		title : "丢失周材明细",
		option : "丢失周材明细",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailLeasedLostCompensation.do"
	}, this.viewConfig || {}));
};
Ext.extend(LeasedLostCompensationDetailGrid, Knight.ux.SubModuleBaseGrid, {
	allLost : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			this.getStore().getAt(i).set("lostQuantity", this.getStore().getAt(i).data.oweQuantity);
		}
	},
	calculate : function() {
		var sum = 0
		for(var i=0;i<this.getStore().getCount();i++){
			sum += Number(this.getStore().getAt(i).data.totalCosts);
		}
		Ext.getCmp("leasedLostCompensation_totalCompensation").setValue(sum.toFixed(2));
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			specificationsId : data.specificationsId,
			commodity : data.commodity,
			mnemonics : data.mnemonics,
			specifications :data.specifications,
			unit : data.firstUnitConversion,
			oweQuantity : data.quantity,
			supplementUnit : data.secondUnitConversion,
			conversionNum : data.secondConvertedQuantity,
			compensationCosts : data.compensationCosts,
			lostQuantity : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	loadProjectMaterials : function() {
//		$request({
//			url :  __ctxPath + "/materials/listLeaseStock.do",
//			params : {
//				"Q_leaseId_L_EQ" : this.leaseId,
//				"ORDER_[materialsSpecifications.specificationsId]_BY" : "desc"
//			},
//			success : function(g,h) {
//				var data = Ext.util.JSON.decode(g.responseText).result;
//				for(var i=0;i<data.length;i++) {
//					this.addSubModuleDate(data[i]);
//				}
//			}.createDelegate(this)
//		});
		
		//改为根据丢失赔偿时间获取周材项目库存
		$request({
			url :  __ctxPath + "/materials/getLeaseStoreByCompensationDateLeaseStock.do",
			params : {
				"contractId" : this.contractId,
				"leaseId" : this.leaseId,
				"compensationDate" : Ext.getCmp("leaseCompensationDate").getValue()
			},
			success : function(g,h) {
				var data = Ext.util.JSON.decode(g.responseText).result;
				this.getStore().removeAll();
				for(var i=0;i<data.length;i++) {
					this.addSubModuleDate(data[i]);
				}
			}.createDelegate(this)
		});
	}
});