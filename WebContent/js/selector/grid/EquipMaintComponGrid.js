/**
 * Created by YaoFly on 2016/11/8.
 */
var EquipMaintComponGrid = function(a, b) {
    Ext.apply(this, a || {});
    Ext.apply(this, b || {});
    var columns = [
        {
        header : "配件名称",
        dataIndex : "component",
        renderer : function(value, metadata, record) {
            return record.data.component.componGenericName;
        }.createDelegate(this)
    }, {
        header : "设备型号",
        dataIndex : "component",
        renderer : function(value, metadata, record) {
            return record.data.component.componSpecificName;
        }.createDelegate(this)
    }, {
        header : "配件规格",
        dataIndex : "component",
        renderer : function(value, metadata, record) {
            return record.data.component.dimensions;
        }.createDelegate(this)
    }, {
        header : "库存数量",
        dataIndex : "component",
        editor : new Ext.form.NumberField({
            allowBlank : false,
            maxLength : 64
        }),
        renderer : function(value, metadata, record) {
            return record.data.component.consumeCounts;
        }.createDelegate(this)
    }, {
        header : "调用数量",
        dataIndex : "counts",
        editor : new Ext.form.TextField({
            allowBlank : false,
            maxLength : 64
        })
    }, {
        header : "单价",
        dataIndex : "unitPrice",
        editor : new Ext.form.NumberField({
            allowBlank : false,
            maxLength : 64,
            decimalPrecision : 2
        }),
        renderer : function(value, metadata, record) {
            if (!this.saveable) {
                return value;
            }
            return Ext.util.Format.number(record.data.unitPrice, "0.00");
        }.createDelegate(this)
    }, {
        header : "合计",
        dataIndex : "summary",
        editor : new Ext.form.NumberField({
            allowBlank : false,
            maxLength : 64,
            decimalPrecision : 2
        }),
        renderer : function(value, metadata, record) {
            if (!this.saveable) {
                return value;
            }
            var unitPrice =Number(record.data.unitPrice);
            var counts =Number(record.data.counts);
            var sum = unitPrice * counts;
            record.data.summary =sum;
            return sum;
           // return Ext.util.Format.number(record.data.summary, "0.00");
        }.createDelegate(this)
    }, {
        header : "备注",
        dataIndex : "remark",
        editor : new Ext.form.TextField({
            allowBlank : false,
            maxLength : 64
        })
    } ];
    if (this.saveable) {
        if (!this.tbarItems) {
            this.tbarItems = [];
        }
        this.tbarItems.push({
            iconCls : "btn-head-import",
            text : "新增",
            handler : this.importComponResource.createDelegate(this)
        });
    }
    EquipMaintComponGrid.superclass.constructor.call(this, Ext.apply({
        saveable : this.saveable,
        selectable : this.selectable,
        addForbidden : true,
        fields : EquipMaintComponListViewField,
        title : "保养耗材",
        option : "配件",
        tbarItems : this.tbarItems,
        height : this.height,
        columns : columns
    }, this.grid_config || {}));
};
Ext.extend(EquipMaintComponGrid, Knight.ux.SubModuleBaseGrid, {
    addSubModuleDate : function(data) {
        for ( var i = 0; i < this.getStore().getCount(); i++) {
            var component = this.getStore().getAt(i).data.component;
            if (component && component.componId == data.componId) {
                return;
            }
        }
        var RecordType = this.getStore().recordType;
        var recordType = new RecordType();
        Ext.apply(recordType.data, {
            counts : data.counts,
            unitPrice : data.unitprice,
            remark : null,
            component : data
        });
        this.stopEditing();
        this.getStore().add(recordType);
        this.startEditing(0, 0);
    },
    importComponResource : function() {
        new ComponentSelector({
            params : {
            },
            collectEnable : true,
            callback : function(d) {
                for ( var i = 0; i < d.length; i++) {
                    this.addSubModuleDate(d[i].data);
                }
            }.createDelegate(this)
        }).show();
    }
});
