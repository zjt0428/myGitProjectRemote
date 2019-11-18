package com.knight.emms.terminal.dto;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.emms.model.ConstructOperation;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by YaoFly on 2016/8/25.
 */
public class ConstructOperationInfoResponse {
    private boolean success = true;

    private String msg = "操作成功";

    private String infoType = "CONSTRUCT_OPERATION";

    private Info info = new Info();

    @Data
    public static class Info {
        public List<Result> result = new ArrayList<Result>();
    }

    @Data
    public static class Result {
        @Expose
        private Long constructId;
        @Expose
        private String constructTheme;

        @Expose
        private String teams;

        @Expose
        private String practiNames;

        @Expose
        private String statusName;

        @Expose
        private String userName;

        @Expose
        private String exwSerial;

        @Expose
        private String recordId;

        @Expose
        private String projectName;

        @Expose
        private String buildingNum;

        @Expose
        private String providedDate;

        @Expose
        private String confimDate;

        @Expose
        private String actualDate;

        @Expose
        private String closedDate;

        @Expose
        private String constructDate;

        @Expose
        private String constructStartDate;

        @Expose
        private String enterPlanDate;

        @Expose
        private BigDecimal summary;

    }

    public void addConstructOperations(List<ConstructOperation> list){
        for(ConstructOperation constructOperation:list){
            addConstructOperation(constructOperation);
        }
    }

    public void addConstructOperation(ConstructOperation constructOperation){
        Result r = new Result();
        r.setPractiNames(constructOperation.getPractiNames());
        r.setConstructTheme(constructOperation.getConstructTheme());
        r.setStatusName(constructOperation.getStatusName());
        r.setTeams(constructOperation.getTeams());
        r.setUserName(constructOperation.getUserName());
        r.setProjectName(constructOperation.getProject().getProjectName());
        r.setBuildingNum(constructOperation.getBuildingNum());
        r.setClosedDate(constructOperation.getClosedDate());
        r.setActualDate(constructOperation.getActualDate());
        r.setConfimDate(constructOperation.getConfimDate());
        r.setProvidedDate(constructOperation.getProvidedDate());
        if(constructOperation.getEquipment()!=null){
            r.setRecordId(constructOperation.getEquipment().getRecordId());
            r.setExwSerial(constructOperation.getEquipment().getExwSerial());
        }
        r.setConstructId(constructOperation.getConstructId());
        r.setConstructDate(constructOperation.getConstructDate());
        r.setConstructStartDate(constructOperation.getConstructStartDate());
        r.setEnterPlanDate(constructOperation.getEnterPlanDate());
        r.setSummary(constructOperation.getSummary());
        this.info.result.add(r);
    }
}
