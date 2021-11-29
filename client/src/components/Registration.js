import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/Register.css';
import {MdPassword} from 'react-icons/md';
import {BsGenderAmbiguous,BsArrowLeft} from 'react-icons/bs';
import iconaa from '../images/icon.svg'

// import registerpic from "../images/registerpic.jpg";
// import titlepic from "../images/titlepic.png";

const Registration = () => {
  const history = useHistory();
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    aadhar: "",
    password: "",
    cpassword: "",
  });


  let name, value;
  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const captchaValue = (value) => {
    console.log("Captcha value: " + value);
    return value;
  }

  const postData = async (e) => {
    e.preventDefault();
    const { name, email,gender, aadhar, password, cpassword } = user;

    const response = await fetch("/register", {
      // url :- https://localhost:8000/register
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        gender,
        aadhar,
        password,
        cpassword,
      }),
    });

    const data = await response.json(); //data - server sent us(200,400,500)
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

      setTimeout(() => history.push("/login"), 3000);
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
  };

  return (
    <>
      <section className="registration_main">
      <div className="register_content">
          <div className="register_right">
            <div className="register_right_back">
              <BsArrowLeft size={40} onClick={() => history.push('/')} />
            </div>
            <img className="login_img" src="https://image.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg" alt="loginuser"/>
          </div>
          <div className="register_left">
            <h1>Create a new account</h1>
            <p>Remember your credentials.</p>
            <p>This is help you to login to the website.</p>
            <form method="POST">
                  <div className="form-group2">
                    <input
                      type="text"
                      className="form-control2"
                      name="name"
                      placeholder="Your Name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleInputs}
                    />
                    <span class="icon2"><i className="fa fa-user" aria-hidden="true"></i></span>
                  </div>
                  <div className="form-group2">
                    <input
                      type="email"
                      className="form-control2"
                      name="email"
                      placeholder="Your email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputs}
                    />
                    <span className="icon2"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                  </div>
                  <div className="form-group2">
                    <input
                      type="text"
                      className="form-control2"
                      name="gender"
                      placeholder="Your Gender(Male/Female)"
                      autoComplete="off"
                      value={user.gender}
                      onChange={handleInputs}
                    />
                    <span className="icon2"><BsGenderAmbiguous/></span>
                  </div>
                  <div className="form-group2">
                    <input
                      type="text"
                      className="form-control2"
                      name="aadhar"
                      placeholder="Enter Aadhar No."
                      autoComplete="off"
                      value={user.aadhar}
                      onChange={handleInputs}
                    />
                    <span className="icon2"> <img src={iconaa} alt="Aadhar" /> </span>
                  </div>
                  <div className="form-group2">
                    <input
                      type="password"
                      className="form-control2"
                      name="password"
                      placeholder="Your Password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                    />
                    <span className="icon2"><MdPassword/></span>
                  </div>
                  <div className="form-group2">
                    <input
                      type="password"
                      className="form-control2"
                      name="cpassword"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                    />
                    <span className="icon2"><MdPassword/></span>
                  </div>
                  <button type="submit" onClick={postData} className="login_btn">Register</button>
                </form>
            <div className="login_last" > 
              <p>Have an account ? </p>
              <NavLink className="login_link" to="/login">Login</NavLink>
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
      </section>
    </>
  );
};

export default Registration;


/*
<div className="container frame">
          <div className="row offset-1">
            <div className="col-md-6 col-12">
              <figure>
                <img className="img-fluid" src={SignupPic} alt="Registration" />
              </figure>
            </div>
            <div className="col-md-6 col-12">
              <div className="title text-center my-3 d-flex justify-content-center align-items-center ">
                <h1>Sign-Up</h1>
                <figure>
                  <img
                    className="img-fluid ml-2"
                    alt="register pic"
                    src={titlepic}
                  ></img>
                </figure>
              </div>
              <div className="offset-1">
                <form method="POST">
                  <div class="form-group">
                    <input
                    required="true"
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="Your Name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleInputs}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Your email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputs}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="age"
                      placeholder="Your Age"
                      autoComplete="off"
                      value={user.age}
                      onChange={handleInputs}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="aadhar"
                      placeholder="Enter Aadhar Card"
                      autoComplete="off"
                      value={user.aadhar}
                      onChange={handleInputs}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Your Password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="cpassword"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                    />
                  </div>
       
                  <div className="d-flex align-items-center text-center">
                    <button
                      type="submit"
                      class="btn btn-primary registerbtn d-flex align-items-center justify-content-center"
                      onClick={postData}
                    >
                      Register
                    </button>
                    <NavLink
                      to="/login"
                      class="btn btn-primary loginbtn d-flex align-items-center justify-content-center"
                    >
                      Login
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

*/