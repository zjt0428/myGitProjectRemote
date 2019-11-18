var PractiServiceContractDetailListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_inspectInit.initId_L_EQ"] = this.initId;
	this.params={checkProject:this.typeId};
	this.params={initId:this.initId};
	Ext.apply(this.params, (a && a.params) || {});
	// ===============================================================================================================================//
	var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
		width : 80,
		lable : "状态",
		allowBlank : true
	});
	var applyforStatusCombo1 = $initComboBoxField("是否投保", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
		width : 80,
		lable : "是否投保",
		allowBlank : true
	});
	if (!this.searchDisenable) {
		var generalItems = [applyforStatusCombo, {
			lable : "合同编号",
			editable : false,
			xtype : "textfield",
			name : "Q_detailContent_S_LK"
		}, {
			lable : "项目名称",
			editable : false,
			xtype : "textfield",
			name : "Q_detailContent_S_LK"
		},applyforStatusCombo1,
		{
			lable : "签订时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_DG_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_DG_LE"
		}];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var actionItems = [{
		iconCls : "btn-package_go",
		qtip : "明细",
		handler : this.readEquipInsurance
	}];
	var datagrid_config = {
			store : {
				fields : EquipInsuranceListViewField
			},
			rowAction : {
				width : 70,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [ {
				header : "状态 ",
				dataIndex : "applyforStateName"
			}, {
				header : "合同编号",
				dataIndex : "insureSerial"
			}, {
				header : "项目名称",
				dataIndex : "insureSerial"
			}, {
				header : "签订时间",
				dataIndex : "insureSerial"
			}, {
				header : "合同金额",
				dataIndex : "insureSerial"
			}, {
				header : "合同设备数",
				dataIndex : "insureSerial"
			}, {
				header : "承租方",
				dataIndex : "insuranceCompany"
			}, {
				header : "合同主题",
				dataIndex : "claimPhone"
			}, {
				header : "是否投保",
				dataIndex : "totalPremium"
			}]
		};
	PractiServiceContractDetailListView.superclass.constructor.call(this, Ext.apply({
		id : "PractiServiceContractDetailListView",
		title : "服务合同",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		customable : true,
		url : 'inspectInit/listInitDetail.do',
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiServiceContractDetailListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		/*if (isGranted("_InitDetailAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInitDetail.createDelegate(this)
			});
		}
		if (isGranted("_InitDetailEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInitDetail.createDelegate(this)
			});
		}*/
		return tbarItems;
	},
	addInitDetail : function() {
		new InspectInitDetailForm(null, {
			initId : this.initId,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editInitDetail : function(selections) {
		new InspectInitDetailForm(selections[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
readEquipInsurance : function(a) {
		
		this.equipInsuranceTabPanel.expand();

		var equipstore = this.insuranceEquipListView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_insureId_L_EQ" : a.insureId,
		});
		equipstore.load();
//		this.insuranceEquipListView.storeId = a.storeId;
//		this.insuranceEquipListView.setTitle(a.storeName + "-库存设备");
//		this.insuranceEquipListView.searchResetOriginal({
//			"Q_storeId_L_EQ" : a.storeId
//		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_EquipInsuranceAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipInsuranceApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
});