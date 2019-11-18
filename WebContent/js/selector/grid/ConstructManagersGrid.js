/**
 * Created by YaoFly on 2016/11/15.
 */
var ConstructManagersGrid = function(a, b) {
    Ext.apply(this, a || {});
    Ext.apply(this, b || {});
    this.currentDate = new Date();
    var columns = [ {
        header : "从业工种",
        readOnly : true,
        dataIndex : "kindWorkName"
    }, {
        header : "企业人员",
        readOnly : true,
        dataIndex : "practiName"
    }, {
        header : "身份证号",
        readOnly : true,
        dataIndex : "idCard"
    }, {
        header : "证书号",
        readOnly : true,
        dataIndex : "certNum"
    }, {
        header : "联系方式",
        readOnly : true,
        dataIndex : "mobile"
    } ];
    ConstructManagersGrid.superclass.constructor.call(this, Ext.apply({
        saveable : this.saveable,
        selectable : this.selectable,
        fields : ConstructPractiListViewField,
        title : this.title,
        option : "管理人员",
        tbarItems : this.tbarItems,
        height : this.height,
        columns : columns,
    }, this.grid_config || {}));
};
Ext.extend(ConstructManagersGrid, Knight.ux.SubModuleBaseGrid, {
    addSubModuleDate : function(data) {
        for ( var i = 0; i < this.getStore().getCount(); i++) {
            if (this.getStore().getAt(i).data.certId == data.certId) {
                return;
            }
        }
        var RecordType = this.getStore().recordType;
        var record = new RecordType();
        Ext.apply(record.data, {
            constructId : this.constructId,
            certId : data.certId,
            practiCert : data,
            kindWorkName : data.practiKindworkName,
            practiName : data.practitioner.practiName,
            idCard : data.practitioner.idCard,
            certNum : data.certNum,
            mobile : data.practitioner.mobile,
            type : this.type
        });
        this.stopEditing();
        this.getStore().add(record);
        this.startEditing(0, 0);
        if (this.recordcallback) {
            this.recordcallback.call(this, record);
        }
    },
    addSubModule : function() {
        new PractiCertSelector({
            callback : function(d) {
                for ( var i = 0; i < d.length; i++) {
                    var data = d[i].data;
                    this.addSubModuleDate(data);
                }
            }.createDelegate(this)
        }).show();
    }
});