import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer/commonFooter";
import "../styles/App.css";



function Help() {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, such as sending data to a backend server
    console.log("Form submitted:", { name, email, message });
    // Clear form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  // TODO: Add ticket support form
  // ? Think of php script and ticket handler
  // ! Secured support



  return (
    <main className="help-main">
      <Helmet>
        <title>Get Help</title>
      </Helmet>
      <h1 className="help-h1">Help</h1>
      <p className="help-p">We're here to help!</p>

      {/* Ticket support form */}

      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Footer />
    </main>
  );
}

export default Help;