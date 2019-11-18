var ClosedSettleInfoGrid = function(a,b){
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {
		years : this.years,
		limit : 12
	};
	Ext.apply(this.params, (a && a.params) || {});
	this.yearsTextFieldId = Ext.id();
	this.tbarItems = [{
		xtype : "button",
		disabled : !this.saveable,
		style : "margin:1px 0px 0px 1px;",
		autoWidth : true,
		iconCls : "x-tbar-page-prev",
		listeners : {
			click : function(){
				var yearField = Ext.getCmp(this.yearsTextFieldId);
				yearField.setValue(yearField.getValue() == 0 ? 0 : parseInt(yearField.getValue())-1);
			}.createDelegate(this)
		}
	},{
		id : this.yearsTextFieldId,
		style : "margin:1px 0px 0px 5px;",
		xtype : "textfield",	
		width : 90,
		checked: true,
		emptyText : "请输入年份",
		value : new Date().getFullYear()
	},{
		xtype : "button",
		disabled : !this.saveable,
		style : "margin:1px 0px 0px 1px;",
		autoWidth : true,
		iconCls : "x-tbar-page-next",
		listeners : {
			click : function(){
				var yearField = Ext.getCmp(this.yearsTextFieldId);
				yearField.setValue(yearField.getValue() < 0 ? 0 : parseInt(yearField.getValue())+1);
			}.createDelegate(this)
		}
	},{
		xtype : "button",
		disabled : !this.saveable,
		style : "margin:1px 0px 0px 1px;",
		autoWidth : true,
		iconCls : "btn-search",
		handler : this.importCarArchives.createDelegate(this)
	}];
	var columns =[{
		header : "月份",
		dataIndex : "months"
	},{
		header : "关账状态",
		dataIndex : "closedStatus",
		renderer : function(n) {
			if(n==1){
				return "<font face='宋体' color='red'>关账</font>";
			}else{
				return "<font face='宋体'>未关账</font>";
			}
		}
	}];
	ClosedSettleInfoGrid.superclass.constructor.call(this,Ext.apply({
		title : "关账信息",
		selectable : false,
		fields : ClosedSettleInfoListViewField,
		tbarItems : this.tbarItems,
		loadurl : __ctxPath +"/dispatch/listClosedSettleInfo.do?limit=12",
		base_params : this.params,	
		height : this.height,
		bbar:false,
		columns : columns,
		enableRowBody : false,
		showPreview : false,
		checkOnly : false,
	},this.grid_config || {}));
};
Ext.extend(ClosedSettleInfoGrid,Knight.ux.SubModuleBaseGrid,{
	importCarArchives : function() {
		var years = Ext.getCmp(this.yearsTextFieldId).getValue();
		$request({
			url : __ctxPath + "/dispatch/listClosedSettleInfo.do",
			waitMsg : "正在载入数据...",
			params : {
				years : years,
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
			closedStatus : data.closedStatus,
			months : data.months
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	}
});