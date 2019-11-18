<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>新版电梯安装验收表</title>
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
<div class="er_wrod_title" style=" padding-bottom:0px;">
  <p align="center">外用电梯安装验收表 </p>
</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="22" align="right" style="padding-right:10px">AQ2．10．1．6&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="90" height="22" align="center">工程名称</td>
    <td colspan="3">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="22" align="center">施工单位</td>
    <td width="290">&nbsp;${project.unCustomName}</td>
    <td width="90" align="center">项目负责人</td>
    <td>&nbsp;${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td height="22" align="center">分包单位</td>
    <td>&nbsp;${equip.propertyName}</td>
    <td align="center">分包负责人</td>
    <td>&nbsp;${contractLease.paEntLinkMan}</td>
  </tr>
  <tr>
    <td height="22" align="center">安装单位</td>
    <td>&nbsp;${indisSchema.inEntName}</td>
    <td align="center">安装资格情况</td>
    <td>&nbsp;${indisSchema.inEntTitleLevel}</td>
  </tr>
  <tr>
    <td height="22" align="center">检测单位</td>
    <td>&nbsp;${equipDetect.detectEntName}</td>
    <td align="center">资质证号</td>
    <td>&nbsp;${installCO.constructPlanPractiSet.certNum}</td>
  </tr>
  <tr>
    <td height="22" align="center">设备名称</td>
    <td>&nbsp;${equip.equipGenericName}</td>
    <td align="center">规格型号</td>
    <td>&nbsp;${equip.equipSpecificName}</td>
  </tr>
  <tr>
    <td height="22" align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">自编号</td>
    <td>&nbsp;${indisSchema.blockNumber}</td>
  </tr>
  <tr>
    <td height="22" align="center">拟安装高度</td>
    <td colspan="3" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="145" height="40" align="center" style="border-bottom-style:none; border-left-style:none;">m</td>
        <td width="90" align="center" style="border-bottom-style:none;">初安装高度</td>
        <td width="140" align="center" style="border-bottom-style:none;">${contractEquip.initialHeight}m</td>
        <td width="60" align="center" style="border-bottom-style:none;">轿厢</td>
        <td align="center" style="border-bottom-style:none;">t<br />
          人</td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="22" align="center">安装时间</td>
    <td align="center">年  月    日</td>
    <td align="center">验收时间</td>
    <td align="center">年  月    日</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="40" align="center"><strong>序<br />
      号</strong></td>
    <td width="45" align="center"><strong>检查<br />
      项目</strong></td>
    <td width="396" align="center"><strong>检查内容与要求</strong></td>
    <td align="center" width="100"><strong>实测实量实查</strong></td>
    <td align="center"><strong>验收<br />
      结果</strong></td>
  </tr>
  <tr>
    <td rowspan="6" align="center">一</td>
    <td rowspan="6" align="center">资<br />
      料<br />
      部<br />
      分</td>
    <td align="left">起重机械基础(隐蔽工程)验收记录</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">施工电梯垂直度测量记录</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">经审批后的安装(拆除)方案</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">有健全的安全管理制度和岗位责任制</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">荷载标志牌，操作规程牌，机长、司机、定人定机牌，验收安全警 示牌、验收合格牌齐全</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">司机已接受技术交底进厂教育及时经培训，持证上岗资料</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="6" align="center">二</td>
    <td rowspan="6" align="center">结<br />
      构<br />
      部<br />
      分</td>
    <td align="left">各结构防腐好，受力杆件无严重腐蚀</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">各部连接螺栓紧固牢靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">附墙件安装间距不大于9m，预埋件、附墙杆件连接紧固牢靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">本机要求自由高度应符合要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">架体的垂直度偏差不得超过5‰</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">基础平整，无积水且有排水措施</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">三</td>
    <td rowspan="5" align="center">机<br />
      械<br />
      部<br />
      分<br /></td>
    <td align="left">钢丝绳符合安全使用规定、且绳卡数量不少于3个，有鸡心环，滑鞍放置正确，且紧固可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">驱动齿轮副啮隙规定为   mm，且无过度磨损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">减速机构无异响，无漏油</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">导轮、滚轮调整间隙及磨损符合规定</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">刹车装置灵敏度可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">四</td>
    <td rowspan="4" align="center">电<br />
      气<br />
      部<br />
      分<br /></td>
    <td align="left">电缆是否有破损老化，起升下降是否有死卡现象</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">操作盘仪表信号装置是否齐全完好</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">防雷接地连接应符合规定，接地电阻不大于10欧姆</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电气设备与金属结构作保护接零，重复接地电阻小于4欧姆</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>

<div class="PageNext"></div>

<div class="er_w100">
	<div class="er_wrod_title" style=" padding-bottom:0px;">
	  <p align="center">外用电梯安装验收表(续表) </p>
	</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_20" >
  <tr>
    <td width="40" align="center"><strong>序<br />
      号</strong></td>
    <td width="45" align="center"><strong>检查<br />
      项目</strong></td>
    <td width="400" align="center"><strong>检查内容与要求</strong></td>
    <td align="center" width="100"><strong>实测实量实查</strong></td>
    <td align="center" width="75"><strong>验收<br />
      结果</strong></td>
  </tr>
  <tr>
    <td rowspan="7">五</td>
    <td rowspan="7">安全<br />保护<br />装置<br />与安<br />全防<br />护</td>
    <td align="left">上下行程限位装置安装符合要求，灵敏度可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">限速器安装正常，断电灵敏</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电磁磨擦片间隙磨损符合规定要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">箱笼门、底笼门各电气机械连锁开关应齐全，灵敏可靠门栏开启正常</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">底层进出口处有安全防护网，并符合防护要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">各楼层通道口，必须装设防护门及防护围栏，且须牢固，灵活可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">上下联络信号齐备有效，载重量指示器，灵活可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="16" align="center">六<br />
      运<br />
      行<br />
      试<br />
      验</td>
    <td rowspan="3" align="center">空载<br /> 试验</td>
    <td align="left">电气系统、联锁装置、操作系统功能及动作准确</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">安全保护装置动作准确、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">传动机构平稳、无明显冲击、振动及油箱漏油等异常现象</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">额定<br />
      荷载<br />
      试验<br /></td>
    <td align="left">额定载荷试验：    重量：   </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电气系统，联锁装置及操作系统正常，动作准确</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">安全保护装置动作准确，可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">传动机构平稳、无明显冲击、振动及油箱漏油等异常现象</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="6" align="center">超<br />
      载<br />
      试<br />
      验</td>
    <td align="left">超载试验：125％重量 t(新机初安装时)，正常超载试验110％重量 </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电气系统、联锁装置及操作系统正常，动作准确</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">安全保护装置动作准确、可靠</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">金属结构部分不得出现永久变形，可见裂纹、连接损坏、松动等现象</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">传动机构不得有异常现象</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">注：双笼电梯分别对主副梯笼进行试验</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">坠落<br />
      试验</td>
    <td align="left">电梯的结构及连接应无任何损坏及永久变形</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电梯箱笼底板在各方向的水平度偏差，不大于30mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">注：坠落试验后，须调整速度限制器正常状态</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="45" colspan="2" align="center">检测结论</td>
    <td colspan="3">&nbsp;</td>
    </tr>
  <tr>
    <td height="45" colspan="2" align="center">验收结论</td>
    <td colspan="3">&nbsp;</td>
    </tr>
  <tr>
    <td height="66" colspan="2" align="center">验收人<br />
签名</td>
    <td colspan="3" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="110" height="22" align="center" style="border-left-style:none;">总包单位</td>
        <td width="120" align="center">分包单位</td>
        <td width="110" align="center">出租单位</td>
        <td width="110" align="center">安装单位</td>
        <td width="110" align="center">&nbsp;</td>
      </tr>
      <tr>
        <td height="40" align="center" style="border-bottom-style:none; border-left-style:none;"><br />
          &nbsp;&nbsp;年  &nbsp;&nbsp;月  &nbsp;&nbsp;日</td>
        <td align="center" style="border-bottom-style:none;"><span style="border-bottom-style:none; border-left-style:none;"><br />
&nbsp;&nbsp;年  &nbsp;&nbsp;月  &nbsp;&nbsp;日</span></td>
        <td align="center" style="border-bottom-style:none;"><span style="border-bottom-style:none; border-left-style:none;"><br />
&nbsp;&nbsp;年  &nbsp;&nbsp;月  &nbsp;&nbsp;日</span></td>
        <td align="center" style="border-bottom-style:none;"><span style="border-bottom-style:none; border-left-style:none;"><br />
&nbsp;&nbsp;年  &nbsp;&nbsp;月  &nbsp;&nbsp;日</span></td>
        <td align="center" style="border-bottom-style:none;"><span style="border-bottom-style:none; border-left-style:none;"><br />
&nbsp;&nbsp;年  &nbsp;&nbsp;月  &nbsp;&nbsp;日</span></td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="80" colspan="5" valign="top">
	<p style="text-align:left;">监理单位意见：</p>
	<p style="text-align:right;"><br><br><br>
	专业监理工程师：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
	</td>
    </tr>
</table>
	


</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
