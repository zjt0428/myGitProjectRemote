var ChangeStoreArchivesForm = function(a) {
	Ext.apply(this, a || {});
	var items = [ {
		xtype : "hidden",
		name : "storeHouse.storeId",
		value : this.storeId
	}, {
		fieldLabel : "修改仓库名称",
		name : "storeHouse.storeName",
		value : this.storeName,
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
	ChangeStoreArchivesForm.superclass.constructor.call(this, {
		title : "修改仓库档案",
		width : 400,
		height : 120,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 85,
			items : items,
			object : "storeHouse",
			fieldMapping : StoreHouseFieldMapping,
			url : __ctxPath + "/archive/changeStoreHouse.do"
		},
	});
};
Ext.extend(ChangeStoreArchivesForm, Knight.ux.FormPanelWindow, {
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
	}
});