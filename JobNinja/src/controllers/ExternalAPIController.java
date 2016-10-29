package controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import traitify.ManualRequest;

@RestController
public class ExternalAPIController {
	
	private final String T_URL = "https://api-sandbox.traitify.com/v1/assessments";
	private final String T_DATA = "{\"deck_id\":\"core\"}";

	@RequestMapping(path="/external/traitify", method=RequestMethod.GET)
	public String getNewTestId() {
		ManualRequest req = new ManualRequest(T_URL, T_DATA);
		ObjectMapper mapper = new ObjectMapper();
		try {
			req.doRequest("traitify");
			return req.getResponse();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}

	@RequestMapping(path="/external/mc", method=RequestMethod.POST)
	public String getMeaningCloudWords(@RequestBody String url) {
		ManualRequest req = new ManualRequest("", url);
		System.out.println(url);
		try {
			req.doRequest("meaningcloud");
			System.out.println(req.getResponse());
			return req.getResponse();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	
}
