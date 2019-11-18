var LeaseSettlementForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	var leaseTypeCombo = $initComboBoxField("合同类型", "leaseSettlement.leaseType", "contractCategory", {
		width : 150,
		editable : false,
		readOnly : !this.saveable,
		disabled : !this.saveable,
		allowBlank : false
	})
	
	var settlementCombo = new Ext.form.ComboBox({
		id : "settlement",
		fieldLabel  : "结算方式",
		name : "leaseSettlement.settlement",
		width : 150,
		editable : false,
		readOnly : true,
		disabled : !this.saveable,
		mode : "local",
		allowBlank : false,
		triggerAction : "all",
		store : [["0", "算头不算尾"], ["1", "算尾不算头"], ["2", "算头又算尾"], ["3", "头尾都不算"]]
	})
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.settlementId,
		relateModule : RelationModule.leaseSettlement.relateModule,
		saveable : this.saveable
	});
	
	var settlementItems = null;
	var insideSettlementItems = null;
	var leasedLostItems = null;
	var leasedOtherFeeItems = null;
	var leaseBlockUpItems = [];
	var insideBlockUpItems = [];
	if (this.saveable) {
		settlementItems = [{
			iconCls : "btn-search",
			text : "一键加载",
			handler : this.allSettlementSubmit.createDelegate(this)
		}];
		//内部结算
		insideSettlementItems = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadInsideSettlementList.createDelegate(this)
		}];
		//租借丢失
		leasedLostItems = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadLeasedLostDetail.createDelegate(this)
		}];
		//租借其他业务
		leasedOtherFeeItems = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadOtherLeaseBusinessDetail.createDelegate(this)
		}];
		//租借报停
		leaseBlockUpItems.push({
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadLeaseBlockUpDetail.createDelegate(this)
		});
		//内部报停
		insideBlockUpItems.push({
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadLeaseBlockUpDetail.createDelegate(this)
		});
	}
	leaseBlockUpItems.push({
		iconCls : "btn-search",
		text : "明细",
		handler : this.queryLeaseBlockUpDetail.createDelegate(this)
	});
	insideBlockUpItems.push({
		iconCls : "btn-search",
		text : "明细",
		handler : this.queryInsideBlockUpDetail.createDelegate(this)
	});
	
	//租借结算清单
	this.settlementListGrid = new SettlementListGrid({
		saveable : this.saveable,
		tbarItems : settlementItems
	});
	//内部结算清单
	this.insideSettlementListGrid = new  InsideSettlementListGrid({
		saveable : this.saveable,
		tbarItems : insideSettlementItems
	});
	//租借丢失清单
	this.leasedLostDetailGrid = new LeasedLostDetailGrid({
		saveable : this.saveable,
		tbarItems : leasedLostItems
	});
	//租借其他
	this.leaseOtherBusinessDetailGrid = new LeaseOtherBusinessDetailGrid({
		saveable : this.saveable,
		tbarItems : leasedOtherFeeItems
	});
	//租借报停
	this.leaseSettlementBlockUpGrid = new LeaseSettlementBlockUpGrid({
		saveable : this.saveable,
		tbarItems : leaseBlockUpItems
	});
	//内部报停清单
	this.leaseSettlementInsideBlockUpGrid = new LeaseSettlementInsideBlockUpGrid({
		saveable : this.saveable,
		tbarItems : insideBlockUpItems
	});
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					fieldLabel : "结算编号",
					name : "leaseSettlement.settlementSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "结算主题",
					name : "leaseSettlement.settlementTheme"
				}, {
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "合同编号",
					name : "leaseSettlement.leaseContract.leaseIdentifier"
				}, {
					editable : false,
					readOnly : true,
					fieldLabel : "主管部门",
					name : "leaseSettlement.leaseContract.depName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "leaseSettlement.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "leaseSettlement.fillDate",
					value : new Date()
				}, settlementCombo, {
					id : "startDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					fieldLabel : "起始日期",
					name : "leaseSettlement.startDate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "leaseSettlement.project.projectName"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "承租单位",
					name : "leaseSettlement.tenantry"
				}, {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "租借单位",
					name : "leaseSettlement.lessor"
				}, {
					id : "endDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					fieldLabel : "截止日期",
					name : "leaseSettlement.endDate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					disabled : !this.saveable,
					allowBlank : false,
					allowDecimals : true,
					allowNegative : false,
					decimalPrecision : 3,
					unitText : "元",
					fieldLabel : "已结算金额",
					name : "leaseSettlement.alreadySettlementAmount",
					value : 0
				}, {
					xtype : "numberfield",
					disabled : !this.saveable,
					allowBlank : false,
					allowDecimals : true,
					allowNegative : false,
					decimalPrecision : 3,
					unitText : "元",
					fieldLabel : "已支付金额",
					name : "leaseSettlement.alreadyPaymentAmount",
					value : 0
				}, {
					xtype : "numberfield",
					disabled : !this.saveable,
					allowBlank : false,
					allowDecimals : true,
					allowNegative : false,
					decimalPrecision : 3,
					unitText : "元",
					editable : false,
					readOnly : true,
					fieldLabel : "本期结算金额",
					name : "leaseSettlement.currentSettlementAmount",
					value : 0
				}, {
					xtype : "numberfield",
					disabled : !this.saveable,
					allowBlank : false,
					allowDecimals : true,
					allowNegative : false,
					decimalPrecision : 3,
					unitText : "元",
					editable : false,
					readOnly : true,
					fieldLabel : "内部结算金额",
					name : "leaseSettlement.insideSettlementAmount",
					value : 0
				}]
			}]
		}]
	}, {
		xtype : "tabpanel",
		anchor : "98%",
		activeTab : 0,
		autoHeight : true,
		items : [this.settlementListGrid,this.leasedLostDetailGrid,this.leaseSettlementBlockUpGrid,
		         this.leaseOtherBusinessDetailGrid,this.insideSettlementListGrid,this.leaseSettlementInsideBlockUpGrid]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [fileAttachContainer]
	}]
	
	LeaseSettlementForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		title : "租借结算",
		height : 420,
		form_config : {
			object : "leaseSettlement",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.settlementId,
				relateModule : RelationModule.leaseSettlement.relateModule
			},
			url : __ctxPath + "/materials/saveLeaseSettlement.do",
			items : items,
			fieldMapping : LeaseSettlementFieldMapping,
			hiddenField : LeaseSettlementHiddenField
		}
	});
}
Ext.extend(LeaseSettlementForm, Knight.ux.FormPanelWindow, {
	allSettlementSubmit : function () {
		var grid = this.settlementListGrid;
		//清空grid
		grid.getStore().removeAll();
		
		if (!Ext.isEmpty(this.settlementId)) {
			var startDate = new Date(Ext.getCmp('startDate').getValue()).format('Y-m-d');
			var endDate = new Date(Ext.getCmp('endDate').getValue()).getTime();
			endDate = new Date(endDate).format('Y-m-d');
			var settlement = Ext.getCmp('settlement').getValue();
			if (startDate == null || startDate == undefined || startDate == "" || startDate== "0NaN-NaN-NaN" || startDate == NaN) {
				$toast("请指定结算开始日期！");
				return;
			}
			if (endDate == null || endDate == undefined || endDate =="" || endDate == "0NaN-NaN-NaN" || endDate == NaN) {
				$toast("请指定结算截止日期！");
				return;
			}
			if(settlement == null || settlement == undefined || settlement == "") {
				$toast("请指定结算方式！");
				return;
			}
			if (startDate > endDate) {
				$toast("截止日期不能小于起始日期！");
				return;
			}
			this.leaseContract = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseContract.do", {
				leaseId : this.leaseContract.leaseId
			})
			//上期结存
			var initialInventoryData = $ajaxSyncCall(__ctxPath + "/materials/initialInventoryLeaseSettlement.do", {
				"leaseId" : this.leaseContract.leaseId,
				"startDate" : startDate
			});
			var goodsRecipientData = $ajaxSyncCall(__ctxPath + "/materials/listGoodsRecipient.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.leaseContract.leaseId,
				"Q_deliveryDate_S_GE" : startDate,
				"Q_deliveryDate_S_LE" : endDate,
				"Q_status_S_EQ" : "3",
				"limit" : 1000
			});
			var returnGoodsData = $ajaxSyncCall(__ctxPath + "/materials/listReturnGoods.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.leaseContract.leaseId,
				"Q_returnDate_S_GE" : startDate,
				"Q_returnDate_S_LE" : new Date(endDate).add(Date.DAY,1).format('Y-m-d'), //由于returnDate 包含时分秒，所查询日期+1；
				"Q_status_S_EQ" : "3",
				"limit" : 1000
			});
			var leaseRepairData = $ajaxSyncCall(__ctxPath + "/materials/listLeaseRepair.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.leaseContract.leaseId,
				"Q_repairDate_S_GE" : startDate,
				"Q_repairDate_S_LE" : endDate,
				"Q_status_S_EQ" : "3",
				"limit" : 1000
			});
			var leasedLostCompensationData = $ajaxSyncCall(__ctxPath + "/materials/listLeasedLostCompensation.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.leaseContract.leaseId,
				"Q_compensationDate_S_GE" : startDate,
				"Q_compensationDate_S_LE" : endDate,
				"Q_applyforState_S_EQ" : "3",
				"limit" : 1000
			});
			var datas = [];
			for (var i=0;i<initialInventoryData.result.length;i++) {
				var data = initialInventoryData.result[i];
				var dailyRent = this.searchDailyRent(this.leaseContract,data);
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(startDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				data["receiptType"] = '上期结存';
				data["relateSerial"] = '';
				data["days"] = days;
				data["dailyRent"] = dailyRent;
				data["beginDate"] = startDate;
				datas.push(data);
			}
			for (var i = 0; i < goodsRecipientData.result.length; i++) {
				var receiptDate = goodsRecipientData.result[i].deliveryDate;
				var relateSerial = goodsRecipientData.result[i].recipientSerial;
				var days =  parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				var receiptType = "收货管理";
				for (var d = 0; d < goodsRecipientData.result[i].recipientListSet.length; d++) {
					var data = goodsRecipientData.result[i].recipientListSet[d];
					var specifications = $ajaxSyncCall(__ctxPath + "/materials/loadMaterialsSpecifications.do", {
						specificationsId : data.specificationsId
					});
					var specificationsData = specifications.data[0];
					var dailyRent = this.searchDailyRent(this.leaseContract,specificationsData);
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = receiptType;
					data["relateSerial"] = relateSerial;
					data["quantity"] = data.recipientQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["mnemonics"] = (typeof(specificationsData.mnemonics) == undefined) ? "" : specificationsData.mnemonics;
					data["unitConversion"] = (typeof(specificationsData.secondUnitConversion) == undefined) ? "" : specificationsData.secondUnitConversion;
					data["convertedQuantity"] = (typeof(specificationsData.secondConvertedQuantity) == undefined) ? "" : specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			for (var i = 0; i < returnGoodsData.result.length; i++) {
				var receiptDate = returnGoodsData.result[i].returnDate;
				receiptDate = new Date(receiptDate).format('Y-m-d');
				var relateSerial = returnGoodsData.result[i].returnSerial;
				var days =  parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				var receiptType = "退货管理";
				for (var d = 0; d < returnGoodsData.result[i].returnListSet.length; d++) {
					var data = returnGoodsData.result[i].returnListSet[d];
					var specifications = $ajaxSyncCall(__ctxPath + "/materials/loadMaterialsSpecifications.do", {
						specificationsId : data.specificationsId
					});
					var specificationsData = specifications.data[0];
					var dailyRent = this.searchDailyRent(this.leaseContract,specificationsData);
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = receiptType;
					data["relateSerial"] = relateSerial;
					data["quantity"] = data.returnQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["mnemonics"] = (typeof(specificationsData.mnemonics) == undefined) ? "" : specificationsData.mnemonics;
					data["unitConversion"] = (typeof(specificationsData.secondUnitConversion) == undefined) ? "" : specificationsData.secondUnitConversion;
					data["convertedQuantity"] = (typeof(specificationsData.secondConvertedQuantity) == undefined) ? "" : specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			for (var i = 0; i < leaseRepairData.result.length; i++) {
				var receiptDate = leaseRepairData.result[i].repairDate;
				receiptDate = new Date(receiptDate).format('Y-m-d');
				var relateSerial = leaseRepairData.result[i].repairSerial;
				var days =  parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				for (var d = 0; d < leaseRepairData.result[i].leaseRepairBeforeSet.length; d++) {
					var dataBefore = leaseRepairData.result[i].leaseRepairBeforeSet[d];
					var specificationsData = dataBefore.materialsSpecifications;
					var dailyRent = this.searchDailyRent(this.leaseContract,specificationsData);
					var data = {};
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = "租借维修入库";
					data["relateSerial"] = relateSerial;
					data["quantity"] = dataBefore.repairQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["commodityId"] = specificationsData.materialsCommodity.commodityId;
					data["commodity"] = specificationsData.materialsCommodity.commodity;
					data["measurementUnit"] = specificationsData.firstUnitConversion;
					data["specifications"] = specificationsData.specifications;
					data["specificationsId"] = specificationsData.specificationsId;
					data["mnemonics"] = specificationsData.mnemonics;
					data["unitConversion"] = specificationsData.secondUnitConversion;
					data["convertedQuantity"] = specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
				for (var d = 0; d < leaseRepairData.result[i].leaseRepairAfterSet.length; d++) {
					var dataAfter = leaseRepairData.result[i].leaseRepairAfterSet[d];
					var specificationsData = dataAfter.materialsSpecifications;
					var dailyRent = this.searchDailyRent(this.leaseContract,specificationsData);
					var data = {};
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = "租借维修出库";
					data["relateSerial"] = relateSerial;
					data["quantity"] = dataAfter.repairQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["commodityId"] = specificationsData.materialsCommodity.commodityId;
					data["commodity"] = specificationsData.materialsCommodity.commodity;
					data["measurementUnit"] = specificationsData.firstUnitConversion;
					data["specifications"] = specificationsData.specifications;
					data["specificationsId"] = specificationsData.specificationsId;
					data["mnemonics"] = specificationsData.mnemonics;
					data["unitConversion"] = specificationsData.secondUnitConversion;
					data["convertedQuantity"] = specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			for (var i = 0; i < leasedLostCompensationData.result.length; i++) {
				var receiptDate = leasedLostCompensationData.result[i].compensationDate;
				var relateSerial = leasedLostCompensationData.result[i].lostSerial;
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				var receiptType = "租借丢失赔偿";
				for (var d = 0; d < leasedLostCompensationData.result[i].leasedLostCompensationDetailSet.length; d++) {
					var data = leasedLostCompensationData.result[i].leasedLostCompensationDetailSet[d];
					var specifications = $ajaxSyncCall(__ctxPath + "/materials/loadMaterialsSpecifications.do", {
						specificationsId : data.specificationsId
					});
					var specificationsData = specifications.data[0];
					var dailyRent = this.searchDailyRent(this.data,specificationsData);
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = receiptType;
					data["relateSerial"] = relateSerial;
					data["quantity"] = data.lostQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["commodityId"] = specificationsData.materialsCommodity.commodityId;
					data["measurementUnit"] = specificationsData.firstUnitConversion;
					data["mnemonics"] = (typeof(specificationsData.mnemonics) == undefined) ? "" : specificationsData.mnemonics;
					data["unitConversion"] = (typeof(specificationsData.secondUnitConversion) == undefined) ? "" : specificationsData.secondUnitConversion;
					data["convertedQuantity"] = (typeof(specificationsData.secondConvertedQuantity) == undefined) ? "" : specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			this.sortDatas(datas);
			for(var m=0;m<datas.length;m++) {
				grid.addSubModuleDate(datas[m]);
			}
		} else {
			var startDate = new Date(this.getForm().getFieldValues()['leaseSettlement.startDate']).format('Y-m-d');
			var endDate = new Date(this.getForm().getFieldValues()['leaseSettlement.endDate']).getTime();
			endDate = new Date(endDate).format('Y-m-d');
			var settlement = this.getForm().getFieldValues()['leaseSettlement.settlement'];
			if (startDate == null || startDate == undefined || startDate == "" || startDate== "0NaN-NaN-NaN" || startDate == NaN) {
				$toast("请指定结算开始日期！");
				return;
			}
			if (endDate == null || endDate == undefined || endDate =="" || endDate== "0NaN-NaN-NaN" || endDate == NaN) {
				$toast("请指定结算截止日期！");
				return;
			}
			if(settlement == null || settlement == undefined || settlement == "") {
				$toast("请指定结算方式！");
				return;
			}
			if (new Date(startDate).format('Y-m-d') > new Date(endDate).format('Y-m-d')) {
				$toast("截止日期不能小于起始日期！");
				return;
			}
			var initialInventoryData = $ajaxSyncCall(__ctxPath + "/materials/initialInventoryLeaseSettlement.do", {
				"leaseId" : this.data.leaseId,
				"startDate" : startDate
			});
			var goodsRecipientData = $ajaxSyncCall(__ctxPath + "/materials/listGoodsRecipient.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.data.leaseId,
				"Q_deliveryDate_S_GE" : startDate,
				"Q_deliveryDate_S_LE" : endDate,
				"Q_status_S_EQ" : "3",
				"QUERY_ALL_WITHOUT_LIMIT" : "Y",
				"includeSet" : "Y"
			});
			var returnGoodsData = $ajaxSyncCall(__ctxPath + "/materials/listReturnGoods.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.data.leaseId,
				"Q_returnDate_S_GE" : startDate,
				"Q_returnDate_S_LE" : new Date(endDate).add(Date.DAY,1).format('Y-m-d'),
				"Q_status_S_EQ" : "3",
				"QUERY_ALL_WITHOUT_LIMIT" : "Y",
				"includeSet" : "Y"
			});
			var leaseRepairData = $ajaxSyncCall(__ctxPath + "/materials/listLeaseRepair.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.data.leaseId,
				"Q_repairDate_S_GE" : startDate,
				"Q_repairDate_S_LE" : endDate,
				"Q_status_S_EQ" : "3",
				"QUERY_ALL_WITHOUT_LIMIT" : "Y",
				"includeSet" : "Y"
			});
			var leasedLostCompensationData = $ajaxSyncCall(__ctxPath + "/materials/listLeasedLostCompensation.do", {
				"Q_[leaseContract.leaseId]_L_EQ" : this.data.leaseId,
				"Q_compensationDate_S_GE" : startDate,
				"Q_compensationDate_S_LE" : endDate,
				"Q_applyforState_S_EQ" : "3",
				"QUERY_ALL_WITHOUT_LIMIT" : "Y",
				"includeSet" : "Y"
			});
			var datas = [];
			for (var i=0;i<initialInventoryData.result.length;i++) {
				var data = initialInventoryData.result[i];
				var dailyRent = this.searchDailyRent(this.data,data);
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(startDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				data["receiptType"] = '上期结存';
				data["relateSerial"] = '';
				data["days"] = days;
				data["dailyRent"] = dailyRent;
				data["beginDate"] = startDate;
				datas.push(data);
			}
			for (var i = 0; i < goodsRecipientData.result.length; i++) {
				var receiptDate = goodsRecipientData.result[i].deliveryDate;
				var relateSerial = goodsRecipientData.result[i].recipientSerial;
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				var receiptType = "收货管理";
				for (var d = 0; d < goodsRecipientData.result[i].recipientListSet.length; d++) {
					var data = goodsRecipientData.result[i].recipientListSet[d];
					var specifications = $ajaxSyncCall(__ctxPath + "/materials/loadMaterialsSpecifications.do", {
						specificationsId : data.specificationsId
					});
					var specificationsData = specifications.data[0];
					var dailyRent = this.searchDailyRent(this.data,specificationsData);
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = receiptType;
					data["relateSerial"] = relateSerial;
					data["quantity"] = data.recipientQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["mnemonics"] = (typeof(specificationsData.mnemonics) == undefined) ? "" : specificationsData.mnemonics;
					data["unitConversion"] = (typeof(specificationsData.secondUnitConversion) == undefined) ? "" : specificationsData.secondUnitConversion;
					data["convertedQuantity"] = (typeof(specificationsData.secondConvertedQuantity) == undefined) ? "" : specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			for (var i = 0; i < returnGoodsData.result.length; i++) {
				var receiptDate = returnGoodsData.result[i].returnDate;
				receiptDate = new Date(receiptDate).format('Y-m-d');
				var relateSerial = returnGoodsData.result[i].returnSerial;
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				var receiptType = "退货管理";
				for (var d = 0; d < returnGoodsData.result[i].returnListSet.length; d++) {
					var data = returnGoodsData.result[i].returnListSet[d];
					var specifications = $ajaxSyncCall(__ctxPath + "/materials/loadMaterialsSpecifications.do", {
						specificationsId : data.specificationsId
					});
					var specificationsData = specifications.data[0];
					var dailyRent = this.searchDailyRent(this.data,specificationsData);
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = receiptType;
					data["relateSerial"] = relateSerial;
					data["quantity"] = data.returnQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["mnemonics"] = (typeof(specificationsData.mnemonics) == undefined) ? "" : specificationsData.mnemonics;
					data["unitConversion"] = (typeof(specificationsData.secondUnitConversion) == undefined) ? "" : specificationsData.secondUnitConversion;
					data["convertedQuantity"] = (typeof(specificationsData.secondConvertedQuantity) == undefined) ? "" : specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			for (var i = 0; i < leaseRepairData.result.length; i++) {
				var receiptDate = leaseRepairData.result[i].repairDate;
				receiptDate = new Date(receiptDate).format('Y-m-d');
				var relateSerial = leaseRepairData.result[i].repairSerial;
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				for (var d = 0; d < leaseRepairData.result[i].leaseRepairBeforeSet.length; d++) {
					var dataBefore = leaseRepairData.result[i].leaseRepairBeforeSet[d];
					var specificationsData = dataBefore.materialsSpecifications;
					var dailyRent = this.searchDailyRent(this.data,specificationsData);
					var data = {};
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = "租借维修入库";
					data["relateSerial"] = relateSerial;
					data["quantity"] = dataBefore.repairQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["commodityId"] = specificationsData.materialsCommodity.commodityId;
					data["commodity"] = specificationsData.materialsCommodity.commodity;
					data["measurementUnit"] = specificationsData.firstUnitConversion;
					data["specifications"] = specificationsData.specifications;
					data["specificationsId"] = specificationsData.specificationsId;
					data["mnemonics"] = specificationsData.mnemonics;
					data["unitConversion"] = specificationsData.secondUnitConversion;
					data["convertedQuantity"] = specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
				for (var d = 0; d < leaseRepairData.result[i].leaseRepairAfterSet.length; d++) {
					var dataAfter = leaseRepairData.result[i].leaseRepairAfterSet[d];
					var specificationsData = dataAfter.materialsSpecifications;
					var dailyRent = this.searchDailyRent(this.data,specificationsData);
					var data = {};
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = "租借维修出库";
					data["relateSerial"] = relateSerial;
					data["quantity"] = dataAfter.repairQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["commodityId"] = specificationsData.materialsCommodity.commodityId;
					data["commodity"] = specificationsData.materialsCommodity.commodity;
					data["measurementUnit"] = specificationsData.firstUnitConversion;
					data["specifications"] = specificationsData.specifications;
					data["specificationsId"] = specificationsData.specificationsId;
					data["mnemonics"] = specificationsData.mnemonics;
					data["unitConversion"] = specificationsData.secondUnitConversion;
					data["convertedQuantity"] = specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			for (var i = 0; i < leasedLostCompensationData.result.length; i++) {
				var receiptDate = leasedLostCompensationData.result[i].compensationDate;
				var relateSerial = leasedLostCompensationData.result[i].lostSerial;
				var days = parseInt(((new Date(endDate)).getTime() - (new Date(receiptDate)).getTime()) / (1000 * 60 * 60 * 24));
				if (settlement == "0" || settlement == "1") {
					days+=1
				}
				if (settlement == "2") {
					days+=2
				}
				var receiptType = "租借丢失赔偿";
				for (var d = 0; d < leasedLostCompensationData.result[i].leasedLostCompensationDetailSet.length; d++) {
					var data = leasedLostCompensationData.result[i].leasedLostCompensationDetailSet[d];
					var specifications = $ajaxSyncCall(__ctxPath + "/materials/loadMaterialsSpecifications.do", {
						specificationsId : data.specificationsId
					});
					var specificationsData = specifications.data[0];
					var dailyRent = this.searchDailyRent(this.data,specificationsData);
					data["startDate"] = startDate;
					data["endDate"] = endDate;
					data["days"] = Math.abs(days);
					data["receiptDate"] = receiptDate;
					data["receiptType"] = receiptType;
					data["relateSerial"] = relateSerial;
					data["quantity"] = data.lostQuantity;
					data["dailyRent"] = dailyRent;
					data["beginDate"] = receiptDate;
					data["commodityId"] = specificationsData.materialsCommodity.commodityId;
					data["measurementUnit"] = specificationsData.firstUnitConversion;
					data["mnemonics"] = (typeof(specificationsData.mnemonics) == undefined) ? "" : specificationsData.mnemonics;
					data["unitConversion"] = (typeof(specificationsData.secondUnitConversion) == undefined) ? "" : specificationsData.secondUnitConversion;
					data["convertedQuantity"] = (typeof(specificationsData.secondConvertedQuantity) == undefined) ? "" : specificationsData.secondConvertedQuantity;
					datas.push(data);
				}
			}
			this.sortDatas(datas);
			for(var m=0;m<datas.length;m++) {
				grid.addSubModuleDate(datas[m]);
			}
		}
	},
	saveFormData : function() {
		if (!Ext.isEmpty(this.settlementId)) {
			var startDate = new Date(Ext.getCmp('startDate').getValue()).format('Y-m-d H:i:s');
			var endDate = new Date(Ext.getCmp('endDate').getValue()).format('Y-m-d H:i:s');
			if (startDate > endDate) {
				$toast("截止日期不能小于起始日期！");
				return;
			}
		} else {
			var startDate = this.getForm().findField("leaseSettlement.startDate").value;
			var endDate = this.getForm().findField("leaseSettlement.endDate").value;
			if (new Date(startDate).format('Y-m-d H:i:s') > new Date(endDate).format('Y-m-d H:i:s')) {
				$toast("截止日期不能小于起始日期！");
				return;
			}
		}
		
		var total = this.settlementListGrid.accumulationAmount();
		var totalLost = this.leasedLostDetailGrid.accumulationAmount();
		var totalOther = this.leaseOtherBusinessDetailGrid.accumulationAmount();
		var totalBlockup = this.leaseSettlementBlockUpGrid.accumulationAmount();
		// 由于IEEE 754 标准限制，必须将对浮点运算进行处理
		var amount = ( Number(total+totalOther+totalLost-totalBlockup) * 10e5) / 10e5;
		this.setFieldRawValue("currentSettlementAmount", amount.toFixed(2));
		
		var insideTotal = this.insideSettlementListGrid.accumulationAmount();
		var insideTotalBlockup = this.leaseSettlementInsideBlockUpGrid.accumulationAmount();
		var insideAmount = (Number(insideTotal-insideTotalBlockup) * 10e5) / 10e5;
		this.setFieldRawValue("insideSettlementAmount",insideAmount.toFixed(2));
		
		this.setFieldValue("settlementLists", $gridstore2json(this.settlementListGrid));
		this.setFieldValue("insideSettlementLists", $gridstore2json(this.insideSettlementListGrid));
		this.setFieldValue("leasedLostDetails", $gridstore2json(this.leasedLostDetailGrid));
		this.setFieldValue("leaseOtherBusinessDetails", $gridstore2json(this.leaseOtherBusinessDetailGrid));
		this.setFieldValue("leaseSettlementBlockUps", $gridstore2json(this.leaseSettlementBlockUpGrid));
		this.setFieldValue("leaseSettlementInsideBlockUps", $gridstore2json(this.leaseSettlementInsideBlockUpGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitLeaseSettlement.do", resp.applyforId);
			} else if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.settlementId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLeaseSettlement.do?settlementId=" + this.settlementId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("leaseType", data.leaseTypeName);
					this.setFieldRawValue("settlement", data.settlementName);
					this.setFormSubModuleGrid(data.settlementListSet, this.settlementListGrid);
					this.setFormSubModuleGrid(data.leasedLostDetailSet, this.leasedLostDetailGrid);
					this.setFormSubModuleGrid(data.insideSettlementListSet, this.insideSettlementListGrid);
					this.setFormSubModuleGrid(data.leaseOtherBusinessDetailSet, this.leaseOtherBusinessDetailGrid);
					this.setFormSubModuleGrid(data.leaseSettlementBlockUpSet, this.leaseSettlementBlockUpGrid);
					this.setFormSubModuleGrid(data.leaseSettlementInsideBlockUpSet, this.leaseSettlementInsideBlockUpGrid);
				
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			var fieldNames = ["leaseContract.leaseId", "leaseContract.leaseIdentifier", "leaseContract.contractAmount", 
				"project.projectId", "project.projectName", "tenantry", "lessor", "settlement","leaseContract.depName"];
			var values = [this.data.leaseId, this.data.leaseIdentifier, this.data.contractAmount,
				this.data.project.projectId, this.data.project.projectName, this.data.lesseeUnit,
				this.data.leaseUnit, this.data.accountingMethod,this.data.depName];
			this.setMultiFieldValue(fieldNames, values);
			var alreadySettlementAmount = this.getAlreadySettlementAmount(this.data.leaseId)
			this.setFieldValue("alreadySettlementAmount",alreadySettlementAmount);
		}
	},
	
	searchDailyRent : function(leaseContract,specifications) {
		var set = leaseContract.leasePriceSettingSet;
		var count = leaseContract.leasePriceSettingSet.length;
		for(var i=0;i<count;i++) {
			if(specifications.specificationsId==set[i].specificationsId) {
				return set[i].dailyRent;
			} 
		}
		return null;
	},
	//排序
	sortDatas : function(datas) {
		var temp = null;
		for(var i=0;i<datas.length-1;i++) {
			for(var j=0;j<datas.length-1-i;j++) {
				if(datas[j].specificationsId>datas[j+1].specificationsId) {
					temp = datas[j];
					datas[j] = datas[j+1];
					datas[j+1]=temp;
				}
			}
		}
	},
	getAlreadySettlementAmount : function(leaseId) {
		var data = $ajaxSyncCall(__ctxPath + "/materials/listLeaseSettlement.do", {
			"Q_status_S_EQ" : 3,
			"Q_leaseContract.leaseId_L_EQ" : leaseId
			});
		var amount =0;
		for(var i=0;i<data.result.length;i++) {
			amount += Number(data.result[i].currentSettlementAmount);
		}
		return amount;
	},
	
	//加载租借丢失清单
	loadLeasedLostDetail : function() {
		var startDate = this.getFieldValue("startDate");
		var endDate = this.getFieldValue("endDate");
		var leaseId = this.data==null? this.leaseContract.leaseId : this.data.leaseId;
		if(startDate==''||endDate=='') {
			$toast("请先选择时间区间！");
			return;
		}
		if(leaseId==null) {
			$toast("获取不到租借合同ID，请联系管理员");
			return;
		}
		$request({
			url : __ctxPath + "/materials/detailListLeasedLostCompensation.do",
			params : {
				leaseId : leaseId,
				startDate : startDate,
				endDate : endDate
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.result;
				for(var i=0;i<data.length;i++) {
					this.leasedLostDetailGrid.addSubModuleDate(data[i]);
				}
			}.createDelegate(this)
		});
	},
	//加载内部结算清单
	loadInsideSettlementList : function() {
		if(this.settlementListGrid.getStore().getCount()==0) {
			$toast("请先加载租借清单");
			return;
		}
		//清空
		this.insideSettlementListGrid.getStore().removeAll();
		// 获取“内部” 日租金
		var materialsCommoditys = $ajaxSyncCall(__ctxPath + "/materials/listMaterialsCommodity.do", {});
		var dailyRentData = materialsCommoditys.result;
		
		var store = this.settlementListGrid.getStore();
		var count = store.getCount();
		for(var i=0;i<count;i++) {
			var data = {};
			Ext.apply(data,store.getAt(i).data);
			for(var j=0;j<dailyRentData.length;j++) {
				if(dailyRentData[j].commodityId == data.commodityId) {
					data.dailyRent = dailyRentData[j].dailyRent;
					this.insideSettlementListGrid.addSubModuleDate(data);
				}
			}
		}
	},
	//加载租借报停清单+内部报停清单
	loadLeaseBlockUpDetail : function() {
		var startDate = this.getFieldValue("startDate");
		var endDate = this.getFieldValue("endDate");
		var leaseId = this.data==null? this.leaseContract.leaseId : this.data.leaseId;
		if(startDate==''||endDate=='') {
			$toast("请先选择时间区间！");
			return;
		}
		if(leaseId==null) {
			$toast("获取不到租借合同ID，请联系管理员");
			return;
		}
		$request({
			url : __ctxPath + "/materials/getLeaseBlockUpDetailLeaseSettlement.do",
			params : {
				leaseId : leaseId,
				startDate : startDate,
				endDate : endDate
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.result;
				for(var i=0;i<data.length;i++) {
					this.leaseSettlementBlockUpGrid.addSubModuleDate(data[i]);
					this.leaseSettlementInsideBlockUpGrid.addSubModuleDate(data[i]);
				}
			}.createDelegate(this)
		});
	},
	//加载其他业务清单
	loadOtherLeaseBusinessDetail : function() {
		var startDate = this.getFieldValue("startDate");
		var endDate = this.getFieldValue("endDate");
		var leaseId = this.data==null? this.leaseContract.leaseId : this.data.leaseId;
		if(startDate==''||endDate=='') {
			$toast("请先选择时间区间！");
			return;
		}
		if(leaseId==null) {
			$toast("获取不到租借合同ID，请联系管理员");
			return;
		}
		$request({
			url : __ctxPath + "/materials/getOtherFeeLeaseSettlement.do",
			params : {
				leaseId : leaseId,
				startDate : startDate,
				endDate : endDate
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.result;
				this.leaseOtherBusinessDetailGrid.getStore().removeAll();
				for(var i=0;i<data.length;i++) {
					this.leaseOtherBusinessDetailGrid.addSubModuleDate(data[i]);
				}
			}.createDelegate(this)
		});
	},
	queryLeaseBlockUpDetail : function() {
		var startDate = new Date(this.getFieldValue('startDate')).format('Y-m-d');
		var endDate = new Date(this.getFieldValue('endDate')).format('Y-m-d');
		var data = [];
		var params ={};
		params.startDate=startDate;
		params.endDate=endDate;
		params.leaseId=this.leaseContract!=null?this.leaseContract.leaseId : this.data.leaseId;
//		params.tranportCaculateType= this.tranportCaculateType;
		data.params = params;
//		data.backOff = backOff;
		this.leaseSettlementBlockUpGrid.queryDetail(data);
	},
	queryInsideBlockUpDetail : function() {
		var startDate = new Date(this.getFieldValue('startDate')).format('Y-m-d');
		var endDate = new Date(this.getFieldValue('endDate')).format('Y-m-d');
		var data = [];
		var params ={};
		params.startDate=startDate;
		params.endDate=endDate;
		params.leaseId=this.leaseContract!=null?this.leaseContract.leaseId : this.data.leaseId;
//		params.tranportCaculateType= this.tranportCaculateType;
		data.params = params;
//		data.backOff = backOff;
		this.leaseSettlementInsideBlockUpGrid.queryDetail(data);
	}
})