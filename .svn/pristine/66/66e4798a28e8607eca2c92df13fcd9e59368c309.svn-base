/**
 * <pre><code>
 * 	缩放控件type有四种类型:
 * 	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；
 * 	BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；
 * 	BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.BaiduMapPanel = function(config) {
	Ext.apply(this, {
		objectID : "BMap_",
		object : null,
		longitude : config.longitude ? config.longitude : 118.114619,
		latitude : config.latitude ? config.latitude : 24.52994,
		border : false,
		currentPositionPoint : null,
		currentPositionMarker : null,
		markerMenu : null
	});
	Ext.applyIf(config, {
		height : 500,
		layout : "fit"
	});
	Knight.ux.BaiduMapPanel.superclass.constructor.call(this, config);
};
Ext.extend(Knight.ux.BaiduMapPanel, Ext.Panel, {
	initComponent : function() {
		this.objectID += this.id;
		var src = String.format("http://api.map.baidu.com/api?v=2.0&ak=89dd2991fbfe942db9c7e3767faa4c30&callback=Ext.getCmp('{0}').initializeBMap", this.id);
		// 判断API是否已经加载成功还有更简单的方法，就是判断BMap对象是否存在
		var isLoaded = false;
		var arrScript = document.getElementsByName("script");
		for (var i = 0; i < arrScript.length; i++) {
			if (arrScript.src[i] == src) {
				isLoaded = true;
				break;
			}
		}
		// 保证只加载一次API脚本
		if (!isLoaded) {
			var script = document.createElement("script");
			script.src = src;
			document.body.appendChild(script);
		}
		Knight.ux.BaiduMapPanel.superclass.initComponent.call(this);
	},
	// 初始化地图
	initializeBMap : function() {
		this.doLayout();
	},
	// 获取BMap对象
	getBMap : function() {
		return this.object;
	},
	// 移动到自己所在的位置
	panToCurrentPosition : function() {
		var bmap = this.getBMap();
		var geolocation = new BMap.Geolocation();
		var me = this;
		geolocation.getCurrentPosition(function(geolocationResult) {
			if (this.getStatus() != BMAP_STATUS_SUCCESS) {
				alert("定位失败！");
				return;
			}
			var point = geolocationResult.point;
			me.currentPositionPoint = point;
			bmap.centerAndZoom(point, 11);
		}, {
			enableHighAccuracy : true,
			timeout : 5000,
			maximumAge : 0
		});
	},
	// 显示我当前位置标注
	showCurrentPositionMarker : function() {
		if (this.currentPositionMarker == null) {
			var bmap = this.getBMap();
			var marker = new BMap.Marker(this.currentPositionPoint); // 创建标注
			bmap.addOverlay(marker); // 将标注添加到地图中
			this.currentPositionMarker = marker;
			// 可以移动标注
			marker.enableDragging();
			marker.addEventListener("dragend", function(e) {
				// alert("当前位置：" + e.point.lng + ", " + e.point.lat);
			});
		}
	},
	// 隐藏我当前位置标注
	hideCurrentPositionMarker : function() {
		if (this.currentPositionMarker) {
			var bmap = this.getBMap();
			var marker = this.currentPositionMarker; // 创建标注
			bmap.removeOverlay(marker); // 将标注添加到地图中
		}
	},
	// 在地图中心位置增加一个标注
	addOneMarkerAtCenter : function() {
		var bmap = this.getBMap();
		var point4Center = bmap.getCenter();
		var marker = new BMap.Marker(point4Center); // 创建标注
		bmap.addOverlay(marker); // 将标注添加到地图中
		// 可以移动标注
		marker.enableDragging();
		marker.addEventListener("dragend", function(e) {
			// alert("当前位置：" + e.point.lng + ", " + e.point.lat);
		});
		var me = this;
		marker.addEventListener("rightclick", function(type, target) {
			var menu = me.getMarkerMenu();
			menu.marker = this;
			menu.showAt([ type.clientX, type.clientY ]);
		});
		// 增加菜单
	},
	getMarkerMenu : function() {
		var bmap = this.getBMap();
		if (this.markerMenu == null) {
			var menu = new Ext.menu.Menu({
				items : [ {
					text : "保存",
					iconCls : 'kscp_c_icon_save'
				}, {
					text : "删除",
					iconCls : 'kscp_c_icon_delete',
					handler : function() {
						bmap.removeOverlay(menu.marker);
					}
				} ]
			});
			this.markerMenu = menu;
		}
		return this.markerMenu;
	},
	// 清除覆盖物
	clearOverlays : function() {
		this.getBMap().clearOverlays();
	},
	addClickHandler : function(config, marker) {

	},
	addOverlay : function(config) {
		var point = new BMap.Point(config.longitude, config.latitude);
		var marker = new BMap.Marker(point);
		this.getBMap().addOverlay(marker);
		if (!Ext.isEmpty(config.content)) {
			marker.addEventListener("click", function(e) {
				var p = e.target;
				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				var infoWindow = new BMap.InfoWindow(config.content, {
					width : config.width, // 信息窗口宽度
					height : config.height, // 信息窗口高度
					title : config.title, // 信息窗口标题
					// 设置允许信息窗发送短息
					enableMessage : true
				}); // 创建信息窗口对象
				this.getBMap().openInfoWindow(infoWindow, point); // 开启信息窗口
			}.createDelegate(this));
		}
	},
	setCenter : function(config) {
		var point = new BMap.Point(config.longitude, config.latitude);
		this.getBMap().setCenter(point);
	},
	onRender : function(ct, position) {
		Knight.ux.BaiduMapPanel.superclass.onRender.apply(this, arguments);
		var width = this.width;
		var height = this.height - 5;
		var editorHTMLFormat = '<div id="{0}" style="width:{1}px;height:{2}px;"></div>';
		var editorHTML = String.format(editorHTMLFormat, this.objectID, width, height);
		this.body.dom.innerHTML += editorHTML;
		new Ext.util.DelayedTask(function() {
			var top_left_control = new BMap.ScaleControl({
				anchor : BMAP_ANCHOR_TOP_LEFT
			});// 左上角，添加比例尺
			var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件
			var top_right_navigation = new BMap.NavigationControl({
				anchor : BMAP_ANCHOR_TOP_RIGHT,
				type : BMAP_NAVIGATION_CONTROL_SMALL
			}); // 右上角，仅包含平移和缩

			var map = new BMap.Map(this.objectID);
			var point = new BMap.Point(this.longitude, this.latitude);
			map.centerAndZoom(point, 15);
			var marker = new BMap.Marker(point); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			// marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
			map.addControl(top_left_control);
			map.addControl(top_left_navigation);
			map.addControl(top_right_navigation);

			this.object = map;
		}.createDelegate(this)).delay(100);
	}
});