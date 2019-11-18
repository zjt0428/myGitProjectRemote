var AnnounceCategoryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [];
	if (this.category == "0") {
		columns.push({
			width : 100,
			header : "阅读人员",
			dataIndex : "userName"
		});
	} else if (this.category == "1") {
		columns.push({
			width : 100,
			header : "阅读部门",
			dataIndex : "depName"
		});
	}
	var fields = [ "announceCategoryId", "announceId", "userId", "userName", "depId", "depName", "scopeDepId", "scopeDepName", "category" ];
	AnnounceCategoryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : this.title,
		option : "发布对象",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : fields,
		columns : columns,
		delurl : __ctxPath + "/form/multiDelCategoryAnnounce.do"
	}, this.grid_config || {}));
};
Ext.extend(AnnounceCategoryGrid, Knight.ux.SubModuleBaseGrid, {
	addSubPractiDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.userId == data.userId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			userId : data.userId,
			userName : data.fullname,
			category : "0"
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubDepDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.depId == data.depId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			depId : data.depId,
			depName : data.depName,
			category : "1"
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		if (this.category == "0") {
			new UserSimpleSelector({
				callback : function(d) {
					for ( var i = 0; i < d.length; i++) {
						var data = d[i].data;
						this.addSubPractiDate(data);
					}
				}.createDelegate(this)
			}).show();
		} else if (this.category == "1") {
			new DepartmentSelector({
				callback : function(d) {
					for ( var i = 0; i < d.length; i++) {
						var data = d[i].data;
						this.addSubDepDate(data);
					}
				}.createDelegate(this)
			}).show();
		}
	}
});