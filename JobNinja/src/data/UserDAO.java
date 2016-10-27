package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import entities.Company;
import entities.User;
import entities.Word;

@Transactional
public class UserDAO {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	public List<User> index() {
		String query = "Select u from User u";
		return em.createQuery(query, User.class).getResultList();
	}

	// Get one user by id
	public User show(int id) {
		User user = em.find(User.class, id);
		return user;
	}

	public List<Word> indexWords(int userId) {
		String query = "Select w from Word w where w.user.id = ?1";
		return em.createQuery(query, Word.class).setParameter(1, userId).getResultList();
	}

	public User update(int id, User user) {
		User u = em.find(User.class, id);
		u.setUsername(user.getUsername());
		u.setPassword(user.getPassword());
		u.setTestId(user.getTestId());
		em.persist(u);
		em.flush();
		return u;
	}

	public User updateWords(int userId, Word word) {
		User updateUser = em.find(User.class, userId);
		updateUser.addWord(word);
		em.persist(updateUser);
		em.persist(word);
		em.flush();
		return updateUser;
	}

	// Add new company to user
	public Company addCompany(int id, Company company) {
		User u = em.find(User.class, id);
		company.setUser(u);
		em.persist(company);
		u.addCompany(company);
		em.persist(u);
		em.flush();
		return company;
	}

	// Delete company from user
	public void deleteCompany(int id, int cId) {
		User u = em.find(User.class, id);
		Company c = em.find(Company.class, cId);
		u.removeCompany(c);
		c.setUser(null);
		em.remove(c);
		em.persist(u);
		em.flush();
	}

	public void destroy(int id) {
		String query = "Select u from User u where id = ?1";
		User user = em.createQuery(query, User.class).setParameter(1, id).getSingleResult();
		em.remove(user);
		em.flush();
	}

	public User create(User newUser) {
		
		try {
			String query = "Select u from User u Where username = ?1";
			em.createQuery(query, User.class).setParameter(1, newUser.getUsername()).getSingleResult();
			return null;
		} catch (NoResultException e) {
			String rawPassword = newUser.getPassword();
			String encodedPassword = passwordEncoder.encode(rawPassword);
			newUser.setPassword(encodedPassword);
			
			em.persist(newUser);
			em.flush();
			return newUser;
		}

	}

	public User authenticateUser(User checkUser) {
		User user = null;

		List<User> allUsers = index();
		for (User userInList : allUsers) {
			if (userInList.getUsername().equals(checkUser.getUsername())) {
				user = em.find(User.class, userInList.getId());
			}
		}

		if (user != null) {
			String rawPassword = checkUser.getPassword();
			String encodedPassword = user.getPassword();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			if (encoder.matches(rawPassword, encodedPassword)) {
				return user;
			} else {
				user = null;
			}
		}
		return user;
	}
}
