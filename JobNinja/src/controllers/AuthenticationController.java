package controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.UserDAO;
import entities.User;
import security.JsonWebTokenGenerator;

@RestController
public class AuthenticationController {

	@Autowired
	JsonWebTokenGenerator jwtGen;

	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	@Autowired
	UserDAO userDao;

	// Create User
	@RequestMapping(value = "auth/signup", method = RequestMethod.POST)
	public Map<String, String> signup(@RequestBody String userJson, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		User user = null;
		try {
			user = mapper.readValue(userJson, User.class);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		user = userDao.create(user);
		Map<String, String> responseJson = new HashMap<>();
		if (user != null) {
			String jwtString = jwtGen.generateUserJwt(user);
			responseJson.put("jwt", jwtString);
			responseJson.put("userId", String.valueOf(user.getId()));
			return responseJson;
		}
		else {
			responseJson.put("error", "User already exists");
			res.setStatus(403);
			return responseJson;
		}
	}

	// Login a User
	@RequestMapping(value = "auth/login", method = RequestMethod.POST)
	public Map<String, String> login(@RequestBody String userJsonLogin, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		User user = null;
		Map<String, String> responseJson = new HashMap<>();
		try {
			user = mapper.readValue(userJsonLogin, User.class);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}

		try {
			user = userDao.authenticateUser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (user == null) {
			res.setStatus(403);
			responseJson.put("error", "Invalid login credentials.");
			return responseJson;
		}
		String jwtString = jwtGen.generateUserJwt(user);
		responseJson.put("jwt", jwtString);
		return responseJson;
	}
	
	@RequestMapping(value="auth/unauthorized", method = RequestMethod.GET)
	public String redirect(HttpServletResponse res) {
		res.setStatus(403);
		return "{\"error\":\"Auth Error\"}";
	}
	
}
