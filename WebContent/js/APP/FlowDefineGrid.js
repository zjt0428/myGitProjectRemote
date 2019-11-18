var FlowDefineGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	//var roleSelector = new TreeSelector("roleSelector", __ctxPath + "/app/roleListFdefine.do", "选择角色", "chkRoleId");
	this.roleData = $ajaxSyncCall(__ctxPath + "/app/roleListFdefine.do", {});
	var columns = [{
			header : "节点序号",
			dataIndex : "seq",
			editor : new Ext.form.ComboBox({
				emptyText : '请选择...',
				mode : 'local',
				editable : false,
				triggerAction : 'all',
				valueField : "code",
				displayField : "name",
				store : new Ext.data.ArrayStore({
					fields : ["code","name"],
					data : [[0,"第一级"],[1,"第二级"],[2,"第三级"],[3,"第四级"],[4,"第五级"]]
				})
			}),
			renderer : function(value, metadata, record) {
				var store = this.getEditor().store;
				var index = store.find("code", value);
				if (index != -1) {
					value = store.getAt(index).data.name;
				}
				return value;
			}
		},{
			header : "节点名称",
			dataIndex : "nodeName",
			editor : new Ext.form.ComboBox({
				emptyText : '请选择...',
				mode : 'local',
				editable : false,
				triggerAction : 'all',
				valueField : "name",
				displayField : "name",
				store : new Ext.data.ArrayStore({
					fields : ["name"],
					data : [["申请者"],["初审"],["审核"],["审批"]]
				})
			})
		},{
			header : "审批角色",
			dataIndex : "chkRoleid",
			editor : new Ext.form.ComboBox({
				emptyText : '请选择...',
				mode : 'local',
				editable : false,
				triggerAction : 'all',
				valueField : "code",
				displayField : "name",
				store : new Ext.data.ArrayStore({
					fields : ["code","name"],
					data : this.roleData
				})
			}),
			renderer : function(value, metadata, record) {
				var store = this.getEditor().store;
				var index = store.find("code", value);
				if (index != -1) {
					value = store.getAt(index).data.name;
				}
				return value;
			}
		}];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [{
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSubModule.createDelegate(this)
			}];
		}
	}
	FlowDefineGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : FlowDefineNodeListViewField,
		title : "审批列表",
		option : "审批列表",
		tbarItems : this.tbarItems,
		height : 300,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(FlowDefineGrid, Knight.ux.SubModuleBaseGrid, {

});