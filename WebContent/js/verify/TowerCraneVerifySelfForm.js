var TowerCraneVerifySelfForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	// =====================================================================//
	TowerCraneVerifySelfForm.superclass.constructor.call(this, {
		startRelateDateLable : "安装日期",
		heightLable : "设计安装高度",
		maxHeightLable : "验收高度(m)",
		demand_config : {
			grid_config : {
				title : "塔吊安装自检标准",
			},
			select_params : {
				"Q_I.LEVEL_N_EQ" : 1,
				"Q_[I.VITEM_TYPE]_S_EQ" : "TIS"
			},
			itemNameLable : "项目",
			demandDesLable : "检查内容",
			standardResultLable : "检查结果",
			remarkLable : "检查人"
		}
	});
};
Ext.extend(TowerCraneVerifySelfForm, VerifySelfForm, {});