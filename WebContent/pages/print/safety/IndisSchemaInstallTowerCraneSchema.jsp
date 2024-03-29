<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔机安装施工方案</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
<style media="print">
.Noprint {
	display: none;	
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
<div class="main_detail">
  <div class="tj_title">塔机安装施工方案</div>
  <div class="tj_detail">
    <p><strong>一、概况</strong> </p>
    <p class="indt2">根据<u>&nbsp;&nbsp;${indisSchema.project.projectName}&nbsp;&nbsp;</u>施工的需要，拟在<u>&nbsp;&nbsp;${indisSchema.project.address}&nbsp;&nbsp;</u>工程工地，安装1台<u>&nbsp;&nbsp;${indisSchema.equipment.equipSpecificName}&nbsp;&nbsp;</u>型塔吊。建筑总高<u>&nbsp;&nbsp;${indisSchema.overallHeight}&nbsp;&nbsp;</u>米，塔吊需安装总高度为<u>&nbsp;&nbsp;${indisSchema.finalHeight}&nbsp;&nbsp;</u>米。</p>
      <p><strong>二、安装时间、人员</strong> </p>
      <p class="indt2">1、时间：<u>&nbsp;&nbsp;&nbsp;${indisSchema.providedDate}&nbsp;&nbsp;&nbsp;</u> </p>
      <p class="indt2">2、安装人员:<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></p>
    <p class="indt2">3、安全员：<u>&nbsp;&nbsp;${indisSchema.secureDirector}&nbsp;&nbsp;</u> </p>
    <p align="left"><strong>三、塔吊概述 </strong></p>
      <p class="indt2">3.1该型号塔吊采用的是一种上回转水平臂架牵引小车变幅自升塔式起重机，其最大工作臂长56米，最大起重量6000 kg。</p>
      <p class="indt2">3.2 该塔吊的起升机构采用远极比三速电机驱动，最大起升速度为80m/min，最低速度小于4.2m/min,从而实现了轻载高速、重载低速和理想的空钩速度及慢就为速度，大大提高了工作效率。回转机构采用涡流调速、直流制动的力矩电动机，具有较大的过载能力及重载下启动的优良性能。使塔机起、制动更平稳，操作更安全可靠。</p>
      <p class="indt2">3.3 塔机的升高加节，采用液压顶升，使起升高度能随着施工建筑物的升高而加高，而塔吊的起重性能在各种高度下仍保持不变。司机室安装在上转台，视野开阔，操作舒适方便。 </p>
      <p class="indt2">3.4 该塔吊设有各种安全保护装置，包括：起重力矩限制器，最大起升重量限制器，起升高度限制器，回转限制器和变幅限制器等，从而保证了塔机安全可靠的运行。</p>

  <p align="left"><strong>四、塔机安装 </strong></p>
  <p><strong>4.1安装准备工作</strong> </p>
  <p class="indt2">4.1.1了解施工现场布局和土质情况，清理现场的障碍物。 </p>
    <p class="indt2">4.1.2根据建筑物的布置决定塔机基础相对于建筑物的位置，然后按混凝土基础图上所规定的技术要求进行施工。 </p>
    <p class="indt2">4.1.3配备吊装机械，需16t的汽车吊，其起升高度不低于23m的起重机械。购买小底架的用户。汽车吊起升高度应不低于18m。 </p>
    <p class="indt2">4.1.4准备辅助吊装设备、枕木、木楔以及足够的铁丝、索具、绳扣等常用工具。 </p>
    <p class="indt2">4.1.5混凝土基础必须预先浇好，而且要过10天以上才能安装。 </p>
    <p class="indt2">4.1.6电压配置应合理、安全、方便、不得与安装场地相距过远。 </p>
<p><strong>4.2安装要求注意事项 </strong></p>
    <p class="indt2">4.2.1起重机的安装应严格按本说明书所规定的顺序和要求进行。 </p>
    <p class="indt2">4.2.2在安装过程中，作业人员应佩带安全帽和安全带。 </p>
    <p class="indt2">4.2.3在安装过程中,各连接销必须涂黄油后进行安装,装好后的连接销轴孔开口销必须张开,轴端卡板必须紧固,连接螺栓必须拧紧。 </p>
    <p class="indt2">4.2.4本机各部件之间的连接销轴,紧固,连接螺栓必须使用生产厂随机专用件,不得随意自行代用。 </p>
    <p class="indt2">4.2.5本机的电气操作部分,必须严格按线路图执行,不得任意更改。 </p>
    <p class="indt2">4.2.6大底架安装后用户必须加上压重。 </p>
<p><strong>4.3安装程序 </strong></p>
 <p class="indt2">4.3.1安装底架(节)</p>
 <p class="indt2">4.3.1.1 独立式基础节的安装 </p>
<p class="indt2">将四个独立主弦杆组件与一个标准节用高强螺栓紧固，吊放在混凝土基础的垫层上，用水准仪检查四主弦杆上平面，平面度不大于1/1000，未达到要求允许在底架底板下垫板达到要求，按基础图要求捆扎好钢筋骨架，进行二次混凝土浇筑，待地基干透后，接着安装下塔身。 </p>
<p class="indt2">4.3.2· 安装标准节 </p>
<p class="indt2">安装前应用水准仪重新检查基础节上平面的平面度，保证不大于1/1000。 </p>
    <p class="indt2">4.3.2.1将一个标准节I吊装在基础节上，用12个M30*2高强度螺栓副连接，预紧力矩为180kg.m（注意：标准节的踏步方向应在建建筑物完工后能顺利拆下塔机的起重臂）。 </p>
    <p class="indt2">4.3.2.2再吊装一个标准节I,分别用12个M30高强度螺栓副紧固连接，预紧力矩为180kg.m（注意：顶升踏步在同一侧）。 </p>
    <p class="indt2">4.3.2.3装配完紧固螺栓后，用经纬仪或吊线法检查已立好的部分，四根主弦杆翼缘所形成的铅垂直平面、与基础节的上平面垂直度为1/1000。此时标准节基本安装高度为6000mm.</p>
 <p class="indt2">4.3.3吊装套架</p>
  <p class="indt2">先将套架平台与套架拼装牢固，然后将套架吊起套在标准节的外面（注意：套架引进平台应与塔身顶升踏步的方向相反），慢慢放下，将套架上两卡板卡牢在自下往上第二个踏步上（即下面第一个标准节的上端踏步上）。然后将液压泵站吊上平台，接好油管，检查泵站运转情况。 </p>
    <p class="indt2">4.3.4回转部分包括</p>
<p class="indt2">下支座、回转支承、上支座、回转塔身、司机室等部分，并在地面组装好。吊装已组装好的回转部分，用4个Φ40的销轴将下支座与爬升架和利用8-M30×2螺栓将下支座与下塔身连接起来，用4个Φ6的开口销穿入销轴内，并充分张开尾部。在特殊情况下，可以视实际情况分开吊装。 </p>
    <p class="indt2">4.3.5吊装塔顶</p>
<p class="indt2">在地面上将塔顶与平衡臂拉杆第一节用销轴连接好后,再吊装塔顶至回转塔身上,塔顶上焊接装有力矩限制器一侧与司机室朝向相同,用4个Φ50的销轴连接起来,并装好开口销,充分张开尾部。 </p>
    <p class="indt2">4.3.6吊装平衡臂：</p>
  <p class="indt2">在平整的地面上拼装好平衡臂臂节，用高强度销轴连接，并锁紧，安装平衡臂平台、栏杆。将平衡臂栏杆，每根三节中的下部两节组合一端与平衡臂尾部连接，上部一节一端装入塔顶拉板连接销孔（可在地面时装好）。其余部分平直搁在平衡臂上，用绳索扎紧，准备起吊。吊装平衡臂，臂根部分插入上支座连接耳板中，装入销轴，张开开口销，然后臂尾上翘，将三节栏杆连成整根装入销轴，张开开口销。平衡臂尾部慢慢下放，拉杆逐步伸直而受张力，直到平衡臂接近水平。吊装一块2.5t的配重块放置平衡臂安装配重块处（靠近拉杆吊点处） </p>
   <p class="indt2">4.3.7吊装起重臂</p>
<p class="indt2">将起重臂各节按顺序装好，并把载重小车装上，穿绕载重小车的牵引钢丝绳，捆扎载重小车于起重臂根部。在连接好起重臂拉杆后，捆扎在起重臂的弦杆上。将起重臂平行吊起，臂根插进上支座连接耳板中，使其上翘3°左右，作装拉杆准备。将起升钢丝绳经过塔顶顶部其中一个滑轮，再绕过起重臂拉杆板上的滑轮，再绕过塔顶顶部的另一滑轮，将钢丝绳固定在拉杆拉板架的耳板上，固定牢靠后慢慢地开动起升机构，提起拉杆，使拉杆与塔顶的拉板用销轴连接，两支拉杆连接牢靠后，穿好开口销，并将开口销充分张开，慢慢松开起升机构钢丝绳。起重臂拉杆逐步受张力而伸直，起重臂逐步减小上翘而接近水平位置，钢丝绳放松后卸下钢丝绳。 </p>
    <p class="indt2">4.3.8吊装配重块</p>
    <p class="indt2">根据所使用的臂架长度，吊装不同的配重块数量:</p>
  <table border="0" cellspacing="0" cellpadding="0" width="100%" class="listtable">
    <tr>
      <td width="20%" align="center" valign="top">
        臂长(m）</td>
      <td width="40%" align="center" valign="top">配重块数量 </td>
      <td width="40%" align="center" valign="top">配重总重量(kg)</td>
    </tr>
    <tr>
      <td align="center" valign="top">56</td>
      <td align="center" valign="top">4x2.9t+2x1.35t</td>
      <td align="center" valign="top">14300</td>
    </tr>
  </table>
  <p class="indt2">4.3.9穿绕起升钢丝</p>
    <p class="indt2">起升钢丝绳由起升机构引出，经排绳装置至塔顶滑轮、起重量限制器滑轮，再引向载重小车与吊钩穿绕，最后将绳端固定在起重臂端上（未装平衡块之前，严禁穿绕钢丝绳） </p>
    <p class="indt2">4.3.10塔机立塔完毕后进行试运转，并检查各处钢丝绳是否处于正常工作状态，遇有机构磨擦钢丝绳应予排除，工作期间应每周检查两次，并做好记录。 </p>
 <p><strong>4.4塔身标准节的安装方法及顺序 </strong></p>
    <p class="indt2">4.4.1将所需加高的标准节全部吊放在套架引进标准节方向的前方排成一排,以便加节方便。 </p>
    <p class="indt2">4.4.2详细检查各机械部位及电器部份和液压部份,将油缸空载伸缩数次,排除液压系统内的空气,在活塞杆全缩状态,调正活塞杆,将顶升横梁两端的销轴插入标准节就近的踏步销孔中,必须两端同时插牢,否则不允许顶升。检查无误后，吊起一个标准节，在标准节下端的导向连接套孔中插入四个引进滚轮，将标准节吊放在引进台上，准备顶升。 </p>
    <p class="indt2">4.4.3将回转机构制动器处于制动锁紧状态（注意：整个加节顶升过程回转机构应始终处于制动锁紧状态，严禁塔机回转），再吊起一个标准节,并将牵引小车开到：55米臂长开到靠近塔身约10米处，50米臂长开到靠近塔身约13米处，44米臂长开到靠近塔身约20米处，以作顶升调节平衡作用。拆除下支座与标准节之间的连接螺栓副，必须全部拆除，否则不允许顶升。开动液压顶升系统，稍微顶升至下支座四主肢下平面与标准节上平面刚离开2厘米左右即可，检查顶升部分的重心是否落在油缸中心线上，具体可观察套架四面滚轮与标准节的间隙大小是否一致，不一致可调节小车的平位置来达到一致。然后调正好套架滚轮与标准节主肢的间隙，间隙为2至3毫米为好。 </p>
    <p class="indt2">4.4.4继续开动顶升系统，油缸活塞杆伸出约1.5米,套架的爬爪应在标准节顶升踏步的上方时,稍缩活塞杆,使套架的爬爪卡牢在标准节顶升踏步的卡槽内(注意:必须两个爬爪同时卡牢,否则决不允许进行下步操作)。 </p>
    <p class="indt2">4.4.5开动顶升系统，缩回活塞杆，调正活塞杆，使顶升横梁两端的销轴全部插靠插牢在标准节顶升踏步的销孔内（注意：必须两端销轴同时插牢），继续顶升，油缸活塞杆再伸出约1.5米,套架的爬爪应在标准节顶升踏步的上方时,稍缩活塞杆,使套架的爬爪卡牢在标准节顶升踏步的卡槽内(注意:必须两个爬爪同时卡牢)。 </p>
    <p class="indt2">4.4.6经过两次顶升，此时套架上方开口处正好有一个引进标准节的高度，将原放在引进平台的标准节推进塔身位置，将塔身标准节对正下标准节，操纵手柄，徐徐放下他身标准节，对接后，抽出引进滚轮，用螺栓副将引进的塔身标准节与下标准节连接起来，并拧紧，用螺栓副将引进的标准节与下转台四主肢连接坚固。这样就完成了一个塔身标准节的加高工作。 </p>
<p class="indt2">4.4.7按以上方法可完成塔身的加高工作：每次吊装塔身标准节之前，塔身与下支座之间每根主弦杆上至少应紧上一个连接螺栓副，当吊好一节塔身标准节放在引进梁上，牵引小车开到规定的平衡位置后，再拆开这些螺栓副进行顶升过程。 </p>
<p class="indt2">4.4.8顶升工作风力应低于四级风力,决不允许在四级风以上进行顶升作业。 </p>
<p class="indt2">4.4.9顶升工作全部完成后，可将爬升架下降到塔身底部并加以固定，以降低整个塔机的重心和减少迎风面积。 </p>
<p><strong>4.5</strong><strong>安全装置调整方法</strong> </p>
    <p class="indt2">4.5.1调整起升高度限位器:启动起升机构使吊钩侧板上缘离牵引小车下缘钢丝绳，距离四倍率时不小于0.7米，二倍率时不小于1米，把电线接入限位器内，拧紧限位器输入轴与卷筒主轴上的止动螺钉，调整好高度限位器，然后再启动起吊起升机构，下放吊钩10m左右，再以高速提升，到达距离要求时,起升高度限位，切断上升电源，只有下限动作，重复数次，检查是否起升高度限位准确，直到符合要求。顶升到工作高度后，吊钩落地，调整下限位开关使之断开，提升吊钩并再次下降，吊钩落地时应自动断电，不符合要求重新调整，直至符合要求，当塔机高度发生变化时，应重新调整限位器。 </p>
    <p class="indt2">4.5.2调整回转限位器：将牵引小车（空钩）运行到起重臂根部，并保证电源电缆处于不打绞状态，用手指逐个压下微动开关，确认控制左或右的微动开关是否正确，向右回转540°，松开螺钉，调动调整凸轮，使凸轮动作至使微动开关瞬时换接，然后拧紧螺母。同上方法：调整左回转限位器，重复数次，直至符合要求。 </p>
    <p class="indt2">4.5.3调整幅度限位器：启动牵引机构，使载重小车上的吊钩离回转中心3.0m处和离50m（55m）处，分别把电缆接入限位器内。然后再起动牵引机构，载重小车向内开到离回转中心3.0m处、向外开到离回转中心50m(55m)处，幅度限位器中的开关动作，幅度限位，切断牵引机构电机电源，使载重小车不能向内（只能向外）或者不能再向外（只能向内）变幅。重复数次，直至符合要求。 </p>
<p class="indt2">4.5.4调整起重量限位器 </p>
<p class="indt2">4.5.4.1四倍率滑轮组调整 </p>
<p class="indt2">4.5.4.1.1高速挡调整（按起重特性表规定的幅度与对应起重量进进行调整） </p>
<p class="indt2">a,吊重3000Kg,幅度在25m以内，吊钩以低、中、高三档速度均应能正常升降，不允许任何一档产生不能升降现象。 </p>
    <p class="indt2">b，再加重100Kg,并调整测力环上的调整螺钉，使高速档起重量限制器的LHM3动作，这时高速档不能起升，自动转为中速上升运行。在幅度小于18m时，吊重4690kg,调整测力环上的调整螺钉，使LHM2动作，联动台上的蜂鸣器发出讯号，这时中速档不能起升。 </p>
<p class="indt2">c,重复a、b的动作两次，直到调好为止。 </p>
<p class="indt2">4.5.4.1.2低速档调整（幅度不大于13.91m） </p>
<p class="indt2">a.吊重6000kg，吊重以低、中速档，速度应能正常工作，而不允许产生不能起升现象，但操作高速档时，应不能动作。 </p>
<p class="indt2">b．每次加重150kg，以低速升高2～3m，调整测力环上的调整螺钉，使低速档重量限制器LHM1直到6150～6300kg范围动作，限制上升动作，允许下降动作；变幅小车停止向外运动，允许向内运动，司机室联动台上的超重红色信号灯亮。 </p>
<p class="indt2">c.重复a、b动作两次，直到调整好为止。 </p>
<p class="indt2">4.5.4.2二倍率滑轮组校核 </p>
<p class="indt2">a．吊重3000kg,吊重以中、低速档起升，高速应不能动作（幅度不大于25m）。 </p>
<p class="indt2">b．再加载至3050～3100kg，范围应报警断电。 </p>
<p class="indt2">c．重复a、b的全部动作两次。考核其重复性和可靠性。 </p>
<p class="indt2">4.5.5调整力矩限制器 </p>
<p class="indt2">4.5.5.1臂端点调整（调整时载重小车以低速运行），调整力矩限制器上的螺钉，使LDM２? 动作，见c条R断幅度 </p>
<p class="indt2">a、当a=4, 50m （44m）臂长时,起吊Q=1300kg（Q=1650kg）开小车使幅度在39～40m（34～35m）,范围内鸣铃（蜂鸣发光）发讯，中间值较为理想。 </p>
<p class="indt2">b、开回小车，至解除报警为止。 </p>
<p class="indt2">c、重新把下车往外开，直至断电为止，并测出断电开始时小车所在幅度R断，当R断在49～50m（43～44m）之间，即满足要求，中间值较为理想。 </p>
<p class="indt2">d、重复a、b、c、动作三次记录下每次报警时和断电时的幅度，以检验其重复性能。三次小车断电幅度均在规定值范围，即为合格。?? </p>
<p class="indt2">4.5.5.2臂根点校核（载重小车以低速度运行），调整力矩限制器上的螺钉，使LHM12动作，见c条R断幅度。 </p>
<p class="indt2">a、当a=4, 50m臂长时，吊重6000kg，自最小幅度将小车往外开，测出报警时的幅度R报应在10.6～11.1m范围，中间值较为理想 </p>
<p class="indt2">b、开回小车至解除报警为止。 </p>
<p class="indt2">c、重新把小车往外开，测出断电幅度R断，R断应在13.9～12.5m范围，中间值较为理想。 </p>
<p class="indt2">d、重复a、b、c、动作三次，测出的R报和R断在上述范围内即可。 </p>
<p class="indt2">4.5.6倍率变更调整方法 </p>
    <p class="indt2">当起吊在3t以下的重物时，可使用2或4倍率工作，但当起吊3t以上重物时，必须采用4倍率工作。 
    滑轮倍率装置的目的，为的是使吊钩滑轮的绕绳倍率变更，使起升机构起重能力提高一倍而速度降低一倍。 倍率变更方法如下：将吊钩降至地面，取出中间的销轴，然后将上滑轮夹板提升到载重小车下部顶住，这时吊钩滑轮由四倍率变为二倍率。利用同一原理，若需要从二倍率变成四倍率，只需要吊钩落地，放下上滑轮，用销轴将上、下夹板连接即可。 </p>
<p><strong>4.6起重机的试运转 </strong></p>
<p class="indt2">起重机安装调试后应进行试运转 </p>
<p class="indt2">4.6.1空负荷试运转通过负荷试运转检查各种机构是否正确，各限位开关是否可靠。起重臂向左、右方向各回转两次，每次均需检查该方向的回转是否可靠。 </p>
<p class="indt2">4.6.2额定负荷试运转：通过额定负荷试运转检查各机构的工作是否正常，各超载保护机构是否可靠，幅度50m时，吊重为1.3t，幅度3.0-13.91m时，吊重为6t，塔机正常运行。 </p>
<p class="indt2">4.6.2.1检查起重限制器：幅度小于13.91m，起吊6.2t，应有声光报警，并切断起升机构上升的电路。 </p>
    <p class="indt2">4.6.2.2检查起重力矩限制器：幅度小于50m，起吊1.365t，向外变幅，当吊钩达到50m的幅度时，应有鸣铃（蜂鸣发光）报警，载重小车应自行停止运动，吊钩无法上升。司机应时时注意力矩限制器是否符合要求，并做好定期检查工作（最好5-10天为一次，最长不超过15天，避免在无人知道下，塔机超力矩使用，造成事故）。 </p>
<p class="indt2">4.6.2.3起吊6t，幅度13.91m，起重臂左右回转三次。 </p>
<p class="indt2">4.6.2.4起吊6t，载重小车由幅度3.0-13.91m各往返一次 </p>
<p class="indt2">4.6.2.5起吊6t，幅度小于7m,吊钩起升不小于5m,升降三次进行起升机构刹车试验。不允许吊钩有下滑现象。 </p>
<p class="indt2">4.6.2.6起吊1.3t，幅度50m，起重臂左、右方向各回转两次。 </p>
<p class="indt2">4.6.2.7起吊1.3t，载重小车由幅度3.0-50m，往返一次。 </p>
<p class="indt2">4.6.2.8起吊1.3t，同时进行起升与回转两项运动的复合操作，循环一次，变幅与回转的复合操作，循环一次。 </p>
	
  <p><strong> 11 验收项目</strong></p>
  <p>
    <table border="0" cellspacing="0" cellpadding="0" class="tjtable">
      <tr>
        <td  valign="top">11.1 施工方案 </td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.1.1 有专项安全施工组织设计经上级审批，针对性强，能指导施工 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.1.2有专项安全技术交底 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.1.3安装单位及人员具有相应的资质 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2    固定式塔吊的基础 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.1 基础设计和处理必须符合本塔机说明书要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.2 基础设计应有土壤承载力资料及计算，并有上级审批 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.3 基础完工后有履行验收手续 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.4 有良好排水措施 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3    塔吊结构 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.1 结构应无开焊、裂纹及永久性变形 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.2 架体各节点螺栓应紧固 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.3 开口销应完全撬开 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.4 压重、配重应按说明书要求设置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.5 上人爬梯护圈及休息平台设置应符合要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.6 塔身与基础平面的垂直度偏差应不大于4/1000</p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4    绳轮传动系统 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.1 钢丝绳规格应符合要求，断丝和磨损达到报废标准的不得使用 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.2 钢丝绳固定编插缠绕应符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.3 各部份滑轮应转动灵活，无破损。轮槽磨损达到报废标准的不得使用。 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.4 各机构运行平稳，无异常，润滑良好 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.5 各制动器装置应灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5    电气系统 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.1 控制、操纵装置应动作灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.2 仪表、报警装置应齐全完好 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.3 电气各安全保护装置应灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.4 司机室及通道应有良好的照明 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.5 电气系统对塔吊绝缘电阻值应不小于0.5MΩ </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.6 塔机接地、接零应符合规定要求。接地电阻值应小于4Ω </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.7 避雷装置是否符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.8高于30m的塔机应在塔顶及臂架头部装设防撞红色灯 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.9 塔机的任何部位与架空线路应保持安全距离。达不到的，应采取防护措施 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6    安全装置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.1 力矩限制器应灵敏可靠，并有试验报告 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.2 行走、回转、变幅、超高限位装置应灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.3 卷扬机卷筒应按规定设置保险装置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.4 夹轨钳应符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.5 吊钩应有保险装置并完好 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7    附墙装置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7.1 附墙装置应符合说明书要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7.2 塔身与附墙装置连接牢固可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7.3 最高附着点以上塔身悬臂高度应符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.8    试运转 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.8.1 经空载、额定荷载试验，各驱动装置、制动装置、限位装置及保险装置运行无异常且灵敏可靠并有检验报告 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.9    多塔作业 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.9.1 多台塔吊在同一现场作业，应有可靠的防碰撞措施 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.10    操作 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.10.1 司机、指挥持证上岗，指挥信号符合要求 </p></td>
      </tr>
    </table>
  </p>
  <p align="left"><strong>塔机安全使用运行说明 </strong></p>
<p ><strong>一、塔吊在安拆过程中的必须注意以下事项：</strong> </p>
<p class="indt2">1、塔机的安拆作业必须在白天进行，如需加快进度，一定要在具备良好的照明条件的夜间进行安拆，决不能在大风、浓雾和大雨天进行拆装。 </p>
<p class="indt2">2、在拆装上回转和起重臂、平衡臂时，一定要根据该塔机说明书上的要求进行，要始终保持塔机的平衡，严禁只拆装一个臂就中断作业。 </p>
    <p class="indt2">3、在拆装过程中，如突然发生停电、机械故障、天气骤变等情况下不继续作业或作业时间已到休息时，必须使塔机已安装、拆卸的部位达到稳定状态并已锁牢固，所有结构件已经连接牢固，塔顶的重心线外于塔底支承四边中心处，再经过检查确认妥善后方可停止作业。 </p>
<p class="indt2">4、安装时应按说明书的要求使用螺栓、销轴等连接件，高强螺栓紧固应用扭力扳手或专用扳手并有一定的预紧力，螺栓、销轴都要有可靠防松措施或防止轴向移动措施。 </p>
<p><strong>二、塔机应调试检验合格后，方能投入使用。 </strong></p>
<p><strong>三、塔机不许在有故障的情况下使用，尤其不允许拆除安全保护装置使用。 </strong></p>
<p><strong>四</strong>、塔机的使用应定机定人，专人负责，严禁无证操作。非安装、维护、操作人员，未经许可不得攀爬塔机。 </p>
<p><strong>五</strong>、塔机正常工作温度为-20℃—40℃，工作时风速不大于20米/秒。天气预报有10级以上大风时，塔机应用缆风绳加固。 </p>
<p><strong>六</strong>、塔机停止工作后，应保证起重臂随风自由转动。 </p>
<p><strong>七</strong>、夜间工作时，工地现场应具备良好的照明条件。 </p>
<p><strong>八</strong>、在多台塔机的施工现场，应防止空中干涉。 </p>
<p><strong>九</strong>、塔机出现临时故障需检修时，必须切断电源，不允许带电作业。 </p>
<p><strong>十</strong>、塔机必须有良好的电气接地以防雷击，接地电阻小于4欧。 </p>
<p><strong>十一</strong>、塔机工作的安全距离不小于0.5米。 </p>
<p><strong>十二</strong>、司机室禁止存放润滑油，油棉纱及其他易烯易爆品，用电取暖要注意防火。 </p>
<p><strong>十三</strong>、司机必须得到指挥信号后方可操作。操作前必须鸣笛，操作时要精神集中。 </p>
<p><strong>十四</strong>、塔机不许超载使用，不许斜拉斜吊，禁止用于拔桩作业。 </p>
<p><strong>十五</strong>、液压系统、电气系统及各种机构的调整值不许随意更动。 </p>
<p><strong>十六</strong>、起升电机在十分钟内低速运行的累计时间不得超过1.5分钟。 </p>
<p><strong>十七</strong>、塔机作业完毕，吊钩升起，小车应停在臂架端部。 </p>
<p><strong>十八</strong>、塔机顶升作业要严格按施工方案执行，并注意以下事项： </p>
<p class="indt2">1、顶升作业一定要在白天进行。 </p>
<p class="indt2">2、作业过程中，必须有专人指挥，专人照看电源，专人操作液压系统，专人紧固螺栓，非有关操作人员不得登上顶升套操作平台，更不能擅自启动泵阀开头或其他电气设备，操作室内只准一人操作，且必须听从指挥。 </p>
<p class="indt2">3、顶升作业风速应在13米/秒以下。如在顶升作业中风力突然加大时，必须立即停止作业，并紧固上下塔身联接螺栓。 </p>
<p class="indt2">4、顶升时，必须使起重臂和平衡臂处于平衡状态，并把回转制动。严禁回转起重臂和其它作业。顶升过程中如以现其它故障，必须立即停止作业并进行检查，待故障排除后方可继续顶升。如在短期内不能排除故障，应将顶升套架降回原位并及时将各连接螺栓紧固。 </p>
<p class="indt2">5、在拆除回转台与标准节之间的连接螺栓时，如出现最后一处螺栓拆装困难，应将其对角的螺栓重新插入，再采取其他措施  ，不得采取旋转起重臂动作来松动螺栓 </p>
<p class="indt2">6、顶升时，必须确认顶升爬爪稳妥就位后，方可继续下一步动作。 </p>
<p class="indt2">7、顶升到规定高度后，必须先将塔身附在建筑物上，方可继续顶升。 </p>
<p class="indt2">8、顶升前后必须认真做好准备工作和收尾工作。特别是在顶升后，各联接螺栓应按规定坚固，液压操作杆应回到中间位置，液压系统的电源应切断。 </p>
<p><strong>十九、</strong>附着锚固作业时要严格按施工方案第执行，并注意以下事项： </p>
<p class="indt2">1、建筑物的预埋附着支座处的受力强度必须经过验算，能保证塔机在工作或非工作状态下的载荷。 </p>
<p class="indt2">2、应根据建筑物施工总高度、建筑结构特点以及施工进度要求等情况，确定附着方案。 </p>
<p class="indt2">3、附着的间距、间隔、悬臂高度等到应符合使用说明书的要求。 </p>
<p class="indt2">4、在设附着框架和附着杆时，要先用经纬仪观察塔身的垂直度，并通过调整附着杆的距离，保持塔身的垂直度（a、独立高度时垂直度误差应控制在4/1000以下。b、最上一道附着点以下塔身垂直度应控制在2/1000以下）。 </p>
<p><strong>二十、</strong>塔机操作司机应熟悉塔机的性能与使用方法，全面掌握塔机的有关知识，做好塔机维护保养工作，确保塔机安全运行。严格按《塔机安全操作规程》，进行操作使用。 </p>
  </p>
  </div>	
</div>
</center>
</body>
</html>
