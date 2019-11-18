var ContractGrantedWin = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	this.panel = new ContractGrantedView({
		userId : a.userId,
		fullname : a.fullname
	});
	
	ContractGrantedWin.superclass.constructor.call(this, {
		layout : "fit",
		width : 1000,
		height : 600,
		items : this.panel,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		listeners : {
//			afterrender : function() {
//				this.reportPanel.searchSubmit();
//			}
		}
	});
};
Ext.extend(ContractGrantedWin, Ext.Window, {

});