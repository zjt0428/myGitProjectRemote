var MaterialsInputCountPanel = function(c,d) {
	Ext.apply(this, c);
	var relateModuleGrid = null;
	
	if(this.detail||this.editable){
		this.relateModuleGrid = new MaterialsRecycleCountTempGrid({
			region : "center",
			editable : this.editable,
			callback : this.callback
		});
	}else{
		this.relateModuleGrid = new MaterialsInputCountGrid({
			region : "center"
		},{
			materialsInputCountTemps : this.materialsInputCountTemps,
			specificationsId : this.specificationsId,
			data : this.data,
			callback : this.callback
		});
	}
	
	MaterialsInputCountPanel.superclass.constructor.call(this, {
		title : "入库分配",
		layout : "border",
		items : [ this.relateModuleGrid],
		listeners : {
			afterrender : function(){
				this.afterrender()
			}.createDelegate(this)
		},
		keys : [{
			key : 13,
			fn :function() {
				document.getElementById(this.relateModuleGrid.btnId).click();  
			},
			scope : this
		}]
	});
	
};
Ext.extend(MaterialsInputCountPanel, Ext.Panel, {
	afterrender : function(){
		if(this.detail){			//明细，修改
			if(this.inputData.length==0) {    	//修改---页签新增
				$request({
					url : __ctxPath + "/materials/findDepotBaseLocation.do",
					params : {
						"Q_baseDepot.depotId_L_EQ" : this.depotId
					},
					success : function(g,h){
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data;
						this.inputData = [];
						for(var i=0;i<data.length;i++) {
							this.inputData[i] = {
								specificationsId : this.specificationsId,
								locationId : data[i].locationId,
								locationName : data[i].locationName,
								quantity : 0
							}
						}
						this.relateModuleGrid.getStore().loadData(this.inputData);
					}.createDelegate(this)
				});
			}else{
				this.relateModuleGrid.getStore().loadData(this.inputData);
			}
		}else{					//新增
			var data=[];
			data[0] = {
				inputCount : 0
			};
			this.relateModuleGrid.getStore().loadData(data);
		}
	}
});
var MaterialsInputCountWindow = function(a) {
	var d = new MaterialsInputCountPanel(a);
	MaterialsInputCountWindow.superclass.constructor.call(this, {
		id : "MaterialsInputCountWindow",
		width : 800,
		height : 200,
		border : false,
		layout : "fit",
		items : [ d ],
		modal : true
	});
};
Ext.extend(MaterialsInputCountWindow, Ext.Window, {});