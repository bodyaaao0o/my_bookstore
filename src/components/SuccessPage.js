import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const SuccessPage = () => {
    return (
        <div>
            <Header />
            <div className="success-page">
                <h1>Success!</h1>
                <p>Your order has been successfully placed. Thank you for your purchase!</p>
                <div className="home-button">
                    <Link to="/catalog">
                        <button className="home-button">Back to Catalog</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
