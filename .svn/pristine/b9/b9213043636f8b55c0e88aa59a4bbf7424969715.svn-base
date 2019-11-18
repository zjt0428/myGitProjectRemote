var ContractArrangeDerivedForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.equipCategoryId = Ext.id();
	this.currentDate = new Date();

	this.contractArrangeSituationGrid = new ContractArrangeSituationGrid({
		equipCategory : this.equipCategory
	}, {
		saveable : this.saveable
	});
	var items = [ {
		xtype : "hidden",
		id : this.equipCategoryId,
		name : "contractArrange.equipCategory"
	}, {
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
					readOnly : true,
					fieldLabel : "填报人",
					name : "contractArrange.userName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "填报日期",
					name : "contractArrange.providedDate",
					value : this.currentDate
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "设备类型",
					name : "contractArrange.equipCategoryName"
				} ]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.contractArrangeSituationGrid ]
	});
	items.push(this.relateTabPanel);
	ContractArrangeDerivedForm.superclass.constructor.call(this, {
		title : this.equipCategoryName + "安排",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		form_config : {
			labelWidth : 90,
			object : "contractArrange",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/saveContractArrange.do",
			items : items,
			fieldMapping : ContractArrangeFieldMapping,
			hiddenField : ContractArrangeHiddenField
		}
	});
};
Ext.extend(ContractArrangeDerivedForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("contractArrangeSituations", $gridstore2json(this.contractArrangeSituationGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.arrangeId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadContractArrange.do?arrangeId=" + this.arrangeId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.contractArrangeSituationSet, this.contractArrangeSituationGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName", "arrangeType", "equipCategory", "equipCategoryName" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname, "1", this.equipCategory, this.equipCategoryName ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});