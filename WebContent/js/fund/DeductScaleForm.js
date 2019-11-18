var DeductScaleForm = function() {
	this.deductScaleGrid = new DeductScaleGrid(null, {
		saveable : true
	});
	var items = [ {
		xtype : "fieldset",
		title : "同一比例",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "numberfield",
			maxLength : 2,
			fieldLabel : "比例系数(%)",
			name : "deductScale.scalePercent"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.deductScaleGrid ]
	} ];
	DeductScaleForm.superclass.constructor.call(this, {
		title : "提成比例信息",
		animateTarget : this.animateTarget,
		width : 540,
		form_config : {
			object : "deductScale",
			saveable : true,
			url : __ctxPath + "/fund/saveDeductScale.do",
			items : items,
			fieldMapping : DeductScaleFieldMapping,
			hiddenField : DeductScaleHiddenField
		}
	});
};
Ext.extend(DeductScaleForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.getForm().findField("deductScale.deductScales").setValue($gridstore2json(this.deductScaleGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			this.topbar.hide();
		}.createDelegate(this));
	},
	loadFormData : function() {
		this.getForm().load({
			deferredRender : false,
			url : __ctxPath + "/fund/loadDeductScale.do",
			waitMsg : "正在载入数据...",
			success : function(g, h) {
				var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				if (data.deductScaleSet && data.deductScaleSet.length > 0) {
					this.deductScaleGrid.addRecordHeight(data.deductScaleSet.length);
					this.deductScaleGrid.getStore().loadData(data.deductScaleSet);
					this.deductScaleGrid.getStore().sort("scaleStart", "ASC");
				}
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
		});
	}
});
