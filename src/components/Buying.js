import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "./redux/actions";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function CartPage() {
    const cart = useSelector((state) => state.cart); 
    const dispatch = useDispatch();

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity(id, newQuantity));
        }
    };

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div>
            <Header />
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                <div className="cart-items">
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img
                                className="cart-item-image"
                                src={`/images/${item.imageUrl}`}
                                alt={item.title}
                            />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <div className="cart-item-actions">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <p>${item.price * item.quantity}</p>
                            </div>
                            <button
                                className="remove-button"
                                onClick={() => dispatch(removeFromCart(item.id))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                        <h3>Total amount: ${totalAmount}</h3>
                </div>
            </div>
                <div className="buy-button">
                    <div className="go_back-butt">
                        <Link to="/catalog">
                            <button className="home-button">Go Back</button>
                        </Link>
                    </div>
                    <div className="countinue-butt">
                        <Link to = "/checkout">
                            <button className="home-button">Countinue</button>
                        </Link>
                    </div>
                </div>
        </div>
    );
}
