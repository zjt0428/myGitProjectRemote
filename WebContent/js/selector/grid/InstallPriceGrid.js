var InstallPriceGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	
	var columns = [{
		hidden : true,
		width : 100,
		header : "区域",
		dataIndex : "belongToAreaName",
		editor : new Ext.form.TextField({
		})
	}, {
		width : 100,
		header : "设备型号",
		dataIndex : "equipSpecificName",
		editor : new Knight.ux.TreeCombo({
			id : Ext.id(),
			valId : Ext.id(),
			url : __ctxPath + "/system/treeCode.do?codeId=equipSpecific"
		})
	}, {
		width : 100,
		header : "收费类型",
		dataIndex : "installDismantleTypeName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.contractUnitData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.installDismantleTypeName = value;
			return value;
		}
	}, {
		width : 80,
		header : "项目单价(元)",
		dataIndex : "projectPrice",
		editor : new Ext.form.TextField({
		})
	}, {
		width : 80,
		header : "计量单位",
		dataIndex : "measurementUnit",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.measurementData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.measurementUnit = value;
			return value;
		}
	}];
	InstallPriceGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : InstallPriceSetListViewField,
		title : "安装费用",
		option : "安装费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelInstallPriceSetContractLease.do"
	}, this.grid_config || {}));
}
Ext.extend(InstallPriceGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			contractId : this.contractId
		};
	},
	addSubModuleDate : function(data) {
		console.info(data)
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.priceId == data.priceId) {
				return;
			}
		}
		
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			belongToAreaName : data.belongToAreaName,
			equipSpecificName : data.equipSpecificName,
			measurementUnit : data.measurementUnit,
			projectPrice :data.projectPrice,
			installDismantleTypeName : data.installDismantleTypeName
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
});