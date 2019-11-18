<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机自检验收表</title>
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
<div class="er_w100" id="page1"  style="page-break-after:always">
<p style="font-size:34px; line-height:50px; font-weight:bold; text-align:center;"><br />
   <strong>施 工 电 梯 安 装 </strong><br />
   <strong>自  检  验  收 </strong><br />
 </p>
<p style="font-size:58px; line-height:80px; font-weight:bold; text-align:center;"><br />报<br /><br />告<br /><br />书<br /><br /></p>

<p>
<table width="550" border="0" cellspacing="0" cellpadding="0"  class="smhf_wrod_utitle">
  <tr>
    <td align="right" width="140"><div style="margin-top:20px;">设备名称<span style="margin-top:20px;font-weight:bold;">：</span></div></td>
    <td align="left" class="smhf_botton_line"><div style="margin-top:20px;"> ${equip.equipGenericName}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;">工程名称<span style="margin-top:20px;font-weight:bold;">：</span></div></td>
    <td align="left" class="smhf_botton_line"><div style="margin-top:20px;">${project.projectName}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;">施工单位<span style="margin-top:20px;font-weight:bold;">：</span></div></td>
    <td align="left" class="smhf_botton_line"><div style="margin-top:20px;">${project.unCustomName}</div></td>
  </tr>
</table>
</p>
<br /><br />
 </div>
<div class="PageNext"></div>

<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" height="30" align="center">设备名称</td>
    <td width="230">&nbsp;${equip.equipGenericName}</td>
    <td width="100" align="center">规格型号</td>
    <td>${equip.equipSpecificName}</td>
  </tr>
  <tr>
    <td height="30" align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">统一编号</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" height="30">拟安装高度</td>
    <td width="75" align="right">米</td>
    <td width="90">初安装高度</td>
    <td width="90">&nbsp;${contractEquip.initialHeight}</td>
    <td width="50" align="center">主笼</td>
    <td width="80" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吨&nbsp;&nbsp;&nbsp;&nbsp;人</td>
    <td width="50" align="center">副笼</td>
    <td align="center">&nbsp;&nbsp;&nbsp;吨&nbsp;&nbsp;&nbsp;人</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" height="30" align="center">安装时间</td>
    <td width="230">&nbsp;</td>
    <td width="100" align="center">验收时间</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td colspan="2" align="center" valign="middle"><strong>检  验<br />
      项  目</strong></td>
    <td width="40" align="center"><strong>序<br />号</strong></td>
    <td width="370" align="center"><strong>检验内容与标准</strong></td>
    <td width="80" align="center"><strong>实测记录</strong></td>
    <td width="70" align="center"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td width="40" rowspan="8" align="center">一</td>
    <td width="59" rowspan="8" align="center">资<br />
      料<br />
      部<br />
      分</td>
    <td align="center">1</td>
    <td align="left">施工电梯基础隐蔽及验收记录（附件1）</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">施工电梯垂直度测量记录（附件2）</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="left">电气系统绝缘和接地电阻测试记录（附件3、附件4）</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td align="left">经审批后的安装（拆除）方案和全员签字的安全技术交底</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="left">拆装专业队资质证书复印件（加盖单位公章）</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td align="left">有健全的安全管理制度和岗位责任制</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td align="left">荷载标志牌、操作规程牌、机长、司机、定人定机牌、安全警示牌、</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td align="left">司机已接受技术交底，进厂教育及经培训持证上岗资料</td>
    <td align="center">有</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td rowspan="6" align="center" valign="middle">二</td>
    <td rowspan="6" align="center">结<br />
      构<br />
      部<br />
      分</td>
    <td align="center">1</td>
    <td align="left">各结构无严重变形和损坏且具有防腐能力</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">各部位联接件联接牢固可靠</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="left">附墙架安装间距不大于9米，预埋件、附墙杆件联接紧固牢靠</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td align="left">本机要求自由度小于     米，应符合要求</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="left">导轨架的安装垂直度偏差应满足说明书或规范规定要求</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td align="left">基础有足够的承载力且平整，无积水且有排水措施</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td rowspan="5" align="center" valign="middle">三</td>
    <td rowspan="5" align="center">机<br />械<br />部<br />分</td>
    <td align="center">1</td>
    <td align="left">钢丝绳符合安全使用规定，且绳卡数量不少于3个，有鸡心环，滑鞍放置正确，且紧固可靠</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">驱动齿轮副啮隙规定为     毫米，且无过度磨损</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="left">减速机构无异响，无漏油</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td align="left">导轮、滚轮调整间隙及磨损符合规定</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="left">刹车装置灵敏可靠</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td rowspan="7" align="center" valign="middle">四</td>
    <td rowspan="7" align="center">电<br />
      气<br />
      部<br />
      分</td>
    <td align="center">1</td>
    <td align="left">电缆是否有破损老化，起升下降是否有发卡现象</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">操作盘仪表信号装置是否齐全完好</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="left">避雷线的接地连接应符合规定，接地电阻不大于10欧姆</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td align="left">电气设备与金属结构接地电阻小于4欧姆</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="left">电气及电气元件对地绝缘电阻不小于0.5MΩ，电气线路对地绝缘电阻不小于1MΩ</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td align="left">供电符合说明书及规范规定要求</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td align="left">电气线路符合说明书及规范规定要求</td>
    <td align="center">符合</td>
    <td align="center">合格</td>
  </tr>
</table>
</div>

<div class="PageNext"></div>

<div class="er_w100" id="page3" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td colspan="2" align="center" valign="middle"><strong>检  验<br />
      项  目</strong></td>
    <td width="40" align="center"><strong>序<br />号</strong></td>
    <td width="370" align="center"><strong>检验内容与标准</strong></td>
    <td width="80" align="center"><strong>实测记录</strong></td>
    <td width="70" align="center"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td width="40" rowspan="9">五</td>
    <td width="59" rowspan="9" align="center">安全<br />
      保护<br />
      装置<br />
      与安<br />
      全防<br />
      护</td>
    <td>1</td>
    <td align="left">上下限位、上下极限装置安装符合要求灵敏可靠</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>2</td>
    <td align="left">安全器安装正常、断电灵敏，不超过规定的标定期限</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>3</td>
    <td align="left">电磁摩擦片间隙磨损符合规定要求</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>4</td>
    <td align="left">箱笼门、底笼门各电气机械连锁开关应齐全，灵敏可靠门栏开启正常</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>5</td>
    <td align="left">底层出入口处有安全防护棚，并符合防护要求</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>6</td>
    <td align="left">各楼层通道口，必须装设防护门及防护围框，且需牢固，灵活可靠</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>7</td>
    <td align="left">上下联络信号齐备有效（载重量指示器灵敏可靠）</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>8</td>
    <td align="left">防坠安全钩按要求安装牢固</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="left">&nbsp;</td>
    <td>&nbsp;</td>
    <td>合格</td>
  </tr>
  <tr>
    <td rowspan="4">六</td>
    <td rowspan="4" align="center" valign="middle">运行<br />
      试验</td>
    <td align="center">1</td>
    <td align="left">空载试验：</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">额定荷载试验：           重量：        吨</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="left">超载试验：125%          重量：        吨</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td align="left">坠落实验：           额定重量：       吨</td>
    <td>符合</td>
    <td>合格</td>
  </tr>
  <tr>
    <td><p align="center">自 </p>
      <p align="center">检 </p>
      <p align="center">验 </p>
      <p align="center">收 </p></td>
    <td height="240" colspan="5" align="center" valign="middle" style="line-height:32px;">
	<p>安装单位（公章）：<br />负责人（或代表）：<br />
	时      间：</p>
	
	</td>
    </tr>
  <tr>
    <td align="center">评<br />
      定<br />
      意<br />
      见<br /></td>
    <td height="240" colspan="5" align="center" valign="middle" style="line-height:32px;">安装单位（公章）：<br />
      负责人（或代表）：<br />时      间：</td>
    </tr>
</table>


</div>


</div>


<div class="PageNext"></div>
</center>
</body>
</html>
