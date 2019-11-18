var AppLogisticsForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	this.LogisticsComGrid = new AppLogisticsComGrid(null, {
		saveable : false
	});
	this.LogisticsEquipGrid = new AppLogisticsEquipGrid(null, {
		saveable : false
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.logiId,
		relateModule : RelationModule.appLogistics.relateModule,
		saveable : this.saveable
	});

	var items = [ {
		xtype : "fieldset",
		title : "APP物流明细",
		anchor : "98%",
		items : [{
			xtpe:"panel",
			layout:"form",
			columnWidth : 0.98,
			items:[{
				xtype:"panel",
				layout : "column",
				items:[{
					layout : "form",
					columnWidth :0.98,
					defaultType : "textfield",
					items : [{
						fieldLabel : "发货人",
						width:300,
						dataIndex : "appLogistics.deliveryMan",
					}]
				}]				
			},{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth :0.33,
				defaultType : "textfield",
				items : [{
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					readOnly : true,
					allowBlank : true,
					editable : false,
					fieldLabel : "物流日期",
					name : "appLogistics.deliveryDate"
				},{
					fieldLabel : "运输单位",
					name : "appLogistics.propertyName"
				},{
					fieldLabel : "签收日期",
					name : "appLogistics.signDate"
				}]
			},{
				layout : "form",
				columnWidth :0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "出发地",
					name : "appLogistics.sendWarehouseName"
				}, {
                    fieldLabel: "运输费总计",
                    name: "appLogistics.summary"
                }, {
                    fieldLabel: "签收人",
                    name: "appLogistics.signMan"
                }]
			},{
				layout : "form",
				columnWidth :0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "目的地",
					name : "appLogistics.receiveWarehouseName"
				},  {
                    fieldLabel : "签收结果",
                    name : "appLogistics.signResult"
                }]
			}]
		},{
			xtype:"panel",
			layout : "column",
			items:[{
				layout : "form",
				columnWidth :0.98,
				defaultType : "textfield",
				items : [{
					xtype : "textarea",			
					anchor : "90%",
					maxLength : 128,
					maxLengthText : MoreThanMaxLength,
					height : 48,
					fieldLabel : "备注说明",
					name : "appLogistics.remark"
				},fileAttachContainer]
			}]				
		} ]
	}]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.LogisticsComGrid,this.LogisticsEquipGrid ]
	}];
	AppLogisticsForm.superclass.constructor.call(this, {
		title : this.title,
		width : 700,
		height: 500,
		form_config : {
			labelWidth : 60,
			object : "appLogistics",
			saveable : this.saveable,
			url : __ctxPath + "/app/saveLogistics.do",
			items : items,
			fieldMapping : AppLogisticsFieldMapping,
			hiddenField : AppLogisticsHiddenField
		}
	});
};
Ext.extend(AppLogisticsForm, Knight.ux.FormPanelWindow, {
	
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
		if (!Ext.isEmpty(this.logiId)){
			this.getForm().load({
				url : __ctxPath + "/app/loadLogistics.do?logiId=" + this.logiId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.tAppLogisticsCompSet, this.LogisticsComGrid);
					this.setFormSubModuleGrid(data.tAppLogisticsEquipSet, this.LogisticsEquipGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName"];
			var values = [ curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});