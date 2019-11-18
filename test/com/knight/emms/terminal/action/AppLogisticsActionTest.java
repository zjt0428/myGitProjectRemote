package com.knight.emms.terminal.action;

import com.knight.emms.util.HttpClientHelper;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/8/7.
 */
public class AppLogisticsActionTest {
	private CloseableHttpClient httpClient;
	private String url;
	private String tmessage;

	@After
	public void tearDown() throws Exception {
		url += ";jsessionid=3FED21D55D810EC722BF2D86BE8DDF71";
		HttpClientHelper.secParam.put("tmessage", tmessage);
		String responseText = HttpClientHelper.post(httpClient, url, HttpClientHelper.secParam);
		System.out.println(responseText);
	}

	@Before
	public void setUp() throws Exception {
		httpClient = HttpClients.custom().build();
		HttpClientHelper.sysUrl = "http://localhost:8080/emms";
	}

	@Test
	public void testList() throws Exception {
		url = HttpClientHelper.sysUrl + "/terminal/listLogistics.do";
		tmessage = "{\"query\":{\"keyword\":\"丘\",\"status\":0,\"start\":0,\"pageSize\":10}}";
	}

	@Test
	public void testLoad() throws Exception {

	}

	@Test
	public void testAdd() throws Exception {
		url = HttpClientHelper.sysUrl + "/terminal/addLogistics.do";
		tmessage = "{\"carId\":\"41\",\"deliveryDate\":\"2016-09-29\",\"deliveryMan\":\"许燕琳3\",\"disid\":\"356\",\"licensePlate\":\"渝A08526\",\"logisticsTranDistributionSet\":[{\"calculate\":\"个\",\"componGenericName\":\"塔吊11\",\"componSpecific\":\"QTZ80\",\"dimensions\":\"34*72\",\"quantity\":\"1\"},{\"calculate\":\"kg\",\"componGenericName\":\"塔吊配件1\",\"componSpecific\":\"QTZ800\",\"dimensions\":\"4*4\",\"quantity\":\"10\"}],\"propertyName\":\"小鬼\",\"receWarehouseAddress\":\"福建省厦门市湖里区null\",\"receWarehouseType\":\"projectStore\",\"receiveId\":\"91\",\"receiveWarehouseName\":\"厦门市闽南古镇写字楼项目\",\"remark\":\"备注\",\"sendId\":\"25\",\"sendWarehouseName\":\"海沧仓库\",\"sendWarehouseType\":\"houseStore\",\"summary\":\"0\",\"tAppLogisticsCompSet\":[{\"logiNum\":\"1\",\"tAppComponDispatchDetail\":{\"compDeid\":\"462\",\"compId\":\"507\",\"compName\":\"附墙\",\"compSpec\":\"QTZ100\",\"componSerial\":\"JP20151228000004\",\"disNum\":\"1\",\"disid\":\"356\",\"logisticNum\":\"1\",\"stockNum\":\"22\"}}]}\n";
	}

	@Test
	public void testIsLogiFinished() throws Exception {

	}

	@Test
	public void testSwitchDispatchStatus() throws Exception {

	}

	@Test
	public void testReceive() throws Exception {

	}

	@Test
	public void testQueryCar() throws Exception {

	}

	@Test
	public void testAddCar() throws Exception {

	}

	@Test
	public void testlistAllocates() throws Exception {
		url = HttpClientHelper.sysUrl + "/terminal/listAllocatesLogistics.do";
		tmessage = "{\"query\":{\"firstKeyword\":\"\"}}";
		tmessage = "{\"query\":{\"firstKeyword\":\"\",\"secondKeyword\":\"ST\"}}";
	}
}