var InspectSelfInitDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
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
					maxLength : 500,
					anchor : "98%",
					allowBlank : false,
					fieldLabel : "标准内容",
					name : "inspectSelfInitDetail.detailContent"
				} ]
			} ]
		} ]
	}];
	InspectSelfInitDetailForm.superclass.constructor.call(this, {
		title : "内容",
		animateTarget : this.animateTarget,
		width : 890,
		height : 180,
		maximizable : false,
		maximized : false,
		form_config : {
			labelWidth : 100,
			object : "inspectSelfInitDetail",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveDetailInspectSelfInit.do?initId="+this.initId,
			items : items,
			fieldMapping : InspectSelfInitDetailFieldMapping,
			hiddenField : InspectSelfInitDetailHiddenField
		}
	});
};
Ext.extend(InspectSelfInitDetailForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.initDetailId)) {
			Env.form.load({
				form : this.getForm(),
				url : __ctxPath + "/equip/loadDetailInspectSelfInit.do?initDetailId=" + this.initDetailId,
				success : function(data, form, action) {
				}.createDelegate(this)
			});
		}else{
			var fields = [ "initId","inspectType"];
			var values = [ this.initId?this.initId:null,this.inspectType ];
			this.setMultiFieldValue(fields, values);
		}
	}
});