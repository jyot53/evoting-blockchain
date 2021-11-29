import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getContractPhase} from '../electionContract';
const UserRegister = () => {
  const history = useHistory();
  // const [{user}, dispatch] = useStateValue();
  const [accountaddress, setAccountaddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [isRegisterPhase, setIsRegisterphase] = useState(false);
  const [currphase, setCurrphase] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/verify_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aadharNo: aadhar,
        accountaddress,
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
      setTimeout(() => history.replace("/user/verify_otp"), 3000);
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

  const checkPhase = async () => {
    const currentPhase = await getContractPhase();
    setCurrphase(currentPhase);
    if(currentPhase == 'Registration'){
      setIsRegisterphase(true);
    }else{
      setIsRegisterphase(false);
    }

  }

  useEffect(() => {
    if (
      !localStorage.getItem("username") ||
      !localStorage.getItem("useremail")
    ) {
      history.replace("/login");
    }

    checkPhase();

  }, []);

  return (
    <>
    {isRegisterPhase ? (
      <div className="user_register">
      <h1 className="user_register_title">User Registration</h1>
      <div className="user_register_box">
        <div className="user_register_content">
          <div className="user_register_division">
            <form method="POST">
              <div id="fancy-inputs">
                <div className="form-group1">
                  <input
                    name="aadhar"
                    placeholder="Enter Aadhar Number"
                    onChange={(e) => setAadhar(e.target.value)}
                    value={aadhar}
                    type="text"
                    autoComplete="off"
                  />
                  <i className="fa fa-asterisk" aria-hidden="true"></i>
                </div>
                <div className="form-group1">
                  <input
                    name="accountaddress"
                    placeholder="Enter Account Address"
                    onChange={(e) => setAccountaddress(e.target.value)}
                    value={accountaddress}
                    type="text"
                    autoComplete="off"
                  />
                  <i className="fa fa-asterisk" aria-hidden="true"></i>
                </div>
              </div>
              <button type="submit" onClick={handleSubmit}>
                Register
              </button>
            </form>
            <div className="user_register_note">
              <ol>
                <li>
                  Get your account address from your profile section.
                </li>
                <li>
                  Kindly fill the correct account address with respect to your
                  aadhar number.
                </li>
                <li>
                  OTP will be sent to the linked mail address with your aadhar
                  number.
                </li>
                <li>
                  Verfiy the correct OTP to successfully complete your
                  regestration.
                </li>
              </ol>
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
    </div>
    ) : currphase == "Voting" ? (
      <div className="user_register_notphase"> <h1>Registration has been ended now</h1> 
      <h1>If you have done registration then kindly vote before voting ends</h1> </div>
    ) : (
      <div className="user_register_notphase"> <h1>Voting and Registration has ended</h1> 
      <h1>You can now check the results of voting</h1> </div>
    )
    
    }
    
    </>
  );
};

export default UserRegister;