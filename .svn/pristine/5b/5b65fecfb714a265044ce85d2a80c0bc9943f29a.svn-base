var materialsInputCountTemps = [];
var RecycleManageDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	materialsInputCountTemps.length = 0;  //清除上一条新增数据
	
	this.baseDepotInitDetailGrid = new BaseDepotInitDetailGrid({
		saveable : this.saveable
	},null);
	if(!materialsInputCountTemps.length>0 && this.parentForm.recycleId!=null){
		$request({
			url : __ctxPath + "/materials/listInputCountRecycleManage.do",
			params : {
				"Q_recycleId_L_EQ" : this.parentForm.recycleId,
				limit : 300
			},
			success : function(g,h){
				var data = Ext.util.JSON.decode(g.responseText).result;
				materialsInputCountTemps = data;
			}.createDelegate(this)
		});
	}
	var tbarItems = [];
	if(!this.saveable) {
		tbarItems.push({
			iconCls : "btn-effective",
			text : "小计",
			handler : this.showSummary.createDelegate(this)
		});
	}
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
		header : "单位",
		dataIndex : "unit"
	}, {
		header : "入库数量",
		dataIndex : "inputCount",
		renderer : function (value){
			if(Ext.isEmpty(value)){
				return value = "<font face='宋体'color='gray'>双击输入数量</font>";
			}
			return value;
		},
		listeners : {
			"dblclick" : function(a,grid){
				if(!grid.saveable||grid.editable){
					var s = grid.getSelectionModel().getSelected();
//					if(grid.editable){
//						 s = grid.getSelectionModel().getSelected();
//					}else{
//						 s = grid.getSelectionModel().selection.record;
//					}
					$request({
						url : __ctxPath + "/materials/listInputCountRecycleManage.do",
						params : {
							"Q_recycleId_L_EQ" : grid.parentForm.recycleId,
							"Q_specificationsId_L_EQ" : s.data.specificationsId,
						},
						success : function(g,h){
							var data = Ext.util.JSON.decode(g.responseText).result;
							new MaterialsInputCountWindow({
								inputData : data,
								editable : grid.editable,
								detail : true,
								recycleId : grid.parentForm.recycleId,
								specificationsId : 	s.data.specificationsId,
								depotId : grid.parentForm.getDepotId(),
								callback : function(m,d){
									s.set('inputCount',d);
									s.commit();
									grid.tempFilter(m);
								}
							}).show();
						}.createDelegate(this)
					});
				}else{
					$request({
						url : __ctxPath + "/materials/findDepotBaseLocation.do",
						params : {
							"Q_baseDepot.depotId_L_EQ" : grid.parentForm.getDepotId()
						},
						success : function(g,h){
							var resp = Ext.util.JSON.decode(g.responseText);
							var data = resp.data;
							var record = grid.getSelectionModel().getSelected();
							new MaterialsInputCountWindow({
									specificationsId : record.data.specificationsId,
									data : data,
									materialsInputCountTemps : materialsInputCountTemps,
									record : record,
									callback : function(m,d){
										record.set('inputCount',d['inputCount']);
										record.commit();
										grid.tempFilter(m);
									}.createDelegate(this)
								}).show();
						}.createDelegate(this)
					});
				}
				
			}
		}
	}, {
		header : "卸车数量",
		dataIndex : "truckLoadingCount",
		editor : new Ext.form.NumberField({
			allowBlank : true
		}),
		renderer : function(value,medata,record) {
			if(Ext.isEmpty(value)){
				return record.data.truckLoadingCount = record.data.inputCount;
			}
			return value;
		}
	}, {
		header : "包装数量",
		dataIndex : "packageCount",
		editor : new Ext.form.NumberField({
			allowBlank : true
		}),
		renderer : function(value,medata,record) {
			if(Ext.isEmpty(value)){
				return record.data.packageCount = record.data.inputCount;
			}
			if(Number(value) > Number(record.data.inputCount)) {
				Ext.MessageBox.alert('友情提示','包装数量不能大于入库数量！');
				return record.data.packageCount = record.data.inputCount;
			}
			return value;
		}	
	}, {
		header : "辅助单位",
		dataIndex : "supplementUnit"
	}, {
		header : "辅助数量",
		dataIndex : "supplementQuantity",
		renderer : function(value,medata,record) {
			if(record.data.remark=='小计') {
				return value;
			}
			if(!Ext.isEmpty(record.data.inputCount)){
				return record.data.supplementQuantity = (Number(record.data.inputCount)*Number(record.data.conversionNum)).toFixed(2);
			}
		}
	}, {
		hidden : true,
		header : "换算数量",
		dataIndex : "conversionNum"
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})	
	}];

	
	RecycleManageDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : RecycleManageDetailListViewField,
		title : "回收清单",
		option : "回收清单",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailRecycleManage.do"
	}, this.grid_config || {}));
};
Ext.extend(RecycleManageDetailGrid, Knight.ux.SubModuleBaseGrid, {
	getEncode : function(){
		var str = Ext.util.JSON.encode(materialsInputCountTemps);
		return str;
	},
	getDetailData : function(){
		var detailData = [];
		for(var i=0;i<this.getStore().getCount();i++){
			detailData[i] = this.getStore().getAt(i).data;
		}
		return detailData;
	},
	tempFilter : function(m){   //过滤
		if(materialsInputCountTemps.length==0){
			for(var i=0;i<m.length;i++){
				materialsInputCountTemps.push(m[i]);
			}
		}else{
			for(var k=0;k<materialsInputCountTemps.length;k++){		
				if(materialsInputCountTemps[k].specificationsId==m[0].specificationsId){
					for(var i=0;i<m.length;i++){
						materialsInputCountTemps.splice(k+i,1,m[i]);
					}
					return;
				}
			}
			for(var i=0;i<m.length;i++){
				materialsInputCountTemps.push(m[i]);
			}
		}
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			mnemonics : data.mnemonics,
			specificationsId : data.specificationsId,
			specifications : data.specifications,
			unit : data.firstUnitConversion,
			supplementUnit:data.secondUnitConversion,
			supplementQuantity:0,
			conversionNum : data.secondConvertedQuantity,
			remark:""
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
			collectEnable : true,
			params : {
				
			},
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this),
			//重写selector 的 confirm 方法
			contractId : this.contractId,
			confirm : function() {
				var data = null;
				if (!this.targetEnable) {
					data = this.sourcePanel.getSelectionModel().getSelections();
				} else {
					if (this.config.target.collect) {
						data = this.targetPanel.getStore().data.items;
					} else {
						data = this.targetPanel.getSelectionModel().getSelections();
					}
					if (this.targetRemoteEnable) {
						for (var i = 0; i < data.length; i++) {
							data[i].data[this.config.target.parent] = {};
							Ext.apply(data[i].data[this.config.target.parent], this.clickrowdb.data);
						}
					}
				}
				if (data.length == 0) {
					Ext.Msg.alert("信息提示", this.config.emptySelectedText);
					return;
				}
				//对比选中周材 是否在该合同中有约定
				var contractMaterials = $ajaxSyncCall(__ctxPath + "/dispatch/loadContractMaterials.do",
						{contractmaId : this.contractId}).data[0];
				var set = contractMaterials.priceSettingSet;
				for(var i=0;i<data.length;i++){
					var b= false;
					var selected = data[i].data;
					for(var j=0;j<set.length;j++) {
						if(set[j].specificationsId== selected.specificationsId) {
							b = true;
						}
					}
					if(!b) {
						Ext.Msg.alert("提示","【"+selected.materialsCommodity.commodity
								+selected.specifications
								+"】在【周材合同】没有约定，请在【周材合同】添加后再进行操作");
						return;
					}
				}
				if (this.callback) {
					this.callback.call(this, data);
				}
				this.close();
			}
		}).show();
	},
	showSummary : function() {
		//remove前一次点击 insert 的 record  (隐藏效果)
		var records = Array();
		for(var i=0;i<this.getStore().getCount();i++) {
			if(this.getStore().getAt(i).data.detailId==null) {
				records.push(this.getStore().getAt(i));
			}
		}
		if(records.length>0) {
			this.getStore().remove(records);
			return;
		}
		
		var arr = Array();
		var store = this.getStore();
		var indexs = Array();  //记录小计插入位置index
		//汇总小计
		for(var i=0;i<store.getCount();i++) {
			if(arr.length==0) {
				arr.push({
					commodityId : store.getAt(i).data.commodityId,
					commodity : store.getAt(i).data.commodity,
					unit : store.getAt(i).data.unit,
					supplementUnit : store.getAt(i).data.supplementUnit,
					conversionNum : store.getAt(i).data.conversionNum,
					inputCount : store.getAt(i).data.inputCount,
					truckLoadingCount : store.getAt(i).data.truckLoadingCount,
					packageCount : store.getAt(i).data.packageCount,
					supplementQuantity : store.getAt(i).data.supplementQuantity
				});
			}else{
				var alreadyAdd = false;
				for(var j=0;j<arr.length;j++) {
					if(arr[j].commodityId==store.getAt(i).data.commodityId) {
						arr[j].inputCount = Number(arr[j].inputCount)+Number(store.getAt(i).data.inputCount);
						arr[j].truckLoadingCount = Number(arr[j].truckLoadingCount)+Number(store.getAt(i).data.truckLoadingCount);
						arr[j].packageCount = Number(arr[j].packageCount)+Number(store.getAt(i).data.packageCount);
						arr[j].supplementQuantity = Number(arr[j].supplementQuantity)+Number(store.getAt(i).data.supplementQuantity);
						alreadyAdd = true;
					}
				}
				if(!alreadyAdd) {
					indexs.push(i);
					arr.push({
						commodityId : store.getAt(i).data.commodityId,
						commodity : store.getAt(i).data.commodity,
						unit : store.getAt(i).data.unit,
						supplementUnit : store.getAt(i).data.supplementUnit,
						conversionNum : store.getAt(i).data.conversionNum,
						inputCount : store.getAt(i).data.inputCount,
						truckLoadingCount : store.getAt(i).data.truckLoadingCount,
						packageCount : store.getAt(i).data.packageCount,
						supplementQuantity : store.getAt(i).data.supplementQuantity
					});
				}
			}
		}
		//将小计插入Grid
		if(arr.length>0) {
			indexs.push(store.getCount());
			var rowIndex=indexs;
			for(var i=0;i<arr.length;i++){
				arr[i].remark="小计";
				arr[i].supplementQuantity=Number(arr[i].supplementQuantity).toFixed(2);
				var record = new Ext.data.Record(arr[i]);
				store.insert(rowIndex[i]+i,record);
				this.getView().addRowClass(rowIndex[i]+i, "x-grid-back-purple");
			}
		} 
	}
});