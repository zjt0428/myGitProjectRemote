var EquipReduceForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.drop = this.drop;
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.jackingDateTextFieldId = Ext.id();
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.disclosureId,
		relateModule : RelationModule.technicalDisclosure.relateModule,
		saveable : this.saveable
	});
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
					name : "equipAddReduceDetail.executerName"
				},{
					fieldLabel : "减少的的标准节数量",
					readOnly : true,
					name : "equipAddReduceDetail.knotDisQty"
				},{
					fieldLabel : "减少的的附墙数量",
					readOnly : true,
					name : "equipAddReduceDetail.wallAttacheDisQty"
				},
				{
					fieldLabel : "减少的附墙杆数量",
					readOnly : true,
					name : "equipAddReduceDetail.wallAttachePoleQty"
				},{
					fieldLabel : "减少的附墙框数量",
					readOnly : true,
					name : "equipAddReduceDetail.wallAttacheFrameQty"
				},]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
//					editable : false,
					disabled : true,
					fieldLabel : "执行日期",
					name : "equipAddReduceDetail.executeDate",
				},{
					fieldLabel : "类型",
					name : "equipAddReduceDetail.relateModule",
					renderer : function(n) {
						if(n=="EQUIP_INSTALL"){
							return '顶升加节';
						}else{
							return '拆卸降节';
						}
					}
				} ,fileAttachContainer]
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
					name : "equipAddReduceDetail.equipSpecific"
				},{
					fieldLabel : "设备名称",
					readOnly : true,
					name : "equipAddReduceDetail.equipGeneric"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 64,
					fieldLabel : "设备自编号",
					readOnly : true,
					name : "equipAddReduceDetail.equipSerial"
				},{
					maxLength : 64,
					fieldLabel : "设备出厂编号",
					readOnly : true,
					name : "equipAddReduceDetail.exwSerial"
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
					name : "equipAddReduceDetail.projectName"
				},{
					fieldLabel : "备案编号",
					readOnly : true,
					name : "equipAddReduceDetail.recordSerial"
				}, ]
			}]
		} ]
	} ];
	//*******************************************************
	EquipReduceForm.superclass.constructor.call(this, {
		title : "加节降节信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 500,
		form_config : {
			labelWidth : 100,
			object : "equipAddReduceDetail",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveEquipAddReduceDetail.do?jj="+this.jj+"&drop="+this.drop,
			items : items,
			fieldMapping : EquipAddReduceDetailFieldMapping
		}
	});
};
Ext.extend(EquipReduceForm, Knight.ux.FormPanelWindow, {
     loadFormData : function() {
	if (!Ext.isEmpty(this.addReduceId)) {
		var data = $ajaxSyncCall( __ctxPath + "/archive/loadEquipReduceEquipAddReduceDetail.do?addReduceId=" + this.addReduceId);
		var fields = [ "equipGeneric", "equipSpecific",
				"knotNum", "wallAttacheNum","wallAttachePoleQty","wallAttacheFrameQty",
				"executerName", "executeDate",
				"relateModule", "relateId",
				"projectName", "exwSerial", "recordSerial",
				"contractSerial","equipSerial" ];
		var value = [ data.result[0].equipGeneric,
				data.result[0].equipSpecific,
				data.result[0].knotNum,
				data.result[0].wallAttacheNum,
				data.result[0].wallAttachePoleQty,
				data.result[0].wallAttacheFrameQty,
				data.result[0].executerName,
				data.result[0].executeDate.substr(0,10),
				data.result[0].relateModule,
				data.result[0].relateId,
				data.result[0].projectName,
				data.result[0].exwSerial,
				data.result[0].recordSerial,
				data.result[0].contractSerial,
				data.result[0].equipSerial];
		this.setMultiFieldValue(fields, value);
	}
},
});