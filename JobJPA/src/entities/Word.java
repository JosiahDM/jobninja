package entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	@JsonBackReference(value="userWords")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="wordcompanyid")
	@JsonBackReference(value="companyWords")
	private Company company;

	public Word() {}
	
	public Word(String value, Company company) {
		this.value = value;
		this.company = company;
	}
	
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

	@Override
	public String toString() {
		return "Word [id=" + id + ", value=" + value + ", user=" + user + ", company=" + company + "]";
	}

	@Override
	public int hashCode() {
		int hash = 7;
//		hash = 31 * hash + id;
		hash = 31 * hash + (null == value ? 0 : value.hashCode());
		return hash;
	}

	@Override
	public boolean equals(Object obj) {
		if(this == obj)
			return true;
		if((obj == null) || (obj.getClass() != this.getClass()))
			return false;
		// object must be Test at this point
		Word word = (Word)obj;
		return (value != null && value.equals(word.getValue()));
	}
	
	
	
}
