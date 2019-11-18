var EquipWarehouseAbnormalForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	this.equipWarehouseAbnormalComponGrid = new EquipWarehouseAbnormalComponGrid();
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
				columnWidth : 0.34,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "备案编号",
					name : "equipWarehouseAbnormal.recordId"
				}, {
					fieldLabel : "出厂编号",
					name : "equipWarehouseAbnormal.exwSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备名称",
					name : "equipWarehouseAbnormal.equipGenericName"
				}, {
					fieldLabel : "负责人",
					name : "equipWarehouseAbnormal.principal"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "规格型号",
					name : "equipWarehouseAbnormal.equipSpecificName"
				}, {
					fieldLabel : "项目名称",
					name : "equipWarehouseAbnormal.projectName"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目所属地",
			name : "equipWarehouseAbnormal.address"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.equipWarehouseAbnormalComponGrid ]
	} ];
	EquipWarehouseAbnormalForm.superclass.constructor.call(this, {
		title : "入库异常信息",
		width : 890,
		height : 380,
		form_config : {
			labelWidth : 100,
			object : "equipWarehouseAbnormal",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveequipWarehouseAbnormal.do",
			items : items,
			fieldMapping : EquipWarehouseAbnormalFieldMapping,
			hiddenField : EquipWarehouseAbnormalHiddenField
		}
	});
};
Ext.extend(EquipWarehouseAbnormalForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.abnormalId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipWarehouseAbnormal.do?abnormalId=" + this.abnormalId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.equipWarehouseAbnormalComponSet, this.equipWarehouseAbnormalComponGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});