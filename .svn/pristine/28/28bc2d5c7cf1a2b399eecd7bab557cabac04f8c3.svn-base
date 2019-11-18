package com.knight.emms.domain.impl;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang.time.DateUtils;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.knight.app.model.Attendamce;
import com.knight.app.service.AttendamceService;
import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipInsuranceDao;
import com.knight.emms.domain.EquipInsuranceDomain;
import com.knight.emms.model.AccessToken;
import com.knight.emms.model.EquipInsurance;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.PractiInsurance;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.WxMssVo;
import com.knight.emms.service.EquipInsuranceDetailService;
import com.knight.emms.service.EquipInsuranceService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.PractiInsuranceService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.support.TemplateData;

/**
 * Created by YaoFly on 2016/10/26.
 */
public class EquipInsuranceDomainImpl implements EquipInsuranceDomain {
    
	@Resource
	private BaseJDBCDao baseJdbcDao;
	
	@Resource
	private EquipInsuranceDao equipInsuranceDao;
	
	@Resource
	private EquipInsuranceService equipInsuranceService;
	
	@Resource
	private EquipInsuranceDetailService equipInsuranceDetailService;
	
	@Resource
	private EquipmentService equipmentService;
	
	@Resource
	private PractitionerService practitionerService;
	
	@Resource
	private PractiInsuranceService practiInsuranceService;
	
	@Resource
	private AttendamceService attendamceService;
	
//	@Bean
//	public RestTemplate restTemplate() {
//		return new RestTemplate();
//	}
	@Autowired
	private RestTemplate restTemplate;
//  @Autowired
//    private WxMpService wxMpService;

	
//	@Resource
//	private MiniProgramAction miniProgramAction;

	@Override
	public void autoCreateWaitEquipInsurance() {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.addConjunctFilter("Q_insureStatus_S_EQ", "12");
		List<Equipment> list = equipmentService.queryTranslateAll(filter);
		if(list.size()>0){
			for(Equipment e : list){
				String mess = "设备名称："+e.getEquipGenericName()+"设备自编号："+e.getEquipSerial()+"将于"+e.getInsureTime()+"到期停保";
				
			}
		}
	}
	@Override
	public void autoCreateWaitEquipInsuranceDay() {
		// TODO Auto-generated method stub
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.addConjunctFilter("Q_insureTime_S_LE", DateUtil.getCurrentLinkDateStr());
		List<Equipment> list = equipmentService.queryTranslateAll(filter);
		for(Equipment ei : list){
					ei.setInsureStatus("0");
					equipmentService.update(ei);
		}
		QueryFilter filter1 = new QueryFilter();
		filter1.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter1.addConjunctFilter("Q_insureStatus_S_EQ", "1");
		List<Equipment> lis = equipmentService.queryTranslateAll(filter1);
		SimpleDateFormat  s = new SimpleDateFormat("yyyy-MM-dd");
		String sa = s.format(new Date());
		Date date1=null;
		Date date2=null;
		Calendar ca1 = Calendar.getInstance();
		Calendar ca2 = Calendar.getInstance();
		for(Equipment ei : lis){
			try {
				date1=s.parse(sa);
				date2=s.parse(ei.getInsureTime());
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ca1.setTime(date1);
			ca2.setTime(date2);
			long distanceMin =( ca2.getTimeInMillis()- ca1.getTimeInMillis())/(1000*60*60*24);
			if(distanceMin<30){
					ei.setInsureStatus("12");
					equipmentService.update(ei);
				
			}
		}
		QueryFilter filter2 = new QueryFilter();
		filter2.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter2.addConjunctFilter("Q_effective_S_EQ", "1");
		filter2.addConjunctFilter("Q_endInsureDate_S_LE", DateUtil.getCurrentLinkDateStr());
		List<EquipInsurance> listNo = equipInsuranceService.queryTranslateAll(filter2);
		for(EquipInsurance e : listNo){
			e.setEffective(Status.InsureEffective.overdue);
			equipInsuranceService.update(e);
		}
	}
	@Override
	public void autoCreateWaitPractiInsurance() {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.addConjunctFilter("Q_insureStatus_S_EQ", "12");
		List<Practitioner> list = practitionerService.queryTranslateAll(filter);
		if(list.size()>0){
			for(Practitioner e : list){
				String mess = "员工姓名："+e.getPractiName()+"将于"+e.getInsureTime()+"到期停保";
				
			}
		}
	}
	@Override
	public void autoCreateWaitPractiInsuranceDay() {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.addConjunctFilter("Q_insureTime_S_LE", DateUtil.getCurrentLinkDateStr());
		List<Practitioner> list = practitionerService.queryTranslateAll(filter);
		for(Practitioner ei : list){
					ei.setInsureStatus("3");
					practitionerService.update(ei);
		}
		QueryFilter filter1 = new QueryFilter();
		filter1.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter1.addConjunctFilter("Q_insureStatus_S_EQ", "1");
		List<Practitioner> lis = practitionerService.queryTranslateAll(filter1);
		SimpleDateFormat  s = new SimpleDateFormat("yyyy-MM-dd");
		String sa = s.format(new Date());
		Date date1=null;
		Date date2=null;
		Calendar ca1 = Calendar.getInstance();
		Calendar ca2 = Calendar.getInstance();
		for(Practitioner ei : lis){
			try {
				date1=s.parse(sa);
				date2=s.parse(ei.getInsureTime());
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ca1.setTime(date1);
			ca2.setTime(date2);
			long distanceMin =( ca2.getTimeInMillis()- ca1.getTimeInMillis())/(1000*60*60*24);
			if(distanceMin<30){
					ei.setInsureStatus("12");
					practitionerService.update(ei);
				
			}
		}
		QueryFilter filter3 = new QueryFilter();
		filter3.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter3.addConjunctFilter("Q_effective_S_EQ", "1");
		List<PractiInsurance> insureList = practiInsuranceService.queryTranslateAll(filter3);
		SimpleDateFormat  ss = new SimpleDateFormat("yyyy-MM-dd");
		String sas = s.format(new Date());
		Date datea=null;
		Date dateb=null;
		Calendar caa = Calendar.getInstance();
		Calendar cab = Calendar.getInstance();
		for(PractiInsurance ei : insureList){
			try {
				date1=s.parse(sa);
				date2=s.parse(ei.getEndInsureDate());
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			caa.setTime(datea);
			cab.setTime(dateb);
			long distanceMin =( cab.getTimeInMillis()- caa.getTimeInMillis())/(1000*60*60*24);
			if(distanceMin<30){
					ei.setEffective("12");
					practiInsuranceService.update(ei);
				
			}
		}
		
		QueryFilter filter2 = new QueryFilter();
		filter2.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter2.addConjunctFilter("Q_effective_S_EQ", "12");
		filter2.addConjunctFilter("Q_endInsureDate_S_LE", DateUtil.getCurrentLinkDateStr());
		List<PractiInsurance> listNo = practiInsuranceService.queryTranslateAll(filter2);
		for(PractiInsurance e : listNo){
			e.setEffective(Status.InsureEffective.overdue);
			practiInsuranceService.update(e);
		}
	}
	
	@Override
	public void autoCheckAttendamceSgonDay() {
//		this.pushUser();
//		this.pushOneUser("opTa55TDhZSL7wVASu7-73gp-_zI","d49514e05045443992e5437a6819afd1");
//		this.pushOneUser("oYGfow6JUC1mO6ZSimTDHFGlb5hE","d49514e05045443992e5437a6819afd1");
//		this.pushOneUser("oEELP0ramg4tiZwN64UxRz3-SaMs","d49514e05045443992e5437a6819afd1");
//		this.pushOneUser("oEELP0ramg4tiZwN64UxRz3-SaMs","4e74b6ef1316418fbe3f2b81fab3ee9d");
//		12* 3600000
		String time = DateUtil.getCurrentLinkTimeStr().substring(11, 19);
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		QueryFilter filter = new QueryFilter();
		QueryFilter filter2 = new QueryFilter();
		filter.addConjunctFilter("Q_sgouTime_S_NULL", "1");
		List<Attendamce> list = attendamceService.getAll(filter);
		if(list.size()>0){
			for(Attendamce a : list){
				String day = sdf.format(a.getSgDate())+" "+a.getSginTime();
				try {
					Date date = DateUtils.parseDate(day,new String[] { "yyyy-MM-dd HH:mm:ss" });
					Long hour = new Date().getTime() - date.getTime();
					if( hour >=(12* 3600000)){
						a.setSgouTime(time);
						a.setSgouLocation(a.getSginLocation());
						attendamceService.merge(a);
						filter2.addConjunctFilter("Q_userId_L_EQ", a.getUserId().toString());
						List<Practitioner> list2 = practitionerService.getAll(filter2);
						list2.get(0).setWorkState("1");
						practitionerService.merge(list2.get(0));
						Equipment e = equipmentService.get(a.getEquipId());
						e.setSeatState(String.valueOf(Integer.valueOf(e.getSeatState()) - 1));
						equipmentService.update(e);
					}else if(hour>=((11* 3600000)+(45*60000)) || hour<(12* 3600000)){
						
					}
				} catch (ParseException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		}
	}
//	public String pushUser() {
//		WxMpDefaultConfigImpl wxStorage = new WxMpDefaultConfigImpl();
//		    wxStorage.setAppId("wx77bb69292323a000");
//		    wxStorage.setSecret("29bd368145806115ad6820133e62806e");
//		    wxMpService.setWxMpConfigStorage(wxStorage);
//		 WxMpTemplateMessage wxMpTemplateMessage = new WxMpTemplateMessage();
//	        wxMpTemplateMessage.setTemplateId("aLf5lz6nduJShJ4sY1NsJveGmpfVfVUCKyeDOyz9wXc");
//	        wxMpTemplateMessage.setToUser("opTa55TDhZSL7wVASu7-73gp-_zI");
//	 
//	        List<WxMpTemplateData> data = Arrays.asList(
//	                new WxMpTemplateData("first","亲，记得收货哦！"),
//	                new WxMpTemplateData("keyword1","湖北xx学院"),
//	                new WxMpTemplateData("keyword2","11111111111"),
//	                new WxMpTemplateData("keyword3","32626"),
//	                new WxMpTemplateData("keyword4","95959"),
//	                new WxMpTemplateData("keyword5","￥"+ "5454545"),
//	                new WxMpTemplateData("remark","欢迎下次光临")
//	        );
//	        wxMpTemplateMessage.setData(data);
//	
//	        	try {
//					wxMpService.getTemplateMsgService().sendTemplateMsg(wxMpTemplateMessage);
//				} catch (WxErrorException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//
//		return "";
//	}
	   public String getAccess_token(String appid, String appsecret) {
	        //获取access_token
	        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" +
	                "&appid=" + appid + "&secret=" + appsecret;
	        String json = restTemplate.getForObject(url, String.class);
	        AccessToken accessToken = new Gson().fromJson(json,AccessToken.class);
	        return accessToken.getAccess_token();
	    }

	   /*
	    * 微信小程序推送单个用户
	    * */
	    public String pushOneUser(String openid, String formid) {

	        //获取access_token
//	        String access_token = getAccess_token("wxc948920c4386940a", "398a326d46ae81b1e32a3ae710a55dfd");
//	    	String access_token = getAccess_token("wx06707614993eeb47", "fe041c4c5914c557ba3b01906ced19e8");
//	    	String access_token = getAccess_token("wx06707614993eeb47", "7d52bb0c3005a23b7654d840d92c7a53");
//	    	String access_token = getAccess_token("wxc74badc5973f7ab2", "dd3a6b1d7a7075210ca3864bd06d912d");
			String access_token = getAccess_token("wxbd1d7181e37a9d56", "61bba55ab68727f7e9f37904194f54c1");
	        String url = "https://api.weixin.qq.com/cgi-bin/wxopen/message/template/send" +
	                "?access_token=" + access_token;

	        //拼接推送的模版
	        WxMssVo wxMssVo = new WxMssVo();
	        wxMssVo.setTouser(openid);//用户openid
//	        wxMssVo.setTemplate_id("IU100XzWbkjD02YMGyJBUQXruW34HF_Plal83eSQR2A");//模版id
//	        wxMssVo.setTemplate_id("sCLKQ1whqcGjX-IpyhYSVsDPwHJnHnFoIbzfYn_oqN4");
//	        wxMssVo.setTemplate_id("ORDsGoIyAN30lSqbhKZBgQMYi3AoCEhUPG23mf2Kkmk");//模版id
//	        wxMssVo.setTemplate_id("ORDsGoIyAN30lSqbhKZBgc5xTVxx1b_8NtSIrdVE688");//模版id
//	        wxMssVo.setTemplate_id("aLf5lz6nduJShJ4sY1NsJveGmpfVfVUCKyeDOyz9wXc");//模版id
//	        wxMssVo.setTemplate_id("_XlAbohDLHKIs170OWGfcaaKbo_kAS_ptQpQRknyWtc");//模版
	        
	        wxMssVo.setTemplate_id("idFrSdhrDE6weydSfVZnVyCYPsQD4Rb_yEiJ9ZHn4ouqs");//模版
	        wxMssVo.setForm_id(formid);//formid


	        Map<String, TemplateData> m = new HashMap<String, TemplateData>();

	        //keyword1：订单类型，keyword2：下单金额，keyword3：配送地址，keyword4：取件地址，keyword5备注
	        TemplateData keyword1 = new TemplateData();
	        keyword1.setValue("431");
	        m.put("keyword1", keyword1);
	        wxMssVo.setData(m);
	        TemplateData keyword2 = new TemplateData();
	        keyword2.setValue("123");
	        m.put("keyword2", keyword2);
	        wxMssVo.setData(m);

//	        TemplateData keyword3 = new TemplateData();
//	        keyword3.setValue("321");
//	        m.put("keyword3", keyword3);
//	        wxMssVo.setData(m);
//
//	        TemplateData keyword4 = new TemplateData();
//	        keyword4.setValue("111");
//	        m.put("keyword4", keyword4);
//	        wxMssVo.setData(m);
//
//	        TemplateData keyword5 = new TemplateData();
//	        keyword5.setValue("333");
//	        m.put("keyword5", keyword5);
//	        wxMssVo.setData(m);
	        
	        HttpHeaders headers = new HttpHeaders();
	        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
	        headers.setContentType(type);
	        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

	        String json = JSONObject.toJSONString(wxMssVo);

	        HttpEntity<String> formEntity = new HttpEntity<String>(json, headers);

	        String result = restTemplate.postForObject(url, formEntity, String.class);
	        System.out.println(result);
//	        String respStr = restTemplate.postForObject(url, wxMssVo, String.class);
//	        System.out.println(respStr);
//	        response = SerializeUtil.DeSerialize(respStr, clazz);
//	        System.out.println(responseEntity.getBody());
//	        log.error("小程序推送结果={}", responseEntity.getBody());
	        return result;
	    }
}
