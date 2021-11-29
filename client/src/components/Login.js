import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {BsArrowLeft}  from "react-icons/bs"
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA  from "react-google-recaptcha";
// import * as FiIcons from 'react-icons/fi';
import './styles/login.css'
// import LoginPic from "../images/pngfindlogin.png";  
// import titlepic from "../images/titlepic.png";
// import {useStateValue} from '../StateProvider';
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const recaptchaRef = React.createRef();
  // const [{user}, dispatch] = useStateValue();

  const loginUser = async (e) => {
    e.preventDefault();

    const recaptchaValue = recaptchaRef.current.getValue();
    if(!recaptchaValue){
      alert("Validate Recaptcha Before Login");
      return;
    }

    if (email == "admin@admin.com" && password == "admin") {
      // localStorage.setItem('isAdmin',true);
      toast.success(`Welcome Admin`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // dispatch({
      //   type:'SET_USER',
      //   payload : {
      //     name : "admin",
      //     email : "admin@admin.com"
      //   }
      // })
      localStorage.setItem('isadmin','true');
      if(localStorage.getItem('phase') == null){
        localStorage.setItem('phase' , 'Registration');
      }
      setTimeout(() => history.replace("/admin/addcandidate"), 3000);

      return;
    }

    const response = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

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
      // dispatch({
      //   type:'SET_USER',
      //   payload : data.user
      // })
      // console.log(data.user);
      localStorage.setItem('username',data.user.name);
      localStorage.setItem('useremail',data.user.email);
      localStorage.setItem('isadmin','false');
      setTimeout(() => history.replace("/user/home"), 3000);
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

  const togglePassword = () => {
    var x = document.getElementById("passwordfield");
    var icon = document.getElementById("iconeye");

    if (x.type === "password") {
      icon.classList.remove('fa-aye');
      icon.classList.add('fa-eye-slash');
      x.type = "text";
    } else {
      icon.classList.add('fa-aye');
      icon.classList.remove('fa-eye-slash');
      x.type = "password";
    }
  }

  return (
    <>
      <section className="login_main">
      <div className="login_content">
          <div className="login_left">
            <h1>Login Before Use</h1>
            <p>Login by entering your credentials.</p>
            <p>Make sure you first create a new account before login.</p>
            <form method="POST">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control3"
                      name="email"
                      placeholder="Enter Email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control3"
                      id="passwordfield"
                      name="password"
                      placeholder="Enter Password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={togglePassword} className="icon"><i id="iconeye" className="fa fa-eye" aria-hidden="true"></i></span>
                  </div>
                  <div className="captchadiv">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeXHCYdAAAAAKsO1mY3CDSx4SLB0Be1x2WHyXu3"
                    />
                  </div>
                    {/* <button
                      type="submit"
                      className="btn btn-primary registerbtn d-flex align-items-center justify-content-center"
                      onClick={loginUser}
                    >
                      Login
                    </button> */}
                    <button type="submit" onClick={loginUser} className="login_btn">Login</button>
                </form>
            <div className="login_last" > 
              <p> Not have a account ? </p>
              <NavLink className="login_link" to="/register">Register</NavLink>
            </div>
            
          </div>
          <div className="login_right">
            {/* <img className="login_img" src="https://fistrba-room-chat.netlify.app/static/media/chat.25f84375.svg" alt="loginuser"/> */}
            <div className="login_right_back">
              <BsArrowLeft size={40} onClick={() => history.push('/')} />
            </div>
            <img className="login_img" src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="loginuser"/>
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

export default Login;

/* 
<section className="register">
        <div className="container frame">
          <div className="row offset-1 ">
            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center flex-column">
              <div className="title my-3 d-flex justify-content-center align-items-center ">
                <h1>Login Here</h1>
                <figure>
                  <img
                    className="img-fluid ml-2"
                    alt="login pic"
                    src={titlepic}
                  ></img>
                </figure>
              </div>
              <div className="offset-1">
                <form method="POST">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group captchadiv">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeXHCYdAAAAAKsO1mY3CDSx4SLB0Be1x2WHyXu3"
                    />
                  </div>
                  <div className="d-flex align-items-center text-center">
                    <button
                      type="submit"
                      className="btn btn-primary registerbtn d-flex align-items-center justify-content-center"
                      onClick={loginUser}
                    >
                      Login
                    </button>
                    <NavLink
                      to="/register"
                      className="btn btn-primary loginbtn d-flex align-items-center justify-content-center"
                    >
                      Register
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-12 d-flex align-items-center">
              <figure>
                <img className="img-fluid" src={LoginPic} alt="Registration" />
              </figure>
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

*/