import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../style2.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { addToCart } from "./redux/actions"; 
import CartPage from "./Buying";

export default function Items() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        fetch("/book_card.json")
            .then((response) => response.json())
            .then((data) => {
                const selectedBook = data.find((book) => book.id === parseInt(id));
                setBook(selectedBook);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    if (!book) {
        return <div className="items-text">Loading...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(book));
        navigate("/cart");
    };

    return (
        <div>
            <Header />
            <div className="item-page">
                <div className="book-info">
                    <img className="item-image" src={`/images/${book.imageUrl}`} alt={book.title} />
                    <div className="book-details">
                        <h1 className="book-title">{book.title}</h1>
                        <p className="book-author">Author: {book.author}</p>
                        <p className="book-description">{book.description}</p>
                        <div className="movie-card-genre">
                            <p>Genre: {book.genre}</p>
                        </div>
                        <div className="item-card-rating">
                            <p>{book.rating}</p>
                        </div>
                        <div>
                            <select className="items-filter">
                                <option>Filter 1</option>
                                <option>Filter 2</option>
                            </select>
                            <select className="items-filter">
                                <option>Filter 1</option>
                                <option>Filter 2</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="items-down">
                <div className="items-price">
                    <p className="book-price">Price: ${book.price}</p>
                </div>
                <div className="items-button">
                    <Link to="/cart">
                        <button className="home-button" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </Link>
                    <Link to="/catalog">
                        <button className="home-button">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
