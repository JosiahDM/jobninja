package test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import entities.Company;
import entities.User;

public class TestMain {
	
	public static void main(String[] args) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("JobJPA");
		EntityManager em = emf.createEntityManager();

		User u = em.find(User.class, 1);
		System.out.println(u.getUsername());
		System.out.println(u.getCompanies());
//		Company c = em.find(Company.class, 1);
//		System.out.println(c);
		
		
		
		em.close();
		emf.close();
		
	}

	
	
}
