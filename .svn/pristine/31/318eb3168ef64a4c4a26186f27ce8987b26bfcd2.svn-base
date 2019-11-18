var EquipInstallLhForm = function(a) {
	Ext.apply(this, a||{});
	var items = [ {
		xtype : "hidden",
		name : "installId",
		value: this.installId
	}, {
		xtype : "panel",
		layout : "form",
		defaultType : "textfield",
		height : 200,
		anchor : "100%",
		items : [ {
			fieldLabel : "原楼号",
			readOnly: true,
			name : "buildingNum",
			value : this.buildNum
		},{
			fieldLabel : "<span style='color:red'>变更楼号</span>",
			name : "newBuildingNum",
			allowBlank : false,	
			value : this.buildNum
		},{
			fieldLabel : "原当前高度",
			readOnly: true,
			name : "currentInstallHeight",
			value : this.currentInstallHeight
		},{
			fieldLabel : "<span style='color:red'>变更当前高度</span>",
			name : "newCurrentInstallHeight",
			allowBlank : false,	
			value : this.currentInstallHeight
		},{
			fieldLabel : "原臂长",
			readOnly: true,
			name : "brachium",
			value : this.brachium
		},{
			fieldLabel : "<span style='color:red'>变更臂长</span>",
			name : "newBrachium",
			allowBlank : false,	
			value : this.brachium
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
		url : __ctxPath + "/equip/editBuildNoEquipInstall.do",
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
	EquipInstallLhForm.superclass.constructor.call(this, {
		id : "EquipInstallLhForm",
		title : "安装信息修改",
		iconCls : "btn-personal-mail_attach",
		width : 480,
		height : 230,
		border : false,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : [ this.messageFormPanel ],
		buttons : buttonItems
	});
};
Ext.extend(EquipInstallLhForm, Ext.Window, {
	send : function() {
		if (this.messageFormPanel.getForm().isValid()) {
			this.messageFormPanel.getForm().submit({
				waitMsg : "正在 发送信息",
				success : function(b, c) {
					$toast("楼号修改成功！");
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