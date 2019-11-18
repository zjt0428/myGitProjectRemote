var LiftVerifySelfForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	// =====================================================================//
	LiftVerifySelfForm.superclass.constructor.call(this, {
		demand_config : {
			grid_config : {
				title : "施工升降机安装自检标准",
			},
			select_params : {
				"Q_I.LEVEL_N_EQ" : 1,
				"Q_[I.VITEM_TYPE]_S_EQ" : "SIS"
			},
			itemNameLable : "项目",
			demandDesLable : "检查内容",
			standardResultLable : "检查结果",
			remarkLable : "检查人"
		}
	});
};
Ext.extend(LiftVerifySelfForm, VerifySelfForm, {});