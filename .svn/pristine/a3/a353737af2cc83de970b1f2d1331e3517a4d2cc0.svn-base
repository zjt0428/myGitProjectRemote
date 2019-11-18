package com.knight.emms.terminal.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;


import com.knight.emms.model.WeChatMessage;
import com.knight.emms.service.WeChatMessageService;
import com.knight.emms.terminal.TerminalBaseAction;

public class WeChatMessageAction extends TerminalBaseAction{
	
	private static final long serialVersionUID = 1L;
	
	@Resource
    private WeChatMessageService service;
    
    public void getMessage() {
    	String signature = getRequest().getParameter("signature");
    	String timestamp = getRequest().getParameter("timestamp");
    	String nonce = getRequest().getParameter("nonce");
    	String echostr = getRequest().getParameter("echostr");
    	WeChatMessage message = new WeChatMessage();
    	message.setSignature(signature);
    	message.setTimestamp(timestamp);
    	message.setNonce(nonce);
    	message.setEchostr(echostr);
    	logger.info(message.toString());
    	PrintWriter print;
    	 try {
             print = getResponse().getWriter();
             System.out.println(service.checkSignature(message));
             print.write(service.checkSignature(message));
             print.flush();
         } catch (IOException e) {
             e.printStackTrace();
         }
    }
}

