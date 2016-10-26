package controllers;

import java.util.List;

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
	public void updateWords(@PathVariable int id, @RequestBody String wordJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Word word = null;

		try {
			word = mapper.readValue(wordJSON, Word.class);
			System.out.println(word);
		} catch (Exception e) {
			e.printStackTrace();
		}
		companyDAO.updateWords(id, word);
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
}
