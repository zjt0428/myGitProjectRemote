<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机安装自检表</title>
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
<div class="er_wrod_title">施工升降机安装自检表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801&nbsp;
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
  <tr>
    <td height="24" align="center">制 造 单 位</td>
    <td align="right">${equip.equipVender}(许可证号：${equip.licenseNumber}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style=" border-top-style:none;">
  <tr>
    <td width="100" height="24" align="center"> 型 号 规 格</td>
    <td width="300" align="left">&nbsp;${equip.equipSpecificName}</td>
    <td width="80" align="center">传动形式</td>
    <td align="left">${equip.driveForm}</td>
  </tr>
  <tr>
    <td height="24" align="center">SS型驱动形式</td>
    <td align="left">${equip.ssDriveForm}</td>
    <td align="center">制造编号</td>
    <td align="left">&nbsp;</td>
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
    <td align="left">&nbsp;${indisSchema.axisPosition}</td>
  </tr>
  <tr>
    <td width="100" align="center"> 性 能 参 数</td>
    <td align="left" style="line-height:26px;">
	<p>额定载重量：${equip.loadingWeight}kg；额定提升速度:${equip.ratedLiftSpeed}m/min</p>
	<p>额定乘员数：${equip.ratedCrewNum}人；最大独立高度：${equip.independentHeight}m</p>
	<p>最大提升高度：${equip.maxLiftHeight}m；导轨架顶端自由高度：${equip.railUpHeight}m</p>
	
	</td>
  </tr>
  <tr>
    <td height="60" align="center">设 备 状 态</td>
    <td align="left" style="line-height:26px;">
	<p>导轨架架设高度:${equip.railFrameHeight}m；安全器编号：</p>
	<p>安全器型号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;安全器有效期：</p>
	</td>
  </tr>
  <tr>
    <td align="center">检 查 依 据</td>
    <td align="left">
	1.《建筑施工升降机安装检验评定规程》<br />
	2.《施工升降机安全规程》GB 10055-2007<br />
	3.《施工升降机》GB/T 10054—2005；<br />
	4.《起重机械安全规程  第1部分：总则》GB 6067.1-2010<br />
	5.《建筑机械使用安全技术规程》JGJ 33-2001<br />
	6.《建筑施工升降机安装、使用、拆卸安全技术规程》JGJ 215-2010<br />
	7.《施工现场机械设备检查技术规程》JGJ 160-2008<br />
	8.《建筑起重机械安全监督管理规定》(建设部令第166号)
	</td>
  </tr>
  <tr>
    <td align="center">检查情况<br />汇    总</td>
    <td align="left">
	<p>检查项目共计99项：</p>
	<p>保证项目共38项，第<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格,&nbsp;共<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格；</p>
	<p>一般项目共61项，第<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格,&nbsp;共<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>项不合格；</p>
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
		<p>（签名）</p>
		<p>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
		</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="60" align="center">备    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</td>
    <td align="left"> 保证项目（序号带“★”的项目）全部合格，一般项目中不合格项目数不超过5项，此设备自检 结论方为“合格”</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表一)</div>
<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-1&nbsp;
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
    <td align="center">★1</td>
    <td rowspan="11" align="center">1.1<br />
      结构</td>
    <td align="center">1.1.1<br />主要受力<br />构件</td>
    <td align="left" style="line-height:20px;">施工升降机导轨架、传动系统、吊笼立柱、上下承 载梁和附墙架等主要受力构件不得有明显变形、可 见裂纹、开焊和严重锈蚀、磨损等缺陷。标准节立 管壁厚减少量不得大于出厂厚度的25%</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="center">1.1.2笼门尺寸</td>
    <td align="left"><p> 吊笼门框的净高度至少为2.0m,净宽度至少为0.6m<br />
        吊笼门的开启高度不得小于1.8m</p></td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="center">1.1.3<br />
      笼顶防护</td>
    <td align="left" style="line-height:20px;">吊笼应封顶,吊笼顶应设置高度不小于1.1m的护栏,<br />
      护栏的中间高度应设横杆,踢脚板高度不小于100mm</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★4</td>
    <td rowspan="2" align="center">1.1.4<br />
      紧急逃<br />
      离出口</td>
    <td align="left" style="line-height:20px;">吊笼顶部应设有紧急出口,并配有专用扶梯。出口<br />
      应装有向外开启的活板门,并设有电气安全开关,<br />
      且动作有效、可靠</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;">当吊笼顶部未设紧急出口时，应在吊笼立面上装设<br />
      紧急逃离门，门应向吊笼内侧打开或采用滑动型的<br />
      门，并设有电气安全开关，且动作有效、可靠</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="center">1.1.5<br />
      吊笼底板</td>
    <td align="left">吊笼底应防滑、排水，不得存有破损等缺陷</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">6</td>
    <td rowspan="2" align="center">1.1.6<br />
      吊笼与<br />
      对重导向</td>
    <td align="left">吊笼与对重的导向应正确可靠,吊笼采用滚轮导向,<br />
      对重可采用滚轮或滑靴导向</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">吊笼不允许当作对重使用</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td align="center">1.1.7<br />
      对重导轨</td>
    <td align="left">对重导轨不得采用链条或钢丝绳等柔性物体</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">8</td>
    <td rowspan="2" align="center"><p>1.1.8<br />
	钢丝绳防<br />脱装置</p></td>
    <td align="left" style="line-height:20px;">滑轮、卷筒或曳引轮应有钢丝绳防脱装置，该装置<br />
      与滑轮、卷筒或曳引轮外缘的间隙不应大于钢丝绳<br />
      直径的20%，且不大于3mm</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">卷筒两侧边超出最外层钢丝绳的高度不应小于钢丝<br />
      绳直径的两倍</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td align="center">&nbsp;</td>
    <td align="center">1.2.1<br />
      产品标牌</td>
    <td align="left" style="line-height:20px;">应在升降机易于观察的位置设置耐腐蚀的金属产品<br />
      标牌，其内容应包括：产品名称和型号；产品主要<br />
      性能参数；产品出厂编号；产品制造日期；制造商<br />
      名称</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td align="center">&nbsp;</td>
    <td align="center">1.2.2<br />
      限载标志</td>
    <td align="left">应在施工升降机明显部位设置限载、限人标志</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">11</td>
    <td align="center">&nbsp;</td>
    <td align="center">1.2.3<br />
      操作标识</td>
    <td align="left" style="line-height:20px;"><p>在操作位置上应标明控制元件的用途和动作方向,<br />
      指示信息应易于识别且清晰可见<br />
    </p>
      <p></p></td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">12</td>
    <td align="center">&nbsp;</td>
    <td align="center">1.2.4<br />
      标准节标识<br /></td>
    <td align="left">当同一施工升降机的标准节有不同的立管壁厚时,<br />
      标准节应有明确的区分标识</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">13</td>
    <td align="center">&nbsp;</td>
    <td rowspan="2" align="center">1.2.5<br />
      对重标志</td>
    <td align="left"> 对重应根据有关规定的要求涂成警告色</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">&nbsp;</td>
    <td align="left">对重上应标明其自重</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>

<div class="PageNext"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表二)</div>
<div class="er_w100" id="page3" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-2&nbsp;
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
    <td align="center">14</td>
    <td rowspan="2" align="center"><p>1.2<br />信息标志<br />
        与信号</p></td>
    <td align="center">1.2.6<br />
      报警装置</td>
    <td align="left" style="line-height:24px;">应在吊笼内明显位置装设易于接近的报警装置。当<br />
      采用对讲系统时，应保证在施工升降机断电后1h内<br />
      仍能维持正常工作</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">15</td>
    <td align="center">1.2.7<br />
      联络装置<br /></td>
    <td align="left" style="line-height:24px;">施工升降机应设置能显示呼叫楼层的层楼联络装<br />
      置，且工作正常</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">16</td>
    <td rowspan="7" align="center">1.3<br />电气控制<br />
      操纵及保<br />护</td>
    <td align="center">1.3.1<br />
      电气设备<br />防护</td>
    <td align="left" style="line-height:24px;">电气设备应设有防护措施，能防止外界如雨、雪、<br />
      泥浆、灰尘等造成的危害</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td align="center">1.3.2<br />
      电气联锁</td>
    <td align="left">控制吊笼上、下运行的接触器应电气联锁</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">18</td>
    <td align="center">1.3.3<br />
      零位保护</td>
    <td align="left" style="line-height:24px;">机构控制回路应设有零位保护，运行中因故障或失<br />
      压停止运行后，重新恢复供电时，机构不得自行动<br />
      作，应人为将控制器置零位后，机构才能重新启动</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td align="center">1.3.4<br />
      电气保护</td>
    <td align="left" style="line-height:24px;">施工升降机电路应设有短路保护、过载保护、断相<br />
      及错相保护</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">20</td>
    <td align="center">1.3.5<br />
      接地故障<br />
      保护</td>
    <td align="left">当接地出现故障时，主控制电路和其他控制电路中<br />
      的断路器应自动切断</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">21</td>
    <td align="center">1.3.6<br />
      变频调速<br />
      电路保护</td>
    <td align="left">对变频调速施工升降机，控制回路应采取措施避免<br />
      当驱动电机起发电作用时引起的危险</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★22</td>
    <td align="center">1.3.7<br />
      吊笼顶部<br />
      控制装置</td>
    <td align="left" style="line-height:24px;">吊笼顶用作安装、拆卸、维修的平台时，应设有检<br />
      修或拆装时的顶部控制装置。对多速升降机只允许<br />
      吊笼以低速运行。控制装置应安装非自行复位的急<br />
      停开关，任何时候均可切断电路停止吊笼的运行。<br />
      在使用顶部控制装置时,其他操作装置均不起作用,<br />
      但吊笼的安全装置仍应起作用</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">23</td>
    <td rowspan="4" align="center">1.4<br />
      传动系统</td>
    <td rowspan="2" align="center">1.4.1<br />
      密封性能</td>
    <td height="30" align="left">施工升降机的传动系统不应出现滴油现象</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="30" align="left"> 施工升降机的液压系统不应出现滴油现象</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">24</td>
    <td align="center">1.4.2<br />
传动系统<br />
防护</td>
    <td align="left"><p>传动系统及其防护措施应便于维修检查,有关零部<br />
      件应防止雨、雪、泥浆、灰尘等有害物质侵入</p>      </td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">25</td>
    <td align="center">1.4.3<br />
驱动装置</td>
    <td align="left" style="line-height:24px;">每个吊笼至少应有一套驱动装置。驱动电机应通过<br />
      不会脱离啮合的直接传动系统与驱动齿轮相连接。<br />
      吊笼在工作中应始终由动力驱动上升或下降</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>
<div style="clear: both;"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表三)</div>

<div class="er_w100" id="page4" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-3&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">26</td>
    <td rowspan="9" align="center">1.4<br />
      传动<br />
      系统</td>
    <td align="center">1.4.4<br />
齿条连接</td>
    <td align="left" style="line-height:20px;">标准节上的齿条连接应牢固。相邻两齿条的对接<br />
      处，沿齿高方向的阶差不应大于0.3mm，沿长度方<br />
      向的齿距偏差不应大于0.6mm</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">27</td>
    <td rowspan="2" align="center">1.4.5<br />
      齿轮、齿<br />
      条磨损</td>
    <td align="left"> 齿轮的磨损量应符合制造商的规定</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 齿条的磨损量应符合制造商的规定</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">28</td>
    <td align="center">1.4.6<br />
      卷扬驱动</td>
    <td align="left">施工升降机采用卷扬驱动时，应无对重，且吊笼额<br />
      定提升速度应不大于0.63m/s</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★29</td>
    <td rowspan="2" align="center">1.4.7<br />
      制动器<br />
      设置</td>
    <td align="left">传动系统应设有常闭式制动器。不允许采用带式制<br />
      动器</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"  style="line-height:20px;">当采用两套或两套以上的独立传动系统时，每套传<br />
      动系统均应具备各自独立的制动器</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★30</td>
    <td align="center">1.4.8<br />
      手动松闸</td>
    <td align="left" style="line-height:20px;">制动器应具有手动松闸功能，并保证手动施加的作<br />
      用力一旦撤除，制动器立即恢复动作</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★31</td>
    <td align="center">1.4.9<br />
      溢流阀</td>
    <td align="left">液压泵组应装有溢流阀，其压力应调整正确</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★32</td>
    <td align="center">1.4.10<br />
      手动下降<br />
      操作装置</td>
    <td align="left">液压系统应设有旁通阀和制动器的手动松闸装置,<br />
      使吊笼在事故状态时可以实现手动下降</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    <tr>
    <td align="center">33</td>
    <td rowspan="7" align="center">2.1<br />
      作业<br />
      环境</td>
    <td align="center">2.1.1<br />
      防护围栏</td>
    <td align="left">在吊笼和对重的升降通道周围应设置地面防护围<br />
      栏,防护围栏的高度不应低于1.8m</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★34</td>
    <td align="center">2.1.2<br />
      围栏门<br />
      机电联锁</td>
    <td align="left"  style="line-height:20px;">围栏登机门应装有机械锁止装置和电气安全开关，<br />
      使吊笼只有位于底部规定位置时，围栏登机门才能<br />
      开启，且在门开启后吊笼不能起动</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">35</td>
    <td align="center">2.1.3<br />
      防护棚</td>
    <td align="left" style="line-height:20px;">施工升降机地面吊笼出入口上方应设置防护棚，防<br />
      护棚顶部应采用坚实的材料，在任意0.01㎡面积上<br />
      作用1.5kN的力时,不应产生永久变形。建筑物高度<br />
      超过24m时，应设双层防护棚</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">36</td>
    <td align="center">2.1.4<br />
      运动部件<br />
      安全距离</td>
    <td align="left">施工升降机运动部件与除登机平台以外的建筑物和<br />
      固定施工设备之间的距离不应小于0.2m</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">37</td>
    <td align="center">2.1.5<br />
      停层标志</td>
    <td align="left">各停层处应设置安全警示标志及楼层标志</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">38</td>
    <td align="center">2.1.6<br />
      井道封<br />
      闭屏障</td>
    <td align="left">施工升降机安装在建筑物内部井道中间时，应在全<br />
      行程范围井道四周搭设封闭屏障</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★39</td>
    <td align="center">2.1.7<br />
      与输电线<br />
      安全距离</td>
    <td align="left" style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="6" align="center" style="border-left-style:none; border-bottom-style:none;">升降机任何部<br />
          件与外电架空<br />
          线路的边线之<br />
          间的距离应符<br />
          合右表规定，<br />
          否则必须采取<br />
          安全防护措施</td>
        <td width="100" align="center">线路电压 (kV)</td>
        <td width="90" align="center">安全距离 (m)</td>
      </tr>
      <tr>
        <td align="center">＜1</td>
        <td align="center">≥4</td>
      </tr>
      <tr>
        <td align="center">1～10</td>
        <td align="center">≥6</td>
      </tr>
      <tr>
        <td align="center">35～110</td>
        <td align="center">≥8</td>
      </tr>
      <tr>
        <td align="center">154～220</td>
        <td align="center">≥10</td>
      </tr>
      <tr>
        <td align="center" style="border-bottom-style:none;">330～550</td>
        <td align="center" style="border-bottom-style:none;">≥15</td>
      </tr>
    </table></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>


<div class="er_wrod_title">施工升降机安装自检表(续表四)</div>
<div class="er_w100" id="page5" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-4&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">40</td>
    <td rowspan="5" align="center">2.2.1<br />
      基础<br />
      方案</td>
    <td align="center">2.2.1<br />
      基础方案</td>
    <td align="left" style="line-height:24px;">使用单位应根据原制造商提供的载荷参数设计制造<br />
      混凝土基础。混凝土基础应由专业工程师设计，并<br />
      形成完整的方案</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★41</td>
    <td align="center">2.2.2<br />
      基础强度</td>
    <td align="left" style="line-height:24px;">施工升降机基础的混凝土强度等级不应低于C25,并<br />
      符合制造厂的要求</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">42</td>
    <td rowspan="3" align="center">2.2.3<br />
      基础制作</td>
    <td align="left">实际制作的混凝土基础应与方案或使用说明书的规<br />
      定一致</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left"> 基础表面平整度偏差不应大于10mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="26" align="left">基础应有排水措施，保证基础不积水</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">43</td>
    <td rowspan="6" align="center">2.3<br />
      结构件<br />
      安装与<br />
      连接</td>
    <td rowspan="2" align="center">2.3.1<br />
      垂直度<br />
      偏差</td>
    <td align="left" style="line-height:24px;">对钢丝绳式施工升降机，导轨架轴心线对底座水平<br />
      基准面的垂直度偏差不应大于导轨架高度的1.5‰</td>
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
    <td rowspan="2" align="center">44</td>
    <td rowspan="2" align="center">2.3.2<br />
      导轨阶差</td>
    <td align="left" style="line-height:24px;">对齿轮齿条式施工升降机,相邻标准节的立柱结合<br />
      面对接应平直,导轨接点相互错位形成的阶差应满<br />
      足:吊笼导轨不大于0.8mm；对重导轨不大于0.5mm<br /></td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:24px;">对钢丝绳式施工升降机，导轨接点截面相互错位形<br />
      成的阶差应不大于1.5mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★45</td>
    <td align="center">2.3.3<br />
      销轴连接</td>
    <td align="left" style="line-height:24px;">结构件安装连接采用销轴时，其规格及数量应符合<br />
      使用说明书或设计的要求。销轴不得有缺件、可见<br />
      裂纹、严重磨损等缺陷，其轴向定位装置应规范、<br />
      可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★46</td>
    <td align="center">2.3.4<br />
      高强度<br />
      螺栓连接</td>
    <td align="left" style="line-height:24px;">传动系统、导轨架、附墙架、对重系统、齿条、安<br />
      全钩及吊杆底座等部位的安装连接应采用高强度螺<br />
      栓,其性能等级不应低于8.8级，并有相应的性能等<br />
      级标志。所用高强度螺栓的型号、规格及数量应符<br />
      合使用说明书的要求,且无缺件、损坏等缺陷。高<br />
      强度螺栓连接时，应用双螺母或采取其它能防止螺<br />
      母松动的有效措施，并用扭矩扳手或专用扳手按装<br />
      配技术要求拧紧，螺杆螺纹部分应露出1～3扣</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表五)</div>
<div class="er_w100" id="page6" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-5&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">47</td>
    <td rowspan="7" align="center">2.3<br />
      结构件<br />
      安装与<br />
      连接</td>
    <td align="center">2.3.5<br />
      普通螺<br />
      栓连接</td>
    <td align="left">结构件连接采用普通螺栓时，其规格、型号及数量<br />
      应符合施工降机使用说明书或设计方案的要求，且<br />
      无缺件、损坏等缺陷</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★48</td>
    <td rowspan="2" align="center">2.3.6<br />
      安装高度</td>
    <td align="left">升降机导轨架的安装高度超过设计的最大独立高度<br />
      时，必须安装附墙架</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">升降机导轨架的实际安装高度不得超过设计规定的<br />
      最大高度</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★49</td>
    <td align="center">2.3.7<br />
附着装置<br />
证明</td>
    <td align="left">在施工升降机上安装的附墙架应有原制造厂的制造<br />
      证明。特殊情况,需要另行制造时,应有专业制造厂<br />
      出具的制造证明,且其资质等级不应低于原制造厂</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★50</td>
    <td align="center">2.3.8<br />
      附着装置<br />
      安装连接</td>
    <td align="left" style="line-height:19px;">附墙架与导轨架标准节和附着物的安装连接必须安<br />
      全可靠,各连接件如螺栓、销轴等必须齐全,不应缺<br />
      件或松动。与附墙架相连接的附着物不应有裂纹或<br />
      损坏。附墙架与附着物之间不得采用膨胀螺栓连接</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★51</td>
    <td align="center">2.3.9<br />
      附着尺寸<br />
      参数</td>
    <td align="left"  style="line-height:19px;">导轨架顶端自由高度、最低附着点高度、两相邻附<br />
      着点间的距离、附着距离均应符合使用说明书的规<br />
      定。否则必须提供经原制造厂(或专业制造厂)认可<br />
      的专项方案</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">52</td>
    <td align="center">2.3.10<br />
      附墙架倾<br />
      斜角</td>
    <td align="left">附墙架撑杆平面与附着面的法向夹角不应大于8°</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">53</td>
    <td rowspan="6" align="center">2.4<br />
      停层与<br />
      吊笼及<br />
      对重</td>
    <td rowspan="3" align="center">2.4.1<br />
      层门设置</td>
    <td align="left">施工升降机各停层处应设置层门，层门应不能向吊<br />
      笼运行通道一侧开启，层门不应突出到吊笼的升降<br />
      通道上</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">层门应装设机械锁止装置，层门锁止装置及其附件<br />
      应安装牢固，且设在人员不易碰触之处</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">施工升降机机械传动层门的开、关过程应由吊笼内<br />
      乘员操作，不得受吊笼运动的直接控制，且在层门<br />
      靠建筑物一侧的人员应不能进行层门的开、关操作</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">54</td>
    <td rowspan="3" align="center">2.4.2<br />
      层门尺寸</td>
    <td align="left"  style="line-height:19px;">全高度层门开启后的净高度应≥2.0m。特殊情况下<br />
      ,当进入建筑物的入口高度小于2.0m时，层门开启<br />
      后的净高度应≥1.8m。层门下部间隙应≤50mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left"  style="line-height:19px;">高度降低的层门高度应≥1.1m。高度降低的层门两<br />
      侧应设置高度不小于1.1m的护栏，护栏的中间高度<br />
      应设横杆，踢脚板高度应≥100mm。侧面护栏与吊<br />
      笼的间距应为100～200mm。层门下部间隙应≤35mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">层门的净宽度与吊笼进出口宽度之差不得大于<br />
      120mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="left">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>


<div class="er_wrod_title">施工升降机安装自检表(续表六)</div>
<div class="er_w100" id="page7" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-6&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">55</td>
    <td rowspan="10" align="center">2.4<br />
      停层与<br />
      吊笼及<br />
      对重</td>
    <td rowspan="2" align="center">2.4.3<br />
      层门强度</td>
    <td height="130" align="left" valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" valign="middle">对于高度降低的层门,当用1kN的法向力作用到门或<br />
      侧面护栏顶部的任一点,用300N的法向力作用在顶<br />
      杆、中间杆、护脚板任一点时,门或侧面护栏应:<br />
      (1)能够承受且无永久变形；(2)试验之后工作正常</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">56</td>
    <td align="center">2.4.4<br />
      层门与吊<br />
      笼门间距</td>
    <td align="left" valign="middle">全高度层门与关闭的吊笼门间的水平距离应≤200mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">57</td>
    <td align="center">2.4.5<br />
      层门与<br />
      吊笼安<br />
      全距离</td>
    <td align="left" valign="middle">高度降低的层门与正常工作的吊笼运动部件的安全<br />
      距离应≥0.85m；如果施工升降机额定提升速度不<br />
      大于0.7m/s时，此安全距离应≥0.5m</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★58</td>
    <td align="center">2.4.6<br />
      登机平台</td>
    <td align="left" valign="middle">登机平台应独立搭设，平台或通道的脚手板铺设应<br />
      严密、牢固。登机平台正面临边应采用硬质材料防<br />
      护，且防护高度应不低于1.8m</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">59</td>
    <td align="center">2.4.7<br />
      吊笼门与<br />
      平台间距</td>
    <td align="left" valign="middle">装载和卸载时，吊笼门框外缘与登机平台边缘之间<br />
      的水平距离不应大于50mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★60</td>
    <td align="center">2.4.8<br />
      笼门联锁</td>
    <td align="left" valign="middle">吊笼门应装有机械锁止装置和电气安全开关，且动<br />
      作灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">61</td>
    <td align="center">2.4.9<br />
      对重固定</td>
    <td align="left" valign="middle">当对重使用填充物时，应采取措施防止其窜动</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">62</td>
    <td align="center">2.4.10<br />
      缓冲器</td>
    <td align="left" valign="middle">施工升降机底架上应设置吊笼和对重用的缓冲器，<br />
      且安装位置正确，功能正常</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">63</td>
    <td align="center">2.4.11<br />
      越程距离</td>
    <td align="left" valign="middle">当吊笼停在完全压缩的缓冲器上时，对重上面的越<br />
      程余量不应小于0.5m</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">64</td>
    <td rowspan="3" align="center">2.5<br />
      机构及<br />
      零部件</td>
    <td align="center">2.5.1<br />
      齿轮固定</td>
    <td align="left" valign="middle">驱动齿轮和防坠安全器齿轮应直接固定在轴上，不<br />
      能采用摩擦和夹紧的方法连接</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">65</td>
    <td align="center">2.5.2<br />
      齿轮位置</td>
    <td align="left" valign="middle">防坠安全器齿轮位置应低于最低的驱动齿轮</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★66</td>
    <td align="center">2.5.3<br />
      齿轮齿条<br />
      啮合精度</td>
    <td align="left" valign="middle">齿条应全宽度参与啮合，至少应保证有90%的计算<br />
      宽度的啮合。接触长度，沿齿高不应小于40%，沿<br />
      齿长不应小于50%；齿面侧隙应为0.2～0.5mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表七)</div>
<div class="er_w100" id="page8" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-7&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">67</td>
    <td rowspan="13" align="center">2.5<br />
      机构及<br />
      零部件</td>
    <td rowspan="2" align="center">2.5.4<br />
      钢丝绳<br />
      数量</td>
    <td align="left" style="line-height:20px;">齿轮齿条式施工升降机，悬挂对重的钢丝绳不得少<br />
      于2根，且相互独立。</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;">钢丝绳式施工升降机，提升吊笼的钢丝绳或悬挂吊<br />
      笼和对重的钢丝绳均不得少于2根，且相互独立</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">68</td>
    <td rowspan="2" align="center">2.5.5<br />
      钢丝绳型<br />
      号规格</td>
    <td align="left">钢丝绳的型号规格应符合设计要求和标准规范的规<br />
      定，并有产品检验合格证</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">钢丝绳直径应不小于9mm</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">69</td>
    <td rowspan="4" align="center">2.5.6<br />
      钢丝绳端<br />
      部固定</td>
    <td align="left" style="line-height:20px;">采用楔块、楔套连接时，楔套应用钢材制造。楔套<br />
      不应有裂纹，楔块不应松动，紧固件齐全。钢丝绳<br />
      在驱动卷筒上的绳端应采用楔形装置固定</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">采用压板固定时，压板数量不应少于2个，钢丝绳<br />
      尾端的固定装置应有防松或自紧的性能</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">采用金属压制接头固定时，接头不应有裂纹</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="6" align="center" style="border-left-style:none; border-bottom-style:none;">采用绳夹固定时，<br />
          绳夹数量应符合右<br />
          表规定，绳夹夹座<br />
          应在钢丝绳长头一<br />
          边，绳夹的间距不<br />
          应小于钢丝绳直径<br />
          的6倍。悬挂吊笼的<br />
          钢丝绳端部不应采<br />
          用绳夹固定的方式</td>
        <td width="80" align="center">钢丝绳公称<br />
          直径(mm)</td>
        <td width="90" align="center">钢丝绳夹最少<br />
          数量(个)</td>
      </tr>
      <tr>
        <td height="26" align="center">≤19</td>
        <td align="center">3</td>
      </tr>
      <tr>
        <td height="26" align="center">19～32</td>
        <td align="center">4</td>
      </tr>
      <tr>
        <td height="26" align="center">32～38</td>
        <td align="center">5</td>
      </tr>
      <tr>
        <td height="26" align="center">38～44</td>
        <td align="center">6</td>
      </tr>
      <tr>
        <td height="26" align="center" style="border-bottom-style:none;">44～60</td>
        <td align="center" style="border-bottom-style:none;">7</td>
      </tr>
    </table></td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">70</td>
    <td align="center">2.5.7<br />
      张力平衡<br />
      装置</td>
    <td align="left">至少在悬挂钢丝绳的一端应设有一个调节装置用来<br />
      平衡各绳的张力</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">71</td>
    <td rowspan="2" align="center">2.5.8<br />
      钢丝绳排<br />
      列及安全<br />
      圈数</td>
    <td align="left">钢丝绳在卷筒上应排列整齐。卷筒上钢丝绳只允许<br />
      绕一层；若使用自动绕绳系统，允许绕两层</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;">当吊笼停止在最低位置时，留在卷筒上的钢丝绳不<br />
      应少于3圈。</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★72</td>
    <td align="center">2.5.9<br />
      钢丝绳<br />
      缺陷</td>
    <td align="left" style="line-height:20px;">钢丝绳不得编织接长，且不应存有下列缺陷：<br />
      (1)绳股断裂；(2)扭结；(3)压扁；(4)弯折；<br />
      (5)波浪形变形；(6)笼状畸变；(7)绳股挤出；<br />
      (8)钢丝挤出；(9)绳径局部增大；(10)绳径减小，<br />
      钢丝绳直径相对于公称直径减小达7%或更多时；<br />
      (11)外部腐蚀；(12)内部腐蚀；(13)热力作用损<br />
      坏；(14)严重断丝，绳端断丝，断丝的局部聚集</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">73</td>
    <td align="center">2.5.10<br />
      滑轮缺陷</td>
    <td align="left" style="line-height:20px;">滑轮应转动良好，不应存有下列缺陷：<br />
      (1)裂纹；(2)轮缘破损；(3)绳槽壁厚过度磨损；<br />
      (4)滑轮槽底过度磨损</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>
<div style="clear:both;"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表八)</div>
<div class="er_w100" id="page9" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-8&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">74</td>
    <td rowspan="3" align="center">2.5<br />
      机构及<br />
      零部件</td>
    <td align="center">2.5.11<br />
      卷筒缺陷</td>
    <td align="left">卷筒不应存有下列缺陷：<br />
      (1)裂纹；(2)轮缘破损；(3)卷筒壁厚过度磨损</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">75</td>
    <td align="center">2.5.12<br />
      曳引轮<br />
      缺陷</td>
    <td align="left">曳引轮轮槽不应有严重不均匀磨损,磨损不应改变<br />
      槽形</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★76</td>
    <td align="center">2.5.13<br />
      制动器<br />
      缺陷</td>
    <td align="left">制动器不应存有下列缺陷：<br />
      (1)可见裂纹；(2)制动块摩擦衬垫磨损量达原厚度<br />
      的50%；(3)制动轮表面凹凸不平度达1.5mm；(4)制<br />
      动弹簧塑性变形量达到其工作变形量的10%以上；<br />
      (5)缺件；(6)制动器的助推器漏油；(7)液压制动<br />
      器漏油</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">74</td>
    <td rowspan="9" align="center">2.6<br />
      电源电缆<br />
      敷设接地<br />
      照明</td>
    <td align="center">2.6.1<br />
      供电系统</td>
    <td align="left">施工升降机供电应采用TN-S接零保护系统,供电线<br />
      路的零线应与施工升降机的接地线严格分开</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">75</td>
    <td align="center">2.6.2<br />
      开关箱</td>
    <td align="left" style="line-height:20px;">施工升降机必须设置专用的开关箱，开关箱应设在<br />
      底架附近便于操作的位置。严禁用同一个开关箱直<br />
      接控制2台或2台以上用电设备(含插座)</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">76</td>
    <td align="center">2.6.3<br />
      手动开关</td>
    <td align="left">施工升降机应设有主电路各相绝缘的手动开关,且<br />
      应设在便于操作之处。开关手柄应为单向打开式，<br />
      在&quot;关&quot;的位置上可以锁住</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">77</td>
    <td align="center">2.6.4<br />
      电缆敷设</td>
    <td align="left" style="line-height:20px;">施工升降机供电电缆应采用五芯电缆，所有电缆和<br />
      电线的布线及安装应能防止机械损伤。电缆在吊笼<br />
      运行中应自由拖行不受阻碍</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">78</td>
    <td rowspan="2" align="center">2.6.5<br />
      绝缘电阻</td>
    <td align="left">电气元件的对地绝缘电阻应≥0.5MΩ</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电气线路的对地绝缘电阻应≥1MΩ</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">79</td>
    <td align="center">2.6.6<br />
接地保护</td>
    <td align="left" style="line-height:20px;">施工升降机金属结构和所有电气设备的金属外壳、<br />
      导线的金属保护管等均应可靠接地,接地电阻应<br />
      ≤4Ω；采用重复接地时,其接地电阻应≤10Ω</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">80</td>
    <td rowspan="2" align="center">2.6.7<br />
      吊笼照明</td>
    <td align="left">吊笼内应设有永久性的电气照明,只要施工升降机<br />
      在工作，吊笼内都应有照明</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★81</td>
    <td align="left">装设在阴暗处或夜班作业的施工升降机,应在全行<br />
      程上装设足够的照明和明亮的楼层编号标志灯</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★82</td>
    <td rowspan="3" align="center">3.1<br />
      安全装<br />
      置及其<br />
      性能</td>
    <td rowspan="3" align="center">3.1.1<br />
      吊笼防坠<br />
      安全装置</td>
    <td align="left">齿轮齿条式施工升降机的每个吊笼必须装有渐进式<br />
      防坠安全器，不允许采用瞬时式安全器</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">83</td>
    <td align="left" style="line-height:20px;">钢丝绳式施工升降机的每个吊笼应设置兼有防坠、<br />
      限速双重功能的防坠安全装置，且应采用速度触发<br />
      型的防坠安全器。额定提升速度不超过0.63m/s时,<br />
      可采用瞬时式安全器，否则应采用渐进式安全器</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★84</td>
    <td align="left">防坠安全器的型号规格应与施工升降机的型号规格<br />
      相匹配</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>
<div class="PageNext"></div>


<div class="er_wrod_title">施工升降机安装自检表(续表九)</div>
<div class="er_w100" id="page10" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-9&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★85</td>
    <td rowspan="17" align="center"><p>3.1<br />
      安全<br />
      装置<br />
      及其<br />
	  性能</p></td>
    <td rowspan="2" align="center">3.1.2<br />
      对重防坠<br />
      安全装置</td>
    <td align="left">有对重的升降机，当对重质量大于吊笼质量时，应<br />
      设置对重防坠安全装置或双向安全器</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="line-height:20px;">当施工升降机有一施工空间或通道在对重下方时,<br />
      对重应设置兼有防坠、限速双重功能的防坠安全装<br />
      置</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★86</td>
    <td rowspan="3" align="center">3.1.3<br />
      安全器封<br />
      记及使用<br />
      期限</td>
    <td align="left">防坠安全器出厂后动作速度不得随意调整，其速度<br />
      控制部分应有有效的铅封或漆封</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">防坠安全器只能在有效的标定期限内使用，其有效<br />
      标定期限不应超过1年</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 防坠安全器的使用寿命不得超过5年</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★87</td>
    <td rowspan="3" align="center">3.1.4<br />
      防脱轨<br />
      保护</td>
    <td align="left" style="line-height:20px;">施工升降机应装设防止吊笼驶出导轨的措施。该设<br />
      施不仅在正常工作时起作用，在安装、拆卸、维修<br />
      时也应起作用</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">吊笼应装设有效的防脱轨保护装置。当采用安全钩<br />
      时，最高一对安全钩应处于最低驱动齿轮之下</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">除了导轮或滑靴外，对重应装设有效的防脱轨保护<br />
      装置，防止对重从导轨上脱出</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★88</td>
    <td align="center"><p>3.1.5<br />
      行程限位<br />
      开关设置<br />
    </p>
      <p></p></td>
    <td align="left" style="line-height:20px;">施工升降机的每个吊笼必须设置自动复位型的上、<br />
      下行程限位开关，且动作可靠。行程限位开关均应<br />
      由吊笼和相关零件的运动直接触发</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">89</td>
    <td rowspan="3" align="center"><p>3.1.6<br />
      限位开关<br />
      安装位置<br />
    </p>
      <p></p></td>
    <td align="left">当额定提升速度小于0.80m/s时，吊笼触发上限位<br />
      开关后，上部安全距离应不小于1.8m；</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="50" align="left">&nbsp;</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">当吊笼内装有额定载重量下降时，触板触发下限位<br />
      开关使吊笼制停，此时触板离触发下极限开关还应<br />
      有一定行程</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★90</td>
    <td rowspan="2" align="center">3.1.7<br />
      极限开<br />
      关设置</td>
    <td align="left">施工升降机的每个吊笼必须设置非自动复位型的上<br />
      、下极限开关,且动作可靠</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 极限开关不应与限位开关共用一个触发元件</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">91</td>
    <td rowspan="3" align="center">3.1.8<br />
      极限开关<br />
      安装位置</td>
    <td align="left">对齿轮齿条式施工升降机,在正常工作状态下,上<br />
      极限开关与上限位开关之间的越程距离应不小于<br />
      0.15m</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">对钢丝绳式施工升降机,在正常工作状态下,上极限<br />
      开关与上限位开关之间的越程距离应不小于0.5m</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">下极限开关的安装位置应保证:在正常工作状态下,<br />
      下极限开关应在吊笼碰到缓冲器之前动作</td>
    <td valign="middle">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>
</div>

<div class="PageNext"></div>
<div style="clear:both;"></div>

<div class="er_wrod_title">施工升降机安装自检表(续表十)</div>
<div class="er_w100" id="page11" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010801-10&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24" >
  <tr>
    <td width="36" height="24" align="center" valign="middle"><strong>序号</strong></td>
    <td width="66" align="center" valign="middle"><strong>项  类</strong></td>
    <td width="80" align="center" valign="middle"><strong>项目编号</strong></td>
    <td width="320" align="center" valign="middle"><strong>检 查 内 容 及 要 求</strong></td>
    <td width="76" align="center" valign="middle"><strong>检查结果</strong></td>
    <td align="center" valign="middle"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td align="center">92</td>
    <td rowspan="4" align="center">3.1<br />
      安全装<br />
      置及其<br />
      性能</td>
    <td align="center">3.1.9<br />
      减速开关</td>
    <td align="left">对于额定提升速度大于0.7m/s的施工升降机，应设<br />
      有吊笼上、下运行减速开关，其安装位置应保证在<br />
      吊笼触发上、下行程开关之前动作，使高速运行的<br />
      吊笼提前减速</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★93</td>
    <td align="center">3.1.10<br />
      防松绳<br />
      开关</td>
    <td align="left">施工升降机的提升钢丝绳或对重钢丝绳不少于两条<br />
      且相互独立时，应装有由相对伸长量控制的非自行<br />
      复位的防松绳开关，且动作应灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★94</td>
    <td align="center">3.1.11<br />
      超载保护</td>
    <td align="left">施工升降机应装设超载保护装置，该装置应对吊笼<br />
      内载荷、吊笼顶部载荷均有效</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">★95</td>
    <td align="center">3.1.12<br />
      急停开关</td>
    <td align="left">在吊笼的控制装置(含便携式控制装置)上应装有非<br />
      自动复位型的急停开关,且动作灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★96</td>
    <td rowspan="12" align="center">4.1<br />
      整机<br />
      性能</td>
    <td rowspan="3" align="center">4.1.1<br />
      空载试验</td>
    <td align="left"> 操作系统、控制系统应灵活、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">各安全装置应动作灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">吊笼应运行平稳,无异常响声,起、制动正常,无制<br />
      动瞬时滑移现象,在全行程范围内运行无任何障碍</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">★97</td>
    <td rowspan="2" align="center">4.1.2<br />
      曳引试验</td>
    <td align="left">采用曳引驱动的钢丝绳式施工升降机,其平衡系数<br />
      应为0.4～0.5</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">当吊笼或对重停在被其重量压缩的缓冲器上时,提<br />
      升钢丝绳不应松驰；当对重完全压在缓冲器上时,<br />
      空载吊笼应不能被提升</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">★98</td>
    <td rowspan="3" align="center">4.1.3<br />
      额定载<br />
      荷试验</td>
    <td align="left">操作系统、控制系统应灵活、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">各安全装置应动作灵敏、可靠</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">吊笼应运行平稳，无异常响声，起、制动正常</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">★99</td>
    <td rowspan="4" align="center">4.1.4<br />
      坠落试验</td>
    <td align="left">防坠安全装置应动作可靠，将吊笼制停</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">防坠安全器动作时，其电气联锁安全开关也应动作</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">升降机结构和各连接部分应无任何损坏和永久变形</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="5" align="center" style="border-left-style:none; border-bottom-style:none;">渐进式防坠<br />
          安全器的制<br />
          动距离应符<br />
          合右表的<br />规定</td>
        <td width="100" align="center">&nbsp;</td>
        <td width="100" align="center">制动距离(m</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">0.15～1.40</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">0.25～1.60</td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center">0.35～1.80</td>
      </tr>
      <tr>
        <td align="center" style="border-bottom-style:none;">&nbsp;</td>
        <td align="center" style="border-bottom-style:none;">0.55～2.00</td>
      </tr>
    </table></td>
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
