var DispatchEquipDismantleForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	DispatchEquipDismantleForm.superclass.constructor.call(this, a, b);
};
Ext.extend(DispatchEquipDismantleForm, DispatchForm, {
	initRelationPanel : function(relation) {
		if (this.saveable) {
			var practiDiaryGrid = new PractiDiaryGrid();
			practiDiaryGrid.getStore().loadData(relation.practiDiarySet);

			var componDiaryGrid = new ComponDiaryGrid();
			componDiaryGrid.getStore().loadData(relation.componDiarySet);

			this.relationPanel = new Ext.TabPanel({
				plain : true,
				activeTab : 0,
				autoHeight : true,
				anchor : "98%",
				defaults : {
					bodyStyle : "padding:0px"
				},
				items : [ practiDiaryGrid, componDiaryGrid ]
			});
		}
	},
	preSaveValidate : function() {
//		for ( var i = 0; i < this.relation.practiDiarySet.length; i++) {
//			var data = this.relation.practiDiarySet[i];
//			for ( var j = 0; j < this.dispatchPractiGrid.getStore().getCount(); j++) {
//				if (this.dispatchPractiGrid.getStore().getAt(j).data.practiId == data.practiId) {
//					Ext.Msg.alert("重复调配", "人员[" + data.practiName + "]已经在安装申请中调配!");
//					return false;
//				}
//			}
//		}
//		for ( var i = 0; i < this.relation.componDiarySet.length; i++) {
//			var data = this.relation.componDiarySet[i];
//			for ( var j = 0; j < this.dispatchComponGrid.getStore().getCount(); j++) {
//				if (this.dispatchComponGrid.getStore().getAt(j).data.component.consumeFlag == "1") {
//					continue;
//				}
//				if (this.dispatchComponGrid.getStore().getAt(j).data.componId == data.componId) {
//					Ext.Msg.alert("重复调配", "零配件[" + data.componSerial + "]已经在安装申请中调配!");
//					return false;
//				}
//			}
//		}
		return true;
	}
});