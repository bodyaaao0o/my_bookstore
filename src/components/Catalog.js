import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header_catalog';
import "../style2.css";
import { Link } from 'react-router-dom';
import Loader from './Spiner';

function Catalog() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [genre, setGenre] = useState("All genre");
    const [rating, setRating] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("Low to High");
    const [loading, setLoading] = useState(false);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    useEffect(() => {
        setLoading(true);

        axios.get('http://localhost:8080/api/books', {
            params: { genre, rating, sortOrder }
        })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setBooks(response.data);
                    const searchFilteredBooks = response.data.filter(book =>
                        book.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setFilteredBooks(searchFilteredBooks);
                } else {
                    console.error("Response data is not in expected format");
                }
            })
            .catch(error => {
                console.error("Error fetching books:", error);
            })
            .finally(() => {
                setTimeout(() => setLoading(false), 1000);
            });
    }, [genre, rating, sortOrder]);

    useEffect(() => {
        const searchFilteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(searchFilteredBooks);
    }, [searchQuery, books]);


    return (
        <div>
            <Header onSearch={handleSearch} />
            <div className="catalog">
                <h1 className='catalog-head'>Catalog Page</h1>
                <div className="filters">
                    <label className='label'>Genre</label>
                    <select value={genre} onChange={handleGenreChange}>
                        <option>All genre</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>

                    <label className='label'>Rating</label>
                    <select value={rating} onChange={handleRatingChange}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>

                    <label className='label'>Price</label>
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option>Low to High</option>
                        <option>High to Low</option>
                    </select>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="book-list">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                                <div key={book.id} className="book-card">
                                    <img
                                        className="catalog-img"
                                        src={book.imageUrl}
                                        alt={book.title}
                                    />
                                    <div className="book-card-info">
                                        <h3 className="book-card-topic">{book.title}</h3>
                                        <p className="book-author">{book.author}</p>
                                        <p className="book-card-description">{book.description}</p>
                                        <p className="movie-card-genre">Genre: {book.genre}</p>
                                        <div className="movie-card-rating">
                                            <p>{book.rating}</p>
                                        </div>
                                        <p className="book-price">{book.price} $</p>
                                    </div>
                                    <Link to={`/items/${book.id}`}>
                                        <button className="home-button">View more</button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <h1 className='search-err'>No books found</h1>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Catalog;
