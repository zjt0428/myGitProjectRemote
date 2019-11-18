var PractiDiaryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "人员安排";
	var columns = [ {
		header : "人员姓名",
		dataIndex : "practiName"
	}, {
		header : "从业工种",
		dataIndex : "kindWorkName"
	}, {
		header : "手机号",
		dataIndex : "mobile"
	}, {
		header : "岗位",
		dataIndex : "station"
	}, {
		header : "所属企业",
		dataIndex : "corpName"
	}, {
		header : "进场日期",
		dataIndex : "startDate"
	}, {
		header : "退场日期",
		dataIndex : "endDate"
	} ];

	var actionItems = [];
	if (this.retrieveable) {
		actionItems.push({
			iconCls : "btn-grid-del",
			qtip : "回收",
			handler : this.fulfilDispatchPracti
		});
	}
	PractiDiaryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : PractiDiaryListViewField,
		title : this.title,
		option : "人员计划",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		delurl : __ctxPath + "/equip/multiDelPractiDiary.do"
	}, this.grid_config || {}));
};
Ext.extend(PractiDiaryGrid, Knight.ux.SubModuleBaseGrid, {
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