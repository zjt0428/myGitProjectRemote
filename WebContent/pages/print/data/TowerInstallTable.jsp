<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机安装自检表</title>
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
<div class="er_wrod_title">塔式起重机安装自检表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" height="24" align="center"> 工 程 名 称</td>
    <td align="center">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="24" align="center"> 工 程 地 址</td>
    <td align="center">&nbsp;${project.address}</td>
    </tr>
  <tr>
    <td height="24" align="center"> 使 用 单 位</td>
    <td align="center">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="24" align="center">安 装 单 位</td>
    <td align="center">&nbsp;${equip.propertyName}</td>
    </tr>
  <tr>
    <td height="24" align="center">产 权 单 位</td>
    <td align="center">&nbsp;${equip.propertyName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style=" border-top-style:none;">
  <tr>
    <td width="100" height="24" align="center">制 造 单 位</td>
    <td width="300" align="left">&nbsp;${equip.equipVender}</td>
    <td width="80" align="center">(许可证号)</td>
    <td align="left">&nbsp;${equip.licenseNumber}</td>
  </tr>
    <tr>
    <td width="100" height="24" align="center">  塔 机 类 型</td>
    <td width="300" align="left">&nbsp;${equip.equipCategoryName}</td>
    <td width="80" align="center">变幅形式</td>
    <td align="left">&nbsp;${equip.amplitudeForm}</td>
  </tr>
  <tr>
    <td height="24" align="center"> 型 号 规 格</td>
    <td align="left">&nbsp;${equip.equipSpecificName}</td>
    <td align="center">制造编号</td>
    <td align="left">&nbsp;${equip.licenseNumber}</td>
  </tr>
  <tr>
    <td height="24" align="center">备 案 编 号</td>
    <td align="left">&nbsp;${equip.recordId}</td>
    <td align="center">出厂日期</td>
    <td align="left">&nbsp;${equip.exwDate}</td>
  </tr>
  <tr>
    <td height="24" align="center">告知受理号</td>
    <td align="left">&nbsp;${indisNotice.acceptNumber}</td>
    <td align="center">设备自编号</td>
    <td align="left">&nbsp;${equip.equipSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td height="24" align="center">安 装 位 置</td>
    <td align="left">&nbsp;${indesSchema.axisPosition}</td>
  </tr>
  <tr>
    <td width="100" align="center"> 性 能 参 数</td>
    <td align="left" style="line-height:26px;">
	<p> 最大起重力矩：${equip.mostMoment}kN·m；最大起重量：${equip.loadingWeight}t</p>
	<p> 最大独立起升高度：${equip.independentHeight}m； 最大幅度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m</p>
	<p>附着最大起升高度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m； 变幅速度：${equip.amplitudeSpeed}m/min</p>
	
	</td>
  </tr>
  <tr>
    <td height="30" align="center">设 备 状 态</td>
    <td align="left" style="line-height:26px;">
	<p>检查时的安装高度：${verifySelf.maxHeight}m；检查时的最大幅度:${verifySelf.checkAmplitude}m</p>
	</td>
  </tr>
  <tr>
    <td align="center">检 查 依 据</td>
    <td align="left">1.《建筑塔式起重机安装检查评定规程》DBJ/T 15—73—2010<br />
      2.《塔式起重机安全规程》GB 5144—2006<br />
      3.《塔式起重机》GB/T 5031—2008；<br />
      4.《起重机械安全规程》GB 6067.1—2010；<br />
      5.《建筑施工塔式起重机安装、使用、拆卸安全技术规程》JGJ 196—2010；<br />
      6.《建筑机械使用安全技术规程》JGJ 33—2001；<br />
      7.《建筑施工安全检查标准》JGJ 59—99；<br />
      8.《施工现场机械设备检查技术规程》JGJ 160—2008；<br />
      9.《建筑起重机械安全监督管理规定》(建设部令第166号)</td>
  </tr>
  <tr>
    <td align="center">检查情况<br />汇    总</td>
    <td align="left">
	<p>检查项目共计100项：</p>
	<p>保证项目共36项，其中第<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格,&nbsp;共<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格；</p>
	<p>一般项目共64项，其中第<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格,&nbsp;共<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格；</p>
	</td>
  </tr>
  <tr>
    <td height="60" align="center">检查结论</td>
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
    <td align="left">保证项目（序号带“★”的项目）全部合格，一般项目中不合格项目数不超过5项，此设备自检结论方为“合格”</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表一)</div>
<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-1&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center" valign="middle">★1</td>
    <td rowspan="10" align="center" valign="middle">1.1<br />
      结构</td>
    <td align="center" valign="middle">1.1.1<br />主要承载<br />结构件</td>
    <td align="left" valign="middle"  style="line-height:20px;"> 塔机主要承载结构件及其焊缝应无裂纹，结构件应<br />
无整体或局部塑性变形，销孔应无塑性变形。连接<br />
件的轴孔应无严重磨损。结构件母材不应出现严重<br />
锈蚀或磨损</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="middle">2</td>
    <td align="center" valign="middle">1.1.2<br />
      结构件接料</td>
    <td align="left" valign="middle"  style="line-height:20px;"> 结构件需要接料时，每个杆件的接料处不应多于一<br />
处</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="middle">3</td>
    <td align="center" valign="middle">1.1.3<br />
      螺栓固定<br />
      轴端挡板</td>
    <td align="left" valign="middle"  style="line-height:20px;">对自升式塔机的小车变幅臂架，其下弦杆连接销轴<br />
不应采用螺栓固定轴端挡板的形式</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="middle">4</td>
    <td align="center" valign="middle">1.1.4<br />
      斜梯</td>
    <td align="left" valign="middle" style="line-height:20px;">斜梯及扶手应安装固定可靠，其与水平面的角度应<br />
≤65°，两边应设置不低于1m高的扶手，扶手间宽<br />
度应≥600mm；斜梯踏板应采用具有防滑性能的金<br />
属材料制作，踏板横向宽度应≥300mm；梯级间隔<br />
应≤300mm</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="middle">5</td>
    <td align="center" valign="middle">1.1.5<br />
      直梯</td>
    <td align="left" valign="middle"  style="line-height:20px;"> 直梯应固定可靠,其与水平面的角度为75°～90°；<br />
直梯两边梁之间的宽度应≥300mm；踏杆间隔为<br />
250～300mm；踏杆与后面结构件间的自由空间(踏<br />
脚间隙)应≥160mm；踏杆直径应不小于16mm,且不<br />
大于40mm</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">6</td>
    <td rowspan="2" align="center" valign="middle">1.1.6<br />
      护圈</td>
    <td align="left" valign="middle" style="line-height:20px;">高于地面2m以上的直梯应设置护圈，护圈应固定可<br />
靠。护圈直径为600～800mm，侧面应用3条或5条竖<br />
向板条连接。当侧面有3条板条时,间距应≤900mm；<br />
当侧面有5条板条时，间距应≤1500mm</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" valign="middle"  style="line-height:20px;">当梯子设于塔身内部,塔身结构满足以下条件,且侧<br />
面结构不允许直径为600mm的球体穿过时,可不设护<br />
圈：<br />
(1)正方形塔身边长≤750mm；(2)等边三角形塔身<br />
边长≤1100mm；(3)直角等腰三角形塔身边长≤<br />
1100mm；或梯子沿塔身对角线方向布置，边长≤<br />
1100mm；(4)筒状塔身直径≤1000mm；(5)快装式<br />
塔机</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="middle">7</td>
    <td align="center" valign="middle">1.1.7<br />
      休息小平台</td>
    <td align="left" valign="middle"  style="line-height:20px;"> 除快装式塔机外，当梯子高度超过10m时应设置休息<br />
小平台，梯子的第一个休息小平台应设在不超过<br />
12.5m的高度处，以后每隔10m内设置一个</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center" valign="middle">8</td>
    <td rowspan="2" align="center" valign="middle">1.1.8<br />
      平台、<br />
      走道</td>
    <td align="left" valign="middle"  style="line-height:20px;"> 在操作、维修处应设置平台、走道、踢脚板和栏<br />
杆。<br />
平台和走道不应有永久变形。离地面2m以上的平台<br />
和走道应用金属材料制作，并具有防滑性能。<br />
平台和走道宽度不应小于500mm</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" valign="middle"  style="line-height:20px;"> 离地面2m以上的平台及走道应设置防止操作人员跌<br />
落的手扶栏杆，其高度不应低于1000mm，在栏杆一<br />
半高度处应设置中间手扶横杆</td>
    <td align="center" valign="middle">&nbsp;</td>
    <td align="center" valign="middle">&nbsp;</td>
  </tr>
 </table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表二)</div>
<div class="er_w100" id="page3" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-2&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
    <tr>
      <td align="center">8</td>
      <td rowspan="2" align="center">1.1<br />
        结构</td>
      <td align="center">1.1.8<br />
平台/走道</td>
      <td align="left">平台和走道边缘应设置高度不小于100mm的踢脚板</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">9</td>
      <td align="center">1.1.9<br />
        钢丝绳<br />
        防脱装置</td>
      <td align="left" style="line-height:24px;">滑轮、起升卷筒及动臂变幅卷筒均应设有钢丝绳防<br />
脱装置，该装置与滑轮或卷筒侧板最外缘的间隙不<br />
应超过钢丝绳直径的20%</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">10</td>
      <td rowspan="5" align="center">1.2<br />
        司机室</td>
      <td align="center">1.2.1<br />
        设置</td>
      <td align="left" style="line-height:24px;">起升高度超过30m的小车变幅塔机,或臂架根部铰点<br />
高度距轨顶或支承面高度超过25m的动臂变幅塔机，<br />
应设置能与塔机一起回转的司机室。司机室不能悬<br />
挂在臂架上，在正常工作情况下，塔机的活动部件<br />
不应撞击司机室</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td rowspan="2" align="center">11</td>
      <td rowspan="2" align="center">1.2.2<br />
        门窗</td>
      <td align="left"> 司机室门应安装锁定装置。司机室外面有走台时，<br />
门应向外开启；通过地板进入司机室时，门应向内<br />
开启；顶棚有活动门时只能向上开启</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="left">司机室门、窗玻璃应使用钢化玻璃或夹层玻璃，窗<br />
玻璃应只能从司机室里面安装。司机室正面玻璃应<br />
设有雨刷器</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td rowspan="2" align="center">12</td>
      <td rowspan="2" align="center">1.2.3<br />
        配置</td>
      <td align="left">司机室应通风、保暖和防雨；内壁应采用防火材<br />
料；地板应铺设绝缘层。当司机室内温度低于5℃<br />
时,应装设非明火取暖装置；当司机室内温度高于<br />
35℃时,应装设防暑通风装置</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="left"> 司机室内应配备符合消防要求的灭火器</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">13</td>
      <td rowspan="5" align="center">1.3<br />
        塔机信<br />息标识<br />与信号</td>
      <td align="center">1.3.1<br />
        结构件可<br />
        追溯标志</td>
      <td align="left">塔机的塔身标准节、臂架节、拉杆、塔顶等主要结<br />
构件应具有可追溯制造日期的永久性标志。同一塔<br />
机的不同规格的塔身标准节应具有永久性的区分标<br />
志</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">14</td>
      <td align="center">1.3.2<br />
        吊钩标志</td>
      <td align="left"> 吊钩应有永久、清晰的额定起重量标志</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">15</td>
      <td align="center">1.3.3<br />
        产品标牌</td>
      <td align="left">应在塔身底部易于观察的位置固定产品标牌，产品<br />
标牌应采用耐用金属，其内容应至少包括：产品名<br />
称和型号规格；产品制造编号和出厂日期；制造厂<br />
名称；制造许可证号</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">16</td>
      <td align="center">1.3.4<br />
        图表标牌</td>
      <td align="left">在塔机司机室内易于观察的位置应设有耐用且清晰<br />
的图表标牌，其内容应符合规定</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td align="center">17</td>
      <td align="center">1.3.5<br />
        操纵装置<br />
        指示信息</td>
      <td align="left">所有操纵装置应标有文字或符号以指示其功能，并<br />
在适当位置指示操作的动作方向。指示信息应易于<br />
识别且清晰可见</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>

  </table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表三)</div>
<div class="er_w100" id="page4" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-3
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td></tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">18</td>
    <td rowspan="4" align="center">1.3<br />
      塔机信<br />
      息标识<br />
      与信号</td>
    <td rowspan="2" align="center">1.3.6<br />
      电源指示<br />
      与声响警<br />
      示信号</td>
    <td align="left"> 在司机室内明显位置应设有总电源开合状况的指示<br />
信号</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">操纵系统中应设有能对工作场地起警报作用的声响<br />
信号</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td align="center">1.3.7<br />
      报警装置</td>
    <td align="left">塔机应装设起重力矩和起重量报警装置,且动作准<br />
确、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">20</td>
    <td align="center">1.3.8<br />
      障碍指示<br />
      信号</td>
    <td align="left" style="line-height:24px;"> 塔顶高度大于30m的塔机存在下列情况之一时,应在<br />
塔顶和臂架端部安装红色障碍指示灯，且该指示灯<br />
的供电不应受停机的影响：<br />
(1)周围无高于塔机顶部的建筑物时；(2)有相碰可<br />
能时；(3)有可能成为飞机起落飞行的危险障碍时</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">21</td>
    <td rowspan="8" align="center">1.4<br />
      电气控制操纵及保护</td>
    <td align="center">1.4.1<br />
      控制回路<br />
      电源</td>
    <td align="left">控制回路电源应取自隔离变压器</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">22</td>
    <td rowspan="2" align="center">1.4.2<br />
      电气设备<br />
      元件</td>
    <td align="left" style="line-height:24px;">电气控制设备和元件应设于柜内,能防雨、防灰尘。<br />
电阻器应设于操作人员不易接触的地方,并有防护。<br />
电气设备安装应牢固，需要防震的电器应有防震措<br />
施。电气连接应接触良好，防止松脱。配电箱内的<br />
连接导线应敷设于线槽或采用盘后X形布线，导线<br />
两端应设有与电气原理图一致的永久性标记。外部<br />
连接导线应敷设于线槽或金属管中。导线、线束应<br />
用卡子固定，以防摆动</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 电气柜(配电箱)应有门锁，门内应有原理图或布线<br />
图、操作指示等,门外应设有有电危险的警示标志</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">23</td>
    <td align="center">1.4.3<br />
      联动操<br />
      纵台</td>
    <td align="left"> 操纵装置应优先采用联动操纵台，联动操纵台应具<br />
有零位自锁和自动复位功能</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">24</td>
    <td rowspan="2" align="center">1.4.4<br />
      遥控式<br />
      操纵台</td>
    <td align="left"> 采用有线遥控式操纵台时，其控制回路电压不应高<br />
于48V，防护等级不低于IP44</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 采用无线遥控式操纵台时，在失控时塔机应能自行<br />
停止工作</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">25</td>
    <td align="center">1.4.5<br />
      电气联锁</td>
    <td align="left">可以在两处或两处以上分别操纵的控制系统，应设<br />
有可靠的电气联锁装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">26</td>
    <td align="center">1.4.6<br />
      外部线路<br />
      保护</td>
    <td align="left">塔机外部线路都应具有短路或接地引起的过电流保<br />
护功能，在线路发生短路或接地故障时，瞬时保护<br />
装置应能分断线路</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表四)</div>
<div class="er_w100" id="page5" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-4
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">27</td>
    <td rowspan="11" align="center">1.4<br />
      电气控制操纵及保护</td>
    <td rowspan="2" align="center">1.4.7<br />
      短路与<br />
      过流保护</td>
    <td align="left">对起重力矩为800kN·m以上的塔机，各机构应设置<br />
单独的自动空气开关作为短路保护</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">塔机的每个机构均应单独设置过流保护装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">28</td>
    <td align="center">1.4.8<br />
      欠压及过压<br />
      保护</td>
    <td align="left" style="line-height:24px;"> 电气系统应设有欠压、过压保护装置，当电压低于<br />
0.85倍额定电压值或高于1.1倍额定电压值时，应<br />
报警或切断电源电路</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★29</td>
    <td align="center">1.4.9<br />
      失压保护</td>
    <td align="left" style="line-height:24px;"> 塔机必须设有失压保护，当供电电源中断后，各用<br />
电设备均应处于断电状态，避免恢复供电时用电自<br />
动启动</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★30</td>
    <td align="center">1.4.10<br />
      零位保护</td>
    <td align="left"> 塔机各机构控制回路必须设置零位保护(机构运行采<br />
用按钮控制除外)，零位保护应有效、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">31</td>
    <td align="center">1.4.11<br />
      相序保护</td>
    <td align="left"> 塔机电源电路中应装设错相及断相保护装置,且有<br />
效、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">32</td>
    <td align="center">1.4.12<br />
      紧急断电<br />
      开关</td>
    <td align="left">应在司机操作方便的地方设置非自动复位的、能切<br />
断塔机总控制电源的紧急断电开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★33</td>
    <td align="center">1.4.13<br />
      超速开关</td>
    <td align="left">对动臂变幅机构，应设置超速开关，且动作准确、<br />
可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">34</td>
    <td rowspan="2" align="center">1.4.14<br />
      预减速<br />
      保护</td>
    <td align="left">具有多挡变速的起升机构应设有自动减速功能，使<br />
吊钩在到达上限位前自动降为低速运行</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 具有多挡变速的变幅机构应设有自动减速功能，使<br />
变幅到达极限位置前自动降为低速运行</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">35</td>
    <td align="center">1.4.15<br />
      带载变幅<br />
      减速保护<br /></td>
    <td align="left" style="line-height:24px;">对最大变幅速度超过40m/min的小车变幅塔机，在<br />
小车向外运行,且起重力矩达到额定值的80%时,变<br />
幅速度应自动转换为不大于40m/min的速度运行</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★36</td>
    <td rowspan="4" align="center">1.5<br />
      爬升<br />
      系统</td>
    <td align="center">1.5.1<br />
      液压系统<br />
      安全装置</td>
    <td align="left" style="line-height:24px;"> 液压系统应有防止过载和液压冲击的安全装置。安<br />
全溢流阀的调定压力不应大于系统额定工作压力的<br />
110%，系统的额定工作压力不应大于液压泵的额定<br />
压力</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★37</td>
    <td align="center">1.5.2<br />
      液压缸<br />
      保护装置</td>
    <td align="left"> 顶升液压缸必须具有可靠的平衡阀或液压锁，平衡<br />
阀或液压锁与液压缸之间不得用软管连接</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">38</td>
    <td align="center">1.5.3<br />
      液压油表</td>
    <td align="left"> 液压油表应在标定的有效期内使用</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★39</td>
    <td align="center">1.5.4<br />
      爬升结构件</td>
    <td align="left"> 顶升支承梁、爬爪、爬升支承座应无变形、可见裂<br />
纹等缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表五)</div>
<div class="er_w100" id="page6" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-5&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">40</td>
    <td rowspan="2" align="center" valign="middle">1.5<br />
      爬升<br />
      系统</td>
    <td align="center">1.5.5<br />
      爬升装置<br />
      防脱保护</td>
    <td align="left"> 自升式塔机应具有防止塔身在正常加节、降节作业<br />
时，爬升装置从塔身支承中或油缸端头从其连接结<br />
构中自行(非人为操作)脱出的功能</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">41</td>
    <td align="center">1.5.6<br />
      导向滚轮<br />
      或滑套</td>
    <td align="left"> 顶升套架导向滚轮应转动灵活，导向滚轮(滑套)应<br />
齐全，安装位置正确，其与塔身标准节主肢(导轨)<br />
的径向间隙应为2～5mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★42</td>
    <td rowspan="3" align="center" valign="middle">2.1<br />
      作业<br />
      环境</td>
    <td align="center">2.1.1<br />
      与障碍物<br />
      安全距离</td>
    <td align="left">塔机的尾部与周围构筑物及外围施工设施之间的安<br />
全距离应≥0.6m。在非工作状态下，塔机的回转部<br />
分应能在360°范围内无障碍地自由旋转</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★43</td>
    <td align="center">2.1.2<br />
      两塔机间<br />
      架设距离</td>
    <td align="left"> 低位塔机的臂架端部与另一台塔机塔身之间的水平<br />
距离应≥2m；<br />
高位塔机的最低位置部件与低位塔机中处于最高位<br />
置部件之间的垂直距离应≥2m</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★44</td>
    <td align="center">2.1.3<br />
      与输电线<br />
      安全距离<br /></td>
    <td align="left" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="7" align="center" style="border-left-style:none; border-bottom-style:none;">塔机任何部位与架空输电线的距离应符合表中的规定，否则必须采取有效的安全防护措施 </td>
        <td width="80" rowspan="2" align="center">线路电压<br />
          (kV)</td>
        <td colspan="2" align="center">安全距离(m)</td>
        </tr>
      <tr>
        <td width="70" align="center">垂直方向</td>
        <td width="70" align="center">水平方向</td>
      </tr>
      <tr>
        <td align="center">＜1</td>
        <td align="center">≥1.5</td>
        <td align="center">≥1.0</td>
      </tr>
      <tr>
        <td align="center">1～15</td>
        <td align="center">≥3.0</td>
        <td align="center">≥1.5</td>
      </tr>
      <tr>
        <td align="center">20～40</td>
        <td align="center">≥4.0</td>
        <td align="center">≥2.0</td>
      </tr>
      <tr>
        <td align="center">60～110</td>
        <td align="center">≥5.0</td>
        <td align="center">≥4.0</td>
      </tr>
      <tr>
        <td align="center" style="border-bottom-style:none;">＞220</td>
        <td align="center" style="border-bottom-style:none;">≥6.0</td>
        <td align="center" style="border-bottom-style:none;">≥6.0</td>
      </tr>
    </table></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">45</td>
    <td rowspan="8" align="center" valign="middle">2.2<br />
      基础<br />
      轨道<br />
      压重<br />
      及配<br />
      重</td>
    <td rowspan="3" align="center">2.2.1<br />
      混凝土基础<br />
      方案</td>
    <td align="left">使用单位应根据塔机原制造商提供的载荷参数设计<br />
制造混凝土基础,混凝土基础应由专业工程师设计,<br />
并形成完整的方案</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 若采用塔机原制造商推荐的混凝土基础,固定支腿、<br />
预埋节和地脚螺栓应按原制造商规定的方法使用</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 采用将标准节预埋在混凝土基础中的安装方式时，<br />
应经塔机制造商认可</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★46</td>
    <td rowspan="3" align="center">2.2.2<br />
      固定支腿<br />
      预埋节、<br />
      地脚螺栓</td>
    <td align="left"> 塔机的固定支腿、预埋节应由原制造厂制造；特殊<br />
情况，需要另行制造时，应有专业制造厂的制造证<br />
明，且其资质等级不应低于原制造厂</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 固定支腿的使用寿命应符合制造厂的规定</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 塔机的地脚螺栓应由有资质的专业制造厂制造</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★47</td>
    <td align="center">2.2.3<br />
      基础强度</td>
    <td align="left"> 基础的混凝土强度等级应符合国家、行业相关技术<br />
标准的规定和塔机制造厂的要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">48</td>
    <td align="center">2.2.4<br />
      基础制作</td>
    <td align="left">实际制作的混凝土基础应与方案或使用说明书的规<br />
定一致。塔机安装基准面的平整度偏差不应大于<br />
1‰。基础应有排水措施，保证基础不积水<br /></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>


<div class="er_wrod_title">塔式起重机安装自检表(续表六)</div>
<div class="er_w100" id="page7" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-6&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="3" align="center">49</td>
    <td rowspan="7" align="center">2.2<br />
      基础<br />
      轨道<br />
      压重<br />
      及配<br />
      重</td>
    <td rowspan="3" align="center">2.2.5<br />
      轨道基础</td>
    <td align="left">塔机轨道的选用和铺设应符合使用说明书的要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 当塔机轨道敷设在地下建筑物之上时，应采取加固<br />
措施</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 路基两侧及中间应设排水措施,保证路基无积水</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">50</td>
    <td align="center">2.2.6<br />
      轨道敷设</td>
    <td align="left">塔机轨道敷设应符合下列要求：<br />
(1)轨道应通过垫块与轨枕可靠地连接，每间隔6m<br />
应设一个轨距拉杆；钢轨接头处必须有轨枕支承,<br />
不得悬空。在使用过程中轨道不应移动。<br />
(2)轨距误差应≤公称值的1‰，其绝对值≤6mm。<br />
(3)钢轨接头间隙应≤4mm；与另一侧钢轨接头的错<br />
开距离应≥1.5m,接头处两轨顶高度差应≤2mm。<br />
(4)塔机安装后,轨道顶面纵、横方向上的倾斜度,对<br />
于上回转塔机应≤3‰；对于下回转塔机应≤5‰。<br />
轨道全程中,轨道顶面任意两点的高度差应＜100mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">51</td>
    <td align="center">2.2.7<br />
      特殊基础</td>
    <td align="left">当采用钢结构平台等特殊基础时，该基础应由专业<br />
工程师设计,并形成完整的方案,且能满足塔机使用<br />
要求。实际制作的特殊基础应与方案的规定一致</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">52</td>
    <td rowspan="2" align="center">2.2.8<br />
      平衡重及<br />
      压重</td>
    <td align="left"> 平衡重、压重应有准确、清晰的重量标识，其安装<br />
位置及数量应与设计要求相符，并保证在其规定位<br />
置上不移位、不脱落,平衡重块之间不得互相撞击</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">当使用散粒物料作平衡重时应使用平衡重箱，平衡<br />
重箱应防水</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">★53</td>
    <td rowspan="6" align="center">2.3<br />
      结构<br />
      件安<br />
      装与<br />
      连接</td>
    <td rowspan="4" align="center">2.3.1<br />
      安装高度<br />
      及垂直度<br /></td>
    <td align="left"> 任何状态下塔机的安装高度不得超过设计允许的最<br />
大高度</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 独立状态下,塔身轴心线的侧向垂直度偏差应≤<br />
4‰</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">附着状态下最高附着点以上塔身轴心线的侧向垂直<br />
度偏差应≤4‰</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 附着状态下最高附着点以下塔身轴心线的侧向垂直<br />
度偏差应≤2‰</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★54</td>
    <td align="center">2.3.2<br />
      销轴连接</td>
    <td align="left"> 结构件采用销轴连接时,其规格及数量应符合使用说<br />
明书或设计方案的要求。销轴不得有缺件、可见裂<br />
纹、严重磨损等缺陷,其轴向定位装置应规范、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★55</td>
    <td align="center">2.3.3<br />
      高强度螺栓<br />
      连接</td>
    <td align="left">主要受力结构件的螺栓连接部位应采用高强度螺栓,<br />
高强度螺栓应有性能等级标志，其型号、规格及数<br />
量应符合塔机使用说明书的要求，且无缺件、裂纹<br />
等缺陷。高强度螺栓连接时,应采用扭矩扳手或专<br />
用扳手按装配技术要求拧紧,螺杆螺纹应露出1～3扣</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表七)</div>
<div class="er_w100" id="page8" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-7&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">56</td>
    <td rowspan="5" align="center">2.3<br />
      结构<br />
      件安<br />
      装与<br />
      连接<br /></td>
    <td align="center">2.3.4<br />
      普通螺栓<br />
      连接</td>
    <td align="left"> 结构件连接采用普通螺栓时，其规格、型号及数量<br />
应符合塔机使用说明书或设计方案的要求，且无缺<br />
件、损坏等缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★57</td>
    <td align="center">2.3.5<br />
      司机室安装<br />
      固定</td>
    <td align="left"> 司机室与悬挂或支承部分的连接必须牢固。可移动<br />
的司机室必须设有可靠的安全锁止装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">58</td>
    <td align="center">2.3.6<br />
      互换性</td>
    <td align="left"> 同规格塔身标准节应能任意组装。主肢结合处外表<br />
面阶差应≤2mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★59</td>
    <td rowspan="2" align="center">2.3.7<br />
      部件替换</td>
    <td align="left">只有经过制造厂的正式书面许可，不同型号塔机间<br />
的结构部件才可替换使用</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 不同制造厂的塔机结构部件禁止替换使用</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★60</td>
    <td rowspan="5" align="center">2.4<br />
      附着<br />
      装置</td>
    <td align="center">2.4.1<br />
      附着方案<br />
      及尺寸参数</td>
    <td align="left" style="line-height:20px;"> 塔机需要附着使用时，必须根据说明书的要求制定<br />
方案，并按方案进行附着。附着方案应包括下列内<br />
容：<br />
(1)附着距离；(2)各道附着装置之间的距离；<br />
(3)附着杆系的布置方式；(4)与建筑物的连接形<br />
式；(5)塔身高出最高附着点的悬臂高度；(6)附<br />
着结构和附着物的承载能力校核；(7)附着结构与<br />
附着物各连接件、预埋件大样图；(8)其他特殊要<br />
求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★61</td>
    <td align="center">2.4.2<br />
      附着装置<br />
      制造证明</td>
    <td align="left" style="line-height:20px;"> 在塔机上安装的附着框架、附着杆应有原制造厂的<br />
制造证明。特殊情况，需要另行制造时，应有专业<br />
制造厂开具的制造证明，且其资质等级不应低于原<br />
制造厂</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★62</td>
    <td rowspan="2" align="center">2.4.3<br />
      附着装置<br />
      安装连接</td>
    <td align="left" style="line-height:20px;">附着装置与塔身节和附着物的安装连接必须安全可<br />
靠，各连接件如螺栓、销轴等必须齐全，不应缺件<br />
或松动，与附着杆相连接的附着物不应有裂纹或损<br />
坏。附着杆与附着物之间不应采用膨胀螺栓连接</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;">附着杆与附着物之间不宜采用焊接连接的方式，当<br />
采用焊接连接时，必须提供下列资料：(1)焊工资<br />
格证书；(2)焊接工艺要求；(3)焊缝尺寸要求；<br />
(4)焊缝外观质量及无损探伤检查结果</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">63</td>
    <td align="center">2.4.4<br />
      倾斜角度</td>
    <td align="left"> 附着杆与水平面之间的倾斜角不得超过10°</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">64</td>
    <td rowspan="2" align="center">2.5<br />
      机构<br />
      及零<br />
      部件</td>
    <td align="center">2.5.1<br />
      吊钩固定<br />
      及防脱</td>
    <td align="left"> 吊钩应转动灵活，各紧固件安装牢固可靠，并设有<br />
防止吊索或吊具非人为脱出的装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★65</td>
    <td align="center">2.5.2<br />
      吊钩缺陷</td>
    <td align="left" style="line-height:20px;"> 吊钩严禁补焊，不得使用铸造吊钩，吊钩不得出现<br />
下列缺陷：(1)表面有裂纹；(2)钩尾和螺纹部分等<br />
危险截面或钩筋有永久性变形；(3)挂绳处截面磨损<br />
量超过原高度的5%；(4)开口度比原尺寸增加10%；<br />
(5)钩身扭转变形超过10°；(6)心轴磨损量超过其<br />
直径的5%</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表八)</div>
<div class="er_w100" id="page9" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-8&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">66</td>
    <td rowspan="13" align="center">2.5<br />
      机构<br />
      及零<br />
      部件</td>
    <td rowspan="2" align="center">2.5.3<br />
      钢丝绳型号<br />
      规格<br /></td>
    <td align="left" style="line-height:20px;">起升和变幅钢丝绳的型号规格应符合设计要求和<br />
《重要用途钢丝绳》GB 8918的规定，并有产品出<br />
厂合格证</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 起升钢丝绳宜使用不旋转钢丝绳。未采用不旋转钢<br />
丝绳时，其绳端应设有防扭装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">67</td>
    <td rowspan="4" align="center">2.5.4<br />
      钢丝绳端部<br />
      固定</td>
    <td align="left" style="line-height:20px;">采用楔形接头固定时，楔套不应有裂纹，楔块不应<br />
松动，紧固件齐全</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 采用金属压制接头固定时，接头不应有裂纹</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;"> 采用压板固定时，卷筒上钢丝绳尾端的固定装置应<br />
有防松或自紧的性能。起升钢丝绳绳端固定压板数<br />
量不得少于2个</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="6" align="center" style="border-left-style:none; border-bottom-style:none;">采用绳夹固定时，绳<br />
          夹数量应符合右表规<br />
          定，绳夹夹座应在钢<br />
          丝绳长头一边，绳夹<br />
          的间距不应小于钢丝<br />
          绳直径的6倍 </td>
        <td width="85" align="center">钢丝绳公称<br />
          直径(mm)</td>
        <td width="85" align="center">钢丝绳夹最少数量(个)</td>
      </tr>
      <tr>
        <td align="center">≤19</td>
        <td align="center">3</td>
      </tr>
      <tr>
        <td align="center">19～32</td>
        <td align="center">4</td>
      </tr>
      <tr>
        <td align="center">32～38</td>
        <td align="center">5</td>
      </tr>
      <tr>
        <td align="center">38～44</td>
        <td align="center">6</td>
      </tr>
      <tr>
        <td align="center" style="border-bottom-style:none;">44～60</td>
        <td align="center" style="border-bottom-style:none;">7</td>
      </tr>
    </table></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">68</td>
    <td rowspan="3" align="center">2.5.5<br />
      钢丝绳安装</td>
    <td align="left">卷筒两侧边缘超过最外层钢丝绳的高度应不小于钢<br />
丝绳直径的2倍</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 钢丝绳在卷筒上应能按顺序整齐排列</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 钢丝绳在放出最大工作长度后，卷筒上的钢丝绳至<br />
少应保留3圈</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">69</td>
    <td align="center">2.5.6<br />
      钢丝绳使用</td>
    <td align="left">钢丝绳应润滑良好，不应与金属结构磨擦，且不得<br />
编结接长使用</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★70</td>
    <td align="center">2.5.7<br />
      钢丝绳<br />缺陷</td>
    <td align="left" style="line-height:20px;"> 钢丝绳不得出现下列缺陷：<br />
(1)绳股断裂；(2)扭结；(3)压扁；(4)弯折；<br />
(5)波浪形变形；(6)笼状畸变；(7)绳股挤出；<br />
(8)钢丝挤出；(9)绳径局部增大；(10)绳径减小,<br />
钢丝绳直径相对公称直径减小3%(对于抗扭钢丝<br />
绳)或减小10%(对于其他钢丝绳)时；(11)外部腐<br />
蚀；(12)内部腐蚀；(13)热力作用损坏；(14)严<br />
重断丝,绳端断丝,断丝的局部聚集</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">71</td>
    <td align="center">2.5.8<br />
      卷筒缺陷</td>
    <td align="left" style="line-height:20px;">卷筒不得出现下列缺陷：<br />
(1)裂纹；(2)轮缘破损；(3)卷筒壁过度磨损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">72</td>
    <td align="center">2.5.9<br />
      滑轮缺陷</td>
    <td align="left"> 滑轮应转动良好，不得出现下列缺陷：<br />
(1)裂纹；(2)轮缘破损；(3)绳槽壁厚过度磨损；<br />
(4)滑轮槽底过度磨损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  
</table>
</div>
<div class="PageNext"></div>
<div style="clear:both;"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表九)</div>
<div class="er_w100" id="page10" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-9&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★73</td>
    <td rowspan="6" align="center">2.5<br />
      机构<br />
      及零<br />
      部件</td>
    <td rowspan="2" align="center">2.5.10<br />
      制动器设置</td>
    <td align="left" style="line-height:24px;"> 塔机的起升、回转、变幅、行走机构都应配备制动<br />
器。起升机构、变幅机构、运行机构应采用常闭制<br />
动器。制动器应调整适宜，制动平稳可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:24px;"> 动臂变幅的塔机，应设有维修变幅机构时能防止卷<br />
筒转动的可靠装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★74</td>
    <td align="center">2.5.11<br />
      制动器缺陷</td>
    <td align="left" style="line-height:24px;"> 制动器零部件不得出现下列缺陷：<br />
(1)可见裂纹；(2)制动块摩擦衬垫过度磨损；<br />
(3)制动轮表面过度磨损；(4)弹簧出现塑性变形；<br />
(5)电磁铁杠杆系统空行程超过其额定行程的10%；<br />
(6)缺件；(7)液压制动器漏油</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">75</td>
    <td align="center">2.5.12<br />
      减速器工作<br />
      状况</td>
    <td align="left" style="line-height:24px;"> 减速器壳体连接螺栓、地脚螺栓不得松动，螺栓连<br />
接件不得有缺损。减速器工作时应无异常声响、振<br />
动、发热和漏油</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">76</td>
    <td align="center">2.5.13<br />
      开式齿轮</td>
    <td align="left">开式齿轮啮合应平稳，不得出现下列缺陷：<br />
(1)裂纹；(2)断齿；(3)齿厚严重磨损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">77</td>
    <td align="center">2.5.14<br />
      车轮缺陷</td>
    <td align="left"  style="line-height:24px;"> 车轮不得出现下列缺陷：<br />
(1)可见裂纹；<br />
(2)踏面厚度磨损量达原厚度的15%；<br />
(3)轮缘厚度磨损量达原厚度的50%</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">78</td>
    <td rowspan="8" align="center">2.6<br />
      电源<br />
      及电<br />
      缆敷<br />
      设、<br />
      接地、<br />
      照明</td>
    <td align="center">2.6.1<br />
      供电系统</td>
    <td align="left"  style="line-height:24px;"> 塔机供电应采用TN-S接零保护系统，供电线路的零<br />
线应与塔机的接地线严格分开</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">79</td>
    <td align="center">2.6.2<br />
      开关箱</td>
    <td align="left"  style="line-height:24px;"> 塔机必须设置专用的开关箱，严禁用同一个开关箱<br />
直接控制2台或2台以上用电设备(含插座)</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">80</td>
    <td align="center">2.6.3<br />
      配电开关</td>
    <td align="left"> 在塔机的专用开关箱内应装设隔离开关、断路器或<br />
熔断器,以及漏电保护器,且动作正常、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">81</td>
    <td rowspan="3" align="center">2.6.4<br />
      电缆敷设</td>
    <td align="left">电缆应采用五芯电缆。电缆可直接敷设，在有机损<br />
伤、化学腐蚀、油污浸蚀的地方，应有防护措施</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 沿塔身垂直悬挂的电缆应使用电缆网套或其他装置<br />
悬挂，每20m设置一个悬挂点</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 电缆需接长时，应采用中间接线盒，接线盒的防护<br />
等级应不低于IP44</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">82</td>
    <td align="center">2.6.5<br />
      电缆卷筒</td>
    <td align="left">轨道式塔机应采用电缆卷筒或类似装置供电。电缆<br />
卷筒应具有张紧装置，电缆收放速度应与塔机运行<br />
速度同步。电缆在卷筒上的连接应牢固</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★83</td>
    <td align="center">2.6.6<br />
      绝缘电阻</td>
    <td align="left"> 主电路和控制电路的对地绝缘电阻应≥0.5 MΩ</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表十)</div>
<div class="er_w100" id="page11" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-10&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★84</td>
    <td rowspan="5" align="center">2.6<br />
      电源<br />
      及电<br />
      缆敷<br />
      设、<br />
      接地、<br />
      照明</td>
    <td rowspan="2" align="center">2.6.7<br />
      接地保护<br /></td>
    <td align="left" style="line-height:20px;">塔机主体结构、轨道、电机机座和所有电气设备的<br />
金属外壳、导线的金属保护管、安全照明的变压器<br />
低压侧等均应可靠接地,接地电阻应≤4Ω,采用多<br />
处重复接地时，其接地电阻应≤10Ω</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">司机室内电气设备的金属外壳应与塔机金属结构进<br />
行电气连接</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">85</td>
    <td rowspan="3" align="center">2.6.8<br />
      司机室照明</td>
    <td align="left">司机室应设有良好的照明，照明的供电不受停机影<br />
响</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"  style="line-height:20px;">固定式照明装置的电源电压不应超过220V。严禁用<br />
金属结构作为照明线路的回路</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;"> 可携式照明装置的电源电压不应超过48V，交流供<br />
电的严禁使用自耦变压器</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★86</td>
    <td rowspan="11" align="center">3.1<br />
      安全<br />
      装置<br />
      及其<br />
      性能</td>
    <td rowspan="2" align="center">3.1.1<br />
      力矩限<br />
      制器</td>
    <td align="left"> 塔机必须安装起重力矩限制器,且动作灵敏、准确、<br />
可靠，限制值应小于额定载荷110%,显示误差≤±5%</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">力矩限制器控制定码变幅的触点和控制定幅变码的<br />
触点应分别设置，且能分别调整</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★87</td>
    <td align="center">3.1.2<br />
      起重量<br />
      限制器</td>
    <td align="left"  style="line-height:20px;"> 塔机应安装起重量限制器,且动作灵敏、准确、可<br />
靠,限制值应小于额定载荷110%,显示误差≤±5%</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★88</td>
    <td align="center">3.1.3<br />
      起升高度<br />
      限位器</td>
    <td align="left"  style="line-height:20px;"> 塔机应安装吊钩上极限位置的起升高度限位器。当<br />
吊钩装置起升到规定极限位置（最小距离800mm）<br />
时，应能停止吊钩起升，但吊钩应能作下降方向运<br />
动</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">89</td>
    <td align="center">3.1.4<br />
      起升下限<br />
      位器</td>
    <td align="left"  style="line-height:20px;"> 当钢丝绳松驰可能造成卷筒乱绳或反卷时应设置下<br />
限位器，在吊钩不能再下降或卷筒上钢丝绳只剩3<br />
圈时应能立即停止下降运动</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★90</td>
    <td rowspan="3" align="center">3.1.5<br />
      幅度限位<br />
      装置</td>
    <td align="left"  style="line-height:20px;"> 对小车变幅塔机，应设置小车行程限位开关和终端<br />
缓冲装置，限位开关应动作准确、可靠,且保证小车<br />
停车时其端部距缓冲装置最小距离为200mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"  style="line-height:20px;">对动臂变幅塔机，应设置臂架低位置和臂架高位置<br />
的幅度限位开关，且动作准确、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"  style="line-height:20px;"> 对动臂变幅塔机，应设置臂架极限位置的限制装置,<br />
该装置应能有效防止臂架向后倾翻且可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">91</td>
    <td rowspan="3" align="center">3.1.6<br />
      回转限位器</td>
    <td align="left" style="line-height:20px;">对回转部分不设集电器或有特殊使用需要的塔机,应<br />
安装回转限位器。正反两个方向均应设置回转限位<br />
开关,开关动作时臂架旋转角度应不大于±540°</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 塔机的回转部分在非工作状态下应能自由旋转</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">对有自锁作用的回转机构，应安装安全极限力矩联<br />
轴器</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>

<div class="er_wrod_title">塔式起重机安装自检表(续表十一)</div>
<div class="er_w100" id="page12" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010803-11
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24">
  <tr>
    <td width="36" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">★92</td>
    <td rowspan="7" align="center">3.1<br />
      安全<br />
      装置<br />
      及其<br />
      性能</td>
    <td align="center">3.1.7<br />
      行走限位<br />
      装置</td>
    <td align="left">对于轨道式塔机，每个运行方向应设置行程限位装<br />
置，其中包括限位开关、缓冲器和终端止挡。限位<br />
开关动作后塔机停车时其端部距缓冲器最小距离为<br />
1m，缓冲器距终端止挡最小距离为1m。塔机在于止<br />
挡装置或与同一轨道上其他塔机相距大于1m处能完<br />
全停住，此时电缆还有足够的富余长度</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★93</td>
    <td align="center">3.1.8<br />
      小车断绳<br />
      保护装置</td>
    <td align="left">小车变幅的塔机，变幅的双向均应设置小车断绳保<br />
护装置，且动作有效、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★94</td>
    <td align="center">3.1.9<br />
      小车防坠<br />
      落装置</td>
    <td align="left">小车变幅的塔机，应设置小车防坠落装置。即使车<br />
轮失效，小车也不得脱离臂架坠落</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★95</td>
    <td align="center">3.1.10<br />
      夹轨器</td>
    <td align="left"> 轨道式塔机必须安装夹轨器,其零件应无缺损,且工<br />
作有效、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">96</td>
    <td align="center">3.1.11<br />
      清轨板</td>
    <td align="left">轨道式塔机的台车架上应安装排障清轨板,清轨板<br />
与轨道顶面之间的间隙不应大于5mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">97</td>
    <td align="center">3.1.12<br />
      防护罩</td>
    <td align="left"> 塔机在正常工作或维修时，其运动对人体可能造成<br />
危险的零部件，应设有防护罩</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">98</td>
    <td align="center">3.1.13<br />
      风速仪</td>
    <td align="left"> 臂架根部铰点高度大于50m的塔机应配备风速仪。<br />
风速仪应安装在塔机顶部的不挡风处。当风速大于<br />
作极限风速时,应能发出停止作业的警报</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★99</td>
    <td rowspan="8" align="center">4.1<br />
      整机<br />
      性能</td>
    <td rowspan="3" align="center">4.1.1<br />
      空载试验</td>
    <td height="32" align="left"> 操作系统、控制系统和联锁装置应动作准确、灵活</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="32" align="left"> 各安全装置应动作灵敏、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="32" align="left"> 各机构应运转正常，制动可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">★<br />100</td>
    <td rowspan="5" align="center">4.1.2<br />
      额定载荷<br />
      试验</td>
    <td height="32" align="left"> 操作系统、控制系统和联锁装置应动作准确、灵活</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="32" align="left"> 各安全装置应动作灵敏、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">起升、变幅、回转、行走各机构应运转正常，制动<br />
可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="32" align="left">关健零、部件不应有裂纹、连接松动、损坏等缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>


</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
