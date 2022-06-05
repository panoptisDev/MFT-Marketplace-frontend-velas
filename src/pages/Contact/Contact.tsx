import React from "react";
import Form from "../../components/Form/Form";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./styles.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <PageHeader pageHeader="Contact" />
      <Form />
    </div>
  );
};

export default Contact;
