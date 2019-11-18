var PractiInsuranceDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	this.mortgageable = (this.mortgage == "1");
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	if (!this.mortgageable) {
		this.mortgage == "0";
	}
	Ext.apply(this, {
	});
	this.practiInsureRecordGrid = new PractiInsureRecordGrid({
		practiId : this.params.practiIds
	});
	this.practiInsureClaimRecordGrid = new PractiInsureClaimRecordGrid({
		practiId : this.params.practiIds
	});
	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "95%",
		collapsible : true,
		defaults : {
			readOnly : true
		},
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					fieldLabel : "姓名",
					name : "practitoner.practiName"
				}, {
					maxLength : 24,
					fieldLabel : "所属企业",
					name : "practitoner.corpName"
				}, {
					width : 130,
					maxLength : 24,
					fieldLabel : "当前项目",
					name : "practitoner.projectName"
				},  {
					maxLength : 24,
					fieldLabel : "人员状态",
					name : "practitoner.incumbent"
				}]
			},{
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				items : [{
					maxLength : 24,
					fieldLabel : "身份证号",
					name : "practitoner.idCard"
				},{
					maxLength : 24,
					fieldLabel : "所属部门",
					name : "practitoner.depName"
				},{
					maxLength : 24,
					fieldLabel : "所属班组",
					name : "practitoner.teams"
				},{
					maxLength : 24,
					fieldLabel : "参保状态",
					name : "practitoner.insureStatusName"
				}]
			}, {
				layout : "form",
				columnWidth : this.baseWidth,
				defaultType : "textfield",
				defaults : {
				},
				items : [{
					maxLength : 24,
					fieldLabel : "性别",
					name : "practitoner.sexName"
				},{
					maxLength : 24,
					fieldLabel : "工种",
					name : "practitoner.kindWorkName"
				},{
					maxLength : 24,
					fieldLabel : "累计保费",
					name : "practitoner.allPremium"
				},{
					maxLength : 24,
					fieldLabel : "累计理赔",
					name : "practitoner.allClaimAmount"
				}]
			}]
		} ]
	},  {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.practiInsureRecordGrid,this.practiInsureClaimRecordGrid]
	}];
	PractiInsuranceDetailForm.superclass.constructor.call(this, {
		title : "保险管理",
		y : this.mortgageable ? 45 : 130,
		height : this.mortgageable ? 760 : 500,
		form_config : {
			labelWidth : 100,
			object : "practitoner",
			items : items,
			fieldMapping : PractiInsuranceDetailFormField
		},
	});
};
Ext.extend(PractiInsuranceDetailForm, Knight.ux.FormPanelWindow, {
	loadFormData: function() {
		var data = $ajaxSyncCall(__ctxPath + "/archive/practiDetailListPractiInsurance.do?practiId=" + this.params.practiIds, null);
		var result = data.result[0];
		var fields = ["practiName","corpName","projectName","incumbent","idCard","depName","teams","insureStatusName","sexName","kindWorkName","allPremium","allClaimAmount"];
		var value = [result.practiName,result.corpName,result.projectName,result.incumbent,result.idCard,
			result.depName,result.teams,result.insureStatusName,result.sexName,result.kindWorkName,result.allPremium,result.allClaimAmount];
		this.setMultiFieldValue(fields,value);
		
	},
});