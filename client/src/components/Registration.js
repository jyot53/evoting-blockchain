import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupPic from "../images/registerpic.jpg";
import titlepic from "../images/titlepic.png";

//postdata - form submit (one time fire)
//handleinputs - key press (multiple time)

const Registration = () => {
  const history = useHistory(); //redirect to anoother page

  const [user, setUser] = useState({
    name: "",
    email: "",
    aadhar: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    //onchnage
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    //on submit/click
    e.preventDefault();
    const { name, email, aadhar, password, cpassword } = user; //object destructor
    //this is new featur of js in es6
    //sent data to backend - 8000 port and front - 3000
    //go to register page in the 8000 port and give data to it

    const response = await fetch("/register", {
      // url :- https://localhost:8000/register
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
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
      <section className="py-5 register">
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
