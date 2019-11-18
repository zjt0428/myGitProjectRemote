/**
 * Created by YaoFly on 2016/10/23.
 */
var AttendamceDetailRpt = function(a) {
    this.params = {};
    Ext.apply(this.params, (a && a.params) || {});
    var generalItems = [{
        id : "Attendamce_now",
        lable : "考勤时间:",
        xtype : "wmdatefield",
        editable : false,
        format : "Y-m",
        name : "Q_[YEARMTH]_S",
        value : new Date()
    },{
        id : "Attendamce_last",
        lable : "--",
        xtype : "wmdatefield",
        hidden : true,
        editable : false,
        format : "Y-m",
        name : "Q_[YEARMTH_LAST]_S",
        value : new Date()
    }, {
		xtype : "treecombo",
		id : Ext.id(),
		allowBlank : true,
		width : 130,
		lable : "所属部门",
		url : __ctxPath + "/system/listDepartment.do?opt=appUser",
		name : "Q_[DEP_NAME]_S"
	},/*{
		width : 80,
		lable : "员工编号",
		name : "Q_[USER_SERIAL_BEG]_S"
		//value : 0
	},{
		width : 80,
		lable : "至",
		name : "Q_[USER_SERIAL_END]_S"
		//value : 9999
	}*/{
		width : 80,
		lable : "员工姓名",
		name : "Q_[FULL_NAME]_S"
	}
    ];
    AttendamceDetailRpt.superclass.constructor.call(this, {
        id : "AttendamceDetailRpt",
        title : "考勤详情表",
        iconCls : "menu-business-accountdue",
        jasperFile : "REPORT_ATTENDAMCE_DETAIL",
        search_config : {
            generalItems : generalItems
        },
        base_params : this.params
    });
};
Ext.extend(AttendamceDetailRpt, Knight.ux.BaseReportView, {
    searchSubmit : function() {
        var date = Ext.getCmp("Attendamce_now").getValue();
        var temp = new Date(date.setMonth((date.getMonth()-1)));
        Ext.getCmp("Attendamce_last").setValue(new Date(temp));
        this.currentSearchPanel = this.searchPanel;
        this.currentSearchPanel.getForm().findField("reportType").setValue("html");
        $reportFormRequest(this.currentSearchPanel.getForm(), function(e, c) {
            this.reportPanel.body.update(e.responseText);
        }.createDelegate(this));
    }
});
Ext.form.WMDateField = Ext.extend(Ext.form.DateField, {
	 safeParse : function(value, format) {
	  if (/[gGhH]/.test(format.replace(/(\\.)/g, ''))) {
	   return Date.parseDate(value, format);
	  } else if ("Y-m" == format) {
	   var parsedDate = Date.parseDate(value + '-01 ' + this.initTime, format + '-d ' + this.initTimeFormat);
	   if (parsedDate) {
	    return parsedDate.clearTime();
	   }
	  } else if ("Ym" == format) {
	   var parsedDate = Date.parseDate(value + '01 ' + this.initTime, format + 'd ' + this.initTimeFormat);
	   if (parsedDate) {
	    return parsedDate.clearTime();
	   }
	  } else {
	   var parsedDate = Date.parseDate(value + ' ' + this.initTime, format + ' ' + this.initTimeFormat);
	   if (parsedDate) {
	    return parsedDate.clearTime();
	   }
	  }
	 }
	});
	Ext.reg('wmdatefield', Ext.form.WMDateField);
