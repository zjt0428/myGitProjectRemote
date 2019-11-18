var SafeCheckGrid = function(a,b){
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var fileBeforAttachsItems = [];
	if (this.saveable) {
		fileBeforAttachsItems.push({
			xtype : "button",
			text : "添加附件",
			scope : this,
			iconCls : "menu-attachment",
			handler : this.addBeforFileAttachs.createDelegate(this)
		});
	}
	var fileAfterAttachsItems = [];
	if (this.saveable) {
		fileAfterAttachsItems.push({
			xtype : "button",
			text : "添加附件",
			scope : this,
			iconCls : "menu-attachment",
			handler : this.addAfterFileAttachs.createDelegate(this)
		});
	}
	var beforOperation = new Ext.ux.grid.ActionColumn({
		hidden : !this.saveable,
		header : "操作",
		width : 40,
		items : fileBeforAttachsItems
	});
	var afterOperation = new Ext.ux.grid.ActionColumn({
		hidden : !this.saveable,
		header : "操作",
		width : 40,
		items : fileAfterAttachsItems
	});
	var fileBeforPanel = new Ext.Panel({
		fieldLabel : "",
		frame : true,
		border : false,
		bodyStyle : "padding:4px 4px 4px 4px;backgroundColor:#FFFFFF",
		height : 70,
		autoScroll : true,
		html : ""
	});
	var fileAfterPanel = new Ext.Panel({
		fieldLabel : "",
		frame : true,
		border : false,
		bodyStyle : "padding:4px 4px 4px 4px;backgroundColor:#FFFFFF",
		height : 70,
		autoScroll : true,
		html : ""
	});
	var rectificationStatus = new Ext.grid.CheckColumn({  
		header : "是否整改",
		width : 25, 
		dataIndex : "rectificationStatus",
	});
	var inspectionResults = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "INSPECT_RESULT"
	});

var columns = [ {
		header : "巡检内容",
		dataIndex : "checkContent",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 120
		})
	},rectificationStatus,
	{
		header : "巡检结果",
		width : 60, 
		dataIndex : "inspectionResult",
		editor : new Ext.ux.form.SimpleCombo({
			allowBlank : false,
			codeData : inspectionResults,
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.inspectionResult = value;
			return value;
		}
	}, {
		header : "备案编号",
		dataIndex : "recordId",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 24
		})
	}, {
		header : "出厂编号",
		dataIndex : "exwSerial",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 24
		})
	}, {
		header : "附件(整改前)",
		editor : fileBeforPanel,
		dataIndex : "enclosuerBeforRectification"
	}, /*{
		header : "预览",
		dataIndex : "",
		editor : "",
	},*/ beforOperation, 
	{
		header : "附件(整改后)",
		editor : fileAfterPanel,
		dataIndex  : "enclosuerAfterRectification"
	}, /*{
	header : "预览",
	dataIndex : "",
	editor : "",
	},*/ afterOperation,
	{
		header : "整改说明",
		dataIndex  : "rectificationExplain",
		editor : new Ext.form.TextField({
		allowBlank : true,
		maxLength : 120
	})
} ];
this.tbarItems = this.tbarItems ? this.tbarItems : [];
if (this.saveable && this.contractId) {
	this.tbarItems = [ {
		iconCls : "btn-head-add",
		text : "新增",
		handler : this.addSubModule.createDelegate(this)
	},{
		iconCls : "btn-head-del",
		text : "删除",
		handler : this.delSubModule.createDelegate(this)
	}];
}
	
SafeCheckGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : SafeCheckGridListViewField,
		title : "巡检内容",
		option : "巡检信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/safety/multiDelContentSafeCheck.do",
	}, this.grid_config || {}));	
};

Ext.extend(SafeCheckGrid,Knight.ux.SubModuleBaseGrid,{
	addSubModuleDate : function(data){
		for(var i = 0; i < this.getStore().getCount(); i++ ){
			if(this.getStore().getAt(i).data.safeCheckId == data.safeCheckId){
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var subrecord = new RecordType();
		Ext.apply(subrecord.data, {
			checkContent : data.checkContent,
			statusName : data.statusName,
			rectificationStatus : data.rectificationStatus,
			inspectionResult : data.inspectionResult,
			recordId : data.recordId,
			exwSerial : data.exwSerial,
			enclosuerBeforRectification : data.enclosuerBeforRectification,
			enclosuerAfterRectification : data.enclosuerAfterRectification,
			rectificationExplain : data.rectificationExplain
		});
		this.stopEditing();
		this.getStore().add(subrecord);
		this.startEditing(0, 0);
	},

	addBeforFileAttachs : function(grid, rowIndex, colIndex, action, key) {
		var uploadDialog = $createUploadDialog({
				file_cat : this.relateModule,
			params : {
				safeCheckContentId : grid.getStore().getAt(rowIndex).get("safeCheckContentId"),
				dependId : this.relateId ? this.relateId:curUserInfo.userId+99000				
			},			
			callback : function(g) {
				for (var i = 0; i < g.length; i++) {
					var attach = '<span><a href="#" onclick="FileAttachDetail.show(' + g[i].fileId + ', this)">' + g[i].fileName + '</a>';
						attach += '<img class="btn-delete" src="' + __ctxPath + '/images/system/delete.gif" onclick="FileAttachDetail.deleteFile(this,\'' + grid.id + '\',\'' +rowIndex +'\',\'' + g[i].fileId + '\')"/>';
						attach += '&nbsp;|&nbsp;</span>';
					if((i+1)%4==0){
						attach +="<br>";
					}
					if (!Ext.isEmpty(grid.getStore().getAt(rowIndex).get("enclosuerBeforRectification"))) {
						grid.getStore().getAt(rowIndex).set("enclosuerBeforRectification",grid.getStore().getAt(rowIndex).get("enclosuerBeforRectification")+",,"+attach);
					} else {
						grid.getStore().getAt(rowIndex).set("enclosuerBeforRectification",attach);
					}
				}
			}.createDelegate(this)
		});
		uploadDialog.show();
	},
	
	addAfterFileAttachs : function(grid, rowIndex, colIndex, action, key) {
		var uploadDialog = $createUploadDialog({
				file_cat : this.relateModule,
			params : {
				safeCheckContentId : grid.getStore().getAt(rowIndex).get("safeCheckContentId"),
				dependId : this.relateId ? this.relateId:curUserInfo.userId+99000				
			},			
			callback : function(g) {
				for (var i = 0; i < g.length; i++) {
					var attach = '<span><a href="#" onclick="FileAttachDetail.show(' + g[i].fileId + ', this)">' + g[i].fileName + '</a>';
						attach += '<img class="btn-delete" src="' + __ctxPath + '/images/system/delete.gif" onclick="FileAttachDetail.deleteFile(this,\'' + grid.id + '\',\'' +rowIndex +'\',\'' + g[i].fileId + '\')"/>';
						attach += '&nbsp;|&nbsp;</span>';
					if((i+1)%4==0){
						attach +="<br>";
					}
					if (!Ext.isEmpty(grid.getStore().getAt(rowIndex).get("enclosuerAfterRectification"))) {
						grid.getStore().getAt(rowIndex).set("enclosuerAfterRectification",grid.getStore().getAt(rowIndex).get("enclosuerBeforRectification")+",,"+attach);
					} else {
						grid.getStore().getAt(rowIndex).set("enclosuerAfterRectification",attach);
					}
				}
			}.createDelegate(this)
		});
		uploadDialog.show();
	}
})