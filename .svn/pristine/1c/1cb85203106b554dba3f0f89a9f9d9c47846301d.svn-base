var EquipInstallReviewForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.drop = this.drop;
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
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
					fieldLabel : "验收结论",
					name : "equipInstallReview.reviewConclusion"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "验收状态",
					readOnly : true,
					name : "equipInstallReview.reviewStatus",
				},{
					fieldLabel : "类型",
					readOnly : true,
					name : "equipInstallReview.relateModule",
					renderer : function(n) {
						if(n=="EQUIP_INSTALL"){
							return '顶升加节';
						}else{
							return '拆卸降节';
						}
					}
				} ,{
					fieldLabel : "驳回理由",
					readOnly : true,
					name : "equipInstallReview.rejectReason"
				},{
					fieldLabel : "整改验收图片",
					readOnly : true,
					name : "equipInstallReview.reviewCheckAttach"
				},{
					fieldLabel : "相关照片",
					readOnly : true,
					name : "equipInstallReview.fileAttaches"
				},{
					fieldLabel : "自检照片",
					readOnly : true,
					name : "equipInstallReview.checkAttaches"
				}]
			}]
		} ]
	}, {
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
					readOnly : true,
					name : "equipInstallReview.equipSpecific"
				},{
					fieldLabel : "设备名称",
					readOnly : true,
					name : "equipInstallReview.equipGeneric"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 64,
					fieldLabel : "设备自编号",
					readOnly : true,
					name : "equipInstallReview.equipSerial"
				},{
					maxLength : 64,
					fieldLabel : "设备出厂编号",
					readOnly : true,
					name : "equipInstallReview.exwSerial"
				}  ]
			}]
		} ]
	},{
		xtype : "fieldset",
		title : "其他信息",
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
					fieldLabel : "项目名称",
					readOnly : true,
					name : "equipInstallReview.projectName"
				},{
					fieldLabel : "备案编号",
					readOnly : true,
					name : "equipInstallReview.recordSerial"
				}, ]
			}]
		} ]
	} ];
	//*******************************************************
	EquipInstallReviewForm.superclass.constructor.call(this, {
		title : "加节降节信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 500,
		form_config : {
			labelWidth : 100,
			object : "equipInstallReview",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveEquipInstallReview.do?jj="+this.jj+"&drop="+this.drop,
			items : items,
			fieldMapping : EquipInstallReviewFieldMapping
		}
	});
};
Ext.extend(EquipInstallReviewForm, Knight.ux.FormPanelWindow, {
     loadFormData : function() {
	if (!Ext.isEmpty(this.reviewId)) {
		var data = $ajaxSyncCall( __ctxPath + "/safety/loadEquipInstallReview.do?reviewId=" + this.reviewId);
		var fields = [ "equipGeneric", "equipSpecific",
				"reviewCheckAttach", "reviewConclusion",
				"reviewStatus", "rejectReason",
				"relateModule", "relateId",
				"projectName", "exwSerial", "recordSerial",
				"contractSerial","equipSerial","fileAttaches","checkAttaches" ];
		var value = [ data.result[0].equipGeneric,
				data.result[0].equipSpecific,
				data.result[0].reviewCheckAttach,
				data.result[0].reviewConclusion,
				data.result[0].reviewStatus,
				data.result[0].rejectReason,
				data.result[0].relateModule,
				data.result[0].relateId,
				data.result[0].projectName,
				data.result[0].exwSerial,
				data.result[0].recordSerial,
				data.result[0].contractSerial,
				data.result[0].fileAttaches,
				data.result[0].checkAttaches,
				data.result[0].equipSerial];
		this.setMultiFieldValue(fields, value);
	}
},
});