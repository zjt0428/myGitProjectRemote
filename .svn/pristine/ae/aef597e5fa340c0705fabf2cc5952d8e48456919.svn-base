var jsCache = new Array();
var MoreThanMaxLength = "消息内容只允许输入1000个中文字符";
var MoreThanMaxLength1 = "消息内容只允许输入3000个中文字符";
var recordHeight = 21;
function strToDom(a) {
	if (window.ActiveXObject) {
		var b = new ActiveXObject("Microsoft.XMLDOM");
		b.async = "false";
		b.loadXML(a);
		return b;
	} else {
		if (document.implementation && document.implementation.createDocument) {
			var c = new DOMParser();
			var b = c.parseFromString(a, "text/xml");
			return b;
		}
	}
}
function newView(viewName, params) {
	var str = "new " + viewName;
	if (params != null) {
		str += "(params);";
	} else {
		str += "();";
	}
	return eval(str);
}
function uniqueArray(e) {
	e = e || [];
	var b = {};
	for (var d = 0; d < e.length; d++) {
		var c = e[d];
		if (typeof (b[c]) == "undefined") {
			b[c] = 1;
		}
	}
	e.length = 0;
	for ( var d in b) {
		e[e.length] = d;
	}
	return e;
}
function setCookie(b, d, a, f, c, e) {
	document.cookie = b + "=" + escape(d) + ((a) ? "; expires=" + a.toGMTString() : "") + ((f) ? "; path=" + f : "") + ((c) ? "; domain=" + c : "") + ((e) ? "; secure" : "");
}
function getCookie(b) {
	var d = b + "=";
	var e = document.cookie.indexOf(d);
	if (e == -1) {
		return null;
	}
	var a = document.cookie.indexOf(";", e + d.length);
	if (a == -1) {
		a = document.cookie.length;
	}
	var c = document.cookie.substring(e + d.length, a);
	return unescape(c);
}
function deleteCookie(a, c, b) {
	if (getCookie(a)) {
		document.cookie = a + "=" + ((c) ? "; path=" + c : "") + ((b) ? "; domain=" + b : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
function $stopIt(e) {
	if (e.returnValue) {
		e.returnValue = false;
	}
	if (e.preventDefault) {
		e.preventDefault();
	}
	return false;
}
function $ImportJs(viewName, callback, params) {
	var b = jsCache[viewName];
	if (b != null) {
		var view = newView(viewName, params);
		callback.call(this, view);
	} else {
		var jsArr = eval("App.importJs." + viewName);
		if (jsArr == undefined || jsArr.length == 0) {
			try {
				var view = newView(viewName, params);
				callback.call(this, view);
			} catch (e) {
				Ext.MessageBox.show({
					title : "操作信息",
					msg : e,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
			return;
		}
		ScriptMgr.load({
			scripts : jsArr,
			callback : function() {
				jsCache[viewName] = 0;
				var view = newView(viewName, params);
				callback.call(this, view);
			}
		});
	}
};
function $ImportSimpleJs(a, b) {
	ScriptMgr.load({
		scripts : a,
		callback : function() {
			if (b) {
				b.call(this);
			}
		}
	});
}
function $createUploadDialog(b) {
	var attach_config = {
		upload_url : __ctxPath + "/file-upload",
		file_size_limit : __file_size_limit,
		post_params : {}
	}
	if (!Ext.isEmpty(b.file_cat)) {
		attach_config.post_params["file_cat"] = b.file_cat;
	}
	for ( var param in b.params) {
		if (!Ext.isEmpty(b.params[param])) {
			attach_config.post_params[param] = b.params[param];
		}
	}
	if (!Ext.isEmpty(b.file_types)) {
		attach_config.file_types = b.file_types;
	}
	if (!Ext.isEmpty(b.file_upload_limit)) {
		attach_config.file_upload_limit = b.file_upload_limit;
	}
	var c = new Ext.Window({
		width : 650,
		title : "文件上传",
		height : 300,
		layout : "fit",
		items : [ {
			xtype : "swfUploadPanel",
			border : false,
			attach_config : attach_config,
			callback : function(d) {
				if (b.callback != null) {
					b.callback.call(this, d);
				}
				c.destroy();
			}.createDelegate(this)
		} ]
	});
	return c;
};
function $openPostWindow(url, name, params) {
	if (!Ext.fly('downForm')) {
		var downForm = document.createElement('form');
		downForm.id = 'downForm';
		downForm.name = 'downForm';
		downForm.className = 'x-hidden';
		downForm.action = url;
		downForm.method = 'post';
		downForm.target = name; // 打开新的下载页面
		for ( var p in params) {
			var hideInput = document.createElement("input");
			hideInput.type = "hidden"; // 隐藏域
			hideInput.name = p; // form表单参数
			hideInput.value = params[p]; // form表单值
			downForm.appendChild(hideInput);
		}
		document.body.appendChild(downForm);
	}
	Ext.fly('downForm').dom.submit();
	if (Ext.fly('downForm')) {
		document.body.removeChild(downForm);
	}
};
//复选框
function $initLovComboField(a, b, c, e, f) {
	var store_config = {
		autoLoad : true
	}
	if (e) {
		if (e.readOnly || e.hidden) {
			store_config.autoLoad = false;
		} else if (typeof (e.autoLoad) == "boolean") {
			store_config.autoLoad = e.autoLoad;
		}
	}
	var combo = new Ext.ux.form.LovCombo(Ext.apply({
		width : 130,
		mode : "local",
		triggerAction : "all",
		editable : false,
		readOnly : false,
		allowBlank : true,
		valueField : "code",
		displayField : "name",
		fieldLabel : a,
		emptyText : "请选择" + a + "类型",
		hiddenName : b,
		name : b + "Name",
		store : new Ext.data.SimpleStore(Ext.apply({
			url : __ctxPath + "/system/listCode.do?codeId=" + c,
			fields : [ "code", "name" ]
		}, store_config)),
		listeners : f
	}, e || {}));
	return combo;
};
function $initComboBoxField(a, b, c, e, f) {
	var store_config = {
		autoLoad : true
	}
	if (e) {
		if (e.readOnly || e.hidden) {
			store_config.autoLoad = false;
		} else if (typeof (e.autoLoad) == "boolean") {
			store_config.autoLoad = e.autoLoad;
		}
		if (typeof (e.defaultValueIndex) == "number") {
			store_config.listeners = {
				"load" : function(store, recored, params) {
					if (recored.length > 0) {
						combo.setValue(recored[e.defaultValueIndex].get("code"));
					}
				}
			}
		}
	}
	var combo = new Ext.form.ComboBox(Ext.apply({
		xtype : "combo",
		width : 130,
		mode : "local",
		triggerAction : "all",
		forceSelection : true,
		editable : false,
		readOnly : false,
		allowBlank : false,
		valueField : "code",
		displayField : "name",
		fieldLabel : a,
		emptyText : "请选择" + a + "类型",
		hiddenName : b,
		name : b + "Name",
		tpl : '<tpl for="."><div ext:qtip="{name}" class="x-combo-list-item">{name}</div></tpl>',
		store : new Ext.data.SimpleStore(Ext.apply({
			url : __ctxPath + "/system/listCode.do?codeId=" + c,
			fields : [ "code", "name" ]
		}, store_config)),
		enableKeyEvents : true,
		listeners : f
	}, e || {}));
	combo.on("expand", function() {
		this.innerList.dom.style.overflowX = "auto";
	});
	return combo;
};
function $initSimpleComboBoxField(a, b, c, e) {
	var combo = new Ext.form.ComboBox(Ext.apply({
		fieldLabel : a,
		width : 130,
		hiddenName : b,
		emptyText : "请选择" + a + "类型",
		mode : "local",
		editable : false,
		allowBlank : false,
		triggerAction : "all",
		store : c
	}, e || {}));
	return combo;
};
function $initTextField(label, name) {
	var textField = new Ext.form.TextField({
		fieldLabel : label,
		name : name
	});
	return textField;
};
function $toast(a, b) {
	if (b) {
		Ext.ux.Toast.msg('<font face="宋体" color="red">' + a + '</font>', '<font face="宋体" size="3">' + b + '</font>');
	} else {
		Ext.ux.Toast.msg('<font face="宋体" color="red">操作提示：</font>', '<font face="宋体" size="3">' + a + '</font>');
	}
}
function $print(grid, urlfn, record, width, height) {
	 var iWidth = width? width : 600 ;                         //弹出窗口的宽度;
	 var iHeight = height? height : 600;                        //弹出窗口的高度;
	  //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
	 var iTop = (window.screen.height-30-iHeight)/2;       //获得窗口的垂直位置;
	 var iLeft = (window.screen.width-10-iWidth)/2;        //获得窗口的水平位置;
	 
	var a = grid.getSelectionModel().getSelections();
	if (a.length == 0 && Ext.isEmpty(record)) {
		$toast("请选择要打印的信息！");
		return;
	}
	var url = urlfn.call(this, a, record);
	if (Ext.isEmpty(url)) {
		return;
	}
	window.open(url, "附件详细信息", "height="+iHeight+",width="+iWidth+",top="+iTop+",left="+iLeft+",toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
}
function $editGridrowSelecte(grid, validate, callback) {
	var a = grid.getSelectionModel().getSelections();
	if (a.length == 0) {
		$toast("请选择要【修改】的记录信息！");
		return;
	}
	if (typeof (validate) == "function" && !validate.call(this, a[0].data)) {
		return;
	}
	if (typeof (callback) == "function") {
		callback.call(this, a[0]);
	}
}
function $exportFormSubmit(form, url, grid, params, blank) {
	blank = Ext.isEmpty(blank) ? "_self" : blank;
	Ext.MessageBox.show({
		msg : "请稍等，正在提交操作中...",
		progressText : "请求中...",
		width : 300,
		wait : true,
		icon : "ext-load-wait",
		waitConfig : {
			interval : 500
		}
	});
//	var base_params = form.getFieldValues();
	var base_params = form.getValues();
	Ext.apply(base_params, params || {});
	if (grid && Ext.isEmpty(base_params.headers) && Ext.isEmpty(base_params.datafields)) {
		var cm = grid.getColumnModel();
		var headers = [];
		var datafields = [];
		for (var i = 0; i < cm.columns.length; i++) {
			var column = cm.columns[i];
			if (column.hidden || Ext.isEmpty(column.header) || Ext.isEmpty(column.dataIndex)) {
				continue;
			}
			headers.push(column.header);
			datafields.push(column.dataIndex);
		}
		base_params["headers"] = headers.join(",");
		base_params["datafields"] = datafields.join(",");
	}
	$openPostWindow(url, blank, base_params);
	var task = new Ext.util.DelayedTask(function() {
		if (document.readyState == "complete") {
			Ext.MessageBox.hide();
		} else {
			task.delay(1000);
		}
	});
	task.delay(1000);
};
//params为追加列，排在原导出数据之后
function $exportFormSubmitPlus(form, url, grid, params, blank) {
	blank = Ext.isEmpty(blank) ? "_self" : blank;
	Ext.MessageBox.show({
		msg : "请稍等，正在提交操作中...",
		progressText : "请求中...",
		width : 300,
		wait : true,
		icon : "ext-load-wait",
		waitConfig : {
			interval : 500
		}
	});
//	var base_params = form.getFieldValues();
	var base_params = form.getValues();
	if (grid && Ext.isEmpty(base_params.headers) && Ext.isEmpty(base_params.datafields)) {
		var cm = grid.getColumnModel();
		var headers = [];
		var datafields = [];
		for (var i = 0; i < cm.columns.length; i++) {
			var column = cm.columns[i];
			if (column.hidden || Ext.isEmpty(column.header) || Ext.isEmpty(column.dataIndex)) {
				continue;
			}
			headers.push(column.header);
			datafields.push(column.dataIndex);
		}
		base_params["headers"] = headers.join(",");
		base_params["datafields"] = datafields.join(",");
		base_params["headers"] = base_params["headers"]+","+params["headers"];
		base_params["datafields"] = base_params["datafields"]+","+params["datafields"];
	}
	$openPostWindow(url, blank, base_params);
	var task = new Ext.util.DelayedTask(function() {
		if (document.readyState == "complete") {
			Ext.MessageBox.hide();
		} else {
			task.delay(1000);
		}
	});
	task.delay(1000);
};
function $exportGridData(grid, url, title, blank) {
	blank = Ext.isEmpty(blank) ? "_self" : blank;
	Ext.MessageBox.show({
		msg : "请稍等，正在提交操作中...",
		progressText : "请求中...",
		width : 300,
		wait : true,
		icon : "ext-load-wait",
		waitConfig : {
			interval : 500
		}
	});
	var count = grid.getStore().getCount();
	if(count==0) {
		$toast("无数据，无法导出!");
		return;
	}
	var headers = [];
	var datafields =[];
	var dataList = [];
	var params = {};
	var cm = grid.getColumnModel();
	for (var i = 0; i < cm.config.length; i++) {
		var column = cm.config[i];
		if (column.hidden || Ext.isEmpty(column.header) || Ext.isEmpty(column.dataIndex)) {
			continue;
		}
		headers.push(column.header);
		datafields.push(column.dataIndex);
	}
	for(var i = 0; i <count; i++) {
		var datas = [i+1];
		var data = grid.getStore().getAt(i).data;
		for(var j=0; j<datafields.length; j++) {
			datas.push(data[datafields[j]]);
		}
		dataList.push(datas);
	}
	params["headers"] = headers.join(",");
	params["dataList"] = Ext.util.JSON.encode(dataList);
	params["exportName"] = title;
	params["sheetName"] = title;
	$openPostWindow(url, blank, params);
	var task = new Ext.util.DelayedTask(function() {
		if (document.readyState == "complete") {
			Ext.MessageBox.hide();
		} else {
			task.delay(1000);
		}
	});
	task.delay(1000);
}
function $reportFormRequest(form, success, failure, baseParams) {
	Ext.MessageBox.show({
		msg : "请稍等，正在提交操作中...",
		progressText : "请求中...",
		width : 300,
		wait : true,
		icon : "ext-load-wait",
		waitConfig : {
			interval : 500
		}
	});
	Ext.Ajax.request({
		url : __ctxPath + "/report/report.jsp",
		form : form.id,
		timeout : 600000,
		params : baseParams,
		success : function(e, c) {
			Ext.MessageBox.hide();
			if (success) {
				success.call(this, e, c);
			}
		}.createDelegate(this),
		failure : function(q, r) {
			Ext.MessageBox.hide();
			Ext.MessageBox.alert("操作信息", "报表加载失败!");
		}
	});
}
function $request(a) {
	a.async = a.async ? false : true;
	Ext.MessageBox.show({
		msg : "请稍等，正在提交操作中...",
		progressText : "请求中...",
		width : 300,
		wait : true,
		icon : "ext-load-wait",
		waitConfig : {
			interval : 500
		}
	});
	Ext.Ajax.request({
		url : a.url,
		params : a.params,
		async :  a.async,
		method : a.method == null ? "POST" : a.method,
		success : function(b, c) {
			Ext.MessageBox.hide();
			if (b.responseText.indexOf("success:false") != -1 || b.responseText.indexOf("\"success\":false") != -1) {
				if (a.failure != null) {
					a.failure.call(this, b, c);
				} else {
					msg = "系统异常,请求数据失败!";
					var d = Ext.util.JSON.decode(b.responseText);
					if (d.msg) {
						msg = d.msg;
					}
					Ext.MessageBox.show({
						title : "操作信息",
						msg : msg,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			} else {
				if (a.success != null) {
					a.success.call(this, b, c);
				}
			}
		}.createDelegate(this),
		failure : function(b, c) {
			Ext.MessageBox.hide();
			if (a.failure != null) {
				a.failure.call(this, b, c);
			} else {
				msg = "系统异常,请求数据失败!";
				var d = Ext.util.JSON.decode(b.responseText);
				if (d.result && d.result.msg) {
					msg = d.result.msg;
				}
				Ext.MessageBox.show({
					title : "操作信息",
					msg : msg,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		}.createDelegate(this)
	});
}
function $formsubmit(form, success, failure, url) {
	if (form.isValid()) {
		form.submit({
			submitEmptyText:false,
			target: "附件详细信息",
			method : "POST",
			waitMsg : "正在提交数据...",
			url : url ? url : form.url,
			success : function(b, c) {
				if (c.response.responseText.indexOf("success:false") != -1 || c.response.responseText.indexOf("\"success\":false") != -1) {
					if (failure != null) {
						failure.call(this, b, c);
					} else {
						var d = Ext.util.JSON.decode(c.response.responseText);
						msg = "系统异常,请求数据失败!";
						if (d.msg) {
							msg = d.msg;
						}
						Ext.MessageBox.show({
							title : "操作信息",
							msg : msg,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
					}
				} else {
					if (success != null) {
						success.call(this, b, c);
					} else {
						$toast("信息操作成功！");
					}
				}
			}.createDelegate(this),
			failure : function(b, c) {
				if (failure != null) {
					failure.call(this, b, c);
				} else {
					var d = Ext.util.JSON.decode(c.response.responseText);
					msg = "系统异常,请求数据失败!";
					if (d.msg) {
						msg = d.msg;
					}
					Ext.MessageBox.show({
						title : "操作信息",
						msg : msg,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			}.createDelegate(this)
		});
	}
}
function $ajaxCall(url, params, callback) {
	Ext.Ajax.request({
		url : url,
		params : params,
		method : 'post',
		success : function(response) {
			if (callback) {
				var result = Ext.util.JSON.decode(response.responseText);
				var cbfn = callback.createCallback(result);
				cbfn();
			}
		},
		failure : function() {
			$toast("方法调用失败!");
		}
	});
};
function $ajaxSyncCall(url, params) {
	var resp = null;
	Ext.Ajax.request({
		url : url,
		method : "post",
		async : false,
		params : params,
		success : function(result, request) {
			if (result.responseText) {
				resp = Ext.util.JSON.decode(result.responseText);
			}
		},
		failure : function(result, request) {
			$toast("系统异常", "请求数据失败!");
		}
	});
	return resp;
};
function $getRequest(url) {
	var a = Ext.lib.Ajax.getConnectionObject().conn;
	a.open("GET", url, false);
	a.send(null);
};
function $baseConfirmAction(ops) {
	$baseRowAction(ops.msg, ops.url, ops.params, ops.success);
};
function $baseRowAction(msg, url, params, callback) {
	Ext.Msg.confirm("信息确认", msg, function(c) {
		if (c == "yes") {
			Ext.Ajax.request({
				url : url,
				params : params,
				method : "POST",
				success : function(d, e) {
					if (d.responseText.indexOf("success:false") != -1 || d.responseText.indexOf("\"success\":false") != -1) {
						msg = "系统异常,请求数据失败!";
						var resp = Ext.util.JSON.decode(d.responseText);
						if (resp.msg) {
							msg = resp.msg;
						}
						Ext.MessageBox.show({
							title : "操作信息",
							msg : msg,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
					} else {
						if (typeof (callback) == "function") {
							callback.call(this);
						}
					}
				}.createDelegate(this),
				failure : function(d, e) {
					$toast("操作出错，请联系管理员！");
				}
			});
		}
	});
};
function $baseGridAction(g, msg1, id, msg2, url, msg3, param, validate, callback) {
	var a = g.getSelectionModel().getSelections();
	if (a.length == 0) {
		$toast(msg1);
		return;
	}
	var e = Array();
	for (var c = 0; c < a.length; c++) {
		if (typeof (validate) == "function") {
			if (validate.call(this, a[c].data)) {
				e.push(a[c].data[id]);
			}
		} else if (!Ext.isEmpty(a[c].data[id])) {
			e.push(a[c].data[id]);
		}
	}
	if (e.length <= 0) {
		if (typeof (callback) == "function") {
			callback.call(this);
		} else {
			$toast(msg1 + "所选数据不符合条件,请重新选择！");
		}
		return;
	}
	var store = g.getStore();
	var params = {
		ids : e
	};
	Ext.applyIf(params, param || {});
	Ext.Msg.confirm("信息确认", msg2, function(c) {
		if (c == "yes") {
			Ext.Ajax.request({
				url : url,
				params : params,
				method : "POST",
				success : function(d, e) {
					if (d.responseText.indexOf("success:false") != -1 || d.responseText.indexOf("\"success\":false") != -1) {
						msg = "系统异常,请求数据失败!";
                        var icon = Ext.MessageBox.ERROR;
						var resp = Ext.util.JSON.decode(d.responseText);
						if (resp.msg) {
							msg = resp.msg;
						}
						if(resp.warning){
							msg = resp.warning;
                            icon = Ext.MessageBox.WARNING;
						}
						Ext.MessageBox.show({
							title : "操作信息",
							msg : msg,
							buttons : Ext.MessageBox.OK,
							icon : icon
						});
					} else {
						$toast(msg3);
						if (typeof (callback) == "function") {
							callback.call(this);
						} else {
							store.reload();
						}
					}
				}.createDelegate(this),
				failure : function(d, e) {
					$toast("操作出错，请联系管理员！");
				}
			});
		}
	});
};
function $deepCleanEmptyProperty(obj) {
	for ( var k in obj) {
		if (typeof (obj[k]) == "object") {
			$deepCleanEmptyProperty(obj[k]);
		}
		if (Ext.isEmpty(obj[k])) {
			delete obj[k];
		}
	}
};
function $gridstore2json(grid) {
	if (!grid) {
		return null;
	}
	var array = [];
	for (var i = 0; i < grid.getStore().getCount(); i++) {
		var r = Ext.clone(grid.getStore().getAt(i).data);
		$deepCleanEmptyProperty(r);
		array.push(r);
	}
	return Ext.util.JSON.encode(array);
};
function $gridselected2json(grid) {
	if (!grid) {
		return null;
	}
	var a = grid.getSelectionModel().getSelections();
	if (a.length == 0) {
		return null;
	}
	var array = [];
	for (var i = 0; i < a.length; i++) {
		var r = Ext.clone(a[i].data);
		$deepCleanEmptyProperty(r);
		array.push(r);
	}
	return Ext.util.JSON.encode(array);
};
String.prototype.trim = function() {
	return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));
};
Ext.override(Ext.layout.ContainerLayout, {
	setContainer : function(a) {
		this.container = a;
	}
});
Ext.override(Ext.BoxComponent, {
	setSize : function(b, d) {
		if (typeof b == "object") {
			d = b.height, b = b.width;
		}
		if (Ext.isDefined(b) && Ext.isDefined(this.minWidth) && (b < this.minWidth)) {
			b = this.minWidth;
		}
		if (Ext.isDefined(d) && Ext.isDefined(this.minHeight) && (d < this.minHeight)) {
			d = this.minHeight;
		}
		if (Ext.isDefined(b) && Ext.isDefined(this.maxWidth) && (b > this.maxWidth)) {
			b = this.maxWidth;
		}
		if (Ext.isDefined(d) && Ext.isDefined(this.maxHeight) && (d > this.maxHeight)) {
			d = this.maxHeight;
		}
		if (!this.boxReady) {
			this.width = b, this.height = d;
			return this;
		}
		if (this.cacheSizes !== false && this.lastSize && this.lastSize.width == b && this.lastSize.height == d) {
			return this;
		}
		this.lastSize = {
			width : b,
			height : d
		};
		var c = this.adjustSize(b, d), f = c.width, a = c.height, e;
		if (f !== undefined || a !== undefined) {
			e = this.getResizeEl();
			if (!this.deferHeight && f !== undefined && a !== undefined) {
				e.setSize(f, a);
			} else {
				if (!this.deferHeight && a !== undefined) {
					e.setHeight(a);
				} else {
					if (f !== undefined) {
						e.setWidth(f);
					}
				}
			}
			this.onResize(f, a, b, d);
		}
		return this;
	},
	onResize : function(d, b, a, c) {
		this.fireEvent("resize", this, d, b, a, c);
	}
});
Ext.override(Ext.Container, {
	onResize : function(d, b, a, c) {
		Ext.Container.superclass.onResize.apply(this, arguments);
		if ((this.rendered && this.layout && this.layout.monitorResize) && !this.suspendLayoutResize) {
			this.layout.onResize();
		}
	},
	canLayout : function() {
		var a = this.getVisibilityEl();
		return a && !a.isStyle("display", "none");
	},
	doLayout : function(f, e) {
		var j = this.rendered, h = e || this.forceLayout, d, b, a, g;
		if (!this.canLayout() || this.collapsed) {
			this.deferLayout = this.deferLayout || !f;
			if (!h) {
				return;
			}
			f = f && !this.deferLayout;
		} else {
			delete this.deferLayout;
		}
		d = (f !== true && this.items) ? this.items.items : [];
		for (b = 0, a = d.length; b < a; b++) {
			if ((g = d[b]).layout) {
				g.suspendLayoutResize = true;
			}
		}
		if (j && this.layout) {
			this.layout.layout();
		}
		for (b = 0; b < a; b++) {
			if ((g = d[b]).doLayout) {
				g.doLayout(false, h);
			}
		}
		if (j) {
			this.onLayout(f, h);
		}
		this.hasLayout = true;
		delete this.forceLayout;
		for (b = 0; b < a; b++) {
			if ((g = d[b]).layout) {
				delete g.suspendLayoutResize;
			}
		}
	}
});
Ext.override(Ext.Panel, {
	onResize : Ext.Panel.prototype.onResize.createSequence(Ext.Container.prototype.onResize)
});
Ext.override(Ext.Viewport, {
	fireResize : function(a, b) {
		this.onResize(a, b, a, b);
	}
});
Ext.override(Ext.form.RadioGroup, {
	getValue : function() {
		var v = null;
		if (this.rendered) {
			this.items.each(function(item) {
				if (!item.getValue())
					return true;
				v = item.getRawValue();
				return false;
			});
		} else {
			for ( var k in this.items) {
				if (this.items[k].checked) {
					v = this.items[k].inputValue;
					break;
				}
			}
		}
		return v;
	},
	setValue : function(v) {
		if (this.rendered) {
			this.items.each(function(item) {
				item.setValue(item.getRawValue() == v);
			});
		} else {
			for ( var k in this.items) {
				this.items[k].checked = this.items[k].inputValue == v;
			}
		}
	}
});

Ext.override(Ext.form.Field, {
	initComponent : Ext.form.Field.prototype.initComponent.createInterceptor(function() {
		if (this.allowBlank === false && this.fieldLabel) {
			this.fieldLabel += '<font color=red>*</font>';
		}
	})
});
Ext.override(Ext.form.TextField, {
	unitText : '',
	onRender : function(ct, position) {
		Ext.form.TextField.superclass.onRender.call(this, ct, position);
		// 如果单位字符串已定义 则在后方增加单位对象
		if (this.unitText != '') {
			this.unitEl = ct.createChild({
				tag : 'div',
				html : this.unitText
			});
			this.unitEl.addClass('x-form-unit');
			// 增加单位名称的同时 按单位名称大小减少文本框的长度 初步考虑了中英文混排 未考虑为负的情况
			// this.width = this.width - (this.unitText.replace(/[^\x00-\xff]/g, "xx").length * 6 + 2);
			// 同时修改错误提示图标的位置
			this.alignErrorIcon = function() {
				this.errorIcon.alignTo(this.unitEl, 'tl-tr', [ 2, 0 ]);
			};
		}
		if (this.readOnly) {
			this.style = this.style + ';color:#666666;';
			this.editable = false;
		}
		if (this.tooltip) {
			new Ext.ToolTip({
				target : this.id,
				trackMouse : false,
				draggable : true,
				maxWidth : 200,
				minWidth : 100,
				title : '信息提示',
				html : this.tooltip
			});
		}
	}
});
Ext.override(Ext.grid.GridPanel, {
	addHeight : function(height) {
		var h = this.getHeight() + height;
		return this.setSize(undefined, h);
	},
	subtractHeight : function(height) {
		var h = this.getHeight() - height;
		return this.setSize(undefined, h);
	},
	addRecordHeight : function(recordsize) {
		var h = this.getHeight() + recordHeight * recordsize;
		return this.setSize(undefined, h);
	},
	subtractRecordHeight : function(recordsize) {
		var h = this.getHeight() - recordHeight * recordsize;
		return this.setSize(undefined, h);
	}
});
Ext.override(Ext.form.BasicForm, {
	getFieldValues : function(dirtyOnly) {
		var o = {}, n, key, val;
		this.items.each(function(f) {
			if (!f.disabled && (dirtyOnly !== true || f.isDirty())) {
				n = f.getName();
				key = o[n];
				val = Ext.isEmpty(f.value) ? f.getValue() : f.value;
				if (Ext.isDefined(key)) {
					if (Ext.isArray(key)) {
						o[n].push(val);
					} else {
						o[n] = [ key, val ];
					}
				} /*else if(f.getXType() == 'checkboxgroup') {
					f.items.each(function(c) {
						if(c.checked) {
							n = c.getName();
							key = o[n];
							val = Ext.isEmpty(c.inputValue) ? c.getValue() : c.inputValue;
							if (Ext.isArray(key)) {
								o[n].push(val);
							} else {
								o[n] = [ val ];
							}
						}
					});
				}else if(f.getXType() == 'relationCompositeField') {
					f.items.each(function(c) {
							n = c.getName();
							key = o[n];
							val = Ext.isEmpty(c.inputValue) ? c.getValue() : c.inputValue;
							if (Ext.isArray(key)) {
								o[n].push(val);
							} else {
								o[n] = [ val ];
							}
					});
				}else if(f.getXType() == 'treecombo') {
					f.items.each(function(c) {
						n = c.getName();
						key = o[n];
						val = Ext.isEmpty(c.inputValue) ? c.getValue() : c.inputValue;
						if (Ext.isArray(key)) {
							o[n].push(val);
						} else {
							o[n] = [ val ];
						}
				});
				}*/else {
					o[n] = val;
				}
			}
		});
		return o;
	}
});
