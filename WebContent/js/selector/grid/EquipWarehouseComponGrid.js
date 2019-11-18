var EquipWarehouseComponGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "配件入库";
	var columns = [ {
		width : 60,
		header : "零配件名称",
		dataIndex : "componDiary",
		renderer : function(n) {
			return n.componGenericName;
		}
	}, {
		width : 60,
		header : "设备型号",
		dataIndex : "componDiary",
		renderer : function(n) {
			return n.componSpecificName;
		}
	}, {
		width : 60,
		header : "配件规格",
		dataIndex : "componDiary",
		renderer : function(n) {
			return n.dimensions;
		}
	},{
		width : 60,
		header : "生产厂家",
		dataIndex : "componDiary",
		renderer : function(n) {
			return n.equipVenderName;
		}
	}, {
		width : 60,
		header : "计量单位",
		dataIndex : "componDiary",
		renderer : function(n) {
			return n.calculate;
		}
	}, {
		width : 60,
		header : "调度数量",
		dataIndex : "componDiary",
		renderer : function(n) {
			return n.counts;
		}
	}, {
		width : 60,
		header : "待入库数量",
		dataIndex : "warehouseWaitCounts"
	}, {
		width : 60,
		header : "入库数量",
		dataIndex : "warehouseCounts",
		editor : new Ext.form.NumberField({
			minValue : 1,
			value : 1
		}),
		renderer : function(value, metadata, record) {
			if (value > record.get("warehouseWaitCounts")) {
				Ext.Msg.alert("信息警告", "超出该类型配件待入库数量!");
				value = record.get("warehouseWaitCounts");
			}
			record.data.warehouseCounts = value;
			return value;
		}
	}, {
		width : 60,
		header : "验收结果",
		dataIndex : "warehouseResult",
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
	EquipWarehouseComponGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipWarehouseComponListViewField,
		title : this.title,
		option : "配件入库",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipWarehouseComponGrid, Knight.ux.SubModuleBaseGrid, {
	allRight : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			this.getStore().getAt(i).set("warehouseResult", "5")
		}
	},	
	allWarehouse : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			this.getStore().getAt(i).set("status", "5")
		}
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			warehouseWaitCounts : data.counts - data.warehouseCounts,
			warehouseCounts : data.counts - data.warehouseCounts,
			warehouseResult : this.warehouseResultData[5][0],
			status : this.warehouseStatusData[1][0],
			componDiary:data
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		//__ctxPath + "/archive/componListProject.do
		new EquipFlowComponDiarySelector({
			title : "待入库配件清单",
			isWareHouse : true,
			target_collect : false,
			noRepet:true,
			params : {
				Q_flowId_L_EQ : this.flowId,
				Q_projectId_L_EQ : this.projectId,				
				Q_status_S_GE : "1",
				//Q_status_S_EQ : "0",
				Q_status_S_LE : "2"
			},
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
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