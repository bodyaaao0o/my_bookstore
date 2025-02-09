import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMessageComponent from "./ErrorMessageComponent"; 
import Header from "./Header";
import "../style2.css";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("First name is required"),
    lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot be more than 15 digits")
        .required("Phone number is required"),
    address: Yup.string()
        .min(10, "Address should be at least 10 characters")
        .required("Address is required")
});

const CheckoutPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values);
        navigate("/success");
    };

    return (
        <div>
            <Header />
            <div className="checkout-page">
                <h1>Checkout</h1>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        phoneNumber: "",
                        address: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-field">
                            <label htmlFor="firstName">First Name</label>
                            <Field
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                            />
                            <ErrorMessageComponent message={<ErrorMessage name="firstName" />} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="lastName">Last Name</label>
                            <Field
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                            />
                            <ErrorMessageComponent message={<ErrorMessage name="lastName" />} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                            <ErrorMessageComponent message={<ErrorMessage name="email" />} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                            />
                            <ErrorMessageComponent message={<ErrorMessage name="phoneNumber" />} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="address">Address</label>
                            <Field
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                            />
                            <ErrorMessageComponent message={<ErrorMessage name="address" />} />
                        </div>

                        <button type="submit" className="submit-button">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CheckoutPage;
