package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="words")
public class Word {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="wordid")
	private int id;
	
	private String value;
	
	@ManyToOne
	@JoinColumn(name="worduserid")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="wordcompanyid")
	private Company company;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public int getId() {
		return id;
	}
	
	
	
	
}
