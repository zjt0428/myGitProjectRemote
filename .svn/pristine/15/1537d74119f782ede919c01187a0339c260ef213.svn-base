var BaseDepotForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	this.array = "";
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "70%",
		items: [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [{
					width :150,
					allowBlank : false,
					fieldLabel : "仓库名称",
					name : "baseDepot.depotName"
				}, {
					width :300,
					fieldLabel : "地址",
					name : "baseDepot.address"
				}/*, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 300,
					readOnly : true,
					allowBlank : true,
					single:false,
					fieldLabel : "数据权限",
					name : "baseDepot.permission",
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importPermission.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 300,
					readOnly : true,
					allowBlank : true,
					single:false,
					fieldLabel : "管辖资产",
					name : "baseDepot.jurisdiction",
					collectEnable : true,
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importPermission.createDelegate(this)
				}*/]
			}, {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					width :150,
					fieldLabel : "联系人",
					name : "baseDepot.linkman"
				},{
					xtype : "textarea",
					width :150,
					height : 75,
					fieldLabel : "描述",
					name : "baseDepot.description"
				}]
			}]
		}]
	}]

	BaseDepotForm.superclass.constructor.call(this, {
		title : "仓库明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "baseDepot",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveBaseDepot.do",
			items : items,
			fieldMapping : BaseDepotFieldMapping,
			hiddenField : BaseDepotHiddenField
		}
	});
}

Ext.extend(BaseDepotForm, Knight.ux.FormPanelWindow, {
	importPermission : function (data) {
		var fieldNames = [ "permission"];
		var s = "";
		var str = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.fullname+",";
			str += '{"userId":"'+data[i].data.userId+'","userName":"'+data[i].data.fullname+'"},'
		}
		str=str.substring(0,str.length-1);
		this.array = "["+str+"]";
		this.setMultiFieldValue(fieldNames, [s]);
	},
	saveFormData : function() {
		if(this.array!=""){
			this.setFieldValue("baseDepotPermissions",this.array);
		}
		$formsubmit(this.getForm(), function(c, e) {
			$toast("操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if(!Ext.isEmpty(this.depotId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadBaseDepot.do?depotId=" + this.depotId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					var fieldNames = [ "permission"];
					var n ="";
					if(data.baseDepotPermissionSet.length!=0){
						for(var j=0;j<data.baseDepotPermissionSet.length;j++){
							n += data.baseDepotPermissionSet[j].userName+",";
						}
					}
					this.setMultiFieldValue(fieldNames, [n])
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
	
})