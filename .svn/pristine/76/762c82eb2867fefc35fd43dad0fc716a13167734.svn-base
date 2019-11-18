/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * contractId : Number,
 * rentStandardData : Array,
 * measurementData : Array
 * </code></pre>
 */
var IndisProtocolEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "备案编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.recordId;
		}
	}, {
		header : "设备名称",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipGenericName;
		}
	}, {
		header : "规格型号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipSpecificName;
		}
	}, {
		header : "出厂编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.exwSerial;
		}
	}, {
		header : "高度",
		dataIndex : "height",
		editor : new Ext.form.NumberField({
			maxValue : 999
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			maxValue : 999
		})
	}, {
		header : "安装总费用",
		dataIndex : "amount",
		editor : new Ext.form.NumberField({
			maxValue : 999999
		})
	}, {
		header : "安装费用小计(元)",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var summary = record.data.quantity * record.data.amount;
			record.data.summary = summary;
			return summary;
		}
	} ];
	IndisProtocolEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : IndisProtocolEquipListViewField,
		title : "协议设备",
		option : "关联设备",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/safety/multiDelEquipIndisProtocol.do",
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(IndisProtocolEquipGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipment.equipId == data.equipment.equipId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			protocolId : this.protocolId,
			equipment : data,
			quantity : 1,
			amount : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new EquipSelector({
			callback : function(d) {
				var data = d[0].data;
				this.addSubModuleDate(data);
			}.createDelegate(this)
		}).show();
	}
});