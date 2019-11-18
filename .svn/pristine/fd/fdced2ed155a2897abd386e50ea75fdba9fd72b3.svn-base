<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机附着自检表</title>
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
<div class="er_wrod_title">施工升降机附着自检表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010802&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" height="28" align="center"> 工 程 名 称</td>
    <td align="center">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="28" align="center"> 工 程 地 址</td>
    <td align="left">&nbsp;${project.address}</td>
    </tr>
  <tr>
    <td height="28" align="center">总承包单位</td>
    <td align="left">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="28" align="center"> 使 用 单 位</td>
    <td align="left">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="28" align="center">安 装 单 位</td>
    <td align="left">&nbsp;${equip.propertyName}</td>
    </tr>
  <tr>
    <td height="28" align="center">产 权 单 位</td>
    <td align="left">&nbsp;${equip.propertyName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" height="28" align="center"> 传 动 形 式</td>
    <td width="260" align="left">${equip.driveForm}</td>
    <td width="100" align="center">SS型驱动形式</td>
    <td>${equip.ssDriveForm}</td>
  </tr>
  <tr>
    <td height="28" align="center"> 型 号 规 格</td>
    <td align="left">&nbsp;${equip.equipSpecificName}</td>
    <td align="center">设备自编号</td>
    <td>&nbsp;${equip.equipSerial}</td>
  </tr>
  <tr>
    <td height="28" align="center"> 备 案 编 号</td>
    <td align="left">&nbsp;${equip.recordId}</td>
    <td align="center">安装位置</td>
    <td>&nbsp;${indisSchema.axisPosition}</td>
  </tr>
</table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" align="center"> 性 能 参 数</td>
    <td align="left" style="line-height:26px;">
        <p>额定载重量：${equip.loadingWeight}kg；额定提升速度:${equip.ratedLiftSpeed}m/min</p>
        <p>额定乘员数：${equip.ratedCrewNum}人；最大独立高度：${equip.independentHeight}m</p>
        <p>最大提升高度：${equip.maxLiftHeight}m；导轨架顶端自由高度：${equip.railUpHeight}m</p>
	
	</td>
  </tr>
  <tr>
    <td height="40" align="center">设 备 状 态</td>
    <td align="left" style="line-height:26px;">
	<p>附着后高度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m；&nbsp;&nbsp;&nbsp;&nbsp;第<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>道附着</p>
	</td>
  </tr>

  <tr>
    <td height="60" align="center">检查依据</td>
    <td align="left" style="line-height:26px;">1.《建筑施工升降机安装检验评定规程》(广东省标准)<br />
      2.《施工升降机安全规程》GB 10055—2007<br />
      3.《施工升降机》GB/T 10054—2005；<br />
      4.《起重机械安全规程 第1部分：总则》GB 6067.1—2010<br />
      5.《建筑施工升降机安装、使用、拆卸安全技术规程》JGJ 215—2010<br />
      6.《建筑机械使用安全技术规程》JGJ 33—2001<br />
      7.《建筑施工安全检查标准》JGJ 59—99<br />
      8.《施工现场机械设备检查技术规程》JGJ 160—2008；<br />
      9.《建筑起重机械安全监督管理规定》建设部令第166号</td>
  </tr>
  <tr>
    <td height="100" align="center">检查结论</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">自检人员<br />(安装单位专业<br />技术人员)</td>
    <td align="left" style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
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
    <td height="60" align="center">备    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</td>
    <td align="left"> 检查项目全部符合要求，此设备自检结论方为“合格”</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>
<div style=" clear:none;"></div>

<div class="er_wrod_title">施工升降机附着自检表(续表)</div>
<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010802-1&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24" >
  <tr>
    <td width="40" align="center" valign="middle"><strong>序号</strong></td>
    <td width="80" align="center"><strong>检查项目</strong></td>
    <td align="center"><strong>检 查 内 容 与 要 求</strong></td>
    <td width="90" align="center"><strong>检 查 结 果</strong></td>
    <td width="80" align="center"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="4" align="center" valign="middle">一</td>
    <td rowspan="4" align="center">资料部分</td>
    <td align="left">施工升降机附着锚固预埋隐蔽工程验收记录</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">经审批的施工升降机安装方案</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">有健全的安全管理制度和岗位责任制</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">施工升降机附着装置制造证明</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="8" align="center" valign="middle">二</td>
    <td rowspan="5" align="center">附着尺寸<br />
      参数</td>
    <td align="left">附着预埋连接件的预埋位置、尺寸与方案是否一致</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">与建筑物之间的水平附着距离与方案是否一致</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">各道附着装置之间的距离与方案是否一致</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">与建筑物的连接形式与方案是否一致</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 施工升降机的自由端高度与方案是否一致</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">附着装置</td>
    <td align="left">施工升降机附墙架焊缝应无裂纹，应无整体或局部塑性<br />
      变形，销孔应无塑性变形。连接件的轴、孔应无严重磨<br />
      损。附墙架母材不应出现严重锈蚀或磨损</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">附着装置<br />
      安装连接</td>
    <td align="left">附着装置与导轨架和建筑物的安装连接必须安全可靠，<br />
      各连接件如螺栓、销轴等必须齐全，不应缺件或松动，<br />
      与附着杆相连接的建筑物不应有裂纹或损坏</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">附墙架撑杆平面与附着面的法向夹角不应大于8°</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">三</td>
    <td rowspan="2" align="center">导轨架垂<br />
      直度偏差</td>
    <td align="left">对钢丝绳式施工升降机，导轨架轴心线对底座水平基<br />
      准面的垂直度偏差不应大于导轨架高度的1.5‰</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="6" align="center" style="border-left-style:none; border-bottom-style:none;">对齿轮齿条式施<br />
          工升降机，导轨<br />
          架轴心线对底座<br />
          水平基准面的垂<br />
          直度偏差应符合<br />
          右表的规定</td>
        <td width="90" align="center">&nbsp;</td>
        <td width="110" align="center">垂直度偏差(mm)</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">&nbsp;</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">≤70</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">≤90</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">≤110</td>
      </tr>
      <tr>
        <td align="center" style="border-bottom-style:none;">&nbsp;</td>
        <td align="center" style="border-bottom-style:none;">≤130</td>
      </tr>
    </table></td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">四</td>
    <td rowspan="2" align="center">极限、限<br />
      位开关及<br />
      其碰铁</td>
    <td align="left">每个吊笼必须设置非自动复位型的上、下极限开关，<br />
      限位开关，且动作可靠。极限开关不应与限位开关共<br />
      用一个触发元件</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">上、下极限开关与上、下限位开关、触发元件安装牢<br />
      固，符合要求，灵敏可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">五</td>
    <td rowspan="2" align="center">试验</td>
    <td height="32" align="left">空载试验：要求运行平稳、动作灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="32" align="left">额定载荷试验：要求运行平稳、动作灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>

</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
