var BaseLocationForm = function(a, b) {
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
					fieldLabel : "库位编码",
					name : "baseLocation.locationSerial"
				}, {
					width :150,
					allowBlank : false,
					fieldLabel : "库位名称",
					name : "baseLocation.locationName"
				}, {
					width :150,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "所属仓库",
					name : "baseLocation.depotName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 300,
					readOnly : true,
					allowBlank : true,
					single:false,
					fieldLabel : "数据权限",
					name : "baseLocation.permission",
					relateModule : RelationModule.appUser.relateModule,
					importhandler : this.importPermission.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					width :150,
					fieldLabel : "联系人",
					name : "baseLocation.linkman"
				},{
					width :300,
					fieldLabel : "地址",
					name : "baseLocation.address"
				},{
					xtype : "textarea",
					width :150,
					height : 75,
					fieldLabel : "描述",
					name : "baseLocation.description"
				}]
			}]
		}]
	}]

	BaseLocationForm.superclass.constructor.call(this, {
		title : "仓库明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "baseLocation",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveBaseLocation.do",
			items : items,
			fieldMapping : BaseLocationFieldMapping,
			hiddenField : BaseLocationHiddenField
		}
	});
}

Ext.extend(BaseLocationForm, Knight.ux.FormPanelWindow, {
	importPermission : function (data) {
		var fieldNames = [ "permission"];
		var s = "";
		var str = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.fullname+",";
			//s+= data[i].data.fullname+"  ";
			str += '{"userId":"'+data[i].data.userId+'","userName":"'+data[i].data.fullname+'"},'
		}
		str=str.substring(0,str.length-1);
		this.array = "["+str+"]";
		this.setMultiFieldValue(fieldNames, [s]);
	},
	saveFormData : function() {
		if(this.array!=""){
			this.setFieldValue("baseLocationPermissions",this.array);
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
		if(!Ext.isEmpty(this.locationId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadBaseLocation.do?locationId=" + this.locationId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					var fieldNames = [ "permission"];
					var n ="";
					if(data.baseLocationPermissionSet.length!=0){
						for(var j=0;j<data.baseLocationPermissionSet.length;j++){
							n += data.baseLocationPermissionSet[j].userName+",";
						}
					}
					this.setMultiFieldValue(fieldNames, [n])
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = [ "depotName","baseDepot.depotId"];
			var value = [this.baseDepot.depotName,this.baseDepot.depotId]
			this.setMultiFieldValue(fieldNames,value);
		}
	}
	
})