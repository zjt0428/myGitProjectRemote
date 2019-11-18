var StoreDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var diagnosisData = $ajaxSyncCall(__ctxPath + "/archive/countStoreStoreHouse.do", {
		componId : this.componId
	});
	var data =  diagnosisData.result;
	this.relation = data;
	
	var	 items = [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				defaultType : "textfield",
				items : [ {
					maxLength : 120,
					readOnly : true,
					fieldLabel : "库存总数",
					name : "totalCounts",
					value:diagnosisData.totalCounts
				} ]
			}]
	}];
	this.storeDetailGrid = new StoreDetailGrid({
		componId : this.componId
	}, {
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "40%",
		activeTab : 0,
		items : [ this.storeDetailGrid ]
	});
	items.push(this.relateTabPanel);

	StoreDetailForm.superclass.constructor.call(this, {
		title : "库存明细",
		animateTarget : this.animateTarget,
		width : 400,
		height : 320,
		form_config : {
			labelWidth : 100,
			items : items
		}
	});
};
Ext.extend(StoreDetailForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		this.setFormSubModuleGrid(this.relation, this.storeDetailGrid);
	}

});