var ContractLeaseDetailForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = (this.saveable ? true : false); // 保存/重置功能按钮

	if (this.saveable) {
		this.topbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			bodyStyle : "",
			items : [ {
				iconCls : "btn-save",
				text : "保存",
				handler : function() {
					Ext.Ajax.request({
						url : __ctxPath + "/dispatch/saveDetailContractLease.do",
						form : "contractLeaseDetail",
						method : "post",
						async : true,
						isUpload : true,
						success : function(b, c) {
							if (b.responseText.indexOf("success:false") != -1) {
								var msg = "系统异常,请求数据失败!";
								if (b.responseText.indexOf("msg:") != -1) {
									var resp = b.responseText.substring(b.responseText.indexOf("{"), b.responseText.indexOf("}"));
									var d = Ext.util.JSON.decode(resp);
									if (d.msg) {
										msg = d.msg;
									}
								}
								Ext.MessageBox.alert("操作信息", msg);
							} else {
								$toast("信息操作成功！");
								if (!this.submitable) {
									if (this.callback) {
										this.callback.call(this);
									}
									this.close();
									return;
								}
								Ext.Msg.confirm("信息确认", "是否立即提交该合同申请?", function(c) {
									if (c == "yes") {
										Ext.Ajax.request({
											url : __ctxPath + "/dispatch/multiSubmitContractLease.do",
											params : {
												ids : this.contractId
											},
											success : function(d, e) {
												if (b.responseText.indexOf("success:false") != -1) {
													Ext.MessageBox.alert("操作信息", "系统异常,请求数据失败!");
												} else {
													$toast("信息操作成功！");
												}
												if (this.callback) {
													this.callback.call(this);
												}
												this.close();
											}.createDelegate(this),
											failure : function(d, e) {
												$toast("操作出错，请联系管理员！");
												this.close();
											}.createDelegate(this)
										});
									} else {
										this.close();
									}
								}.createDelegate(this));
							}
						}.createDelegate(this),
						failure : function(b, c) {
							Ext.MessageBox.alert("操作信息", "系统异常,请求数据失败!");
						}.createDelegate(this)
					});
				}.createDelegate(this)
			}, {
				iconCls : "btn-reset",
				text : "重置",
				handler : function() {
					document.getElementById("contractLeaseDetail").reset();
				}
			} ]
		});
	}
	ContractLeaseDetailForm.superclass.constructor.call(this, {
		layout : "fit",
		iconCls : "menu-set-department",
		width : 930,
		height : 500,
		tbar : this.topbar,
		autoLoad : __ctxPath + "/dispatch/detailContractLease.do?formpage=detailContractLease&contractId=" + this.contractId,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		frame : true,
		autoScroll : true
	});
};
Ext.extend(ContractLeaseDetailForm, Ext.Window, {});