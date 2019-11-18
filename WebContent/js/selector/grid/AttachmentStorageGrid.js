var AttachmentStorageGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "附件入库";
	var columns = [ {
		width : 60,
		header : "配件类别",
		dataIndex : "componCategory"
	}, {
		width : 60,
		header : "设备型号",
		dataIndex : "componSpecific"
	},{
		width : 60,
		header : "生产厂家",
		dataIndex : "componVender"
	}, {
		width : 60,
		header : "配件名称",
		dataIndex : "componGeneric"
	}, {
		width : 60,
		header : "规格型号",
		dataIndex : "dimensions"
	}, {
		width : 60,
		header : "计量单位",
		dataIndex : "measurementUnit"
	},{
		width : 60,
		header : "附件ID",
		hidden : true,
		dataIndex : "disAllInitId"
	}, {
		width : 60,
		header : "项目库存",
		dataIndex : "projectCounts"
	}, {
		width : 60,
		header : "入库数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			minValue : 1,
			value : 1
		}),
		renderer : function(value, metadata, record) {
			if (value > record.get("waitCounts")) {
				Ext.Msg.alert("信息警告", "超出该类型配件待入库数量!");
				value = record.get("waitCounts");
			}
			record.data.counts = value;
			return value;
		}
	}, {
		width : 200,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	} ];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-approvalTask",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		});
	}
	if (!this.tbarItems) {
		this.tbarItems = [];
	}
	AttachmentStorageGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AttachmentStorageListViewField,
		title : this.title,
		option : "附件入库",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(AttachmentStorageGrid, Knight.ux.SubModuleBaseGrid, {
	
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			componVender : data.equipVenderName,//生产厂家
			componGeneric : data.componGenericName,//配件名称
			componCategory : data.componCateGoryName,//配件类别
			componSpecific : data.equipSpecificName,//设备型号
			projectCounts :data.quantity,//库存数量
			measurementUnit : data.calculate,//计量单位
			dimensions : data.dimension,//配件规格,
			disAllInitId : data.disAllInitId,//附件清单ID
			counts	: data.counts==null?data.quantity:data.counts
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new AnnexDetailSelector({
			collectEnable : true,
			params :{
				projectId: this.projectId
			},
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;					
					this.addSubModuleDate(data);
					
				}
			}.createDelegate(this)
		}).show();	
		
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		this.subtractRecordHeight(m.length);
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});