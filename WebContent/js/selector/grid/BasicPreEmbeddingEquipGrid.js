var BasicPreEmbeddingEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		header : "预埋设备ID",
		dataIndex : "preEmbeddingEquipId",
		hidden:true
	},{
		header : "设备名称",
		dataIndex : "equipGenericName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=equipGeneric"
		})
	},{
		header : "设备型号",
		dataIndex : "equipSpecificName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=equipSpecific"
		})
	}, {
		width : 60,
		header : "数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 1,
			value : 1
		})
	}];
	BasicPreEmbeddingEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "预埋设备清单",
		option : "预埋设备",
		fields : BasicPreEmbeddingEquipListViewField,
//		tbarItems : tbarItems,
//		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelBasicPreEmbeddingNotice.do"
	}, this.grid_config || {}));
};
Ext.extend(BasicPreEmbeddingEquipGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModule : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			preEmbeddingNoticeId : this.preEmbeddingNoticeId,	
			counts : 0,
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
});