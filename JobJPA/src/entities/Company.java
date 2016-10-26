package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
<<<<<<< HEAD
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
=======
>>>>>>> c917031320b9531138c1b5a308847ead2ebb5bf1

@Entity
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idcompany;
	
	private String companyname;

	@ManyToOne
	@JoinColumn(name="companyuserid")
	@JsonBackReference(value="user")
	private User user;
	
}
