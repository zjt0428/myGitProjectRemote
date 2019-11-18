var BorrowAcceptanceForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var storeHouseData = null;
	if (this.returnable) {
		storeHouseData = $ajaxSyncCall(__ctxPath + "/archive/arraylistStoreHouse.do", {
			Q_delFlag_S_EQ : "1"
		});
	}
	this.borrowComponentGrid = new BorrowComponentGrid({
		storeHouseData : storeHouseData
	}, {
		returnable : this.returnable,
		selectable : true,
		grid_config : {
			loadurl : __ctxPath + "/dispatch/listComponentBorrow.do",
			base_params : {
				Q_borrowId_L_EQ : this.borrowId
			}
		}
	});
	this.borrowEquipGrid = new BorrowEquipGrid({
		storeHouseData : storeHouseData
	}, {
		returnable : this.returnable,
		selectable : true,
		grid_config : {
			loadurl : __ctxPath + "/dispatch/listEquipBorrow.do",
			base_params : {
				Q_borrowId_L_EQ : this.borrowId
			}
		}
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
					readOnly : true,
					fieldLabel : "填报人",
					name : "borrowAcceptance.userName"
				}, {
					readOnly : true,
					fieldLabel : "借用单号",
					value : this.borrowSerial
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
					name : "borrowAcceptance.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "借用主题",
					value : this.borrowTheme
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "borrowAcceptance.department.depName"
				}, {
					readOnly : true,
					fieldLabel : "借用类别",
					value : this.borrowTypeName
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "验收信息",
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
					fieldLabel : "验收结果",
					name : "borrowAcceptance.acceptanceStatusName",
					value : this.acceptanceStatusName
				}, {
					readOnly : true,
					hidden : true,
					fieldLabel : "赔偿金额",
					name : "borrowAcceptance.compensateAmount",
					value : 0
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					readOnly : true,
					hidden : true,
					fieldLabel : "处理方式",
					name : "borrowAcceptance.handleMethodName",
					value : this.handleMethodName
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					hidden : true,
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "维修完成时间",
					name : "borrowAcceptance.arrivalPlanDate",
					value : this.arrivalPlanDate
				}, {
					xtype : "datefield",
					hidden : true,
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "到账时间",
					name : "borrowAcceptance.refundPlanDate",
					value : this.refundPlanDate
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			hidden : true,
			fieldLabel : "不合格原因",
			name : "borrowAcceptance.unqualified"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.borrowComponentGrid ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.borrowEquipGrid ]
	} ];
	if ("lose" == this.accMethod) {
		if (this.borrowType == "1") {
			this.receivementGrid = new ReceivementGrid({
				relateId : this.borrowId,
				relateSerial : this.borrowSerial,
				relateModule : RelationModule.borrow.relateModule,
				relateModuleName : RelationModule.borrow.relateModuleName
			}, {
				saveable : true
			});
			items.push({
				xtype : "panel",
				bodyStyle : "margin : 5px 0px 5px 0px",
				anchor : "98%",
				layout : "fit",
				items : [ this.receivementGrid ]
			});
		} else if (this.borrowType == "0") {
			this.instalmentGrid = new InstalmentGrid({
				relateId : this.borrowId,
				relateSerial : this.borrowSerial,
				relateModule : RelationModule.borrow.relateModule,
				relateModuleName : RelationModule.borrow.relateModuleName
			}, {
				saveable : true
			});
			items.push({
				xtype : "panel",
				bodyStyle : "margin : 5px 0px 5px 0px",
				anchor : "98%",
				layout : "fit",
				items : [ this.instalmentGrid ]
			});
		}

	}
	BorrowAcceptanceForm.superclass.constructor.call(this, {
		title : "借用验收",
		form_config : {
			labelWidth : 115,
			object : "borrowAcceptance",
			saveable : true,
			url : __ctxPath + "/dispatch/" + this.accMethod + "Borrow.do",
			items : items,
			fieldMapping : BorrowAcceptanceFieldMapping,
			hiddenField : BorrowAcceptanceHiddenField
		}
	});
};
Ext.extend(BorrowAcceptanceForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "borrowId", "acceptanceStatus", "handleMethod" ];
		var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.borrowId, this.acceptanceStatus, this.handleMethod ];
		this.setMultiFieldValue(fieldNames, values);
		if ("lose" == this.accMethod) {
			this.findFormField("acceptanceStatusName").show();
			this.findFormField("handleMethodName").show();
			this.findFormField("refundPlanDate").show();
			this.findFormField("refundPlanDate").allowBlank = false;
			this.findFormField("compensateAmount").show();
			this.findFormField("compensateAmount").allowBlank = false;
			this.findFormField("unqualified").show();
		} else if ("damage" == this.accMethod) {
			this.findFormField("acceptanceStatusName").show();
			this.findFormField("handleMethodName").show();
			this.findFormField("arrivalPlanDate").show();
			this.findFormField("arrivalPlanDate").allowBlank = false;
			this.findFormField("unqualified").show();
		}
	},
	saveFormData : function() {
		if ((this.borrowEquipGrid.getStore().getCount() + this.borrowComponentGrid.getStore().getCount()) == 0) {
			Ext.Msg.alert("警告", "未选择零配件/设备信息!");
			return;
		}
		var e = this.borrowComponentGrid.getSelectionModel().getSelections();
		var d = this.borrowEquipGrid.getSelectionModel().getSelections();
		if (e.length == 0 && d.length == 0) {
			$toast("选择要归还的信息");
			return;
		}
		var borrowComList = this.borrowComponentGrid.getStore().data.items;
		if(borrowComList.length>0 ){
		for(i = 0 ; i<borrowComList.length; i++){
			var b = Number(borrowComList[i].data.returnCounts);
			var a = Number(borrowComList[i].data.borrowCounts);
			if(b > a){
				Ext.MessageBox.show({
					title: "提示",
					msg: "归还数量不能大于借用数量",
					buttons: Ext.MessageBox.OK
					});
				return;
			}
		}	
		}
		if (this.receivementGrid) {
			this.setFieldValue("receivements", $gridstore2json(this.receivementGrid));
			this.setFieldValue("compensateAmount", this.receivementGrid.getTotalReceivement());
		} else if (this.instalmentGrid) {
			this.setFieldValue("instalments", $gridstore2json(this.instalmentGrid));
			this.setFieldValue("compensateAmount", this.instalmentGrid.getTotalPayment());
		}
		this.setFieldValue("borrowComponents", $gridselected2json(this.borrowComponentGrid));
		this.setFieldValue("borrowEquips", $gridselected2json(this.borrowEquipGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});