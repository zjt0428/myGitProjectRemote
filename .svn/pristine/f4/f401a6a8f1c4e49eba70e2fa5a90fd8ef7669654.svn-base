var InstallVerifySelfListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_relateModule_S_EQ = RelationModule.equipInstall.relateModule;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	InstallVerifySelfListView.superclass.constructor.call(this, {
		id : "InstallVerifySelfListView",
		title : TabTitle.INSTALL_VERIFY_SELF_LIST,
		iconCls : "menumenu-business-contract",
		params : this.params
	});
};
Ext.extend(InstallVerifySelfListView, VerifySelfListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InstallVerifySelfAdd") && isCorpAppUser()) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增(升降机自检)",
				handler : this.addVerifySelf.createDelegate(this, [ "S" ])
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增(塔吊自检)",
				handler : this.addVerifySelf.createDelegate(this, [ "T" ])
			});
		}
		if (isGranted("_InstallVerifySelfEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editVerifySelf.createDelegate(this)
			});
		}
		if (isGranted("_InstallVerifySelfMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delVerifySelf.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_InstallVerifySelfPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printVerifySelf.createDelegate(this, [ "Install" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printVerifySelf.createDelegate(this, [ "InstallAcceptance" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printVerifySelf.createDelegate(this, [ "InstallAccept" ])
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的安装自检！";
		var msg2 = "您确认要【" + op + "】所选安装自检吗？";
		var msg3 = "成功【" + op + "】所选安装自检！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	addVerifySelf : function(verifyType) {
		new EquipFlowInstallSelector({
			params : {
				"loadProject" : true,
				"Q_[equipDiary.verifyType]_S_EQ" : verifyType
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?flowId=" + data.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						this.switchEditVerifySelf({
							equipFlow : equipFlow
						});
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	}
});