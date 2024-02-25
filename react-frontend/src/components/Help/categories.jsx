import { faMoneyBill, faQuestionCircle, faShieldAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../../styles/help.css';

const HelpCategories = () => {
    const categories = [
        { name: "Account", icon: faUser },
        { name: "Payments", icon: faMoneyBill },
        { name: "Security", icon: faShieldAlt },
        { name: "FAQ", icon: faQuestionCircle }
    ];

    return (
        <div>
            <h1 className='categories' style={{ marginTop: "1em" }}>Need Help? We got you!</h1>
            <h2>From account settings to access authorization, find help with Discord.
If you're new to Discord and looking for tips, check out the Beginner's Guide!</h2>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1em" }}>
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <FontAwesomeIcon icon={category.icon} size="2x" className="icon" />
                        <div>{category.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpCategories;