/**
 * <pre><code>
 * saveable : Boolean,
 * height : Number,
 * measurementData : Array
 * </code></pre>
 */
var SettleItemBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 100,
		header : "费用项目",
		dataIndex : "settleItemName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.contractCostitemData
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.settleItemName = value;
			return value;
		}
	}, {
		width : 100,
		header : "费用单价",
		dataIndex : "unitprice",
		editor : new Ext.form.NumberField({
			decimalPrecision : 3,
			allowBlank : false,
			maxValue : 99999999
		})
	}, {
		width : 100,
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		width : 80,
		header : "计量单位",
		dataIndex : "measurement",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.measurementData
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
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
		header : "应扣租金",
		dataIndex : "deductRent",
		editor : new Ext.form.NumberField({
		})
	}, {
		width : 80,
		header : "费用累计",
		dataIndex : "itemCumulate",
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			var unitprice = record.data.unitprice;
			var quantity = record.data.quantity;
			var itemCumulate = unitprice * quantity;
			record.data.itemCumulate = Number(itemCumulate);
			return itemCumulate;
			return value;
		}
	}, {
		tooltip : "租金累计=费用累计-应扣租金",
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			var itemCumulate = record.data.itemCumulate;
			var deduct = record.data.deductRent;
			var summary = itemCumulate - deduct;
			record.data.summary = summary;
			this.parentForm.settleAmountLoad();
			return summary;
		}.createDelegate(this)
	}, {
		width : 80,
		header : "税率",
		dataIndex : "taxRate",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=taxRate"
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.taxRate = value;
			return value;
		}
	}, {
		width : 80,
		header : "含税金额",
		dataIndex : "preTaxAmount",
		renderer : function(value, metadata, record) {
			if(this.saveable && Ext.isNumber(record.data.summary)) {
				record.data.preTaxAmount = record.data.summary;
				return record.data.preTaxAmount;
			}
			return value;
		}.createDelegate(this)
	}, {
		width : 80,
		header : "不含税金额",
		dataIndex : "afterTaxAmount",
		renderer : function(value, metadata, record) {
			if(this.saveable && Ext.isNumber(record.data.summary) && record.data.taxRate.indexOf("%")) {
				var tempTaxRate = Number(record.data.taxRate.replace("%",""))/100;
				var num = (record.data.summary/(1+tempTaxRate)).toFixed(2);
				record.data.afterTaxAmount = Number(num);
				return record.data.afterTaxAmount;
			}
			return value;
		}.createDelegate(this)
	}, {
		header : "税金",
		dataIndex : "taxes",
		renderer : function(value, metadata, record) {
			if(this.saveable && Ext.isNumber(record.data.preTaxAmount) && Ext.isNumber(record.data.afterTaxAmount)) {
				record.data.taxes = (record.data.preTaxAmount - record.data.afterTaxAmount).toFixed(2);
				return record.data.taxes;
			}
			return value;
		}.createDelegate(this)
	}, {
		width : 100,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "备案编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.recordId : null;
		}
	}, {
		header : "设备自编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.equipSerial : null;
		}
	}, {
		header : "设备类别",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.equipCategoryName : null;
		}
	}, {
		header : "设备型号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.equipSpecificName : null;
		}
	}, {
		header : "出厂编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.exwSerial : null;
		}
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable && this.contractId) {
		this.tbarItems = [ {
			hidden : true,
			iconCls : "btn-loading",
			text : "加载合同费用",
			handler : this.loadContractLeaseResource.createDelegate(this)
		}, {
			iconCls : "btn-loading",
			text : "导入启用设备",
			handler : this.loadContractEquipResource.createDelegate(this)
		}, {
			iconCls : "btn-loading",
			text : "导入设备",
			handler : this.loadEquipmentResource.createDelegate(this)
		}, {
			hidden : true,
			iconCls : "btn-pred",
			text : "核算",
			handler : this.calculate.createDelegate(this)
		}]
	}
	this.tbarItems.push({
		iconCls : "btn-effective",
		text : "小计",
		handler : this.showSummary.createDelegate(this)
	});
	this.tbarItems.push({
		xtype : "label",
		style : "margin:1px 0px 0px 5px;",
		html : "<font color=red>&nbsp;&nbsp;*请注意关联相应设备</font>"
	});
	if(this.saveable && isGranted("_ImportNotAssociatedEquipment")) {
		this.tbarItems.push("->", {
			tooltip: '<font color=red>仅用于导入合同未发货安装已停机转场需要结算的设备</font>',
			iconCls : "menu-archive-issue-manage",
			text : "导入未关联合同设备",
			handler : this.importNotAssociatedEquipment.createDelegate(this)
		})
	}
	SettleItemBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : SettleItemBriefListViewField,
		title : "进出场等费用清单",
		option : "其他费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelItemBriefSettleContract.do"
	}, this.grid_config || {}));
};
Ext.extend(SettleItemBriefGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		var measurement = this.getTopArrayCodeName(this.measurementData);
		var settleItemName = this.getTopArrayCodeName(this.contractCostitemData);
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		return {
			settleId : this.settleId,
			settleItemName : settleItemName,
			quantity : 1,
			unitprice : 0,
			measurement : measurement,
			deductRent : 0,
			taxRate : parentTaxRate
		};
	},
	loadEquipmentResource : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要结算的信息！");
			return;
		}
		if(a.length >1 ) {
			$toast("请不要选择多条同时进行关联！");
			return;
		}
		new EquipDiarySelector({
			params : {
				"Q_contractId_L_EQ" : this.parentForm.contractIds? null : this.contractId,
				"QVO_contractId_L_EQ" : this.parentForm.contractIds? this.parentForm.contractIds : null
			},
			single : true,
			callback : function(d) {
				for (var i = 0; i < a.length; i++) {
					a[i].set("equipId", d[0].get("equipId"));
					a[i].set("recordId", d[0].get("recordId"));
					a[i].set("equipSerial",  d[0].get("equipSerial"));
					a[i].set("exwSerial", d[0].get("exwSerial"));
					a[i].set("equipCategoryName", d[0].get("equipCategoryName"));
					a[i].set("equipSpecificName", d[0].get("equipSpecificName"));
					a[i].set("contractId", d[0].get("contractId"));
					a[i].set("buildingNum", d[0].get("buildingNum"));
					a[i].set("equipment", d[0].data);
				}
			}.createDelegate(this)
		}).show();
	},
	loadResource : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			 //由于（同一个设备在一个合同内转场，拆卸了重新起租，只导入得一台设备，应可导入本合同内的所有起租单的设备），所以不再做同一设备的过滤
			 if (this.getStore().getAt(i).data.equipDiaryId == data.equipDiaryId) {
				 	return;
			 }
		}
		var measurement = this.getTopArrayCodeName(this.measurementData);
		var settleItemName = this.getTopArrayCodeName(this.contractCostitemData);
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		if(parentTaxRate=="" || parentTaxRate==undefined){
			$toast("请先选择税率!");
			return;
		}
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
		Ext.apply(subModule.data, {
			settleItemName : settleItemName,
			equipDiaryId : data.equipDiaryId,
			quantity : 1,
			unitprice : 0,
			measurement : measurement,
			deductRent : 0,
			taxRate : parentTaxRate,
			equipment : data,
			equipId : data.equipId,
			recordId : data.recordId,
			equipSerial : data.equipSerial,
			exwSerial : data.exwSerial,
			equipCategoryName : data.equipCategoryName,
			equipSpecificName : data.equipSpecificName,
			contractId : data.contractId,
			buildingNum : data.buildingNum
		});
		this.stopEditing();
		this.getStore().add(subModule);
		this.startEditing(0, 0);
	},
	loadContractEquipResource : function() {
		$request({
			url : __ctxPath + "/equip/listEquipmentDiary.do",
			params : {
				"Q_contractId_L_EQ" : this.parentForm.contractIds? null : this.contractId,
				"QVO_contractId_L_EQ" : this.parentForm.contractIds? this.parentForm.contractIds : null,
				"Q_lastSettleDate_S_NOTNULL" : "0",
				"limit" : -1
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var diarys = resp.result;
				for (var i = 0; i < diarys.length; i++) {
					this.loadResource(diarys[i]);
				}
			}.createDelegate(this)
		});
	},
	loadContractLeaseResource:function(){
		Ext.Ajax.request({
            url : __ctxPath + "/dispatch/getContractCostitemsSettleContract.do?contractId=" + this.contractId,
			//form : form.id,
			success : function(e, c) {
				Ext.MessageBox.hide();
                var data = Ext.util.JSON.decode(e.responseText).data[0];
                    for(var i =0;i<data.length;i++){
                        var d = data[i];
                        var SubModuleType = this.getStore().recordType;
                        var subRecord = new SubModuleType();
                        Ext.apply(subRecord.data, {
                            buildingNum:'',
                            settleItemName: d.costitemName,
                            quantity:!d.quantity? 0:isNaN(d.quantity)? 0:d.quantity,
                            unitprice :!d.expense? 0:isNaN(d.expense)? 0:d.expense,
                            measurement: d.measurement,
                            deductRent:!d.deductRent? 0:isNaN(d.deductRent)? 0:d.deductRent,
                            remark:d.remark
                        });
                        this.stopEditing();
                        this.getStore().add(subRecord);
                        this.startEditing(this.store.data.items.length-1,2);
                    }
			}.createDelegate(this),
			failure : function(q, r) {
				Ext.MessageBox.hide();
				Ext.MessageBox.alert("操作信息", "报表加载失败!");
			}
		});
	},
	calculate : function() {
		for(var i=0;i<this.getStore().getCount();i++){
			if(Ext.isEmpty(this.getStore().getAt(i).data.summary)) {
				continue;
			}
			this.getStore().getAt(i).data.preTaxAmount = this.getStore().getAt(i).data.summary;
			if(this.getStore().getAt(i).data.taxRate.indexOf("%")>0) {
				var tempTaxRate = Number(this.getStore().getAt(i).data.taxRate.replace("%",""))/100;
				this.getStore().getAt(i).data.afterTaxAmount = (this.getStore().getAt(i).data.summary/(1+tempTaxRate)).toFixed(2);
				//给税后的金额赋值，用于下面税金的计算
				var tax = this.getStore().getAt(i).data.afterTaxAmount
				this.getStore().getAt(i).data.taxes =  (this.getStore().getAt(i).data.summary-tax).toFixed(2);
			}
		}
		this.getStore().commitChanges();
	},
	showSummary : function(){
		//remove前一次点击 insert 的 record  (隐藏效果)
		var records = Array();
		for(var i=0;i<this.getStore().getCount();i++){
			if(this.getStore().getAt(i).data.buildingNum=='小计'){
				records.push(this.getStore().getAt(i));
			}
		}
		if(records.length>0){
			this.getStore().remove(records);
			return;
		}
		var arr = Array();
		var store = this.getStore();
		//汇总小计
//		var unitprice = 0;//费用单价
//		var quantity = 0;//数量
//		var deductRent = 0;//应扣租金
//		var itemCumulate = 0;//费用累计
//		var summary = 0;//租金累计
		var preTaxAmount = 0//含税金额
		var afterTaxAmount =0;//不含税金额
		var taxes = 0;//税金
		
		for(var i=0;i<store.getCount();i++){
//			unitprice += Number(store.getAt(i).data.unitprice);
//			quantity += Number(store.getAt(i).data.quantity);
//			deductRent += Number(store.getAt(i).data.deductRent);
//			itemCumulate += Number(store.getAt(i).data.itemCumulate);
//			summary += Number(store.getAt(i).data.summary);
			preTaxAmount += Number(store.getAt(i).data.preTaxAmount);
			afterTaxAmount += Number(store.getAt(i).data.afterTaxAmount);
			taxes += Number(store.getAt(i).data.taxes);
		}
		var a = {
			"buildingNum" : '小计',
			"startSettleDate" : null,
			"endSettleDate" : null,
			"unitprice" : null,
			"quantity" : null,
			"deductRent" : null,/*Number(deductRent).toFixed(2),*/
			"itemCumulate" : null,/*isNaN( Number(itemCumulate).toFixed(2))?itemCumulate:Number(itemCumulate).toFixed(2),*/
			"summary" : null,
			"preTaxAmount" : preTaxAmount.toFixed(2),
			"afterTaxAmount" : afterTaxAmount.toFixed(2),
			"taxes" : taxes.toFixed(2),
		}
		//将小计插入Grid
		var rowIndex = this.getStore().getCount();
		var record = new Ext.data.Record(a);
		this.getStore().insert(rowIndex,record);
		this.getView().addRowClass(rowIndex, "x-grid-back-purple");
	},
	importNotAssociatedEquipment : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要结算的配件信息！");
			return;
		}
		var param = null
		if(!isGranted("__ALL")) {
			param = {
				QVO_permissionFlag_S_LK : curUserInfo.dataPermission
			}
		}
		new EquipLostHandleSelector({
			params : param,
			single : true,
			callback : function(d) {
				var data = d[0].data;
				for (var i = 0; i < a.length; i++) {
					a[i].set("equipId", data.equipId);
					a[i].set("recordId", data.recordId);
					a[i].set("equipSerial", data.equipSerial);
					a[i].set("exwSerial", data.exwSerial);
					a[i].set("equipCategoryName", data.equipCategoryName);
					a[i].set("equipSpecificName", data.equipSpecificName);
					a[i].set("remark", "未关联合同设备");
					a[i].set("equipment", data);
				}
			}.createDelegate(this)
		}).show();
	}
});