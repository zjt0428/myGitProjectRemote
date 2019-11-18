/**
 * Created by YaoFly on 2016/11/16.
 */
var MaterialsPlanSelector = function(a) {
    Ext.apply(this, a || {});
    this.params = {};
    Ext.apply(this.params, a.params || {});
    // ====================================this.searchPanel===============================================//
    var generalItems = [ {
        lable : "项目名称",
        name : "Q_projectName_S_LK"
    } ];
    var datagrid_config = {
        single : this.single,
        store : {
            fields : MaterialsPlanListViewField
        },
        columns : [ {
            header : "单据号",
            dataIndex : "documentSerial"
        }, {
            header : "工程类型",
            dataIndex : "projectTypeName"
        }, {
            header : "计划类型",
            dataIndex : "planTypeName"
        }, {
            header : "项目名称 ",
            dataIndex : "projectName"
        }, {
            hidden:true,
            header : "工地地址 ",
            dataIndex : "address"
        }, {
            header : "申报时间 ",
            dataIndex : "reportingTime"
        } ],
    };
    // ==================================this.favoritesPanel=============================================//
    var target = null;
    if (this.collectEnable) {
        target = {
            title : "已选周材",
            single : this.single,
            collect : true,
            fields : MaterialsPlanListViewField,
            columns : [ {
                header : "单据号",
                dataIndex : "arrangeSerial"
            }, {
                header : "项目名称 ",
                dataIndex : "projectName"
            }, {
                header : "工地地址 ",
                dataIndex : "address"
            } ]
        };
    }
    MaterialsPlanSelector.superclass.constructor.call(this, {
        configView : {
            title : "周材计划选择"
        },
        source : {
            url : __ctxPath + "/dispatch/listMaterialsPlan.do",
            base_params : this.params,
            search_config : {
                preLableHidden : true,
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

Ext.extend(MaterialsPlanSelector, Knight.ux.RelationSelector, {});