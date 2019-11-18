var FileAttachListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_dependName_S_EQ"] = "FILE_ATTACH";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = [ {
		lable : "文件名",
		name : "Q_fileName_S_LK"
	}, {
		lable : "上传者",
		name : "Q_creator_S_LK"
	} ];
	var actionItems = [];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "fileId",
			sortDir : "desc",
			id : "fileId",
			fields : FileAttachListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "文件名",
			dataIndex : "fileName",
			width : 100
		}, {
			header : "上传时间",
			dataIndex : "createtime",
			width : 100
		}, {
			header : "文件类型",
			dataIndex : "ext",
			width : 100
		}, {
			header : "说明",
			dataIndex : "note",
			width : 100
		}, {
			header : "上传人员",
			dataIndex : "creator",
			width : 100
		} ]
	};
	FileAttachListView.superclass.constructor.call(this, Ext.apply({
		id : "FileAttachListView",
		title : "信息下载",
		iconCls : "menu-system-log",
		url : __ctxPath + "/system/listFileAttach.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(FileAttachListView, Knight.ux.SearchGridPanel, {
	readFileAttach : function(a) {
		FileAttachDetail.show(a.fileId);
	},
	uploadFileAttach : function(file_cat) {
		var uploadDialog = $createUploadDialog({
			file_cat : file_cat,
			callback : function(g) {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		uploadDialog.show(this);
	},
	delFileAttach : function() {
		this.speciallyGridAction(this.dataGridPanel, "fileId", __ctxPath + "/system/multiDelFileAttach.do", "删除");
	}
});