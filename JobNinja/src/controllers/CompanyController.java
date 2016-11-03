package controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.CompanyDAO;
import entities.Company;
import entities.Word;

@RestController
public class CompanyController {

	@Autowired
	private CompanyDAO companyDAO;
	
	@RequestMapping(path = "companies", method = RequestMethod.GET)
	public List<Company> index() {
		return companyDAO.index();
	}
	@RequestMapping(path = "company/{id}", method = RequestMethod.GET)
	public Company show(@PathVariable int id) {
		return companyDAO.show(id);
	}
	
	
	@RequestMapping(path = "company/{id}/words", method = RequestMethod.GET)
	public List<Word> indexWords(@PathVariable int id) {
		return companyDAO.indexWords(id);
	}
	@RequestMapping(path = "company/{id}/words", method = RequestMethod.POST)
	public Company updateWords(@PathVariable int id, @RequestBody String wordJSON) {
		String[] words = wordJSON.substring(2, wordJSON.length()-2).split("\",\"");
		Set<String> uniqueWords = new TreeSet<String>(Arrays.asList(words));
		
		Company c = companyDAO.updateWords(id, uniqueWords);
		return c;
	}
	
	@RequestMapping(path = "company/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String companyJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Company updateCompany = null;

		try {
			updateCompany = mapper.readValue(companyJSON, Company.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		companyDAO.updateName(id, updateCompany);
	}
	
	@RequestMapping(path = "company/{id}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int id) {
		companyDAO.destroy(id);
	}
	
	// Get company match rating given company id and user id
	@RequestMapping(path="company/{id}/rating/{userId}", method=RequestMethod.GET)
	public Company getMatchRating(@PathVariable int id, @PathVariable int userId, HttpServletResponse res) {
		Company c = companyDAO.matchRating(id, userId);
		if (c.getRating() == null) {
			
			try {
				res.sendRedirect("http://localhost:8080/JobNinja/api/company/error");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return c;
	}
	
	@RequestMapping(path="company/error", method=RequestMethod.GET)
	public Map<String, String> noWordsError(HttpServletResponse res) {
		HashMap<String, String> json = new HashMap<>(1);
		res.setStatus(404);
		json.put("error", "You must complete the personality test before you can compare results.");
		return json;
	}
	
	@RequestMapping(path = "company/{id}/words", method = RequestMethod.DELETE)
	public Company deleteWords(@PathVariable int id) {
		return companyDAO.deleteData(id);
	}
	
}
