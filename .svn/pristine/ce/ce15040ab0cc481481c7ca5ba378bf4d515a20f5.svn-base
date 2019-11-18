var AutocraneFeeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	var realtion = this.relation;
	this.currentDate = new Date();
	var tempTag="";
	var autocraneFeeData;
	var equipSpecificName = this.equipSpecificName
//	var belongToArea = this.belongToArea
	var contractId = this.contractId;
	
	var columns = [{
		header : "汽吊型号",
		dataIndex : "truckCraneSpecific",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.truckCraneSpecificData
		}),
		renderer : function(value, metadata, record) {
			
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.truckCraneSpecific = value;
			autocraneFeeData = $ajaxSyncCall(__ctxPath + "/equip/listTruckCranePriceSet.do",{
				"Q_truckCraneSpecificName_S_EQ":value,
//				"Q_belongToAreaName_S_EQ":belongToArea,
				"Q_contractId_L_EQ":contractId
			});
			return value;
		}
	},{
		header : "数量",
		dataIndex : "number",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxLength : 9
		})
	},{
		header : "台班",
		dataIndex : "machineTeam",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxLength : 9
		})
	},{
		header : "项目单价",
		dataIndex : "projectPrice",
		editor : new Ext.form.TextField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
				if(autocraneFeeData.result.length>0){
					if(tempTag==record.data.truckCraneSpecific && value !=0){
						return value;
					}else if(tempTag!=""){
						value = autocraneFeeData.result[0].projectPrice;
					}
			}
			tempTag = record.data.truckCraneSpecific;
			record.data.projectPrice =value;
			return value;
		}
	},{
		header : "金额小计",
		dataIndex : "chargesSubtotal",
		editor : new Ext.form.TextField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			record.data.chargesSubtotal = record.data.projectPrice*record.data.machineTeam * record.data.number;
			return record.data.chargesSubtotal;
		}
	},{
		header : "发生时间",
		dataIndex : "startTime",
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
			record.data.startTime = value;
			return value;
		}
	},{
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	} ];
	AutocraneFeeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : AutocraneFeeListViewField,
		title : "汽吊费用",
		option : "汽吊费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelAutocraneFee.do"
	}, this.grid_config || {}));
};
Ext.extend(AutocraneFeeGrid, Knight.ux.SubModuleBaseGrid, {

	createSubModule : function() {
		this.relation = this.relation;
		return {
			installId : this.installId,
			startTime : this.currentDate,
			number : 1,
			machineTeam : 1,
			projectPrice :0,
			chargesSubtotal:0
		};
	}
	
});
