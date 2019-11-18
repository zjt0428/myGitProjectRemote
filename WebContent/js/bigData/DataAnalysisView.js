var DataAnalysisView = function() {
	var monitorUrl=__ctxPath + '/bigData/chart.html';
	this.myPanel = {
			id : "myPanel",
			xtype : "panel", 
			width:'100%',
			height:'100%',
	        html:"<iframe width='100%' height='100%' src='"+monitorUrl+"'/>"
	};
	DataAnalysisView.superclass.constructor.call(this, {
		id : "DataAnalysisView",
// 	iconCls : "menu-system-dic",
		header : false,
		title : "数据看板",
		closable : true,
		plain : true,
		maximizable : true,	
//		frame:false,  
		maximized:true,
		layout : "fit",
		items : this.myPanel
	});
};
//Ext.extend(DataAnalysisView, Ext.Panel,{
//});
Ext.extend(DataAnalysisView, Ext.Window,{
});