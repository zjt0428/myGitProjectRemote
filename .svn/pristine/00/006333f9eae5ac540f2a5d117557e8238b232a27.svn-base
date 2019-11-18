var InstallFeeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	var relation = this.relation;
	this.currentDate = new Date();
	var tempTag="";
	var installFeeData;
	var equipSpecificName = this.equipSpecificName
//	var belongToArea = this.belongToArea
	var contractId = this.contractId;
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
			readOnly : true
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
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
				record.data.feesType = index;
			}
			record.data.feesTypeName = value;
			installFeeData = $ajaxSyncCall(__ctxPath + "/equip/listInstallPriceSet.do",{
				"Q_contractId_L_EQ":contractId,
				"Q_equipSpecificName_S_EQ" :equipSpecificName,
//				"Q_belongToAreaName_S_EQ":belongToArea,
				"Q_installDismantleTypeName_S_EQ":value
				
			});
			
			return value;
		}
	},{
		header : "计量单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			if(installFeeData.result.length>0){
				value = installFeeData.result[0].measurementUnit;
			}
			record.data.unit = value;
			return value;
		}
	},{
		header : "数量",
		dataIndex : "number",
		editor : new Ext.form.NumberField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			var feesType = record.data.feesType;
			if(value==null || value==""){
				value = 0;
			}
			record.data.number = value;
			return value;
		}
	},{
		header : "项目单价",
		dataIndex : "projectPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record,rowIndex,colIndex,store) {
			if(installFeeData.result.length>0){
				if(tempTag==record.data.feesTypeName && value !=0){
					return value;
				}else{
					value = installFeeData.result[0].projectPrice;
				}
			}
			tempTag = record.data.feesTypeName;
			record.data.projectPrice = value;
			installFeeData = [];
			return value;
		},
	 listeners: {
	        quit: function(a) {
	            alert(" has quit!");
	        }
	 }
	},{
		header : "费用小计",
		dataIndex : "chargesSubtotal",
		editor : new Ext.form.NumberField({
			allowBlank : false,
		}),
		renderer : function(value, metadata, record) {
			var number = record.data.number;
			var projectPrice = record.data.projectPrice;
			value = number * projectPrice;
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
	InstallFeeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : InstallFeeListViewField,
		title : "安装费用",
		option : "安装费用",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelInstallFee.do"
	}, this.grid_config || {}));
};
Ext.extend(InstallFeeGrid, Knight.ux.SubModuleBaseGrid, {
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
	createSubModule : function() {
		return {
			installId : this.installId,
			startTime : this.currentDate,
			unit : "",
			projectPrice :0,
			chargesSubtotal:0,
			equipSpecificName : this.equipSpecificName
		};
	},
	caculateCounts : function (a){
		var type =  typeof(a);
		if(type == "string"){
			
		}
		
	}
	
});
