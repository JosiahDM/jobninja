package entities;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="userid")
	private int id;
	
	@OneToMany(mappedBy="user", fetch=FetchType.EAGER)
	@JsonManagedReference(value="userWords")
	private Set<Word> words;
	
	@OneToMany(mappedBy="user", fetch=FetchType.EAGER)
	@JsonManagedReference(value="companies")
	private Set<Company> companies;
	
	private String username;
	private String password;
	@Column(name="testid")
	private String testId;
	@Column(name="tooktest")
	private boolean tookTest;
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getId() {
		return id;
	}
	
	
	public Set<Word> getWords() {
		return words;
	}
	public void setWords(Set<Word> words) {
		this.words = words;
	}
	public Set<Company> getCompanies() {
		return companies;
	}
	public void setCompanies(Set<Company> companies) {
		this.companies = companies;
	}
	
	public String getTestId() {
		return testId;
	}
	public void setTestId(String testId) {
		this.testId = testId;
	}
	public boolean isTookTest() {
		return tookTest;
	}
	public void setTookTest(boolean tookTest) {
		this.tookTest = tookTest;
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + "]";
	}
	
	public void addCompany(Company company) {
		if (companies == null) {
			companies = new HashSet<>();
		}
		if (!companies.contains(company)) {
			companies.add(company);
			company.setUser(this);
		}
	}

	public void removeCompany(Company company) {
		if (companies != null && companies.contains(company)) {
			companies.remove(company);
			company.setUser(null);
		}
	}

	public void addWord(Word word) {
		if (words == null) {
			words = new HashSet<>();
		}
		if (!words.contains(word)) {
			words.add(word);
			word.setUser(this);
		}
	}
	
	public void removeWord(Word word) {
		if (words != null && words.contains(word)) {
			words.remove(word);
			word.setUser(null);
		}
	}
	
	
	
	
	
}
