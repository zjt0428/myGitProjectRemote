var OtherBetsListView = function(a){
	Ext.apply(this,a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.paramsm,(a&&a.params)||{});
	
	var generalItems = null;
	if(!this.searchDisenable){
		var applyforStateCombo = $initComboBoxField("状态","Q_applyforState_S_EQ","OTHER_BUSINESS_APPLYFOR_STATE",{
			width : 80,
			lable : "状态"
		});
		generalItems = [applyforStateCombo,{
			lable : "工程名称",
			name : "Q_projectName_S_LK"
		},{
			lable : "承租单位",
			name : "Q_paEntName_S_LK"
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "制单日期",
			name : "Q_chargeableTime_S_GE",
			editable : false
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "至",
			name : "Q_chargeableTime_S_LE",
			editable : false
		},{
			lable : "收费类型",
			name : "Q_feeTypeName_S_LK"
		}]
	}
	var actionItems = [{
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadOtherBets
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
			fields : OtherBetsListViewField
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
			header : "制单人",
			dataIndex : "userName"
		},{
			header : "收费时间",
			dataIndex : "chargeableTime"
		},{
			header : "设备型号",
			dataIndex : "equipSpecificName"
		},{
			header : "设备自编号",
			dataIndex : "equipSerial"
		},{
			header : "合同编号",
			dataIndex : "contractNo"
		},{
			header : "工程名称",
			dataIndex : "projectName"
		},{
			header : "承租单位",
			dataIndex : "paEntName"
		},{
			header : "收费类型",
			dataIndex : "feeTypeName"
		},{
			header : "收费合计",
			dataIndex : "totalCosts"
		},{
			header : "备注",
			dataIndex : "remark"
		}]
	};
	OtherBetsListView.superclass.constructor.call(this,Ext.apply({
		id : "OtherBetsListView",
		title : TabTitle.OTHER_BUSINESS_LIST,
		iconCls : "menu-business-resume",
		url : __ctxPath + "/materials/listOtherBets.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	},a));
};
Ext.extend(OtherBetsListView,Knight.ux.SearchGridPanel,{
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveOtherBets
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "2":
				if (isGranted("_OtherBetsApprove")) {
					action[1].hidden = false;
				}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_OtherBetsAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addOtherBets.createDelegate(this)
			});
		}
		if (isGranted("_OtherBetsEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editOtherBets.createDelegate(this)
			});
		}
		if (isGranted("_OtherBetsMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitOtherBets.createDelegate(this)
			});
		}
		if (isGranted("_OtherBetsMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delOtherBets.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_OtherBetsPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printOtherBets.createDelegate(this)
			});
		}
		if (isGranted("_OtherBetsExport")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportOtherBets.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的其他业务信息！";
		var msg2 = "您确认要【" + op + "】所选的其他业务信息吗？";
		var msg3 = "成功【" + op + "】所选的其他业务信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadOtherBets : function(a){
		new OtherBetsForm(a).show();
	},
	approveOtherBets : function(a){
		if("2" != a.applyforState) {
			$toast("【审批】的其他业务信息必须是【待审批】的状态！")
			return;
		}
		new OtherBetsForm(a,{
			approveable : true,
			callback : function(){
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addOtherBets : function(){
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				new OtherBetsForm({
					contractLease : data
				},{
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editOtherBets : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的其他业务信息必须是【待提交】的入库申请！");
				return false;
			}
			return true;
		}, function(a) {
			new OtherBetsForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitOtherBets : function() {
		this.speciallyGridAction(this.dataGridPanel, "otherBetsId", __ctxPath + "/materials/multiSubmitOtherBets.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的其他业务信息必须是【待提交】的入库申请！");
			return false;
		}.createDelegate(this));
	},
	delOtherBets : function() {
		this.speciallyGridAction(this.dataGridPanel, "otherBetsId", __ctxPath + "/materials/multiDelOtherBets.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的其他业务信息必须是【待提交】的入库申请！");
			return false;
		}.createDelegate(this));
	},
	printOtherBets : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/materials/printFormOtherBets.do?otherBetsId=" + a[0].data["otherBetsId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	exportOtherBets : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/materials/exportOtherBets.do", this.dataGridPanel);
	}
});