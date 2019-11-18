	var AppUserBatchPermSetForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.userIds = this.userIds;

	this.appUserRoleSelector = new Ext.Panel({
		title : "用户角色",
		width : 620,
		autoScroll : true,
		colspan : 2,
		items : [ {
			xtype : "itemselector",
			id : "AppUserRoles",
			name : "AppUserRoles",
			disabled : this.appUserRolesdisable,
			fromLegend : "",
			imagePath : __ctxPath + "/ext3.4/ux/images/",
			multiselects : [ {
				id : "chooseRoles",
				legend : "可选角色",
				width : 300,
				height : 400,
				store : new Ext.data.SimpleStore({
					autoLoad : true,
					baseParams : {
						userId : this.userId,
						roleType : this.roleType
					},
					url : __ctxPath + "/system/chooseRolesAppUser.do",
					fields : [ "roleId", "roleName" ]
				}),
				displayField : "roleName",
				valueField : "roleId"
			}, {
				id : "selectedRoles",
				name : "selectedRoles",
				legend : "已有角色",
				width : 300,
				height : 400,
				store : new Ext.data.SimpleStore({
					autoLoad : true,
					baseParams : {
						userId : this.userId
					},
					url : __ctxPath + "/system/selectedRolesAppUser.do",
					fields : [ "roleId", "roleName" ]
				}),
				tbar : [ {
					text : "清除所选",
					handler : function() {
						this.getForm().findField("AppUserRoles").reset();
					}.createDelegate(this)
				} ],
				displayField : "roleName",
				valueField : "roleId"
			} ]
		}]
	});

	AppUserBatchPermSetForm.superclass.constructor.call(this, {
		title : "用户授权",
		maximized:false,
		height : 500,
		width : 700,
		form_config : {
			labelWidth : 135,
			labelAlign : "right",
			layout : "table",
			defaultType : "textfield",
			layoutConfig : {
				columns : 2
			},
			object : "appUser",
			saveable : this.saveable,
			url : __ctxPath + "/system/batchPermssionAppUser.do?userIds="+this.userIds,
			items : this.appUserRoleSelector
		}
	});
};

Ext.extend(AppUserBatchPermSetForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		var roleIds="";
		//获取EXTJS中的FormPanel的所有控件值和属性
		this.appUserRoleSelector.items.each(function(item,index,length){                           
		       roleIds=item.getValue();
		 });
		if (roleIds.length<=0) {
			$toast("错误信息", "您还没有选择角色!");
			return;
		}
		$formsubmit(this.getForm(), function(e, g) {
			$toast("保存成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});

