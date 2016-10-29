package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.UserDAO;
import entities.Company;
import entities.User;
import entities.Word;

@RestController
public class UserController {

	@Autowired
	private UserDAO userDAO;

	// Create User exists in AuthenticationController

	// Get all Users
	@RequestMapping(path = "users", method = RequestMethod.GET)
	public List<User> index() {
		return userDAO.index();
	}

	// Get a User
	@RequestMapping(path = "user/{id}", method = RequestMethod.GET)
	public User show(@PathVariable int id) {
		return userDAO.show(id);
	}

	// Get words associated with user
	@RequestMapping(path = "user/{id}/words", method = RequestMethod.GET)
	public List<Word> indexWords(@PathVariable int id) {
		return userDAO.indexWords(id);
	}

	// Add a Word to a User
	@RequestMapping(path = "user/{id}/words", method = RequestMethod.POST)
	public void updateWords(@PathVariable int id, @RequestBody String words) {

		String[] wordsArray = words.substring(1, words.length() - 1).split(", ");
		
		for (String word : wordsArray) {
			
			userDAO.updateWords(id, word);
		}
	}
	
	// Add a company to a User
	@RequestMapping(path = "user/{id}/company", method = RequestMethod.POST)
	public Company addCompany(@PathVariable int id, @RequestBody String companyJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Company company = null;
		try {
			company = mapper.readValue(companyJSON, Company.class);
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return userDAO.addCompany(id, company);
	}
	
	// Delete company from user
	@RequestMapping(path = "user/{id}/company/{cId}", method = RequestMethod.DELETE)
	public void deleteCompany(@PathVariable int id, @PathVariable int cId) {
		userDAO.deleteCompany(id, cId);
	}

	// Update User
	@RequestMapping(path = "user/{id}", method = RequestMethod.PUT)
	public User update(@PathVariable int id, @RequestBody String userJSON) {
		ObjectMapper mapper = new ObjectMapper();
		User updateUser = null;

		try {
			updateUser = mapper.readValue(userJSON, User.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userDAO.update(id, updateUser);
	}


	// Delete User
	@RequestMapping(path = "user/{id}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int id) {
		userDAO.destroy(id);
	}
}
