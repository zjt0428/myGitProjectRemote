<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>塔机维护保养记录表</title>
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
            line-height:20px;
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
        <div class="a8_wrod_title">建筑起重机械维护保养记录表</div>
        <div class="a8_w100">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="400" height="30" align="left">工程名称：${equipMaint.equipMaintSchema.equipment.projectName}  </td>
                    <td align="right">GDAQ20612&nbsp;<input name="" type="text" style="width:100px; border:1px solid #000000;"/></td>
                </tr>
            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
                <tr>
                    <td height="28">设备名称</td>
                    <td colspan="3" align="center"><strong>${equipMaint.equipMaintSchema.equipment.equipGenericName}</strong></td>
                    <td>设备型号</td>
                    <td>${equipMaint.equipMaintSchema.equipment.equipSpecificName}</td>
                </tr>
                <tr>
                    <td width="80" height="28">出厂编号</td>
                    <td width="120">${equipMaint.equipMaintSchema.equipment.exwSerial}</td>
                    <td width="80">备案编号</td>
                    <td width="120">${equipMaint.equipMaintSchema.equipment.recordId}</td>
                    <td width="80">自编号</td>
                    <td width="180">${equipMaint.equipMaintSchema.equipment.equipSerial}</td>
                </tr>
                <tr>
                    <td height="28">出厂日期</td>
                    <td colspan="3">${equipMaint.equipMaintSchema.equipment.exwDate}</td>
                    <td>产权单位</td>
                    <td>${equipMaint.equipMaintSchema.equipment.propertyName}</td>
                </tr>
                <tr>
                    <td height="28">维保单位</td>
                    <td colspan="3">${equipMaint.equipMaintSchema.equipment.propertyName}</td>
                    <td style="line-height:15px;">上次维保<br />
                        日    期</td>
                    <td>${equipMaint.lastMaintDate}</td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list" style="border-top-style:none;">
                <td colspan="2" width="80">项    类</td>
                <td width="403">维护保养内容</td>
                <td width="70">技术要求</td>
                <td width="107">备注</td>
                <tr>
                    <td width="24">清洁润滑</td>
                    <td width="49">各机构<br />、传动<br />系统、<br />部件润<br />滑</td>
                    <td align="left"><p>起升机构变速箱油量、油质是否符合要求               □ <br />
                        回转机构减速器油量、油质是否符合要求               □ <br />
                        变幅机构减速器油量、油质是否符合要求，             □ <br />
                        卷筒轴承、吊钩止推轴承、回转支座装置、各滑轮及内部轴承、<br />
                        运动部分滑动部件轴承润滑是否良好                   □ <br />
                        起升钢丝绳、变幅钢丝绳润滑是否良好                 □ <br />
                        制动器杠杆各铰点润滑是否良好                       □ <br />
                        滑轮润滑否良好                                 □ </p>
                        补充内容：</td>
                    <td rowspan="2" align="center">按设备<br />
                        使用说<br />明书及<br />相关标<br />准规程</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>检查调整更换</td>
                    <td>部件附<br />件连接<br />件、各<br />机构制<br />动器和<br />限位开<br />关与机<br />械元件<br />间隙调<br />整更换<br />、钢丝<br />绳、吊<br />具、索<br />具、链<br />条、滑<br />轮缺损<br />情况</td>
                    <td align="left" valign="top">各机构工作运行平稳无震动和异响                     □ <br />
                        各机构构件应完好无异常                             □ <br />
                        各机构制动器制动灵敏有效                           □ <br />
                        各机构制动器磨擦片等构件应完好，未达报废标准       □ <br />
                        力矩限制器功能符合要求，工作灵敏可靠，固定及构件 <br />
                        完好无损                                           □ <br />
                        起重量限制器功能符合要求，工作灵敏可靠，固定及构件 <br />
                        完好无损                                           □ <br />
                        回转限位器功能符合要求，工作灵敏可靠，固定及构件 <br />
                        完好无损                                           □ <br />
                        幅度限位器功能符合要求，工作灵敏可靠，固定及构件 <br />
                        完好无损                                           □ <br />
                        起升高度限位器功能符合要求，工作灵敏可靠，固定及 <br />
                        构件完好无损                                       □ <br />
                        变幅小车缓冲挡车装置齐全可靠                       □ <br />
                        已安装的风速仪工作显示正常                         □ <br />
                        钢丝绳缠绕排列应整齐，长度满足使用要求             □ <br />
                        钢丝绳无锈蚀严重、断股、打结、变形现象，钢丝绳断丝数量未达到报废标准                                       □ <br />
                        钢丝绳绳头端的固定紧固牢靠，绳卡数量及安装符合要求 □ <br />
                        吊具按钢丝绳标准检查，索具按索具标准检查符合要求   □ <br />
                        按吊钩标准对吊钩进行检查，无变形等现象，吊钩防脱装置安全可靠                                               □ <br />
                        滑轮应无裂纹、破损，轮槽磨损未到报废标准           □ <br />
                        滑轮转动应灵活，无卡阻、松旷现象                   □ <br />
                        补充内容：<br /> <br /></td>
                    <td>&nbsp;</td>
                </tr>
            </table>

        </div>

        <div class="PageNext"></div>

        <div class="a8_wrod_title">建筑起重机械维护保养记录表（续表）</div>
        <div class="a8_w100">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="30" align="right">GDAQ20612-1&nbsp;<input name="" type="text" style="width:100px;border:1px solid #000000;"/></td>
                </tr>
            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list">
                <tr>
                    <td colspan="2" width="80">项    类</td>
                    <td width="396">维护保养内容</td>
                    <td width="70">技术要求</td>
                    <td>备注</td>
                </tr>
                <tr>
                    <td width="24" rowspan="3">检查调整更换</td>
                    <td width="49">基础<br />及轨道</td>
                    <td align="left" width="380"><p>基础排水措施：基础无积水，排水措施良好             □ <br />
                        基础螺栓：连接紧固，无断裂现象，螺母、垫齐全       □ <br />
                        接地装置连接牢固，无开焊现象                       □ </p>
                        补充内容：<br /><br /><br /> </td>
                    <td rowspan="3" align="center">按设备<br />
                        使用说<br />明书及<br />相关标<br />准规程</td>
                    <td width="100">&nbsp;</td>
                </tr>
                <tr>
                    <td>金属<br />
                        结构<br />
                        与连<br />
                        接件</td>
                    <td align="left"><p>主要受力构件无变形、开焊、开裂等异常现象           □ <br />
                        爬梯、走道、栏杆不能有锈蚀、破损，须完整牢固       □ <br />
                        螺栓销轴附近母材无裂绞或开焊等异常现象             □ <br />
                        销轴部分无脱离现象，开口销完好，配合紧密           □ <br />
                        螺栓部分应齐全、紧固，无松动、断裂现象             □ <br />
                        附着装置金属构件无变形等异常现象                   □ <br />
                        附着装置与建筑物连接位置完好，建筑物无裂纹         □ <br />
                        补充内容： </p><br /><br /><br /></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>电气<br />
                        与控<br />
                        制操<br />
                        作系<br />
                        统</td>
                    <td align="left"><p>接触器等电子元件动作正常，无烧焦、老化现象        □ <br />
                        电气线路无老化、破损现象，端子固定牢靠            □ <br />
                        操作系统各组合开关及按钮开关动作灵敏可靠，各仪表 <br />
                        显示正常                                          □ <br />
                        配电箱电阻箱：箱体完好、防雨，门销完好，接地保护 <br />
                        良好，固定稳定可靠、漏电保护器、隔离开关完好      □ <br />
                        塔顶和起重臂最前端障碍灯完好                      □ <br />
                        补充内容： </p><br /><br /><br /></td>
                    <td>&nbsp;</td>
                </tr>
            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="a8_list" style="border-top-style:none;">
                <tr>
                    <td width="79" height="66" align="center">维保建议</td>
                    <td width="574">&nbsp;</td>
                </tr>
                <tr>
                    <td height="66" align="center">维保结论</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td height="120" colspan="2" valign="top"><p align="left">维护保养人员：（签名）</p>
                        <br /><br /><br /><br />
                        <p align="right">维保单位（公章）&nbsp;&nbsp;</p>
                        <p align="right">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</p>

                    </td>
                </tr>
            </table>


        </div>

    </div>

    <div class="PageNext"></div>
</center>
</body>
</html>
