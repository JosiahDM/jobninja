package data;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.boot.model.source.spi.EmbeddableMapping;
import org.springframework.transaction.annotation.Transactional;

import entities.Company;
import entities.User;
import entities.Word;
import pythonParsing.WordComparer;

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
		String query = "Select w from Word w where w.company.id = ?1";
		return em.createQuery(query, Word.class).setParameter(1, companyId).getResultList();
	}

	public void updateName(int companyId, Company company) {
		Company updateCompany = em.find(Company.class, companyId);
		updateCompany.setCompanyname(company.getCompanyname());
		em.persist(updateCompany);
		em.flush();
	}
	
	public Company updateWords(int companyId, Set<String> words) {
		String[] uniqueWords = words.toArray(new String[words.size()]);
		Company updateCompany = em.find(Company.class, companyId);
		int batchSize = 30;
		for (int i = 0; i < uniqueWords.length; i++) {
		    Word word = new Word();
		    word.setCompany(updateCompany);
		    updateCompany.addWord(word);
		    word.setValue(uniqueWords[i]);
		    em.persist(word);
		    if(i % batchSize == 0) {
		        em.flush();
		        em.clear();
		    }
		}
		em.flush();
		return updateCompany;
	}

	public void destroy(int companyId) {
		Company company = em.find(Company.class, companyId);
		em.remove(company);
		em.flush();
	}
	
	public Company deleteData(int id) {
		String query = "delete from Word w where w.company.id = ?1";
		em.createQuery(query)
			.setParameter(1, id)
			.executeUpdate();
		Company c = em.find(Company.class, id);
		c.setRating(null);
		em.persist(c);
		return c;
	}

	public Company create(Company newCompany) {
		em.persist(newCompany);
		em.flush();
		return newCompany;
	}
	
	// Sends company words and user words to WordComparer, then
	// gets the similarity value and sets the company rating to that value
	// Value will be -1 if something went wrong in the WordComparer.
	public Company matchRating(int cid, int userId) {
		Company c = em.find(Company.class, cid);
		User u = em.find(User.class, userId);
		WordComparer wc = new WordComparer(u.getWords(), c.getWords());
		Double rating = wc.getSimilarityValue();
		c.setRating(rating == -1 ? null : rating);
		em.persist(c);
		em.flush();
		return c;
	}
}
