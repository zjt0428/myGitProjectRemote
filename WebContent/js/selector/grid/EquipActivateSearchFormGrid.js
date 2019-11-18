var EquipActivateSearchFormGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {};
	this.params.Q_projectName_S_LK = a.parentForm.result[0].projectName;
	this.params.Q_applyforState_S_EQ = "3"
	Ext.apply(this.params, (a && a.params) || {});
	this.carTextFieldId = Ext.id();
	this.driverTextFieldId = Ext.id();
	this.linktelTextFieldId = Ext.id();
	
	
	this.tbarItems = [ "-", {
		xtype : "label",
		style : "margin:1px 0px 0px 5px;",
		html : "项目名称:"
	},{
		id : this.carTextFieldId,
		style : "margin:1px 0px 0px 5px;",
		xtype : "textfield",	
		width : 90
	},{
		xtype : "label",
		style : "margin:1px 0px 0px 5px;",
		html : "发货时间:"
	},{
		id : this.linktelTextFieldId,
		editable : false,
		xtype : "datefield",
		format : "Y-m-d"	
	},{
		xtype : "label",
		style : "margin:1px 0px 0px 5px;",
		html : "至:"
	},{
		id : this.driverTextFieldId,
		editable : false,
		xtype : "datefield",
		format : "Y-m-d"
	},{
		xtype : "button",
		disabled : !this.saveable,
		style : "margin:1px 0px 0px 1px;",
		autoWidth : true,
		iconCls : "btn-search",
		handler : this.importCarArchives.createDelegate(this)
	} ];
	
	var actionItems = [];

	actionItems.push({
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.fulfilDispatchPracti
	});

	var columns = [ {
		header : "审批状态",
		dataIndex : "applyforState",
		renderer : function(n) {
			switch (n) {
			case "0":
				return "待提交"
				break;
			case "1":
				return "待审核"
				break;
			case "2":
				return "待审批"
				break;
			case "3":
				return "审批通过"
				break;
			}
		}
	}, {
		header : "物流单号",
		dataIndex : "transportSerial"
	}, {
		header : "发货主题",
		dataIndex : "shipmentsTheme"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "收货地址",
		dataIndex : "address"
	}, {
		header : "发货仓库",

		dataIndex : "deliveryEntName"
	}, {
		header : "发货时间",
		dataIndex : "deliveryDate"
	}, {
		header : "备注",
		dataIndex : "remark"
	} ];

	EquipActivateSearchFormGrid.superclass.constructor.call(this, Ext.apply({
		selectable : this.selectable,
		fields : LogisticsTransportListViewField,
		title : "现场装车查询",
		option : "现场装车查询",
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : this.tbarItems,
		loadurl : __ctxPath +"/dispatch/listLogisticsTransport.do",	
		base_params : this.params,	
		height : this.height,
		bbar:true,
		columns : columns,
		enableRowBody : false,
		showPreview : false,
	}, this.grid_config || {}));
};

Ext.extend(EquipActivateSearchFormGrid, Knight.ux.SubModuleBaseGrid, {
	fulfilDispatchPracti : function(data, grid, action, rowIndex) {
		new LogisticsTransportForm(data, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();

	},
	createSubModule : function() {

	}, 
	importCarArchives : function() {
		var projectName = Ext.getCmp(this.carTextFieldId).getValue();
		var deliveryDate = Ext.getCmp(this.linktelTextFieldId).getValue();
    	var deliveryDaten = Ext.getCmp(this.driverTextFieldId).getValue();
		$request({
			url : __ctxPath + "/dispatch/listLogisticsTransport.do",
			waitMsg : "正在载入数据...",
			params : {
				Q_projectName_S_LK : projectName,
				Q_deliveryDate_S_GE : deliveryDate,
				Q_deliveryDate_S_LE : deliveryDaten
				}, 
			success : function(b,c) {
				var store = this.getStore().data;
				if(store.length>0){
					store.clear();
				}
				var data = Ext.util.JSON.decode(b.responseText);
				for(var i = 0 ;i< data.result.length;i++){
					this.addSubModuleDate(data.result[i]);
				}
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
		}
		})
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			applyforState : data.applyforState,
			transportSerial : data.transportSerial,
			projectName : data.projectName,
			address : data.address,
			deliveryEntName: data.deliveryEntName,
			deliveryDate: data.deliveryDate,
			transportId:data.transportId
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	}
});

