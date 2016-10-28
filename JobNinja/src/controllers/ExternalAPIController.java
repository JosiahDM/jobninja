package controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import traitify.ManualRequest;

@RestController
public class ExternalAPIController {

	@RequestMapping(path="/external/traitify", method=RequestMethod.GET)
	public String getNewTestId() {
		ManualRequest req = new ManualRequest();
		ObjectMapper mapper = new ObjectMapper();
		try {
			req.doRequest();
			return req.getTestId();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	
}
