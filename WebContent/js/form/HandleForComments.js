var HandleForComments = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.opFieldId = Ext.id();
	var a = [ {
		xtype : "hidden",
		name : this.warningIdFiled,
		value : "1"
	}, {
		xtype : "hidden",
		name : this.handleIdFiled,
		value : this.acceptId || this.approveId
	}, {
		xtype : "hidden",
		name : this.relateIdFiled,
		value : this.relateId
	}, {
		xtype : "hidden",
		name : this.relateModuleFiled,
		value : this.relateModule
	}, {
		xtype : "hidden",
		name : this.typeFiled,
		value : this.opinionType
	}, {
		layout : "column",
		items : [ {
			layout : "form",
			columnWidth : 0.5,
			defaultType : "textfield",
			items : [ {
				allowBlank : false,
				fieldLabel : "办理人",
				readOnly : true,
				name : this.usernameFiled,
				value : this.acceptUsername || this.approveUsername || this.opinionUsername || curUserInfo.fullname
			}, {
				allowBlank : false,
				fieldLabel : "办理部门",
				readOnly : true,
				name : this.depFiled,
				value : this.acceptDep || this.approveDep || this.opinionUsername  || curUserInfo.depName
			} ]
		}, {
			layout : "form",
			columnWidth : 0.5,
			defaultType : "textfield",
			items : [ {
				xtype : "datefield",
				width : 130,
				format : "Y-m-d H:i:s",
				fieldLabel : "办理日期",
				readOnly : true,
				name : this.timeFiled,
				value : this.acceptTime || this.approveTime|| this.opinionTime || new Date()
			}, {
				id : this.opFieldId,
				fieldLabel : "处理方式",
				readOnly : this.showOnly,
				hidden : this.opinion,
				xtype : "radiogroup",
				items : [ {
					boxLabel : "通过",
					name : this.opinionFiled,
					inputValue : 1,
					checked : true
				}, {
					boxLabel : "驳回",
					name : this.opinionFiled,
					inputValue : 0
				} ]
			} ]
		} ]
	}, {
		xtype : "textarea",
		readOnly : this.showOnly,
		anchor : "95%",
		maxLength : 128,
		maxLengthText : MoreThanMaxLength,
		allowBlank : true,
		fieldLabel : "办理意见",
		name : this.remarkFiled,
		value : this.acceptRemark || this.approveRemark || this.opinionRemark
	}, {
		xtype : "hidden",
		name : this.extendMessageFiled
	} ];
	HandleForComments.superclass.constructor.call(this, {
		frame : true,
		bodyStyle : "margin : 5px 1px 1px 1px",
		labelAlign : "right",
		labelSeparator : "：",
		labelWidth : 70,
		width : 450,
		url : this.url,
		items : [ a ],
		listeners : {
			afterrender : this.loadForm
		}
	});
};
Ext.extend(HandleForComments, Ext.FormPanel, {
	loadForm : function() {
		this.findById(this.opFieldId).setValue(this.acceptOpinion || this.approveOpinion || 1);
	}
});

var AcceptHandleForComments = Ext.extend(HandleForComments, {
	constructor : function(a, b) {
		this.warningIdFiled = "formAccept.warning";
		this.handleIdFiled = "formAccept.acceptId";
		this.relateIdFiled = "formAccept.relateId";
		this.relateModuleFiled = "formAccept.relateModule";
		this.usernameFiled = "formAccept.acceptUsername";
		this.depFiled = "formAccept.acceptDep";
		this.timeFiled = "formAccept.acceptTime";
		this.opinionFiled = "formAccept.acceptOpinion";
		this.remarkFiled = "formAccept.acceptRemark";
		this.extendMessageFiled = "formAccept.extendMessage";
		this.url = __ctxPath + "/form/saveFormAccept.do";
		this.showOnly = b.acceptshow;
		AcceptHandleForComments.superclass.constructor.call(this, a, b);
	}
});
var ApproveHandleForComments = Ext.extend(HandleForComments, {
	constructor : function(a, b) {
		this.warningIdFiled = "formApprove.warning";
		this.handleIdFiled = "formApprove.approveId";
		this.relateIdFiled = "formApprove.relateId";
		this.relateModuleFiled = "formApprove.relateModule";
		this.usernameFiled = "formApprove.approveUsername";
		this.depFiled = "formApprove.approveDep";
		this.timeFiled = "formApprove.approveTime";
		this.opinionFiled = "formApprove.approveOpinion";
		this.remarkFiled = "formApprove.approveRemark";
		this.extendMessageFiled = "formApprove.extendMessage";
		this.url = __ctxPath + "/form/saveFormApprove.do";
		this.showOnly = b.approveshow;
		ApproveHandleForComments.superclass.constructor.call(this, a, b);
	}
});
var ReviewHandleForComments = Ext.extend(HandleForComments, {
	constructor : function(a, b) {
		this.warningIdFiled = "formReview.warning";
		this.handleIdFiled = "formReview.reviewId";
		this.relateIdFiled = "formReview.relateId";
		this.relateModuleFiled = "formReview.relateModule";
		this.usernameFiled = "formReview.reviewUsername";
		this.depFiled = "formReview.reviewDep";
		this.timeFiled = "formReview.reviewTime";
		this.opinionFiled = "formReview.reviewOpinion";
		this.remarkFiled = "formReview.reviewRemark";
		this.extendMessageFiled = "formReview.extendMessage";
		this.url = __ctxPath + "/form/saveFormReview.do";
		this.showOnly = b.reviewshow;
		ReviewHandleForComments.superclass.constructor.call(this, a, b);
	}
});

var OpinionHandleForComments = Ext.extend(HandleForComments, {
	constructor : function(a, b) {
		this.warningIdFiled = "formOpinion.warning";
		this.handleIdFiled = "formOpinion.opinionId";
		this.relateIdFiled = "formOpinion.relateId";
		this.relateModuleFiled = "formOpinion.relateModule";
		this.usernameFiled = "formOpinion.opinionUsername";
		this.depFiled = "formOpinion.opinionDep";
		this.timeFiled = "formOpinion.opinionTime";
		this.opinionFiled = "formOpinion.opinionOpinion";
		this.typeFiled = "formOpinion.opinionType"
		this.remarkFiled = "formOpinion.opinionRemark";
		this.extendMessageFiled = "formOpinion.extendMessage";
		this.url = __ctxPath + "/form/saveFormOpinion.do";
		this.showOnly = !b.opinion;
		this.opinion = b.opinionShow;
		OpinionHandleForComments.superclass.constructor.call(this, a, b);
	}
});

var HandleForCommentsWin = function(a, b) {
	this.formPanel = null;
	var height = 0;
	var btn = false;
	if (b.accept) {
		btn = true;
		this.formPanel = new AcceptHandleForComments(a, b);
	} else if (b.approve) {
		btn = true;
		this.formPanel = new ApproveHandleForComments(a, b);
	}else if (b.review) {
		btn = true;
		this.formPanel = new ReviewHandleForComments(a, b);
	} else if (a.length >= 0 && b.acceptshow) {
		this.formPanel = [];
		for ( var i = 0; i < a.length; i++) {
			var acceptForm = new AcceptHandleForComments(a[i], b);
			this.formPanel.push(acceptForm);
		}
		height = 150 * (a.length - 1) - 30;
	} else if (a.length >= 0 && b.approveshow) {
		this.formPanel = [];
		for ( var i = 0; i < a.length; i++) {
			height += 150;
			var approveForm = new ApproveHandleForComments(a[i], b);
			this.formPanel.push(approveForm);
		}
		height = 150 * (a.length - 1) - 30;
	}else if (a.length >= 0 && b.reviewshow) {
		this.formPanel = [];
		for ( var i = 0; i < a.length; i++) {
			height += 150;
			var reviewForm = new ReviewHandleForComments(a[i], b);
			this.formPanel.push(reviewForm);
		}
		height = 150 * (a.length - 1) - 30;
	}else if (b.opinion) {
		btn = true;
		this.formPanel = new OpinionHandleForComments(a, b);
	}else if (b.opinionShow){
		this.formPanel = [];
		for ( var i = 0; i < a.length; i++) {
			var opinionForm = new OpinionHandleForComments(a[i], b);
			this.formPanel.push(opinionForm);
		}
		height = 150 * (a.length - 1) - 30;
	}
	height = height > 600 ? 600 : height;
	var btns = null;
	if (btn) {
		btns = [ {
			text : "保存",
			iconCls : "btn-save",
			scope : this,
			handler : this.saveHandle.createDelegate(this)
		}, {
			text : "关闭",
			iconCls : "btn-close",
			scope : this,
			handler : function() {
				this.close();
			}
		} ];
	}
	if (b.callback) {
		this.callback = b.callback;
	}
	if (b.presubmit) {
		this.presubmit = b.presubmit;
	}
	HandleForComments.superclass.constructor.call(this, {
		layout : "form",
		iconCls : "menu-set-department",
		width : 480,
		height : height + 210,
		items : this.formPanel,
		border : false,
		buttonAlign : "center",
		maximizable : true,
		autoScroll : true,
		modal : true,
		plain : true,
		buttons : btns,
		listeners : {
			afterrender : this.loadHandleForForm
		}
	});
};

Ext.extend(HandleForCommentsWin, Ext.Window, {
	loadHandleForForm : function() {
		if (this.formPanel == null) {
			this.modal = false;
			this.close();
			Ext.Msg.alert("提示信息", "未加载到相关信息!");
		}
	},
	getForm : function() {
		return this.formPanel;
	},
	saveHandle : function() {
		var success = function(d, e) {
			$toast("提交信息保存成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this);
		var failure = function(d, e) {
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.warning) {
				Ext.Msg.confirm("警告信息", "是否审批通过该申请?</br>" + resp.warning, function(c) {
					if (c == "yes") {
						var remarkFiled = this.formPanel.getForm().findField(this.formPanel.remarkFiled);
						remarkFiled.setValue(remarkFiled.getValue() + "\r\n" + resp.warning.replace("</br>", "\r\n"));
						this.formPanel.getForm().findField(this.formPanel.warningIdFiled).setValue("0");
					}
				}.createDelegate(this));
			} else {
				msg = "系统异常,请求数据失败!";
				if (resp.msg) {
					msg = resp.msg;
				}
				Ext.MessageBox.show({
					title : "操作信息",
					msg : msg,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		}.createDelegate(this);
		if (this.presubmit) {
			if (this.presubmit.call(this, this.formPanel)) {
				$formsubmit(this.formPanel.getForm(), success, failure);
			} else {
				Ext.MessageBox.alert("提示", "验证不通过,请检测表单数据!");
			}
		} else {
			$formsubmit(this.formPanel.getForm(), success, failure);
		}
	}
});
