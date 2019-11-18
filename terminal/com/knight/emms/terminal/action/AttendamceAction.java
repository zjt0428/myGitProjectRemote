package com.knight.emms.terminal.action;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.app.model.Attendamce;
import com.knight.app.model.AttendamceLocation;
import com.knight.app.service.AttendamceLocationService;
import com.knight.app.service.AttendamceService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

public class AttendamceAction extends TerminalBaseAction {
	
	private static final long serialVersionUID = 1L;
	
	private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static SimpleDateFormat ymdfrm = new SimpleDateFormat("yyyy-MM-dd");
	@Resource
	private AttendamceService attendamceService;
	
	@Resource
	private AttendamceLocationService  attLocationService;
	@Resource
	private FileAttachService fileAttachService;

		
	public String queryView() {
		Query query = getTerminalMessage().getQuery();
		
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(query.getUserId()));
		filter.addConjunctFilter("Q_sgDate_D_EQ", query.getSgDate());
		List<Attendamce> list = attendamceService.queryTranslateAll(filter);
		
		if(list!=null&& list.size()>0){
			Attendamce att = list.get(0);
			List<FileAttach> fileList = fileAttachService.queryForRelate(att.getAid(), SystemConstant.MODULE_APP_ATTENDAMCE);
			Set<FileAttach> s = att.getPhotoSet();
			for(FileAttach fa : fileList){
				s.add(fa);
			}			
			
			List<Long> fileIds = fileAttachService.getFileIdByDepend(att.getAid(), SystemConstant.MODULE_APP_ATTENDAMCE);
			att.setFileAttaches(StringUtils.join(fileIds, ","));
		}
				
		successResponse(GsonUtil.toJson(list,true,DateUtil.LINK_DISPLAY_DATE_FULL,false));
		return SUCCESS;
		
	
	}
	
	public String submit() {
			Tequest tequest = getTerminalMessage();		
			String curDate = format.format(new Date());		
			String type = tequest.getType();		
			String sgDate = tequest.getSgDate();
			if(sgDate.equals("")){
				sgDate = curDate;
			}
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_sgDate_D_EQ", sgDate);
			filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(tequest.getUserId()));
			List<Attendamce> list = attendamceService.queryTranslateAll(filter);
			Attendamce att = new Attendamce();
				
			if(list!=null && list.size()>0){
				att = (Attendamce)list.get(0);
				Long times = att.getSgSum();
				if(times==null){times = new Long(0);}
				if(type!=null&&"1".equals(type)){
					if(att.getSginTime()==null || att.getSginTime().equals("")){
						att.setSgSum(++times);
					}
					att.setSginTime(tequest.getSgTime());
					att.setSginLocation(tequest.getLocation());
				}else if(type!=null &&"2".equals(type)){
					if(att.getSgouTime()==null || att.getSgouTime().equals("")){
						att.setSgSum(++times);
					}
					att.setSgouTime(tequest.getSgTime());
					att.setSgouLocation(tequest.getLocation());
				}
				attendamceService.saveOrUpdate(att);
				
			}else{
				try{
					att.setSgDate(ymdfrm.parse(sgDate));
				}catch(Exception e){
					e.printStackTrace();
					errorResponse();
					return SUCCESS;
				}
				if(type!=null&&"1".equals(type)){				
					att.setSginTime(tequest.getSgTime());
					att.setSginLocation(tequest.getLocation());
				}else if(type!=null &&"2".equals(type)){
					att.setSgouTime(tequest.getSgTime());
					att.setSgouLocation(tequest.getLocation());
				}
				att.setUserId(tequest.getUserId());
				att.setSgWeekday(getWeekOfDate(new Date()));
				att.setCreateDt(sgDate);
				att.setSgSum(new Long(1));			
				
				attendamceService.save(att);
			}
			successResponse2("\"aid\":"+att.getAid());
			return SUCCESS;
	}
	
	public String upRemark(){
		Tequest tequest = getTerminalMessage();
		Long aid = tequest.getAid();
		Long userId = tequest.getUserId();
		String sgDate = tequest.getSgDate();
		String remark = tequest.getRemark();
		
		Attendamce att = new Attendamce();
		
		if(aid!=null && aid>0){
			att = attendamceService.get(aid);
			att.setRemark(remark);
			attendamceService.saveOrUpdate(att);
		}else{
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_sgDate_D_EQ", sgDate);
			filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(tequest.getUserId()));
			List<Attendamce> list = attendamceService.queryTranslateAll(filter);
			
			if(list!=null && list.size()>0){
				att = (Attendamce)list.get(0);
				att.setRemark(remark);
				attendamceService.saveOrUpdate(att);				
			}else{
				try{
					att.setSgDate(ymdfrm.parse(sgDate));
				}catch(Exception e){
					errorResponse();
					return SUCCESS;
				}
				att.setUserId(userId);
				att.setRemark(remark);
				att.setCreateDt(format.format(new Date()));
				attendamceService.save(att);
			}			
		}
				
		successResponse2("\"aid\":"+att.getAid());
		return SUCCESS;
	}
	
	public String upLocation(){
		Tequest tequest = getTerminalMessage();
		
		Long userId = tequest.getUserId();
		String sgDate = tequest.getSgDate();
		String upTime = tequest.getUpTime();
		String location = tequest.getLocation();
		
		if(userId==null || sgDate==null || sgDate.equals("") || upTime==null || upTime.equals("") || location==null || location.equals("")){
			return "{\"success\":false,\"msg\":\"参数错误\"}";			
		}
		
		AttendamceLocation al = new AttendamceLocation();
		al.setLocation(location);
		al.setUpTime(upTime);		
		
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_sgDate_D_EQ", sgDate);
		filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(tequest.getUserId()));
		List<Attendamce> list = attendamceService.queryTranslateAll(filter);
			
		if(list!=null && list.size()>0){
			Attendamce att = (Attendamce)list.get(0);
			al.setAid(att.getAid());								
		}else{
			Attendamce att = new Attendamce();
			try{
				att.setSgDate(ymdfrm.parse(sgDate));
			}catch(Exception e){
				errorResponse();
				return SUCCESS;
			}
			att.setUserId(userId);
			att.setCreateDt(format.format(new Date()));
			attendamceService.save(att);
			al.setAid(att.getAid());
		}	
		
		attLocationService.save(al);
				
		successResponse();
		return SUCCESS;
	}
	
	public String upPhoto(){
		Tequest tequest = getTerminalMessage();
		
		Long userId = tequest.getUserId();
		String sgDate = tequest.getSgDate();
		int fileId = tequest.getFileId();
		
		if(fileId==0 || userId==null || sgDate==null || sgDate.equals("") ){
			return "{\"success\":false,\"msg\":\"参数错误\"}";			
		}
		
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_sgDate_D_EQ", sgDate);
		filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(tequest.getUserId()));
		List<Attendamce> list = attendamceService.queryTranslateAll(filter);
		long aid=0;	
		if(list!=null && list.size()>0){
			Attendamce att = (Attendamce)list.get(0);
			aid = att.getAid();								
		}else{
			Attendamce att = new Attendamce();
			try{
				att.setSgDate(ymdfrm.parse(sgDate));
			}catch(Exception e){
				errorResponse();
				return SUCCESS;
			}
			att.setUserId(userId);
			att.setCreateDt(format.format(new Date()));
			attendamceService.save(att);
			aid=att.getAid();
		}	
		
		setTerminalFileAttach(aid, String.valueOf(fileId));
		successResponse();
		return SUCCESS;
	}
	
	public String upFileAttach(){
		Tequest tequest = getTerminalMessage();
		Long aid = tequest.getAid();
		String fileAttaches = tequest.getFileAttaches();
		
		if(aid ==null || fileAttaches==null || fileAttaches.equals("")){
			return "{\"success\":false,\"msg\":\"参数错误\"}";			
		}
		
		setTerminalFileAttach(aid, fileAttaches);
			
		successResponse();
		return SUCCESS;
	}
	
	public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"sun","mon","tue","web","thu","fri","sat"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);

        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0){
            w = 0;
        }

        return weekDays[w];
    }
}
