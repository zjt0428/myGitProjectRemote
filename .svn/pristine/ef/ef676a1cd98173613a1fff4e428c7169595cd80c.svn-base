var AccountsReceivableSummary = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	Ext.apply(this, {
		attenDepartmentId : Ext.id()
	});
//	var categoryCombo = $initComboBoxField("合同类别", "Q_[CONTRACT_CATEGORY]_S", "contractCategory", {
//		editable : false
//	});
	var generaltems =[ {
			width : 90,
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_[START_DATE]_S",
			value : new Date().getFirstDateOfMonth(),
			regex : /^([0-9]{4})-([0-9]{2})-(01)$/,
			regexText : "请选择月份的<font color=red>第一天</font>，否则将影响查询结果"
		}, {
			width : 90,
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_[END_DATE]_S",
			value : new Date().getLastDateOfMonth(),
			regex : /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(3[1]))|(0[469]|11)-(3[0])|(02-(2[8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/,
			regexText : "请选择月份的<font color=red>最后一天</font>，否则将影响查询结果"
		}, {
			width : 80,
			allowBlank : true,
			lable : "项目名称",
			name : "Q_[PROJECT_NAME]_S",
		}, {
			lable : "合同编号",
			width : 80,
			name : "Q_[CONTRACT_NO]_S"
		}, {
			xtype : "relationCompositeField",
			readOnly : true,
			lable : "承租单位",
			allowBlank : true,
			name : "Q_[PA_ENT_NAME]_S",
			relateModule : RelationModule.customer.relateModule,
			importhandler : this.importCustomerArchives.createDelegate(this)
		}, {
			id : Ext.id(),
			name : "Q_[DEP_NAME]_S",
			valId : this.attenDepartmentId,
			xtype : "treecombo",
			width : 160,
			editable : false,
			lable : "分公司",
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner"
		}, {
			hidden : true,
			id : this.attenDepartmentId,
			name : "Q_[DEP_ID]_L"
		},/* {
			lable : "机械使用情况",
			width : 80,
			xtype : "datacombo",
			store : ["在租", "停机"],
			name : "Q_[STATUS]_L"
		}, {
			lable : "设备种类",
			xtype : "datacombo",
			width : 80,
			store : ["施工升降机", "塔式起重机"],
			name : "Q_[EQUIP_GENERIC]_L"
		},*/ {
			width : 80,
			xtype : "relationCompositeField",
			readOnly : true,
			lable : "项目经理",
			allowBlank : true,
			name : "Q_[MATERIAL_PRACTI_NAME]_S",
			relateModule : RelationModule.practitioner.relateModule,
			importhandler : this.importPractitioner.createDelegate(this)
		} ];
	var advancedItems = [ {
		fieldType : "COMBO_FIELD",
		name : "Q_[STATUS]_S",
		fieldLabel : "机械使用情况",
		allowBlank : true,
		store : ["在租", "停机"]
	}, {
		fieldType : "COMBO_FIELD",
		name : "Q_[EQUIP_GENERIC]_S",
		allowBlank : true,
		fieldLabel : "设备种类",
		store : ["施工升降机", "塔式起重机"]
	}, {
		fieldType : "CODE_FIELD",
		codeId : "contractCategory",
		name : "Q_CONTRACT_CATEGORY_S",
		fieldLabel : "合同类别"
	}/*, {
		fieldType : "CHAR_FIELD",
		name : "Q_propertyName_S_LK",
		fieldLabel : "产权单位"
	}, {
		fieldType : "DATE_RANGE_FIELD",
		fieldLabel : "出厂日期",
		leftFieldLabel : "Q_exwDate_S_GE",
		rightFieldLabel : "Q_exwDate_S_LE"
	}, {
		fieldType : "DATE_RANGE_FIELD",
		fieldLabel : "报废日期",
		leftFieldLabel : "Q_scrapDate_S_GE",
		rightFieldLabel : "Q_scrapDate_S_LE"
	}, {
		fieldType : "DATE_RANGE_FIELD",
		fieldLabel : "采购日期",
		leftFieldLabel : "Q_purchaseDate_S_GE",
		rightFieldLabel : "Q_purchaseDate_S_LE"
	},{
		fieldType : "CODE_TREE_FIELD",
		name : "Q_equipCategory_S_EQ",
		fieldLabel : "设备类别",
		url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
	}*/ ];
	var searchActionItems = [];
	searchActionItems.push({
		xtype : "button",
		text : "明细查询",
		iconCls : "btn-search",
		handler : this.queryDetail.createDelegate(this)
	});
	AccountsReceivableSummary.superclass.constructor.call(this,{
		id : "AccountsReceivableSummary",
		title : "应收款汇总表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_ACCOUNTS_RECEIVABLE_SUMMARY",
		search_config : {
			generalItems : generaltems,
			searchActionItems : searchActionItems,
			advancedItems : advancedItems
		},
		base_params : this.params
	});
};
Ext.extend(AccountsReceivableSummary, Knight.ux.BaseReportView, {
	importPractitioner : function(data) {
		this.searchPanel.getForm().findField("Q_[MATERIAL_PRACTI_NAME]_S").setValue(data.practiName);
	},
	importCustomerArchives : function(data) {
		this.searchPanel.getForm().findField("Q_[PA_ENT_NAME]_S").setValue(data.customerName);
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
	},
	queryDetail : function() {
		var params = this.searchPanel.getForm().getValues(false);
		new AccountsReceivableReportWin({
			params : {
				contractNo : params["Q_[CONTRACT_NO]_S"],
				paEntName : params["Q_[PA_ENT_NAME]_S"],
				projectName : params["Q_[PROJECT_NAME]_S"],
				startDate : params["Q_[START_DATE]_S"],
				endDate : params["Q_[END_DATE]_S"],
				depName : params["Q_[DEP_NAME]_S"],
				depId : params["Q_[DEP_ID]_L"]
			}
		}).show();
	}
});