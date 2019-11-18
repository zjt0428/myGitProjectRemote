var CarForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.carId,
		relateModule : RelationModule.car.relateModule,
		saveable : this.saveable
	});
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
				items : [ {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "车牌号",
					name : "car.licensePlate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 32,
//					allowBlank : false,
					fieldLabel : "车型",
					name : "car.sedan"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 64,
//					allowBlank : false,
					fieldLabel : "产权人",
					name : "car.propertyName"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "补充信息",
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
					maxLength : 10,
					fieldLabel : "发动机号",
					name : "car.engineNumber"
				}, {
					maxLength : 32,
					fieldLabel : "司机",
					name : "car.driver"
				}, {
					maxLength : 16,
					fieldLabel : "司机电话",
					name : "car.driverPhone"
				}, {
					maxLength : 18,
					fieldLabel : "身份证号",
					name : "car.idCard"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "报废时间",
					name : "car.scrapDate"
				}, {
					xtype : "datefield",
					width : 130,
//					allowBlank : false,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "购买时间",
					name : "car.purchaseDate"
				}, {
					readOnly : true,
					maxLength : 10,
					fieldLabel : "累积支出",
					name : "car.disbursement"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					maxValue : 10000,
					fieldLabel : "额定载重(吨)",
					name : "car.nominalLoad"
				}, {
					xtype : "radiogroup",
					fieldLabel : "产权归属",
					items : [ {
						boxLabel : "自有",
						name : "car.propertyBelong",
						inputValue : 1,
						checked : true
					}, {
						boxLabel : "租赁",
						name : "car.propertyBelong",
						inputValue : 0
					} ]

				}, {
					readOnly : true,
					maxLength : 10,
					fieldLabel : "当前状态",
					name : "car.statusName"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "car.remark"
		}, fileAttachContainer ]
	} ];
	var height = 380;
	if (!Ext.isEmpty(this.carId)) {
		var height = 470;
		this.carExpenseGrid = new CarExpenseGrid({
			carId : this.carId
		}, {
			saveable : this.saveable
		});
		items.push({
			xtype : "panel",
			bodyStyle : "margin : 5px 0px 5px 0px",
			anchor : "98%",
			layout : "fit",
			items : [ this.carExpenseGrid ]
		});
	}
	CarForm.superclass.constructor.call(this, {
		title : "车辆档案",
		width : 850,
		height : height,
		form_config : {
			object : "car",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveCar.do",
			items : items,
			fieldMapping : CarFieldMapping,
			hiddenField : CarHiddenField
		}
	});
};
Ext.extend(CarForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		if (this.carExpenseGrid) {
			for (var i = 0; i < this.carExpenseGrid.getStore().getCount(); i++) {
				var r = this.carExpenseGrid.getStore().getAt(i).data;
				if (Ext.isEmpty(r.expense) || Ext.isEmpty(r.paymentAmount) || Ext.isEmpty(r.spendDate)) {
					Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录!");
					return;
				}
			}
			this.setFieldValue("carExpenses", $gridstore2json(this.carExpenseGrid), true);
		}
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.carId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadCar.do?carId=" + this.carId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.carExpenseGrid.addRecordHeight(data.carExpenseSet.length);
					this.carExpenseGrid.getStore().loadData(data.carExpenseSet);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});