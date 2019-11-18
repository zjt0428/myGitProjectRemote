package com.knight.emms.web.action;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.FreemarkerUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.ZipUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.*;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jxl.demo.Write;
import lombok.Getter;
import lombok.Setter;
import org.apache.tools.zip.ZipOutputStream;

import java.io.*;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/12/26.
 */
public class PrintDataAction extends BaseAction{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Getter
    @Setter
    private PrintData printData;

    @javax.annotation.Resource
    private com.knight.emms.service.PrintDataService printDataService;
    @javax.annotation.Resource

    private com.knight.emms.service.ProjectService projectService;
    @javax.annotation.Resource

    private com.knight.emms.service.EquipmentService equipmentService;
    @javax.annotation.Resource

    private com.knight.emms.service.IndisSchemaService indisSchemaService;
    @javax.annotation.Resource

    private com.knight.emms.service.IndisNoticeService indisNoticeService;

    @javax.annotation.Resource
    private com.knight.emms.service.EquipDetectService equipDetectService;

    @javax.annotation.Resource
    private com.knight.emms.service.ConstructOperationService constructOperationService;

    @javax.annotation.Resource
    private com.knight.emms.service.VerifySelfService verifySelfService;
    public String saveData(){
        printDataService.merge(printData);
        return SUCCESS;
    }

    public String loadData(){
        QueryFilter filter = new QueryFilter();
        filter.addSorted("printDataId","DESC");
        List<PrintData> list = printDataService.getAll(filter);
        PrintData printData = new PrintData();
        if(list.size()!=0){
            printData = list.get(0);
        }
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(printData));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }

    public String printMaterialGather() throws Exception {
    	String constructionUnit = URLDecoder.decode(getRequest().getParameter("constructionUnit"), "UTF-8");
    	String propertyName = URLDecoder.decode(getRequest().getParameter("propertyName"), "UTF-8");
        String[] catalogues = getRequest().getParameter("catalogue").split(",");
        getRequest().setAttribute("catalogues",catalogues);
        //获取设备
        Project project = projectService.getTranslate(new Long((String) getRequest().getParameter("projectId")));
        if(!(constructionUnit == null) && !(constructionUnit=="")){
            project.setUnCustomName(constructionUnit);
        }
        getRequest().setAttribute("project",project);
        //获取项目
        Equipment equipment = equipmentService.getTranslateFull(new Long((String)getRequest().getParameter("equipId")));
        if(!(propertyName == null) && !(propertyName == "")){
            equipment.setPropertyName(propertyName);
        }
        getRequest().setAttribute("equip",equipment);
        //获取合同设备
        ContractLease cl = new ContractLease();
        ContractEquip ce = new ContractEquip();
        List<Map<String,Object>> con = printDataService.queryByScript("equipdoc.contractByPE",getRequest().getParameter("equipId"),getRequest().getParameter("projectId"));
        if(con.size()>0){
            cl.setContractSerial((String)con.get(0).get("CONTRACT_SERIAL"));
            ce.setRentStandard((BigDecimal) con.get(0).get("RENT_STANDARD"));
            ce.setRentStandardTemp((BigDecimal) ((BigDecimal) con.get(0).get("RENT_STANDARD")).divide(new BigDecimal(10000),0,0));
            ce.setFinalHeight((String) con.get(0).get("FINAL_HEIGHT"));
            ce.setInitialHeight((String) con.get(0).get("INITIAL_HEIGHT"));
        }
        //获取安装方案
        QueryFilter q1 = new QueryFilter();
        q1.addConjunctFilter("Q_equipment.equipId_L_EQ",getRequest().getParameter("equipId"));
        q1.addConjunctFilter("Q_project.projectId_L_EQ",getRequest().getParameter("projectId"));
        q1.addConjunctFilter("Q_relateModule_S_EQ",getRequest().getParameter("EQUIP_INSTALL"));
        List<IndisSchema> indisSchema = indisSchemaService.queryTranslateAllFull(q1);
        if(indisSchema.size()>0){
            getRequest().setAttribute("indisSchema",indisSchema.get(0));
            //获取安装告知
            QueryFilter q2 = new QueryFilter();
            q2.addConjunctFilter("Q_indisSchema.schemaId_L_EQ",indisSchema.get(0).getSchemaId()+"");
            List<IndisNotice> indisNotice = indisNoticeService.queryTranslateAllFull(q2);
            if(indisNotice.size()>0){
                getRequest().setAttribute("indisNotice",indisNotice.get(0));
            }
        }
        //获取维修管理
        QueryFilter q3 = new QueryFilter();
        q3.addConjunctFilter("Q_equipFlow.equipId_L_EQ",(String)getRequest().getParameter("equipId"));
        q3.addConjunctFilter("Q_equipFlow.contractId_L_EQ",(con.size()>0?con.get(0).get("CONTRACT_ID").toString():"0"));
        List<EquipDetect> equipDetect = equipDetectService.queryTranslateAllFull(q3);
        if(equipDetect.size()>0){
            getRequest().setAttribute("equipDetect",equipDetect.get(0));
        }
        //获取施工作业单
        if(!getRequest().getParameter("installConstructId").equals("undefined")) {
            ConstructOperation installCO = constructOperationService.getTranslateAll(new Long((String) getRequest().getParameter("installConstructId")));
            getRequest().setAttribute("installCO", installCO);
        }
        if(!getRequest().getParameter("dismantleConstructId").equals("undefined")) {
            ConstructOperation dismantleCO = constructOperationService.getTranslateAll(new Long((String) getRequest().getParameter("dismantleConstructId")));
            getRequest().setAttribute("dismantleCO", dismantleCO);
        }
        //获取自检管理
        QueryFilter q4 = new QueryFilter();
        q4.addConjunctFilter("Q_equipFlow.equipId_L_EQ",(String)getRequest().getParameter("equipId"));
        q4.addConjunctFilter("Q_equipFlow.contractId_L_EQ",(con.size()>0?con.get(0).get("CONTRACT_ID").toString():"0"));
        q4.addConjunctFilter("Q_relateModule_S_EQ",getRequest().getParameter("EQUIP_INSTALL"));
        List<VerifySelf> verifySelf = verifySelfService.queryTranslateAllFull(q4);
        if(verifySelf.size()>0){
            getRequest().setAttribute("verifySelf",verifySelf.get(0));
        }
        //获取资料明细
        QueryFilter filter = new QueryFilter();
        filter.addSorted("printDataId","DESC");
        List<PrintData> printData = printDataService.getAll(filter);
        if(printData.size()!=0){
            getRequest().setAttribute("printData", printData.get(0));
        }
        return "PrintData";
    }

    public String exportDoc() throws IOException {
        String[] catalogues = getRequest().getParameter("catalogue").split(",");
        Map dataMap = getfillInData();
        List<File> files = new ArrayList<File>();
        //生成本地临时doc文件
        for(String fileName : catalogues){
            File doc = createDoc(dataMap,fileName);
            if(doc!=null){
                files.add(doc);
            }
        }
        //压缩多个doc文件为‘资料打印.zip’
        String zipName = "资料打印.zip";
        getResponse().setContentType("APPLICATION/x-download");
        getResponse().setHeader("Content-Disposition","attachment; filename="+ URLEncoder.encode(zipName, "UTF-8"));
        ZipOutputStream out = new ZipOutputStream(getResponse().getOutputStream());;
        try {
            for(File file : files){
                logger.info("------"+file.getAbsolutePath());
                ZipUtil.zipFile(file.getAbsolutePath(), out);
            }
            getResponse().flushBuffer();
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            out.close();
        }
        return null;
    }
    //获取填充数据
    public Map getfillInData(){
        Map dataMap = new HashMap();
        //dataMap.put();
        return dataMap;
    }

    public File createDoc(Map dataMap,String fileName){
        File file = null;
        Template template = FreemarkerUtil.getTemplate(getRequest().getSession().getServletContext(),"templates/data",fileName+".ftl");
        try {
            File tempFile = new File("tempdoc");
            if(!tempFile.exists()){
                tempFile.mkdir();
            }
            file = new File("tempdoc/"+fileName+ DateUtil.getCurrentCNDateStr()+".doc");
            Writer writer = new OutputStreamWriter(new FileOutputStream(file),"UTF-8");
            template.process(dataMap,writer);
            writer.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }

}
