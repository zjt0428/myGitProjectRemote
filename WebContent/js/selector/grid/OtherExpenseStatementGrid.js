var OtherExpenseStatementGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			maxLength : 32
		})
	}, {
		header : "设备自编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.equipSerial : null;
		}
	}, {
		width : 80,
		header : "出厂编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.exwSerial : null;
		}
	}, {
		header : "规格型号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.equipSpecificName : null;
		}
	}, {
		header : "费用项目",
		dataIndex : "expenseItem",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.expenseItemData
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
			record.data.expenseItem = value;
			return value;
		}
	}, {
		width : 80,
		header : "费用单价",
		dataIndex : "price",
		editor : new Ext.form.NumberField({
			decimalPrecision : 3,
			allowBlank : false,
			maxValue : 99999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			value = Ext.isEmpty(value) ? 0 : value;
			record.data.price = Number(value);
			return Ext.util.Format.number(value, "0.00");
		}
	}, {
		width : 60,
		header : "数量",
		dataIndex : "number",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		}),
	}, {
		header : "计量单位",
		dataIndex : "unit",
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
		header : "费用累计",
		dataIndex : "amount",
		renderer : function(value, medata, record) {
			if(Ext.isNumber(record.data.number) && Ext.isNumber(record.data.price)) {
				value = (record.data.number * record.data.price).toFixed(2);
				record.data.amount = Number(value);
				this.parentForm.settleAmountLoad();
				return value;
			}
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
			if(this.saveable && Ext.isNumber(record.data.amount)) {
				record.data.preTaxAmount = record.data.amount;
				return record.data.preTaxAmount;
			}
			return value;
		}.createDelegate(this)
	}, {
		width : 80,
		header : "不含税金额",
		dataIndex : "afterTaxAmount",
		renderer : function(value, metadata, record) {
			if(this.saveable && Ext.isNumber(record.data.amount) && record.data.taxRate.indexOf("%")) {
				var tempTaxRate = Number(record.data.taxRate.replace("%",""))/100;
				var num = (record.data.amount/(1+tempTaxRate)).toFixed(2);
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
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable && this.contractId) {
		this.tbarItems = [ {
			hidden : true,
			iconCls : "btn-head-add",
			text : "新增",
			handler : this.addSubModule.createDelegate(this)
		},{
			iconCls : "btn-head-del",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		}, {
			iconCls : "btn-loading",
			text : "导入启用设备",
			handler : this.loadContractEquipResource.createDelegate(this)
		}, {
			hidden : true,
			iconCls : "btn-pred",
			text : "核算",
			handler : this.calculate.createDelegate(this)
		}];
	}
	this.tbarItems.push({
		iconCls : "btn-effective",
		text : "小计",
		handler : this.showAmount.createDelegate(this)
	});
	if(this.saveable && isGranted("_ImportNotAssociatedEquipment")) {
		this.tbarItems.push("->", {
			tooltip: '<font color=red>仅用于导入合同未发货安装已停机转场需要结算的设备</font>',
			iconCls : "menu-archive-issue-manage",
			text : "导入未关联合同设备",
			handler : this.importNotAssociatedEquipment.createDelegate(this)
		})
	}
	OtherExpenseStatementGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : OtherExpenseStatementViewField,
		title : "其他费用清单",
		option : "其他费用清单",
		addForbidden : true,
		delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelOtherExpenseSettleContract.do"
	}, this.grid_config || {}));
};
Ext.extend(OtherExpenseStatementGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			 //由于（同一个设备在一个合同内转场，拆卸了重新起租，只导入得一台设备，应可导入本合同内的所有起租单的设备），所以不再做同一设备的过滤
			 if (this.getStore().getAt(i).data.equipDiaryId == data.equipDiaryId) {
				 	return;
			 }
		}
		var endSettleDate = null;
		if (Ext.isEmpty(data.lastBlockupDate)) {
			endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
		} else {
			endSettleDate = data.lastBlockupDate;
		}
		if(Ext.isEmpty(data.lastSettleDate)) {
			data.lastSettleDate =  this.parentForm.getFieldValue("startSettleDate");
		}
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		if(parentTaxRate=="" || parentTaxRate==undefined){
			$toast("请先选择税率!");
			return;
		}
		this.addHeight(recordHeight);
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
		Ext.apply(subModule.data, {
			equipment : data,
			equipDiaryId : data.equipDiaryId,
			equipId : data.equipId,
			recordSerial : data.recordSerial,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			equipSerial : data.equipSerial,
			equipCategoryName : data.equipCategoryName,
			equipSpecificName : data.equipSpecificName,
			buildingNum : data.buildingNum,
			startSettleDate : data.lastSettleDate,
			endSettleDate : endSettleDate,
			settleDays : 0,
			quantity : 1,
			deductRent : 0,
			number : 1,
			rentStandard :data.rentStandard,
			taxRate : parentTaxRate,
			contractId : data.contractId
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
	loadEquipmentResource : function() {
		new EquipSelector({
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					d[i].set("lastSettleDate", new Date().format("Y-m-d"));
					this.loadResource(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	},
	createSubModule : function() {
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		if(Ext.isEmpty(parentTaxRate)) {
			$toast("请先选择税率")
		}
		var startSettleDate = this.parentForm.getForm().findField("settleContract.startSettleDate").getValue();
		var endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
		return {
			settleId : this.settleId,
			startSettleDate : startSettleDate,
			endSettleDate : endSettleDate,
			taxRate : parentTaxRate ? parentTaxRate : 0,
			settleDays : 0,
			quantity : 1
		};
	},
	automaticDeduction : function() {
		if(this.getSelectionModel().hasSelection()){
		var m = this.getSelectionModel().getSelections();
		for (var i = 0; i < m.length; i++) {
			var quantity = m[i].get("quantity");
			var daysRent = m[i].get("daysRent");
			m[i].set("deductRent", quantity * daysRent);
			}
		}else{
			Ext.MessageBox.show({
		        title : "提示",
		       	msg :"请选择要操作的设备!",
		       	buttons: Ext.MessageBox.OK
		    });
		}
	},
	calculate : function() {
		for(var i=0;i<this.getStore().getCount();i++){
			if(Ext.isEmpty(this.getStore().getAt(i).data.amount)) {
				continue;
			}
			this.getStore().getAt(i).data.preTaxAmount = this.getStore().getAt(i).data.amount;
			if(this.getStore().getAt(i).data.taxRate.indexOf("%")>0) {
				var tempTaxRate = Number(this.getStore().getAt(i).data.taxRate.replace("%",""))/100;
				
			this.getStore().getAt(i).data.afterTaxAmount = (this.getStore().getAt(i).data.amount/(1+tempTaxRate)).toFixed(2);
			//给税后的金额赋值，用于下面税金的计算
			var tax = this.getStore().getAt(i).data.afterTaxAmount
				this.getStore().getAt(i).data.taxes =  (this.getStore().getAt(i).data.amount-tax).toFixed(2);
			}
		}
		this.getStore().commitChanges();
	},
	getTotalPreTax : function() {
		var amount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			amount += Number(r.amount);
		}
		return amount;
	},
	showAmount : function(){
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
//		var number = 0;//数量
		var amount = 0;//费用累计
		var preTaxAmount = 0//含税金额
		var afterTaxAmount =0;//不含税金额
		var taxes = 0;//税金
		for(var i=0;i<store.getCount();i++){
//			number += Number(store.getAt(i).data.number);
			amount += Number(store.getAt(i).data.amount);
			preTaxAmount += Number(store.getAt(i).data.preTaxAmount);
			afterTaxAmount += Number(store.getAt(i).data.afterTaxAmount);
			taxes += Number(store.getAt(i).data.taxes);
		}
		var a = {
			"buildingNum" : '小计',
			"startSettleDate" : null,
			"endSettleDate" : null,
			"number" : null,
			"amount" : Number(amount).toFixed(2),
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
				data.lastSettleDate = new Date();
				data.remark = "未关联合同设备";
				this.loadResource(data);
			}.createDelegate(this)
		}).show();
	}
});