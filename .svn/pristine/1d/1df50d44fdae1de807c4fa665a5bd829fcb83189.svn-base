var EquipInstallForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.drop = this.drop;
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	this.jj = this.jj ? true : false;
	this.dstore ;
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.installId,
		relateModule : RelationModule.equipInstall.relateModule,
		saveable : this.saveable
	});
	this.jackingDateTextFieldId = Ext.id();
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
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "equipInstall.userName"
				}, {
					readOnly : true,
					fieldLabel : "安装单号",
					name : "equipInstall.installSerial"
				},{
					id : this.jackingDateTextFieldId,
					hidden : true,
					style : "margin:1px 0px 0px 5px;",
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					allowBlank : false,
					width : 100,
					value : new Date()
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
					name : "equipInstall.providedDate",
					value : new Date()
				}, {
					allowBlank : false,
					fieldLabel : "安装主题",
					name : "equipInstall.installTheme",
					tooltip : "默认为新增时的项目名称+的安装+年月日"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipInstall.department.depName"
				}, {
					hidden : true,
					readOnly : true,
					fieldLabel : "区域",
					name : "equipInstall.belongToArea"
				}  ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "合同信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "合同编号",
					name : "equipInstall.contractSerial"
				},{
					fieldLabel : "项目编号",
					name : "equipInstall.equipFlow.equipDiary.projectSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "equipInstall.equipFlow.equipDiary.projectName"
				},{
					xtype : "textfield",
					anchor : "95%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "equipInstall.equipFlow.equipDiary.address"
				} ]
			} ]
		} ]
	},{
		xtype : "fieldset",
		title : "设备信息",
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
					fieldLabel : "设备型号",
					name : "equipInstall.equipFlow.equipDiary.equipSpecificName"
				},{
					fieldLabel : "设备名称",
					name : "equipInstall.equipFlow.equipDiary.equipGenericName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "备案编号",
					name : "equipInstall.equipFlow.equipDiary.recordId"
				}, {
					maxLength : 64,
					fieldLabel : "设备自编号",
					name : "equipInstall.equipmentNo"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "出厂日期",
					name : "equipInstall.exwDate"
				}, {
					maxLength : 64,
					fieldLabel : "生产厂家",
					name : "equipInstall.equipVender"
				} ]
			} ]
		} ]
	},{
		xtype : "fieldset",
		title : "安装信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "首次标准节数",
					name : "equipInstall.firstKnotCount",
					value : 0
				},{
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "首次附墙数",
					name : "equipInstall.firstAttach",
				},{
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "首次附墙杆数",
					name : "equipInstall.wallAttachePoleNum",
					value : 0
				},{
					xtype : "numberfield",
					allowBlank : false,
					fieldLabel : "首次附墙框数",
					name : "equipInstall.wallAttacheFrameNum",
				}]
			},
			{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "累计安装的标准节",
					name : "equipInstall.knotCounts",
				}, {
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "累计安装的附墙数",
					name : "equipInstall.wallAttacheQty",
				},{
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "累计安装的附墙杆数",
					name : "equipInstall.wallAttachePoleCount",
				}, {
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "累计安装的附墙框数",
					name : "equipInstall.wallAttacheFrameCount",
				}, ]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "当前安装高度",
					name : "equipInstall.currentInstallHeight",
					value : 0
				}, {
					xtype : "numberfield",
					allowBlank : false,
					readOnly : false,
					fieldLabel : "大臂长度",
					name : "equipInstall.brachium",
					value : 0
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "安装开始日期",
					name : "equipInstall.startinDate",
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					width : 130,
					allowBlank : false,
					editable : false,
					readOnly : false,
					fieldLabel : "安装结束日期",
					name : "equipInstall.endinDate",
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					readOnly : false,
					fieldLabel : "楼号",
					name : "equipInstall.equipFlow.equipDiary.buildingNum"
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					readOnly : true,
					fieldLabel : "安装班组长",
					name : "equipInstall.principal",
					fields : [ "principalId", "principal", "principalTel" ],
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					single : false,
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "安装人员",
					name : "equipInstall.partake",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMutilPractiArchives.createDelegate(this)
				},{
					allowBlank : false,
					fieldLabel : "设备进场序号",
					name : "equipInstall.approachNumber"
				}]
			} ]
		},{
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "equipInstall.remark"
		}, fileAttachContainer ]
	} ];
	this.initRelationPanel(this.relation);
	this.practiDiaryGrid = new PractiDiaryGrid(null, {
		importParams : {
			Q_dispatchId_L_EQ : this.dispatchId
		},
		retrieveable : this.retrieveable,
		saveable : this.saveable
	});
	this.componDiaryGrid = new ComponDiaryGrid(null, {
		importParams : {
			Q_projectId_L_EQ : this.projectId,
			collectEnable : true
		},
		retrieveable : this.retrieveable,
		saveable : this.saveable,
		recordcallback : this.calculateComponent.createDelegate(this)
	});
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [/* this.componDiaryGrid, this.practiDiaryGrid */]
	});
	if(this.jj){
		this.projectComponGrid = new ProjectComponGrid(null, {
			importParams : {
				Q_installId_L_EQ : this.installId
			},
			saveable : true,
			projectId : this.projectId,
			recordcallback : this.jjcalculateComponent.createDelegate(this)
		});	
		this.relateTabPanel.add(this.projectComponGrid);
	}
	this.relateTabPanel.add(this.componDiaryGrid);
	//this.relateTabPanel.add(this.practiDiaryGrid);
	if (this.equipFlow) {
		this.totalComponDiaryGrid = new ComponDiaryGrid(null, {
			title : "已安装配件清单",
			jackingEnabled : isGranted("_EquipInstallJacking"),
			grid_config : {
				bbar : true,
				loadurl : __ctxPath + "/equip/listComponDiary.do",
				base_params : {
					"Q_flowId_L_EQ" : this.equipFlow.flowId
				}
			}
		});
		this.relateTabPanel.add(this.totalComponDiaryGrid);
		this.totalPractiDiaryGrid = new PractiDiaryGrid(null, {
			title : "从业人员清单",
			grid_config : {
				bbar : true,
				loadurl : __ctxPath + "/equip/listPractiDiary.do",
				base_params : {
					"Q_flowId_L_EQ" : this.equipFlow.flowId
				}
			}
		});
		this.relateTabPanel.add(this.totalPractiDiaryGrid);
	}
	//**********************增加4个页签**********************
	//安装费用
	var installFeeTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do",{
		codeId : "installFeeType"
	});
	//安装费用页签
	this.installFeeGrid = new InstallFeeGrid({
		installId : this.installId,
//		belongToArea : this.store.belongToAreaName,
		contractId : this.store.contractId,
		equipSpecificName : this.store.equipSpecificName,
		installFeeTypeData : installFeeTypeData
	},{
		saveable : true
	});
	this.relateTabPanel.add(this.installFeeGrid);
	
	var loadTopbarItems = null;
	if (this.saveable) {
		loadTopbarItems = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadAutocrane.createDelegate(this)
		}];
	}
	
	var loadCountsTopbarItems = null;
	if (this.saveable) {
		loadCountsTopbarItems = [{
			iconCls : "btn-search",
			text : "数量计算",
			handler : this.loadInstallFeeCounts.createDelegate(this)
		}];
	}
	
	//汽吊费用
	var truckCraneSpecificData = $ajaxSyncCall(__ctxPath + "/system/listCode.do",{
		codeId : " truckCraneSpecific"
	});
	this.autocraneFeeGrid = new AutocraneFeeGrid({
		installId : this.installId,
		truckCraneSpecificData : truckCraneSpecificData,
//		belongToArea : this.store.belongToAreaName,
//		belongToAreaName : this.store.belongToAreaName,
		contractId : this.store.contractId,
		equipSpecificName : this.store.equipSpecificName,
		equipSpecific : this.store.equipSpecific
	},{
		saveable : true
	});
	
	var loadTopbarItems1 = null;
	if (this.saveable) {
		loadTopbarItems1 = [{
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadInstallFee.createDelegate(this)
		}];
	}
	//安拆班组
	this.installDismantelTeamGrid = new InstallDismantelTeamGrid({
		installId : this.installId,
		relation:this.relation,
		tbarItems : loadTopbarItems1,
		equipSpecificName : this.store.equipSpecificName,
		installFeeTypeData : installFeeTypeData,
		equipSpecific : this.store.equipSpecific,
//		belongToArea : this.store.belongToArea,
	},{
		saveable : true
	});
	//汽吊单位
	var autocraneUnitData = $ajaxSyncCall(__ctxPath + "/system/listCode.do",{
		codeId : "autocraneDepend"
	});
	this.autocraneUnitGrid = new AutocraneUnitGrid({
		installId : this.installId,
		truckCraneSpecificData : truckCraneSpecificData,
		autocraneUnitData : autocraneUnitData,
		equipSpecificName : this.store.equipSpecificName,
		equipSpecific : this.store.equipSpecific,
//		belongToArea : this.store.belongToArea,
//		belongToAreaName : this.store.belongToAreaName,
		tbarItems : loadTopbarItems
	},{
		saveable : true
	});
	this.relateTabPanel.add(this.autocraneFeeGrid,this.installDismantelTeamGrid,this.autocraneUnitGrid);
	
	//*******************************************************
	items.push(this.relateTabPanel);
	EquipInstallForm.superclass.constructor.call(this, {
		title : "安装信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 500,
		form_config : {
			labelWidth : 100,
			object : "equipInstall",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.installId,
				relateModule : RelationModule.equipInstall.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.installId,
				relateModule : RelationModule.equipInstall.relateModule
			},
			url : __ctxPath + "/equip/saveEquipInstall.do?jj="+this.jj+"&drop="+this.drop,
			items : items,
			fieldMapping : EquipInstallFieldMapping,
			hiddenField : EquipInstallHiddenField
		}
	});
};
Ext.extend(EquipInstallForm, Knight.ux.FormPanelWindow, {
	initRelationPanel : function() {
	},
	calculateComponent : function() {
		var store = this.componDiaryGrid.getStore();
		var knotCounts = 0, installHeight = 0, brachium = 0;var wallAttacheQty = 0;
		for (var i = 0; i < store.getCount(); i++) {
			if(store.getAt(i).get("knotFlag")=="1"){
				knotCounts += Number(store.getAt(i).get("counts"));
			}
			if(store.getAt(i).get("wallAttacheFlag")=="1"){
				wallAttacheQty += Number(store.getAt(i).get("counts"));
			}
			if (!Ext.isEmpty(store.getAt(i).get("knotMetric"))) {
				installHeight += Number(store.getAt(i).get("knotMetric")) * Number(store.getAt(i).get("counts"));
			}
			if (!Ext.isEmpty(store.getAt(i).get("brachium"))) {
				brachium += Number(store.getAt(i).get("brachium"));
			}
		}
		this.setFieldValue("wallAttacheQty", wallAttacheQty);
		this.setFieldValue("knotCounts", knotCounts);
		this.setFieldValue("installHeight", installHeight);
		this.setFieldValue("brachium", brachium);
	},
	jjcalculateComponent : function(g,h) {
		var store = this.dstore; 
		var knotCounts = this.getFieldValue("knotCounts");
		var installHeight = this.getFieldValue("installHeight");
		var brachium = this.getFieldValue("brachium");
		var wallAttacheQty = this.getFieldValue("wallAttacheQty");
		for (var i = 0; i < store.length; i++) {
			var component = store[i].component;
			if(component.knotFlag=="1"){
				knotCounts += Number(store[i].fillCounts);
			}
			if(component.wallAttacheFlag=="1"){
				wallAttacheQty += Number(store[i].fillCounts);
			}
			if (!Ext.isEmpty(component.knotMetric)) {
				installHeight += Number(component.knotMetric) * Number(store[i].fillCounts);
			}
			if (!Ext.isEmpty(component.brachium)) {
				brachium += Number(component.brachium);
			}
		}
		this.setFieldValue("wallAttacheQty", wallAttacheQty);
		this.setFieldValue("knotCounts", knotCounts);
		this.setFieldValue("installHeight", installHeight);
		this.setFieldValue("brachium", brachium);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.mobile ]);
	},
	importMutilPractiArchives : function(datas) {
		var partakeField = this.findFormField("partake");
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if (Ext.isEmpty(partakeField.getValue())) {
				partakeField.setValue(data.practiName);
			} else {
				partakeField.setValue(partakeField.getValue() + "," + data.practiName);
			}
		}
	},
	saveFormData : function() {
		var pds = this.practiDiaryGrid.getStore().data.items;
		var cds = this.componDiaryGrid.getStore().data.items;
		var startinDate = this.getFieldValue("startinDate").dateFormat("Y-m-d H:i:s");
		var knotCounts = this.getFieldValue("knotCounts");
		var endinDate = this.getFieldValue("endinDate").dateFormat("Y-m-d H:i:s");
		for (var i = 0; i < pds.length; i++) {
			pds[i].set("startDate", startinDate);
			pds[i].set("endDate", endinDate);
		}
		for (var i = 0; i < cds.length; i++) {
			cds[i].set("startDate", startinDate);
			cds[i].set("endDate", endinDate);
			cds[i].set("knotCounts", knotCounts);
		}
		//***********************************************************************
		this.setFieldValue("installFees", $gridstore2json(this.installFeeGrid));
		this.setFieldValue("autocraneFees", $gridstore2json(this.autocraneFeeGrid));
		this.setFieldValue("installDismantelTeams", $gridstore2json(this.installDismantelTeamGrid));
		this.setFieldValue("autocraneUnits", $gridstore2json(this.autocraneUnitGrid));
		//***************************************************************************
		this.setFieldValue("practiDiarys", $gridstore2json(this.practiDiaryGrid));
		this.setFieldValue("componDiarys", $gridstore2json(this.componDiaryGrid));
		this.setFieldValue("jjCompons", $gridstore2json(this.projectComponGrid));
		this.setFieldValue("practiCount", this.practiDiaryGrid.getStore().getCount());
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if(this.jj){
				this.close();
				 this.callback.call(this);
				return;		
			}
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipInstall.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadAutocrane : function(){
		this.autocraneUnitGrid.addSubModule($gridstore2json(this.autocraneFeeGrid));
		
	},
	loadInstallFeeCounts : function(){
		this.autocraneUnitGrid.addSubModule($gridstore2json(this.projectComponGrid));
		
	},
	loadInstallFee : function(){
		this.installDismantelTeamGrid.addSubModule($gridstore2json(this.installFeeGrid));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.installId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipInstall.do?installId=" + this.installId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.practiDiarySet, this.practiDiaryGrid);
					this.setFormSubModuleGrid(data.componDiarySet, this.componDiaryGrid);
					this.setFormSubModuleGrid(data.autocraneUnitSet, this.autocraneUnitGrid);
					this.setFormSubModuleGrid(data.installDismantelTeamSet, this.installDismantelTeamGrid);
					this.setFormSubModuleGrid(data.autocraneFeeSet, this.autocraneFeeGrid  );
					this.setFormSubModuleGrid(data.installFeeSet, this.installFeeGrid  );
					this.setFormSubModuleGrid(data.jjComponSet, this.projectComponGrid  );
					this.setFieldValue("equipFlow.equipDiary.address", data.equipFlow.contractLease.address);
					this.setFieldValue("providedDate",data.providedDate.substr(0,10));
					/*	var stantardLen=0;
					var attachLen = 0;
					var firstKnotCount = 0;
					var firstAttach = 0;
					var t = data.componDiarySet;*/
				/*	for(var i=0;i<t.length;i++){
						if(t[i].knotFlag==("1")){
							stantardLen+=t[i].counts;
							
							if(t[i].jjStautsName==("首次安装")){
								firstKnotCount = t[i].counts;
								}
						}
						if(t[i].wallAttacheFlag==("1")){
							attachLen+=t[i].counts;
							if(t[i].jjStautsName==("首次安装")){
								firstAttach = t[i].counts;
								}
						}
					}
					this.setFieldValue("wallAttacheQty", attachLen);
					this.setFieldValue("knotCounts", stantardLen);
					//this.setFieldValue("knotCounts", 12);
					this.setFieldValue("firstAttach", firstAttach);
					this.setFieldValue("firstKnotCount", firstKnotCount);*/
					
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
			if(this.jj){
				new Ext.util.DelayedTask(function() {
					var jackingDate = Ext.getCmp(this.jackingDateTextFieldId).getValue().format('Y-m-d H:i:s');
					new ProjectComponSelector({
						collectEnable : true,
						drop:this.drop,
						installId:this.installId,
						params : {
							"Q_projectId_L_EQ" : this.projectId,
							"Q_status_S_EQ" : "0"
						},
						callback : function(d) {
							var ar = [];
							for (var i = 0; i < d.length; i++) {
								var data = d[i].data;
								var RecordType = this.projectComponGrid.getStore().recordType;
								var record = new RecordType();
								Ext.apply(record.data, {
									installId : this.projectComponGrid.projectId,
									componId : data.componId,
									component : data.component,	
									jjTime : jackingDate,
									//counts : 1,
									counts:this.drop?(0-data.addFestival):(data.addFestival)
								});
								data.fillCounts = this.drop?(0-data.addFestival):(data.addFestival);
								ar.push(data);
								this.projectComponGrid.stopEditing();
								this.projectComponGrid.getStore().add(record);
								this.projectComponGrid.startEditing(0, 0);
							}
							this.dstore = ar;
							if (this.projectComponGrid.recordcallback) {
								this.projectComponGrid.recordcallback.call(this.projectComponGrid, record);
							}
							var practiName = "";
							new PractitionerSelector({
								collectEnable : true,
								callback : function(d) {
									for (var i = 0; i < d.length; i++) {
										var data = d[i].data;
										var RecordType = this.practiDiaryGrid.getStore().recordType;
										var record = new RecordType();
										Ext.apply(record.data, {
											practiId : data.practiId,
											practiName : data.practiName,
											kindWorkName : data.kindWorkName,
											mobile : data.mobile,
											station : data.station,
											corpName : data.corpInfo.corpName
										});
										practiName += data.practiName+","
										this.projectComponGrid.getStore().getAt(this.projectComponGrid.getStore().getCount()-1).set("jjUserName",practiName.substring(0,practiName.length-1));
										this.practiDiaryGrid.stopEditing();
										this.practiDiaryGrid.getStore().add(record);
										this.practiDiaryGrid.startEditing(0, 0);
										if (this.practiDiaryGrid.recordcallback) {
											this.practiDiaryGrid.recordcallback.call(this.practiDiaryGrid, record);
										}
									}
								}.createDelegate(this)
							}).show();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)).delay(50);
				}
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "equipFlow.dispatchEquipId","","exwDate","equipmentNo","equipVender"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, this.dispatchEquipId,this.contractLease.contractNo,this.equipment.exwDate , this.equipment.equipSerial, this.equipment.equipVender ];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "dispatchSerial", "dispatchTheme" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.dispatch", fieldNames), this.paddingValues(this.dispatch, fieldNames));
			fieldNames = [ "recordSerial", "equipCategoryName", "equipGeneric", "equipGenericName", "equipSpecificName", "recordId", "exwSerial","buildingNum" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(this.equipment, fieldNames));
			fieldNames = [ "projectSerial", "projectName","address"];
			this.dispatch.address = this.contractLease.address;
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(this.dispatch, fieldNames));
			this.setFieldValue("installTheme", this.dispatch.projectName + "的安装" + new Date().format("Ymd"));
            if(this.indisNotice){
                importMutilPractiArchives(this.indisNotice.indisNoticePractiSet);
            }
            new Ext.util.DelayedTask(function() {
				var practis = this.dispatch.dispatchPractiSet;
				for (var i = 0; i < practis.length; i++) {
					this.practiDiaryGrid.addSubModuleDate(practis[i]);
				}
			}.createDelegate(this)).delay(50);
		}
	}
});