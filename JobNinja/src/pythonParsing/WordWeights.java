package pythonParsing;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class WordWeights {
	public static void main(String[] args) {
		String s = null;
		
		try {
			Process p = Runtime.getRuntime().exec("python wordparse.py");

			BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));

			while ((s = stdInput.readLine()) != null) {
				System.out.println(s);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}