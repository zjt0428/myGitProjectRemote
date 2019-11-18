var ExitFactoryEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		header : "退场设备ID",
		dataIndex : "exitFactoryEquipId",
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
		editor : $initComboBoxField("设备型号", "Q_equipSpecificName_S_EQ", "equipSpecific", {
			width : 160,
			lable : "设备型号",
			allowBlank : true,
			editable : true
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.contents = value;
			return value;
		}
	}, {
		width : 60,
		header : "数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 1,
			value : 1
		})
	}, {
		header : "首次安装高度",
		dataIndex : "initHeight",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			return Ext.util.Format.number(value , '0.00');;
		}
	}, {
		header : "合同高度",
		dataIndex : "contractHeight",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			return Ext.util.Format.number(value , '0.00');;
		}
	}, {
		width : 60,
		header : "附墙数",
		dataIndex : "wallAttacheQty",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 1,
			value : 1
		})
	}, {
		header : "安装臂长",
		dataIndex : "brachium",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			return Ext.util.Format.number(value , '0.00');;
		}
	} ];
	ExitFactoryEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "退场设备清单",
		option : "退场设备",
		fields : ExitFactoryEquipListViewField,
//		tbarItems : tbarItems,
//		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelExitFactoryNotice.do"
	}, this.grid_config || {}));
};
Ext.extend(ExitFactoryEquipGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModule : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			exitFactoryEquipId : this.exitFactoryEquipId,	
			counts : 0,
			initHeight : 0,
			contractHeight : 0,
			wallAttacheQty : 0,
			brachium : 0
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	}
});