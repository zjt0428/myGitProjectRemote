var ContingencyWorkerGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "姓名",
		dataIndex : "name",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "职务",
		dataIndex : "duties",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "应急救援职务",
		dataIndex : "contingencyDuties",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "电话",
		dataIndex : "phone",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 16
		})
	} ];
	ContingencyWorkerGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ContingencyWorkerListViewField,
		title : "预案人员",
		option : "人员信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/safety/multiDelWorkerContingencyPlan.do",
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(ContingencyWorkerGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			contingencyId : this.contingencyId
		};
	}
});