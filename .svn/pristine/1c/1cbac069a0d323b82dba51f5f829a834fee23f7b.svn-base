var SettleMaterialsDetailWindow = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	if(this.params.relateModule==RelationModule.settleProject.relateModule) {
		this.reportPanel = new SettleProjectQueryDetail({
			params : this.params
		});
	}else if(this.params.relateModule==RelationModule.settleMaterials.relateModule) {
		this.reportPanel = new SettleMaterialsQueryDetail({
			params : this.params
		});
	}
	
	
	SettleMaterialsDetailWindow.superclass.constructor.call(this, {
		layout : "fit",
		width : 1000,
		height : 600,
		items : this.reportPanel,
		border : false,
		maximizable : true,
		modal : true,
		plain : true
	});
};
Ext.extend(SettleMaterialsDetailWindow, Ext.Window, {
	advancedSearchSubmit : function() {
		if (this.searchPanel.getForm().isValid()) {
			if (this.submit) {
				this.hide();
				this.submit.call(this, this.searchPanel);
			} else {
				this.searchPanel.getForm().submit({
					waitMsg : "正在提交查询",
					url : this.url,
					success : function(f, g) {
						if (this.callback) {
							this.callback.call(this, f, g);
						}
						this.hide();
					}.createDelegate(this)
				});
			}
		}
	}
});