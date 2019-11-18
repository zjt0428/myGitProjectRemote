var EquipActivateSearchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	this.EquipActivateSearchFormGrid = new EquipActivateSearchFormGrid( {
		parentForm : this,
		saveable : this.cost ? false:true
	});
    

	var items = [];
	if(this.inspectRectify!=""){}
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [this.EquipActivateSearchFormGrid ]
	});
	items.push(this.relateTabPanel);
	EquipActivateSearchForm.superclass.constructor.call(this, {
		title : "现场装车查询",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			items : items,
			fieldMapping : LogisticsTransportFieldMapping,
			hiddenField : LogisticsTransportHiddenField
		}
	});
};
Ext.extend(EquipActivateSearchForm, Knight.ux.FormPanelWindow, {
	importCarArchives : function(data) {
		this.setFieldValue("licensePlate", data.licensePlate);
	},

	loadFormData : function() {
		new Ext.util.DelayedTask(function() {
			
			this.EquipActivateSearchFormGrid.getStore().loadData(this.result);
		}.createDelegate(this)).delay(50);

	}
});