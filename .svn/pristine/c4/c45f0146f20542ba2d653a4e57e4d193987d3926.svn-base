var InfoFileAttachListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_dependName_S_EQ"] = "INFO_FILE_ATTACH";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InfoFileAttachListView.superclass.constructor.call(this, Ext.apply({
		id : "InfoFileAttachListView",
		title : "信息文档",
		iconCls : "menu-system-log",
		url : __ctxPath + "/system/listFileAttach.do",
		params : this.params
	}, a));
};
Ext.extend(InfoFileAttachListView, FileAttachListView, {
	initRowActionItems : function(actionItems) {
		if (isGranted("_InfoFileAttachDownload")) {
			actionItems.push({
				iconCls : "btn-grid-read",
				qtip : "下载",
				handler : this.readFileAttach
			});
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InfoFileAttachAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "上传",
				handler : this.uploadFileAttach.createDelegate(this, [ "INFO_FILE_ATTACH" ])
			});
		}
		if (isGranted("_InfoFileAttachMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delFileAttach.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的信息文档!";
		var msg2 = "您确认要【" + op + "】该信息文档吗?";
		var msg3 = "成功【" + op + "】该信息文档!";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	}
});