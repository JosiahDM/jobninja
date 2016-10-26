package entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int companyid;
	
	private String companyname;

	@ManyToOne
	@JoinColumn(name="companyuserid")
	@JsonBackReference(value="user")
	private User user;
	
	@OneToMany
	private Set<Word> words;
	
}
