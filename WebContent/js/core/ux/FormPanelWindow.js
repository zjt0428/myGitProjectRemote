/**
 * <pre><code>
 * form_config : {
 * 	saveable : false,
 * 	accept : {
 * 		action : false,
 * 		relateId : relateId,
 * 		relateModule : relateModule
 * 	},
 * 	approve : {
 * 		action : false,
 * 		relateId : relateId,
 * 		relateModule : relateModule
 * 	},
 * 	fieldMapping : [],
 * 	tbarItems : [],
 * 	hiddenField : []
 * }
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.FormPanelWindow = function(a) {
	Ext.apply(this, a || {});
	this.formPanel;
	this.initFormPanel();
	if (!a.centerLayout) {
		if (typeof (a.x) != "number") {
			this.x = 190;
		}
		if (typeof (a.y) != "number") {
			this.y = 130;
		}
	}
	
	Knight.ux.FormPanelWindow.superclass.constructor.call(this, {
		layout : "fit",
		iconCls : this.iconCls ? this.iconCls : "menu-set-department",
		title : this.title,
		width : this.width ? this.width : 930,
		height : this.height ? this.height : 500,
		items : this.formPanel,
		border : false,
		maximizable :true,
		maximized:typeof (this.maximized) !== 'undefined' ? this.maximized:true,
		modal : true,
		plain : true
	});
};

Ext.extend(Knight.ux.FormPanelWindow, Ext.Window, {
	// private
	getForm : function() {
		return this.formPanel.getForm();
	},
	resetFormData : function() {
		this.getForm().reset();
	},
	findFormField : function(property) {
		return this.getForm().findField(this.form_config.object + "." + property);
	},
	paddingFieldNames : function(preName, properties) {
		var fieldNames = [];
		Ext.each(properties, function(e) {
			fieldNames.push(preName + "." + e);
		});
		return fieldNames;
	},
	paddingValues : function(obj, properties) {
		var values = [];
		Ext.each(properties, function(e) {
			values.push(obj[e]);
		});
		return values;
	},
	getFieldValue : function(property) {
		var field = this.findFormField(property);
		if (field.xtype == "datefield") {
			return field.value;
		}
		if (field) {
			return field.getValue();
		}
		return null;
	},
	setFieldsReadOnly : function(fields, readOnly) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (!field) {
				continue;
			}
			field.setReadOnly(readOnly);
		}
	},
	setFieldValue : function(property, value) {
		var field = this.findFormField(property);
		if (!field) {
			return;
		}
		field.setValue(value);
	},
	setFieldRawValue : function(property, value) {
		var field = this.findFormField(property);
		if (!field) {
			return;
		}
		field.setRawValue(value);
	},
	setMultiFieldValue : function(fields, values) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (!field) {
				continue;
			}
			field.setValue(values[i]);
		}
	},
	setMultiFieldValueReadOnly : function(fields, values) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (!field) {
				continue;
			}
			field.setValue(values[i]);
			field.setReadOnly(true);
		}
	},
	setMultiFieldRawValue : function(fields, values) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (!field) {
				continue;
			}
			field.setRawValue(values[i]);
		}
	},
	copyMultiFieldValue : function(fields, object) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (!field) {
				continue;
			}
			field.setValue(object[fields[i]]);
		}
	},
	fillMultiFieldValue : function(values) {
		for ( var property in values) {
			var field = this.findFormField(property);
			if (!field) {
				continue;
			}
			field.setValue(values[property]);
		}
	},
	cleanMultiField : function(fields) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (field) {
				field.setValue(null);
			}
		}
	},
	cleanMultiFieldRelease : function(fields) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (field) {
				field.setValue(null);
				field.setReadOnly(false);
			}
		}
	},
	setFormSubModuleGrid : function(set, grid, hidden) {
		if (!grid) {
			return;
		}
		if (set && set.length > 0) {
			grid.getStore().loadData(set);
		} else if (!this.saveable && hidden) {
			grid.hide();
		}
	},
	showAcceptApplication : function(a) {
		if (Ext.isEmpty(a.relateId)) {
			Ext.Msg.alert("提示信息", "未加载到受理信息!");
			return;
		}
		$request({
			url : __ctxPath + "/form/listFormAccept.do",
			params : {
				Q_relateId_L_EQ : a.relateId,
				Q_relateModule_S_EQ : a.relateModule
			},
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).result;
				if (data.length <= 0) {
					Ext.Msg.alert("提示信息", "未加载到相关信息!");
					return;
				}
				new HandleForCommentsWin(data, {
					acceptshow : true
				}).show();
			}.createDelegate(this)
		});
	},
	showReviewApplication : function(a) {
		if (Ext.isEmpty(a.relateId)) {
			Ext.Msg.alert("提示信息", "未加载到审核信息!");
			return;
		}
		$request({
			url : __ctxPath + "/form/listFormReview.do",
			params : {
				Q_relateId_L_EQ : a.relateId,
				Q_relateModule_S_EQ : a.relateModule
			},
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).result;
				if (data.length <= 0) {
					Ext.Msg.alert("提示信息", "未加载到相关信息!");
					return;
				}
				new HandleForCommentsWin(data, {
					reviewshow : true
				}).show();
			}.createDelegate(this)
		});
	},
	showApproveApplication : function(a) {
		if (Ext.isEmpty(a.relateId)) {
			Ext.Msg.alert("提示信息", "未加载到审批信息!");
			return;
		}
		$request({
			url : __ctxPath + "/form/listFormApprove.do",
			params : {
				Q_relateId_L_EQ : a.relateId,
				Q_relateModule_S_EQ : a.relateModule
			},
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).result;
				if (data.length <= 0) {
					Ext.Msg.alert("提示信息", "未加载到相关信息!");
					return;
				}
				new HandleForCommentsWin(data, {
					approveshow : true
				}).show();
			}.createDelegate(this)
		});
	},
	preAcceptApplicationSubmit : function(a) {
		return true;
	},
	acceptApplication : function(a) {
		new HandleForCommentsWin({
			relateId : a.relateId,
			relateModule : a.relateModule
		}, {
			accept : true,
			presubmit : this.preAcceptApplicationSubmit.createDelegate(this),
			callback : function() {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this)
		}).show();
	},
	preReviewApplicationSubmit : function(a) {
		return true;
	},
	reviewApplication : function(a) {
		new HandleForCommentsWin({
			relateId : a.relateId,
			relateModule : a.relateModule,
			key:"review"
		}, {
			review : true,
			presubmit : this.preReviewApplicationSubmit.createDelegate(this),
			callback : function() {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this)
		}).show();
	},
	preApproveApplicationSubmit : function(a) {
		return true;
	},
	approveApplication : function(a) {
		new HandleForCommentsWin({
			relateId : a.relateId,
			relateModule : a.relateModule
		}, {
			approve : true,
			presubmit : this.preApproveApplicationSubmit.createDelegate(this),
			callback : function() {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this)
		}).show();
	},
	preOpiniontApplicationSubmit : function(a) {
		return true;
	},
	submitApplication : function(url, id, a, b, grant) {
		if (!Ext.isEmpty(grant) && isGranted(grant)) {
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
			return;
		}
		var msg = a ? a : "";
		var cofmsg = b ? b : "是否提交该申请?";
		Ext.Msg.confirm("信息确认", cofmsg + "</br>" + msg, function(c) {
			if (c == "yes") {
				Ext.Ajax.request({
					url : url,
					params : {
						ids : id
					},
					success : function(d, e) {
						if (this.callback) {
							this.callback.call(this);
						}
						this.close();
					}.createDelegate(this),
					failure : function(d, e) {
						$toast("操作出错，请联系管理员！");
						if (this.callback) {
							this.callback.call(this);
						}
						this.close();
					}.createDelegate(this)
				});
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this));
	},
	addFileAttachs : function() {
		var a = this.fileAttachCfg;
		var uploadDialog = $createUploadDialog({
			file_cat : a.relateModule,
			params : {
				dependId : a.relateId
			},
			callback : function(g) {
				var fileAttachesField = this.fileAttachesField;
				var regAttachsFileId = fileAttachesField.getId();
				for (var i = 0; i < g.length; i++) {
					if (!Ext.isEmpty(fileAttachesField.getValue())) {
						fileAttachesField.setValue(fileAttachesField.getValue() + "," + g[i].fileId);
					} else {
						fileAttachesField.setValue(g[i].fileId);
					}
					var attach = '<span><a href="#" onclick="FileAttachDetail.show(' + g[i].fileId + ', this)">' + g[i].fileName + '</a>';
					if (a.saveable) {
						attach += '<img class="btn-delete" src="' + __ctxPath + '/images/system/delete.gif" onclick="FileAttachDetail.removeFile(this,\'' + regAttachsFileId + '\',\'' + g[i].fileId + '\')"/>';
					}
					attach += '&nbsp;|&nbsp;</span>';
					Ext.DomHelper.append(this.fileAttachPanel.body, attach);
				}
			}.createDelegate(this)
		});
		uploadDialog.show();
	},
	cleanFileAttachs : function() {
		//*
		var fileIds = this.fileAttachesField.getValue();
		if (fileIds) {
			Ext.MessageBox.confirm('提示', '确定清除所有附件？', function(r) {
				if (r == "yes") {
					Ext.Ajax.request( {  
						url : __ctxPath + '/system/multiDelFileAttach.do',  
						method : 'post',  
						params : {  
							ids : fileIds.split(",")
						},  
						success : function(response, options) {  
							var data = Ext.util.JSON.decode(response.responseText);  
							if (data.success) {
								$toast("成功清除所有附件！");
								this.fileAttachPanel.body.update("");
								this.fileAttachesField.setValue("");
							}else {
								$toast("清除附件失败！");
							}
						}.createDelegate(this),  
						failure : function() {  
							$toast("清除附件失败！");
						}  
					});  
				}
			}.createDelegate(this)); 
		}
		/*/
		this.fileAttachPanel.body.update("");
		this.fileAttachesField.setValue("");
		//*/
	},
	initFileAttachContainer : function(a) {
		this.fileAttachCfg = a;
		var fileAttachsItems = [];
		if (a.saveable) {
			fileAttachsItems.push({
				xtype : "button",
				text : "添加附件",
				scope : this,
				iconCls : "menu-attachment",
				handler : this.addFileAttachs.createDelegate(this)
			}, {
				xtype : "button",
				text : "清除附件",
				scope : this,
				iconCls : "reset",
				handler : this.cleanFileAttachs.createDelegate(this)
			});
		}
		this.fileAttachesField = new Ext.form.Hidden({
			name : "file_attaches"
		});
		this.fileAttachPanel = new Ext.Panel({
			fieldLabel : "附件",
			frame : true,
			border : true,
			bodyStyle : "padding:4px 4px 4px 4px;backgroundColor:#FFFFFF",
			height : 70,
			autoScroll : true,
			html : ""
		});
		var fileAttachContainer = new Ext.Container({
			layout : "column",
			border : false,
			defaults : {
				border : false
			},
			items : [ this.fileAttachesField, {
				columnWidth : 0.85,
				layout : "form",
				border : false,
				items : [ this.fileAttachPanel ]
			}, {
				columnWidth : 0.15,
				items : fileAttachsItems
			} ]
		});
		return fileAttachContainer;
	},
	initFormPanel : function() {
		var c = this.form_config;
		if (!c.tbarItems) {
			c.tbarItems = [];
		}
		if (c.saveable) {
			c.tbarItems.unshift({
				iconCls : "btn-reset",
				text : "重置",
				handler : this.resetFormData.createDelegate(this)
			});
			c.tbarItems.unshift({
				iconCls : "btn-save",
				text : "保存",
				handler : this.saveFormData.createDelegate(this)
			});
		}
		if (c.review && c.review.relateId) {
			c.tbarItems.unshift({
				iconCls : "btn-accept-info",
				text : "评审信息",
				handler : this.showReviewApplication.createDelegate(this, [ c.review ])
			});
		}
		if (c.accept && c.accept.relateId) {
			c.tbarItems.unshift({
				iconCls : "btn-accept-info",
				text : "受理信息",
				handler : this.showAcceptApplication.createDelegate(this, [ c.accept ])
			});
		}
		if (c.approve && c.approve.relateId) {
			c.tbarItems.unshift({
				iconCls : "btn-approve-info",
				text : "审批信息",
				handler : this.showApproveApplication.createDelegate(this, [ c.approve ])
			});
		}
		c.tbarItems.push("->");
		if (c.accept && c.accept.action && c.accept.relateId) {
			c.tbarItems.push({
				iconCls : "btn-accept",
				text : "受理",
				handler : this.acceptApplication.createDelegate(this, [ c.accept ])
			});
		}
		if (c.review && c.review.action && c.review.relateId) {
			c.tbarItems.push({
				iconCls : "btn-accept",
				text : "评审",
				handler : this.reviewApplication.createDelegate(this, [ c.review ])
			});
		}
		if (c.approve && c.approve.action && c.approve.relateId) {
			c.tbarItems.push({
				iconCls : "btn-approve",
				text : "审批",
				handler : this.approveApplication.createDelegate(this, [ c.approve ])
			});
		}
		this.topbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			bodyStyle : "",
			items : c.tbarItems
		});
		if (c.tbarItems.length <= 1) {
			this.topbar.hide();
		}
		if (c.hiddenField && c.hiddenField.length > 0) {
			c.items = c.items.concat(c.hiddenField);
		}
		this.formPanel = new Ext.form.FormPanel(Ext.apply({
			bodyStyle : "margin : 5px 1px 1px 1px",
			labelWidth : 110,
			frame : true,
			autoScroll : true,
			defaultType : "textfield",
			labelAlign : "right",
			labelSeparator : "：",
			tbar : this.topbar,
			reader : new Ext.data.JsonReader({
				root : "data"
			}, c.fieldMapping),
			listeners : {
				afterrender : this.loadPreFormData.createDelegate(this)
			}
		}, c));
	},
	loadFileAttachInfo : function() {
		if (!this.fileAttachCfg || Ext.isEmpty(this.fileAttachCfg.relateId)) {
			return;
		}
		var cfg = this.fileAttachCfg;
		var regAttachsFile = this.fileAttachesField;
		var regAttachsFileId = this.fileAttachesField.getId();
		var regAttachsPanel = this.fileAttachPanel;
		Ext.Ajax.request({
			url : __ctxPath + "/system/listAllFileAttach.do",
			params : {
				relateId : cfg.relateId,
				relateModule : cfg.relateModule
			},
			method : 'post',
			success : function(b, c) {
				var data = Ext.util.JSON.decode(b.responseText).data;
				for (var i = 0; i < data.length; i++) {
					var f = data[i];
					if (!Ext.isEmpty(regAttachsFile.getValue())) {
						regAttachsFile.setValue(regAttachsFile.getValue() + "," + f.fileId);
					} else {
						regAttachsFile.setValue(f.fileId);
					}
					var attach = '<span><a href="#" onclick="FileAttachDetail.show(' + f.fileId + ', this)">' + f.fileName + '</a>';
					if (cfg.saveable) {
						attach += '<img class="btn-delete" src="' + __ctxPath + '/images/system/delete.gif" onclick="FileAttachDetail.removeFile(this,\'' + regAttachsFileId + '\',\'' + f.fileId + '\')"/>';
					}
					attach += '&nbsp;|&nbsp;</span>';
					Ext.DomHelper.append(regAttachsPanel.body, attach);
				}
			}.createDelegate(this),
			failure : function() {
				$toast("附件信息加载失败!");
			}
		});
	},
	loadPreFormData : function() {
		this.loadFileAttachInfo();
		this.loadFormData();
	},
	cleanGridId : function(set, grid, id) {
		if (!grid) {
			return;
		}
		if (set && set.length > 0) {
			for(var i=0;i<set.length;i++) {
				grid.getStore().getAt(i).data[id]=null;
			}
		} 
	},
	saveFormData : function() {
	},
	loadFormData : function() {
	}
});