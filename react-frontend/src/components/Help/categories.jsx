import {
    faBugs,
    faCode,
    faFingerprint,
    faMoneyBill,
    faQuestionCircle,
    faShieldAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../styles/help.css";
import "./CategoryButton.css"; // Import CSS file for component styling
import TicketingModal from "./TicketingModal";


const HelpCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openTicketingModal = (category) => {
    setSelectedCategory(category);
  };

  const clearSelectedCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <h1 className="categories" style={{ marginTop: "1em" }}>
        Need Help? We got you!
      </h1>
      <h2>
        From account settings to access authorization, find help with Discord.
        If you're new to Discord and looking for tips, check out the Beginner's
        Guide!
      </h2>

      <div

        className="help-categories-container"
      >
        <CategoryButton
          name="Account"
          icon={faUser}
          ticketValues={{ category: "Account", urgency: "Low" }}
          onClick={() => openTicketingModal("Account")}
        />
        <CategoryButton
          name="Payments"
          icon={faMoneyBill}
          ticketValues={{ category: "Payments", urgency: "Medium" }}
          onClick={() => openTicketingModal("Payments")}
        />
        <CategoryButton
          name="Security"
          icon={faShieldAlt}
          ticketValues={{ category: "Security", urgency: "High" }}
          onClick={() => openTicketingModal("Security")}
        />
        <CategoryButton
          name="Complaint"
          icon={faQuestionCircle}
          ticketValues={{ category: "Complaints and Appeals", urgency: "Low" }}
          onClick={() => openTicketingModal("Complaint")}
        />
        <CategoryButton
          name="Bug Reporting"
          icon={faBugs}
          ticketValues={{ category: "Bug", urgency: "Medium" }}
          onClick={() => openTicketingModal("Bug")}
        />
        <CategoryButton
          name="Contact V-Arts Privacy"
          icon={faFingerprint}
          ticketValues={{ category: "Privacy", urgency: "Medium" }}
          onClick={() => openTicketingModal("Privacy")}
        />
        <CategoryButton
          name="Developer"
          icon={faCode}
          ticketValues={{ category: "Dev", urgency: "Medium" }}
          onClick={() => openTicketingModal("Dev")}
        />
      </div>

      {selectedCategory && (
        <TicketingModal
          category={selectedCategory}
          urgency={"Low"}
          onClose={clearSelectedCategory}
        />
      )}
    </div>
  );
};


const CategoryButton = ({ name, icon, onClick }) => {
    return (
      <button className="category-button" onClick={onClick}>
        <div className="category-button-inner">
          <div className="category-button-icon">
            <FontAwesomeIcon icon={icon} size="2x" className="icon" />
          </div>
          <div className="category-button-text">{name}</div>
        </div>
      </button>
    );
  };

export default HelpCategories;
