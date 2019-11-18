var SideStationForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	
	var items = [{
		xtype : "fieldset",
		title : "旁站信息",
		anchor : "95%",
		items : [{
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [{
					maxLength : 24,
					readOnly : true,
					fieldLabel : "旁站编号",
					name : "sideStation.stationSerial"	
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [{
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "类别",
					name : "sideStation.category"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [{
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "旁站内容",
					name : "sideStation.details"
				}]
			}]
		}]
	}]
	SideStationForm.superclass.constructor.call(this, {
		title : "旁站信息",
		height : 600,
		animateTarget : this.animateTarget,
		centerLayout : true,
		form_config : {
			object : "sideStation",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveSideStation.do",
			items : items,
			fieldMapping : SideStationFieldMapping,
			hiddenField : SideStationHiddenField
		}
	});
};
Ext.extend(SideStationForm, Knight.ux.FormPanelWindow, {
	
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
		if(!Ext.isEmpty(this.stationId)){
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadSideStation.do?stationId=" + this.stationId,
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