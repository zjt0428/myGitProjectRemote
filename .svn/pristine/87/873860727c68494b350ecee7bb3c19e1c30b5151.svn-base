<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机附着自检表</title>
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
<div class="er_wrod_title">塔式起重机附着自检表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010804&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" height="30" align="center"> 工 程 名 称</td>
    <td align="center">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="30" align="center"> 工 程 地 址</td>
    <td align="center">&nbsp;${project.address}</td>
    </tr>
	  <tr>
    <td height="30" align="center">  总承包单位</td>
    <td align="center">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="30" align="center"> 使 用 单 位</td>
    <td align="center">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="30" align="center">安 装 单 位</td>
    <td align="center">&nbsp;${equip.propertyName}</td>
    </tr>
  <tr>
    <td height="30" align="center">产 权 单 位</td>
    <td align="center">&nbsp;${equip.propertyName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style=" border-top-style:none;">
    <tr>
    <td width="100" height="30" align="center">  塔 机 类 型</td>
    <td width="300" align="left">&nbsp;${equip.equipCategoryName}</td>
    <td width="80" align="center">变幅形式</td>
    <td align="left">&nbsp;${equip.amplitudeForm}</td>
  </tr>
  <tr>
    <td height="30" align="center"> 型 号 规 格</td>
    <td align="left">&nbsp;${equip.equipSpecificName}</td>
    <td align="center">设备自编号</td>
    <td align="left">&nbsp;${equip.equipSerial}</td>
  </tr>
  <tr>
    <td height="30" align="center">备 案 编 号</td>
    <td align="left">&nbsp;${equip.recordId}</td>
    <td align="center">安装位置</td>
    <td align="left">&nbsp;${indesSchema.axisPosition}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" align="center"> 性 能 参 数</td>
    <td align="left" style="line-height:26px;">
        <p> 最大起重力矩：${equip.mostMoment}kN·m；最大起重量：${equip.loadingWeight}t</p>
        <p> 最大独立起升高度：${equip.independentHeight}m </p>
        <p>附着最大起升高度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m</p>

    </td>
  </tr>
  <tr>
    <td height="30" align="center">设 备 状 态</td>
    <td align="left" style="line-height:26px;">
	<p> 附着后塔机高度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m；第<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>道附着</p>
	</td>
  </tr>
  <tr>
    <td align="center">检 查 依 据</td>
    <td align="left" style="line-height:24px;">1.《建筑塔式起重机安装检查评定规程》DBJ/T 15—73—2010<br />
      2.《塔式起重机安全规程》GB 5144—2006<br />
      3.《塔式起重机》GB/T 5031—2008；<br />
      4.《起重机械安全规程 第1部分：总则》GB 6067.1—2010<br />
       5.《建筑施工塔式起重机安装、使用、拆卸安全技术规程》JGJ 196—2010<br />
      6.《施工现场机械设备检查技术规程》JGJ 160—2008；<br />
      7.《建筑起重机械安全监督管理规定》(建设部令第166号)</td>
  </tr>

  <tr>
    <td height="100" align="center">检查结论</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="120" align="center">自检人员<br />
      (安装单位专业<br />技术人员)</td>
    <td align="left" style="padding:0px;">
	<table width="100%" height="120" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td  width="250" height="80" align="center" style="border-left-style:none; border-bottom-style:none;">
		<br />
		<p>（签名）</p>
		<p>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
		</td>
        <td width="60" align="center" style="border-bottom-style:none;">安装<br />单位</td>
        <td align="center" style="border-bottom-style:none;">
		<br />
		<p>（公章）</p>
		<p>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
		</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="80" align="center">备    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</td>
    <td align="left"> 检查项目全部符合要求，此设备自检结论方为“合格”</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机附着自检表(续表)</div>
<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010804-1&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="40" height="38" align="center" valign="middle"><strong>序号</strong></td>
    <td width="80" align="center" valign="middle"><strong>检查项目</strong></td>
    <td width="340" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="90" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="4" align="center" valign="middle">一</td>
    <td rowspan="4" align="center" valign="middle">资料部分</td>
    <td height="34" align="left" valign="middle">塔式起重机附着锚固预埋隐蔽工程验收记录</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle"><p> 经审批的附着方案（或塔机安装方案内含有附着专<br />项内容）</p></td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle">有健全的安全管理制度和岗位责任制</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle"> 塔式起重机附着装置制造证明</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td rowspan="10" align="center" valign="middle">二</td>
    <td rowspan="6" align="center" valign="middle"><p>附着尺寸<br />参数</p></td>
    <td height="34" align="left" valign="middle"> 附着预埋连接件的预埋位置、尺寸与方案是否一致</td>
    <td align="center" valign="middle">是</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle"> 与建筑物之间的水平附着距离与附着方案是否一致</td>
    <td align="center" valign="middle">是</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle"> 各道附着装置之间的距离与附着方案是否一致</td>
    <td align="center" valign="middle">是</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle">附着杆系的布置方式与附着方案是否一致</td>
    <td align="center" valign="middle">是</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle"> 与建筑物的连接形式与附着方案是否一致</td>
    <td align="center" valign="middle">是</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="34" align="left" valign="middle"> 塔机的悬臂高度与《使用说明书》是否一致</td>
    <td align="center" valign="middle">是</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="38" align="center" valign="middle">附着装置</td>
    <td align="left" valign="middle">塔机附着装置主要承载杆件、连接板及其焊缝应无<br />
      裂纹，杆件、连接板应无整体或局部塑性变形，销<br />
      孔应无塑性变形。连接件的轴、孔应无严重磨损。<br />
      结构件母材不应出现严重锈蚀或磨损 </td>
    <td align="center" valign="middle">无裂纹无变形</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td rowspan="3" align="center" valign="middle"><p>附着装置<br />安装连接</p></td>
    <td height="38" align="left" valign="middle">附着装置与塔身节和建筑物的安装连接必须安全可<br />
      靠，各连接件如螺栓、销轴等必须齐全，不应缺件<br />
      或松动，与附着杆相连接的建筑物不应有裂纹或损坏</td>
    <td align="center" valign="middle">安全可靠<br />
      无松动</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="38" align="left" valign="middle">附着杆与建筑物之间的连接不宜采用焊接方式，特<br />
      殊情况下采用焊接连接时，必须提供下列资料：<br />
      (1)焊工资格证书；(2)焊接工艺要求；(3)焊缝尺<br />
      寸要求；(4)焊缝外观质量及无损探伤检验结果</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="38" align="left" valign="middle">附着杆与水平面之间的倾斜角不得超过10°</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">三</td>
    <td rowspan="2" align="center" valign="middle">塔身垂直度<br /></td>
    <td height="38" align="left" valign="middle"><p> 附着状态下最高附着点以上塔身轴心线的侧向垂直<br />度偏差应≤4‰</p></td>
    <td align="center" valign="middle">具体数据</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="38" align="left" valign="middle">附着状态下最高附着点以下塔身轴心线的侧向垂直<br />
      度偏差应≤2‰</td>
    <td align="center" valign="middle">具体数据</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">四</td>
    <td rowspan="2" align="center" valign="middle">试  验</td>
    <td height="38" align="left" valign="middle">空载试验：要求安全装置动作准确、灵敏、可靠</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
  <tr>
    <td height="38" align="left" valign="middle"> 额定载荷试验：要求机构运转正常，制动可靠</td>
    <td align="center" valign="middle">符合要求</td>
    <td align="center" valign="middle">合格</td>
  </tr>
 </table>
</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
