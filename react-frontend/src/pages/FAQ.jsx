import React from "react";
import "../styles/App.css";

import Documents from "../documents/docs";
import VArtsContent from "../documents/faq"; // Importing VArtsContent correctly

const FAQ = () => {
  return (
      <Documents content={VArtsContent} />
  );
}

export default FAQ;
