var TransfersEquipDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		dataIndex : "storeId",
		hidden : true
	},{
		header : "设备名称",
		dataIndex : "equipment",
		renderer : function(n){
			return n.equipGenericName
		}
	}, {
		header : "设备型号",
		dataIndex : "equipment",
		renderer : function(n){
			return n.equipSpecificName
		}
	}, {
		header : "出厂编号",
		dataIndex : "equipment",
		renderer : function(n){
			return n.exwSerial
		}
	}, {
		header : "设备自编号",
		dataIndex : "equipment",
		renderer : function(n){
			return n.equipSerial
		}
	}, {
		header : "调出部门",
		dataIndex : "department",
		renderer : function(n){
			return n.depName
		}
	}, {
		dataIndex : "equipId",
		hidden : true
	}, {
		hidden : true,
		dataIndex : "department",
		renderer : function(n){
			return n.depId
		}
	}];
	TransfersEquipDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : TransfersEquipDetailListViewField,
		title : "设备调拨",
		option : "设备调拨",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelEquipDepotTransfers.do",
	}, this.grid_config || {}));
};
Ext.extend(TransfersEquipDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		
	},
	change : function(c){
		Ext.getCmp('inDepotId').getValue();
		var localtionData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do",{
			"Q_baseLocationPermissionSet.userId_L_EQ" : curUserInfo.userId,
			"Q_baseDepot.depotId_L_EQ" : this.inDepotId
		});
	},
	addSubModule : function(data) {
		if(this.outDepotId==this.inDepotId){
			$toast("请先选择调出/调入仓库且不能相同！");
			return;
		}
		new EquipSelector({
			params : {
				"Q_storeId_L_EQ":this.outDepotId,
				"Q_status_S_EQ" : "1"
					},
			callback : function(d){
				for(var i=0;i<d.length;i++){
					var data = d[i].json;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	addSubModuleDate : function(data) {
//		for ( var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.storeId == data.storeId) {
//				return;
//			}
//		}
//		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data,{
			equipment : data,
			department : data.department,
			equipId : data.equipId,
			storeId : data.storeId
		});
		this.stopEditing();
		this.getStore().add(recordType);
	}
});