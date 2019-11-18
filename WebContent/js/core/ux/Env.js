Ext.ns("Env");
Ext.ns("Env.math");
Ext.ns("Env.date");
Ext.ns("Env.form");
Ext.ns("Env.util");
Ext.ns("Env.grid");
Ext.ns("Env.button");
/**
 * <code>
 * 设置要保留的小数位数,四舍五入（这里的方法是先乘以10的倍数,然后去掉小数,最后再除以10的倍数）
 * dight要格式化的数字,how要保留的小数位数
 * </code>
 */
Env.math.forDight = function(dight, how) {
	return Math.round(dight * Math.pow(10, how)) / Math.pow(10, how);
};
Env.math.forHundredthDight = function(dight) {
	return Env.math.forDight(dight, 2);
};
/** 获得当前时间 */
Env.date.getCurrentTime = function() {
	return new Date();
};
Env.date.getCurrentDate = function() {
	var currentTime = Env.date.getCurrentTime();
	return Date.parseDate(currentTime.format("Y-m-d"), "Y-m-d");
};
Env.date.monthDiff = function(startdate, stopdate) {
	if (typeof (startdate) != 'object' || typeof (stopdate) != 'object') {
		return 0;
	}
	if (startdate > stopdate) {// 自已判断输入值合法性
		return 0;
	}
	var y = stopdate.getYear() - startdate.getYear();
	var m = stopdate.getMonth() - startdate.getMonth();
	if (y == 0 && m <= 0) {
		return 0;
	}
	if (m >= 0) {
		return 12 * y + m;
	}
	if (m < 0) {
		return (12 + m) + (y - 1) * 12
	}
}
/** 获得本周起止时间 */
Env.date.getCurrentWeek = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 返回date是一周中的某一天
	var week = currentDate.getDay();
	// 返回date是一个月中的某一天
	var month = currentDate.getDate();

	// 一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24;
	// 减去的天数
	var minusDay = week != 0 ? week - 1 : 6;
	// alert(minusDay);
	// 本周 周一
	var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
	// 本周 周日
	var sunday = new Date(monday.getTime() + (6 * millisecond));
	// 添加本周时间
	startStop.push(monday);// 本周起始时间
	// 添加本周最后一天时间
	startStop.push(sunday);// 本周终止时间
	// 返回
	return startStop;
};
/** 获取月份起止时间 */
Env.date.getMonthStartStop = function(date) {
	// 起止日期数组
	var startStop = new Array();
	// 获得月份0-11
	var month = date.getMonth();
	// 获得年份4位年
	var year = date.getFullYear();
	// 求出月份第一天
	var firstDay = new Date(year, month, 1);

	// 当为12月的时候年份需要加1
	// 月份需要更新为0 也就是下一年的第一个月
	if (month == 11) {
		year++;
		month = 0;// 就为
	} else {
		// 否则只是月份增加,以便求的下一月的第一天
		month++;
	}
	// 一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24;
	// 下月的第一天
	var nextMonthDayOne = new Date(year, month, 1);
	// 求出上月的最后一天
	var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

	// 添加至数组中返回
	startStop.push(firstDay);
	startStop.push(lastDay);
	// 返回
	return startStop;
}
/** 获得本月的起止时间 */
Env.date.getCurrentMonth = function() {
	var currentDate = Env.date.getCurrentTime();
	return Env.date.getMonthStartStop(currentDate);
};
/**
 * 得到本季度开始的月份
 * @param month 需要计算的月份
 */
Env.date.getQuarterSeasonStartMonth = function(month) {
	var quarterMonthStart = 0;
	var spring = 0; // 春
	var summer = 3; // 夏
	var fall = 6; // 秋
	var winter = 9;// 冬
	// 月份从0-11
	if (month < 3) {
		return spring;
	}
	if (month < 6) {
		return summer;
	}
	if (month < 9) {
		return fall;
	}
	return winter;
};

/**
 * 获得该月的天数
 * @param year年份
 * @param month月份
 */
Env.date.getMonthDays = function(year, month) {
	// 本月第一天 1-31
	var relativeDate = new Date(year, month, 1);
	// 获得当前月份0-11
	var relativeMonth = relativeDate.getMonth();
	// 获得当前年份4位年
	var relativeYear = relativeDate.getFullYear();
	// 当为12月的时候年份需要加1
	// 月份需要更新为0 也就是下一年的第一个月
	if (relativeMonth == 11) {
		relativeYear++;
		relativeMonth = 0;
	} else {
		// 否则只是月份增加,以便求的下一月的第一天
		relativeMonth++;
	}
	// 一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24;
	// 下月的第一天
	var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
	// 返回得到上月的最后一天,也就是本月总天数
	return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
};
/**
 * 获得本季度的起止日期
 */
Env.date.getCurrentSeason = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 获得当前月份0-11
	var currentMonth = currentDate.getMonth();
	// 获得当前年份4位年
	var currentYear = currentDate.getFullYear();
	// 获得本季度开始月份
	var quarterSeasonStartMonth = Env.date.getQuarterSeasonStartMonth(currentMonth);
	// 获得本季度结束月份
	var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

	// 获得本季度开始的日期
	var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
	// 获得本季度结束的日期
	var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, Env.date.getMonthDays(currentYear, quarterSeasonEndMonth));
	// 加入数组返回
	startStop.push(quarterSeasonStartDate);
	startStop.push(quarterSeasonEndDate);
	// 返回
	return startStop;
};
/** 得到本年的起止日期 */
Env.date.getCurrentYear = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 获得当前年份4位年
	var currentYear = currentDate.getFullYear();
	// 本年第一天
	var currentYearFirstDate = new Date(currentYear, 0, 1);
	// 本年最后一天
	var currentYearLastDate = new Date(currentYear, 11, 31);
	// 添加至数组
	startStop.push(currentYearFirstDate);
	startStop.push(currentYearLastDate);
	// 返回
	return startStop;
};
/**
 * 返回上一个月的第一天Date类型
 * @param year 年
 * @param month 月
 */
Env.date.getPriorMonthFirstDay = function(year, month) {
	// 年份为0代表,是本年的第一月,所以不能减
	if (month == 0) {
		month = 11;// 月份为上年的最后月份
		year--;// 年份减1
		return new Date(year, month, 1);
	}
	// 否则,只减去月份
	month--;
	return new Date(year, month, 1);
	;
};
/** 获得上一月的起止日期 */
Env.date.getPreviousMonth = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 获得当前月份0-11
	var currentMonth = currentDate.getMonth();
	// 获得当前年份4位年
	var currentYear = currentDate.getFullYear();
	// 获得上一个月的第一天
	var priorMonthFirstDay = Env.date.getPriorMonthFirstDay(currentYear, currentMonth);
	// 获得上一月的最后一天
	var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), Env.date.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
	// 添加至数组
	startStop.push(priorMonthFirstDay);
	startStop.push(priorMonthLastDay);
	// 返回
	return startStop;
};
/** 获得上一周的起止日期 */
Env.date.getPreviousWeek = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 返回date是一周中的某一天
	var week = currentDate.getDay();
	// 返回date是一个月中的某一天
	var month = currentDate.getDate();
	// 一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24;
	// 减去的天数
	var minusDay = week != 0 ? week - 1 : 6;
	// 获得当前周的第一天
	var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
	// 上周最后一天即本周开始的前一天
	var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
	// 上周的第一天
	var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

	// 添加至数组
	startStop.push(priorWeekFirstDay);
	startStop.push(priorWeekLastDay);

	return startStop;
};
/**
 * 得到上季度的起始日期 year 这个年应该是运算后得到的当前本季度的年份 month 这个应该是运算后得到的当前季度的开始月份
 */
Env.date.getPriorSeasonFirstDay = function(year, month) {
	var quarterMonthStart = 0;
	var spring = 0; // 春
	var summer = 3; // 夏
	var fall = 6; // 秋
	var winter = 9;// 冬
	// 月份从0-11
	switch (month) {// 季度的其实月份
		case spring:
			// 如果是第一季度则应该到去年的冬季
			year--;
			month = winter;
			break;
		case summer:
			month = spring;
			break;
		case fall:
			month = summer;
			break;
		case winter:
			month = fall;
			break;
	}
	return new Date(year, month, 1);
};
/** 得到上季度的起止日期 */
Env.date.getPreviousSeason = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 获得当前月份0-11
	var currentMonth = currentDate.getMonth();
	// 获得当前年份4位年
	var currentYear = currentDate.getFullYear();
	// 上季度的第一天
	var priorSeasonFirstDay = Env.date.getPriorSeasonFirstDay(currentYear, currentMonth);
	// 上季度的最后一天
	var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, Env.date.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
	// 添加至数组
	startStop.push(priorSeasonFirstDay);
	startStop.push(priorSeasonLastDay);
	return startStop;
};
/** 得到去年的起止日期 */
Env.date.getPreviousYear = function() {
	// 起止日期数组
	var startStop = new Array();
	// 获取当前时间
	var currentDate = Env.date.getCurrentTime();
	// 获得当前年份4位年
	var currentYear = currentDate.getFullYear();
	currentYear--;
	var priorYearFirstDay = new Date(currentYear, 0, 1);
	var priorYearLastDay = new Date(currentYear, 11, 1);
	// 添加至数组
	startStop.push(priorYearFirstDay);
	startStop.push(priorYearLastDay);
	return startStop;
};
/** 覆盖源对象至目标对象定义的属性(源属性必须不为空) */
Env.apply = function(target, source) {
	for ( var property in target) {
		if (source[property] != null && source[property] != undefined) {
			target[property] = source[property];
		}
	}
	return target;
};
/** 复制源对象至目标对象定义的空属性 */
Env.applyIf = function(target, source) {
	for ( var property in target) {
		if (Ext.isEmpty(target[property])) {
			target[property] = source[property];
		}
	}
	return target;
};
/** 是否为空，如果允许allowBlank=true，则当v=''时返回true */
Env.isEmpty = function(v, allowBlank) {
	return v === null || v === undefined || ((this.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
};
/** 是否为数组类型 */
Env.isArray = function(v) {
	return Object.prototype.toString.call(v) === '[object Array]';
};
/** 是否为日期类型 */
Env.isDate = function(v) {
	return Object.prototype.toString.call(v) === '[object Date]';
};
/** 是否为Object类型 */
Env.isObject = function(v) {
	return !!v && Object.prototype.toString.call(v) === '[object Object]';
};
/** 判断是否是函数 */
Env.isFunction = function(v) {
	return (v != null && typeof v == "function");
};
/** 判断是否为数字 */
Env.isNumber = function(v) {
	return typeof v === 'number' && isFinite(v);
};
/** 判断字符串类型 */
Env.isString = function(v) {
	return typeof v === 'string';
};
/** 判断布尔类型 */
Env.isBoolean = function(v) {
	return typeof v === 'boolean';
};
/** 判断是否为dom元素 */
Env.isElement = function(v) {
	return !!v && v.tagName;
};
/** 判断是否已定义 */
Env.isDefined = function(v) {
	return typeof v !== 'undefined';
};
/** 请求处理 */
Env.request = function(options) {
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
	var url = options.url;
	var params = options.params;
	var success = options.success;
	var failure = options.failure;
	var async = options.async === false ? false : true;
	Ext.Ajax.request({
		url : url,
		params : params,
		method : "POST",
		async : async, // false:同步请求数据;true:异步请求数据
		success : function(r, o) { // response, options
			Ext.MessageBox.hide();
			var response = r.responseJSON;
			if (response == null) {
				if (r.status == "200") {
					if (typeof (success) == "function") {
						success.call(this, r, o);
					}
					return;
				}
			} else if (response.success) {
				if (typeof (success) == "function") {
					success.call(this, r, o);
				}
				return;
			}
			if (typeof (failure) == "function") {
				failure.call(this, r, o);
				return;
			}
			Ext.MessageBox.show({
				title : "操作信息",
				msg : response.msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}.createDelegate(this),
		failure : function(r, o) { // response, options
			Ext.MessageBox.hide();
			if (typeof (failure) == "function") {
				failure.call(this, r, o);
				return;
			}
			if (r.responseJSON && r.responseJSON.msg) {
				Ext.MessageBox.alert("操作失败", r.responseJSON.msg);
			} else {
				Ext.MessageBox.alert("操作信息", "操作出错,请联系管理员!");
			}
		}.createDelegate(this)
	});
}
Env.request.confirm = function(options) {
	Ext.Msg.confirm("信息确认", options.confirmText, function(c) {
		if (c == "yes") {
			Env.request(options);
		}
	}.createDelegate(this));
}
Env.form.submit = function(form, success, failure) {
	if (!form.isValid()) {
		return;
	}
	form.submit({
		method : "POST",
		waitMsg : "正在提交数据...",
		url : form.url,
		success : function(form, action) {
			if (action.result.success) {
				if (success != null) {
					var response = action.response.responseJSON;
					success.call(this, response, form, action);
				} else {
					$toast("信息操作成功！");
				}
				return;
			}
			if (failure != null) {
				failure.call(this, form, action);
				return;
			}
			var msg = "系统异常,请求数据失败!";
			if (action && action.result && action.result.msg) {
				msg = action.result.msg;
			}
			Ext.MessageBox.show({
				title : "操作信息",
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}.createDelegate(this),
		failure : function(form, action) {
			if (failure != null) {
				failure.call(this, form, action);
				return;
			}
			var msg = "系统异常,请求数据失败!";
			if (action.response.responseJSON && action.response.responseJSON.msg) {
				msg = action.response.responseJSON.msg;
			} else if (action.response.status == 404) {
				msg = "请求地址不存在";
			}
			Ext.MessageBox.show({
				title : "操作信息",
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}.createDelegate(this)
	});
};
Env.form.load = function(option) {
	var form = option.form;
	var url = option.url;
	var success = option.success;
	var failure = option.failure;
	form.load({
		url : url,
		deferredRender : false,
		waitMsg : "正在提交数据...",
		success : function(form, action) {
			if (action.result.success) {
				if (success != null) {
					var data = action.response.responseJSON.result[0];
					success.call(this, data, form, action);
				} else {
					$toast("信息操作成功！");
				}
				return;
			}
			if (failure != null) {
				failure.call(this, form, action);
				return;
			}
			var msg = "系统异常,请求数据失败!";
			if (action && action.result && action.result.msg) {
				msg = action.result.msg;
			}
			Ext.MessageBox.show({
				title : "操作信息",
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}.createDelegate(this),
		failure : function(form, action) {
			if (failure != null) {
				failure.call(this, form, action);
				return;
			}
			var msg = "系统异常,请求数据失败!";
			if (action.response.responseJSON && action.response.responseJSON.msg) {
				msg = action.response.responseJSON.msg;
			} else if (action.response.status == 404) {
				msg = "请求地址不存在";
			}
			Ext.MessageBox.show({
				title : "操作信息",
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}.createDelegate(this)
	});
};
Env.util.clean = function(obj) {
	for ( var p in obj) {
		if (typeof (obj[p]) == "object") {
			Env.util.clean(obj[p]);
		}
		if (Ext.isEmpty(obj[p])) {
			delete obj[p];
		}
	}
};
Env.button.handler = function(listViewPanle, buttonId, params) {
	var center = Ext.getCmp("centerTabPanel");
	var tabItem = center.getItem(listViewPanle);
	if (tabItem == null) {
		var panel = eval("new " + listViewPanle + "(params)");
		tabItem = center.add(panel);
	}
	var button = Ext.getCmp(buttonId);
	button.handler.call(this);
};
Env.grid.json = function(grid, selected) {
	if (!grid) {
		return null;
	}
	var data = [];
	if (selected) {
		var selections = grid.getSelectionModel().getSelections();
		for (var i = 0; i < selections.length; i++) {
			var d = Ext.clone(selections[i].data);
			Env.util.clean(d);
			data.push(d);
		}
	} else {
		for (var i = 0; i < grid.getStore().getCount(); i++) {
			var d = Ext.clone(grid.getStore().getAt(i).data);
			Env.util.clean(d);
			data.push(d);
		}
	}
	return Ext.util.JSON.encode(data);
};
Env.grid.validate = function(gridArr, title) {
	for (var index = 0, glen = gridArr.length; index < glen; index++) {
		var grid = gridArr[index];
		if (grid.allowBlank === false) {
			if (grid.getStore().getCount() <= 0) {
				Ext.MessageBox.alert("错误提示", "【" + grid.title + "】-表格数据不允许为空");
				return false;
			}
		}
		var cm = grid.getColumnModel();
		for (var i = 0, ilen = cm.config.length; i < ilen; i++) {
			var column = cm.config[i];
			if (column.hidden || Ext.isEmpty(column.header) || Ext.isEmpty(column.dataIndex)) {
				continue;
			}
			if (Ext.isEmpty(column.editor)) {
				continue;
			}
			if (column.editor.allowBlank !== false) {
				continue;
			}
			for (var j = 0, jlen = grid.getStore().getCount(); j < jlen; j++) {
				var a = grid.getStore().getAt(j).get(column.dataIndex);
				if (Ext.isEmpty(a)) {
					Ext.MessageBox.alert("错误提示", "【" + (title ? title : grid.title) + "】-第【" + (j + 1) + "】条单元格数据【" + column.header + "】不允许为空");
					return false;
				}
			}
		}
	}
	return true;
};
/** 列表导出 */
Env.grid.exporter = function(form, url, grid, params, blank) {
	var params = Ext.isEmpty(params) ? {} : params;
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
	Ext.apply(params, form.getValues() || {});
	if (grid && Ext.isEmpty(params.headers) && Ext.isEmpty(params.datafields)) {
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
		params["headers"] = headers.join(",");
		params["datafields"] = datafields.join(",");
	}
	if (!Ext.fly("downForm")) {
		var downForm = document.createElement("form");
		downForm.id = "downForm";
		downForm.name = "downForm";
		downForm.className = "x-hidden";
		downForm.action = url;
		downForm.method = "post";
		downForm.target = blank; // 打开新的下载页面
		for ( var p in params) {
			var hideInput = document.createElement("input");
			hideInput.type = "hidden"; // 隐藏域
			hideInput.name = p; // form表单参数
			hideInput.value = params[p]; // form表单值
			downForm.appendChild(hideInput);
		}
		document.body.appendChild(downForm);
	}
	Ext.fly("downForm").dom.submit();
	if (Ext.fly("downForm")) {
		document.body.removeChild(downForm);
	}
	var task = new Ext.util.DelayedTask(function() {
		if (document.readyState == "complete") {
			Ext.MessageBox.hide();
		} else {
			task.delay(1000);
		}
	});
	task.delay(1000);
};
Env.lodop = function(options, oOBJECT, oEMBED) {
	var config = {
		paperSize : "A4", // 纸张大小
		direction : 1, // 纵向
		pagePercent : "100%" // 打印页面百分比
	};
	Env.apply(config, options || {});
	var LODOP = getLodop(oOBJECT, oEMBED);
	return LODOP;
	/*try {
		var isIE = (navigator.userAgent.indexOf("MSIE") >= 0) || (navigator.userAgent.indexOf("Trident") >= 0);
		var is64IE = isIE && (navigator.userAgent.indexOf("x64") >= 0);
		if (oOBJECT != undefined || oEMBED != undefined) {
			if (isIE) {
				LODOP = oOBJECT;
			} else {
				LODOP = oEMBED;
			}
		} else if (CreatedOKLodop8856 == null) {
			LODOP = document.createElement("object");
			LODOP.setAttribute("width", 0);
			LODOP.setAttribute("height", 0);
			LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
			if (isIE) {
				LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
			} else {
				LODOP.setAttribute("type", "application/x-print-lodop");
			}
			document.documentElement.appendChild(LODOP);
			CreatedOKLodop8856 = LODOP;
		} else {
			LODOP = CreatedOKLodop8856;
		}
		if ((LODOP != null) && (typeof (LODOP.VERSION) != "undefined")) {
			LODOP.PRINT_INIT("打印控件");
			LODOP.SET_PRINT_STYLE("FontSize", 12);
			LODOP.SET_PRINT_STYLEA(0, "Horient", 2);

			LODOP.SET_PRINT_PAGESIZE(config.direction, 0, 0, config.paperSize);
			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", config.pagePercent);
			LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
			LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
			LODOP.SET_SHOW_MODE("SHOW_SCALEBAR", 1);
			LODOP.SET_SHOW_MODE("PREVIEW_NO_MINIMIZE", 1);
			return LODOP;
		}
		Ext.Msg.confirm("信息确认", "确认下载打印控件,下载安装成功后需要重新打开浏览器", function(c) {
			if (c == "yes") {
				var url = __ctxBasePath + "/lodop/install_lodop32.zip";
				if (is64IE) {
					url = __ctxBasePath + "/lodop/install_lodop64.zip";
				}
				if (!Ext.fly("downForm")) {
					var downForm = document.createElement("form");
					downForm.id = "downForm";
					downForm.name = "downForm";
					downForm.className = "x-hidden";
					downForm.action = url;
					downForm.method = "get";
					downForm.target = "_blank"; // 打开新的下载页面
					document.body.appendChild(downForm);
				}
				Ext.fly("downForm").dom.submit();
				if (Ext.fly("downForm")) {
					document.body.removeChild(downForm);
				}
			}
		}.createDelegate(this));
	} catch (err) {
		Ext.MessageBox.alert("打印失败", "打印控件加载失败");
	}
	return null;*/
};
Env.lodop.print = function(options) {
	var LODOP = Env.lodop(options);
	if (LODOP == null) {
		return;
	}
	var content = options.content;
	if (Ext.isEmpty(options.url)) {
		LODOP.ADD_PRINT_HTM("5mm", "15mm", "RightMargin:10mm", "BottomMargin:5mm", content);
		LODOP.PREVIEW();
		return;
	}
	Env.request({
		url : options.url,
		params : options.params,
		success : function(r, o) {
			var content = r.responseText;
			LODOP.ADD_PRINT_HTM("5mm", "15mm", "RightMargin:10mm", "BottomMargin:5mm", content);
			LODOP.PREVIEW();
			return;
		}
	});
};