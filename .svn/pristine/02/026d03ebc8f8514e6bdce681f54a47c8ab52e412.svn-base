var EquipInspectSchemaEmployListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params.Q_relateModule_S_EQ = "EQUIP_EMPLOY";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	EquipInspectSchemaEmployListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInspectSchemaEmployListView",
		title : TabTitle.EQUIP_INSPECT_SCHEMA_EMPLOY_LIST,
		iconCls : "menu-business-employ",
		serialLable : "使用编号",
		params : this.params
	}, a));
};
Ext.extend(EquipInspectSchemaEmployListView, EquipInspectSchemaListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipInspectSchemaEmployAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipInspectSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSchemaEmployAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "批量",
				handler : this.addBatchEquipInspectSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSchemaEmployEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipInspectSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSchemaEmployMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "激活",
				handler : this.submitEquipInspectSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSchemaEmployMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipInspectSchema.createDelegate(this)
			});
		}
		if (isGranted("_EquipInspectSchemaMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveEquipInspectSchema.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的巡检计划！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的巡检计划吗？";
		var msg3 = "成功【" + op + "】所选的巡检计划！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	addEquipInspectSchema : function() {
		new EquipFlowSelector({
			params : {
				"Q_flowState_S_GE" : "2",
				"Q_flowState_S_LE" : "4",
				"Q_employInspectSchemaId_L_NULL" : "1",
				"Q_equipInstall.delFlag_S_EQ" : 1
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new EquipInspectSchemaForm({
					flowId : data.flowId,
					equipDiary : data.equipDiary
				}, {
					saveable : true,
					callback : function() {
                        this.activeAddEquipInspectSchema();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	addBatchEquipInspectSchema : function() {
		new EquipInspectSchemaBatchForm({
			relateEquipFlowGrid : new EquipFlowEmployGrid(),
			relateModule : RelationModule.equipEmploy.relateModule
		}, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
    activeAddEquipInspectSchema : function(){
        var store = this.dataGridPanel.getStore();
        store.reload({callback:function(){
            var inspectSchemaId = store.getAt(0).data["inspectSchemaId"];
        	Ext.Msg.confirm("信息确认", "是否确认激活，点击确认后将无法进行修改", function(c) {
                if (c == "yes") {
                    Ext.Ajax.request({
                        url : __ctxPath + "/equip/multiSubmitEquipInspectSchema.do",
                        params : { ids : inspectSchemaId},
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
                                $toast("成功【激活】所选的巡检计划！");
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
        }});
    }
});