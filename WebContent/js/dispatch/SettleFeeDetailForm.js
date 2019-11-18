var SettleFeeDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var title = "租赁费用清单";
	this.selection.data.item.indexOf("其他费用（+）")>=0?(this.params.calMethod =0):(this.params.calMethod =1)
	var settleProjectId = "";
	if(this.selection!=null&&this.selection.json!=null&&this.selection.json.relateModule=='SETTLE_PROJECT'){
		settleProjectId=this.selection.json.relateId;
	}
	var inUserGrid ="";
	if(this.selection.data.item.indexOf("租赁费用（+）")>=0){
		this.rentFeeDetailGrid = new RentFeeDetailGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/equip/rentFeeSettleProject.do?settleProjectId="+settleProjectId
		});
		inUserGrid = this.rentFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("安拆费用（+）")>=0){
		title = "安拆费用清单";
		this.installFeeDetailGrid = new InstallFeeDetailGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/equip/installFeeSettleProject.do"
		});
		inUserGrid = this.installFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("汽吊费用（+）")>=0){
		title = "汽吊费用清单";
		this.autoCraneFeeDetailGrid = new AutoCraneFeeDetailGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/equip/autocraneFeeSettleProject.do"
		});
		inUserGrid = this.autoCraneFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("丢损费用（+）")>=0){
		title = "丢损费用清单";
		this.lostFeeDetailGrid = new LostFeeDetailGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/equip/lostFeeSettleProject.do"
		});
		inUserGrid = this.lostFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("其他费用（+）")>=0 || this.selection.data.item.indexOf("其他费用（-）")>=0){
		title = "其他费用清单";
		this.otherFeeDetailGrid = new OtherFeeDetailGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/equip/otherFeeSettleProject.do"
		});
		inUserGrid = this.otherFeeDetailGrid
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

	SettleFeeDetailForm.superclass.constructor.call(this, {
		title : title,
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			labelWidth : 100,
			object : "settleFeeDetail",
			saveable : false,
			url : __ctxPath + "/equip/saveSettleFeeDetail.do",
			items : items,
			fieldMapping : ScrapApplyFieldMapping,
			hiddenField : ScrapApplyHiddenField
		}
	});
};
Ext.extend(SettleFeeDetailForm, Knight.ux.FormPanelWindow, {
});