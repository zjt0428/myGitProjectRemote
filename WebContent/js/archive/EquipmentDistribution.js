var EquipmentDistribution = function() {
	// autoLoad: {url: "welcome.jsp", method:'post', loadMask: 'loading...', scripts:true},
    //  renderTo:Ext.getBody(), 
	var monitorUrl=__ctxPath + '/bigData/index.html';
	this.myPanel = {
			id : "myPanel",
			xtype : "panel", 
			width:'100%',
			height:'100%',
	        html:"<iframe width='100%' height='100%' src='"+monitorUrl+"'/>"
		};
	
	EquipmentDistribution.superclass.constructor.call(this, {
		id : "EquipmentDistribution",
		iconCls : "menu-system-dic",
		title : "安全监控",
		closable : false,
		layout : "fit",
		items : this.myPanel
	});
};

Ext.extend(EquipmentDistribution, Ext.Panel,{

});
