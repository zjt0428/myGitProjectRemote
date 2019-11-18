/**
 * <pre><code>
 * saveable : Boolean,
 * height : Number,
 * contractId : Number,
 * rentStandardData : Array,
 * measurementData : Array
 * </code></pre>
 */
var SettleComponBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();

	var columns = [ {
		width : 50,
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "零配件类别",
		dataIndex : "componCategoryName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
		})
	}, {
		header : "设备型号",
		dataIndex : "componSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
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
		width : 70,
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
        width : 50,
        renderer : function(v, p, record){
        	if(record.data.buildingNum == "小计"){
        		return null;
        	}
    		p.css += ' x-grid3-check-col-td';
    		if(v){
    			record.data.summary = record.data.rentStandard*record.data.quantity-record.data.deductRent;
    			v = '-on';
    		}else{
    			record.data.summary = ""
    				v = '';
    		}
    		return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
        }
    }, {
		width : 80,
		header : "租金标准",
		dataIndex : "rentStandard",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.rentStandardData
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
			record.data.rentStandard = value;
			return value;
		}
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
		width : 70,
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
			maxLength : 6
		}),
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			value = Ext.isEmpty(value) ? 0 : value;
			record.data.deductRent = value;
			return value;
		}
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			if(record.data.buildingNum == "小计"){
				return null;
			}
			if(!record.data.monthTag){
				var summary = 0;
				//日租金
				var daysRent = record.data.daysRent;
				//计费天数
				var settleDays = record.data.settleDays;
				//租赁数量
				var quantity = record.data.quantity;
				summary = daysRent*settleDays*quantity;
				record.data.summary = summary;
				this.parentForm.settleAmountLoad();
				return summary;
			}
            return value;
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
		width : 80,
		header : "零配件编号",
		dataIndex : "componSerial",
		editor : new Ext.form.TextField({
			width : 70,
			readOnly : true
		})
	}, {
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		header : "设备自编号",
		dataIndex : "equipSerial"
	}, {
		header : "设备类别",
		dataIndex : "equipCategoryName"
	}, {
		header : "设备型号",
		dataIndex : "equipSpecificName"
	}, {
		header : "出厂编号",
		dataIndex : "exwSerial"
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if (this.saveable && this.contractId) {
		this.tbarItems = [ {
//			hidden : true,
            iconCls : "btn-head-add",
            text : "新增",
            handler : this.addSubModule.createDelegate(this)
        }, {
            iconCls : "btn-head-del",
            text : "删除",
            handler : this.delSubModule.createDelegate(this)
        }, {
			iconCls : "btn-head-import",
			text : "导入配件",
			handler : this.importComponResource.createDelegate(this)
		}, {
			iconCls : "btn-loading",
			text : "导入设备",
			handler : this.loadEquipmentResource.createDelegate(this)
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
	SettleComponBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : SettleComponBriefListViewField,
		title : "加节费用清单",
		option : "零配件",
        addForbidden : true,
        delForbidden : true,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelComponBriefSettleContract.do"
	}, this.grid_config || {}));
};
Ext.extend(SettleComponBriefGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var startSettleDate = this.parentForm.getForm().findField("settleContract.startSettleDate").getValue();
		var endSettleDate = this.parentForm.getForm().findField("settleContract.endSettleDate").getValue();
		var parentTaxRate = this.parentForm.getFieldValue("taxRate");
		if(parentTaxRate=="" || parentTaxRate==undefined){
			$toast("请先选择税率!");
			return;
		}
		this.addHeight(recordHeight);
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
		Ext.apply(subModule.data, {
			componDiaryId : data.componDiaryId,
			componId : data.componId,
			componSerial : data.componSerial,
			componCategoryName : data.componCategoryName,
			componSpecificName : data.componSpecificName,
			unit : "台",
			startSettleDate : startSettleDate,
			endSettleDate : endSettleDate,
			quantity : 0,
			deductRent : 0,
			taxRate : parentTaxRate
		});
		this.stopEditing();
		this.getStore().add(subModule);
		this.startEditing(0, 0);
	},
	importComponResource : function() {
		new ComponentSelector({
			params : {
				"Q_storeId_L_NULL" : 1
			},
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					this.loadResource(d[i].data);
				}
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
			componCategoryName : "品名",
			componSpecificName : "规格",
			unit : "台",
			startSettleDate : startSettleDate,
			endSettleDate : endSettleDate,
			quantity : 0,
			deductRent : 0,
			taxRate : parentTaxRate
		};
	},
	loadEquipmentResource : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要结算的配件信息！");
			return;
		}
		var SubModule = this.getStore().recordType;
		var subModule = new SubModule();
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
					a[i].set("equipSerial", d[0].get("equipSerial"));
					a[i].set("exwSerial", d[0].get("equipSerial"));
					a[i].set("equipCategoryName",  d[0].get("equipCategoryName"));
					a[i].set("equipSpecificName",  d[0].get("equipSpecificName"));
					a[i].set("contractId",  d[0].get("contractId"));
				}
				
//				Ext.apply(subModule.d, {
//					equipId : d[0].get("equipId"),
//					recordId : d[0].get("recordId"),
//					quantity : null,
//					deductRent : null,
//					summary : null,
//					preTaxAmount : null,
//					afterTaxAmount : null,
//					taxes : null,
//					startSettleDate : new Date(),
//					endSettleDate : new Date()
//				});
//				this.getStore().add(subModule);
			}.createDelegate(this)
		}).show();
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
		var preTaxAmountData = 0;//含税金额
		var afterTaxAmountData =0;//不含税金额
		var taxesData = 0;//税金
		
		for(var i=0;i<store.getCount();i++){
			preTaxAmountData += Number(store.getAt(i).data.preTaxAmount);
			afterTaxAmountData += Number(store.getAt(i).data.afterTaxAmount);
			taxesData += Number(store.getAt(i).data.taxes);
		}
		var a = {
			"buildingNum" : '小计',
			"startSettleDate" : null,
			"endSettleDate" : null,
			"quantity" : null,
			"deductRent" : null,
			"summary" : null,
			"preTaxAmount" : preTaxAmountData,
			"afterTaxAmount" : afterTaxAmountData,
			"taxes" : taxesData,
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
				}
			}.createDelegate(this)
		}).show();
	},
	synchronize : function() {
		this.parentForm.synchronizeDate(this);
	}
});