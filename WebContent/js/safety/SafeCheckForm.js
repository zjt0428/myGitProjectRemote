var SafeCheckForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	
	var status = $initComboBoxField("检查状态", "safeCheck.status", "SAFE_CHECK_STATUS", {
		allowBlank : false
	});
	
	this.exwSerialId = Ext.id();
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
							maxLength : 24,
							fieldLabel : "设备型号",
							readOnly : true,
							css : "color:#7F7F7F;",
							name : "safeCheck.equipSpecific"
						}, {
							maxLength : 24,
							fieldLabel : "设备名称",
							readOnly : true,
							css : "color:#7F7F7F;",
							name : "safeCheck.equipGeneric"
						}]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [{
						readOnly : true,
						allowBlank : true,
						fieldLabel : "项目名称",
						css : "color:#7F7F7F;",
						name : "safeCheck.projectName"
					}, {
						readOnly : false,
						fieldLabel : "楼号",
						name : "safeCheck.buildingNum"
				}]
				},{
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ status,{
						xtype : "relationCompositeField",
						allowBlank : true,
						disabled : !this.saveable,
						single:false,
						readOnly : true,
						maxLength : 32,
						fieldLabel : "检查人员",
						name : "safeCheck.checkStaff",
						fields : [ "checkStaff"],
						relateModule : RelationModule.appUser.relateModule,
						cleanhandler : this.cleanMultiField.createDelegate(this),
						importhandler : this.importCheckStaffArchives.createDelegate(this)	
					},{
						xtype : "datefield",
						width : 130,
						editable : false,
						format : "Y-m-d",
						fieldLabel : "检查时间",
						name : "safeCheck.checkDate",
						value:new Date()
				}]
			} ]
		} ]
	} ];
	
	this.safeCheckGrid = new SafeCheckGrid(null,{
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.safeCheckGrid ]
	});
	items.push(this.relateTabPanel);
	SafeCheckForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 480,
		form_config : {
			title : "安全检查",
			object : "safeCheck",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveSafeCheck.do",
			items : items,
			fieldMapping : SafeCheckFieldMapping,
			hiddenField : SafeCheckHiddenField
		}
	});
};
Ext.extend(SafeCheckForm, Knight.ux.FormPanelWindow, {
	importCheckStaffArchives : function(data, fields) {
		var s = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.fullname+",";
		}
		this.setMultiFieldValue(fields, [s]);
	},
	saveFormData : function() {
		this.setFieldValue("safeCheckContents", $gridstore2json(this.safeCheckGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if(!Ext.isEmpty(this.safeCheckId)){
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadSafeCheck.do?safeCheckId=" + this.safeCheckId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					var datas = data.safeCheckContentSet;
					this.setFieldRawValue("status",data.statusName);
					this.setFormSubModuleGrid(data.safeCheckContentSet, this.safeCheckGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			if(!this.empty){
				var fieldNames = ["equipSpecific","equipGeneric","projectName"];
				var values = [this.equip.equipSpecificName,this.equip.equipGenericName,this.equip.projectName];
				this.setMultiFieldValue(fieldNames, values);
			}
		}
	}
});