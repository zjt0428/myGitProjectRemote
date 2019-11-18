var PractiInsuranceEastView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};

	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var actionItems = null;
		actionItems = [ {
			iconCls : "btn-grid-read",
			qtip : "明细",
			handler : this.readPractiInsuranceClaim
		},{
			hidden : true,
			id : "practiInsure",
			iconCls : "btn-head-add",
			qtip : "添加人员保险理赔",
			handler : this.addPractiInsuranceClaim
		}];
		var tbarItems = null;
		if (!this.tbarDisenable) {
			tbarItems = this.initTopBarActionItems();
		}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : PractiInsuranceDetailListViewField
		},
		tbarItems : tbarItems,
		rowAction : {
			width : 70,
			actionItems : actionItems,
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "practitioner",
			renderer : function(n) {
				if('1' == n.incumbent){
					return '在岗';
				}else if('2' == n.incumbent){
					return '待岗';
				}else{
					return '离职';
				}
			}
		}, {
			header : "姓名",
			dataIndex : "practitioner",
			renderer : function(n) {
				return n.practiName;
			}
		}, {
			header : "身份证号码",
			dataIndex : "practitioner",
			renderer : function(n) {
				return n.idCard;
			}
		}, {
			header : "保险生效时间",
			dataIndex : "startInsureDate",
		} ]
	};
	PractiInsuranceEastView.superclass.constructor.call(this, Ext.apply({
		id : "PractiInsuranceEastView",
		title : "保险人员",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/archive/detailListPractiInsurance.do",
		search_config : {
			collapsed : false,
			preLableHidden : true,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiInsuranceEastView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, p) {
		var msg1 = "请选择要【" + op + "】的设备信息！";
		var msg2 = "您确认要【" + op + "】所选设备信息吗？";
		var msg3 = "成功【" + op + "】所选设备信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, p);
	},
	addPractiInsuranceClaim : function(a) {
		new PractiInsuranceClaimForm(a, {
			saveable :true,
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	showAdd : function(a){
		if("1" == a){
			this.datagrid_config.rowAction.actionItems[1].hidden = false;
		}else {
			this.datagrid_config.rowAction.actionItems[1].hidden = true;
		}
	},
	readPractiInsuranceClaim : function(a){
		new PractiInsuranceDetailForm(a, {
			searchDisenable : true,
			actionDisenable : true,
			tbarDisenable : true,
			params : {
				practiIds : a.practiId
			},
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
});