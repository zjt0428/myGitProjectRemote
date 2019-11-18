var MaterialsDistributionView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {};

	this.distributeAreaType = 0;
	this.params["QUERY_FILTER"] = this.distributeAreaType;
	this.province = {};
	this.city = {};
	var actionItems = [ {
		iconCls : "btn-head-edit",
		hidden : true,
		qtip : "辖区",
		handler : this.drillingDistributeMaterials.createDelegate(this)
	}, {
		iconCls : "btn-grid-read",
		hidden : true,
		qtip : "明细",
		handler : this.showDistributeMaterials.createDelegate(this)
	} ];
	var tbarItems = [ {
		iconCls : "btn-mail_back",
		text : "返回",
		handler : this.higherLevelDistributeMaterials.createDelegate(this)
	} ];
	var datagrid_config = {
		checkboxHidden : true,
		store : {
			fields : [ "AREA_ID", "AREA_TYPE", "AREA_NAME", "LONGITUDE", "LATITUDE", "STAT_COUNTS" ]
		},
		rowAction : {
			width : 85,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 100,
			header : "地区",
			dataIndex : "AREA_NAME"
		}, {
			width : 70,
			header : "数量",
			dataIndex : "STAT_COUNTS"
		} ]
	};
	this.distributionGridPanel = new Knight.ux.SearchGridPanel(Ext.apply({
		title : "全国一览",
		region : "west",
		width : 250,
		split : true,
		collapsed : false,
		collapseMode : "mini",
		url : __ctxPath + "/archive/distributeMaterialsInfo.do",
		base_params : this.params,
		datagrid_config : datagrid_config,
		datagrid_view : {
			listeners : {
				"rowclick" : this.releaseMapPanelCenter.createDelegate(this)
			}
		}
	}, a));
	// 地图面板
	this.distributionMapPanel = new Knight.ux.BaiduMapPanel({
		title : "地理位置",
		region : "center",
		height : 700
	});
	// 刷新地图数据
	var equipmentMapDataRenderTask = new Ext.util.DelayedTask(function() {
		if (Ext.isEmpty(this.distributionMapPanel.getBMap())) {
			equipmentMapDataRenderTask.delay(10);
			return;
		}
		if (this.distributionGridPanel.getDataGridPanel().getStore().getCount() <= 0) {
			equipmentMapDataRenderTask.delay(10);
			return;
		}
		this.refreshDistributionMapPanel();
	}.createDelegate(this));
	equipmentMapDataRenderTask.delay(10);

	MaterialsDistributionView.superclass.constructor.call(this, {
		id : "MaterialsDistributionView",
		layout : "border",
		title : "周材分布总览",
		iconCls : "menu-business-equip",
		items : [ this.distributionGridPanel, this.distributionMapPanel ]
	});
};
Ext.extend(MaterialsDistributionView, Ext.Panel, {
	rendererRowActionItems : function(action, record) {
		switch (record.data.AREA_TYPE) {
			case "0":
				action[0].hidden = false;
				break;
			case "1":
				action[0].hidden = false;
				action[1].hidden = false;
				break;
			case "2":
				action[1].hidden = false;
				break;
		}
	},
	refreshDistributionGridPanel : function(longitude, latitude, zoom) {
		var distributionDataStore = this.distributionGridPanel.getDataGridPanel().getStore();
		Ext.apply(distributionDataStore.baseParams, {
			"QUERY_FILTER" : this.distributeAreaType,
			"Q_[A.PROVINCE]_S_EQ" : this.province.areaId,
			"Q_[A.CITY]_S_EQ" : this.city.areaId
		});
		distributionDataStore.load({
			callback : function(records, options, success) {
				this.refreshDistributionMapPanel(longitude, latitude, zoom);
			}.createDelegate(this)
		});
	},
	refreshDistributionMapPanel : function(longitude, latitude, zoom) {
		if (this.distributeAreaType == "0") {
			this.distributionGridPanel.getDataGridPanel().getTopToolbar().hide();
		} else {
			this.distributionGridPanel.getDataGridPanel().getTopToolbar().show();
		}
		this.distributionGridPanel.doLayout();
		this.distributionMapPanel.clearOverlays();
		var distributionDataStore = this.distributionGridPanel.getDataGridPanel().getStore();
		for (var i = 0; i < distributionDataStore.getCount(); i++) {
			if (Ext.isEmpty(distributionDataStore.getAt(i).data.LONGITUDE) || Ext.isEmpty(distributionDataStore.getAt(i).data.LATITUDE)) {
				continue;
			}
			var data = distributionDataStore.getAt(i).data;
			this.distributionMapPanel.addOverlay({
				longitude : data.LONGITUDE,
				latitude : data.LATITUDE,
				content : data.AREA_NAME + "安装设备数量: " + data.STAT_COUNTS,
				width : 250,
				height : 45,
				enableMessage : true
			});
		}
		this.distributionMapPanel.setCenter({
			longitude : longitude ? longitude : 106.3,
			latitude : latitude ? latitude : 30.6
		})
		this.distributionMapPanel.getBMap().setZoom(zoom ? zoom : 5);
	},
	releaseMapPanelCenter : function(grid, rowindex, e) {
		var record = grid.getStore().getAt(rowindex).data;
		var overlays = this.distributionMapPanel.getBMap().getOverlays();
		for (var i = 0; i < overlays.length; i++) {
			var longitude = Number(overlays[i].getPosition().lng).toFixed(6);
			var latitude = Number(overlays[i].getPosition().lat).toFixed(6);
			if (Number(longitude) == Number(record.LONGITUDE) && Number(latitude) == Number(record.LATITUDE)) {
				overlays[i].setAnimation(BMAP_ANIMATION_BOUNCE);
			} else {
				overlays[i].setAnimation(null);
			}
		}
	},
	// 下级地区
	drillingDistributeMaterials : function(record) {
		var zoom = 5;
		this.distributeAreaType = this.distributeAreaType + 1;
		if (this.distributeAreaType == "1") {
			zoom = 8;
			this.province = {
				areaId : record.AREA_ID,
				areaName : record.AREA_NAME,
				statCounts : record.STAT_COUNTS,
				longitude : record.LONGITUDE,
				latitude : record.LATITUDE
			};
			this.city = {};
		} else {
			zoom = 11;
			this.city = {
				areaId : record.AREA_ID,
				areaName : record.AREA_NAME,
				statCounts : record.STAT_COUNTS
			};
		}
		this.distributionGridPanel.setTitle(record.AREA_NAME + "(" + record.STAT_COUNTS + ")");
		this.refreshDistributionGridPanel(record.LONGITUDE, record.LATITUDE, zoom);
	},
	// 上一级
	higherLevelDistributeMaterials : function() {
		this.distributeAreaType = this.distributeAreaType - 1;
		var zoom = 5;
		if (this.distributeAreaType == "0") {
			this.province = {};
			this.city = {};
			this.distributionGridPanel.setTitle("全国一览");
			this.refreshDistributionGridPanel();
		} else if (this.distributeAreaType == "1") {
			zoom = 8;
			this.city = {};
			this.distributionGridPanel.setTitle(this.province.areaName + "(" + this.province.statCounts + ")");
			this.refreshDistributionGridPanel(this.province.longitude, this.province.latitude, zoom);
		}
	},
	showDistributeMaterials : function(record) {
		var params = {};
		if ("0" == record.AREA_TYPE) {
			params["Q_[equipDiary.province]_S_EQ"] = record.AREA_ID;
		} else if ("1" == record.AREA_TYPE) {
			params["Q_[equipDiary.city]_S_EQ"] = record.AREA_ID;
		} else {
			params["Q_[equipDiary.county]_S_EQ"] = record.AREA_ID;
		}
		new EquipmentPreview({
			params : params
		}).show();
	}
});