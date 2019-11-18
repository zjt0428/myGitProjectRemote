/**
 * <pre><code>
 * attach_config : {
 * 	file_size_limit : int,      上传文件体积上限，单位KB
 * 	file_post_name : string,    相当于用普通的文件域上传文件时的name属性，服务器端接收页面通过该名称来获取上传的文件
 * 	file_types : string,        该属性指定了允许上传的文件类型，当有多个类型时使用分号隔开，比如：*.jpg;*.png ,允许所有类型时请使用 *.*
 * 	file_upload_limit : int,    限定用户一次性最多上传多少个文件，在上传过程中，该数字会累加，如果设置为“0”，则表示没有限制
 * 	post_params : object,       一个对象直接量，里面的键/值对会随着每一个文件一起上传
 * }
 * </code></pre>
 */
Ext.ns("Ext.ux");
Ext.ux.SwfUploadPanel = function(cfg) {
	Ext.apply(this, cfg || {});
	
	this.gp = new Ext.grid.GridPanel({
		border : false,
		store : new Ext.data.Store({
			fields : [ "id", "type", "size", "state", "percent", "fileId", "fileName", "filePath" ]
		}),
		columns : [ new Ext.grid.RowNumberer(), {
			header : "文件ID",
			hidden : true,
			hideable : false,
			dataIndex : "fileId"
		}, {
			header : "文件路径",
			hidden : true,
			hideable : false,
			dataIndex : "filePath"
		}, {
			header : "文件名",
			width : 100,
			sortable : true,
			dataIndex : "fileName"
		}, {
			header : "类型",
			width : 70,
			sortable : true,
			dataIndex : "type"
		}, {
			header : "大小",
			width : 80,
			sortable : true,
			dataIndex : "size",
			renderer : this.formatFileSize
		}, {
			header : "进度",
			width : 150,
			sortable : true,
			dataIndex : "percent",
			renderer : this.formatProgressBar,
			scope : this
		}, {
			header : "状态",
			width : 70,
			sortable : true,
			dataIndex : "state",
			renderer : this.formatFileState,
			scope : this
		}, {
			header : "&nbsp;",
			width : 40,
			dataIndex : "id",
			hideable : false,
			renderer : this.formatDelBtn
		} ],
		autoExpandColumn : 3
	});
	this.setting = {
		upload_url : "file-upload",
		flash_url : "js/core/uploader/swfupload.swf",
		flash9_url : "js/core/uploader/swfupload09.swf",
		file_size_limit : 51200, // 上传文件体积上限，单位KB
		file_post_name : "Filedata",
		file_types : "*.*", // 允许上传的文件类型
		file_types_description : "所有文件", // 文件类型描述
		file_upload_limit : "0",
		post_params : {},
		use_query_string : true,
		debug : false,
		button_cursor : SWFUpload.CURSOR.HAND,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		custom_settings : { // 自定义参数
			scope_handler : this
		},
		swfupload_preload_handler : this.onSwfuploadPreload.createDelegate(this), // SWFUpload已确认各项可用特性之后，FlashMovie加载完毕之前的这段时间内触发的事件.此事件的处理函数如果返回false，将停止加载swfupload。通常用在处理浏览器不支持某重要特性参数的情况.
		swfupload_load_failed_handler : this.onSwfUploadLoadFailed.createDelegate(this), // 当页面不能正常加载flash影片的时候。通常是因为没有安装FlashPlayer或者它的版本低于9.0.28
		swfupload_loaded_handler : this.onSwfUploadLoaded.createDelegate(this), // 当Flash控件成功加载后触发的事件处理函数

		file_dialog_start_handler : this.onFileDialogStart.createDelegate(this), // 当文件选取对话框弹出前出发的事件处理函数
		file_queued_handler : this.onFileQueued.createDelegate(this), // 当选择好文件，文件选择对话框关闭消失时，如果选择的文件成功加入待上传队列，那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）。
		file_queue_error_handler : this.onFileQueuedError.createDelegate(this),
		file_dialog_complete_handler : this.onFileDialogComplete.createDelegate(this), // 当文件选取对话框关闭后触发的事件处理

		upload_resize_start_handler : this.onUploadResizeStart.createDelegate(this),
		upload_start_handler : this.onUploadStart.createDelegate(this), // 开始上传文件前触发的事件处理函数
		upload_progress_handler : this.onUploadProgress.createDelegate(this),
		upload_success_handler : this.onUploadSuccess.createDelegate(this), // 文件上传成功后触发的事件处理函数
		upload_error_handler : this.onUploadError.createDelegate(this),
		upload_complete_handler : this.onUploadComplete.createDelegate(this)
	};
	Ext.apply(this.setting, cfg.attach_config);
	Ext.ux.SwfUploadPanel.superclass.constructor.call(this, {
		tbar : [ {
			text : "添加文件",
			iconCls : "btn-head-add",
			ref : "../addBtn"
		}, "-", {
			text : "开始上传",
			ref : "../uploadBtn",
			iconCls : "btn-upload",
			handler : this.startUpload,
			scope : this
		}, "-", {
			text : "停止上传",
			ref : "../stopBtn",
			iconCls : "btn-stop",
			handler : this.stopUpload,
			scope : this,
			disabled : true
		}, "-", {
			text : "删除所有",
			ref : "../deleteBtn",
			iconCls : "btn-delete",
			handler : this.deleteAll,
			scope : this
		}, "->", {
			iconCls : "btn-ok",
			text : "确定",
			handler : this.confirm.createDelegate(this)
		} ],
		layout : "fit",
		items : [ this.gp ],
		listeners : {
			"afterrender" : function() {
				var em = this.getTopToolbar().get(0).el.child("em");
				var placeHolderId = Ext.id();
				em.setStyle({
					position : "relative",
					display : "block"
				});
				em.createChild({
					tag : "div",
					id : placeHolderId
				});
				this.swfupload = new SWFUpload(Ext.apply(this.setting, {
					button_width : em.getWidth(),
					button_height : em.getHeight(),
					button_placeholder_id : placeHolderId
				}));
				Ext.get(this.swfupload.movieName).setStyle({
					position : "absolute",
					height : "25px",
					width : "65px",
					top : 0,
					left : 0
				});
			},
			scope : this,
			delay : 100
		}
	});
};
Ext.extend(Ext.ux.SwfUploadPanel, Ext.Panel, {
	linkBtnEvent : function() {
		Ext.select("a.link-btn", false, this.gp.el.dom).on("click", function(o, e) {
			var ds = this.gp.store;
			for (var i = 0; i < ds.getCount(); i++) {
				var rec = ds.getAt(i);
				if (rec.get("id") == e.id) {
					ds.remove(rec);
				}
			}
			this.swfupload.cancelUpload(e.id, false);
		}, this);
	},
	toggleBtn : function(bl) {
		this.addBtn.setDisabled(bl);
		this.uploadBtn.setDisabled(bl);
		this.deleteBtn.setDisabled(bl);
		this.stopBtn.setDisabled(!bl);
		this.gp.getColumnModel().setHidden(6, bl);
	},
	confirm : function() {
		var b = this.gp.getStore();
		var d = new Array();
		for (var c = 0; c < b.getCount(); c++) {
			var a = b.getAt(c);
			if (a.data.state == "-4") {
				d.push(a.data);
			}
		}
		this.swfupload.destroy();
		if (this.callback != null) {
			this.callback.call(this, d);
		}
		this.destroy();
	},
	cancel : function() {
		this.swfupload.destroy();
		this.destroy();
	},
	getTplStr : function(v) {
		var bgColor = "orange";
		var borderColor = "#008000";
		return String.format('<div>' + '<div style="border:1px solid {0};height:10px;width:{1}px;margin:4px 0px 1px 0px;float:left;">' + '<div style="float:left;background:{2};width:{3}%;height:10px;"><div></div></div>' + '</div>' + '<div style="text-align:center;float:right;width:40px;margin:3px 0px 1px 0px;height:10px;font-size:12px;">{3}%</div>' + '</div>', borderColor, (90), bgColor, v);
	},
	formatFileSize : function(_v, celmeta, record) {
		return Ext.util.Format.fileSize(_v);
	},
	formatProgressBar : function(v) {
		var progressBarTmp = this.getTplStr(v);
		return progressBarTmp;
	},
	formatFileState : function(n) { // 文件状态
		switch (n) {
			case -1:
				return "未上传";
				break;
			case -2:
				return "正在上传";
				break;
			case -3:
				return '<div style="color:red;">上传失败</div>';
				break;
			case -4:
				return "上传成功";
				break;
			case -5:
				return "取消上传";
				break;
			default:
				return n;
		}
	},
	formatDelBtn : function(v) {
		return "<a href='#' id='" + v + "'  style='color:blue' class='link-btn' ext:qtip='移除该文件'>移除</a>";
	},
	startUpload : function() {
		if (!this.swfupload) {
			return;
		}
		if (this.swfupload.getStats().files_queued <= 0) {
			return;
		}
		this.swfupload.uploadStopped = false;
		this.toggleBtn(true);
		this.swfupload.startUpload();
	},
	stopUpload : function() {
		if (!this.swfupload) {
			return;
		}
		this.swfupload.uploadStopped = true;
		this.swfupload.stopUpload();
	},
	deleteAll : function() {
		var ds = this.gp.store;
		for (var i = 0; i < ds.getCount(); i++) {
			var record = ds.getAt(i);
			var file_id = record.get("id");
			this.swfupload.cancelUpload(file_id, false);
		}
		ds.removeAll();
		this.swfupload.uploadStopped = false;
	},
	onSwfuploadPreload : function() {
	},
	onSwfUploadLoadFailed : function() {
		Ext.Msg.alert("提示信息","Flash加载失败，请先设置网站允许Flash，否则将影响文件添加");
		window.open("http://www.adobe.com/go/getflashplayer");
	},
	onSwfUploadLoaded : function() {
		if (this.debug) {
			console.info("SWFUPLOAD LOADED");
		}
	},
	onFileDialogStart : function() {
	},
	onFileQueued : function(file) {
		var rec = new Ext.data.Record({
			id : file.id,
			fileName : file.name,
			size : file.size,
			type : file.type,
			state : file.filestatus,
			percent : 0
		});
		this.gp.getStore().add(rec);
	},
	onFileQueuedError : function(file, n) {
		switch (n) {
			case -100:
				Ext.MessageBox.alert("提示", "待上传文件列表数量超限，不能选择！");
				break;
			case -110:
				Ext.MessageBox.alert("提示", "文件太大，不能选择！");
				break;
			case -120:
				Ext.MessageBox.alert("提示", "该文件大小为0，不能选择！");
				break;
			case -130:
				Ext.MessageBox.alert("提示", "该文件类型不可以上传！");
				break;
		}
	},
	onFileDialogComplete : function() {
		this.linkBtnEvent();
	},
	onUploadResizeStart : function() {
	},
	onUploadStart : function(file) {
		var post_params = this.setting.post_params;
		Ext.apply(post_params, { // 处理中文参数问题
			fileName : encodeURIComponent(file.name)
		});
		this.swfupload.setPostParams(post_params);
	},
	onUploadProgress : function(file, bytesComplete, totalBytes) { // 处理进度条
		var percent = Math.ceil((bytesComplete / totalBytes) * 100);
		percent = percent == 100 ? 99 : percent;
		var ds = this.gp.store;
		for (var i = 0; i < ds.getCount(); i++) {
			var record = ds.getAt(i);
			if (record.get("id") == file.id) {
				record.set("percent", percent);
				record.set("state", file.filestatus);
				record.commit();
			}
		}
	},
	onUploadSuccess : function(file, serverData) {
		var ds = this.gp.store;
		var resp = Ext.util.JSON.decode(serverData);
		if (resp && resp.success) {
			for (var i = 0; i < ds.getCount(); i++) {
				var rec = ds.getAt(i);
				if (rec.get("id") == file.id) {
					rec.set("state", file.filestatus);
					rec.set("fileId", resp.fileId);
					rec.commit();
				}
			}
		} else {
			for (var i = 0; i < ds.getCount(); i++) {
				var rec = ds.getAt(i);
				if (rec.get("id") == file.id) {
					rec.set("percent", 0);
					rec.set("state", -3);
					rec.commit();
				}
			}
		}
		this.linkBtnEvent();
	},
	onUploadError : function(file, errorCode, message) {
		this.linkBtnEvent();
		var ds = this.gp.store;
		for (var i = 0; i < ds.getCount(); i++) {
			var rec = ds.getAt(i);
			if (rec.get("id") == file.id) {
				rec.set("percent", 0);
				rec.set("state", file.filestatus);
				rec.commit();
			}
		}
	},
	onUploadComplete : function(file) {
		if (file.filestatus == -4) {
			var ds = this.gp.store;
			for (var i = 0; i < ds.getCount(); i++) {
				var record = ds.getAt(i);
				if (record.get("id") == file.id) {
					record.set("percent", 100);
					if (record.get("state") != -3) {
						record.set("state", file.filestatus);
					}
					record.commit();
				}
			}
		}
		if (this.swfupload.getStats().files_queued > 0 && this.swfupload.uploadStopped == false) {
			this.swfupload.startUpload();
		} else {
			this.toggleBtn(false);
			this.linkBtnEvent();
		}
	}
});
Ext.reg("swfUploadPanel", Ext.ux.SwfUploadPanel);