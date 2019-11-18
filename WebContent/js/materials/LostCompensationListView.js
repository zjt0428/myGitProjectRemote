var LostCompensationListView = function(a){
	Ext.apply(this,a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params,(a&&a.params)||{});
	
	var generalItems = null;
	if(!this.searchDisenable){
		var applyforStateCombo = $initComboBoxField("状态","Q_applyforState_S_EQ","OTHER_BUSINESS_APPLYFOR_STATE",{
			width : 80,
			lable : "状态"
		});
		generalItems = [applyforStateCombo,{
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		},{
			lable : "承租单位",
			name : "Q_paEntName_S_LK"
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
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "赔偿日期",
			name : "Q_compensationDate_S_GE",
			editable : false
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "至",
			name : "Q_compensationDate_S_LE",
			editable : false
		}]
	}
	var actionItems = [{
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadLostCompensation
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
			fields : LostCompensationListViewField
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
			header : "丢失单号",
			dataIndex : "lostSerial"
		},{ 
			header : "主题",
			dataIndex : "lostTheme"
		},{
			header : "制单人",
			dataIndex : "userName"
		},{
			header : "赔偿日期",
			dataIndex : "compensationDate"
		},{
			header : "承租单位",
			dataIndex : "paEntName"
		},{
			header : "合同编号",
			dataIndex : "contractSerial"
		},{
			header : "项目名称",
			dataIndex : "projectName"
		},{
			header : "赔偿金额",
			dataIndex : "totalCompensation"
		},{
			header : "制单日期",
			dataIndex : "applyDate"
		},{
			header : "审核日期",
			dataIndex : "checkDate"
		},{
			header : "审批日期",
			dataIndex : "recheckDate"
		}]
	};
	LostCompensationListView.superclass.constructor.call(this,Ext.apply({
		id : "LostCompensationListView",
		title : TabTitle.LOST_COMPENSATION_LIST,
		iconCls : "menu-business-maint",
		url : __ctxPath + "/materials/listLostCompensation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	},a));
};
Ext.extend(LostCompensationListView,Knight.ux.SearchGridPanel,{
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptLostCompensation
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveLostCompensation
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_LostCompensationAccept")) {
					action[1].hidden = false;
				}
			break;
			case "2":
				if (isGranted("_LostCompensationApprove")) {
					action[2].hidden = false;
				}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LostCompensationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLostCompensation.createDelegate(this)
			});
		}
		if (isGranted("_LostCompensationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLostCompensation.createDelegate(this)
			});
		}
		if (isGranted("_LostCompensationMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitLostCompensation.createDelegate(this)
			});
		}
		if (isGranted("_LostCompensationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLostCompensation.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_LostCompensationPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printLostCompensation.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的丢失信息！";
		var msg2 = "您确认要【" + op + "】所选的丢失信息吗？";
		var msg3 = "成功【" + op + "】所选的丢失信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadLostCompensation : function(a){
		new LostCompensationForm(a).show();
	},
	acceptLostCompensation : function (a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new LostCompensationForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveLostCompensation : function(a){
		if("2" != a.applyforState) {
			$toast("【审批】的丢失信息必须是【待审批】的状态！")
			return;
		}
		new LostCompensationForm(a,{
			approveable : true,
			callback : function(){
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addLostCompensation : function(){
		new ContractMaterialsSelector({
			single : true,
			params : {
				"Q_applyforState_S_LK" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				new LostCompensationForm({
					contractMaterials : data
				},{
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editLostCompensation : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的丢失信息必须是【待提交】的丢失申请！");
				return false;
			}
			return true;
		}, function(a) {
			new LostCompensationForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitLostCompensation : function() {
		this.speciallyGridAction(this.dataGridPanel, "lostId", __ctxPath + "/materials/multiSubmitLostCompensation.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的丢失信息必须是【待提交】的丢失申请！");
			return false;
		}.createDelegate(this));
	},
	delLostCompensation : function() {
		this.speciallyGridAction(this.dataGridPanel, "lostId", __ctxPath + "/materials/multiDelLostCompensation.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的丢失信息必须是【待提交】的丢失申请！");
			return false;
		}.createDelegate(this));
	},
	printLostCompensation : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormLostCompensation.do?lostId=" + a[0].data["lostId"];
		});
	}
});