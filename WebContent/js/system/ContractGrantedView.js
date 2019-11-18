var ContractGrantedView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.userId = this.userId;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "applyforState", "CONTRACT_MATERIALS_STATUS", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		var generalItems = [ applyforStatusCombo,{
			lable : "合同编号",
			name : "contractSerial"
		},{
			lable : "项目名称",
			name : "projectName"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadContractMaterials
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ["contractmaId","applyforStateName","contractSerial","projectName","pbEntName","competentDepartment","sigingTime","joinId"]
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 80,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			width : 80,
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "出租单位",
			dataIndex : "pbEntName"
		}, {
			width : 80,
			header : "项目主管部门",
			dataIndex : "competentDepartment"
		}, {
			width : 40,
			header : "签订时间",
			dataIndex : "sigingTime"
		} ]
	};
	ContractGrantedView.superclass.constructor.call(this, Ext.apply({
		id : "ContractGrantedView",
		title : "正在为【"+a.fullname+"】授权",
		iconCls : "menu-business-contract",
		url : __ctxPath + "/materials/listContractJoinUser.do?userId="+a.userId,
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractGrantedView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptContractMaterials
		});
		actionItems.push({
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveContractMaterials
		});
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AppUserGranted")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "添加",
				handler : this.addMaterials.createDelegate(this)
			});
		}
		if (isGranted("_AppUserGranted")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "移除",
				handler : this.delContractMaterials.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材合同！";
		var msg2 = "您确认要【" + op + "】所选的周材合同吗？";
		var msg3 = "成功【" + op + "】所选的周材合同！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptContractMaterials : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的合同信息必须是【待审核】的状态！");
			return;
		}
		new ContractMaterialsForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveContractMaterials : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的合同信息必须是【待审批】的状态！");
			return;
		}
		new ContractMaterialsForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	loadContractMaterials : function(a) {
		new ContractMaterialsForm(a, {
			baseWidth : 0.20,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addMaterials : function(){
		new ContractMaterialsSecondSelector({
			collectEnable : true,
			saveable : true,
			params : {
				granting : "granting"
			},
			callback : function(d) {
				var e = Array();
				for (var i = 0; i < d.length; i++) {
					e.push(d[i].data.contractmaId);
				}
				$request({
					params : {
						userId : this.userId,
						ids : e,
						relateModule : "CONTRACT_MATERIALS"
					},
					url : __ctxPath + "/materials/saveContractJoinUser.do",
					success : function() {
						$toast("添加成功");
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delContractMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "joinId", __ctxPath + "/materials/multiDelContractJoinUser.do", "删除");
	}
});