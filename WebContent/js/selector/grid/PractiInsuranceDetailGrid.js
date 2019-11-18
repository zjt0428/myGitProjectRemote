var PractiInsuranceDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	var columns = [ {
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
		header : "人员姓名",
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
		header : "性别",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.sex=='0'?'女':'男';
		}
	},{
		header : "联系电话",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.mobile;
		}
	}, {
		header : "在职岗位",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.station;
		}
	}, {
		header : "工种",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.kindWorkName;
		}
	}, {
		header : "入职时间",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.divisionDate;
		}
	}, {
		header : "保险生效时间",
		dataIndex : "startInsureDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startInsureDate = value;
			return value;
		}
	}, {
		header : "当前项目",
		dataIndex : "projectName",
	}, {
		header : "项目地址",
		dataIndex : "practitioner",
		renderer : function(n) {
			if(n.project){
				return n.project.address;
			}
			return null;
		}
	}, {
		header : "合同编号",
		dataIndex : "contractNo",
	}, {
		hidden : "true",
		header : "合同",
		dataIndex : "contractId",
	}, {
		header : "保费",
		dataIndex : "premium",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	},{
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		hidden : true,
		dataIndex : "contractId",
	}];
	if(/*this.saveable !=*/ true){
		this.tbarItems = [{
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "员工姓名<font color=red>*</font>:"
		},{
			id : "practiName",
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			allowBlank : false,
			width : 90
		},{
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "身份证号码<font color=red>*</font>:"
		},{
			id : "idCard",
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			allowBlank : false,
			width : 90
		},{
			xtype : "button",
			iconCls : "btn-search",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			text : "查询",
			handler : this.queryPractiInsurance.createDelegate(this)
		},{
			xtype : "button",
			iconCls : "btn-reset",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			text : "重置条件",
			handler : this.resetQueryParams.createDelegate(this)
		}];
	}
	PractiInsuranceDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "人员明细",
		option : "人员明细",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : PractiInsuranceDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelDetailPractiInsurance.do"
	}, this.grid_config || {}));
};
Ext.extend(PractiInsuranceDetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		var startInsureDate = this.parentForm.getForm().findField("practiInsurance.startInsureDate").getValue();
		Ext.apply(record.data, {
			practitioner : data,
			practiId : data.practiId,
			contractId : data.contractId,
			contractNo : data.constractNo,
			projectName : data.projectName,
			projectId : data.projectId,
			address : data.address,
			startInsureDate : startInsureDate,
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		var startInsureDate = this.parentForm.getForm().findField("practiInsurance.startInsureDate").getValue();
		if(startInsureDate==null||startInsureDate==""){
			$toast("请先填写起保日期！");
			return;
		}
		new PractitionerSelector({
			params : {
				"QVO_insureStatus_S_EQ" : "0,3",
				"QVO_permissionFlag_S_LK" : isGranted("__ALL") ? '' : curUserInfo.labourPermission
			},
			collectEnable : true,
			callback : function(d) {
				var is_repeat = false;
				var s = this.getStore().data.items;
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					for(var j = 0; j < s.length; j++){
						if(s[j].data.practiId == data.practiId){
							is_repeat = true;
						}
					}
					if(!is_repeat){
						this.addSubModuleDate(data);
					}
				}
				if(is_repeat){
					$toast("不可重复添加人员！");
				}
			}.createDelegate(this)
		}).show();
	},
	fulfilDispatchPracti : function(data, grid, action, rowIndex) {
		var msg = "该人员[" + data.practiName + "]已经调配审核通过,如果删除无法恢复,如需分配请重新提交调度!";
		$baseRowAction(msg, __ctxPath + "/equip/fulfilPractiDiary.do", {
			practiDiaryId : data.practiDiaryId
		}, function() {
			this.stopEditing();
			this.getStore().removeAt(rowIndex);
			this.startEditing(0, 0);
		}.createDelegate(this));
	},
	queryPractiInsurance : function(a){
		var name = Ext.getCmp("practiName").getValue();
		var card = Ext.getCmp("idCard").getValue();
		var insureId = this.parentForm.getForm().findField("practiInsurance.insureId").getValue();
		var data = $ajaxSyncCall(__ctxPath + "/archive/insuranceDetailListPractiInsurance.do",{
				insureId : insureId,
				practiName : name,
				idCard : card
		});
		this.getStore().loadData(data.result);
	},
	resetQueryParams : function(a){
		Ext.getCmp("practiName").getValue();
		Ext.getCmp("idCard").getValue();
	}
});
