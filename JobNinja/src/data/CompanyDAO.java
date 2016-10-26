package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Company;
import entities.Word;

@Transactional
public class CompanyDAO {
	@PersistenceContext
	private EntityManager em;

	public List<Company> index() {
		String query = "Select c from Company c";
		return em.createQuery(query, Company.class).getResultList();
	}
	
	public Company show(int companyId) {
		Company company = em.find(Company.class, companyId);
		return company;
	}
	
	public List<Word> indexWords(int companyId){
		String query = "Select w from Word w where w.company.id = '" + companyId + "'";
		return em.createQuery(query, Word.class).getResultList();
	}

	public void updateName(int companyId, Company company) {
		Company updateCompany = em.find(Company.class, companyId);
		updateCompany.setCompanyname(company.getCompanyname());
		em.persist(updateCompany);
		em.flush();
	}
	public void updateWords(int companyId, Word word) {
		Company updateCompany = em.find(Company.class, companyId);
		updateCompany.addWord(word);
		em.persist(updateCompany);
		em.flush();
	}

	public void destroy(int companyId) {
		Company company = em.find(Company.class, companyId);
		em.remove(company);
		em.flush();
	}

	public Company create(Company newCompany) {
		em.persist(newCompany);
		em.flush();
		return newCompany;
	}
}
