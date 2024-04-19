import { faMoneyBill, faQuestionCircle, faShieldAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import '../../styles/help.css';
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
            <h1 className='categories' style={{ marginTop: "1em" }}>Need Help? We got you!</h1>
            <h2>From account settings to access authorization, find help with Discord.
                If you're new to Discord and looking for tips, check out the Beginner's Guide!</h2>
            
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1em" }}>
                <CategoryButton
                    name="Account"
                    icon={faUser}
                    ticketValues={{ category: "Account", urgency: "Low" }}
                    onClick={openTicketingModal()}
                />
                <CategoryButton
                    name="Payments"
                    icon={faMoneyBill}
                    ticketValues={{ category: "Payments", urgency: "Medium" }}
                    onClick={openTicketingModal}
                />
                <CategoryButton
                    name="Security"
                    icon={faShieldAlt}
                    ticketValues={{ category: "Security", urgency: "High" }}
                    onClick={openTicketingModal}
                />
                <CategoryButton
                    name="FAQ"
                    icon={faQuestionCircle}
                    ticketValues={{ category: "FAQ", urgency: "Low" }}
                    onClick={openTicketingModal}
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

const CategoryButton = ({ name, icon, ticketValues, onClick }) => {
    return (
        <button className="category-item" onClick={() => onClick(ticketValues)}>
            <FontAwesomeIcon icon={icon} size="2x" className="icon" />
            <div>{name}</div>
        </button>
    );
};

export default HelpCategories;