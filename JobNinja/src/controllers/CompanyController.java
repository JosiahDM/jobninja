package controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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
		System.out.println(c.getCompanyid());
		System.out.println(c.getWords().size());
		return c;
	}
	
	@RequestMapping(path = "company/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String companyJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Company updateCompany = null;

		try {
			updateCompany = mapper.readValue(companyJSON, Company.class);
			System.out.println(updateCompany);
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
	public Company getMatchRating(@PathVariable int id, @PathVariable int userId) {
		Company c = companyDAO.matchRating(id, userId);
		return c;
	}
	
}
