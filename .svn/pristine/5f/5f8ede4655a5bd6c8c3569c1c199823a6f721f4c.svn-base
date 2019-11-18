var LostCompensationDetailWin = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	this.reportPanel = new LostCompensationDetailReport({
		params : this.params,
		jasperFile : this.jasperFile
	});
	
	LostCompensationDetailWin.superclass.constructor.call(this, {
		layout : "fit",
		width : 1000,
		height : 600,
		items : this.reportPanel,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		listeners : {
			afterrender : function() {
				this.reportPanel.searchSubmit();
			}
		}
	});
};
Ext.extend(LostCompensationDetailWin, Ext.Window, {

});