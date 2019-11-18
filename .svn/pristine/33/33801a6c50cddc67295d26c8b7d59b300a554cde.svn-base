var MaterialsRepairForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮
	var runningStateCombo = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=project", "维修班组", "materialsRepair.teamId",false);

	var beforeResultData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do",{
		"Q_baseDepot.depotId_L_EQ" : this.storeId
	}); 
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.materialsRepairId,
		relateModule : RelationModule.materialsRepair.relateModule,
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
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ /*{
					readOnly : true,
					fieldLabel : "状态",
					name : "materialsRepair.applyforStateName"
				},*/ {
					readOnly : true,
					fieldLabel : "填报人",
					name : "materialsRepair.userName"
				},  {
					readOnly : true,
					fieldLabel : "单据编号",
					name : "materialsRepair.repairSerial"
				}, {
					xtype : "hidden",
					name : "materialsRepair.teamId",
					id : "materialsRepair.teamId"
				} ,runningStateCombo  ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					allowBlank : true,
					fieldLabel : "维修费用",
					name : "materialsRepair.repairCost",
					value: 0
				}, {
					allowBlank : true,
					fieldLabel : "维修主题",
					name : "materialsRepair.repairTheme"
				}, {
					
					fieldLabel : "维修情况",
					name : "materialsRepair.repairSituation"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					readOnly:true,
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "维修日期",
					name : "materialsRepair.repairDate",
					value : new Date()
				},{
					readOnly : true,
					fieldLabel : "仓库名称",
					name : "materialsRepair.storeName"
				},{
					fieldLabel : "附属单号",
					name : "materialsRepair.affiliatedSerial"
				}]
			} ]
		} ]
	}];
	
	this.beforeMaterialsRepairGrid = new BeforeMaterialsRepairGrid(null, {
		storeId : this.storeId,
		saveable : this.saveable,
		beforeResultData : beforeResultData
	}, {
		selectable : true,
		grid_config : {
			loadurl : __ctxPath + "/materials/listBeforeBaseLocation.do",
			base_params : {
				Q_userId_L_EQ : curUserInfo.userId
			}
		}
	});
	this.afterMaterialsRepairGrid = new AfterMaterialsRepairGrid(null, {
		storeId : this.storeId,
		saveable : this.saveable,
		beforeResultData : beforeResultData,
		beforeMaterialsRepairGrid :this.beforeMaterialsRepairGrid,
	}, {
		selectable : true,
		grid_config : {
			loadurl : __ctxPath + "/materials/listBeforeBaseLocation.do",
			base_params : {
				Q_userId_L_EQ : curUserInfo.userId
			}
		}
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [  this.beforeMaterialsRepairGrid,this.afterMaterialsRepairGrid]
	});
	items.push(this.relateTabPanel);
	items.push({
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [ {
		anchor : "85%",
		maxLength : 128,
		maxLengthText : MoreThanMaxLength,
		xtype : "textarea",
		fieldLabel : "备注",
		name : "materialsRepair.remark"
	  },fileAttachContainer ]
	})
	MaterialsRepairForm.superclass.constructor.call(this, {
		title : "周材维修",
		animateTarget : this.animateTarget,
		maximized : true,
		form_config : {
			labelWidth : 100,
			object : "materialsRepair",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.materialsRepairId,
				relateModule : RelationModule.materialsRepair.relateModule
			},
			url : __ctxPath + "/daily/saveMaterialsRepair.do",
			items : items,
			fieldMapping : MaterialsRepairFieldMapping,
			hiddenField : MaterialsRepairHiddenField
		}
	});
};
Ext.extend(MaterialsRepairForm, Knight.ux.FormPanelWindow, {
	importBaseDepotArchives : function(data) {
		this.setMultiFieldValue(["storeId","storeName" ], [ data.depotId,data.depotName ]);
	},
	saveFormData : function() {
		var before = this.getGridData(this.beforeMaterialsRepairGrid);
		var after = this.getGridData(this.afterMaterialsRepairGrid);
		var boolean = this.compare(before,after);
		if(boolean) {
			Ext.MessageBox.alert('警告','维修前/后的辅助数量不一致，无法保存！');
			return;
		}
		this.setFieldValue("beforeMaterialsRepairs", $gridstore2json(this.beforeMaterialsRepairGrid));
		this.setFieldValue("afterMaterialsRepairs", $gridstore2json(this.afterMaterialsRepairGrid));
		var team = this.getForm().findField("depTreeSelector").value;
		this.setFieldValue("teamName", team);
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/daily/multiSubmitMaterialsRepair.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.materialsRepairId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/daily/loadMaterialsRepair.do?materialsRepairId=" + this.materialsRepairId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.beforeMaterialsRepairSet, this.beforeMaterialsRepairGrid);
					this.getForm().findField("depTreeSelector").setValue(data.teamName);
					this.setFormSubModuleGrid(data.afterMaterialsRepairSet, this.afterMaterialsRepairGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = [ "userId", "userName" ];
			var values = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
			this.findFormField("storeId").setValue(this.storeId);
			this.findFormField("storeName").setValue(this.storeName);
		}
	},
	getGridData : function (grid) {
		var array = [];
		for(var i=0;i<grid.getStore().getCount();i++){
			var boolean = false;
			for(var j=0;j<array.length;j++) {
				if(array[j].commodityId == grid.getStore().getAt(i).data.commodityId) {
					array[j].auxiliaryNum = (Number(array[j].auxiliaryNum)+Number(grid.getStore().getAt(i).data.auxiliaryNum)).toFixed(2);
					boolean = true;
				} 
			}
			if(boolean){
				continue;
			}
			var map = null;
			map = {
				'commodityId' : grid.getStore().getAt(i).data.commodityId,
				'auxiliaryNum' : Number(grid.getStore().getAt(i).data.auxiliaryNum),
			}
			array.push(map);
		}
		return array;
	},
	compare : function(before,after) {  //对比维修前/后 同品名的辅助数量总和是否相等
		var boolean = false;
		if(before.length!=after.length) {
			boolean=true;
		} else {
			for(var i=0;i<before.length;i++) {
				for(var j=0;j<after.length;j++) {
					if(before[i].commodityId==after[j].commodityId && before[i].auxiliaryNum!=after[j].auxiliaryNum) {
						boolean = true;
					}
				}
			}
		}
		return boolean;
	}
});