var AutocraneListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var autocraneDependCombo = $initComboBoxField("汽车吊所属单位", "Q_autocraneDepend_S_LK", "autocraneDepend", {
			allowBlank : true,
			editable : true
		});
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_project.projectName_S_LK"
		}, {
			lable : "使用单位",
			name : "Q_emEntName_S_LK"
		}, autocraneDependCombo, {
			lable : "填报日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadAutocrane
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AutocraneListViewField
		},
		rowAction : {
			width : 75,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "填报日期",
			dataIndex : "providedDate"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.address;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.exwSerial;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.equipGenericName;
			}
		}, {
			header : "使用单位",
			dataIndex : "emEntName"
		}, {
			header : "汽车吊所属单位",
			dataIndex : "autocraneDependName"
		}, {
			header : "费用合计",
			dataIndex : "autocraneAmount"
		}, {
			header : "已付金额",
			dataIndex : "paymentAmount"
		}, {
			header : "余额",
			dataIndex : "balanceAmount"
		}, {
			header : "状态",
			dataIndex : "effectiveName"
		} ]
	};
	AutocraneListView.superclass.constructor.call(this, Ext.apply({
		id : "AutocraneListView",
		title : "汽吊管理",
		iconCls : "menu-business-settle",
		url : __ctxPath + "/dispatch/listAutocrane.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AutocraneListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AutocraneAdd")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "新增",
				menu : {
					items : [ {
						text : "项目汽吊",
						handler : this.addAutocrane.createDelegate(this)
					},{
						text : "其他",
						handler : this.addEmptyAutocrane.createDelegate(this)
					} ]
				}
			});
		}
		if (isGranted("_AutocraneEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAutocrane.createDelegate(this)
			});
		}
		if (isGranted("_AutocraneMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveAutocrane.createDelegate(this)
			});
		}
		if (isGranted("_AutocraneMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveAutocrane.createDelegate(this)
			});
		}
		if (isGranted("_AutocraneMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAutocrane.createDelegate(this)
			});
		}
		if (isGranted("_AutocraneAuto")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "生成付款单",
				handler : this.autoAutocrane.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AutocraneExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportAutocrane.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm,ca) {
		var msg1 = "请选择要【" + op + "】的汽吊信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的汽吊信息吗？";
		var msg3 = "成功【" + op + "】所选的汽吊信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va,ca);
	},
	loadAutocrane : function(a) {
		new AutocraneForm(a).show();
	},
	addAutocrane : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/dispatch/loadContractLease.do",
					params : {
						contractId : data.contractId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						new AutocraneForm({
							contractId : data.contractId,
							contract : data
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();

					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addEmptyAutocrane : function(){
		new AutocraneForm({
			empty : true
		}, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editAutocrane : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.effective == "1") {
			$toast("该汽吊信息已经【生效】！");
			return;
		}
		new AutocraneForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delAutocrane : function() {
		this.speciallyGridAction(this.dataGridPanel, "autocraneId", __ctxPath + "/dispatch/multiDelAutocrane.do", "删除");
	},
	effectiveAutocrane : function() {
		this.speciallyGridAction(this.dataGridPanel, "autocraneId", __ctxPath + "/dispatch/multiEffectiveAutocrane.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该施工信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveAutocrane : function() {
		this.speciallyGridAction(this.dataGridPanel, "autocraneId", __ctxPath + "/dispatch/multiLoseEffectiveAutocrane.do", "失效", null, "是否确认失效");
	},
	exportAutocrane : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportAutocrane.do", this.dataGridPanel);
	},
	autoAutocrane : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
        if(a.length>1){
            $toast("请最多选择一个进行生成付款单！");
            return ;
        }
		for(var c = 0;c<length;c++){
		$request({
			url : __ctxPath + "/dispatch/loadAutocrane.do",
			params : {
				autocraneId : a[c].data.autocraneId
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data[0];
                data.projectId = data.project.projectId;
                data.projectSerial = data.project.projectSerial;
                data.projectName = data.project.projectName;
                data.address = data.project.address;
                var mount = {
                    relateId : data.autocraneId,
                    relateSerial : data.autocraneSerial,
                    relateTheme : data.autocraneSerial,
                    relateModule : RelationModule.autocrane.relateModule,
                    relateModuleName : RelationModule.autocrane.relateModuleName,
                    relationData : data
                };
                if (mount && mount.relateId && mount.relateModule) {
                    mount.relation = {};
                    Ext.apply(mount.relation, {
                        relateId : mount.relateId,
                        relateTheme : mount.relateTheme,
                        relateModule : mount.relateModule,
                        relateModuleName : mount.relateModuleName,
                        projectName : mount.projectName
                    });
                }
                new AmountPaymentForm(mount, {
                    saveable : true,
					auto:true,
                    paymentPlanDisabled : true,
                    callback : function() {
                        this.dataGridPanel.getStore().reload();
                    }.createDelegate(this)
                }).show();
			}.createDelegate(this)
		});}
	}
});