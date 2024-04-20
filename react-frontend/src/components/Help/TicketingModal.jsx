import React, { useState } from "react";
import Select from "react-select";
import "./ticket.css"; // Import CSS file for component styling

const TicketingModal = ({ category, urgency, onClose }) => {
  const [formData, setFormData] = useState({
    mail: "",
    username: "",
    evidence: "",
    comment: "",
    links: "",
    additionalField1: "",
    additionalField2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log(formData); // For demonstration purposes
  };

  // Define predefined data for each category
  const predefinedData = {
    Account: {
      label1: "Account ID:",
      label2: "Issue Description:",
      label3: "Additional Information:",
      comment: "I'm having trouble accessing my account.",
    },
    Payments: {
      label1: "Transaction ID:",
      label2: "Payment Issue:",
      label3: "Payment Method:",
      label4: "Amount:",
      comment: "I encountered an issue while making a payment.",
    },
    Security: {
      label1: "Security Concern:",
      label2: "Description:",
      label3: "Device Information:",
      label4: "IP Address:",
      comment: "I believe my account security has been compromised.",
    },
    "Complaints and Appeals": {
      label1: "Complaint Type:",
      label2: "Details:",
      label3: "Resolution Requested:",
      comment: "I would like to file a complaint regarding...",
    },
    Bug: {
      label1: "Bug Type:",
      label2: "Bug Description:",
      label3: "Steps to Reproduce:",
      label4: "Expected Outcome:",
      comment: "I found a bug in the system. Here are the details...",
    },
    Privacy: {
      label1: "Privacy Concern:",
      label2: "Description:",
      label3: "Data Subject:",
      label4: "Data Access Requested:",
      comment: "I have concerns about my privacy settings.",
    },
    Dev: {
      label1: "Issue Type:",
      label2: "Description:",
      label3: "Platform/Environment:",
      label4: "Error Message:",
      comment: "I need assistance with development-related issues.",
    },
  };

  // Get predefined data based on the selected category
  const selectedPredefinedData = predefinedData[category] || {};
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" value={category} readOnly />
        </div>
        <div className="form-group">
          <label>Urgency:</label>
          <input type="text" value={urgency} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Mail:</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="evidence">Evidence:</label>
          <input
            type="file"
            id="evidence"
            name="evidence"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group" style={{ height: "4rem" }}>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            value={selectedPredefinedData.comment || formData.comment}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {selectedPredefinedData.label1 && (
          <div className="form-group">
            <label htmlFor="additionalField1">
              {selectedPredefinedData.label1}
            </label>
            <Select
              id="additionalField1"
              name="additionalField1"
              value={formData.additionalField1}
              onChange={(selectedOption) =>
                setFormData({ ...formData, additionalField1: selectedOption })
              }
              options={options}
              
            />
          </div>
        )}
        {selectedPredefinedData.label2 && (
          <div className="form-group">
            <label htmlFor="additionalField2">
              {selectedPredefinedData.label2}
            </label>
            <Select
              id="additionalField2"
              name="additionalField2"
              value={formData.additionalField2}
              onChange={(selectedOption) =>
                setFormData({ ...formData, additionalField2: selectedOption })
              }
              options={options}
            />
          </div>
        )}
        {selectedPredefinedData.label3 && (
          <div className="form-group">
            <label htmlFor="additionalField3">
              {selectedPredefinedData.label3}
            </label>
            <Select
              id="additionalField3"
              name="additionalField3"
              value={formData.additionalField3}
              onChange={(selectedOption) =>
                setFormData({ ...formData, additionalField3: selectedOption })
              }
              options={options}
            />
          </div>
        )}
        {selectedPredefinedData.label4 && (
          <div className="form-group">
            <label htmlFor="additionalField4">
              {selectedPredefinedData.label4}
            </label>
            <Select
              id="additionalField4"
              name="additionalField4"
              value={formData.additionalField4}
              onChange={(selectedOption) =>
                setFormData({ ...formData, additionalField4: selectedOption })
              }
              options={options}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="links">Links:</label>
          <input
            type="text"
            id="links"
            name="links"
            value={formData.links}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketingModal;
