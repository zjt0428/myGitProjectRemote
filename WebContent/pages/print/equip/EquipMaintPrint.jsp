<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>高级保养一览表</title>
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>




  <style type="text/css">
    <!--
    body {
      color:#000000;
      margin:0 auto;
      font-size:14px;
      font-family: "宋体";
    }

    div,table,select,textarea,form,p,h1,h2,h3,h4,h5,fieldset,p{padding:0; margin:0;}
    ul,li,dl,dt,dd{padding:0; margin:0; list-style:none;}
    img{ border:0; padding:0; margin:0}

    .a8_main_detail{width:660px; margin:0 auto;}
    .a8_w100{ width:100%; float:left;}
    .a8_wrod_title{font-size:24px;font-family: "宋体"; font-weight:bold; line-height:32px; text-align:center; padding-bottom:10px; }
    .a8_mar_15{margin-top:15px; margin-right:20px; margin-bottom:5px; width:660px;text-align:right;}

    /*表格样式*/
    .a8_list{
      width:100%;
      font-size:14px;
      border: 1px solid #000000;
      border-collapse: collapse;}

    .a8_list td {
      border-left:1px solid #000000;
      border-bottom:1px solid #000000;
      color:#000000;
      line-height:22px;
      padding:2px;}


    -->
  </style>



</head>

<body>
<center class="Noprint">
  <p align="right" class="a8_mar_15">
    <object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
    <input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
    <input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
  </p>
</center>
<center>

  <div class="a8_main_detail">
    <div class="a8_wrod_title">塔吊例行保养、初级保养、高级保养内容及要求一览表</div>

    <div class="a8_w100" id="page1">

      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
        <tr>
          <td width="50"><strong>序号</strong></td>
          <td width="90" style="line-height:18px;"><strong>保养部位<br>或名称</strong></td>
          <td><strong>保养内容及要求</strong></td>
          <td width="30"><strong>例行</strong></td>
          <td width="30"><strong>初级</strong></td>
          <td width="30"><strong>高级</strong></td>
          <td width="80" style="line-height:18px;"><strong>实际<br />保养内容</strong></td>
        </tr>
        <tr>
          <td rowspan="5">（一）</td>
          <td rowspan="5">基础</td>
          <td align="left">1、基础应无沉降、无积水</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="5">&nbsp;${equipMaint.basics}</td>
        </tr>
        <tr>
          <td align="left">2、地脚螺栓无松动、弯曲和断裂现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、接地装置应连接紧固</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、紧固地脚螺栓应达到规定扭矩</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、地脚螺栓及螺母应涂抹油脂防锈，<br />
            使之达到与空气隔绝</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="10">（二）</td>
          <td rowspan="10">钢结构（塔帽、回转塔身、套架）</td>
          <td align="left">1、标准节、起重臂、平衡臂、塔帽、附墙装置等结构件应无变形、扭曲、脱焊、裂纹等现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="10">&nbsp;${equipMaint.basics}</td>
        </tr>
        <tr>
          <td align="left">2、走道、休息平台、护栏应稳固可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、销轴连接应齐全，轴向止动可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、连接螺栓齐全、紧固可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、紧固标准节连接螺栓应达到规定扭矩</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">6、附墙装置应连接可靠，紧固螺栓连接使之达到规定的扭矩，销轴连接有可靠的轴向止动措施</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">7、标准节、起重臂、平衡臂、塔帽、起升套架、回转总成、驾驶室、走道等结构件应完好可靠，并进行除锈、防腐处理</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">8、各连接螺栓、销轴、开口销应完好可靠，并<br />
            进行除锈、涂油、螺纹清理，更换损坏零件，<br />
            确保各部件连接有效可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">9、应对变形或弯曲的杆件进行调整和更换，修<br />
            整裂损的焊缝。完成主要受力构件的修复和更换<br />
            的单位应符合《中华人民共和国特种设备安全法》的相关规定</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">10、应检查各个走道、休息平台、扶梯、防护圈、护栏及其支撑零件和紧固件，对损坏的部位进行加固、补强或更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="6">（三）</td>
          <td rowspan="6">起升与<br />
            变幅机构（起重臂、平衡臂）</td>
          <td align="left">1、起升机构和变幅机构应运转正常，无异响、<br />
            温升正常，减速机无漏油、渗油现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="6">&nbsp;${equipMaint.amplitude}</td>
        </tr>
        <tr>
          <td align="left">2、变幅小车应活动自如，无偏斜、卡死、滑脱<br />
            等现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、各机械联轴器、销轴、基座及电动机固定<br />
            螺栓应齐全、紧固</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、制动器应灵敏可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、应对变幅小车行走轮、靠轮轴承加注润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">6、起升机构制动器液压油应按夏冬季节更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </div>

    <div class="PageNext"></div>
    <br style="display: none">&nbsp;</br>

    <div class="a8_w100" id="page2">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
        <tr>
          <td width="50"><strong>序号</strong></td>
          <td width="90" style="line-height:18px;"><strong>保养部位<br>或名称</strong></td>
          <td><strong>保养内容及要求</strong></td>
          <td width="30"><strong>例行</strong></td>
          <td width="30"><strong>初级</strong></td>
          <td width="30"><strong>高级</strong></td>
          <td width="80" style="line-height:18px;"><strong>实际<br />保养内容</strong></td>
        </tr>
        <tr>
          <td rowspan="9">（三）</td>
          <td rowspan="9" align="center">起升与<br />
            变幅机构<br />（起重臂、<br />平衡臂）</td>
          <td align="left">7、各机械联轴器、销轴、机座、电机的螺栓应<br />
            拧紧</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="9">&nbsp;${equipMaint.amplitude}</td>
        </tr>
        <tr>
          <td align="left">8、应按说明书要求补充或更换减速器润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">9、检查减速器，更换磨损超标的齿轮、油封、<br />
            轴承、轴套、挡圈等零件，齿轮、轴承应传动<br />
            良好</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">10、应清洗减速器，更换箱内齿轮油</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">11、疏通各个减速器的透气塞，保证其正常工作</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">12、检查和调整联轴器的轴向和径向间隙，紧固<br />
            联轴器、减速器机座、电机的螺栓，使之达到<br />
            说明书要求</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">13、应对电机轴承进行润滑</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">14、应清洗变幅小车滑轮组、轴承，加注润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">15、应检查外露设备防护罩，对损坏的防护罩<br />
            进行修复或更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="10">（四）</td>
          <td rowspan="10">回转机构</td>
          <td align="left">1、回转齿轮与齿圈应无异响</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="10">&nbsp;${equipMaint.rotation}</td>
        </tr>
        <tr>
          <td align="left">2、回转减速机应运转正常无异响、无渗漏油<br />
            现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、清洁回转齿轮、齿圈，涂抹润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、回转支撑滚道内加注润滑脂，直至密封处渗<br />
            出油脂为止</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、按规定扭矩紧固回转支撑连接螺栓</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">6、应检查回转齿轮与齿圈啮合情况，必要时<br />
            进行回转支撑拆检</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">7、检查回转加速器，应运行正常无异响，存在<br />
            异响时应予拆检</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">8、应清洗减速器，更换齿轮油</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">9、检查回转支撑齿轮的啮合精度，必要时予以<br />
            更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">10、检查补充液力耦合器油量</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="5">（五）</td>
          <td rowspan="5">顶升机构</td>
          <td align="left">活塞杆裸露在外部分应做好防腐蚀措施</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="5">&nbsp;${equipMaint.lift}</td>
        </tr>
        <tr>
          <td align="left">1、检查并按说明书要求及时更换液压油，油量<br />
            应充足，无杂质、乳化现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">2、检查电机的旋向，电机的旋向与液压泵所<br />
            标注的箭头方向应一致</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、检查机电连接，电机与液压泵应连接可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、检查油路的连接与油缸，油路及液压泵、<br />
            油缸、控制阀等应无渗漏现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>

    </div>


    <div class="PageNext"></div>
    <br style="display: none">&nbsp;</br>

    <div class="a8_w100" id="page3">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
        <tr>
          <td width="50"><strong>序号</strong></td>
          <td width="90" style="line-height:18px;"><strong>保养部位<br>或名称</strong></td>
          <td><strong>保养内容及要求</strong></td>
          <td width="30"><strong>例行</strong></td>
          <td width="30"><strong>初级</strong></td>
          <td width="30"><strong>高级</strong></td>
          <td width="80" style="line-height:18px;"><strong>实际<br />保养内容</strong></td>
        </tr>
        <tr>
          <td rowspan="6">（五）</td>
          <td rowspan="6" align="center">顶升机构</td>
          <td align="left">5、检查溢流阀及油压表，应正常工作</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="6">&nbsp;${equipMaint.lift}</td>
        </tr>
        <tr>
          <td align="left">6、清洗滤油器，滤油器应无堵塞</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">7、应拆卸清洗控制阀、液压泵，更换滤油器</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">8、应检查油缸的油封，必要时应更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">9、应清洗油箱，更换液压油</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">10、总装后应试运行，整个系统应运行正常</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="15">（六）</td>
          <td rowspan="15" align="center">电气系统</td>
          <td align="left">1、各连接线端子应连接牢固可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="15">&nbsp;${equipMaint.electric}</td>
        </tr>
        <tr>
          <td align="left">2、导线及电缆应无破损漏电现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、配电箱门应关闭完好</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、配电箱应无漏水现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、漏电保护器工作正常、灵敏可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">6、各操作开关应完好、有效</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">7、清除集电器碳刷与滑环上的灰尘与赃物</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">8、检查各行程开关触点，必要时应予修磨，<br />
            使之闭合可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">9、清除控制箱、接触器上的灰尘和铜屑，修磨<br />
            或更换烧蚀磨损的触头，使其接触均匀，间隙<br />
            适当</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">10、清除操作台内部积尘，接线端子和各部接触<br />
            头应无氧化、烧蚀及弧坑现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">11、操作系统应灵敏可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">12、测量接地电阻，接地电阻值应不大于4Ω</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">13、检查所有电线、电缆，应无损伤，及时包扎<br />
            或更换损坏部分</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">14、电机轴承应加注润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">15、电气线路及电器元件对外壳的绝缘电阻应<br />
            不低于0.5MΩ</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="4">（七）</td>
          <td rowspan="4" align="center">安全<br>
            防护装置</td>
          <td align="left">1、起重力矩限位器、起重量限位器、起升高度<br />
            限位器、回转限位器、幅度限位器、动臂变幅<br />
            限制装置、运行限位器应齐全、完好</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="4">&nbsp;${equipMaint.safe}</td>
        </tr>
        <tr>
          <td align="left">2、小车断绳保护、小车防坠落装置、钢丝绳防<br />
            脱装置、爬升防脱装置、抗风防滑装置应齐全、<br />
            完好</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、报警器及风速仪应灵敏可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、起重力矩限制器、起重量限制器、起升高度<br />
            限位器、回转限位、幅度限位应灵敏有效</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>

    </div>

    <div class="PageNext"></div>
    <br style="display: none">&nbsp;</br>


    <div class="a8_w100" id="page4">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
        <tr>
          <td width="50"><strong>序号</strong></td>
          <td width="90" style="line-height:18px;"><strong>保养部位<br>或名称</strong></td>
          <td><strong>保养内容及要求</strong></td>
          <td width="30"><strong>例行</strong></td>
          <td width="30"><strong>初级</strong></td>
          <td width="30"><strong>高级</strong></td>
          <td width="80" style="line-height:18px;"><strong>实际<br />保养内容</strong></td>
        </tr>
        <tr>
          <td rowspan="3">（七）</td>
          <td rowspan="3" align="center">安全<br />
            防护装置</td>
          <td align="left">5、起重力矩限制器、起重量限制器、起升高度<br />
            限位器、回转限位、幅度限位应完好，必要时<br />
            更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="3">&nbsp;${equipMaint.safe}</td>
        </tr>
        <tr>
          <td align="left">6、起重力矩限制器、起重量限制器、起升高度<br />
            限位器、回转限位、幅度限位的触头及接线应<br />
            有效可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">7、变幅小车的断绳保护和断轴保护应有效、可<br />
            靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="5">（八）</td>
          <td rowspan="5" align="center">钢丝绳</td>
          <td align="left">1、钢丝绳在卷筒上应排列整齐</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="5">&nbsp;${equipMaint.wire}</td>
        </tr>
        <tr>
          <td align="left">2、钢丝绳两端应紧固牢靠，绳卡应符合规定</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、钢丝绳应润滑良好，必要时应涂抹润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、钢丝绳上应无沙粒及杂物</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、钢丝绳断丝、磨损、扭曲变形等超出《起重<br />
            机钢丝绳保养、维护、安装、检验和报废》<br />
            GB/T5972要求时，应予更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="3">（九）</td>
          <td rowspan="3">吊钩</td>
          <td align="left">1、应对吊钩进行检查。吊钩防脱装置应完好<br />
            有效</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="3">&nbsp;${equipMaint.hook}</td>
        </tr>
        <tr>
          <td align="left">2、宜保证吊钩安全色清晰、醒目</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、吊钩禁止补焊，有下列情况之一时应予以更换：<br />
            （1）用20倍放大镜观察表面有裂纹<br />
            （2）钩尾和螺纹部分等危险断面及钩筋有永久变形<br />
            （3）挂绳处断面磨损量超过原高度10%<br />
            （4）心轴磨损量超过其直径的5%<br />
            （5）开口度比原尺寸增加15%</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="6">（十）</td>
          <td rowspan="6">卷筒与滑轮</td>
          <td align="left">1、滑轮应运转自如，槽缘无破损，防跳绳装置<br />
            齐全有效</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="6">&nbsp;${equipMaint.drum}</td>
        </tr>
        <tr>
          <td align="left">2、卷筒防跳绳装置有效</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、检查各滑轮绳槽磨损和损坏情况，必要时<br />
            更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、应检修各滑轮的防脱绳装置，确保有效可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、拆检各部滑轮和卷筒，滑轮转动应灵活，无<br />
            卡组或松旷现象</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">6、卷筒和滑轮有下列情况之一的应予以更换：<br />（1）裂纹或轮缘磨损<br />
            （2）卷筒壁磨损量达原壁厚的10%<br />
            （3）滑轮绳槽壁厚磨损量达原壁厚的20%<br />
            （4）滑轮槽底的磨损量超过相应钢丝绳直径的25%</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </div>

    <div class="PageNext"></div>
    <br style="display: none">&nbsp;</br>


    <div class="a8_w100" id="page5">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
        <tr>
          <td width="50"><strong>序号</strong></td>
          <td width="90" style="line-height:18px;"><strong>保养部位<br>或名称</strong></td>
          <td><strong>保养内容及要求</strong></td>
          <td width="30"><strong>例行</strong></td>
          <td width="30"><strong>初级</strong></td>
          <td width="30"><strong>高级</strong></td>
          <td width="80" style="line-height:18px;"><strong>实际<br />保养内容</strong></td>
        </tr>
        <tr>
          <td>(十一)</td>
          <td align="center">配重</td>
          <td align="left" style="line-height:18px;">应对配重进行检查，配重应牢固笃定在平衡臂上</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;${equipMaint.counterweight}</td>
        </tr>
        <tr>
          <td rowspan="4">(十二)</td>
          <td rowspan="4" align="center">驾驶室</td>
          <td align="left" style="line-height:18px;">1、驾驶室应保持整洁卫生，门窗完好，视野<br />
            清晰，底部绝缘板良好</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="4">&nbsp;${equipMaint.cab}</td>
        </tr>
        <tr>
          <td align="left">2、驾驶室与机体的连接反应牢固可靠</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、灭火器在有效期内</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、起重性能表图标齐全</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="5">(十三)</td>
          <td rowspan="5" align="center">整机</td>
          <td align="left" style="line-height:18px;">1、每工作一周，各制动器绞点、吊钩轴承、回<br />
            转支承、安全装置运动部位按说明书要求加注润<br />
            滑油或润滑脂</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="5">&nbsp;${equipMaint.complete}</td>
        </tr>
        <tr>
          <td align="left">2、塔式起重机应保持整洁，无杂物、油污、砂<br />
            浆混凝土</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">3、班后应关闭电源，关（锁）好门窗</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" style="line-height:18px;">4、当油漆剥落、锈蚀严重时，应对整机进行除<br />
            锈、防腐、刷漆作业</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">5、宜每年2年对整机进行一次除锈、防腐、刷漆<br />
            作业</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="6">(十四)</td>
          <td rowspan="6" align="center">制动器</td>
          <td align="left">1、制动器的弹簧、拉杆、销轴和开口销应完好</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td rowspan="6">&nbsp;${equipMaint.brake}</td>
        </tr>
        <tr>
          <td align="left">2、磁铁的活动衔铁不应与线圈铁芯摩擦</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" style="line-height:18px;">3、制动摩擦片应接触均匀，间隙适当，止动<br />
            可靠有效，摩擦片磨损超过50%应予以更换</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left">4、制动器泵的油量应符合使用说明书要求规定</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" style="line-height:19px;">5、拆检制动器，修整止动轮毂表面的拉毛、起<br />
            槽现象。液力推杆制动器应更换液压油；调整<br />
            电磁制动器衔铁行程，检查电磁线圈的固定情况<br />
            ，更换和配齐连接销及开口销</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" style="line-height:19px;">6、制动器零件有下列情况之一的应予以更换：<br />
            （1）可见裂纹<br />
            （2）制动块摩擦衬垫磨损量达原材料厚度的50%<br />
            （3）制动轮表面磨损量达1.5mm-2mm<br />
            （4）弹簧出现塑性变形<br />
            （5）电磁铁杠杆系统空行程超其额定行程的10%</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list" style="border-top-style:none;">
  <tr>
    <td height="40" colspan="2" align="center">根据《建筑施工机械设备维护保养技术规程》 </td>
    <td rowspan="2">塔机概况</td>
  </tr>
  <tr>
    <td>作业人员</td>
    <td>检验监督人员</td>
    </tr>
  <tr>
    <td width="340" height="140">${equipMaint.maintPepoles}</td>
    <td width="120">${equipMaint.practiName}</td>
    <td width="186" align="left" >型号：${equipMaint.equipMaintSchema.equipment.equipSpecificName}<br />
      生产厂家：${equipMaint.equipMaintSchema.equipment.equipVender}<br />
      出厂编号：${equipMaint.equipMaintSchema.equipment.exwSerial}<br />
      生产日期：${equipMaint.equipMaintSchema.equipment.exwDate}<br />
      备案编号：${equipMaint.equipMaintSchema.equipment.recordId}<br />
      保养日期：${equipMaint.lastMaintDate}</td>
  </tr>
</table>


</div>



</div>

<div class="PageNext"></div>
</center>
</body>
</html>
