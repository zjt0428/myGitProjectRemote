var LaborSettleView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	this.laborSettle = new LaborSettleListView({
		id : "LaborSettleView_LaborSettle",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : false
		
	});
	this.laborSettle.setTitle("待办事项");
	
	this.laborSettleSubmit = new LaborSettleSubmitListView({
		id : "LaborSettleView_LaborSettleSubmit",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true
		
	});
	this.laborSettleSubmit.setTitle("已办事项");
	
	this.laborSettleApprove = new LaborSettleApproveListView({
		id : "LaborSettleView_LaborSettleApprove",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true
		
	});
	this.laborSettleApprove.setTitle("办结事项");

	

	LaborSettleView.superclass.constructor.call(this, {
		id : "LaborSettleView",
		title : "劳务结算",
		activeTab : 0,
		frame : true,
		iconCls : "menu-business-corpview",
		closable : true,
		enableTabScroll : true,
		resizeTabs : false,
		items : [ this.laborSettle, this.laborSettleSubmit,this.laborSettleApprove]
	});
};
Ext.extend(LaborSettleView, Ext.TabPanel, {});