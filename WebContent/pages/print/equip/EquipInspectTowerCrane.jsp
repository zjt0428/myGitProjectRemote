<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机巡检记录表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>
</head>

<body>

<center class="Noprint">
	<p align="right" class="mar_15">
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
	</p>
</center>
<center>
<div class="hzbmain_detail">
<p style='text-align:center; padding-bottom:10px;'><span class="wrod_title">塔式起重机巡检记录表</span></p>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="xj_table">
  <tr>
    <td width="100" height="27" align="center">使用单位</td>
    <td width="380">&nbsp;${project.unCustomName}</td>
    <td colspan="2" align="center">设备所属单位</td>
    <td colspan="2">&nbsp;${equipInspect.equipInspectSchema.equipDiary.propertyName}</td>
    </tr>
  <tr>
    <td height="27" align="center">工程名称</td>
    <td>&nbsp;${project.projectName}</td>
    <td colspan="2" align="center">工程地址</td>
    <td colspan="2">&nbsp;${project.address}</td>
    </tr>
  <tr>
    <td height="27" align="center">设备型号</td>
    <td>&nbsp;${equipInspect.equipInspectSchema.equipDiary.equipSpecificName}</td>
    <td width="100" align="center">设备编号</td>
    <td width="100">&nbsp;${equipInspect.equipInspectSchema.equipDiary.recordSerial}</td>
    <td width="80" align="center">检查人员</td>
    <td>&nbsp;${equipInspect.inspectPepoles}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="xj_table" style="border-top-style:none;">
  <tr>
    <td width="100" align="center" bgcolor="#CCCCCC">检查部位</td>
    <td width="380" align="center" bgcolor="#CCCCCC">检查要求</td>
    <td width="100" align="center" bgcolor="#CCCCCC">检查结果</td>
    <td width="100" align="center" bgcolor="#CCCCCC">检查部位</td>
    <td width="360" align="center" bgcolor="#CCCCCC">检查要求</td>
    <td align="center" bgcolor="#CCCCCC">检查结果</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">基础</td>
    <td height="26" align="left">地脚螺栓有否松动</td>
    <td>&nbsp;</td>
    <td rowspan="7" align="center">安全限位和<br />
      保险装置</td>
    <td align="left">超高限制器灵敏、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">基础四周排水措施良好</td>
    <td>&nbsp;</td>
    <td align="left">回转限制器灵敏、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="6" align="center">金属结构</td>
    <td height="26" align="left">部件、附件、连接件安装齐全、位置正确</td>
    <td>&nbsp;</td>
    <td align="left">变幅限制器灵敏、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">螺栓拧紧力矩达到技术要求，开口销完全撬开</td>
    <td>&nbsp;</td>
    <td align="left">力矩限制器灵敏、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">结构无变形、开焊、疲劳裂纹</td>
    <td>&nbsp;</td>
    <td align="left">重量限制器灵敏、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">塔身总高<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>米,自由高度<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>米</td>
    <td>&nbsp;</td>
    <td align="left">吊钩保险装置灵敏、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">塔身对支承面垂直偏差≦4/1000（目测无明显偏差）</td>
    <td>&nbsp;</td>
    <td align="left">绳筒、滑轮保险可靠,驾驶室悬挂部份连接必须可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">金属结构表面无严重锈蚀</td>
    <td>&nbsp;</td>
    <td rowspan="7" align="center">电气系统</td>
    <td align="left">供电系统供电充分、正常工作、电压380±5%</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">起升回转<br />变幅机构</td>
    <td height="26" align="left">各机构转动平稳、无异常响声,各润滑点润滑良好</td>
    <td>&nbsp;</td>
    <td align="left">碳刷、接触器、继电器触点良好</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">减速器清洁、无异响、无卡阻、无漏油</td>
    <td>&nbsp;</td>
    <td align="left">仪表、照明、报警系统完好、可靠</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">制动器动作灵活可靠，联轴节连接良好，无异常</td>
    <td>&nbsp;</td>
    <td align="left">控制、操纵装置动作灵活、可靠、电气按要求设置短路</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">绳轮钩系统</td>
    <td height="26" align="left">钢丝绳在卷筒上缠绕整齐、润滑良好</td>
    <td>&nbsp;</td>
    <td align="left">和过载电流、失压及零位保护，切断总电源的紧急开关</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">钢丝绳规格正确、断丝和磨损有没有达到报废标准</td>
    <td>&nbsp;</td>
    <td align="left">符合要求</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">各部位滑轮转动灵活、可靠无卡塞现象</td>
    <td>&nbsp;</td>
    <td align="left">电气系统对地的绝缘电阻良好</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">吊钩磨损未达到报废标准、保险装置可靠</td>
    <td>&nbsp;</td>
    <td rowspan="4" align="center">运行情况</td>
    <td align="left">实际最大起重量（有无超载）询问驾驶员</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">附墙件</td>
    <td height="26" align="left">塔身与锚固框固定牢靠，有无松动</td>
    <td>&nbsp;</td>
    <td align="left">实际最大幅度，询问驾驶员</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">框架、锚杆、墙板等各处螺栓、销轴齐全、可靠</td>
    <td>&nbsp;</td>
    <td align="left">实际操作中有无异常异响，幅度内有无障碍物（记录）</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">垫铁、契块等零部件齐全可靠</td>
    <td>&nbsp;</td>
    <td align="left">驾驶员持证及塔机例保记录情况</td>
    <td>&nbsp;</td>
  </tr>
</table>


<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="xj_table" style="border-top-style:none;">
  <tr>
    <td width="582" height="56" align="left" valign="top" style="padding-top:5px;">&nbsp;<strong>检查单位意见：</strong></td>
    <td height="56" align="left" valign="top" style="padding-top:5px;">&nbsp;<strong>使用单位意见：</strong></td>
  </tr>
  
  <tr>
    <td height="28" align="right" style="padding-right:150px;">负责人：</td>
    <td align="right"><span style="padding-right:150px;">负责人：</span></td>
  </tr>
  <tr>
    <td height="28" align="right" style="padding-right:150px;">日期：</td>
    <td align="right"><span style="padding-right:150px;">日期：</span></td>
  </tr>
</table>


</div>
</center>
</body>
</html>
