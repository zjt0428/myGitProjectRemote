var DeductPractiGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 100,
		header : "提成人员",
		dataIndex : "practiName"
	}, {
		width : 100,
		header : "分配比例(%)",
		dataIndex : "proportion",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 2
		})
	}, {
		width : 100,
		header : "分配奖金",
		dataIndex : "reward"
	}, {
		width : 100,
		header : "提取状态",
		dataIndex : "pickupStatusName"
	} ];
	var fields = [ "deductPractiId", "deductId", "practiId", "practiName", "proportion", "reward", "pickupStatus", "pickupStatusName" ];
	DeductPractiGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "提成人员",
		option : "提成人员",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : fields,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelPractiDeduct.do"
	}, this.grid_config || {}));
};
Ext.extend(DeductPractiGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalPercent : function() {
		var percent = 0;
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			percent += Number(r.proportion);
		}
		return percent;
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.practiId == data.practiId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			deductId : this.deductId,
			practiId : data.practiId,
			practiName : data.practiName,
			proportion : 0,
			pickupStatus : "0",
			pickupStatusName : "未提取"
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new PractitionerSelector({
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});