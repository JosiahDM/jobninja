package entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int companyid;
	
	private String companyname;

	@ManyToOne
	@JoinColumn(name="companyuserid")
	@JsonBackReference(value="companies")
	private User user;
	
	@OneToMany(mappedBy="company", fetch=FetchType.EAGER, cascade=CascadeType.MERGE)
	@JsonManagedReference(value="companyWords")
	private Set<Word> words;

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Word> getWords() {
		return words;
	}

	public void setWords(Set<Word> words) {
		this.words = words;
	}

	public int getCompanyid() {
		return companyid;
	}

	@Override
	public String toString() {
		return "Company [companyid=" + companyid + ", companyname=" + companyname + ", user=" + user + ", words="
				+ words + "]";
	}
	
	public void addWord(Word word) {
		if (words == null) {
			words = new HashSet<>();
		}
		if (!words.contains(word)) {
			words.add(word);
			word.setCompany(this);
		}
	}
	
	public void removeWord(Word word) {
		if (words != null && words.contains(word)) {
			words.remove(word);
			word.setCompany(null);
		}
	}
	
	
}
