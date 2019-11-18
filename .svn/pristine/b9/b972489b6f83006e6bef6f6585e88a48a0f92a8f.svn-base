<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>起重机械安拆、顶升、附墙安全旁站监控记录表</title>
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>

<link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title">
  <p align="center">起重机械安拆、顶升、附墙安全旁站监控记录表 </p>
</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" align="center">项目名称</td>
    <td width="210">&nbsp;${project.projectName}</td>
    <td width="100" align="center">作业时间</td>
    <td>&nbsp;${printData.pangZhanZuoYeDate}</td>
  </tr>
  <tr>
    <td align="center">作业内容</td>
    <td>&nbsp;${printData.pangZhanZuoYeContent}</td>
    <td align="center">设备名称</td>
    <td>&nbsp;${equip.equipGenericName}</td>
  </tr>
  <tr>
    <td align="center">设备型号</td>
    <td>&nbsp;${equip.equipSpecificName}</td>
    <td align="center">作业人员</td>
    <td>&nbsp;${printData.pangZhanZuoYePerson}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td colspan="2" rowspan="2" align="center">安全管理控制点</td>
    <td colspan="2" align="center">检查结果</td>
    <td align="center">存在问题</td>
    </tr>
  <tr>
    <td align="center">是（√）</td>
    <td align="center">否（×）</td>
    <td align="center">&nbsp;</td>
    </tr>
  <tr>
    <td width="80" align="center">施工方案</td>
    <td width="300" height="20" align="left">★方案是否审批、论证</td>
    <td width="60">&nbsp;</td>
    <td width="60">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td rowspan="2" align="center">资质</td>
    <td height="20" align="left">★安拆、顶升、附墙人员资质是否符合要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★设备合规安装、使用资质</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td rowspan="8" align="center"><p align="center">作业前 </p>
      检查</td>
    <td height="20" align="left" style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="100" rowspan="2" align="center" style="border-left-style:none; border-bottom-style:none;">★工人状况</td>
        <td>工人无情绪反常</td>
      </tr>
      <tr>
        <td style="border-bottom-style:none;">工人无身体不适</td>
      </tr>
    </table></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★对参与该项作业人员进行安全技术交底</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★是否有旁站人员</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★警戒区域设立</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★确定作业现场基础等是否满足要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">手锤等小型工具是否具备防坠落措施</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★作业天气情况是否符合要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★作业人员防护用品配置到位</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td rowspan="11" align="center">作业控制</td>
    <td height="20" align="left">★警戒区域人员清场</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★吊、索具可靠连接，并进行试吊</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★专人指挥，班长、副班长佩戴安全袖标</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★现场交底，再次布置，各司其职</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★对人员清场最后一次确认</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">作业按方案规定的吊装工艺和程序进行</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★多台吊车同时作业时安全距离符合要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★辅助吊车支撑稳当且可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★辅助吊车、吊索具是否完好，满足要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★遇四级大风、大雨、大雾时，是否仍在作业</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">★垂直度测量</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td rowspan="2" align="center">完工检查</td>
    <td height="20" align="left">撤除警戒区域</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="20" align="left">合理堆放材料、及时清理现场</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td align="center">验收</td>
    <td height="20" align="left">必须按验收程序达到合规使用</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
  <tr>
    <td height="40" colspan="5" align="left" valign="top">过程问题及处理措施：</td>
    </tr>
  <tr>
    <td height="80" colspan="5" align="left" valign="top">
	<p>安装单位安全旁站（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;班组长（签字）：</p><br /><br />
	<p>安装带队人员（签字）：</p>
	</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td align="left" style=" line-height:24px;"><p>注：1、表中★项为作业进程单项否决项，出现任一否决项，作业过程立即停止（或不得作业） <br />
      2、此表由旁站人填写，作业完毕归档 </p></td>
  </tr>
</table>


</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
