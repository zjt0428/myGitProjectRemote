var RecycleChangeDateForm = function(a) {
	Ext.apply(this, a||{});
	var items = [ {
		xtype : "hidden",
		name : "recycleId",
		value: this.recycleId
	}, {
		xtype : "panel",
		layout : "form",
		defaultType : "textfield",
		height : 60,
		anchor : "100%",
		items : [{
			xtype : "datetimefield",
			format : "Y-m-d H:i:s",
			width : 160,
			editable : false,
			allowBlank : false,
			fieldLabel : "回收日期",
			name : "recycleDate"
		}]
	}];
	this.messageFormPanel = new Ext.FormPanel({
		frame : false,
		bodyStyle : "margin:3px 3px 3px 3px;",
		autoScroll : true,
		defaultType : "textfield",
		labelAlign : "right",
		labelSeparator : "：",
		labelWidth : 100,
		url : __ctxPath + "/materials/changeDateRecycleManage.do",
		items : items
	});
	var buttonItems = [ {
		text : "保存",
		iconCls : "btn-save",
		handler : this.send.createDelegate(this)
	}, {
		text : "关闭",
		iconCls : "btn-close",
		handler : this.reset.createDelegate(this)
	} ];
	RecycleChangeDateForm.superclass.constructor.call(this, {
		id : "RecycleChangeDateForm",
		title : "修改回收日期",
		iconCls : "btn-personal-mail_attach",
		width : 350,
		height : 160,
		border : false,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : [ this.messageFormPanel ],
		buttons : buttonItems
	});
};
Ext.extend(RecycleChangeDateForm, Ext.Window, {
	send : function() {
		if (this.messageFormPanel.getForm().isValid()) {
			this.messageFormPanel.getForm().submit({
				waitMsg : "正在 发送信息",
				success : function(b, c) {
					$toast("回收日期修改成功！");
					if (this.callback) {
						this.callback.call(this);
					}
					this.close();
				}.createDelegate(this)
			});
		}
	},
	reset : function() {
		this.close();
	}
});