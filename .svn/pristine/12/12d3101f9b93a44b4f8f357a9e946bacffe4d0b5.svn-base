var ContractArrangeSituationGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "承租单位",
		dataIndex : "receiveEntName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "项目名称",
		dataIndex : "projectName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "项目要求",
		dataIndex : "demand",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "安装高度",
		dataIndex : "installHeight",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision : 2,
			maxValue : 99999999
		})
	}, {
		header : "安装时间(估)",
		dataIndex : "duration",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision : 2,
			maxValue : 99999999
		})
	}, {
		header : "设备型号",
		dataIndex : "equipSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "基础",
		dataIndex : "baseDescribe",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxValue : 99999999
		})
	}, {
		header : "产权",
		dataIndex : "propertyName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "设备来源",
		dataIndex : "equipSource",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "设备品牌",
		dataIndex : "equipVender",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "IC编号",
		dataIndex : "icSerial",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	ContractArrangeSituationGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "安排情况",
		option : "安排情况",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ContractArrangeSituationListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelArrangeSituationContractArrange.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractArrangeSituationGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			equipCategory : this.equipCategory
		};
	}
});