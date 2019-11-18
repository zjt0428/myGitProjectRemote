var AmountReceiveDetail = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	Ext.apply(this, {
		attenDepartmentId : Ext.id()
	});
//	var categoryCombo = $initComboBoxField("合同类别", "Q_[CONTRACT_CATEGORY]_S", "contractCategory", {
//		editable : false
//	});
	var fundStatusCombo = $initComboBoxField("审批情况", "Q_[applyforState]_S", "APPLYFOR_STATE", {
		width : 80,
		lable : "审批情况",
		allowBlank : true
	});
	var generaltems =[ {
			width : 90,
			lable : "收款日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_[amountStartDate]_S",
			value : new Date().getFirstDateOfMonth(),
			regex : /^([0-9]{4})-([0-9]{2})-(01)$/,
			regexText : "请选择月份的<font color=red>第一天</font>，否则将影响查询结果"
		}, {
			width : 90,
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_[amountEndDate]_S",
			value : new Date().getLastDateOfMonth(),
			regex : /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(3[1]))|(0[469]|11)-(3[0])|(02-(2[8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/,
			regexText : "请选择月份的<font color=red>最后一天</font>，否则将影响查询结果"
		},fundStatusCombo, {
			lable : "合同编号",
			width : 80,
			name : "Q_[contractNo]_S"
		}, {
			width : 80,
			allowBlank : true,
			lable : "项目名称",
			name : "Q_[projectName]_S",
		}, {
			xtype : "relationCompositeField",
			readOnly : true,
			lable : "承租单位",
			allowBlank : true,
			name : "Q_[paEntName]_S",
			relateModule : RelationModule.customer.relateModule,
			importhandler : this.importCustomerArchives.createDelegate(this)
		}, {
			id : Ext.id(),
			name : "Q_[depName]_S",
			valId : this.attenDepartmentId,
			xtype : "treecombo",
			width : 160,
			editable : false,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner"
		}, {
			hidden : true,
			id : this.attenDepartmentId,
			name : "Q_[depId]_L"
		}, {
			width : 80,
			xtype : "relationCompositeField",
			readOnly : true,
			lable : "经办人",
			allowBlank : true,
			name : "Q_[practiName]_S",
			relateModule : RelationModule.practitioner.relateModule,
			importhandler : this.importPractitioner.createDelegate(this)
		} ];
	var advancedItems = [  {
		fieldType : "COMBO_FIELD",
		name : "Q_[receiveType]_S",
		fieldLabel : "付款类型",
		allowBlank : true,
		store : [["1","结算"], ["2","预收"]]
	}, {
		fieldType : "CHAR_FIELD",
		fieldLabel : "制单人",
		width : 80,
		name : "Q_[userName]_S"
	}];
	AmountReceiveDetail.superclass.constructor.call(this,{
		id : "AmountReceiveDetail",
		title : "收款明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_AMOUNT_RECEIVE_DETAIL",
		search_config : {
			generalItems : generaltems,
			advancedItems : advancedItems
		},
		base_params : this.params
	});
};
Ext.extend(AmountReceiveDetail , Knight.ux.BaseReportView, {
	importPractitioner : function(data) {
		this.searchPanel.getForm().findField("Q_[practiName]_S").setValue(data.practiName);
	},
	importCustomerArchives : function(data) {
		this.searchPanel.getForm().findField("Q_[paEntName]_S").setValue(data.customerName);
	},
	importContractId : function(data) {
		var contractIds = "";
		var projectNames = "";
		for(var i=0;i<data.length;i++) {
			contractIds = contractIds.concat(data[i].data.contractmaId);
			projectNames = projectNames.concat(data[i].data.projectName);
			if(i==data.length-1) {
				break;
			}
			contractIds = contractIds.concat(",");
			projectNames = projectNames.concat(",");
		}
		this.searchPanel.getForm().findField("Q_contractIds_S").setValue(contractIds);
		this.searchPanel.getForm().findField("Q_projectName_S").setValue(projectNames);
	}
});