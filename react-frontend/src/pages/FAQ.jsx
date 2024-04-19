import React from "react";
import "../styles/App.css";

import Documents from "../documents/docs";
import VArtsContent from "../documents/faq"; // Importing VArtsContent correctly

const FAQ = () => {
  return (
      <Documents content={VArtsContent} /> // TODO: Krümel mach hier mal design.
  );
}

export default FAQ;
