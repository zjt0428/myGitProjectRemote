var AttendamceListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	if (!isGranted("_AttendamceQueryAll")) {
//		this.params.Q_userId_L_EQ = curUserInfo.userId;
//	}
	if(!isGranted("__ALL")){
		this.params.QVO_permissionFlag_S_LK = curUserInfo.labourPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		attenDepartmentId : Ext.id()
	});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [
		                {
			xtype : "hidden",
			id : this.attenDepartmentId,
			name : "Q_depId_L_EQ"
		},
		{
			lable : "日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_sgDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_sgDate_DG_LE"
		},{
			lable : "姓名",
			name : "Q_userName_S_LK"
		},{
//			name : "Q_depName_S_LK",
			valId : this.attenDepartmentId,
			name : "attendamce.depName",
			xtype : "treecombo",
			width : 130,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do"
		},{
			lable : "项目名称",
			name : "Q_project.projectName_S_LK"
		},{
			lable : "设备自编号",
			name : "Q_equipment.equipSerial_S_LK"
		},{
			lable : "出厂编号",
			name : "Q_equipment.exwSerial_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAttendamce
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AttendamceListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "姓名",
			dataIndex : "userName"
		}, {
			header : "日期",
			dataIndex : "sgDate"
		},{
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		},  {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		},{
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		},{
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "签到时间",
			dataIndex : "sginTime"
		}, {
			header : "签到位置",
			dataIndex : "sginLocation"
		}, {
			header : "签退时间",
			dataIndex : "sgouTime"
		}, {
			header : "签退位置",
			dataIndex : "sgouLocation"
		},{
			header : "所属部门",
			dataIndex :"depName"
		}, {
			header : "备注",
			dataIndex : "remark"
		}]
	};
	AttendamceListView.superclass.constructor.call(this, Ext.apply({
		id : "AttendamceListView",
		title : TabTitle.ATTENDAMCE_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/app/listAttendamce.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AttendamceListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
//		tbarItems.push({
//			iconCls : "btn-head-add",
//			text : "签到",
//			handler : this.attendamceSignIn.createDelegate(this)
//		});
		tbarItems.push({
			iconCls : "btn-head-edit",
			text : "强制签退",
			handler : this.attendamceSignOut.createDelegate(this)
		});
		tbarItems.push("->");
		if (isGranted("_AttendamceReport")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "考勤表",
				handler : this.reportAttendamce.createDelegate(this)
			});
		}
		if (isGranted("_AttendamceExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportAttendamce.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的考勤记录！";
		var msg2 = "您确认要【" + op + "】所选的考勤记录吗？";
		var msg3 = "成功【" + op + "】所选的考勤记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readAttendamce : function(a) {
		new AttendamceForm(a).show();
	},
	attendamceSignIn : function() {
		$request({
			url : __ctxPath + "/app/saveAttendamce.do?TYPE=1",
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});			

	},
	attendamceSignOut : function() {
		this.speciallyGridAction(this.dataGridPanel, "aid", __ctxPath + "/app/addSignOutAttendamce.do", "强制签退", function(a) {
			if ("" == a.sgouTime) {
				return true;
			}
			$toast("该考勤记录已有【签退】！");
			return false;
		}.createDelegate(this), "是否确认强制签退，签退后数据将不能进行修改");
	},
	exportAttendamce : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/app/exportAttendamce.do", this.dataGridPanel);
	},
	reportAttendamce : function(){
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/app/reportAttendamce.do", this.dataGridPanel);
	}
});