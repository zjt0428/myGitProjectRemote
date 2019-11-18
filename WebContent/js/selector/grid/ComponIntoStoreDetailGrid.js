var ComponIntoStoreDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "配件入库";
	var columns = [ {
		width : 60,
		header : "配件类别",
		dataIndex : "component",
		renderer : function(n) {
			return n.componCategoryName;
		}
	}, {
		width : 60,
		header : "设备型号",
		dataIndex : "component",
		renderer : function(n) {
			return n.componSpecificName;
		}
	},{
		width : 60,
		header : "生产厂家",
		dataIndex : "component",
		renderer : function(n) {
			return n.equipVenderName;
		}
	}, {
		width : 60,
		header : "配件名称",
		dataIndex : "component",
		renderer : function(n) {
			return n.componGenericName;
		}
	}, {
		width : 60,
		header : "计量单位",
		dataIndex : "component",
		renderer : function(n) {
			return n.calculate;
		}
	}, {
		width : 60,
		header : "调度数量",
		dataIndex : "component",
		renderer : function(n) {
			return n.counts;
		}
	}, {
		width : 60,
		header : "待入库数量",
		dataIndex : "waitCounts"
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
		width : 60,
		header : "验收结果",
		dataIndex : "result",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.warehouseResultData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			return value;
		}
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
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
	this.tbarItems.push({
		iconCls : "btn-head-add",
		text : "全部良好",
		handler : this.allRight.createDelegate(this)
	}, {
		iconCls : "btn-head-add",
		text : "全部入库",
		handler : this.allWarehouse.createDelegate(this)
	});
	ComponIntoStoreDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ComponIntoStoreDetailViewField,
		title : this.title,
		option : "入库配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(ComponIntoStoreDetailGrid, Knight.ux.SubModuleBaseGrid, {
	allRight : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			this.getStore().getAt(i).set("result", "5")
		}
	},
	allWarehouse : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			this.getStore().getAt(i).set("status", "5")
		}
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.component.componId == data.component.componId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			waitCounts : data.counts,// - data.warehouseCounts,
			counts : data.addFestival,// 安装数量
			result : this.warehouseResultData[5][0],
			status : this.warehouseStatusData[1][0],
			component : data.component
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new ProjectComponSelector({
			collectEnable : true,
			params : {
				"Q_projectId_L_EQ" : this.projectId,
				"Q_status_S_EQ" : "0"
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