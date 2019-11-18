var DynamicCheckboxGroup = Ext.extend(Ext.form.CheckboxGroup, {
	columns : 3,
	dataUrl : '', // 数据地址
	labelFiled : 'label',
	valueFiled : 'value',
	setValue : function(val) {
		if (val.split) {
			val = val.split(',');
		}
		this.reset();
		for ( var i = 0; i < val.length; i++) {
			this.items.each(function(c) {
				if (c.inputValue == val[i].trim()) {
					c.setValue(true);
				}
			});
		}
	},
	reset : function() {
		this.items.each(function(c) {
			c.setValue(false);
		});
	},
	getValue : function() {
		var val = [];
		this.items.each(function(c) {
			if (c.getValue() == true) {
				val.push(c.inputValue);
			}
		});
		return val.join(',');
	},
	onRender : function(ct, position) {
		if (!this.items) { // 如果没有指定就从URL获取
			this.items = [];
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("get", this.url, false);
			conn.send(null);
			if (conn.status == "200") {
				var data = Ext.util.JSON.decode(conn.responseText);
				for ( var i = 0; i < data.length; i++) {
					var d = data[i];
					var chk = {
						boxLabel : d[this.labelFiled],
						name : this.name || '',
						inputValue : d[this.valueFiled]
					};
					this.items.push(chk);
				}
			}
		}
		DynamicCheckboxGroup.superclass.onRender.call(this, ct, position);
	}
});
Ext.reg('dynamiccheckboxgroup', DynamicCheckboxGroup);