var PublicPanelViewItems = [ "MessagePanelView", "AnnounceUserPanelView", "MemoPanelView" ];
var AppHomeView = function() {
	var items = [];
	if (isGranted("_SystemDateExport")) {
		items.push({
			text : "下载数据",
			iconCls : "btn-download",
			handler : function() {
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
				$openPostWindow(__ctxPath + "/system/exportSystemDataGlobalType.do", "_self", {});
				var task = new Ext.util.DelayedTask(function() {
					if (document.readyState == "complete") {
						Ext.MessageBox.hide();
					} else {
						task.delay(1000);
					}
				});
				task.delay(1000);
			}.createDelegate(this)
		});
	}
	if (isGranted("_SystemDateInport")) {
		items.push({
			xtype : "tbsplit",
			iconCls : "btn-upload",
			text : "上传数据",
			tooltip : {
				text : "终端数据上报",
				title : "数据上传"
			},
			menu : {
				items : [ {
					text : "设备信息",
					handler : this.uploadTerminalFile.createDelegate(this, [ RelationModule.equipment.relateModule ])
				}, {
					text : "零配件信息",
					handler : this.uploadTerminalFile.createDelegate(this, [ RelationModule.component.relateModule ])
				}, {
					text : "调度信息",
					handler : this.uploadTerminalFile.createDelegate(this, [ RelationModule.dispatch.relateModule ])
				}, {
					text : "巡检信息",
					handler : this.uploadTerminalFile.createDelegate(this, [ RelationModule.equipInspect.relateModule ])
				} ]
			}
		});
	}
	items.push("->", {
		text : "添加模块",
		iconCls : "btn-add",
		handler : function() {
			new IndexPortletSelector(this).show();
		}.createDelegate(this)
	}, {
		text : "保存",
		iconCls : "btn-save",
		handler : this.savePortalLayout.createDelegate(this)
	});
	this.toolbar = new Ext.Toolbar({
		height : 30,
		items : items
	});
	var confs = curUserInfo.portalConfig;
	if (confs == null || confs == undefined || confs.length < 1) {
		confs = new Array();
		for (var i = 0; i < PublicPanelViewItems.length; i++) {
			confs.push({
				panelId : PublicPanelViewItems[i],
				column : 0,
				row : 0
			});
		}
	}
//	var column0 = [];
//	var column1 = [];
//	for (var i = 0; i < confs.length; i++) {
//		if (PublicPanelViewItems.indexOf(confs[i].panelId) != -1 || isGranted("_" + confs[i].panelId)) {
//			if (confs[i].column == 0) {
//				column0.push(this.initHomePortletItem(confs[i].panelId));
//			} else {
//				column1.push(this.initHomePortletItem(confs[i].panelId));
//			}
//		}
//	}
	this.portalPanel = {
		id : "AppHomeViewPortlet",
		xtype : "panel",
		region : "center",
		layout:"fit",
		items : [ {
			split:true,
	         border:true,
	         html:'<iframe id="mediasArea" name="ifocus" src="/emms/home/index.html" style="width:100%; height:100%;" frameborder="0"></iframe>'
		} ]
	};
//	 this.homeHtml=Ext.create("Ext.panel.Panel",{
//         split:true,
//         border:true,
//         html:'<iframe id="mediasArea" name="ifocus" src="/emms/home/index.html" style="width:100%; height:100%;" frameborder="0"></iframe>'
//     });
	AppHomeView.superclass.constructor.call(this, {
		id : "AppHomeView",
		iconCls : "menu-idx-home",
		title : "首       页",
		closable : false,
		layout : "fit",
		defaults : {
			padding : "0 5 0 0"
		},
		tbar : this.toolbar,
		items : this.portalPanel
	});
};
Ext.extend(AppHomeView, Ext.Panel, {
	uploadTerminalFile : function(relateModule) {
		var uploadDialog = $createUploadDialog({
			file_cat : "OTHERS",
			callback : function(g) {
				if (g.length < 1) {
					Ext.MessageBox.alert("操作信息", "还未上传文件!");
					return;
				}
				var url = null;
				switch (relateModule) {
					case RelationModule.equipment.relateModule:
						url = __ctxPath + "/archive/uploadEquipment.do";
						break;
					case RelationModule.component.relateModule:
						url = __ctxPath + "/archive/uploadComponent.do";
						break;
					case RelationModule.dispatch.relateModule:
						url = __ctxPath + "/dispatch/uploadDispatch.do";
						break;
					case RelationModule.equipInspect.relateModule:
						url = __ctxPath + "/equip/uploadEquipInspect.do";
						break;
				}
				$request({
					url : url,
					params : {
						fileId : g[0].fileId
					},
					success : function(g, h) {
						Ext.MessageBox.alert("操作信息", "数据上报成功!");
					}.createDelegate(this)
				});

			}.createDelegate(this)
		});
		uploadDialog.show(this);
	},
	initHomePortletItem : function(id) {
		for ( var panelId in PortletItemCfg.defaults) {
			if (id == panelId) {
				return new IndexPagePortlet(PortletItemCfg.defaults[panelId]);
			}
		}
		for ( var panelId in PortletItemCfg.lefts) {
			if (id == panelId) {
				return new IndexPagePortlet(PortletItemCfg.lefts[panelId]);
			}
		}
		for ( var panelId in PortletItemCfg.rights) {
			if (id == panelId) {
				return new IndexPagePortlet(PortletItemCfg.rights[panelId]);
			}
		}
		return null;
	},
	savePortalLayout : function() {
		curUserInfo.portalConfig = [];
		var items = Ext.getCmp("AppHomeViewPortlet").items;
		for (var i = 0; i < items.length; i++) {
			var v = items.itemAt(i);
			for (var j = 0; j < v.items.length; j++) {
				var m = v.items.itemAt(j);
				var portalItem = new PortalItem(m.id, i, j);
				curUserInfo.portalConfig.push(portalItem);
			}
		}
		$request({
			url : __ctxPath + "/system/saveIndexDisplay.do",
			params : {
				items : Ext.encode(curUserInfo.portalConfig)
			}
		});
	}
});
var PortalItem = function(a, b, c) {
	this.panelId = a;
	this.column = b;
	this.row = c;
};
var PortletItemCfg = null;

function initPortletItemParams(params, param, values) {
	if (values.length == 0) {
		return;
	}
	if (Ext.isEmpty(params[param])) {
		params[param] = values.join(",");
		return;
	}
	params[param] = params[param] + "," + values.join(",");
};
function initPortletCfg() {
	PortletItemCfg = {
		defaults : {
			MessagePanelView : {
				title : "个人消息",
				iconCls : "menu-my-message",
				closedisable : true,
				url : __ctxPath + "/info/displayInMessage.do",
				params : {
					"Q_delFlag_SN_EQ" : 0,
					"Q_userId_L_EQ" : curUserInfo.userId
				}
			},
			AnnounceUserPanelView : {
				title : "公告信息",
				iconCls : "menu-info",
				url : __ctxPath + "/form/displayAnnounceUser.do",
				params : {
					"Q_delFlag_S_EQ" : "1",
					"Q_userId_L_EQ" : curUserInfo.userId,
					"Q_readFlag_S_EQ" : "0"
				}
			},
			MemoPanelView : {
				title : "工作备忘",
				iconCls : "menu-info",
				url : __ctxPath + "/form/displayMemo.do"
			}
		},
		lefts : {
			ContractLeasePanelView : {
				title : "合同信息",
				iconCls : "menu-business-contract",
				url : __ctxPath + "/dispatch/displayContractLease.do",
				params : {
					"Q_delFlag_S_EQ" : "1"
				}
			},
			ComponentParachutePanelView : {
				title : "防坠器预警",
				iconCls : "menu-business-component",
				url : __ctxPath + "/archive/displayParachuteComponent.do",
				params : {
					"Q_parachuteFlag_S_EQ" : "1",
					"Q_parachuteCheckDate_S_LE" : KnightUtil.date.getCurrentTime().format('Y-m-d')
				}
			}
		},
		rights : {
			CorpCertPanelView : {
				title : "企业资质",
				iconCls : "menu-business-corpcert",
				url : __ctxPath + "/archive/displayCorpCert.do",
				params : {
					"Q_delFlag_S_EQ" : "1"
				}
			},
			PractiCertPanelView : {
				title : "人员资质",
				iconCls : "menu-business-practicert",
				url : __ctxPath + "/archive/displayPractiCert.do",
				params : {
					"Q_delFlag_S_EQ" : "1"
				}
			},
			SettleContractPanelView : {
				title : "结算汇总",
				iconCls : "menu-business-settle",
				url : __ctxPath + "/dispatch/displaySettleContract.do"
			},
			InsureEquipPanelView : {
				title : "设备保险",
				iconCls : "menu-business-insure",
				url : __ctxPath + "/equip/displayInsureEquip.do",
				params : {
					"Q_delFlag_S_EQ" : "1"
				}
			},
			PractiCertContractPanelView : {
				title : "合同签约资质",
				iconCls : "menu-business-practicert",
				url : __ctxPath + "/archive/displayContractPractiCert.do",
				params : {
					"Q_delFlag_S_EQ" : "1"
				}
			}
		}
	};
	var values = [];
	// 租赁合同板块
	if (isGranted("_ContractLeaseAccept")) {
		values.push("1");
	}
	if (isGranted("_ContractLeaseApprove")) {
		values.push("2");
	}
	if (isGranted("_ContractLeaseNullifyAccept")) {
		values.push("7");
	}
	if (isGranted("_ContractLeaseNullifyApprove")) {
		values.push("8");
	}
	initPortletItemParams(PortletItemCfg.lefts.ContractLeasePanelView.params, "QVO_applyforState_S_EQ", values);
	if (Ext.isEmpty(PortletItemCfg.lefts.ContractLeasePanelView.params["QVO_applyforState_S_EQ"])) {
		PortletItemCfg.lefts.ContractLeasePanelView.params["Q_userId_L_EQ"] = curUserInfo.userId;
	}
	// 初始化Portlet面板ID
	for ( var panelId in PortletItemCfg.defaults) {
		PortletItemCfg.defaults[panelId].id = panelId;
	}
	for ( var panelId in PortletItemCfg.lefts) {
		PortletItemCfg.lefts[panelId].id = panelId;
	}
	for ( var panelId in PortletItemCfg.rights) {
		PortletItemCfg.rights[panelId].id = panelId;
	}
}
var PortletPanelView = {
	memoElementOnclick : function(memoId) {
		new MemoForm({
			memoId : memoId
		}).show();
	},
	announceUserElementOnclick : function(announceId, publishTime, announceUserId) {
		$request({
			url : __ctxPath + "/form/loadAnnounce.do?announceId=" + announceId,
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data[0];
				data.readFlag = "0";
				data.publishTime = publishTime;
				data.announceUserId = announceUserId;
				new AnnounceUserForm(data).show();
			}.createDelegate(this)
		});
	},
	contractLeaseElementOnclick : function(contractId, fundType) {
		var form = new ContractLeaseForm({
			contractId : contractId
		});
		if ("0" == fundType) {
			form.getForm().findField("contractLease.deduct").setValue("0").setReadOnly(true);
			form.getForm().findField("contractLease.deductDesc").setReadOnly(true);
		}
		form.show();
	},
	contractLeaseListView : function() {
		App.clickTopTab('ContractLeaseListView', {
			params : PortletItemCfg.lefts.ContractLeasePanelView.params
		});
	},
	settleContractElementOnclick : function(projectName, paEntName) {
		var settlePanel = App.clickTopTab("SettleContractListView", {
			delayed_load : true,
			projectName : projectName,
			paEntName : paEntName
		});
		settlePanel.getSearchPanel().items.items[12].handler.call(this);
	},
	settleContractListView : function() {
		App.clickTopTab("SettleContractListView", {});
	},
	insureEquipElementOnclick : function(insureId) {
		new InsureEquipForm({
			insureId : insureId
		}).show();
	},
	insureEquipListView : function() {
		App.clickTopTab("InsureEquipListView", {});
	},
	practiCertElementOnclick : function(certId) {
		new PractiCertForm({
			certId : certId
		}).show();
	},
	practiCertListView : function() {
		App.clickTopTab("PractiCertListView", {});
	},
	corpCertElementOnclick : function(certId) {
		new CorpCertForm({
			certId : certId
		}).show();
	},
	corpCertListView : function() {
		App.clickTopTab("CorpCertListView", {});
	},
	componentParachuteElementOnclick : function(componId) {
		new ComponentForm({
			componId : componId
		}, {
			saveable : true
		}).show();
	}
};
