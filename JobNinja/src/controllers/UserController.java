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
import entities.User;
import entities.Word;

@RestController
public class UserController {
	
	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping(path = "users", method = RequestMethod.GET)
	public List<User> index() {
		return userDAO.index();
	}
	@RequestMapping(path = "user/{id}", method = RequestMethod.GET)
	public User show(@PathVariable int id) {
		return userDAO.show(id);
	}
	
	
	@RequestMapping(path = "user/{id}/words", method = RequestMethod.GET)
	public List<Word> indexWords(@PathVariable int id) {
		return userDAO.indexWords(id);
	}
	
	@RequestMapping(path = "user/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String userJSON) {
		ObjectMapper mapper = new ObjectMapper();
		User updateUser = null;

		try {
			updateUser = mapper.readValue(userJSON, User.class);
			System.out.println(updateUser);
		} catch (Exception e) {
			e.printStackTrace();
		}
		userDAO.update(id, updateUser);
	}
	
	@RequestMapping(path = "user/{id}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int id) {
		userDAO.destroy(id);
	}
}
