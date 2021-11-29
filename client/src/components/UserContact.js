import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/UserContact.css";
import { MdLocationPin } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";

import Iframe from "react-iframe";
const UserContact = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const response = await fetch("/contact_form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("useremail"),
        name: localStorage.getItem("username"),
        message: message,
      })
    } );

    const data = await response.json();
    if (data.warning) {
      toast.warning(`${data.warning}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (data.message) {
      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (data.error) {
      toast.error(`${data.error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setMessage("");

  };

  return (
    <>
    <div className="user_contact">
      <div className="user_contact_title">
        <h1>Let's Connect </h1>
      </div>
      <div className="user_contact_details container">
        <div className="row justify-content-around">
          <div className="user_contact_detail col-md-3">
            <MdLocationPin className="user_contact_icon" />
            <h3>Our Main Office</h3>
            <p>13 Opera Building , CG Road Ahmedabad</p>
          </div>
          <div className="user_contact_detail col-md-3">
            <BsFillTelephoneFill className="user_contact_icon" />
            <h3>Phone Number</h3>
            <p>888-0123-3567 (Toll Free)</p>
          </div>
          <div className="user_contact_detail col-md-3">
            <GrMail className="user_contact_icon" />
            <h3>Mail</h3>
            <p>votechain53@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-7 user_contact_left">
            <h3> Available 24 hours a day!</h3>
            <form method="post">
              <input
                type="text"
                className="form-control4"
                autoComplete="off"
                placeholder="Enter Your Name"
                value={localStorage.getItem("username")}
              />
              <input
                type="email"
                className="form-control4"
                autoComplete="off"
                placeholder="Enter Your Email"
                value={localStorage.getItem("useremail")}
              />
              <div><textarea
                type="text"
                className="form-control4"
                placeholder="Enter Your Message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea></div>
              <button onClick={sendMessage} type="submit">
                Send
              </button>
            </form>
          </div>
          <div className="col-md-5 user_contact_right">
            <h1>We Are Here</h1>
            <p>Mon-Fri 8:30am- 5pm / Phones are open 24/7</p>
            <Iframe
              className="mapiframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.883861950945!2d72.55556861476941!3d23.028036084950273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f9f38dec53%3A0xf88c617eb48b0674!2sChimanlal%20Girdharlal%20Rd%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1636949318239!5m2!1sen!2sin"
              width="500"
              height="350"
              style="border:0;"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
};

export default UserContact;
