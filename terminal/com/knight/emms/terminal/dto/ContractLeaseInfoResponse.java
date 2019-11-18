package com.knight.emms.terminal.dto;

import com.google.gson.annotations.Expose;
import com.knight.emms.model.ContractLease;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by YaoFly on 2016/8/17.
 */
public class ContractLeaseInfoResponse {

    private boolean success = true;

    private String msg = "操作成功";

    private String infoType = "CONTRACT_LEASE";

    private Info info = new Info();

    @Data
    public static class Info{
        private List<Result> result = new ArrayList<Result>();
    }
    @Data
    public static class Result{
        @Expose
        private Long contractId;
        @Expose
        private Long projectId;
        @Expose
        private String projectName;
        @Expose
        private String address;
        @Expose
        private String paEntName;
        @Expose
        private String contractTheme;
        @Expose
        private String providedDate;
    }

    public void addContractLease(ContractLease contractLease){
        Result r = new Result();
        r.setContractId(contractLease.getContractId());
        r.setProjectId(contractLease.getProjectId());
        r.setAddress(contractLease.getAddress());
        r.setProjectName(contractLease.getProjectName());
        r.setPaEntName(contractLease.getPaEntName());
        r.setContractTheme(contractLease.getContractTheme());
        r.setProvidedDate(contractLease.getProvidedDate());
        this.info.result.add(r);
    }
}
