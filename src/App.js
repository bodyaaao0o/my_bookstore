import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./style2.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Catalog from "./components/Catalog";
import Items from "./components/Items";
import CartPage from "./components/Buying";
import CheckoutPage from "./components/CheckoutPage";
import SuccessPage from "./components/SuccessPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Routes>
                    <Route path="/" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        
                        <Route path="/home" element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } />

                        <Route
                            path="/catalog"
                            element={
                                <ProtectedRoute>
                                    <Catalog />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/items/:id"
                            element={
                                <ProtectedRoute>
                                    <Items />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <CheckoutPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/success"
                            element={
                                <ProtectedRoute>
                                    <SuccessPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
