var DispatchContractForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	DispatchContractForm.superclass.constructor.call(this, a, b);
};

var equipSpecificData = $ajaxSyncCall(__ctxPath + "/system/listDicDetailCode.do", {
	codeId : "equipSpecific"
});
Ext.extend(DispatchContractForm, DispatchForm, {
	dispatchEquipLoadRecord : function(data) {
		//data.startDate = this.getFieldValue("startPlanDate");
		if (!Ext.isEmpty(data.buildingNum)) {
			return;
		}
		var contractEquipStore = this.contractEquipGrid.getStore();
		for (var i = 0; i < contractEquipStore.getCount(); i++) {
			if (contractEquipStore.getAt(i).data.equipId == data.equipId) {
				data.buildingNum = contractEquipStore.getAt(i).data.buildingNum;
				return;
			}
		}
	},
	dispatchEquipAfterRecord : function(datas) {
		if (datas.length == 0) {
			return;
		}
		var equipIds = new Array();
		for (var i = 0; i < datas.length; i++) {
			equipIds.push(datas[i].data.equipId);
		}
		$request({
			url : __ctxPath + "/archive/listComponent.do",
			params : {
				"QVO_equipId_L_EQ" : equipIds,
				"Q_delFlag_S_EQ" : "1"
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				for (var i = 0; i < resp.result.length; i++) {
					this.dispatchComponGrid.addSubModuleDate(resp.result[i]);
				}
			}.createDelegate(this)
		});
	},
	initRelationPanel : function(relation) {
		this.dispatchEquipGrid = new DispatchEquipGrid(null, {
			parentForm : this,
			saveable : this.saveable,
			relation : relation,
			loadRecordCallback : this.dispatchEquipLoadRecord.createDelegate(this),
			afterRecordCallback : this.dispatchEquipAfterRecord.createDelegate(this)
		});
		if (this.saveable) {
			var rentStandardData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
				codeId : "rentStandard"
			});
			var measurementData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
				codeId : "measurement"
			});
			var kindWorkData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
				codeId : "kindWork"
			});
			this.contractEquipBriefGrid = new ContractEquipBriefGrid({
				measurementData : measurementData,
				equipSpecificData : equipSpecificData
			});
			this.contractEquipBriefGrid.getStore().loadData(relation.contractEquipBriefSet);

			this.contractEquipGrid = new ContractEquipGrid({
				rentStandardData : rentStandardData,
				measurementData : measurementData,
				subcontract : this.relation.subcontract
			});
			this.contractEquipGrid.getStore().loadData(relation.contractEquipSet);

			this.contractPractiBriefGrid = new ContractPractiBriefGrid({
				kindWorkData : kindWorkData,
				measurementData : measurementData
			});
			this.contractPractiBriefGrid.getStore().loadData(relation.contractPractiBriefSet);

			this.relationPanel = new Ext.TabPanel({
				plain : true,
				activeTab : 0,
				autoHeight : true,
				anchor : "98%",
				defaults : {
					bodyStyle : "padding:0px"
				},
				items : [ this.contractEquipBriefGrid ]
			});
		}
	},
	preSaveValidate : function() {
		this.setFieldValue("dispatchEquips", $gridstore2json(this.dispatchEquipGrid));
		return true;
	},
	loadFormData : function() {
		DispatchContractForm.superclass.loadFormData.call(this);
		if (!Ext.isEmpty(this.dispatchId) || this.relation.contractEquipSet.length <= 0) {
			return;
		}
		new Ext.util.DelayedTask(function() {
			var equips = this.relation.contractEquipSet;
			for (var i = 0; i < equips.length; i++) {
				equips[i].startDate = Date.parseDate(equips[i].startDate, "Y-m-d");
				equips[i].endDate = Date.parseDate(equips[i].endDate, "Y-m-d");
				this.dispatchEquipGrid.addSubModuleDate(equips[i]);
			}
		}.createDelegate(this)).delay(50);
	}
});