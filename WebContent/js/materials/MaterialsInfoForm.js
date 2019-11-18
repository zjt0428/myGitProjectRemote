var MaterialsInfoForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var materialsStoreData = $ajaxSyncCall(__ctxPath + "/materials/listMaterialsStore.do",{
		"Q_materialsSpecifications.specificationsId_L_EQ" : this.specificationsId
	});
	var data =  materialsStoreData.result;
	this.relation = data;
	var total = 0;
	for(var i=0;i<data.length;i++){
		total += Number(data[i].quantity);
	}
	var items = [ {
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
					value:total
				} ]
			}]
	}];
	this.materialsStoreDetailGrid = new MaterialsStoreDetailGrid({
		specificationsId : this.specificationsId
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "40%",
		activeTab : 0,
		items : [ this.materialsStoreDetailGrid ]
	});
	items.push(this.relateTabPanel);

	MaterialsInfoForm.superclass.constructor.call(this, {
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
Ext.extend(MaterialsInfoForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		this.setFormSubModuleGrid(this.relation, this.materialsStoreDetailGrid);
	}
});