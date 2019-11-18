var InspectSelfInitForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	var inspectType = this.inspectType;
	// =======================================================================================================//
	
	var items = [ {
		xtype : "fieldset",
		title : "信息",
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
					maxLength : 128,
					anchor : "98%",
					allowBlank : false,
					fieldLabel : "检查项",
					name : "inspectSelfInit.inspectItem"
				} ]
			} ]
		} ]
	}];
	this.inspectSelfInitDetailGrid = new InspectSelfInitDetailGrid({
		site : this.site,
		saveable : this.saveable,
		initId : this.initId,
		inspectType : this.inspectType
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.inspectSelfInitDetailGrid ]
	});
	items.push(this.relateTabPanel);
	InspectSelfInitForm.superclass.constructor.call(this, {
		title : "检查详情",
		animateTarget : this.animateTarget,
		width : 890,
		height : 500,
		form_config : {
			labelWidth : 100,
			object : "inspectSelfInit",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveInspectSelfInit.do",
			items : items,
			fieldMapping : InspectSelfInitFieldMapping,
			hiddenField : InspectSelfInitHiddenField
		}
	});
};
Ext.extend(InspectSelfInitForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("inspectSelfInitDetails", Env.grid.json(this.inspectSelfInitDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.initId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadInspectSelfInit.do?initId=" + this.initId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.inspectSelfInitDetailSet, this.inspectSelfInitDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fields = [ "inspectType"];
			var values = [  this.inspectType ];
			this.setMultiFieldValue(fields, values);
		}
		
	}
});