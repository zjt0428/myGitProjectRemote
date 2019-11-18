<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械维护保养记录表</title>
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
<div class="er_wrod_title">建筑起重机械维护保养记录表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ20612&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<p style=" text-align:left; line-height:24px; font-size:14px;">工程名称：${project.projectName}</p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="90" align="center">设备名称</td>
    <td width="300"><strong>${equip.equipGenericName}</strong></td>
    <td width="75" align="center">设备型号</td>
    <td>&nbsp;${equip.equipSpecificName}</td>
  </tr>
  <tr>
    <td align="center">出厂编号</td>
    <td style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="120" style=" border-bottom-style:none; border-left-style:none;">&nbsp;${equip.exwSerial}</td>
        <td width="70" align="center" style="border-bottom-style:none;">备案编号</td>
        <td style="border-bottom-style:none;">&nbsp;${equip.recordId}</td>
      </tr>
    </table></td>
    <td align="center">自编号</td>
    <td>&nbsp;${equip.equipSerial}</td>
  </tr>
  <tr>
    <td align="center">出厂日期</td>
    <td>&nbsp;${equip.exwDate}</td>
    <td align="center">产权单位</td>
    <td>&nbsp;${equip.propertyName}</td>
  </tr>
  <tr>
    <td align="center">维保单位</td>
    <td>&nbsp;${equip.propertyName}</td>
    <td align="center" style="line-height:16px;">上次维保<br />日    期</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td colspan="2" align="center"><strong>项    类</strong></td>
    <td align="center"><strong>维护保养内容</strong></td>
    <td width="60" align="center" style="line-height:16px;"><strong>技术<br />
      要求<br />
    </strong></td>
    <td align="center"><strong>备注</strong></td>
  </tr>
  <tr>
    <td width="35" align="center">清<br />
      洁<br />润<br />滑</td>
    <td width="50" align="center">各机构、传动系统、部件润滑</td>
    <td width="380" align="left" valign="top" style="line-height:20px;">
	<div style="float:left; width:370px;">
	  <div style="float:left; width:350px;">
	    <p>起升机构变速箱油量、油质是否符合要求<br />
	      回转机构减速器油量、油质是否符合要求<br />
	      变幅机构减速器油量、油质是否符合要求，<br />
	      卷筒轴承、吊钩止推轴承、回转支座装置、各滑轮及内部轴承、运动部分滑动部件轴承润滑是否良好<br />
	      起升钢丝绳、变幅钢丝绳润滑是否良好<br />
	      制动器杠杆各铰点润滑是否良好<br />
	      滑轮润滑否良好</p>
	    <strong>补充内容：</strong><BR /><BR /></div>
	  <div style="float:left; width:20px;"> <input type="checkbox" name="checkbox42" value="checkbox" />
	    <input type="checkbox" name="checkbox43" value="checkbox" />
	    <input type="checkbox" name="checkbox44" value="checkbox" />
			    <br /> <br />
	    <input type="checkbox" name="checkbox45" value="checkbox" />
	    <input type="checkbox" name="checkbox47" value="checkbox" />
	    <input type="checkbox" name="checkbox48" value="checkbox" />
	    <input type="checkbox" name="checkbox49" value="checkbox" />
	  </div>
	</div>
	
	</td>
    <td rowspan="2" align="center">按设备使用说明书及相关标准规程</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">检<br />
      查<br />
      调<br />
      整<br />
      更<br />
      换</td>
    <td align="center">部件附件连接件、各机构制动器和限位开关与机械元件间隙调整更换、钢丝绳、吊具、索具、链条、滑轮缺损情况</td>
    <td align="left" valign="top" style="line-height:20px;">
	<div style="float:left; width:370px;">
		  <div style="float:left; width:350px;">
		    <p>各机构工作运行平稳无震动和异响                     <br />
		      各机构构件应完好无异常                             <br />
		      各机构制动器制动灵敏有效                           <br />
		      各机构制动器磨擦片等构件应完好，未达报废标准       <br />
		      力矩限制器功能符合要求，工作灵敏可靠，固定及构件 <br />
		      完好无损                                           <br />
		      起重量限制器功能符合要求，工作灵敏可靠，固定及构件 <br />
		      完好无损                                           <br />
		      回转限位器功能符合要求，工作灵敏可靠，固定及构件 <br />
		      完好无损                                           <br />
		      幅度限位器功能符合要求，工作灵敏可靠，固定及构件 <br />
		      完好无损                                         <br />
		      起升高度限位器功能符合要求，工作灵敏可靠，固定及 <br />
		      构件完好无损                                       <br />
		      变幅小车缓冲挡车装置齐全可靠                       <br />
		      已安装的风速仪工作显示正常                         <br />
		      钢丝绳缠绕排列应整齐，长度满足使用要求             <br />
		      钢丝绳无锈蚀严重、断股、打结、变形现象，钢丝绳断丝数量未达到报废标准<br />
		      钢丝绳绳头端的固定紧固牢靠，绳卡数量及安装符合要求<br />
		      吊具按钢丝绳标准检查，索具按索具标准检查符合要求   <br />
		      按吊钩标准对吊钩进行检查，无变形等现象，吊钩防脱装置安全可靠<br />
		      滑轮应无裂纹、破损，轮槽磨损未到报废标准           <br />
		      滑轮转动应灵活，无卡阻、松旷现象                   <br />
		      <strong>补充内容： </strong><BR />
		      <BR /></p>
		  </div>
		  <div style="float:left; width:20px;">
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" /> <br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" /> <br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" /> <br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" /> <br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" /> <br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" /><br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" /><br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" /><br /> <br />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   <input type="checkbox" name="checkbox49" value="checkbox" />
		   
		  </div>
	</div>
	
	
	</td>
    <td>&nbsp;</td>
  </tr>
</table>


</div>
<div class="PageNext"></div>


<div class="er_wrod_title">建筑起重机械维护保养记录表（续表）</div>
<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ20612-1&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td colspan="2" align="center"><strong>项    类</strong></td>
    <td align="center"><strong>维护保养内容</strong></td>
    <td width="60" align="center" style="line-height:16px;"><strong>技术<br />要求<br />
    </strong></td>
    <td align="center"><strong>备注</strong></td>
  </tr>
  <tr>
    <td width="35" rowspan="3" align="center">检<br />
      查<br />
      调<br />
      整<br />
      更<br />
      换</td>
    <td width="50" align="center">基础<br />
      及轨<br />
      道<br />
    <td width="380" align="left">
	<div style="float:left; width:370px;">
	  <div style="float:left; width:350px;">
	      基础排水措施：基础无积水，排水措施良好     <br />
	      基础螺栓：连接紧固，无断裂现象，螺母、垫齐全       <br />
	      接地装置连接牢固，无开焊现象  <br />
	    补充内容：<br /><br /><br /></div>
		
	  <div style="float:left; width:20px;"> 
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  </div>
	</div>
	
	</td>
    <td rowspan="3" align="center">按<br />
      设备<br />
      使用<br />
      说明<br />
      书及<br />
      相关<br />
      标准<br />
      规程</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">金属<br />
      结构<br />
      与连<br />
      接件<br /></td>
    <td align="left">
  <div style="float:left; width:370px;">
	  <div style="float:left; width:350px; line-height:20PX;">
	     主要受力构件无变形、开焊、开裂等异常现象<br />
	      爬梯、走道、栏杆不能有锈蚀、破损，须完整牢固 <br />
	      螺栓销轴附近母材无裂绞或开焊等异常现象    <br />
	      销轴部分无脱离现象，开口销完好，配合紧密  <br />
	      螺栓部分应齐全、紧固，无松动、断裂现象 <br />
	      附着装置金属构件无变形等异常现象  <br />
	      附着装置与建筑物连接位置完好，建筑物无裂纹 <br />
	      补充内容：<br /><br /><br /> 
	  </div>
	  <div style="float:left; width:20px; line-height:28px;"> 
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  </div>
	</div>
	</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">电气<br />
      与<br />
      控制<br />
      操作<br />
      系统</td>
    <td align="left">
		<div style="float:left; width:370px;">
	  <div style="float:left; width:350px;">
	    <p>接触器等电子元件动作正常，无烧焦、老化现象 <br />
	      电气线路无老化、破损现象，端子固定牢靠 <br />
	      操作系统各组合开关及按钮开关动作灵敏可靠，各仪表 <br />
	      显示正常<br />
	      配电箱电阻箱：箱体完好、防雨，门销完好，接地保护 <br />
	      良好，固定稳定可靠、漏电保护器、隔离开关完好<br />
	      塔顶和起重臂最前端障碍灯完好</p>
	    补充内容：</div>
	  <div style="float:left; width:20px;"> 
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  <input type="checkbox" name="checkbox42" value="checkbox" /><br /><br />
	   <input type="checkbox" name="checkbox42" value="checkbox" /><br /><br />
	   <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	   <input type="checkbox" name="checkbox42" value="checkbox" /><br />
	  </div>
	</div>
	</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="90" height="80" align="center">维保建议</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="80" align="center">维保结论</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="150" colspan="2" align="center" valign="top">
	<p style="line-height:30px; text-align:left;">&nbsp;维护保养人员：（签名）           </p>
	<br /><br /><br /><br /><br />
	
	<p style="line-height:30px; text-align:right;">  维保单位（公章）&nbsp;&nbsp; <br /> 年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp; &nbsp;&nbsp;</p>
	</td>
    </tr>
</table>

</div>



  </div>
<div class="PageNext"></div>
</center>
</body>
</html>
