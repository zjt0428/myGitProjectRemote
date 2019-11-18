var IndexPagePortlet = Ext.extend(Ext.ux.Portlet, {
	constructor : function(config) {
		Ext.apply(this, config || {});
		if (this.params) {
			this.url = this.url + "?" + Ext.urlEncode(this.params);
		}
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp(this.id).getUpdater().update(this.url);
			}.createDelegate(this)
		} ];
		if (!this.closedisable) {
			this.tools.push({
				id : "close",
				handler : function(c, b, a) {
					Ext.Msg.confirm("提示信息", "确认删除此模块吧？", function(d) {
						if (d == "yes") {
							a.ownerCt.remove(a, true);
						}
					});
				}
			});
		}
		IndexPagePortlet.superclass.constructor.call(this, {
			id : this.id,
			title : this.title,
			autoScroll : true,
			iconCls : this.iconCls ? this.iconCls : "menu-idx-flowWait",
			tools : this.tools,
			autoLoad : {
				url : this.url
			}
		});
	}
});