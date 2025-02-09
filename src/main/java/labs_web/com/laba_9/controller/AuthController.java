package labs_web.com.laba_9.controller;

import labs_web.com.laba_9.model.Users;
import labs_web.com.laba_9.security.JwtUtil;
import labs_web.com.laba_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        userService.registerUser(username, password);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        boolean isAuthenticated = userService.authenticateUser(username, password);
        Map<String, String> response = new HashMap<>();

        if (isAuthenticated) {
            response.put("message", "Login successful");
            response.put("token", JwtUtil.generateToken(username));  // Створюємо JWT токен
        } else {
            response.put("message", "Invalid credentials");
        }

        return response;
    }
}
