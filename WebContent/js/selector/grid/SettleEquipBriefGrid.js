var SettleEquipBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.endSettleDateArr = [];
	this.currentDate = new Date();
	var columns = [  {
		header : "设备状态",
		dataIndex : "businessStatusName"
	},{
		width : 50,
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			maxLength : 32
		})
	}, {
		width : 80,
		header : "出厂编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.exwSerial : null;
		}
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
		header : "规格型号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n? n.equipSpecificName : null;
		}
	}, {
		width : 40,
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 6
		})
	}, {
		header : "启用日",
		tooltip : "【已生效】的上期结算单的截止日+1",
		dataIndex : "startSettleDate",
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
			record.data.startSettleDate = value;
			return value;
		}
	}, {
		header : "截止日",
		dataIndex : "endSettleDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			var startSettleDate = Date.parseDate(record.data.startSettleDate, "Y-m-d");
			if (startSettleDate > value) {
				Ext.MessageBox.alert("操作信息", "截止日期小于开始日期!");
				value = startSettleDate;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endSettleDate = value;
			return value;
		}
	}, {
		width : 50,
		header : "计费天数",
		dataIndex : "settleDays",
        css : "color:#7F7F7F;",
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			var startSettleDate = Date.parseDate(record.data.startSettleDate, "Y-m-d");
			var endSettleDate = Date.parseDate(record.data.endSettleDate, "Y-m-d");
			if (endSettleDate < startSettleDate) {
				Ext.MessageBox.alert("操作信息", "截止日期小于开始日期!");
				record.data.settleDays = 0;
				return 0;
			}
			var s = (endSettleDate.getTime() - startSettleDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
			var days = Math.round(s);
			record.data.settleDays = days;
			return days;
		}
	}, {
		xtype : "checkcolumn",
		header : "整月",
		dataIndex : "monthTag",
		width : 40,
		renderer : function(v, p, record){
			if(record.data.buildingNum == "小计"){
				return null;
			}
			p.css += ' x-grid3-check-col-td';
			if(v == "true" || v == true){
				record.data.summary = record.data.rentStandard*record.data.quantity-record.data.deductRent;
				v = '-on';
			}else{
				record.data.summary = "";
				v = '';
			}
			return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
		}
	},/* {
		width : 80,
		header : "租金标准",
		dataIndex : "rentStandard",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.rentStandardData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.rentStandard = value;
			return value;
		}
	},*/{
		width : 80,
		header : "租金标准",
		dataIndex : "rentStandard",
		editor : new Ext.form.NumberField({
			allowBlank : false
		})
	}, {
		width : 80,
		header : "租金单位",
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
		width : 50,
		header : "租赁数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		width : 80,
		header : "日租金",
		dataIndex : "daysRent",
		css : "color:#7F7F7F;",
		editor : new Ext.form.NumberField({
			decimalPrecision : 3,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			if (value != record.data.daysRent1) {
				record.data.daysRent1 = value;
				return value;
			}
			var daysRent = Ext.util.Format.number(record.data.rentStandard / 30, '0.000');
			record.data.daysRent1 = daysRent;
			record.data.daysRent = daysRent;
			return daysRent;
		}
	}, {
		width : 80,
		header : "应扣租金",
		dataIndex : "deductRent",
		editor : new Ext.form.NumberField({
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			value = Ext.isEmpty(value) ? 0 : value;
			record.data.deductRent = value;
			return Ext.util.Format.number(value, "0.00");
		}
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			if(!record.data.monthTag){
				var summary = 0;
				if(record.data.buildingNum == "小计"){
					return null;
				}
				var startSettleDate = Date.parseDate(record.data.startSettleDate, "Y-m-d");
				var endSettleDate = Date.parseDate(record.data.endSettleDate, "Y-m-d");
				var rentStandard = Number(record.data.rentStandard);
				var daysRent = record.data.daysRent;
				var settleDays = record.data.settleDays;
				var quantity = record.data.quantity;
				var deductRent = record.data.deductRent;
				var monthDifference = (endSettleDate.getYear() - startSettleDate.getYear()) * 12 + (endSettleDate.getMonth() - startSettleDate.getMonth())
				if (monthDifference == 0) {
					var settleMonthArray = KnightUtil.date.getMonthStartStop(startSettleDate);
					if (startSettleDate.getDate() == settleMonthArray[0].getDate() && endSettleDate.getDate() == settleMonthArray[1].getDate()) {
						summary += KnightUtil.math.forHundredthDight(rentStandard * quantity - deductRent);
					} else {
						summary += KnightUtil.math.forHundredthDight(daysRent * settleDays * quantity - deductRent);
					}
				} else {
					summary = KnightUtil.math.forHundredthDight(rentStandard * (monthDifference - 1) * quantity - deductRent);
					
					var startSettleMonthArray = KnightUtil.date.getMonthStartStop(startSettleDate);
					var endSettleMonthArray = KnightUtil.date.getMonthStartStop(endSettleDate);
					if (startSettleDate.getDate() == startSettleMonthArray[0].getDate()) {
						summary += rentStandard * quantity;
					} else {
						var startSettleDiff = startSettleMonthArray[1].getDate() - startSettleDate.getDate();
						summary += KnightUtil.math.forHundredthDight(daysRent * (startSettleDiff + 1) * quantity);
					}
					if (endSettleDate.getDate() == endSettleMonthArray[1].getDate()) {
						summary += rentStandard * quantity;
					} else {
						var endSettleDiff = endSettleDate.getDate() - endSettleMonthArray[0].getDate();
						summary += KnightUtil.math.forHundredthDight(daysRent * (endSettleDiff + 1) * quantity);
					}
				}
				record.data.summary = Number(summary.toFixed(2));
				this.parentForm.settleAmountLoad();
				return Number(summary.toFixed(2));
			}
			this.parentForm.settleAmountLoad();
			return Ext.util.Format.number(value, "0.00");
		}.createDelegate(this)
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
		})
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
	}, {//导入数据时按照起租日期排序
		hidden : true,
		header : "起租日期",
		dataIndex : "activateDate"
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
			iconCls : "btn-loading",
			text : "导入设备",
			handler : this.loadEquipmentResource.createDelegate(this)
		}, {
			hidden : true,
			iconCls : "btn-loading",
			text : "自动扣费",
			handler : this.automaticDeduction.createDelegate(this)
		}, {
			iconCls : "menu-business-equipblockup",
			text : "同步日期",
			handler : this.synchronize.createDelegate(this)
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
	SettleEquipBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : SettleEquipBriefListViewField,
		title : "设备结算清单",
		option : "设备",
		addForbidden : true,
		delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipBriefSettleContract.do"
	}, this.grid_config || {}));
};
Ext.extend(SettleEquipBriefGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(data) {
		//禁止自动导入重复设备，手动导入放行
		for (var i = 0; i < this.getStore().getCount(); i++) {
			 //由于（同一个设备在一个合同内转场，拆卸了重新起租，只导入得一台设备，应可导入本合同内的所有起租单的设备），所以不再做同一设备的过滤
			 if (this.getStore().getAt(i).data.equipDiaryId == data.equipDiaryId) {
				 	return;
			 }
		}
		
		//非首次结算的设备，启用日期=上次结算日期+1
//		if(data.activateDate!=data.lastSettleDate) {
//			var tempDate = new Date(data.lastSettleDate);
//			data.lastSettleDate =Ext.util.Format.date(tempDate.add(Date.DAY, 1), 'Y-m-d');
//		}
		//租金标准来源合同
		data.rentStandard = 0;
		if(this.contractEquipBriefSet!=null) {
			for(var j=0; j<this.contractEquipBriefSet.length; j++) {
				if(this.contractEquipBriefSet[j].equipSpecificName == data.equipSpecificName) {
					data.rentStandard = this.contractEquipBriefSet[j].rentStandard;
				}
			}
		}
		
		//获取上个月最后一条报停和这个月最后一条报停
		var days = $ajaxSyncCall(__ctxPath + "/equip/lastAndCurrMonthEquipBlockup.do",{
			flowId : data.flowId
		});
		var firstDay = Ext.util.Format.date(Env.date.getCurrentMonth()[0], 'Y-m-d');
		var endSettleDate = null;
		var businessStatus = null;
		var businessStatusName = '启用';
		
		if(days.result && days.result.length > 0){
			var result = days.result;
			var lastBlockDate = result[0].lastBlockDate;			//上月停租
			var lastReactivateDate = result[0].lastReactivateDate; //上月恢复
			var currBlockDate = result[0].currBlockDate;			//本月停租
			var currReactivateDate = result[0].currReactivateDate; //本月恢复
			if(lastBlockDate && !lastReactivateDate && !currBlockDate && !currReactivateDate){
				//1.上月停租，到当前尚未恢复，暂不参与本月结算：启用日为起租日，截止日为停租日，租金标准为0
				businessStatusName = "报停";
				data.lastBlockupDate = lastBlockDate;
				endSettleDate = data.lastBlockupDate;
				this.endSettleDateArr.push( Ext.util.Format.date(endSettleDate, 'Y-m-d'));
				if(endSettleDate < firstDay){
					 data.rentStandard = 0;
					 data.lastSettleDate = data.activateDate;
				}
			}else if(currBlockDate && !currReactivateDate){
				businessStatusName = "报停";
				data.lastBlockupDate = currBlockDate;
				endSettleDate = data.lastBlockupDate;
				this.endSettleDateArr.push( Ext.util.Format.date(endSettleDate, 'Y-m-d'));
			}else{
				//2.上月停租，当前月恢复一次，且无再次停租记录：启用日为恢复日，截止日为当月最后一天，租金标准合同取，计费天数为截止日-启用日
				//2.上月停租，当前月恢复后，在次停租，且之后未恢复：启用日为恢复日，截止日为当月的停租日，租金标准合同取，计费天数为
				endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
			}
		}else{
			endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
		}
		
//		if (Ext.isEmpty(data.lastBlockupDate)) {
//			endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
//		} else {
//			endSettleDate = data.lastBlockupDate;
//			this.endSettleDateArr.push( Ext.util.Format.date(endSettleDate, 'Y-m-d'));
//			if(endSettleDate < firstDay){
//				 data.rentStandard = 0;
//				 data.lastSettleDate = data.activateDate;
//			}
//		}
		
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		this.addHeight(recordHeight);
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
		Ext.apply(subModule.data, {
			equipment : data,
			businessStatus : businessStatus,
			businessStatusName : businessStatusName,
			equipDiaryId : data.equipDiaryId,
			equipId : data.equipId,
			recordSerial : data.recordSerial,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			equipCategoryName : data.equipCategoryName,
			equipSpecificName : data.equipSpecificName,
			buildingNum : data.buildingNum,
			unit : "台",
			startSettleDate : data.lastSettleDate,
			endSettleDate : endSettleDate,
			settleDays : 0,
			quantity : 1,
			deductRent : 0,
			rentStandard : data.rentStandard,
			equipSerial : data.equipSerial,
			taxRate : parentTaxRate,
			remark : data.remark,
			contractId : data.contractId,
			activateDate : data.activateDate
		});
		this.stopEditing();
		this.getStore().add(subModule);
		this.startEditing(0, 0);
	},
	loadContractEquipResource : function() {
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		if(parentTaxRate=="" || parentTaxRate==undefined){
			$toast("请先选择税率!");
			return;
		}
		$request({
			url : __ctxPath + "/equip/listEquipmentDiary.do",
			params : {
				"Q_contractId_L_EQ" : this.parentForm.contractIds? null : this.contractId,
				"QVO_contractId_L_EQ" : this.parentForm.contractIds? this.parentForm.contractIds : null,
				"Q_lastSettleDate_S_NOTNULL" : "0",
				"limit" : -1
			},
			success : function(g, h) {
				
//				var ate = $ajaxSyncCall(__ctxPath + "/equip/newListEquipmentDiary.do",{
//					contractId : this.contractId,
//					no : '1'
//				});
				var ate = $ajaxSyncCall(__ctxPath + "/equip/getLastSettleDateEquipmentDiary.do",{
					contractIds : this.parentForm.contractIds? this.parentForm.contractIds : this.contractId,
					tabFlag : "SettleEquipBrief"
				});
//				var newDate = null;
				var map = {};
				if(ate.result.length!=0){
					for(var j=0; j<ate.result.length; j++) {
						var tempDate = new Date(ate.result[j].endSettleDate);
						map[ate.result[j].equipId] = Ext.util.Format.date(tempDate.add(Date.DAY, 1), 'Y-m-d')
					}
				/*	newDate = ate.result[0].endSettleDate;
					var tempDate = new Date(newDate);
					newDate = Ext.util.Format.date(tempDate.add(Date.DAY, 1), 'Y-m-d');*/
				}/*else {
					newDate = new Date();
				}*/
				var resp = Ext.util.JSON.decode(g.responseText);
				var diarys = resp.result;
				for (var i = 0; i < diarys.length; i++) {
					if(map[diarys[i].equipId]!=null) {
						diarys[i].lastSettleDate = map[diarys[i].equipId];
					}
					this.loadResource(diarys[i]);
				}
				var count =  this.getStore().getCount();
				if(count == this.endSettleDateArr.length){
					this.endSettleDateArr.sort();
					this.parentForm.getForm().findField("settleContract.settleDate").setRawValue(this.endSettleDateArr[this.endSettleDateArr.length-1]);
				}
				//根据起租日期排序
				this.getStore().sort("activateDate","ASC");
			}.createDelegate(this)
		});
	},
	loadEquipmentResource : function() {
		new EquipDiarySelector({
			params : {
				"Q_contractId_L_EQ" : this.parentForm.contractIds? null : this.contractId,
				"QVO_contractId_L_EQ" : this.parentForm.contractIds? this.parentForm.contractIds : null
			},
			collectEnable : true,
			callback : function(d) {
				var ate = $ajaxSyncCall(__ctxPath + "/equip/getLastSettleDateEquipmentDiary.do",{
					contractIds : this.parentForm.contractIds? this.parentForm.contractIds : this.contractId,
					tabFlag : "SettleEquipBrief"
				});
				var map = {};
				if(ate.result.length!=0){
					for(var j=0; j<ate.result.length; j++) {
						var tempDate = new Date(ate.result[j].endSettleDate);
						map[ate.result[j].equipId] = Ext.util.Format.date(tempDate.add(Date.DAY, 1), 'Y-m-d')
					}
				}
				for (var i = 0; i < d.length; i++) {
					if(map[d[i].data.equipId]!=null) {
						d[i].data.lastSettleDate = map[d[i].data.equipId];
					}
					this.loadResource(d[i].data);
				}
//
//				for (var i = 0; i < d.length; i++) {
//					this.loadResource(d[i].data);
//				}
			}.createDelegate(this)
		}).show();
	},
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		var startSettleDate = this.parentForm.getForm().findField("settleContract.startSettleDate").getValue();
		var endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		return {
			settleId : this.settleId,
			equipCategoryName : "品名",
			equipSpecificName : "规格",
			unit : "台",
			startSettleDate : startSettleDate,
			endSettleDate : endSettleDate,
			settleDays : 0,
			quantity : 1,
			deductRent : 0,
			taxRate : parentTaxRate
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
	synchronize : function() {
		if (this.getSelectionModel().hasSelection()) {
			var dateSynchronizeList = this.getSelectionModel().getSelections();
			for (var i = 0; i < dateSynchronizeList.length; i++) {
				if(!(this.parentForm.startSettleDate) == "undefined" || !(this.parentForm.endSettleDate) == "undefined"){
					dateSynchronizeList[i].set("startSettleDate",this.parentForm.startSettleDate);
					dateSynchronizeList[i].set("endSettleDate",this.parentForm.endSettleDate);
				}else{
					dateSynchronizeList[i].set("startSettleDate",this.parentForm.getForm().findField("settleContract.startSettleDate").getValue());
					dateSynchronizeList[i].set("endSettleDate",this.parentForm.getForm().findField("settleContract.endSettleDate").getValue());
					}
				} 
			} else {
		        Ext.MessageBox.show({
		        	title : "提示",
		        	msg :"请选择要同步的设备!",
		        	buttons: Ext.MessageBox.OK
		        });
		    }
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
				var tax = this.getStore().getAt(i).data.afterTaxAmount;
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
//		var deductRentAll = 0;
//		var summaryAll = 0;
		var preTaxAmountAll = 0;
		var afterTaxAmountAll = 0;
		var taxesAll = 0;
		
		for(var i=0;i<store.getCount();i++){
//			deductRentAll += Number(store.getAt(i).data.deductRent);
//			summaryAll += Number(store.getAt(i).data.summary);
			preTaxAmountAll += KnightUtil.math.forHundredthDight(store.getAt(i).data.preTaxAmount);
			afterTaxAmountAll += KnightUtil.math.forHundredthDight(store.getAt(i).data.afterTaxAmount);
			taxesAll += KnightUtil.math.forHundredthDight(store.getAt(i).data.taxes);
		}
		
		var a = {
			"buildingNum" : '小计',
			"equipSerial" : null,
			"equipCategoryName" : null,
			"equipSpecificName" : null,
			"unit" : null,
			"startSettleDate" : null,
			"endSettleDate" : null,
			"settleDays" : null,
			"monthTag" : null,
			"rentStandard" : null,
			"measurement" : null,
			"quantity" : null,
			"daysRent" : null,
			"deductRent" : null,
			"summary" : null,
			"remark" : null,
			"taxRate" : null,
			"preTaxAmount" : Ext.util.Format.number(preTaxAmountAll, "0.00"),
			"afterTaxAmount" : Ext.util.Format.number(afterTaxAmountAll, "0.00"),
			"taxes" : Ext.util.Format.number(taxesAll, "0.00"),
			"exwSerial" : null,
			"recordId" : null
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