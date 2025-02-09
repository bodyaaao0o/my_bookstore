package labs_web.com.laba_9.service;

import labs_web.com.laba_9.model.Book;
import labs_web.com.laba_9.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getFilteredBooks(String genre, String rating, String sortOrder) {
        List<Book> books = bookRepository.findAll();

        // Фільтрація
        if (genre != null && !genre.isEmpty() && !"All genre".equalsIgnoreCase(genre)) {
            books = books.stream()
                    .filter(book -> genre.equalsIgnoreCase(book.getGenre()))
                    .collect(Collectors.toList());
        }

        if (rating != null && !rating.equals("All")) {
            books = books.stream()
                    .filter(book -> matchesRating(book, rating))
                    .collect(Collectors.toList());
        }

        // Сортування
        if ("Low to High".equalsIgnoreCase(sortOrder)) {
            books.sort(Comparator.comparingDouble(Book::getPrice));
        } else if ("High to Low".equalsIgnoreCase(sortOrder)) {
            books.sort(Comparator.comparingDouble(Book::getPrice).reversed());
        }

        String baseUrl = "http://localhost:8080/images/";
        books.forEach(book -> {
            if (book.getImageUrl() == null) {
                book.setImageUrl(baseUrl + book.getId() + ".jpg");
            }
        });

        return books;
    }

    private boolean matchesRating(Book book, String rating) {
        switch (rating) {
            case "Good":
                return book.getRating() >= 8;
            case "Ok":
                return book.getRating() >= 5 && book.getRating() < 8;
            case "Bad":
                return book.getRating() < 5;
            default:
                return true;
        }
    }
}
