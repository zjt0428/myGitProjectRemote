Ext.ns("FileAttachDetail");
FileAttachDetail.show = function(a, obj) {
	var b = new Ext.Window({
		title : "附件详细信息",
		iconCls : "menu-attachment",
		width : 480,
		height : 270,
		minHeight : 269,
		modal : true,
		layout : "form",
		buttonAlign : "center",
		autoLoad : {
			url : __ctxPath + "/fileDetail.do?fileId=" + a
		},
		buttons : [ {
			xtype : "button",
			iconCls : "btn-close",
			text : "关闭",
			handler : function() {
				b.close();
			}
		} ]
	});
	b.show();
	obj.className = "kn-alink-fileattach";
};
FileAttachDetail.removeFile = function(regAttachsPanel, regAttachsFileIds, fileId) {
	Ext.Msg.confirm("信息确认", "确定删除该信息保存的附件？", function(e) {
		if (e == "yes") {
			Ext.Ajax.request({
				url : __ctxPath + "/system/deleteFileAttach.do",
				params : {
					fileId : fileId
				},
				success : function() {
					var b = Ext.getCmp(regAttachsFileIds);
					var d = b.getValue();
					if (d.indexOf(",") < 0) {
						b.setValue("");
					} else {
						d = d.replace("," + fileId, "").replace(fileId + ",", "");
						b.setValue(d);
					}
					var c = Ext.get(regAttachsPanel.parentNode);
					c.remove();
				},
				failure : function(q, r) {
					Ext.MessageBox.alert("操作信息", "删除失败");
				}
			});
		}
	});
};

FileAttachDetail.deleteFile = function(obj,regAttachsFileIds,rowIndex,fileId) {
	Ext.Msg.confirm("信息确认", "确定删除该信息保存的附件？", function(e) {
		if (e == "yes") {
			Ext.Ajax.request({
				url : __ctxPath + "/system/deleteFileAttach.do",
				params : {
					fileId : fileId
				},
				success : function() {
					
					var c = Ext.get(obj.parentNode);
					c.remove();
					var o = obj;
					
					var b = Ext.getCmp(regAttachsFileIds);
					var d = b.getStore().getAt(rowIndex).get("enclosuerBeforRectification");
					if (d.indexOf(",,") < 0) {
						b.getStore().getAt(rowIndex).set("enclosuerBeforRectification","");
					} else {
						var array=d.split(",,");
						var strs = array;
						for (i=0;i<array.length ;i++ ){ 
							if(array[i].indexOf(fileId)>0){
								strs.splice(i,1);
							}
						}
//						d = d.replace("," + fileId, "").replace(fileId + ",", "");
						b.getStore().getAt(rowIndex).set("enclosuerBeforRectification",strs.join(",,"));
					}
				},
				failure : function(q, r) {
					Ext.MessageBox.alert("操作信息", "删除失败");
				}
			});
		}
	});
};