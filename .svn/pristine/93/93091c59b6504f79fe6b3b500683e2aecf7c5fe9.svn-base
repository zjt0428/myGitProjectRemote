var DeductForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	this.deductPractiGrid = new DeductPractiGrid({
		deductId : this.deductId
	}, {
		saveable : this.saveable
	});
	this.deductScaleGrid = new DeductScaleGrid(null, {
		title : "累加比例",
		saveable : false
	});

	this.deductScalePanel = new Ext.Panel({
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		height : 300,
		hidden : true,
		items : [ this.deductScaleGrid ]
	});
	var items = [ {
		xtype : "fieldset",
		title : "提成信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.66,
				items : [ {
					xtype : "fieldset",
					title : "填报人信息",
					anchor : "98%",
					items : [ {
						xtype : "panel",
						layout : "column",
						items : [ {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							defaults : {
								readOnly : true,
								width : 110
							},
							items : [ {
								fieldLabel : "填报人",
								name : "deduct.userName"
							}, {
								fieldLabel : "提成编号",
								name : "deduct.deductSerial"
							} ]
						}, {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							defaults : {
								readOnly : true,
								width : 110
							},
							items : [ {
								xtype : "datefield",
								format : "Y-m-d",
								readOnly : false,
								editable : false,
								fieldLabel : "填报日期",
								name : "deduct.providedDate",
								value : new Date()
							}, {
								fieldLabel : ContractLeaseFormConfigure.contractSerialHeader,
								name : "deduct.contractSerial"
							} ]
						}, {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							defaults : {
								readOnly : true,
								width : 110
							},
							items : [ {
								fieldLabel : "填报部门",
								name : "deduct.department.depName"
							}, {
								fieldLabel : "合同主题",
								name : "deduct.contractTheme"
							} ]
						} ]
					} ]
				}, {
					xtype : "fieldset",
					title : "基本信息",
					anchor : "98%",
					items : [ {
						xtype : "panel",
						layout : "column",
						items : [ {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							items : [ {
								readOnly : true,
								width : 110,
								fieldLabel : "合同总额",
								name : "deduct.contractAmount"
							} ]
						}, {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							items : [ {
								readOnly : true,
								width : 110,
								fieldLabel : "支出总额",
								name : "deduct.disbursement"
							} ]
						}, {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							items : [ {
								readOnly : true,
								width : 110,
								fieldLabel : "提成总额",
								name : "deduct.deductTotalAmount"
							} ]
						} ]
					}, {
						xtype : "panel",
						layout : "column",
						items : [ {
							layout : "form",
							columnWidth : 0.33,
							defaultType : "textfield",
							items : [ {
								readOnly : true,
								width : 110,
								fieldLabel : "比例(%)",
								name : "deduct.proportion"
							} ]
						}, {
							layout : "form",
							columnWidth : 0.66,
							defaultType : "textfield",
							items : [ {
								readOnly : true,
								width : 140,
								fieldLabel : "批复时间",
								name : "deduct.applyforPassDate"
							} ]
						} ]
					}, {
						xtype : "radiogroup",
						fieldLabel : "提成基数",
						disabled : !this.saveable,
						columns : [ 135, 135 ],
						items : [ {
							boxLabel : "按照合同实收款",
							name : "deduct.cardinal",
							inputValue : "0",
							checked : true
						}, {
							boxLabel : "按照合同毛利",
							name : "deduct.cardinal",
							inputValue : "1"
						} ]
					}, {
						xtype : "radiogroup",
						fieldLabel : "提成比例",
						disabled : !this.saveable,
						columns : [ 135, 135 ],
						items : [ {
							boxLabel : "同一比例",
							name : "deduct.proportionType",
							inputValue : "0",
							checked : true
						}, {
							boxLabel : "累加比例",
							name : "deduct.proportionType",
							inputValue : "1"
						} ],
						listeners : {
							change : this.proportionChange.createDelegate(this)
						}
					}, {
						anchor : "95%",
						maxLength : 128,
						maxLengthText : MoreThanMaxLength,
						xtype : "textarea",
						readOnly : !this.saveable,
						fieldLabel : "备注",
						name : "deduct.remark"
					} ]
				} ]
			}, {
				layout : "form",
				columnWidth : 0.34,
				labelWidth : 75,
				items : [ {
					xtype : "textfield",
					readOnly : true,
					hidden : true,
					fieldLabel : "同一比例(%)",
					name : "deduct_scale"
				}, this.deductScalePanel ]
			} ]
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.deductPractiGrid ]
	} ]
	DeductForm.superclass.constructor.call(this, {
		title : "提成信息明细",
		animateTarget : this.animateTarget,
		height : 590,
		width : 960,
		form_config : {
			labelWidth : 58,
			object : "deduct",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.deductId,
				relateModule : RelationModule.deduct.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.deductId,
				relateModule : RelationModule.deduct.relateModule
			},
			url : __ctxPath + "/fund/saveDeduct.do",
			items : items,
			fieldMapping : DeductFieldMapping,
			hiddenField : DeductHiddenField
		}
	});
};
Ext.extend(DeductForm, Knight.ux.FormPanelWindow, {
	proportionChange : function(group, radio) {
		if ("0" == radio.inputValue) { // 同一比例
			this.getForm().findField("deduct_scale").show();
			this.deductScalePanel.hide();
		} else if ("1" == radio.inputValue) { // 累加比例
			this.getForm().findField("deduct_scale").hide();
			this.deductScalePanel.show();
			this.deductScalePanel.doLayout();
		}
	},
	saveFormData : function() {
		if (this.deductPractiGrid.getStore().getCount() <= 0) {
			$toast("未有提成人员！");
			return;
		}
		var percent = this.deductPractiGrid.getTotalPercent();
		if (percent != 100) {
			$toast("提成未完全分摊,请检查提成人员的分配比例总和为:" + percent + "%！");
			return;
		}
		this.getForm().findField("deduct.deductPractis").setValue($gridstore2json(this.deductPractiGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitDeduct.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		$request({
			url : __ctxPath + "/fund/loadDeductScale.do",
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var scale = resp.data[0];
				this.getForm().findField("deduct_scale").setValue(scale.scalePercent);
				if (scale.deductScaleSet && scale.deductScaleSet.length > 0) {
					var height = (21 * scale.deductScaleSet.length) > 275 ? 275 : (21 * scale.deductScaleSet.length);
					this.deductScaleGrid.addHeight(height);
					this.deductScaleGrid.getStore().loadData(scale.deductScaleSet);
					this.deductScaleGrid.getStore().sort("scaleStart", "ASC");
				}
			}.createDelegate(this)
		});
		if (!Ext.isEmpty(this.deductId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadDeduct.do?deductId=" + this.deductId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if (data.deductPractiSet && data.deductPractiSet.length > 0) {
						this.deductPractiGrid.addRecordHeight(data.deductPractiSet.length);
						this.deductPractiGrid.getStore().loadData(data.deductPractiSet);
					}
					if ("0" == data.proportionType) {
						this.getForm().findField("deduct_scale").show();
					} else {
						this.deductScalePanel.show();
						this.deductScalePanel.doLayout();
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "contractId", "contractSerial", "contractTheme", "contractAmount" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.contract.contractId, this.contract.contractSerial, this.contract.contractTheme, this.contract.contractAmount ];
			this.setMultiFieldValue(fieldNames, values);
			this.getForm().findField("deduct_scale").show();
		}
	}
});