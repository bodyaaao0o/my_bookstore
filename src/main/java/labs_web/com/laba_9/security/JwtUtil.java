package labs_web.com.laba_9.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.logging.Logger;

public class JwtUtil {
    private static final String SECRET_KEY = "mySecretKeymySecretKeymySecretKeymySecretKey"; // Мінімум 32 символи
    private static final Key SIGNING_KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private static final Logger logger = Logger.getLogger(JwtUtil.class.getName());

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 година
                .signWith(SIGNING_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public static String extractUsername(String token) {
        try {
            return getClaims(token).getSubject();
        } catch (Exception e) {
            logger.warning("Помилка парсингу токена: " + e.getMessage());
            return null;
        }
    }

    public static boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            boolean valid = extractedUsername != null && extractedUsername.equals(username) && !isTokenExpired(token);
            if (!valid) logger.warning("Токен недійсний або прострочений.");
            return valid;
        } catch (Exception e) {
            logger.warning("Помилка перевірки токена: " + e.getMessage());
            return false;
        }
    }

    private static boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private static Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SIGNING_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
