package pythonParsing;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.Set;

import entities.Word;

public class WordComparer {

	private Set<Word> userWords;
	private Set<Word> companyWords;
	private String userConverted;
	private String companyConverted;

	public WordComparer(Set<Word> uw, Set<Word> cw) {
		this.userWords = uw;
		this.companyWords = cw;
		init();
	}

	private void init() {
		userConverted = setToString(userWords);
		companyConverted = setToString(companyWords);
	}

	// Takes set of type Word and turns it into a string of values separated by
	// a space
	public String setToString(Set<Word> set) {
		StringBuilder sb = new StringBuilder(set.size());
		for (Word word : set) {
			sb.append(word.getValue() + " ");
		}
		return sb.toString();
	}

	// Runs the python NLTK library to compute the similarity of words and
	// returns
	// a coefficient from 0-1. Returns -1 if error
	public double getSimilarityValue() {
		double result = -1.0;
		String line = "-1.0";
		try {
			System.out.println();
			System.out.println(userConverted);
			System.out.println(companyConverted);
			
			System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			System.out.println(Paths.get("").toAbsolutePath().toString());
			System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			
			ProcessBuilder pb = new ProcessBuilder("python", "wordparse.py", userConverted, companyConverted);
			pb.redirectErrorStream(true);
			Process p = pb.start();

			BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));

			while ((line = stdInput.readLine()) != null) {
				System.out.println(line);
				result = Double.parseDouble(line);
			}
		} catch (NumberFormatException nfe) {
			nfe.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public String getUserConverted() {
		return userConverted;
	}

	public void setUserConverted(String userConverted) {
		this.userConverted = userConverted;
	}

	public String getCompanyConverted() {
		return companyConverted;
	}

	public void setCompanyConverted(String companyConverted) {
		this.companyConverted = companyConverted;
	}

	public Set<Word> getUserWords() {
		return userWords;
	}

	public void setUserWords(Set<Word> userWords) {
		this.userWords = userWords;
	}

	public Set<Word> getCompanyWords() {
		return companyWords;
	}

	public void setCompanyWords(Set<Word> companyWords) {
		this.companyWords = companyWords;
	}

}