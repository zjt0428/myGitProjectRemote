/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * contractId : Number,
 * measurementData : Array
 * </code></pre>
 */
var ContractEquipBriefsGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var arr = this.equipSpecificData.result;
	this.equipSpecificArr = [];
	for (var i =0;i< arr.length;i++){
		var a = [];
		a.push(arr[i].code);
		a.push(arr[i].value);
		this.equipSpecificArr.push(a);
	}
	
	var grid = this;
	var columns = [{
		header : "状态",
		dateIndex : "dispatchable",
		renderer : function(value,metadata,record){
			if(record.data.dispatchable == "0"){
				return value = "未发货";
			}else{
				return value = "已发货"
			}
		}
	},{
		width : 100,
		header : "设备名称",
		dataIndex : "equipGeneric",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipGenericData,
			editable : false
		}),
		renderer : function(value, metadata, record, rowIndex, colIndex) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			var  newEquipSpecificData=[];
			//获取【规格型号】下拉框
			var  equipSelect=grid.getColumnModel().getCellEditor(3,rowIndex);
			if(!Ext.isEmpty(this.getEditor().value) && index != -1){
				newEquipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listEquipSpecificCode.do", {
					codeId : this.getEditor().value
				});
				if(grid.saveable) {
					equipSelect.field.getStore().loadData(newEquipSpecificData);
				}
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.equipGeneric = value;
			return value;
		}
	},{
		header : "规格型号",
		dataIndex : "equipSpecificName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.equipSpecificData,
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
//				$toast("设备已发货，无法修改！")
				value = record.json.equipSpecificName;
			}
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				record.data.equipSpecific = value;
				value = store.getAt(index).data.name;
			}
			record.data.equipSpecificName = value;
			return value;
		}
	}, {
		width : 40,
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 6,
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				value = record.json.unit;
				record.data.unit = value;
				return value;
			}else{
				return value;
			}
		}
	}, {
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
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.startDate = record.json.startDate;
				return record.json.startDate;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startDate = value;
			return value;
		}
	}, {
		header : "预计退场时间",
		dataIndex : "endDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.endDate = record.json.endDate;
				return record.json.endDate;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endDate = value;
			return value;
		}
	}, {
		header : "首次安装高度",
		dataIndex : "initialHeight",
		editor : new Ext.form.NumberField({
			maxLength : 16
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.initialHeight = record.json.initialHeight;
				return record.json.initialHeight;
			}
			record.data.initialHeight = value;
			return value;
		}
	}, {
		header : "最终安装高度",
		dataIndex : "finalHeight",
		editor : new Ext.form.NumberField({
			maxLength : 16
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.finalHeight = record.json.finalHeight;
				return record.json.finalHeight;
			}
			record.data.finalHeight = value;
			return value;
		}
	}, {
		width : 80,
		header : "租用数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 99999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				if(Number(record.data.quantity) < Number(record.json.quantity)){
					$toast("已发货的设备数量不能大于当前数量")
					record.data.quantity = record.json.quantity;
					return record.json.quantity;
				}
			}
			record.data.quantity = value;
			return value;
		}
	}, {
		width : 80,
		header : "租金标准(元)",
		dataIndex : "rentStandard",
		editor : new Ext.form.NumberField({
			maxValue : 99999999
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.rentStandard = record.json.rentStandard;
				return record.json.rentStandard;
			}
			record.data.rentStandard = value;
			return value;
		}/*,
		renderer : function(value, metadata, record) {
			if(value == null){
				for(var i =0;i<arr.length;i++){
					if(arr[i].value == record.data.equipSpecificName){
						value = arr[i].aliasValue1;
						record.data.rentStandard = value;
						return value
					}
				}
			}
			record.data.rentStandard = value;
			return value;
		}*/
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
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				index = store.find("name", record.json.measurement);
				value = store.getAt(index).data.name;
			}
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.measurement = value;
			return value;
		}
	}, {
		width : 60,
		header : "租期",
		dataIndex : "tenancy",
		editor : new Ext.form.NumberField({
			maxLength : 3
		}),
		renderer : function(value, metadata, record) {
			if(record.data.ceBriefId != null && record.data.dispatchable != "0"){
				record.data.tenancy = record.json.tenancy;
				return record.json.tenancy;
			}
			record.data.tenancy = value;
			return value;
		}
	} ];
	this.tbarItems = this.tbarItems ? this.tbarItems : [];
	if(this.saveable && !this.delForbidden){
		this.tbarItems.push({
			iconCls : "btn-head-del",
			text : "删除2",
			handler : this.delSubModules.createDelegate(this)
		});
	}
	ContractEquipBriefsGrid.superclass.constructor.call(this, Ext.apply({
		delForbidden : true,
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ContractEquipBriefListViewField,
		title : "合同签订设备型号(不确定主机编号)",
		option : "合同设备类别",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipBriefContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractEquipBriefsGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			contractId : this.contractId,
			equipSpecificName : "规格/型号",
			startDate : this.currentDate,
			dispatchable : 0,
			approveable : 0
		};
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			contractId : this.contractId,
			startDate : data.startDate,
			endDate : data.endDate,
			equipSpecificName: data.equipSpecificName,
			equipGeneric: data.equipGeneric,
			dispatchable : 0
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	delSubModules : function(){
		if (!Ext.isEmpty(this.delurl)) {
			this.speciallyGridAction(this, this.fieldId, this.delurl, "删除", null, null, function() {
				var m = this.getSelectionModel().getSelections();
				this.subtractRecordHeight(m.length);
				for (var i = 0; i < m.length; i++) {
					if(m[i].data.dispatchable!="0"){
						Ext.Msg.alert("第[" + (i + 1) + "]条记录的设备已发货，无法删除!");
						return; 
					}
					this.stopEditing();
					this.getStore().remove(m[i]);
				}
				this.startEditing(0, 0);
			}.createDelegate(this));
		}
	}
});