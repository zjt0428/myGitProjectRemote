var AutocraneUnitGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	this.currentDate = new Date();
	var tempTag="";
	var equipSpecific = this.equipSpecific;
//	var belongToArea = this.belongToArea;
	var truckCraneData ;
	var columns = [{
		header : "汽吊型号",
		dataIndex : "truckCraneSpecific",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.truckCraneSpecificData
		}),
		
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			truckCraneData = $ajaxSyncCall(__ctxPath + "/equip/listTruckCranePrice.do",{
				"Q_truckCraneSpecific_S_EQ":value
//				"Q_belongToArea_S_EQ":belongToArea
			});
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.truckCraneSpecific = value;
			return value;
		}
	},{
		header : "数量",
		dataIndex : "number",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 9
		})
	},{
		header : "台班",
		dataIndex : "machineTeam",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 9
		})
	},{
		header : "汽吊单位",
		dataIndex : "autocraneUnit",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.autocraneUnitData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.autocraneUnit = index;
			}
			record.data.autocraneUnit = value;
			
			return value;
		}
	},{
		header : "班组单价",
		dataIndex : "teamPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
				if(truckCraneData.result.length>0){
					if(tempTag==record.data.truckCraneSpecific && value !=0){
						return value;
					}else{
						value = truckCraneData.result[0].teamPrice;
					}
				}
			tempTag = record.data.truckCraneSpecific;
			record.data.teamPrice = value;
			return value;
		}
	},{
		header : "金额小计",
		dataIndex : "chargesSubtotal",
		editor : new Ext.form.TextField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			var number = record.data.number;
			var machineTeam = record.data.machineTeam;
			var teamPrice = record.data.teamPrice;
			value = number * machineTeam * teamPrice;
			if(!Ext.isNumber(value)){
				return value = 0;
			}
			record.data.chargesSubtotal = value;
			return value;
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
			allowBlank : true,
		})
	} ];
	AutocraneUnitGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : AutocraneUnitListViewField,
		title : "汽吊单位",
		option : "汽吊单位",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelAutocraneUnit.do"
	}, this.grid_config || {}));
};
Ext.extend(AutocraneUnitGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModule : function (a){
		var type =  typeof(a);
		if(type == "string"){
			var d = JSON.parse(a)
			for(var i = 0;i<d.length;i++){
				this.addRecordHeight(1);
				var SubModuleType = this.getStore().recordType;
				var subRecord = new SubModuleType();
				Ext.apply(subRecord.data, this.createSubModule());
				subRecord.data.chargesSubtotal = d[i].chargesSubtotal;
				subRecord.data.machineTeam = d[i].machineTeam;
				subRecord.data.number = d[i].number;
				subRecord.data.truckCraneSpecific = d[i].truckCraneSpecific;
				this.getStore().add(subRecord);
			}
			this.startEditing(this.store.data.items.length-1,2);
		}else{
			this.addRecordHeight(1);
			var SubModuleType = this.getStore().recordType;
			var subRecord = new SubModuleType();
			Ext.apply(subRecord.data, this.createSubModule());
			this.getStore().add(subRecord);
			this.startEditing(this.store.data.items.length-1,2);
		}
		
	},
	createSubModule : function() {
		return {
			installId : this.installId,
			startTime : this.currentDate,
			number : 1,
			machineTeam : 1
		};
	}
});
