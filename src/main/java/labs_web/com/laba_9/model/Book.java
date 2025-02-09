package labs_web.com.laba_9.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "genre")
    private String genre;

    @Column(name = "rating")
    private double rating;

    @Column(name = "imageUrl")
    private String imageUrl;  // поле для URL зображення

    public Book(String title, String author, String description, double price, String genre, double rating) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.genre = genre;
        this.rating = rating;
        this.imageUrl = null;
    }

    public Book(int id, String title, String author, String description, double price, String genre, double rating, String imageUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.genre = genre;
        this.rating = rating;
        this.imageUrl = imageUrl;
    }
    public Book() {
    }

    // Гетери та сетери
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
