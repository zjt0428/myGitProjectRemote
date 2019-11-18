var EquipInspectForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true:false; // 保存/重置功能按钮
	this.approveable = this.approveable ? this.approveable : false; // 审批功能按钮

	var inspectResultData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "INSPECT_RESULT"
	});
	this.equipInspectDetailGrid = new EquipInspectDetailGrid({
		inspectResultData : inspectResultData
	}, {
		parentForm : this,
		saveable : this.cost ? false:true
	});
	this.costInspectGrid = new CostInspectGrid({
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.inspectId,
		relateModule : RelationModule.equipInspect.relateModule,
		saveable : this.cost ? false:true
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报信息",
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
					fieldLabel : "巡检单号",
					name : "equipInspect.inspectSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 130,
					editable : false,
					allowBlank : false,
					readOnly : this.cost ? true:false,
					fieldLabel : "巡检日期",
					name : "equipInspect.inspectDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "simplecombo",
					width : 130,
					readOnly : this.cost ? true:false,
					codeData : inspectResultData,
					fieldLabel : "整机巡检结果",
					hiddenName : "equipInspect.inspectResult",
					name : "equipInspect.inspectResultName"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : this.cost ? true:false,
			fieldLabel : "巡检人员",
			name : "equipInspect.inspectPepoles"
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
				columnWidth : 0.34,
				defaultType : "textfield",
				defaults : {
					readOnly : true,
				},
				items : [ {
					fieldLabel : "设备自编号",
					name : "equipInspect.equipInspectSchema.equipDiary.equipSerial"
				}, {
					fieldLabel : "设备名称",
					name : "equipInspect.equipInspectSchema.equipDiary.equipGenericName"
				}, {
					fieldLabel : "截止时间",
					name : "equipInspect.thisEndCycleDate"
				}, {
					hidden : true,
					fieldLabel : "计划区域",
					name : "equipInspect.equipInspectSchema.belongToAreaName"
				},{
					fieldLabel : "安装高度",
					name : "equipInspect.installHeight"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true,
				},
				items : [ {
					fieldLabel : "出厂编号",
					name : "equipInspect.equipInspectSchema.equipDiary.exwSerial"
				}, {
					fieldLabel : "规格型号",
					name : "equipInspect.equipInspectSchema.equipDiary.equipSpecificName"
				}, {
					fieldLabel : "频次",
					name : "equipInspect.cycleTimes"
				},{
					fieldLabel : "累计标准节数",
					name : "equipInspect.knotCounts"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true,
				},
				items : [ {
					fieldLabel : "项目名称",
					name : "equipInspect.equipInspectSchema.equipDiary.projectName"
				}, {
					fieldLabel : "状态",
					name : "equipInspect.statusName"
				}, {
					xtype : "relationCompositeField",
					disabled : this.cost ? true:false,
					allowBlank : true,
					fieldLabel : "巡检车辆",
					name : "equipInspect.licensePlate",
					relateModule : RelationModule.car.relateModule,
					importhandler : this.importCarArchives.createDelegate(this)
				}, {
					fieldLabel : "累计附墙数",
					name : "equipInspect.wallAttacheQty"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];
	if(this.rectifyDate!==""){
		items.push({
			xtype : "fieldset",
			title : "整改反馈",
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
						allowblank : false,
						readOnly : true,
						fieldLabel : "整改时间",
						name :"equipInspect.rectifyDate"
					},{
						allowblank : false,
						readOnly : true,
						fieldLabel : "整改说明",
						name : "equipInspect.rectifyIntroduce"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						allowblank : true,
						readOnly : true,
						fieldLabel : "整改反馈人",
						name : "equipInspect.rectifyUsername"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						allowblank : true,
						readOnly : true,
						fieldLabel : "整改结果",
						name : "equipInspect.rectifyResultName"
					} ]
				} ]
			} ]
		})
	}
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipInspectDetailGrid,this.costInspectGrid ]
	});
	items.push(this.relateTabPanel);
	EquipInspectForm.superclass.constructor.call(this, {
		title : "巡检信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "equipInspect",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.inspectId,
				relateModule : RelationModule.equipInspect.relateModule
			},
			url : __ctxPath + "/equip/saveEquipInspect.do",
			items : items,
			fieldMapping : EquipInspectFieldMapping,
			hiddenField : EquipInspectHiddenField
		}
	});
};
Ext.extend(EquipInspectForm, Knight.ux.FormPanelWindow, {
	importCarArchives : function(data) {
		this.setFieldValue("licensePlate", data.licensePlate);
	},
	saveFormData : function() {
		for (var i = 0; i < this.equipInspectDetailGrid.getStore().getCount(); i++) {
			var r = this.equipInspectDetailGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.substance) && Ext.isEmpty(r.component)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条巡检内容未填写!");
				return;
			}
		}
		for (var i = 0; i < this.costInspectGrid.getStore().getCount(); i++) {
			var r = this.costInspectGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.depName)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条巡检班组未填写!");
				return;
			}
		}
		this.setFieldValue("equipInspectDetails", $gridstore2json(this.equipInspectDetailGrid));
		this.setFieldValue("costInspects", $gridstore2json(this.costInspectGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if(this.cost==undefined){
				this.submitApplication(__ctxPath + "/equip/multiSubmitEquipInspect.do", resp.applyforId);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.inspectId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipInspect.do?inspectId=" + this.inspectId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					$request({
						url : __ctxPath + "/equip/queryInstallEquipInspectSchema.do?flowId="+ this.equipInspectSchema.flowId,
						success : function(b,c){
							var data1 = Ext.util.JSON.decode(b.responseText).data[0];
							var fieldNames = [ "wallAttacheQty","knotCounts","installHeight" ];
							var values = [data1[0].WALL_ATTACHE_QTY,data1[0].KNOT_COUNTS,data1[0].INSTALL_HEIGHT];
							this.setMultiFieldValue(fieldNames, values);
						}.createDelegate(this)
					})
					this.setFormSubModuleGrid(data.equipInspectDetailSet, this.equipInspectDetailGrid);
					this.setFormSubModuleGrid(data.costInspectSet, this.costInspectGrid);
					if (data.longitude && data.latitude) {
						this.mapPanel = new Knight.ux.BaiduMapPanel({
							title : "地理位置",
							longitude : data.longitude,
							latitude : data.latitude
						});
						this.relateTabPanel.add(this.mapPanel);
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});