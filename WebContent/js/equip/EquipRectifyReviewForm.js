var EquipRectifyReviewForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.drop = this.drop;
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.installId,
		relateModule : RelationModule.equipInstall.relateModule,
		saveable : this.saveable
	});
	this.jackingDateTextFieldId = Ext.id();
	var items = [ {
		xtype : "fieldset",
		title : "填报人信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "执行人",
					name : "equipInstallReview.executerName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "执行日期",
					name : "equipInstallReview.executeDate",
					value : new Date()
				},{
					header : "类型",
					name : "equipInstallReview.relateModule",
					renderer : function(n) {
						if(n=="EQUIP_INSTALL"){
							return '顶升加节';
						}else{
							return '拆卸降节';
						}
					}
				}, ]
			}]
		} ]
	}/*, {
		xtype : "fieldset",
		title : "设备信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "设备型号",
					name : "equipInstallReview.equipFlow.equipDiary.equipSpecificName"
				},{
					fieldLabel : "设备名称",
					name : "equipInstallReview.equipFlow.equipDiary.equipGenericName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "备案编号",
					name : "equipInstallReview.equipFlow.equipDiary.recordId"
				}, {
					maxLength : 64,
					fieldLabel : "设备自编号",
					name : "equipInstallReview.equipmentNo"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "出厂日期",
					name : "equipInstallReview.exwDate"
				}, {
					maxLength : 64,
					fieldLabel : "生产厂家",
					name : "equipInstallReview.equipVender"
				} ]
			} ]
		} ]
	} */];
	//*******************************************************
	EquipRectifyReviewForm.superclass.constructor.call(this, {
		title : "加节降节信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 500,
		form_config : {
			labelWidth : 100,
			object : "equipInstallReview",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveEquipInstallReview.do?jj="+this.jj+"&drop="+this.drop,
			items : items,
			fieldMapping : EquipInstallReviewFieldMapping
		}
	});
};
Ext.extend(EquipRectifyReviewForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.addReduceId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadEquipInstallReview.do?addReduceId=" + this.addReduceId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
//					this.setFieldValue("equipFlow.equipDiary.address", data.equipFlow.contractLease.address);
				/*	var stantardLen=0;
					var attachLen = 0;
					var firstKnotCount = 0;
					var firstAttach = 0;
					
					this.setFieldValue("wallAttacheQty", attachLen);
					this.setFieldValue("knotCounts", stantardLen);
					//this.setFieldValue("knotCounts", 12);
					this.setFieldValue("firstAttach", firstAttach);
					this.setFieldValue("firstKnotCount", firstKnotCount);*/
					
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} 
			var fieldNames = [ "executerName", "executeDate", "relateModule"];
			var values = [ this.executerName, this.executeDate,this.relateModule ];
			this.setMultiFieldValue(fieldNames, values);
	}
});