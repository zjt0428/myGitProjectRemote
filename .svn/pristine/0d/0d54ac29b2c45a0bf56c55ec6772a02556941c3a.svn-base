<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<%@ taglib prefix="aps" uri="http://www.knight.com/taglib/security"%>
<%@ page import="com.knight.system.application.ApplicationContainer" %>
<%
	String basePath=request.getContextPath();
	//登录成功后，需要把该用户显示至在线用户
	ApplicationContainer.addOnlineUser(request.getSession().getId(), ApplicationContainer.getCurrentUser());
	if(ApplicationContainer.getCurrentUser().getRights().contains("__ALL")){
		request.setAttribute("IS_MANAGER",true);
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="msthemecompatible" content="no" />
	<title>广西大都管理服务平台</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3.4/ux/css/Portal.css" />
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/js/core/ux/uploaddialog/css/UploadDialog.css" />
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/js/core/ux/css/ActionColumn.css" />
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/js/core/ux/css/lovcombo.css" />
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3.4/ux/css/ux-all.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/admin.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/btn.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/menu.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/btn_business.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/menu_business.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/desktop.css" />
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3.4/ux/css/Spinner.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3.4/ux/css/tab-scroller-menu.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/navigations.css"/>

	<!-- load the extjs libary -->
	<script type="text/javascript" src="<%=basePath%>/ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ext-all.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ext-basex.gzjs"></script>

	<script type="text/javascript" src="<%=basePath%>/js/print/Printer-all.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/export/Exporter-all.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/RowEditor.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/XmlTreeLoader.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/CheckColumn.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/Portal.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/PortalColumn.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/Portlet.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/RowExpander.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/MultiSelect.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/ItemSelector.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/Spinner.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/SpinnerField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/TabCloseMenu.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/TabScrollerMenu.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/DataViewTransition.js"></script>

	<script type="text/javascript" src="<%=basePath%>/js/core/ui/ext-ui-combo-pagesize.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/UploadDialog.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/IconCombob.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/Toast.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/ActionColumn.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/SystemCalendar.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeSelector.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/date.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/DynamicCheckboxGroup.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/DynamicRadioGroup.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeCombo.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreePanelEditor.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeXmlLoader.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/WebOffice.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/AdvancedQueryWin.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/IndexPagePortlet.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/SearchGridPanel.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/FormPanelWindow.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/DateTimeField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/RelationModule.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/RelationSelector.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/RelationCompositeMenuButtonField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/RelationCompositeField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/SubModuleBaseGrid.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/LovCombo.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/SimpleCombo.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/CheckTreePanel.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/ClearableTextField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/BaseReportView.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/KnightDateMenu.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/BaiduMapPanel.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/uploader/swfupload.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/uploader/SwfUploadPanel.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/AreaCompositeField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/AppUtil.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/KnightUtil.date.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/KnightUtil.math.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ScrollText.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ScriptMgr.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/TabTitle.js"></script>

	<script type="text/javascript" src="<%=basePath%>/js/dynamic.jsp"></script>
	<script type="text/javascript" src="<%=basePath%>/js/sound/soundmanager2.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/App.import.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/BusinessConfigure.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/ObjectFieldMapping.gzjs"></script>

	<script type="text/javascript" src="<%=basePath%>/js/selector/selector.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/selector/grid/grid.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/search/SearchForm.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/info/info.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/system/system.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/form/form.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/archive/archive.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/dispatch/dispatch.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/equip/equip.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/verify/verify.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/fund/fund.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/diary/diary.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/report/report.gzjs"></script>
	<script type="text/javascript" src="<%=basePath%>/js/safety/safety.gzjs"></script>

	<script type="text/javascript">
		var __companyName="<%=ApplicationContainer.getCompanyName() %>";
		Ext.onReady(function() {
		   	  var storeTheme=getCookie('theme');
		   	  if (storeTheme==null || storeTheme=='') {
			   	  storeTheme='ext-all';
		   	  }
		      Ext.util.CSS.swapStyleSheet("theme", __ctxPath+"/ext3.4/resources/css/"+storeTheme+".css");  
	    });
		var hkey_key;
		var hkey_root = "HKEY_CURRENT_USER";
		var hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
		try {
			var RegWsh = new ActiveXObject("WScript.Shell");
			hkey_key = "header";
			RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
			hkey_key = "footer";
			RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
		} catch (e) {}
	</script>
	<script type="text/javascript" src="<%=basePath%>/js/AppHomeView.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/AppNavigationView.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/App.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/IndexPage.js"></script>
	
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/Spinner.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ext3.4/ux/SpinnerField.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/core/ux/DateTimeField.js"></script>
</head>
<body oncontextmenu="return false">
	<OBJECT classid=clsid:C7672410-309E-4318-8B34-016EE77D6B58 id=ePass name=ePass STYLE="LEFT: 0px; TOP: 0px" width=0 height=0></OBJECT>
	<div id="loading">
            <div class="loading-indicator">
                 <img src="<%=basePath %>/img/loading.gif" alt="" width="153" height="16" style="margin-right:8px;" align="absmiddle"/>
                 <div class="clear"></div>
        		    正在加载，请稍候......
            </div>
	</div>
	<div id="loading-mask"></div>
	
	<div id="app-header">
		<div class="top_title"><img src="<%=basePath %>/img/index/top_title.jpg" width="530" height="70"/></div>
		<div class="top_right">
			<div class="top_right_word">
				<c:if test="${IS_MANAGER == true}">
				<span class="top_span_icon"><img src="<%=basePath %>/img/index/top_help.png" /></span><span class="top_span_word" style="width:36px;"><a href="#" onclick="App.clickTopTab('SysConfigView')">设置</a></span>
				</c:if>
				<span class="top_span_icon"><img src="<%=basePath %>/img/index/top_home.png" /></span><span class="top_span_word" style="width:48px;"><a href="http://www.rjtms.com/Map/MMap.aspx" target="_blank">黑匣子</a></span>
				<span class="top_span_icon"><img src="<%=basePath %>/img/index/top_home.png" /></span><span class="top_span_word" style="width:36px;"><a href="#" onclick="App.MyDesktopClick()">首页</a></span>
				<span class="top_span_icon"><img src="<%=basePath %>/img/index/top_help.png" /></span><span class="top_span_word" style="width:36px;"><a href="<%=basePath%>/help/manual.zip" target="blank">帮助</a></span>
				<span class="top_span_icon"><img src="<%=basePath %>/img/index/top_close.png" /></span><span class="top_span_word" style="width:36px;"><a href="<%=basePath%>/logout.do" >退出</a></span>
			</div>
		</div>
	</div>
	<script Language="javascript">
	window.onload = function() {
		document.getElementsByTagName("body")[0].onkeydown = function() {
			var elem = event.relatedTarget || event.srcElement || event.target || event.currentTarget;
			if (event.keyCode == 8) {
				var elem = event.srcElement || event.currentTarget;
				var name = elem.nodeName;
				if (name != 'INPUT' && name != 'TEXTAREA') {
					return $stopIt(event);
				}
				var type_e = elem.type.toUpperCase();
				if (name == 'INPUT' && (type_e != 'TEXT' && type_e != 'TEXTAREA' && type_e != 'PASSWORD' && type_e != 'FILE')) {
					return $stopIt(event);
				}
				if (name == 'INPUT' && (elem.readOnly == true || elem.disabled == true)) {
					return $stopIt(event);
				}
			}
		}
	}
	</script>
</body>
</html>