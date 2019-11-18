/**
 * Created by YaoFly on 2016/11/16.
 */
var ContractArrangeSelector = function(a) {
    Ext.apply(this, a || {});
    this.params = {};
    Ext.apply(this.params, a.params || {});
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
    // ====================================this.searchPanel===============================================//
    var generalItems = [ {
        lable : "项目名称",
        name : "Q_projectName_S_LK"
    } ];
    var datagrid_config = {
        single : this.single,
        store : {
            fields : ContractArrangeListViewField
        },
        columns : [ {
            header : "业务申请编号",
            dataIndex : "arrangeSerial"
        }, {
            header : "申请日期",
            dataIndex : "providedDate"
        }, {
            header : "承租单位",
            dataIndex : "customerName"
        }, {
            header : "所属公司",
            dataIndex : "corpName"
        }, {
            header : "项目名称 ",
            dataIndex : "projectName"
        }, {
            header : "预计进场时间 ",
            dataIndex : "startDate"
        } ],
    };
    // ==================================this.favoritesPanel=============================================//
    var target = null;
    if (this.collectEnable) {
        target = {
            title : "已选合同",
            single : this.single,
            collect : true,
            fields : ContractArrangeListViewField,
            columns : [ {
                header : "业务申请编号",
                dataIndex : "arrangeSerial"
            }, {
                header : "所属公司",
                dataIndex : "corpName"
            }, {
                header : "项目名称 ",
                dataIndex : "projectName"
            } ]
        };
    }
    ContractArrangeSelector.superclass.constructor.call(this, {
        configView : {
            title : "合同选择"
        },
        source : {
            url : __ctxPath + "/dispatch/listContractArrange.do",
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

Ext.extend(ContractArrangeSelector, Knight.ux.RelationSelector, {});