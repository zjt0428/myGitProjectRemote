var ContractArrangeSituationForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.equipCategoryName = this.equipCategory == "T" ? "塔吊" : "升降机";
	var items = [ {
		xtype : "panel",
		layout : "column",
		items : [ {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [ {
				readOnly : true,
				fieldLabel : "类型",
				name : "contractArrangeSituation.equipCategoryName"
			}, {
				fieldLabel : "项目要求",
				name : "contractArrangeSituation.demand"
			}, {
				fieldLabel : "安装高度",
				name : "contractArrangeSituation.installHeight"
			}, {
				fieldLabel : "安装时间(估)",
				name : "contractArrangeSituation.duration"
			} ]
		}, {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [ {
				fieldLabel : "承租单位",
				name : "contractArrangeSituation.receiveEntName"
			}, {
				fieldLabel : "设备型号",
				name : "contractArrangeSituation.equipSpecificName"
			}, {
				fieldLabel : "基础",
				name : "contractArrangeSituation.baseDescribe"
			}, {
				fieldLabel : "产权",
				name : "contractArrangeSituation.propertyName"
			} ]
		}, {
			layout : "form",
			columnWidth : 0.33,
			defaultType : "textfield",
			items : [ {
				fieldLabel : "项目名称",
				name : "contractArrangeSituation.projectName"
			}, {
				fieldLabel : "设备来源",
				name : "contractArrangeSituation.equipSource"
			}, {
				fieldLabel : "设备品牌",
				name : "contractArrangeSituation.equipVender"
			}, {
				fieldLabel : "IC编号",
				name : "contractArrangeSituation.icSerial"
			} ]
		} ]
	}, {
		anchor : "95%",
		maxLength : 128,
		xtype : "textarea",
		fieldLabel : "备注",
		name : "contractArrangeSituation.remark"
	} ];
	ContractArrangeSituationForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "业务安排明细",
		form_config : {
			labelWidth : 90,
			object : "contractArrangeSituation",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/saveContractArrangeSituation.do",
			items : items,
			fieldMapping : ContractArrangeSituationFieldMapping,
			hiddenField : ContractArrangeSituationHiddenField
		}
	});
};
Ext.extend(ContractArrangeSituationForm, Knight.ux.FormPanelWindow, {
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
		if (!Ext.isEmpty(this.planId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadContractArrangeSituation.do?arrangeSituationId=" + this.arrangeSituationId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "equipCategory", "equipCategoryName", "arrangeId" ];
			var values = [ this.equipCategory, this.equipCategoryName, this.arrangeId ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});