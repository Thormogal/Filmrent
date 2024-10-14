import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the data of the form to the server
    console.log('Form submitted:', formData);
    // Reset the form after sending it
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch With Us</h2>
          <p>We're very glad to be here and to help and answer any question you might have. We look forward to hearing from you!</p>
          <div className="contact-details">
            <div className="contact-item">
              <Mail size={20} />
              <span>support@filmrent.com</span>
            </div>
            <div className="contact-item">
              <Phone size={20} />
              <span>+46 (730) 346-8767</span>
            </div>
            <div className="contact-item">
              <MapPin size={20} />
              <span>Stockholmsgatan 34, 415 30, Gothenburg</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            Send Message <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;