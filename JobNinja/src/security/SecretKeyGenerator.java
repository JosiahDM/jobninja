package security;

import java.security.Key;
import io.jsonwebtoken.impl.crypto.MacProvider;

import org.springframework.stereotype.Component;

@Component
public class SecretKeyGenerator {
	private final Key SECRET_KEY = MacProvider.generateKey();
	
	public Key getSecretKey() {
		return SECRET_KEY;
	}
}
