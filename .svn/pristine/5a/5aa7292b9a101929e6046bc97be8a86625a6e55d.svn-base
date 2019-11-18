var LaborPayView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	this.laborPay = new LaborPayListView({
		id : "LaborPayView_LaborPay",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : false
		
	});
	this.laborPay.setTitle("待支付");
	
	this.laborPayed = new LaborPaidListView({
		id : "LaborPayView_LaborPayed",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true
		
	});
	this.laborPayed.setTitle("已支付");
	

	LaborPayView.superclass.constructor.call(this, {
		id : "LaborPayView",
		title : "劳务支付",
		activeTab : 0,
		frame : true,
		iconCls : "menu-business-corpview",
		closable : true,
		enableTabScroll : true,
		resizeTabs : false,
		items : [ this.laborPay, this.laborPayed]
	});
};
Ext.extend(LaborPayView, Ext.TabPanel, {});