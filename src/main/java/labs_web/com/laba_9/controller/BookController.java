package labs_web.com.laba_9.controller;

import labs_web.com.laba_9.model.Book;
import labs_web.com.laba_9.security.JwtUtil;
import labs_web.com.laba_9.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<?> getBooks(@RequestHeader(value = "Authorization", required = false) String token,
                                      @RequestParam(required = false) String genre,
                                      @RequestParam(required = false) String rating,
                                      @RequestParam(required = false) String sortOrder) {
        // Перевіряємо токен, якщо він переданий
        if (token != null) {
            String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
            if (!JwtUtil.validateToken(jwt, "admin")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
        }
        List<Book> books = bookService.getFilteredBooks(genre, rating, sortOrder);
        return ResponseEntity.ok(books);
    }
}
