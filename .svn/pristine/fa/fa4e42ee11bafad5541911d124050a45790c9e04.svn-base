var InspectProjectRecordGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var actionItems = [];
	actionItems.push({
		iconCls : "btn-grid-read",
		qtip : "查看照片",
		handler : this.loadImage
	});
	var columns = [ {
		header : "自检编号",
		dataIndex : "inprojectSerial"
	}, {
		header : "自检时间",
		dataIndex : "inprojectDate"
	}, {
		header : "自检设备自编号",
		dataIndex : "attendamce",
		renderer : function(n) {
			return n.equipment.equipSerial;
		}
	}, {
		header : "自检类型",
		dataIndex : "inprojectTypeName"
	}, {
		header : "自检项",
		dataIndex : "inprojectItem"
	}, {
		header : "自检状态",
		dataIndex : "inprojectState",
		renderer : function(n) {
			if("0" == n){
				return "合格";
			}else{
				return "不合格";
			}
		}
	} ];
	InspectProjectRecordGrid.superclass.constructor.call(this, Ext.apply({
		loadurl : __ctxPath + "/archive/listInspectProjectRecord.do?aid=" + this.aid,
		fields : InspectProjectRecordListViewField,
		title : "自检项目记录",
		option : "人员",
		height : this.height,
		columns : columns,
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
	}, this.grid_config || {}));
};

Ext.extend(InspectProjectRecordGrid, Knight.ux.SubModuleBaseGrid, {
	loadImage : function(a){
		new InspectProjectImageForm({
				inprojectId : a.inprojectId, 
				maximized : false ,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
});