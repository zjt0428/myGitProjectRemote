var InsureEquipSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "保险编号",
		name : "Q_insureSerial_S_LK"
	}, {
		lable : "设备编号",
		name : "Q_recordSerial_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : InsureEquipListViewField
		},
		columns : [ {
			width : 80,
			header : "保险编号",
			dataIndex : "insureSerial"
		}, {
			width : 80,
			header : "设备编号",
			dataIndex : "recordSerial"
		}, {
			width : 80,
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			width : 80,
			header : "起保日期",
			dataIndex : "startInsureDate"
		}, {
			width : 80,
			header : "终止日期",
			dataIndex : "endInsureDate"
		}, {
			width : 80,
			header : "投保单价",
			dataIndex : "coverage"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选保险信息",
			single : this.single,
			collect : true,
			fields : InsureEquipListViewField,
			columns : [ {
				width : 80,
				header : "保险编号",
				dataIndex : "insureSerial"
			}, {
				width : 80,
				header : "设备编号",
				dataIndex : "recordSerial"
			}, {
				width : 80,
				header : "投保单价",
				dataIndex : "coverage"
			} ]
		};
	}
	InsureEquipSelector.superclass.constructor.call(this, {
		configView : {
			title : "保险条目选择"
		},
		source : {
			url : __ctxPath + "/equip/listInsureEquip.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(InsureEquipSelector, Knight.ux.RelationSelector, {});