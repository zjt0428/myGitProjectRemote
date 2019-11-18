var LeaseSettlementBlockUpDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var title = b.title? b.title : "租赁费用清单";
	
	var inUserGrid ="";
	if(this.relateModule=='LEASE_BLOCK_UP') {   //【租借报停】清单
		this.settleMaterialsDetailGrid = new SettleMaterialsDetailGrid({
			backOff : this.backOff,
			display : true,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/getDetailLeaseBlockUp.do"
		});
		inUserGrid = this.settleMaterialsDetailGrid
	}
	else if(this.relateModule=='INSIDE_BLOCK_UP') {	//【租借报停】内部清单
		this.settleMaterialsDetailGrid = new SettleMaterialsDetailGrid({
			backOff : this.backOff,
			display : true,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/getInsideDetailLeaseBlockUp.do"
		});
		inUserGrid = this.settleMaterialsDetailGrid
	}
	else {
		$toast("该项没有清单详情！");
		return;
	}
	var items = [];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [inUserGrid]
	}); 
	items.push(this.relateTabPanel);

	LeaseSettlementBlockUpDetailForm.superclass.constructor.call(this, {
		title : title,
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			saveable : false,
			items : items,
			fieldMapping : ScrapApplyFieldMapping,
			hiddenField : ScrapApplyHiddenField
		}
	});
};
Ext.extend(LeaseSettlementBlockUpDetailForm, Knight.ux.FormPanelWindow, {
});