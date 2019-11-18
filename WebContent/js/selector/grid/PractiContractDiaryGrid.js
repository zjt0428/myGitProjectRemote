var PractiContractDiaryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "人员信息明细";
	var columns = [ {
		header : "人员状态",
		dataIndex : "practiName"
	},{
		header : "人员姓名",
		dataIndex : "practiName"
	}, {
		header : "身份证号",
		dataIndex : "practiName"
	},{
		header : "性别",
		dataIndex : "practiName"
	}, {
		header : "联系电话",
		dataIndex : "mobile"
	},{
		header : "在职岗位",
		dataIndex : "kindWorkName"
	}, {
		header : "入职日期",
		dataIndex : "station"
	}, {
		header : "保险生效日期",
		dataIndex : "corpName"
	}, {
		header : "当前项目",
		dataIndex : "startDate"
	}, {
		header : "项目地址",
		dataIndex : "endDate"
	}, {
		header : "合同编号",
		dataIndex : "endDate"
	}, {
		header : "保费",
		dataIndex : "endDate"
	}, {
		header : "备注",
		dataIndex : "endDate"
	} ];
	this.tbarItems = [{
		iconCls : "btn-head-import",
		text : "新增",
		handler : this.fulfilDispatchPracti
	},{
		iconCls : "btn-head-import",
		text : "修改",
		handler : this.fulfilDispatchPracti
	},{
		iconCls : "btn-head-import",
		text : "删除",
		handler : this.fulfilDispatchPracti
	},{
		iconCls : "btn-head-import",
		text : "导入人员信息",
		handler : this.fulfilDispatchPracti
	}];
	PractiContractDiaryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : PractiDiaryListViewField,
		title : this.title,
		option : "人员信息明细",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		rowAction : {
			width : 40,
		},
		delurl : __ctxPath + "/equip/multiDelPractiDiary.do"
	}, this.grid_config || {}));
};
Ext.extend(PractiContractDiaryGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.practiId == data.practiId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		if(!data.corpInfo){
			data.corpInfo = data.practitioner.corpInfo;
			data.practiName = data.practitioner.practiName;
			data.kindWorkName = data.practitioner.kindWorkName;
			data.mobile = data.practitioner.mobile;
			data.station = data.practitioner.station;
		}
		Ext.apply(recordType.data, {
//			businessPractiId : data.dispatchPractiId,
			practiId : data.practiId,
			practiName : data.practiName,
			kindWorkName : data.kindWorkName,
			mobile : data.mobile,
			station : data.station,
			corpName : data.corpInfo.corpName
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
//		new DispatchPractiSelector({
//			params : this.importParams,
//			callback : function(d) {
//				for ( var i = 0; i < d.length; i++) {
//					var data = d[i].data;
//					this.addSubModuleDate(data);
//				}
//			}.createDelegate(this)
//		}).show();
		new PractitionerSelector({
			single : true,
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
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
	}
});