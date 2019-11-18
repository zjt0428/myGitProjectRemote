var MaterialsRemodelListView = function(a){
	Ext.apply(this,a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params,(a&&a.params)||{});
	
	var generalItems = null;
	if(!this.searchDisenable){
		var applyforStateCombo = $initComboBoxField("状态","Q_applyforState_S_EQ","AUDIT_APPROVAL_STATUS",{
			width : 80,
			lable : "状态"
		});
		generalItems = [applyforStateCombo,{
			lable : "仓库名称",
			name : "Q_baseDepot.depotName_S_LK"
		},{
			lable : "主题",
			name : "Q_producationTheme_S_LK"
		},{
			lable : "改型类别",
			name : "Q_remodelType_S_LK"
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "制单日期",
			name : "Q_applyDate_S_GE",
			editable : false
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d H:i:s",
			name : "Q_applyDate_S_LE",
			listeners : {
				'select' : function(field,date) {
					var Y = date.getFullYear();
					var m = date.getMonth();
					var d = date.getDate();
					var newDate = new Date(Y,m,d,23,59,0)
					field.setValue(newDate);
				}.createDelegate(this)
			}
		}]
	}
	var actionItems = [{
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadMaterialsRemodel
	}];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if(!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems()
	}
	var datagrid_config = {
		store : {
			fields : MaterialsRemodelListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [{
			width : 60,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "改型单号",
			dataIndex : "remodelSerial"
		},{ 
			header : "主题",
			dataIndex : "producationTheme"
		},{
			header : "制单人",
			dataIndex : "userName"
		},{
			header : "单据日期",
			dataIndex : "applyDate"
		},{
			header : "改型类别",
			dataIndex : "remodelTypeName"
		},{
			header : "仓库名称",
			dataIndex : "baseDepot",
			renderer : function(n) {
				return n.depotName;
			}
		},{
			header : "计划完成时间",
			dataIndex : "planFinishDate"
		}]
	};
	MaterialsRemodelListView.superclass.constructor.call(this,Ext.apply({
		id : "MaterialsRemodelListView",
		title : TabTitle.MATERIALS_REMODEL_LIST,
		iconCls : "menu-business-maint",
		url : __ctxPath + "/materials/listMaterialsRemodel.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	},a));
};
Ext.extend(MaterialsRemodelListView,Knight.ux.SearchGridPanel,{
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptMaterialsRemodel
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveMaterialsRemodel
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_MaterialsRemodelAccept")) {
					action[1].hidden = false;
				}
			break;
			case "2":
				if (isGranted("_MaterialsRemodelApprove")) {
					action[2].hidden = false;
				}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsRemodelAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsRemodel.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsRemodelEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsRemodel.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsRemodelMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitMaterialsRemodel.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsRemodelMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsRemodel.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_MaterialsRemodelPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printMaterialsRemodel.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的改型信息！";
		var msg2 = "您确认要【" + op + "】所选的改型信息吗？";
		var msg3 = "成功【" + op + "】所选的改型信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadMaterialsRemodel : function(a){
		new MaterialsRemodelForm(a).show();
	},
	acceptMaterialsRemodel : function (a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new MaterialsRemodelForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveMaterialsRemodel : function(a){
		if("2" != a.applyforState) {
			$toast("【审批】的改型信息必须是【待审批】的状态！")
			return;
		}
		new MaterialsRemodelForm(a,{
			approveable : true,
			callback : function(){
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addMaterialsRemodel : function(){
		new MaterialsRemodelForm({
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editMaterialsRemodel : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的改型信息必须是【待提交】的入库申请！");
				return false;
			}
			return true;
		}, function(a) {
			new MaterialsRemodelForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitMaterialsRemodel : function() {
		this.speciallyGridAction(this.dataGridPanel, "remodelId", __ctxPath + "/materials/multiSubmitMaterialsRemodel.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的改型信息必须是【待提交】的改型申请！");
			return false;
		}.createDelegate(this));
	},
	delMaterialsRemodel : function() {
		this.speciallyGridAction(this.dataGridPanel, "remodelId", __ctxPath + "/materials/multiDelMaterialsRemodel.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的改型信息必须是【待提交】的改型申请！");
			return false;
		}.createDelegate(this));
	},
	printMaterialsRemodel : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/materials/printFormMaterialsRemodel.do?remodelId=" + a[0].data["remodelId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	}
});