import React, { useState, useEffect } from "react";
import "../style/Contact.css"; 

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { ...formData, id: Date.now() };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000); 
  };

  return (
    <div className="contact-page">
      <div className="bg-overlay"></div>

      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">Have questions? Send us a message!</p>

        {submitted && (
          <p className="confirmation-msg"> Thank you! Your message has been sent.</p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <p>Email: contact@healthbites.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>LinkedIn: linkedin.com/in/healthbites</p>
        </div>

        {messages.length > 0 && (
          <div className="saved-messages">
            <h3>Previous Messages</h3>
            {messages.map((msg) => (
              <div key={msg.id} className="message-card">
                <p><strong>{msg.name}</strong> ({msg.email})</p>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
