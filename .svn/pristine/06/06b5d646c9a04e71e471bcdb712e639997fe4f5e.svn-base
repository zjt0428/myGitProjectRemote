var SettleMaterialsFeeDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var title = b.title? b.title : "租赁费用清单";
	var settleMaterialsId = "";
	if(this.selection!=null&&this.selection.json!=null&&this.selection.json.relateModule=='SETTLE_MATERIALS'){
		settleMaterialsId=this.selection.json.relateId;
	}
	
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
	else if(this.selection.data.item.indexOf("租赁费用（+）")>=0||this.relateModule=='CEASE_REPORT'){  //周材报停管理和周材结算的计算规则类似
		this.settleMaterialsDetailGrid = new SettleMaterialsDetailGrid({
			exportable : this.selection.data.item.indexOf("租赁费用（+）")>=0 ? true : false,
			backOff : this.backOff,
			display : true,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/rentFeeSettleMaterials.do?settleMaterialsId="+settleMaterialsId
		});
		inUserGrid = this.settleMaterialsDetailGrid
	}
	else if(this.selection.data.item.indexOf("丢失赔偿（+）")>=0){
		title = "丢失赔偿清单";
		this.installFeeDetailGrid = new SettleMaterialsDetailGrid({
			backOff : this.backOff,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/lostCompensationSettleMaterials.do?settleMaterialsId="+settleMaterialsId
		});
		inUserGrid = this.installFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("损坏赔偿（+）")>=0){
		title = "损坏赔偿清单";
		this.autoCraneFeeDetailGrid = new SettleMaterialsDetailSecondGrid({
			display : true,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/damageFeeSettleMaterials.do?settleMaterialsId="+settleMaterialsId
		});
		inUserGrid = this.autoCraneFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("装卸费用（+）")>=0){
		title = "装卸费用清单";
		this.lostFeeDetailGrid = new SettleMaterialsDetailSecondGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/handingFeeSettleMaterials.do?settleMaterialsId="+settleMaterialsId
		});
		inUserGrid = this.lostFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("包装费用（+）")>=0){
		title = "包装费用清单";
		this.lostFeeDetailGrid = new SettleMaterialsDetailSecondGrid({
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/packageFeeSettleMaterials.do?settleMaterialsId="+settleMaterialsId
		});
		inUserGrid = this.lostFeeDetailGrid
	}
	else if(this.selection.data.item.indexOf("报停费用（-）")>=0){
		title = "报停费用清单";
		this.ceaseReportDetailGrid = new SettleMaterialsDetailCeaseReportGrid({
			haveDays : true,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/ceaseReportFeeSettleMaterials.do?settleMaterialsId="+settleMaterialsId
		});
		inUserGrid = this.ceaseReportDetailGrid
	}
	else if(this.selection.data.item.indexOf("其他费用（+）")>=0 || this.selection.data.item.indexOf("其他费用（-）")>=0){
		title = "其他费用清单";
		this.selection.data.item.indexOf("其他费用（+）")>=0?(this.params.calMethod =0):(this.params.calMethod =1)
		this.otherFeeDetailGrid = new SettleMaterialsDetailOtherFeeGrid({
			haveDays : true,
			saveable : false,
			params : this.params,
			loadUrl : __ctxPath + "/materials/otherFeeSettleMaterials.do?settleMaterialsId="+settleMaterialsId
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

	SettleMaterialsFeeDetailForm.superclass.constructor.call(this, {
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
Ext.extend(SettleMaterialsFeeDetailForm, Knight.ux.FormPanelWindow, {
});