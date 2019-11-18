var ChangeProjectArchivesForm = function(a) {
	Ext.apply(this, a || {});
	var items = [ {
		xtype : "hidden",
		name : "project.projectId",
		value : this.projectId
	}, {
		fieldLabel : "项目名称",
		name : "project.projectName",
		value : this.projectName,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		xtype : "relationCompositeField",
		fieldLabel : "施工单位",
		name : "project.unCustomName",
		value : this.unCustomName,
		selectOnFocus : true,
		allowBlank : true,
		readOnly : true,
		relateModule : RelationModule.customer.relateModule,
		importhandler : this.importCustomerArchives.createDelegate(this),
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		xtype : "hidden",
		name : "project.unCustomId",
	}, {
		xtype : "hidden",
		name : "project.unCustomLinker",
	}, {
		xtype : "hidden",
		name : "project.unCustomLinkTel",
	}, {
		xtype : "hidden",
		name : "project.customerNickName",
	}, {
		xtype : "areaCompositeField",
		width : 160,	
		fieldLabel : "所在地",
		provinceName : "project.province",
		cityName : "project.city",
		countyName : "project.county",
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		fieldLabel : "项目地址",
		name : "project.address",
		value : this.address,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}, {
		fieldLabel : "施工单位项目经理",
		name : "project.leaseProjectHead",
		value : this.leaseProjectHead,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
	}];
	this.buttons = [ {
		text : "确认",
		iconCls : "btn-save",
		handler : this.submit.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-cancel",
		handler : this.cancel.createDelegate(this)
	} ];
	ChangeProjectArchivesForm.superclass.constructor.call(this, {
		title : "修改项目档案",
		width : 800,
		height : 300,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 85,
			items : items,
			object : "project",
			fieldMapping : ProjectFieldMapping,
			url : __ctxPath + "/archive/changeProject.do"
		},
		listeners : {
			afterrender : function(){
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadProject.do?projectId=" + this.projectId,
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("province", data.provinceName);
					this.setFieldRawValue("city", data.cityName);
					this.setFieldRawValue("county", data.countyName);
					this.setFieldRawValue("unCustomId", data.unCustomId);
					this.setFieldRawValue("unCustomLinker", data.unCustomLinker);
					this.setFieldRawValue("unCustomLinkTel", data.unCustomLinkTel);
					this.setFieldRawValue("customerNickName", data.customerNickName);
				}.createDelegate(this),
			});
			}
		}
	});
};
Ext.extend(ChangeProjectArchivesForm, Knight.ux.FormPanelWindow, {
	submit : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	cancel : function() {
		this.close();
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "unCustomId", "unCustomName", "unCustomLinker", "unCustomLinkTel","customerNickName"], [ data.customerId, data.customerName, data.customerLinker.linker, data.customerLinker.tel,data.customerNiceName]);
	}
});