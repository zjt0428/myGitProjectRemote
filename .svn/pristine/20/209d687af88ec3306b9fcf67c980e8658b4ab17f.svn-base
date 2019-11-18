var ProjectDepotInitForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		items: [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.3,
				defaultType : "textfield",
				items : [{
					readOnly : true,
					fieldLabel : "项目编号",
					name : "projectDepotInit.projectSerial"
				}, {
					readOnly : true,
					width : 320,
					fieldLabel : "项目名称",
					name : "projectDepotInit.projectName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.3,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "projectDepotInit.contractSerial"
				}, {
					width : 320,
					fieldLabel : "项目地址",
					name : "projectDepotInit.address"
				}]
			}, {
				layout : "form",
				columnWidth : 0.3,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "初始化人员",
					name : "projectDepotInit.initPerson",
					value:curUserInfo.fullname
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "初始化日期",
					name : "projectDepotInit.initDate",
					value : new Date()
				}]
			}]
		}]
	}];
	this.projectDepotInitDetailGrid = new ProjectDepotInitDetailGrid({
		projectInitId : this.projectInitId
	}, {
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.projectDepotInitDetailGrid ]
	});
	items.push(this.relateTabPanel);
	var remarks ={
			xtype : "fieldset",
			title : "",
			collapsible : false,
			anchor : "98%",
			labelWidth : 10,
			items : [] 
		};
	items.push(remarks);
	ProjectDepotInitForm.superclass.constructor.call(this, {
		title : "项目仓库初始化明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "projectDepotInit",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveProjectDepotInit.do",
			items : items,
			fieldMapping : ProjectDepotInitFieldMapping,
			hiddenField : ProjectDepotInitHiddenField
		}
	});
}

Ext.extend(ProjectDepotInitForm, Knight.ux.FormPanelWindow, {
	importCommodity : function (data) {
		var fieldNames = [ "commodity","mnemonics","specifications","unit","quantity","supplementUnit","supplementQuantity"];
		var values = [data.materialsCommodity.commodity,data.mnemonics,data.specifications,data.firstUnitConversion,
		              data.firstConvertedQuantity,data.secondUnitConversion,data.secondConvertedQuantity];
		this.setMultiFieldValue(fieldNames,values);
	},
	saveFormData : function() {
		this.setFieldValue("projectDepotInitDetails", $gridstore2json(this.projectDepotInitDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if(!Ext.isEmpty(this.projectInitId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadProjectDepotInit.do?projectInitId=" + this.projectInitId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.projectDepotInitDetailSet, this.projectDepotInitDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = [ "projectId","projectSerial","projectName","unCustomName","address","contractSerial","contractId"];
			var value = [this.project[0].projectId,this.project[0].projectSerial,this.project[0].projectName,this.project[0].unCustomName,this.project[0].address,this.contractMaterials.contractSerial,this.contractMaterials.contractmaId]
			this.setMultiFieldValue(fieldNames,value);
		}
	}
	
})