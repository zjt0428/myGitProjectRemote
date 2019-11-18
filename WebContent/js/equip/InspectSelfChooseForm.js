var InspectSelfChooseForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	var thisInspectionType = this.inspectType;
	// =======================================================================================================//
	
	var siteData = [];
	Env.request({
		url: __ctxBasePath+'/terminal/ims/site/list.do?type='+thisInspectionType,
		async : false,
		success : function(r, o) { 
			siteData = r.responseJSON.result;
		}
	});
	var items = [ {
		xtype : "fieldset",
		title : "选择信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 1,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "分类",
					width : 200,
					xtype : "lexiconCombo",
					lexiconData : siteData,
					name : "imSite"
				} ]
			} ]
		} ]
	}];
	this.inspectSelfChooseDetailGrid = new InspectSelfChooseDetailGrid({
		siteId : this.siteId,
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.inspectSelfChooseDetailGrid ]
	});
	items.push(this.relateTabPanel);
	InspectSelfChooseForm.superclass.constructor.call(this, {
		title : "检查项目",
		animateTarget : this.animateTarget,
		width : 890,
		height : 500,
		form_config : {
			labelWidth : 100,
			object : "inspectSelfChoose",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveInspectSelfChoose.do",
			items : items,
			fieldMapping : InspectSelfChooseFieldMapping,
			hiddenField : InspectSelfChooseHiddenField
		}
	});
};
Ext.extend(InspectSelfChooseForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("inspectSelfChooseDetails", Env.grid.json(this.inspectSelfChooseDetailGrid));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.chooseId)) {
			Env.form.load({
				form : this.getForm(),
				url : __ctxPath + "/equip/loadInspectSelfChoose.do?chooseId=" + this.chooseId,
				success : function(data, form, action) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.inspectSelfChooseDetailSet, this.inspectSelfChooseDetailGrid);
				}.createDelegate(this)
			});
		}
		
	}
});