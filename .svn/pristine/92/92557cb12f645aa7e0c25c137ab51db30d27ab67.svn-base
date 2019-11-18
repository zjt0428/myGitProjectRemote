var DynamicRadioGroup = Ext.extend(Ext.form.RadioGroup, {
	columns : 3,
	labelFiled : 'label',
	valueFiled : 'value',
	onRender : function(ct, position) {
		if (!this.items && this.url) { // 如果没有指定就从URL获取
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
		DynamicRadioGroup.superclass.onRender.call(this, ct, position);
	}
});
Ext.reg('dynamicradiogroup', DynamicRadioGroup);