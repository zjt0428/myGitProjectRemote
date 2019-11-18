var AppDispatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	this.dispatchComGrid = new AppDispatchComGrid(null, {
		saveable : false
	});
	this.dispatchEquipGrid = new AppDispatchEquipGrid(null, {
		saveable : false
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.disid,
		relateModule : RelationModule.appDispatch.relateModule,
		saveable : this.saveable
	});

	var items = [ {
		xtype : "fieldset",
		title : "APP调度明细",
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
					columnWidth :0.33,
					defaultType : "textfield",
					items : [{
						fieldLabel : "调度单号",
						width:300,
						dataIndex : "appDispatch.dispatchSerial",
					}]
				}]
			},{
				xtype:"panel",
				layout : "column",
				items:[{
					layout : "form",
					columnWidth :0.33,
					defaultType : "textfield",
					items : [{
						fieldLabel : "调入地",
						width:300,
						dataIndex : "appDispatch.receiveWarehouseName",
					}]
				},{
                    layout : "form",
                    columnWidth :0.33,
                    defaultType : "textfield",
                    items : [{
                        fieldLabel : "调出地",
                        width:300,
                        dataIndex : "appDispatch.sendWarehouseName",
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
					fieldLabel : "调度日期",
					name : "appDispatch.disDate"
				},{
					fieldLabel : "调度人员",
					name : "appDispatch.dispatcher"
				}]
			},{
				layout : "form",
				columnWidth :0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "申请人员",
					name : "appDispatch.createByName"
				}]
			},{
				layout : "form",
				columnWidth :0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "调度类型",
					name : "appDispatch.disTypeName"
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
					name : "appDispatch.remark"
				},fileAttachContainer]
			}]				
		} ]
	}]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.dispatchComGrid,this.dispatchEquipGrid ]
	}];
	AppDispatchForm.superclass.constructor.call(this, {
		title : this.title,
		width : 700,
		height: 500,
		form_config : {
			labelWidth : 60,
			object : "appDispatch",
			saveable : this.saveable,
			url : __ctxPath + "/app/saveDispatch.do",
			items : items,
			fieldMapping : AppDispatchFieldMapping,
			hiddenField : AppDispatchHiddenField
		}
	});
};
Ext.extend(AppDispatchForm, Knight.ux.FormPanelWindow, {
	
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
		if (!Ext.isEmpty(this.disid)){
			this.getForm().load({
				url : __ctxPath + "/app/loadDispatch.do?disid=" + this.disid,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.dispComponDetailSet, this.dispatchComGrid);
					this.setFormSubModuleGrid(data.dispEquipDetailSet, this.dispatchEquipGrid);
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