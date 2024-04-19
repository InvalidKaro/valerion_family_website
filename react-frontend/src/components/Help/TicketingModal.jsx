import React from "react";

const TicketingModal = ({ category, urgency, onClose }) => {
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle ticket submission logic here
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Submit a Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Category:</label>
                        <input type="text" value={category} readOnly />
                    </div>
                    <div>
                        <label>Urgency:</label>
                        <input type="text" value={urgency} readOnly />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea rows="4" required></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TicketingModal;