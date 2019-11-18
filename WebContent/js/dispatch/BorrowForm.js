var BorrowForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.payable = (this.borrowType == "0");
	if (!this.payable) {
		this.borrowType == "1";
	}
	this.currentDate = new Date();
	var maxBorrowDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);

	this.borrowComponentGrid = new BorrowComponentGrid(null, {
		saveable : this.saveable
	});
	this.borrowEquipGrid = new BorrowEquipGrid(null, {
		saveable : this.saveable
	});
	this.borrowAcceptanceGrid = new BorrowAcceptanceGrid();
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
					name : "borrow.userName"
				}, {
					readOnly : true,
					fieldLabel : "借用单号",
					name : "borrow.borrowSerial"
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
					name : "borrow.providedDate",
					value : this.currentDate
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "借用主题",
					name : "borrow.borrowTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "borrow.department.depName"
				}, {
					readOnly : true,
					fieldLabel : "借用类别",
					name : "borrow.borrowTypeName"
				} ]
			} ]
		} ]
	}, {
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
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "借用单位",
					name : "borrow.inrelateName",
					relations : [ {
						relation : RelationModule.corp
					}, {
						relation : RelationModule.customer
					} ],
					importhandler : this.importInRelationArchives.createDelegate(this)
				}, {
					fieldLabel : "借用经办人",
					name : "borrow.inHandler"
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "借出单位",
					name : "borrow.outrelateName",
					relations : [ {
						relation : RelationModule.corp
					}, {
						relation : RelationModule.customer
					} ],
					importhandler : this.importOutRelationArchives.createDelegate(this)
				}, {
					allowBlank : false,
					fieldLabel : "借出经办人",
					name : "borrow.outHandler"
				}, {
					xtype : "relationCompositeField",
                    disabled : !this.saveable,
                    allowBlank : true,
                    readOnly : true,
					fieldLabel : "当前存放地",
					name : "borrow.address",
					fields : ["address"],
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProject.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "办公电话",
					name : "borrow.inOfficeTel"
				}, {
					readOnly : false,
					fieldLabel : "联系方式",
					name : "borrow.inPhone"
				}, {
					fieldLabel : "办公电话",
					name : "borrow.outOfficeTel"
				}, {
					readOnly : false,
					fieldLabel : "联系方式",
					name : "borrow.outPhone"
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
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					maxValue : maxBorrowDate,
					fieldLabel : "借用时间",
					name : "borrow.borrowDate",
					value : this.currentDate
				}, {
					hidden : this.showRenewDate,
					fieldLabel : "审批状态",
					name : "borrow.applyforStateName"
				}, {
					hidden : !this.showRenewDate,
					fieldLabel : "续借时间",
					name : "borrow.renewDate"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "归还时间",
					name : "borrow.returnDate",
					value : this.currentDate
				}, {
					fieldLabel : "款项状态",
					name : "borrow.fundStatusName"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "借用说明",
			name : "borrow.instruction"
		}, {
			anchor : "95%",
			maxLength : 512,
			height : 32,
			xtype : "textarea",
			readOnly : !this.saveable,
			height : 75,
			fieldLabel : "备注",
			name : "borrow.remark",
			value : "1、本设备及物品借用单经双方签字或盖章后生效，传真或复印件具有同等法律效应。\r\n2、借用方应在借用归还时间内按期归还，需续借或造成损坏、遗失的应提前10日书面告知借用方。\r\n3、借用清单中的现值单价为遗失或损坏的赔偿计算依据，现值总额为现值单价X数量。\r\n4、因本借用产生的纠纷，任一方可向本单位工商注册地所属人民法院起诉。"
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.borrowComponentGrid, this.borrowEquipGrid, this.borrowAcceptanceGrid ]
	});
	if (this.payable && !this.saveable) {
		this.instalmentGrid = new InstalmentGrid({
			relateId : this.borrowId,
			relateSerial : this.borrowSerial,
			relateModule : RelationModule.borrow.relateModule,
			relateModuleName : RelationModule.borrow.relateModuleName
		}, {
			title : "赔偿付款计划",
			showremark : true
		});
		this.relateTabPanel.add(this.instalmentGrid);
	} else if (!this.payable && !this.saveable) {
		this.receivementGrid = new ReceivementGrid({
			relateId : this.borrowId,
			relateSerial : this.borrowSerial,
			relateModule : RelationModule.borrow.relateModule,
			relateModuleName : RelationModule.borrow.relateModuleName
		}, {
			title : "赔偿收款计划",
			showremark : true
		});
		this.relateTabPanel.add(this.receivementGrid);
	}
	items.push(this.relateTabPanel);
	BorrowForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "借用信息明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 960,
		height : 760,
		form_config : {
			labelWidth : 100,
			object : "borrow",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.borrowId,
				relateModule : RelationModule.borrow.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.borrowId,
				relateModule : RelationModule.borrow.relateModule
			},
			url : __ctxPath + "/dispatch/saveBorrow.do",
			items : items,
			fieldMapping : BorrowFieldMapping,
			hiddenField : BorrowHiddenField
		}
	});
};
Ext.extend(BorrowForm, Knight.ux.FormPanelWindow, {
	importProject : function(data, fields) {
		this.setMultiFieldValue(fields, [data.projectName])
	},
	importInRelationArchives : function(data, relation) {
		var fieldNames = [ "inrelateId", "inrelateModule", "inrelateName", "inOfficeTel" ];
		var values = [ relation.relateId, relation.relateModule, relation.relateSerial, relation.relateTel ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importOutRelationArchives : function(data, relation) {
		var fieldNames = [ "outrelateId", "outrelateModule", "outrelateName", "outOfficeTel" ];
		var values = [ relation.relateId, relation.relateModule, relation.relateSerial, relation.relateTel ];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		if ((this.borrowEquipGrid.getStore().getCount() + this.borrowComponentGrid.getStore().getCount()) == 0) {
			Ext.Msg.alert("警告", "未选择零配件/设备信息!");
			return;
		}
		if(this.borrowType != "0"){
			var data = this.borrowComponentGrid.getStore().data.items;
	        for(var k =0;k<data.length;k++){
	        	var consumeCounts = data[k].data.consumeCounts;
	        	var borrowCounts = data[k].data.borrowCounts;
	        	if(borrowCounts > consumeCounts){
	        		 Ext.MessageBox.alert("提示","借用数量大于库存数量不能保存");
	        		 return ;
	        	}
	        }
		}
		this.setFieldValue("borrowEquips", $gridstore2json(this.borrowEquipGrid));
		this.setFieldValue("borrowComponents", $gridstore2json(this.borrowComponentGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitBorrow.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.borrowId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadBorrow.do?borrowId=" + this.borrowId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.borrowEquipSet, this.borrowEquipGrid);
					this.setFormSubModuleGrid(data.borrowComponentSet, this.borrowComponentGrid);
					this.setFormSubModuleGrid(data.borrowAcceptanceSet, this.borrowAcceptanceGrid);
					this.setFormSubModuleGrid(data.instalmentSet, this.instalmentGrid);
					this.setFormSubModuleGrid(data.receivementSet, this.receivementGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "borrowType", "borrowTypeName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.borrowType, this.borrowTypeName ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});