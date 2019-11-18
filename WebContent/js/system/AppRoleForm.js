var AppRoleForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.depGetUrl = "/system/listDepartment.do?opt=appUser";
	this.depType = curUserInfo.department.depType;
	if(this.depType && this.depType == '1'){
		this.depGetUrl = "/system/listLabourDepartment.do?opt=appUser";
	}
	Ext.apply(this, {
		departmentTreeId : Ext.id()
	});
	var items = [ {
		width : 235,
		fieldLabel : "角色名称",
		name : "appRole.roleName"
	}, {
		width : 235,
		fieldLabel : "角色描述",
		xtype : "textarea",
		name : "appRole.roleDesc"
	}, {
		width : 235,
		fieldLabel : "状态",
		hiddenName : "appRole.status",
		xtype : "combo",
		mode : "local",
		editable : true,
		triggerAction : "all",
		store : [ [ "0", "禁用" ], [ "1", "可用" ] ],
		value : 1
	}, {
		width : 235,
		fieldLabel : "类型",
		hiddenName : "appRole.roleType",
		xtype : "combo",
		mode : "local",
		editable : true,
		triggerAction : "all",
		store : [ [ "0", "普通" ], [ "1", "领导" ] ],
		value : 0
	},{
		hidden : true,
		name : "appRole.roleDepartmentId",
		id : this.departmentTreeId
	},{
		xtype : "treecombo",
		valId : this.departmentTreeId,
		maxLength : 32,
		readOnly : false,
		allowBlank : false,
		fieldLabel : "所属部门",
		name : "appRole.roleDepartment",
		url : __ctxPath + this.depGetUrl
	}]
	AppRoleForm.superclass.constructor.call(this, {
		centerLayout : true,
		x : 300,
		y : 300,
		width : 370,
		height : 260,
		title : "角色详细信息",
		iconCls : "menu-set-role",
		form_config : {
			labelWidth : 75,
			object : "appUser",
			saveable : true,
			url : __ctxPath + "/system/saveAppRole.do"+"?isCopy=1",
			items : items,
			fieldMapping : AppRoleFieldMapping,
			hiddenField : AppRoleHiddenField
		}
	});
};
Ext.extend(AppRoleForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		$formsubmit(this.getForm(), function(e, g) {
			$toast("保存成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.roleId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/system/getAppRole.do?roleId=" + this.roleId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this)
			});
		}else{
			Ext.Ajax.request({
				url : __ctxPath + "/system/listDepartment.do",
				params : {
					"opt" : "appUser"
				},
				method : "POST",
				success : function(d,g){
					var resp = Ext.util.JSON.decode(d.responseText);
					this.getForm().findField("appRole.roleDepartmentId").setValue(resp[0].id);
					this.getForm().findField("appRole.roleDepartment").setValue(resp[0].text);
				}.createDelegate(this)
			})	
		}
	}
});