var StoreHouseForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = (this.saveable ? true : false); // 保存/重置功能按钮

	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					maxLength : 32,
					fieldLabel : "仓库编号",
					name : "storeHouse.storeSerial"
				}, {
					xtype : "numberfield",
					maxValue : 99999,
					fieldLabel : "仓库面积",
					name : "storeHouse.area"
				}, {
					maxLength : 16,
					fieldLabel : "仓管负责人",
					name : "storeHouse.linker"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.5,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					maxLength : 32,
					fieldLabel : "仓库名称",
					name : "storeHouse.storeName"
				}, {
					maxLength : 128,
					fieldLabel : "仓库地址",
					name : "storeHouse.address"
				}, {
					maxLength : 16,
					fieldLabel : "联系手机",
					name : "storeHouse.linkTel"
				} ]
			} ]
		} ]
	} ];
	StoreHouseForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		centerLayout : true,
		width : 580,
		height : 270,
		form_config : {
			title : "仓库信息",
			object : "storeHouse",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveStoreHouse.do",
			items : items,
			fieldMapping : StoreHouseFieldMapping,
			hiddenField : StoreHouseHiddenField
		}
	});
};
Ext.extend(StoreHouseForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.storeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadStoreHouse.do?storeId=" + this.storeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});