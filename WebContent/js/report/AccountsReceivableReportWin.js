var AccountsReceivableReport = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	Ext.apply(this, {
		attenDepartmentId : Ext.id()
	});
	var contractNo = null;
	var paEntName = null;
	var projectName = null;
	var startDate = null;
	var endDate = null;
	var depName = null;
	var depId = null;
	
	if(this.params!=null) {
		contractNo = this.params.contractNo;
		paEntName = this.params.paEntName;
		projectName = this.params.projectName;
		startDate = this.params.startDate;
		endDate = this.params.endDate;
		depName = this.params.depName;
		depId = this.params.depId;
	}
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=appUser", "所属部门", this.attenDepartmentId, true, {
		lable : "所属部门",
		width : 160,
		value : depName
	});
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_[START_DATE]_S",
			regex : /^([0-9]{4})-([0-9]{2})-(01)$/,
			regexText : "请选择月份的<font color=red>第一天</font>，否则将影响查询结果",
			value : startDate
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_[END_DATE]_S",
			regex : /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(3[1]))|(0[469]|11)-(3[0])|(02-(2[8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/,
			regexText : "请选择月份的<font color=red>最后一天</font>，否则将影响查询结果",
			value : endDate
		}, depSelector, {
			xtype : "hidden",
			name : "Q_[DEP_ID]_L",
			id : this.attenDepartmentId,
			value : depId
		}, {
			allowBlank : true,
			lable : "项目名称",
			name : "Q_[PROJECT_NAME]_S",
			value : projectName
		}, {
			lable : "合同编号",
			width : 80,
			name : "Q_[CONTRACT_NO]_S",
			value : contractNo
		}, {
			lable : "承租单位",
			width : 80,
			name : "Q_[PA_ENT_NAME]_S",
			value : paEntName
		} ];
	AccountsReceivableReport.superclass.constructor.call(this,{
		id : "AccountsReceivableReport",
		title : "应收款明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_ACCOUNTS_RECEIVABLE_REPORT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(AccountsReceivableReport, Knight.ux.BaseReportView, {});

var AccountsReceivableReportWin = function(a, b) {
	Ext.apply(this, a || {});
	
	this.accountsReceivableReport = new AccountsReceivableReport({
		params : this.params
	});
	
	AccountsReceivableReportWin.superclass.constructor.call(this, {
		layout : "fit",
		width : 1000,
		height : 600,
		items : this.accountsReceivableReport,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		listeners : {
			afterrender : function() {
				this.accountsReceivableReport.searchSubmit();
			}
		}
	});
};
Ext.extend(AccountsReceivableReportWin, Ext.Window, {});