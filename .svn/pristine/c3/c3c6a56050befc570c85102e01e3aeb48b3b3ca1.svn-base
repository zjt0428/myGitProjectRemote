var InstallDismantelTeamGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	this.currentDate = new Date();
	var tempTag="";
	var equipSpecificName = this.equipSpecificName
	var equipSpecific = this.equipSpecific;
//	var belongToArea = this.belongToArea;
	var dismantlePriceData ;
	this.dateFieldId = Ext.id();

	var tbarItems = [];
	if(this.saveable) {
		tbarItems =[{
			id : this.dateFieldId,
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			value : new Date()
		}, {
			iconCls : "btn-mail_move",
			xtype : "button",
			text : "同步",
			handler : this.syncTime.createDelegate(this)
		}];
	}
	
	var columns = [{
		header : "设备型号",
		dataIndex : "equipSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			return record.data.equipSpecificName;
		}
	},{
		header : "收费类型",
		dataIndex : "feesTypeName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.installFeeTypeData
		}),
		renderer : function(value, metadata, record) {
			dismantlePriceData = $ajaxSyncCall(__ctxPath + "/equip/listInstallDismantlePrice.do",{
				"Q_installDismantleType_S_EQ" : value,
//				"Q_belongToArea_S_EQ":belongToArea,
				"Q_equipSpecific_S_EQ" : equipSpecific,
				
			});
			if(record.data.feesType ==null){
				value = Ext.isEmpty(value) ? this.getEditor().value : value;
			}
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.feesType = index;
			}
			record.data.feesTypeName = value;
			return value;
		}
	},{
		header : "计量单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			if(dismantlePriceData.result.length>0){
				value = dismantlePriceData.result[0].measurementUnit;
			}
			record.data.unit = value;
			return value;
		}
	},{
		header : "数量",
		dataIndex : "number",
		editor : new Ext.form.TextField({
			allowBlank : false,
		})
	},{
		width : 150,
		header : "安拆班组",
		dataIndex : "insDisTeam",
		editor : new Knight.ux.TreeCombo({
			url : __ctxPath + "/system/listDepartment.do"
		}),
		renderer : function(value, metadata, record) {
			if (value == undefined) {
				return;
			}
			record.data.insDisTeam = value;
			return value;
		}
	},{
		header : "班组单价",
		dataIndex : "teamPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			if(dismantlePriceData.result.length>0){
				if(tempTag==record.data.feesTypeName && value !=0){
					return value;
				}else{
					value = dismantlePriceData.result[0].teamPrice;
				}
			}
			tempTag = record.data.feesTypeName;
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
			var teamPrice = record.data.teamPrice;
			value = number * teamPrice;
			if(!Ext.isNumber(value)){
				return value = 0;
			}
			record.data.chargesSubtotal = value
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
	InstallDismantelTeamGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : InstallDismantelTeamListViewField,
		title : "安拆班组",
		option : "安拆班组",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelInstallDismantelTeam.do"
	}, this.grid_config || {}));
};
Ext.extend(InstallDismantelTeamGrid, Knight.ux.SubModuleBaseGrid, {
	syncTime : function() {
		var s = this.getSelectionModel().getSelections();
		var date = Ext.getCmp(this.dateFieldId).getValue();
		if(s.length>0) {
			for(var i=0;i<s.length;i++) {
				var record = s[i];
				record.set("startTime",date);
				record.commit();
			}
		}else {
			var count = this.getStore().getCount();
			for(var i=0;i<count;i++) {
				var record = this.getStore().getAt(i);
				record.set("startTime",date);
				record.commit();
			}
		}
	},
	addSubModule : function (a){
		var type =  typeof(a);
		if(type == "string"){
			var d = JSON.parse(a)
			for(var i = 0;i<d.length;i++){
				this.addRecordHeight(1);
				var SubModuleType = this.getStore().recordType;
				var subRecord = new SubModuleType();
				Ext.apply(subRecord.data, this.createSubModule());
				subRecord.data.equipSpecificName = d[i].equipSpecificName;
				subRecord.data.feesTypeName = d[i].feesTypeName;
				subRecord.data.unit = d[i].unit;
				subRecord.data.number = d[i].number;
				subRecord.data.chargesSubtotal = d[i].chargesSubtotal;
				subRecord.data.feesType = d[i].feesType;
				this.getStore().add(subRecord);
			}
			this.startEditing(this.store.data.items.length-1,2);
		}else{
			this.addRecordHeight(1);
			var SubModuleType = this.getStore().recordType;
			equipSpecificName : this.equipSpecificName;
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
			equipSpecificName : this.equipSpecificName,
			number : 1
		};
	}
});
