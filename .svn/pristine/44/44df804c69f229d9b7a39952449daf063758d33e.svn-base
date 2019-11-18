var AppRepairForm = function(a,b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true:false; // 保存/重置功能按钮

	this.appRepairComGrid = new AppRepairComGrid(null, {
		saveable : false
	});
	this.appRepairCostGrid = new AppRepairCostGrid(null, {
		saveable : true
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.repid,
		relateModule : RelationModule.appRepair.relateModule,
		saveable : this.saveable
	});
	
	var items = [ {
		xtype : "fieldset",
		title : "APP故障报修明细",
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
						fieldLabel : "项目名称",
						width:300,
						dataIndex : "appRepair.projName",
						readOnly : true,
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
						fieldLabel : "备案编号",
						name : "appRepair.recordSerial",
						readOnly : true
					},{
						fieldLabel : "报修人",
						name : "appRepair.createByname",
						readOnly : true
					}, {
						fieldLabel : "调配人",
						name : "appRepair.disManName",
						readOnly : true
					},{
						fieldLabel : "处理人",
						name : "appRepair.procMan",
						readOnly : true
					},{
						fieldLabel : "维修人员",
						name : "appRepair.repMan",
						readOnly : true
					},{
						fieldLabel : "故障类型",
						name : "appRepair.repairTypeName",
						readOnly : true
					}]
				},{
					layout : "form",
					columnWidth :0.33,
					defaultType : "textfield",
					items : [{
						fieldLabel : "设备型号",
						name : "appRepair.equipSpec",
						readOnly : true
					},{
						fieldLabel : "报修时间",					
						dataIndex : "appRepair.reportDt",
						readOnly : true				
					},{
						fieldLabel : "故障级别",					
						dataIndex : "appRepair.faultLevel",
						readOnly : true
					},{
						fieldLabel : "处理结果",
						name : "appRepair.procResult",
						readOnly : true
					}, {
						fieldLabel : "维修工时",
						name : "appRepair.repTimes",
						readOnly : true
					},{
						fieldLabel : "派工时间",
						name : "appRepair.disDate",
						readOnly : true
					}]
				},{
					layout : "form",
					columnWidth :0.34,
					defaultType : "textfield",
					items : [{
						fieldLabel : "出厂编号",
						name : "appRepair.exwSerial",
						readOnly : true
					},{
						fieldLabel : "状态",
						name : "appRepair.stateName",
						readOnly : true
					},{
						fieldLabel : "所在位置",
						name : "appRepair.location",
						readOnly : true
					},{
						fieldLabel : "维修费用(元)",
						name : "appRepair.repFee",
						readOnly : true
					},{
						fieldLabel : "完成时间",
						name : "appRepair.repairDt",
						readOnly : true
					}]
				} ]
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
						fieldLabel : "故障描述",
						name : "appRepair.faultDesc",
						readOnly : true
					},{
						xtype : "textarea",			
						anchor : "90%",
						maxLength : 128,
						maxLengthText : MoreThanMaxLength,
						height : 48,
						fieldLabel : "维修方案",
						name : "appRepair.repScheme",
						readOnly : true
					},fileAttachContainer]
				}]				
			}]
		}]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.appRepairComGrid ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.appRepairCostGrid ]
	}];
	
	AppRepairForm.superclass.constructor.call(this, {
		title : this.title,
		width : 750,
		height: 550,
		form_config : {
			labelWidth : 70,
			object : "appRepair",
			saveable : this.saveable,
			url : __ctxPath + "/app/saveRepair.do",
			items : items,
			fieldMapping : AppRepairFieldMapping,
			hiddenField : AppRepairHiddenField
		}
	});
};
Ext.extend(AppRepairForm, Knight.ux.FormPanelWindow, {	
	saveFormData : function() {
		this.setFieldValue("appRepairCostGrids", $gridstore2json(this.appRepairCostGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.recordSerial) {
				this.submitApplication(__ctxPath + "/app/saveRepair.do?repid=" + this.repid);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
		/*$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},*/
	loadFormData : function() {
		if (!Ext.isEmpty(this.repid)){
			this.getForm().load({
				url : __ctxPath + "/app/loadRepair.do?repid=" + this.repid,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.repairComponSet, this.appRepairComGrid);
					this.setFormSubModuleGrid(data.appRepairCostGridSet, this.appRepairCostGrid);
                    //this.setFieldValue("reportDt",data.reportDt.substring(0,19));
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