import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;

  .container {
    margin-top: 6rem;
    text-align: center;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({
      email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset errors
    setErrors({ email: '' });

    if (!validateEmail(formData.email)) {
        setErrors({ email: 'Please enter a valid email address.' });
        return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/contactUsForm', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.statusText == "OK") {
        alert("Message sent successfully!");
        setFormData({ username: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Feel Free to Contact us</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2326857289385!2d73.12487621538488!3d19.2439386870035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795bd0e000001%3A0xfafce501f89c2d10!2sKalyan%2C%20Maharashtra%20421306!5e0!3m2!1sen!2sin!4v1672486204255!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="contact-inputs">
            <input
              className="input-field"
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
              value={formData.username}
              onChange={handleChange}
            />

            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

            <textarea
              name="message"
              cols="30"
              rows="6"
              placeholder="Message"
              autoComplete="off"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
