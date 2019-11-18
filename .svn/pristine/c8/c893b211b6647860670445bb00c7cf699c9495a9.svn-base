var BaseDepotInitForm = function(a, b) {
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
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "品名",
					name : "baseDepotInit.commodity",
					relations : [ {
						relation : RelationModule.materialsInit,
						params : {
							"Q_baseDepot.depotId_L_EQ" : this.baseDepot==null? null :this.baseDepot.depotId
						}
					}],
					importhandler : this.importCommodity.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "助记码",
					name : "baseDepotInit.mnemonics"
				}, {
					readOnly : true,
					fieldLabel : "规格",
					name : "baseDepotInit.specifications"
				}]
			}, {
				layout : "form",
				columnWidth : 0.3,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "计量单位",
					name : "baseDepotInit.unit"
				}, {
					readOnly : true,
					fieldLabel : "所属仓库",
					name : "baseDepotInit.depotName"
				}, {
					id : "total",
					readOnly : true,
					fieldLabel : "计量数量总数",
					name : "baseDepotInit.total"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.3,
				defaultType : "textfield",
				items : [{
					fieldLabel : "辅助单位",
					name : "baseDepotInit.supplementUnit"
				}, {
					fieldLabel : "换算系数",
					name : "baseDepotInit.conversion"
				}, {
					id : "supplementTotal",
					readOnly : true,
					fieldLabel : "辅助数量总数",
					name : "baseDepotInit.supplementTotal"
				}]
			}]
		}]
	}];
	this.baseDepotInitDetailGrid = new BaseDepotInitDetailGrid({
		depotInitId : this.depotInitId
	}, {
		saveable : this.saveable
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "40%",
		activeTab : 0,
		items : [ this.baseDepotInitDetailGrid ]
	});
	items.push(this.relateTabPanel);
	BaseDepotInitForm.superclass.constructor.call(this, {
		title : "仓库明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "baseDepotInit",
			saveable : this.saveable,
			url : __ctxPath + "/materials/saveBaseDepotInit.do",
			items : items,
			fieldMapping : BaseDepotInitFieldMapping,
			hiddenField : BaseDepotInitHiddenField
		}
	});
}

Ext.extend(BaseDepotInitForm, Knight.ux.FormPanelWindow, {
	importCommodity : function (data, relation) {
		var fieldNames = ["specificationsId", "commodity","mnemonics","specifications","unit","quantity","supplementUnit","conversion"];
		var values = [relation.specificationsId,relation.commodity,relation.mnemonics,relation.specifications,relation.unit,
		              relation.quantity,relation.supplementUnit,relation.conversion];
		this.setMultiFieldValue(fieldNames,values);
		var baseDepotInitDetailSet=[];
		this.baseDepotInitDetailGrid.getStore().removeAll();
		for (var i = 0; i < this.locationList.length; i++) {
			var b = {
				locationId : this.locationList[i].locationId,
				locationName : this.locationList[i].locationName,
				conversion : relation.conversion,
				unit : relation.unit,
				supplementUnit : relation.supplementUnit
			};
			baseDepotInitDetailSet[i] = b;
		}
		this.baseDepotInitDetailGrid.addSubModule(baseDepotInitDetailSet);
	},
	saveFormData : function() {
		this.getForm().findField("baseDepotInit.baseDepotInitDetails").setValue($gridstore2json(this.baseDepotInitDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if(!Ext.isEmpty(this.depotInitId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadBaseDepotInit.do?depotInitId=" + this.depotInitId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.baseDepotInitDetailSet, this.baseDepotInitDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = [ "depotName","baseDepot.depotId"];
			var value = [this.baseDepot.depotName,this.baseDepot.depotId]
			this.setMultiFieldValue(fieldNames,value);
			if (this.saveable && this.locationList.length > 0) {
				new Ext.util.DelayedTask(function() {
					var baseDepotInitDetailSet=[];
					for (var i = 0; i < this.locationList.length; i++) {
						var b = {
							locationId : this.locationList[i].locationId,
							locationName : this.locationList[i].locationName
						};
						baseDepotInitDetailSet[i] = b;
					}
					this.baseDepotInitDetailGrid.getStore().loadData(baseDepotInitDetailSet);
				}.createDelegate(this)).delay(50);
			}
		}
	}
	
})