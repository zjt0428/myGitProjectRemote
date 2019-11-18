/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * contractId : Number,
 * measurementData : Array
 * </code></pre>
 */
var ContractEquipBriefVersionGrid = function(a, b) {
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
			maxLength : 6
		})
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
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endDate = value;
			return value;
		}
	}, {
		header : "首次安装高度",
		dataIndex : "initialHeight",
		editor : new Ext.form.NumberField({
			maxLength : 16
		})
	}, {
		header : "最终安装高度",
		dataIndex : "finalHeight",
		editor : new Ext.form.NumberField({
			maxLength : 16
		})
	}, {
		width : 80,
		header : "租用数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 99999999
		})
	}, {
		width : 80,
		header : "租金标准(元)",
		dataIndex : "rentStandard",
		editor : new Ext.form.NumberField({
			maxValue : 99999999
		})/*,
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
		})
	} ];
	ContractEquipBriefVersionGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ContractEquipBriefVersionListViewField,
		title : "合同签订设备型号(不确定主机编号)",
		option : "合同设备类别",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipBriefContractLeaseVersion.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractEquipBriefVersionGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			contractId : this.contractId,
			equipSpecificName : "规格/型号",
			startDate : this.currentDate
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
			equipGeneric: data.equipGeneric
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	}
});