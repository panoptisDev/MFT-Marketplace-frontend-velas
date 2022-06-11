import { useState } from "react";
import Button from "../MoreComponents/Button";
import "./styles.css";

const Form = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [options, setOptions] = useState("");

  const handleSelect = (e: any) => {
    setOptions(e.target.value);
  };

  const onChangeHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-form">
      <div className="form-title">
        <h2>Drop Up A Message</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi et
          facere fuga, omnis, repellat ducimus molestiae non asperiores ullam
        </p>
      </div>
      <form className="contact" action="">
        <input
          type="text"
          placeholder="Your Full Name"
          onChange={onChangeHandler}
          name="name"
          value={form.name}
        />
        <input
          type="text"
          placeholder="Your Email Address"
          onChange={onChangeHandler}
          name="email"
          value={form.email}
        />
        <select
          className="form-select"
          value={options}
          onChange={handleSelect}
          name="option"
          id=""
        >
          <option value="Select1">Select1</option>
          <option value="Select2">Select2</option>
          <option value="Select3">Select3</option>
        </select>
        <textarea
          placeholder="Message"
          onChange={onChangeHandler}
          name="message"
          value={form.message}
        />
        <Button label="Send message" className="send-message" />
      </form>
    </div>
  );
};

export default Form;
