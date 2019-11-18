Ext.ns("Knight.ux");
Knight.ux.TreeComboWithChild = Ext.extend(Ext.form.ComboBox, {
	constructor : function(b) {
		if(b.id==undefined) {
			b.id =  Ext.id();
		}
		var c = {
			store : new Ext.data.SimpleStore({
				fields : [],
				data : [ [] ]
			}),
			editable : (b && b.editable) ? true : false,
			mode : "local",
			emptyText : (b && b.allowBlank) ? null : "请选择",
			triggerAction : "all",
			maxHeight : 200,
			tpl : "<tpl for='.'><div style='height:200px'><div id='" + b.id + "tree'></div></div></tpl>",
			onSelect : Ext.emptyFn
		} || b;
		Ext.apply(this, c);
		Ext.apply(this, b);
		Knight.ux.TreeComboWithChild.superclass.constructor.call(this, c);
		var d = this;
		var a = new Ext.tree.TreePanel({
			id : b.id + "Tree",
			height : 200,
			autoScroll : true,
			split : true,
			loader : new Ext.tree.TreeLoader({
				url : b.url
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				'beforeexpandnode' : function(node, deep, animal) {
					d.expendOnClick = true;
				},
				'beforecollapsenode' : function(node, deep, animal) {
					d.expendOnClick = true;
				}
			}
		});
		new Ext.tree.TreeSorter(a, {
		    dir: "asc",
		    property: "sortField",
		    caseSensitive: true
		});
		d.on("collapse", function(f) {
			var e = a.getSelectionModel().getSelectedNode();
			if (e == null) {
				if (this.expendOnClick) {
					d.expand();
					this.expendOnClick = false;
				}
				return;
			} else {
				a.getSelectionModel().clearSelections();
			}
		}, this);
		a.on("click", function(f) {
			var e = Ext.getCmp(b.valId);
			var arr = [];
			var node = a.getNodeById(f.id);
			node.eachChild(function(d) {
				arr.push(d.attributes.id); 
			});
			arr.push(f.id);
			var ids = arr.join(",");
			if (f.id != null && f.id != "") {
				d.setValue(f.text);
				d.id = f.id;
				d.collapse();
				if (e != null) {
					e.setValue(ids);
				}
			}
		});
		this.on("expand", function() {
			a.render(b.id + "tree");
		});
	}
});
Ext.reg("treecombowithchild", Knight.ux.TreeComboWithChild);